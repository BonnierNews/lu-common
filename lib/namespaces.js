import toggle from "./helpers/toggle.js";

const postalDeliveryOnlyNamespaces = [ "paf" ];
// FIXME: add bbm-news to this list once bbm-news has migrated to common
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
];

// FIXME: "di" should be in commonNamespaces and salesforceCaseNamespaces, but not platformNamespaces once di is completely migrated to common
// FIXME: bbmNamespaces should be in commonNamespaces once bbm is completely migrated to common
const commonNamespaces = [ "dn", "expressen", "bnlo", "paf", "gotamedia" ];
const platformNamespaces = [ ...commonNamespaces ];
const salesforceCaseNamespaces = [ ...platformNamespaces, "di" ];

function postalDeliveryOnly(namespace) {
  return postalDeliveryOnlyNamespaces.includes(namespace);
}

function isCommonNamespace(namespace) {
  // FIXME: remove toggle once di is completely migrated to common
  if (toggle("diInCommonNamespaces") && namespace === "di") return true;
  // FIXME: remove toggle once bbm is completely migrated to common
  if (toggle("bbmInCommonNamespaces") && bbmNamespaces.includes(namespace)) return true;
  // FIXME: remove toggle once bbm-news is completely migrated to common
  if (toggle("bbmNewsInCommonNamespaces") && namespace === "bbm-news") return true;

  return commonNamespaces.includes(namespace);
}

function getCommonNamespaces() {
  const output = [ ...commonNamespaces ];
  // FIXME: remove toggle once di is completely migrated to common
  if (toggle("diInCommonNamespaces")) output.push("di");
  // FIXME: remove toggle once bbm is completely migrated to common
  if (toggle("bbmInCommonNamespaces")) output.push(...bbmNamespaces);
  // FIXME: remove toggle once bbm-news is completely migrated to common
  if (toggle("bbmNewsInCommonNamespaces")) output.push("bbm-news");
  // FIXME: just return commonNamespaces
  return output;
}

export { getCommonNamespaces, isCommonNamespace, postalDeliveryOnly, platformNamespaces, salesforceCaseNamespaces };
