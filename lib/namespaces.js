"use strict";

const postalDeliveryAllowedNamespaces = [ "dn" ];

function postalDeliveryAllowed(namespace) {
  return postalDeliveryAllowedNamespaces.includes(namespace);
}

module.exports = { postalDeliveryAllowed };
