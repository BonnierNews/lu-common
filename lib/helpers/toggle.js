"use strict";
const { toggle: configToggles = {} } = require("exp-config");

const knownToggles = Object.keys(configToggles).sort();

/* c8 ignore start */
function toggle(name) {
  if (knownToggles.indexOf(name) === -1) {
    throw new Error(`Unknown toggle '${name}'`);
  }
  if (process.env.NODE_ENV === "test") {
    if (process.env["NODE-DISABLE-TOGGLE"].split(",").includes(name)) return false;
    return true;
  }
  const value = configToggles[name];
  return value === true || value === "true";
}
/* c8 ignore stop */

toggle.knownToggles = knownToggles;

module.exports = toggle;
