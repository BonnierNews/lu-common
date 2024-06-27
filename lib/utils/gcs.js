import config from "exp-config";
import { Storage } from "@google-cloud/storage";
import moment from "moment";
import path from "path";
import { pipeline as streamPipeline } from "stream/promises";

import { ensureCompleteChunks } from "./iterators.js";

const extToContentType = {
  ".json": "application/json",
  ".jsonl": "application/x-ndjson",
  ".csv": "text/csv",
};

function metadata(uri) {
  const ext = path.extname(path.basename(uri, ".gz"));
  const contentType = extToContentType[ext] ?? "text/plain";
  if (path.extname(uri) === ".gz") {
    return {
      contentEncoding: "gzip",
      contentType,
    };
  }

  return { contentType };
}

function getCredentials(configName = "gcs") {
  const credentials = JSON.parse(JSON.stringify(config[configName].credentials));
  return credentials;
}

async function pipeline(readStream, ...params) {
  return await streamPipeline(readStream, ensureCompleteChunks, ...params);
}

function createWriteStream(gcsPath, writeStreamOptions, configName = "gcs") {
  const { Bucket, Key } = parseUri(gcsPath, configName);

  const storage = new Storage(getCredentials(configName));

  const file = storage.bucket(Bucket).file(Key);

  return file.createWriteStream({ ...writeStreamOptions, metadata: metadata(gcsPath) });
}

function createReadStream(gcsPath, readStreamOptions, configName = "gcs") {
  const { Bucket, Key } = parseUri(gcsPath, configName);

  const storage = new Storage(getCredentials(configName));

  const file = storage.bucket(Bucket).file(Key);

  return file.createReadStream(readStreamOptions);
}

async function exists(gcsPath, configName = "gcs") {
  const { Bucket, Key } = parseUri(gcsPath, configName);

  const storage = new Storage(getCredentials(configName));

  const arr = await storage.bucket(Bucket).file(Key).exists();
  return (arr && arr?.shift()) || false;
}

async function list(gcsPath, configName = "gcs") {
  const { Bucket, Key } = parseUri(gcsPath, configName);

  const storage = new Storage(getCredentials(configName));

  const opts = { prefix: Key };

  const [ files ] = await storage.bucket(Bucket).getFiles(opts);

  return files?.length ? files.map((f) => `gs://${path.join(Bucket, f.name)}`) : [];
}

function toLakeDate(date) {
  return moment(date).format("[year=]YYYY/[month=]MM/[day=]DD");
}

function parseUri(uri, configName = "gcs") {
  const parts = new URL(uri);
  if (parts.protocol === "gs:") {
    const conf = {
      Bucket: parts.host,
      Key: parts.pathname.slice(1),
    };
    if (conf.Bucket !== config[configName].bucket) throw new Error(`Invalid gcs bucket ${conf.Bucket}`);
    return conf;
  }
}

function lakeUri(
  { system, type, compress = false, fileExt = ".json", fileName = null, date = new Date(), version = null },
  configName = "gcs"
) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return [
    `gs://${config[configName].bucket}/red/brand/all`,
    system,
    type,
    version ?? "",
    `year=${year}/month=${month}/day=${day}`,
    `${fileName || type}${fileExt}${compress ? ".gz" : ""}`,
  ]
    .filter(Boolean)
    .join("/");
}

function toPath(
  namespace,
  date,
  bucket,
  area,
  classification,
  system,
  dataName,
  version,
  fileName,
  subDirectory1,
  subDirectory2,
  subDirectory3,
  configName = "gcs"
) {
  if (bucket !== config[configName].bucket) throw new Error(`Invalid gcs bucket ${bucket}`);
  const subDirectories =
    (subDirectory1 ? `/${subDirectory1}` : "") +
    (subDirectory2 ? `/${subDirectory2}` : "") +
    (subDirectory3 ? `/${subDirectory3}` : "");
  return `gs://${bucket}/brand/${namespace}/${area}/${classification}/${system}/${dataName}/${version}/${toLakeDate(
    date
  )}${subDirectories}/${fileName}`;
}

async function getFileMetadata(gcsPath) {
  const { Bucket, Key } = parseUri(gcsPath);
  const storage = new Storage(getCredentials());

  const [ md ] = await storage.bucket(Bucket).file(Key).getMetadata();

  return md;
}

export {
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
  pipeline,
  getFileMetadata,
};
