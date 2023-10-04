"use strict";
const fs = require("fs");

function importJson(path) {
  const root = process.cwd();

  return JSON.parse(fs.readFileSync(`${root}/${path}`).toString());
}

module.exports = { importJson };
