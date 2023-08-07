"use strict";

const postalDeliveryOnlyNamespaces = [ "paf" ];

const commonNamespaces = [ "dn", "expressen", "bnlo" ];
const sfNamespaces = [ ...commonNamespaces, "paf" ];
const sfCaseNamespaces = [ ...sfNamespaces, "di" ];

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
  sfNamespaces,
  sfCaseNamespaces,
};
