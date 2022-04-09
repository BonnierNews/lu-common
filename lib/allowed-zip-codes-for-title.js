"use strict";

const expressenUnique = new Set(
  require("../config/zip-codes/expressen/printSubscriptionPostalCodesExpressen.json").map(String)
);
const kvpUnique = new Set(require("../config/zip-codes/expressen/printSubscriptionPostalCodesKvp.json").map(String));
const gtUnique = new Set(require("../config/zip-codes/expressen/printSubscriptionPostalCodesGt.json").map(String));
const wholeOfSwedenUnique = new Set([
  ...expressenUnique,
  ...kvpUnique,
  ...gtUnique,
  ...require("../config/zip-codes/dn/printAdditionalPostalCodesDN.json").map(String)
]);

const allowedPrintZipCodesForTitle = {
  expressen: [...expressenUnique],
  kvp: [...kvpUnique],
  gt: [...gtUnique],
  dn: [...wholeOfSwedenUnique]
};

module.exports = {
  allowedPrintZipCodesForTitle
};
