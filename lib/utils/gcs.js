"use strict";

const {URL} = require("url");
const config = require("exp-config");
const {Storage} = require("@google-cloud/storage");
const moment = require("moment");

function createWriteStream(gcsPath) {
  const {Bucket, Key} = parseUri(gcsPath);

  const storage = new Storage(config.gcs.credentials);

  const file = storage.bucket(Bucket).file(Key);

  return file.createWriteStream();
}

function createReadStream(gcsPath) {
  const {Bucket, Key} = parseUri(gcsPath);

  const storage = new Storage(config.gcs.credentials);

  const file = storage.bucket(Bucket).file(Key);

  return file.createReadStream();
}

async function exists(gcsPath) {
  const {Bucket, Key} = parseUri(gcsPath);

  const storage = new Storage(config.gcs.credentials);

  const arr = await storage.bucket(Bucket).file(Key).exists();
  return (arr && arr?.shift()) || false;
}

function toLakeDate(date) {
  return moment(date).format("[year=]YYYY/[month=]MM/[day=]DD");
}

function parseUri(uri) {
  const parts = new URL(uri);
  if (parts.protocol === "gs:") {
    const conf = {
      Bucket: parts.host,
      Key: parts.pathname.slice(1)
    };
    if (conf.Bucket !== config.gcs.bucket) throw new Error(`Invalid gcs bucket ${conf.Bucket}`);
    return conf;
  }
}

module.exports = {
  createReadStream,
  createWriteStream,
  exists,
  toLakeDate
};
