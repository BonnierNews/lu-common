"use strict";

const toggle = require("./helpers/toggle");

const postalDeliveryOnlyNamespaces = [ "paf" ];

// FIXME: "di" should be in commonNamespaces and salesforceCaseNamespaces, but not platformNamespaces once di is completely migrated to common
const commonNamespaces = [ "dn", "expressen", "bnlo", "paf" ];
const platformNamespaces = [ ...commonNamespaces ];
const salesforceCaseNamespaces = [ ...platformNamespaces, "di" ];

function postalDeliveryOnly(namespace) {
  return postalDeliveryOnlyNamespaces.includes(namespace);
}

function isCommonNamespace(namespace) {
  // FIXME: remove toggle once di is completely migrated to common
  if (toggle("diInCommonNamespaces") && namespace === "di") return true;
  return commonNamespaces.includes(namespace);
}

function getCommonNamespaces() {
  // FIXME: remove toggle once di is completely migrated to common
  if (toggle("diInCommonNamespaces")) return [ ...commonNamespaces, "di" ];
  return commonNamespaces;
}

module.exports = {
  getCommonNamespaces,
  isCommonNamespace,
  postalDeliveryOnly,
  platformNamespaces,
  salesforceCaseNamespaces,
};
