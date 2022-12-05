"use strict";

function jsonLinesToObjectArray(content) {
  return content
    .split("\n")
    .filter((row) => Boolean(row))
    .map((row) => JSON.parse(row));
}

function objectArrayToJsonLines(content) {
  return `${content.map((row) => JSON.stringify(row)).join("\n")}\n`;
}

module.exports = {jsonLinesToObjectArray, objectArrayToJsonLines};
