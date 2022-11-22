"use strict";

const namespaces = require("./lib/namespaces");

const email = require("./lib/utils/email");
const ftp = require("./lib/utils/ftp");
const gcs = require("./lib/utils/gcs");
const iterators = require("./lib/utils/iterators");
const PDF = require("./lib/utils/pdf");
const pdfGenerator = require("./lib/utils/pdfGenerator");
const s3 = require("./lib/utils/s3");
const ses = require("./lib/utils/ses");
const sftp = require("./lib/utils/sftp");
const streams = require("./lib/utils/streams");

const schemas = require("./lib/validation-helpers/schemas");

const afterHook = require("./test/helpers/after-hook");
const fakeApi = require("./test/helpers/fake-api")();
const fakeFtp = require("./test/helpers/fake-ftp");
const fakeGcs = require("./test/helpers/fake-gcs");
const fakeS3 = require("./test/helpers/fake-s3");
const fakeSes = require("./test/helpers/fake-ses");
const fileUtils = require("./test/helpers/file-utils");
const messageHelper = require("./test/helpers/message-helper");
const pdfReader = require("./test/helpers/pdfReader");

module.exports = {
  namespaces,
  email,
  ftp,
  gcs,
  iterators,
  PDF,
  pdfGenerator,
  s3,
  ses,
  sftp,
  streams,
  schemas,
  afterHook,
  fakeApi,
  fakeFtp,
  fakeGcs,
  fakeS3,
  fakeSes,
  fileUtils,
  messageHelper,
  pdfReader
};
