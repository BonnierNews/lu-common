import { isCommonNamespace, getCommonNamespaces, carrierDeliveryOnlyNamespaces, postalDeliveryOnlyNamespaces } from "../../lib/namespaces.js";

const expectedNamespaces = [
  "bbm-aktuellhallbarhet",
  "bbm-byggindustrin",
  "bbm-dagensmedicin",
  "bbm-dagenssamhalle",
  "bbm-dagligvarunytt",
  "bbm-dam",
  "bbm-fastighetsnytt",
  "bbm-market",
  "bbm-news",
  "bbm-res",
  "bnlo",
  "di",
  "dn",
  "expressen",
  "gotamedia",
  "paf",
];

const expectedPostalDeliveryOnlyNamespaces = [ "paf" ];
const expectedCarrierOnlyNamespaces = [ "bnlo", "gotamedia" ];

describe("isCommonNamespace", () => {
  expectedNamespaces.forEach((namespace) => {
    it(`should confirm '${namespace}' as part of common namespace`, () => {
      const result = isCommonNamespace(namespace);
      result.should.equal(true);
    });
  });

  it("should NOT confirm 'whatever' as part of common namespace", () => {
    const result = isCommonNamespace("whatever");
    result.should.equal(false);
  });

  it("should give us a list of common namespaces", () => {
    JSON.stringify(getCommonNamespaces().sort()).should.equal(JSON.stringify(expectedNamespaces));
  });

  it("should give us a list of carrier only namespaces", () => {
    JSON.stringify(carrierDeliveryOnlyNamespaces.sort()).should.equal(JSON.stringify(expectedCarrierOnlyNamespaces));
  });

  it("should give us a list of postal delivery only namespaces", () => {
    JSON.stringify(postalDeliveryOnlyNamespaces.sort()).should.equal(JSON.stringify(expectedPostalDeliveryOnlyNamespaces));
  });
});
