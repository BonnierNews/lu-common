import toggle from "./helpers/toggle.js";

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

// FIXME: "di" should be in commonNamespaces and salesforceCaseNamespaces, but not platformNamespaces once di is completely migrated to common
// FIXME: bbmNamespaces should be in commonNamespaces once bbm is completely migrated to common
const commonNamespaces = [ "dn", "expressen", "bnlo", "paf" ];
const platformNamespaces = [ ...commonNamespaces ];
const salesforceCaseNamespaces = [ ...platformNamespaces, "di" ];

function postalDeliveryOnly(namespace) {
  return postalDeliveryOnlyNamespaces.includes(namespace);
}

function carrierDeliveryOnly(namespace) {
  return carrierDeliveryOnlyNamespaces.includes(namespace);
}

function isCommonNamespace(namespace) {
  // FIXME: remove toggle once di is completely migrated to common
  if (toggle("diInCommonNamespaces") && namespace === "di") return true;
  // FIXME: remove toggle once bbm is completely migrated to common
  if (toggle("bbmInCommonNamespaces") && bbmNamespaces.includes(namespace)) return true;
  // FIXME: remove toggle once gotamedia is completely migrated to common
  if (toggle("gotamediaInCommonNamespaces") && namespace === "gotamedia") return true;

  return commonNamespaces.includes(namespace);
}

function getCommonNamespaces() {
  const output = [ ...commonNamespaces ];
  // FIXME: remove toggle once di is completely migrated to common
  if (toggle("diInCommonNamespaces")) output.push("di");
  // FIXME: remove toggle once bbm is completely migrated to common
  if (toggle("bbmInCommonNamespaces")) output.push(...bbmNamespaces);
  // FIXME: remove toggle once bbm-news is completely migrated to common
  if (toggle("gotamediaInCommonNamespaces")) output.push("gotamedia");
  // FIXME: just return commonNamespaces
  return output;
}


module.exports = {
  getCommonNamespaces,
  isCommonNamespace,
  postalDeliveryOnly,
  carrierDeliveryOnly,
  platformNamespaces,
  salesforceCaseNamespaces,
};
