"use strict";

function postalDeliveryAllowed(namespace) {
  return namespace === "dn";
}

module.exports = {
  postalDeliveryAllowed
};
