"use strict";

const postalDeliveryAllowedTitles = [ "dn", "paf", "plg" ];

function postalDeliveryAllowed(title) {
  return postalDeliveryAllowedTitles.includes(title);
}

module.exports = { postalDeliveryAllowed };
