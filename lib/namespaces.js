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

const printNamespaces = [ "dn", "expressen", ...postalDeliveryOnlyNamespaces, ...carrierDeliveryOnlyNamespaces ];
const platformNamespaces = [ ...printNamespaces ];
const salesforceCaseNamespaces = [ ...platformNamespaces, "di" ];
const commonNamespaces = [ ...salesforceCaseNamespaces, ...bbmNamespaces ];
const kayakNamespaces = [ "di", "hbl" ];
const knownNamespaces = [ ...new Set(...platformNamespaces, ...bbmNamespaces, ...kayakNamespaces) ];

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
  bbmNamespaces,
  carrierDeliveryOnly,
  carrierDeliveryOnlyNamespaces,
  commonNamespaces,
  getCommonNamespaces,
  isCommonNamespace,
  kayakNamespaces,
  knownNamespaces,
  platformNamespaces,
  postalDeliveryOnly,
  printNamespaces,
  postalDeliveryOnlyNamespaces,
  salesforceCaseNamespaces,
};
