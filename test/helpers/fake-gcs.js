"use strict";

const {Readable} = require("stream");
const sandbox = require("sinon").createSandbox();
const gcs = require("../../lib/utils/gcs");

let writes = {};
let writeStreamStub, existsStub, readStreamStub, listStub;

function write(target, opts = {times: 1}) {
  if (!writeStreamStub) {
    writeStreamStub = sandbox.stub(gcs, "createWriteStream");
  }
  const writer = async (iterator) => {
    let data = "";
    const buffer = [];
    for await (const row of iterator) {
      if (Buffer.isBuffer(row)) {
        buffer.push(row);
      } else {
        data += row.toString(opts.encoding || "utf-8");
      }
    }
    if (buffer.length) {
      data = Buffer.concat(buffer);
    }
    writes[target] = data;
    read(target, data, opts);
  };
  writeStreamStub.withArgs(target).returns(writer);

  return writer;
}

function read(path, content, opts = {times: 1}) {
  if (!readStreamStub) {
    readStreamStub = sandbox.stub(gcs, "createReadStream");
  }

  const stub = readStreamStub.withArgs(path);

  for (let i = 0; i < opts.times; i++) {
    const stream = new Readable();
    stream._read = () => {};
    // if (opts.format === "buffer") {
    if (Buffer.isBuffer(content)) {
      stream.push(Buffer.from(content));
    } else {
      // const encodedContent = iconv.encode(content, opts.encoding || "utf-8").toString();
      content
        .split("\n")
        .filter(Boolean)
        .forEach((o) => {
          stream.push(`${o}\n`, opts.encoding || "utf-8");
        });
    }

    stream.push(null);

    stub.onCall(i).returns(stream);
  }
}

function readError(target, message = "gcs file stream read error") {
  if (!readStreamStub) {
    readStreamStub = sandbox.stub(gcs, "createReadStream");
  }
  readStreamStub.withArgs(target).throws(new Error(message));
}

function exists(target, fileExists) {
  if (!existsStub) {
    existsStub = sandbox.stub(gcs, "exists");
  }

  const stub = existsStub.withArgs(target);

  if (typeof fileExists === "boolean") {
    existsStub.withArgs(target).returns(fileExists);
  } else if (Array.isArray(fileExists)) {
    for (const i in fileExists) {
      stub.onCall(i).returns(fileExists[i]);
    }
  } else {
    throw new Error("expected fileExists to be a boolean or an array");
  }

  return;
}

function list(path, files = []) {
  if (!listStub) listStub = sandbox.stub(gcs, "list");

  listStub.withArgs(path).returns(files);
}

function listError(path, message = "gcs list error") {
  if (!listStub) listStub = sandbox.stub(gcs, "list");

  listStub.withArgs(path).throws(new Error(message));
}

function writeError(target, message = "gcs file stream error") {
  if (!writeStreamStub) {
    writeStreamStub = sandbox.stub(gcs, "createWriteStream");
  }
  writeStreamStub.withArgs(target).throws(new Error(message));
}

function written(path) {
  return writes[path];
}

function reset() {
  writes = {};
  writeStreamStub = null;
  existsStub = null;
  readStreamStub = null;
  listStub = null;
  sandbox.restore();
}

module.exports = {
  write,
  writeError,
  reset,
  written,
  exists,
  // existsMultiple,
  read,
  readError,
  list,
  listError
};
