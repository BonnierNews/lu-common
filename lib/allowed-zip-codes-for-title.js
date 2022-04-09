"use strict";

const expressenBase = require("../config/zip-codes/expressen/printSubscriptionPostalCodesExpressen.json").map(String);
const wholeOfSweden = [
  ...expressenBase,
  ...require("../config/zip-codes/dn/printAdditionalPostalCodesDN.json").map(String)
];

const allowedPrintZipCodesForTitle = {
  expressen: expressenBase,
  kvp: require("../config/zip-codes/expressen/printSubscriptionPostalCodesKvp.json").map(String),
  gt: require("../config/zip-codes/expressen/printSubscriptionPostalCodesGt.json").map(String),
  dn: wholeOfSweden
};

module.exports = {
  allowedPrintZipCodesForTitle
};
