"use strict";

const fs = require("fs");

module.exports = function (results) {
  const result = results[0];
  if (result.output === undefined) {
    return fs.readFileSync(result.filePath, {encoding: "utf8"}).trim();
  }
  return result.output.trim();
};
