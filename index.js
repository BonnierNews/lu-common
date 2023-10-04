"use strict";

// helpers
const caseBodyHelper = require("./lib/helpers/case-body-helper");
const codeHelper = require("./lib/helpers/code-helper");
const toggle = require("./lib/helpers/toggle");

// utils
const email = require("./lib/utils/email");
const ftp = require("./lib/utils/ftp");
const gcpAuth = require("./lib/utils/gcp-auth");
const gcs = require("./lib/utils/gcs");
const http = require("./lib/utils/http");
const iterators = require("./lib/utils/iterators");
const PDF = require("./lib/utils/pdf");
const pdfGenerator = require("./lib/utils/pdfGenerator");
const s3 = require("./lib/utils/s3");
const ses = require("./lib/utils/ses");
const sftp = require("./lib/utils/sftp");
const streams = require("./lib/utils/streams");
const swedishBankday = require("./lib/utils/swedish-bankday");
const json = require("./lib/utils/json");
const userId = require("./lib/utils/userId");

// validation helpers
const countryCodes = require("./lib/validation-helpers/country-codes");
const formattingHelpers = require("./lib/validation-helpers/formatting-helpers");
const schemas = require("./lib/validation-helpers/schemas");
const stripSchemaTag = require("./lib/validation-helpers/strip-schema-tag");

// other
const namespaces = require("./lib/namespaces");
const titles = require("./lib/titles");

// test helpers
const clone = require("./test/helpers/clone");
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

module.exports = {
  // helpers
  caseBodyHelper,
  codeHelper,
  toggle,
  // utils
  email,
  ftp,
  gcpAuth,
  gcs,
  http,
  iterators,
  json,
  parseUserId: userId.parseUserId,
  parseUserIdParts: userId.parseUserIdParts,
  PDF,
  pdfGenerator,
  s3,
  ses,
  sftp,
  streams,
  swedishBankday,
  userId,
  // validation helpers
  countryCodes,
  formattingHelpers,
  schemas,
  stripSchemaTag,
  // other
  namespaces,
  titles,
  // test helpers
  clone,
  fakeApi,
  fakeFtp,
  fakeGcpAuth,
  fakeGcs,
  fakeS3,
  fakeSes,
  fakeSftp,
  fileUtils,
  messageHelper,
  pdfReader,
};
