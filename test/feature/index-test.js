"use strict";

const common = require("../../index");
const fs = require("fs");
const path = require("path");
// TODO: SIVA export toggle?
const paths = [ "lib", "lib/helpers", "lib/utils", "lib/validation-helpers", "test/helpers" ];
const allExports = [];
for (const basePath of paths) {
  const normalizedPath = path.join(__dirname, "..", "..", basePath);
  fs.readdirSync(normalizedPath).forEach((file) => {
    const filePath = path.join(normalizedPath, file);
    const stats = fs.statSync(filePath);
    // TODO: SIVA traverse subdirectories too, instead of specifying them explicitly
    if (stats.isDirectory()) return; // don't traverse subdirectories
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
    allExports.push(importName);
  });
}

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
