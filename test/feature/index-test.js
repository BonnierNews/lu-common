"use strict";

const common = require("../../index");
const expect = require("chai").expect;
const fs = require("fs");
const path = require("path");

const paths = [ "lib", "lib/helpers", "lib/utils", "lib/validation-helpers", "test/helpers" ];
const allExports = [];
for (const basePath of paths) {
  const normalizedPath = path.join(__dirname, "..", "..", basePath);
  fs.readdirSync(normalizedPath).forEach((file) => {
    const filePath = path.join(normalizedPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) return; // don't traverse subdirectories
    console.log("file :>> ", file);
    let importName;
    switch (file) {
      case "pdf.js":
        importName = "PDF";
        break;
      case "strip-joi-schema-tags.js":
        importName = "stripSchemaTag";
        break;
      default:
        importName = toCamelCase(file.replace(".js", ""));
        break;
    }
    console.log("importName :>> ", importName);
    allExports.push(importName);
  });
}
console.log("allExports :>> ", allExports);

const expectedExports = [
  "caseBodyHelper",
  "codeHelper",
  "namespaces",
  "titles",
  "schemas",
  "email",
  "ftp",
  "gcpAuth",
  "gcs",
  "http",
  "swedishBankday",
  "iterators",
  "PDF",
  "pdfGenerator",
  "s3",
  "ses",
  "sftp",
  "streams",
  "fakeApi",
  "fakeFtp",
  "fakeGcpAuth",
  "fakeGcs",
  "fakeS3",
  "fakeSes",
  "fakeSftp",
  "fileUtils",
  "messageHelper",
  "pdfReader",
  "stripSchemaTag",
  "countryCodes",
  "formattingHelpers",
  "clone",
];

describe("Exposed features", () => {
  const exports = [];
  for (const c in common) {
    exports.push(c.toString());
  }

  describe("everything exported as lu-common is actually exported", () => {
    for (const actualExport of exports) {
      it(`should export ${actualExport}`, () => {
        allExports.should.include(actualExport);
      });
    }
  });

  describe("everything exported is exposed as lu-common", () => {
    for (const expectedExport of allExports) {
      it(`should export ${expectedExport}`, () => {
        exports.should.include(expectedExport);
      });
    }
  });
});

function toCamelCase(fileName) {
  return fileName.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}
