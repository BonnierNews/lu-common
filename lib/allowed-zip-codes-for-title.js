"use strict";

const expressenUnique = new Set(require("../config/zip-codes/by-namespace/expressen/expressen.json").map(String));
const kvpUnique = new Set(require("../config/zip-codes/by-namespace/expressen/kvp.json").map(String));
const gtUnique = new Set(require("../config/zip-codes/by-namespace/expressen/gt.json").map(String));
const wholeOfSwedenUnique = new Set([
  ...expressenUnique,
  ...kvpUnique,
  ...gtUnique,
  ...require("../config/zip-codes/by-namespace/dn/dn--extra.json").map(String),
  ...require("../config/zip-codes/by-delivery-company/tab.json").map(String)
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
