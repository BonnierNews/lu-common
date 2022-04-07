"use strict";

const wholeOfSweden = [
  ...require("../config/zip-codes/expressen/printSubscriptionPostalCodesExpressen.json").map(String),
  ...require("../config/zip-codes/premoAddressedPostalCodes.json").map(String)
];

const allowedPrintZipCodesForTitle = {
  expressen: require("../config/zip-codes/expressen/printSubscriptionPostalCodesExpressen.json").map(String),
  kvp: require("../config/zip-codes/expressen/printSubscriptionPostalCodesKvp.json").map(String),
  gt: require("../config/zip-codes/expressen/printSubscriptionPostalCodesGt.json").map(String),
  dn: [...wholeOfSweden, ...require("../config/zip-codes/dn/additionalPostCodes.json").map(String)]
};

module.exports = {
  allowedPrintZipCodesForTitle
};
