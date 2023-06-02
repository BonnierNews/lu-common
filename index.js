"use strict";

const namespaces = require("./lib/namespaces");
const titles = require("./lib/titles");
const schemas = require("./lib/validation-helpers/schemas");
const countryCodes = require("./lib/validation-helpers/country-codes");
const formattingHelpers = require("./lib/validation-helpers/formatting-helpers");

const stripSchemaTag = require("./lib/validation-helpers/strip-joi-schema-tags");

const caseBodyHelper = require("./lib/helpers/case-body-helper");
const codeHelper = require("./lib/helpers/code-helper");
const email = require("./lib/utils/email");
const ftp = require("./lib/utils/ftp");
const gcpAuth = require("./lib/utils/gcp-auth");
const gcs = require("./lib/utils/gcs");
const iterators = require("./lib/utils/iterators");
const PDF = require("./lib/utils/pdf");
const pdfGenerator = require("./lib/utils/pdfGenerator");
const s3 = require("./lib/utils/s3");
const ses = require("./lib/utils/ses");
const sftp = require("./lib/utils/sftp");
const streams = require("./lib/utils/streams");

const fakeApi = require("./test/helpers/fake-api");
const fakeFtp = require("./test/helpers/fake-ftp");
const fakeGcpAuth = require("./test/helpers/fake-gcp-auth");
const fakeGcs = require("./test/helpers/fake-gcs");
const fakeS3 = require("./test/helpers/fake-s3");
const fakeSes = require("./test/helpers/fake-ses");
const fakeSftp = require("./test/helpers/fake-sftp");
const fileUtils = require("./test/helpers/file-utils");
const messageHelper = require("./test/helpers/message-helper");
const pdfReader = require("./test/helpers/pdfReader");
const clone = require("./test/helpers/clone");

module.exports = {
  caseBodyHelper,
  codeHelper,
  countryCodes,
  email,
  fakeApi,
  fakeFtp,
  fakeGcpAuth,
  fakeGcs,
  fakeS3,
  fakeSes,
  fakeSftp,
  fileUtils,
  formattingHelpers,
  ftp,
  gcpAuth,
  gcs,
  iterators,
  messageHelper,
  namespaces,
  titles,
  PDF,
  pdfGenerator,
  pdfReader,
  schemas,
  s3,
  ses,
  sftp,
  streams,
  stripSchemaTag,
  clone
};
