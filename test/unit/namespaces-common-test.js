import { isCommonNamespace, getCommonNamespaces } from "../../lib/namespaces.js";

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
});
