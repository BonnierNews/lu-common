import es from "event-stream";
import ftp from "basic-ftp";
import assert from "assert";
import { createSandbox } from "sinon";

const sandbox = createSandbox();

let writes = {};
let stub;

function init() {
  if (!stub) {
    stub = sandbox.stub(ftp.Client.prototype);
  }
}

function put(expectedTargetPath) {
  init();
  stub.access = () => {
    return;
  };
  stub.uploadFrom = (readStream, actualTarget) => {
    assert(expectedTargetPath === actualTarget, `expected path ${expectedTargetPath} but got ${actualTarget}`);
    return new Promise((resolve) => {
      const writer = es.wait((_, data) => {
        writes[actualTarget] = data;
        return resolve();
      });
      readStream.pipe(writer);
    });
  };
}

function putMany(expectedTargetPaths) {
  init();
  stub.access = () => {
    return;
  };
  stub.uploadFrom = (readStream, actualTarget) => {
    assert(
      expectedTargetPaths.includes(actualTarget),
      `expected paths ${expectedTargetPaths.join(", ")} to include ${actualTarget}`
    );
    return new Promise((resolve) => {
      const writer = es.wait((_, data) => {
        writes[actualTarget] = data;
        return resolve();
      });
      readStream.pipe(writer);
    });
  };
}

function putError(message = "ftp put failed") {
  init();
  stub.access = () => {
    return;
  };
  stub.uploadFrom = () => {
    throw new Error(message);
  };
}

function connectionError(message = "ftp connection failed") {
  init();
  stub.access = () => {
    throw new Error(message);
  };
}

function written(path) {
  if (Buffer.isBuffer(writes[path])) {
    return writes[path].toString();
  }
  return writes[path];
}

function reset() {
  writes = {};
  sandbox.restore();
  stub = null;
}

export { connectionError, written, reset, put, putMany, putError };
