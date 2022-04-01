"use strict";

function postenDeliveryAllowed(namespace) {
  return namespace === "dn";
}

module.exports = {
  postenDeliveryAllowed
};
