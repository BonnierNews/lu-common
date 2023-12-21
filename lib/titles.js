const postalDeliveryAllowedTitles = [ "dn", "paf", "plg" ];

function postalDeliveryAllowed(title) {
  return postalDeliveryAllowedTitles.includes(title);
}

export { postalDeliveryAllowed };
