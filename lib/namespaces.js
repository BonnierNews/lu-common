"use strict";

const toggle = require("./helpers/toggle");

const postalDeliveryOnlyNamespaces = [ "paf" ];

const commonNamespaces = [ "dn", "expressen", "bnlo" ];
const platformNamespaces = [ ...commonNamespaces, "paf" ];
const salesforceCaseNamespaces = [ ...platformNamespaces, "di" ];

function postalDeliveryOnly(namespace) {
  return postalDeliveryOnlyNamespaces.includes(namespace);
}

function isCommonNamespace(namespace) {
  // FIXME: just add "paf" to commonNamespaces and remove this if once paf is completely migrated
  if (toggle("pafInCommonNamespaces") && namespace === "paf") return true;
  return commonNamespaces.includes(namespace);
}

function getCommonNamespaces() {
  // FIXME: just add "paf" to commonNamespaces and remove this if once paf is completely migrated
  if (toggle("pafInCommonNamespaces")) return [ ...commonNamespaces, "paf" ];
  return commonNamespaces;
}

module.exports = {
  getCommonNamespaces,
  isCommonNamespace,
  postalDeliveryOnly,
  platformNamespaces,
  salesforceCaseNamespaces,
};
