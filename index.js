"use strict";

const namespaces = require("./lib/namespaces");

const email = require("./lib/utils/email");
const ftp = require("./lib/utils/ftp");
const gcs = require("./lib/utils/gcs");
const iterators = require("./lib/utils/iterators");
const pdf = require("./lib/utils/pdf");
const pdfGenerator = require("./lib/utils/pdfGenerator");
const s3 = require("./lib/utils/s3");
const ses = require("./lib/utils/ses");
const sftp = require("./lib/utils/stfp");
const streams = require("./lib/utils/streams");

const schemas = require("./lib/validation-helpers/schemas");

module.exports = {
  namespaces,
  email,
  ftp,
  gcs,
  iterators,
  pdf,
  pdfGenerator,
  s3,
  ses,
  sftp,
  streams,
  schemas
};
