const postalDeliveryOnlyNamespaces = [ "paf" ];
const carrierDeliveryOnlyNamespaces = [ "bnlo", "gotamedia" ];

const migratingNamespaces = [ "bnlo", "gotamedia" ]; // in the process of migrating to new platform

const kayakNamespaces = [ "di", "hbl" ];
const upsalesNamespaces = [
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
const commonNamespaces = [ ...platformNamespaces, "di", ...upsalesNamespaces ];
const provisionedNamespaces = [ ...migratingNamespaces, ...kayakNamespaces, ...upsalesNamespaces ];
const knownNamespaces = [ ...new Set(...platformNamespaces, ...upsalesNamespaces, ...kayakNamespaces) ];

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
  carrierDeliveryOnly,
  carrierDeliveryOnlyNamespaces,
  commonNamespaces,
  getCommonNamespaces,
  isCommonNamespace,
  kayakNamespaces,
  knownNamespaces,
  migratingNamespaces,
  platformNamespaces,
  postalDeliveryOnly,
  printNamespaces,
  provisionedNamespaces,
  postalDeliveryOnlyNamespaces,
  salesforceCaseNamespaces,
  upsalesNamespaces,
};
