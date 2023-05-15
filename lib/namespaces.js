"use strict";

const postalDeliveryAllowedNamespaces = ["dn", "paf", "plg"];
const postalDeliveryOnlyNamespaces = ["paf", "plg"];

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
