"use strict";

const postalDeliveryOnlyNamespaces = [ "paf" ];

const commonNamespaces = [ "dn", "expressen", "bnlo" ];
const platformNamespaces = [ ...commonNamespaces, "paf" ];
const salesforceCaseNamespaces = [ ...platformNamespaces, "di" ];

function postalDeliveryOnly(namespace) {
  return postalDeliveryOnlyNamespaces.includes(namespace);
}

function isCommonNamespace(namespace) {
  return commonNamespaces.includes(namespace);
}

function getCommonNamespaces() {
  return commonNamespaces;
}

module.exports = {
  getCommonNamespaces,
  isCommonNamespace,
  postalDeliveryOnly,
  platformNamespaces,
  salesforceCaseNamespaces,
};
