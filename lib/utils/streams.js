import url from "url";
import assert from "assert";

import * as s3 from "./s3.js";

function read(options, context, rowFn) {
  assert(typeof rowFn === "function", "invalid rowFn");
  const { path } = options;
  assert(path, "options.path is not provided");
  assert(context && context.logger, "context is not provided");
  const parts = url.parse(path);
  if (parts.protocol !== "s3:") throw new Error(`only s3 paths are implemented got ${path}`);

  const stream = s3Stream(path, context);
  let final = stream;
  for (const p of options.pipes || []) {
    final = final.pipe(p);
  }
  return readData(final, rowFn);
}

function getReadStream(options, context) {
  const { path } = options;
  assert(path, "options.path is not provided");
  assert(context && context.logger, "context is not provided");
  const parts = url.parse(path);
  if (parts.protocol !== "s3:") throw new Error(`only s3 paths are implemented got ${path}`);

  return s3Stream(path, context);
}

function open(options, context) {
  const { path } = options;
  assert(path, "options.path is not provided");
  assert(context && context.logger, "context is not provided");
  const parts = url.parse(path);
  if (parts.protocol !== "s3:") throw new Error(`only s3 paths are implemented got ${path}`);
  const file = createS3File(path, context);

  return {
    close: async () => await closeS3File(file),
    uploadPromise: file.uploadPromise,
    write: (data, encoding = "utf-8") => file.writeStream.write(data, encoding),
    setDefaultEncoding: (encoding) => file.writeStream.setDefaultEncoding(encoding),
    writeStream: file.writeStream,
  };
}

function readData(readStream, rowFn) {
  return new Promise((resolve, reject) => {
    readStream.on("data", async (data) => {
      try {
        if (!data) return;
        await rowFn(data);
      } catch (e) {
        e.rejected = true;
        return reject(e);
      }
    });
    readStream.on("end", () => {
      return resolve();
    });
    readStream.on("error", (e) => {
      return reject(e);
    });
  });
}

function s3Stream(path, context) {
  const readStream = s3.readStreamV2(path);

  readStream.on("error", (err) => {
    context.logger.error(`error when reading ${path}, ${err.toString()}`);
  });
  return readStream;
}

function createS3File(path, context) {
  const file = s3.s3FileStreamV2(path);
  file.writeStream.on("error", (err) => {
    context.logger.error(`error when appending ${err.toString()}`);
  });
  return file;
}

function closeS3File(file) {
  return new Promise((resolve, reject) => {
    file.writeStream.on("end", async () => {
      try {
        await file.uploadPromise;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
    file.writeStream.end();
  });
}

export { read, open, getReadStream, readData };
