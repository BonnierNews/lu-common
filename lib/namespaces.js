const postalDeliveryOnlyNamespaces = [ "paf" ];
const carrierDeliveryOnlyNamespaces = [ "bnlo", "gotamedia" ];

const bbmNamespaces = [
  "bbm-aktuellhallbarhet",
  "bbm-byggindustrin",
  "bbm-dagensmedicin",
  "bbm-dagenssamhalle",
  "bbm-dagligvarunytt",
  "bbm-dam",
  "bbm-fastighetsnytt",
  "bbm-market",
  "bbm-res",
  "bbm-news",
];

const platformNamespaces = [ "dn", "expressen", "bnlo", "paf", "gotamedia" ];
const salesforceCaseNamespaces = [ ...platformNamespaces, "di" ];
const commonNamespaces = [ ...platformNamespaces, "di", ...bbmNamespaces ];

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

export {
  getCommonNamespaces,
  isCommonNamespace,
  postalDeliveryOnly,
  carrierDeliveryOnly,
  platformNamespaces,
  salesforceCaseNamespaces,
};
