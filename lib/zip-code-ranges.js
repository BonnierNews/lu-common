"use strict";

const tabUnique = new Set(require("../config/zip-codes/by-delivery-company/tab.json").map(String));
const zipCodeRanges = {
  tab: [...tabUnique]
};

module.exports = {zipCodeRanges};
