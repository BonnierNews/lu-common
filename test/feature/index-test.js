"use strict";

const common = require("../../index");
const expect = require("chai").expect;

const expectedExports = [
  "namespaces",
  "schemas",
  "email",
  "ftp",
  "gcs",
  "iterators",
  "PDF",
  "pdfGenerator",
  "s3",
  "ses",
  "sftp",
  "streams",
  "fakeApi",
  "afterHook",
  "fakeFtp",
  "fakeGcs",
  "fakeS3",
  "fakeSes",
  "fileUtils",
  "messageHelper",
  "pdfReader",
  "stripSchemaTag",
  "countryCodes"
];

describe("Exposed features", () => {
  const exports = [];

  for (const c in common) {
    exports.push(c.toString());
  }

  describe("Importing default export", () => {
    it(`The right stuff gets imported`, () => {
      const list = exports.filter((val) => !expectedExports.includes(val));
      const list2 = expectedExports.filter((val) => !exports.includes(val));
      expect(list.length).to.equal(0);
      expect(list2.length).to.equal(0);
    });
  });
});
