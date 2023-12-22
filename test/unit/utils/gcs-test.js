import config from "exp-config";
import { fakeGcs } from "@bonniernews/lu-test";
import stream from "stream";

import {
  createReadStream,
  createWriteStream,
  exists,
  getCredentials,
  toLakeDate,
  lakeUri,
  parseUri,
  list,
  metadata,
  toPath,
} from "../../../lib/utils/gcs.js";

const { Readable, Writable, promises: { pipeline } } = stream;

const fileDate = "2020-01-01";
const pathDate = "year=2020/month=01/day=01";
const filename = "some-file.json";

const gcsBucket = config.gcs.bucket;
const gcsDirectory = `brand/some-namespace/some-area/some-classification/some-system/some-data/v1/${pathDate}`;

const filePath = `gs://${gcsBucket}/${gcsDirectory}/${filename}`;
const fileKey = `${gcsDirectory}/${filename}`;
const fileContent = "test content";

const dataLakePath = `gs://${config.gcsDataLake.bucket}/red/brand/all/greenfield/some-data/v1/${pathDate}/${filename}`;

describe("create read stream from GCS file", () => {
  before(fakeGcs.reset);
  let readStream;
  it("should create a read stream from GCS", () => {
    fakeGcs.mockFile(filePath, { content: fileContent });
    readStream = createReadStream(filePath);
    readStream.should.be.an.instanceOf(Readable);
  });
  it("should return the expected content", async () => {
    const fileData = [];
    await pipeline(readStream, async function* (iterable) {
      for await (const row of iterable) {
        if (!row) continue;
        fileData.push(row);
      }
      yield;
    });
    fileData.join("\n").should.eql(fileContent);
  });
});

describe("create write stream to GCS file", () => {
  before(fakeGcs.reset);
  let writeStream;
  it("should create a write stream to GCS", () => {
    fakeGcs.mockFile(filePath);
    writeStream = createWriteStream(filePath);
    writeStream.should.be.an.instanceOf(Writable);
  });
  it("should accept the content", async () => {
    await pipeline(async function* () {
      yield fileContent;
    }, writeStream);
    fakeGcs.written(filePath).should.eql(fileContent);
  });
});

describe("check if GCS file exists", () => {
  beforeEach(fakeGcs.reset);
  it("should return that a non-existant file isn't there", async () => {
    fakeGcs.mockFile(filePath);
    const fileExists = await exists(filePath);
    fileExists.should.eql(false);
  });
});

describe("get GCS credentials", () => {
  it("should get the credentials object from config", () => {
    const credentials = getCredentials();
    const expected = JSON.parse(JSON.stringify(config.gcs.credentials));
    credentials.should.eql(expected);
  });
});

describe("convert date to lake date", () => {
  it("should return a date in a format we can use in a GCS path", () => {
    const lakeDate = toLakeDate(fileDate);
    lakeDate.should.eql(pathDate);
  });
});

describe("get data lake path from parameters", () => {
  it("should return a data lake GCS path based on input parameters", () => {
    const gcsPath = lakeUri({
      system: "greenfield",
      type: "some-data",
      compress: false,
      fileExt: ".json",
      fileName: "some-file",
      version: "v1",
      date: new Date(fileDate),
    }, "gcsDataLake");
    gcsPath.should.eql(dataLakePath);
  });
  it("should return a data lake GCS path without version", () => {
    const gcsPath = lakeUri({
      system: "greenfield",
      type: "some-data",
      compress: false,
      fileExt: ".json",
      fileName: "some-file",
      date: new Date(fileDate),
    }, "gcsDataLake");
    gcsPath.should.eql(dataLakePath.replace("/v1", ""));
  });
  it("should return a data lake GCS path for a gzipped file", () => {
    const gcsPath = lakeUri({
      system: "greenfield",
      type: "some-data",
      compress: true,
      fileExt: ".json",
      fileName: "some-file",
      version: "v1",
      date: new Date(fileDate),
    }, "gcsDataLake");
    gcsPath.should.eql(`${dataLakePath}.gz`);
  });
  it("should return a data lake GCS path with default filename and extension", () => {
    const gcsPath = lakeUri({
      system: "greenfield",
      type: "some-data",
      compress: false,
      version: "v1",
      date: new Date(fileDate),
    }, "gcsDataLake");
    gcsPath.should.eql(dataLakePath.replace("some-file", "some-data"));
  });
});

describe("parse a GCS file path", () => {
  it("should return the bucket and key from a GCS path", () => {
    const gcsPath = parseUri(filePath);
    gcsPath.should.eql({ Bucket: gcsBucket, Key: fileKey });
  });
  it("should throw an error with an invalid bucket", () => {
    try {
      parseUri(filePath.replace(gcsBucket, "some-other-bucket"));
    } catch (error) {
      error.message.should.eql("Invalid gcs bucket some-other-bucket");
    }
  });
});

describe("list GCS path", () => {
  beforeEach(fakeGcs.reset);
  it("should return a list of files", async () => {
    fakeGcs.mockFile(filePath, { content: fileContent });
    const files = await list(`gs://${gcsBucket}/${gcsDirectory}/${filename}`);
    files.should.eql(filePath);
  });
  it("should return an empty list when no files found", async () => {
    fakeGcs.mockFile(filePath);
    const files = await list(`gs://${gcsBucket}/${gcsDirectory}/${filename}`);
    files.length.should.eql(0);
  });
});

describe("get GCS file metadata based on file extension", () => {
  beforeEach(fakeGcs.reset);
  it("should return json for json files", async () => {
    fakeGcs.mockFile(filePath, { content: fileContent });
    const fileMetadata = await metadata(filePath);
    fileMetadata.should.eql({ contentType: "application/json" });
  });
  it("should return return json lines for jsonl files", async () => {
    const testFilePath = `${filePath}.jsonl`;
    fakeGcs.mockFile(testFilePath, { content: fileContent });
    const fileMetadata = await metadata(testFilePath);
    fileMetadata.should.eql({ contentType: "application/x-ndjson" });
  });
  it("should return return csv for csv files", async () => {
    const testFilePath = `${filePath}.csv`;
    fakeGcs.mockFile(testFilePath, { content: fileContent });
    const fileMetadata = await metadata(testFilePath);
    fileMetadata.should.eql({ contentType: "text/csv" });
  });
  it("should return return default type for unknown files", async () => {
    const testFilePath = `${filePath}.log`;
    fakeGcs.mockFile(testFilePath, { content: fileContent });
    const fileMetadata = await metadata(testFilePath);
    fileMetadata.should.eql({ contentType: "text/plain" });
  });
  it("should return content encoding for gz files", async () => {
    const gzipFilePath = `${filePath}.gz`;
    fakeGcs.mockFile(gzipFilePath, { content: fileContent });
    const fileMetadata = await metadata(gzipFilePath);
    fileMetadata.should.eql({ contentEncoding: "gzip", contentType: "application/json" });
  });
});

describe("generate Greenfield GCS path from parameters", () => {
  it("should return a GCS path based on input parameters", () => {
    const gcsPath = toPath("some-namespace",
      fileDate,
      gcsBucket,
      "some-area",
      "some-classification",
      "some-system",
      "some-data",
      "v1",
      filename
    );
    gcsPath.should.eql(filePath);
  });
  it("should return a GCS path with sub-directories", () => {
    const gcsPath = toPath("some-namespace",
      fileDate,
      gcsBucket,
      "some-area",
      "some-classification",
      "some-system",
      "some-data",
      "v1",
      filename,
      "sub-directory-1",
      "sub-directory-2",
      "sub-directory-3"
    );
    gcsPath.should.eql(filePath.replace(filename, `sub-directory-1/sub-directory-2/sub-directory-3/${filename}`));
  });
  it("should throw an error with an invalid bucket", () => {
    try {
      toPath("some-namespace", fileDate, "some-other-bucket");
    } catch (error) {
      error.message.should.eql("Invalid gcs bucket some-other-bucket");
    }
  });
});
