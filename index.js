"use strict";

// helpers
const caseBodyHelper = require("./lib/helpers/case-body-helper");
const codeHelper = require("./lib/helpers/code-helper");
const toggle = require("./lib/helpers/toggle");

// utils
const email = require("./lib/utils/email");
const formatAmount = require("./lib/utils/format-amount");
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
const { parseUserId, parseUserIdParts } = userId;

// validation helpers
const countryCodes = require("./lib/validation-helpers/country-codes");
const formattingHelpers = require("./lib/validation-helpers/formatting-helpers");
const schemas = require("./lib/validation-helpers/schemas");
const stripSchemaTag = require("./lib/validation-helpers/strip-schema-tag");

// other
const namespaces = require("./lib/namespaces");
const titles = require("./lib/titles");

// test helpers
const fakeS3 = require("./test/helpers/fake-s3");
const fakeSes = require("./test/helpers/fake-ses");

module.exports = {
  // helpers
  caseBodyHelper,
  codeHelper,
  toggle,
  // utils
  email,
  formatAmount,
  ftp,
  gcpAuth,
  gcs,
  http,
  iterators,
  json,
  parseUserId,
  parseUserIdParts,
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
  fakeS3,
  fakeSes,
};
