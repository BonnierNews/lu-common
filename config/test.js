"use strict";

const config = {
  s3: {
    bucket: "lu-etlet-lab",
    accessKeyId: "REPLACED_BY_ENV",
    secretAccessKey: "REPLACED_BY_ENV",
  },
  gcs: { bucket: "test-bucket" },
  ses: {
    accessKeyId: "REPLACED_BY_ENV",
    secretAccessKey: "REPLACED_BY_ENV",
  },
};

module.exports = config;
