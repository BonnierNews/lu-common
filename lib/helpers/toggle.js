"use strict";
const config = require("exp-config");

const knownToggles = [
  "pafInCommonNamespaces",
];

knownToggles.sort();

config.toggle = config.toggle || {};

/* c8 ignore start */
function toggle(name) {
  if (knownToggles.indexOf(name) === -1) {
    throw new Error(`Unknown toggle '${name}'`);
  }
  if (process.env.NODE_ENV === "test") {
    if (process.env["NODE-DISABLE-TOGGLE"] === name) return false;
    return true;
  }
  const value = config.toggle[name];
  return value === true || value === "true";
}
/* c8 ignore stop */

toggle.knownToggles = knownToggles;

module.exports = toggle;
