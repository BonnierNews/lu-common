"use strict";
function trimmer(obj) {
  if (!obj || typeof obj !== "object") return obj;

  return Object.entries(obj).reduce((acc, [ key, val ]) => {
    acc[key] = val && typeof val === "string" ? val.trim() : val;
    return acc;
  }, {});
}

module.exports = trimmer;
