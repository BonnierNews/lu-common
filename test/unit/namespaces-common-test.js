import { isCommonNamespace, getCommonNamespaces } from "../../lib/namespaces.js";
// FIXME: get rid of expectedNamespacesNoDi, expectedNamespacesNoBbm, expectedNamespacesNoGotaMedia + related test once di and bbm have migrated
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
  "gotamedia",
  "paf",
];
const expectedNamespacesNoBbm = [ "bnlo", "di", "dn", "expressen", "gotamedia", "paf" ];
const expectedNamespacesNoGotaMedia = [
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

describe("isCommonNamespace (gotamedia toggled off)", () => {
  beforeEach(() => {
    process.env["NODE-DISABLE-TOGGLE"] = "gotamediaInCommonNamespaces";
  });
  after(() => {
    process.env["NODE-DISABLE-TOGGLE"] = undefined;
  });
  expectedNamespacesNoGotaMedia.forEach((namespace) => {
    it(`should confirm '${namespace}' as part of common namespace`, () => {
      const result = isCommonNamespace(namespace);
      result.should.equal(true);
    });
  });

  it("should NOT confirm 'di' as part of common namespace", () => {
    const result = isCommonNamespace("gotamedia");
    result.should.equal(false);
  });

  it("should give us a list of common namespaces", () => {
    JSON.stringify(getCommonNamespaces().sort()).should.equal(JSON.stringify(expectedNamespacesNoGotaMedia));
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
