"use strict";

const wholeOfSweden = require("./expressen/printSubscriptionPostalCodesExpressen.json").map(String);

const allowedPrintZipCodesForTitle = {
  expressen: wholeOfSweden,
  kvp: require("./expressen/printSubscriptionPostalCodesKvp.json").map(String),
  gt: require("./expressen/printSubscriptionPostalCodesGt.json").map(String),
  dn: wholeOfSweden
};

module.exports = allowedPrintZipCodesForTitle;
