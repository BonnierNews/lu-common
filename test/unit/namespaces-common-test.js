"use strict";

const { isCommonNamespace, getCommonNamespaces } = require("../../lib/namespaces");
// FIXME: get rid of expectedNamespacesNoDi, expectedNamespacesNoBbm, expectedNamespacesNoBbmNews + related test once di and bbm have migrated
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
  "paf",
];
const expectedNamespacesNoDi = [
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
  "dn",
  "expressen",
  "paf",
];
const expectedNamespacesNoBbm = [ "bbm-news", "bnlo", "di", "dn", "expressen", "paf" ];
const expectedNamespacesNoBbmNews = [
  "bbm-aktuellhallbarhet",
  "bbm-byggindustrin",
  "bbm-dagensmedicin",
  "bbm-dagenssamhalle",
  "bbm-dagligvarunytt",
  "bbm-dam",
  "bbm-fastighetsnytt",
  "bbm-market",
  "bbm-res",
  "bnlo",
  "di",
  "dn",
  "expressen",
  "paf",
];

describe("isCommonNamespace (di toggled off)", () => {
  beforeEach(() => {
    process.env["NODE-DISABLE-TOGGLE"] = "diInCommonNamespaces";
  });
  after(() => {
    process.env["NODE-DISABLE-TOGGLE"] = undefined;
  });
  expectedNamespacesNoDi.forEach((namespace) => {
    it(`should confirm '${namespace}' as part of common namespace`, () => {
      const result = isCommonNamespace(namespace);
      result.should.equal(true);
    });
  });

  it("should NOT confirm 'di' as part of common namespace", () => {
    const result = isCommonNamespace("di");
    result.should.equal(false);
  });

  it("should give us a list of common namespaces", () => {
    JSON.stringify(getCommonNamespaces().sort()).should.equal(JSON.stringify(expectedNamespacesNoDi));
  });
});

describe("isCommonNamespace (bbm-* toggled off)", () => {
  beforeEach(() => {
    process.env["NODE-DISABLE-TOGGLE"] = "bbmInCommonNamespaces";
  });
  after(() => {
    process.env["NODE-DISABLE-TOGGLE"] = undefined;
  });
  expectedNamespacesNoBbm.forEach((namespace) => {
    it(`should confirm '${namespace}' as part of common namespace`, () => {
      const result = isCommonNamespace(namespace);
      result.should.equal(true);
    });
  });

  it("should NOT confirm 'bbm-dam' as part of common namespace", () => {
    const result = isCommonNamespace("bbm-dam");
    result.should.equal(false);
  });

  it("should give us a list of common namespaces", () => {
    JSON.stringify(getCommonNamespaces().sort()).should.equal(JSON.stringify(expectedNamespacesNoBbm));
  });
});

describe("isCommonNamespace (bbm-news toggled off)", () => {
  beforeEach(() => {
    process.env["NODE-DISABLE-TOGGLE"] = "bbmNewsInCommonNamespaces";
  });
  after(() => {
    process.env["NODE-DISABLE-TOGGLE"] = undefined;
  });
  expectedNamespacesNoBbmNews.forEach((namespace) => {
    it(`should confirm '${namespace}' as part of common namespace`, () => {
      const result = isCommonNamespace(namespace);
      result.should.equal(true);
    });
  });

  it("should NOT confirm 'bbm-news' as part of common namespace", () => {
    const result = isCommonNamespace("bbm-news");
    result.should.equal(false);
  });

  it("should give us a list of common namespaces", () => {
    JSON.stringify(getCommonNamespaces().sort()).should.equal(JSON.stringify(expectedNamespacesNoBbmNews));
  });
});

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
