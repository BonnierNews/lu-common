"use strict";

const {parse} = require("csv-parse/sync");

function jsonLinesToObjectArray(content) {
  return content
    .split("\n")
    .filter((row) => Boolean(row))
    .map((row) => JSON.parse(row));
}

function objectArrayToJsonLines(content) {
  return `${content.map((row) => JSON.stringify(row)).join("\n")}\n`;
}

function csvToJsonLines(str) {
  if (!str) return;
  const objectArray = parse(str, {delimiter: ",", columns: true, relax_column_count: true}); // eslint-disable-line camelcase
  return objectArrayToJsonLines(objectArray);
}

function modifyFile(file, func) {
  return `${file.split("\n").filter(Boolean).map(JSON.parse).map(func).map(JSON.stringify).join("\n")}\n`;
}

module.exports = {jsonLinesToObjectArray, objectArrayToJsonLines, csvToJsonLines, modifyFile};
