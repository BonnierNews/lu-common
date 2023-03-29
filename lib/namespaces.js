"use strict";

const postalDeliveryAllowedNamespaces = ["dn", "paf"];
const postalDeliveryOnlyNamespaces = ["paf"];

const commonNamespaces = ["dn", "expressen", "bnlo"];

function postalDeliveryAllowed(namespace) {
  return postalDeliveryAllowedNamespaces.includes(namespace);
}

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
  postalDeliveryAllowed,
  postalDeliveryOnly
};
