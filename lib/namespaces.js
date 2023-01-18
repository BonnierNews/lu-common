"use strict";

const postalDeliveryAllowedNamespaces = ["dn"];

const commonNamespaces = ["dn", "expressen", "bnlo"];

function postalDeliveryAllowed(namespace) {
  return postalDeliveryAllowedNamespaces.includes(namespace);
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
  postalDeliveryAllowed
};
