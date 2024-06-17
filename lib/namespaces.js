"use strict";

const postalDeliveryOnlyNamespaces = [ "paf" ];
const carrierDeliveryOnlyNamespaces = [ "bnlo", "gotamedia" ];

const commonNamespaces = [ "dn", "expressen", "bnlo" ];
const platformNamespaces = [ ...commonNamespaces, "paf" ];
const salesforceCaseNamespaces = [ ...platformNamespaces, "di" ];

function postalDeliveryOnly(namespace) {
  return postalDeliveryOnlyNamespaces.includes(namespace);
}

function carrierDeliveryOnly(namespace) {
  return carrierDeliveryOnlyNamespaces.includes(namespace);
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
  carrierDeliveryOnly,
  platformNamespaces,
  salesforceCaseNamespaces,
};
