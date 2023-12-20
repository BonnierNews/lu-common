"use strict";

const common = require("../../index");
const fs = require("fs");
const path = require("path");

const paths = [ "lib", "test/helpers" ];
const allExports = [];
for (const basePath of paths) {
  allExports.push(...getPathExports(basePath));
}

const expectedExports = [
  // helpers
  "caseBodyHelper",
  "codeHelper",
  "toggle",
  // utils
  "email",
  "formatAmount",
  "ftp",
  "gcpAuth",
  "gcs",
  "http",
  "iterators",
  "json",
  "parseUserIdParts",
  "parseUserId",
  "PDF",
  "pdfGenerator",
  "s3",
  "ses",
  "sftp",
  "streams",
  "swedishBankday",
  "userId",
  // validation helpers
  "countryCodes",
  "formattingHelpers",
  "schemas",
  "stripSchemaTag",
  // other
  "namespaces",
  "titles",
  // test helpers
  "fakeS3",
  "fakeSes",
];

describe("Exposed features", () => {
  const exposedExports = [];
  for (const c in common) {
    exposedExports.push(c.toString());
  }

  describe("everything we expect to export is exposed", () => {
    for (const expectedExport of expectedExports) {
      it(`${expectedExport} should be exposed`, () => {
        exposedExports.should.include(expectedExport);
      });
    }
  });

  describe("everything we expose is expected", () => {
    for (const exposedExport of exposedExports) {
      it(`${exposedExport} is supposed to be exposed`, () => {
        expectedExports.should.include(exposedExport);
      });
    }
  });

  describe("everything exported by modules is exposed in lu-common", () => {
    for (const expectedExport of allExports) {
      it(`should export ${expectedExport}`, () => {
        exposedExports.should.include(expectedExport);
      });
    }
  });
});

function toCamelCase(fileName) {
  return fileName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

function getPathExports(basePath) {
  const exports = [];
  const normalizedPath = path.join(__dirname, "..", "..", basePath);
  fs.readdirSync(normalizedPath).forEach((file) => {
    const filePath = path.join(normalizedPath, file);
    const stats = fs.statSync(filePath);

    // get all exports from subdirectories too
    if (stats.isDirectory()) exports.push(...getPathExports(path.join(basePath, file)));
    else {
      const importName = file === "pdf.js" ? "PDF" : toCamelCase(file.replace(".js", ""));
      exports.push(importName);
    }
  });
  return exports;
}
