"use strict";

const wholeOfSweden = require("../config/zip-codes/expressen/printSubscriptionPostalCodesExpressen.json").map(String);

const allowedPrintZipCodesForTitle = {
  expressen: wholeOfSweden,
  kvp: require("../config/zip-codes/expressen/printSubscriptionPostalCodesKvp.json").map(String),
  gt: require("../config/zip-codes/expressen/printSubscriptionPostalCodesGt.json").map(String),
  dn: wholeOfSweden
};

module.exports = {
  allowedPrintZipCodesForTitle
};
