"use strict";

const { isCommonNamespace, getCommonNamespaces } = require("../../lib/namespaces");
// FIXME: get rid of expectedNamespacesOld + related test once paf have migrated
const expectedNamespaces = [ "bnlo", "di", "dn", "expressen", "paf" ];
const expectedNamespacesOld = [ "bnlo", "dn", "expressen", "paf" ];

describe("isCommonNamespace (di toggled off)", () => {
  beforeEach(() => {
    process.env["NODE-DISABLE-TOGGLE"] = "diInCommonNamespaces";
  });
  after(() => {
    process.env["NODE-DISABLE-TOGGLE"] = undefined;
  });
  expectedNamespacesOld.forEach((namespace) => {
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
    JSON.stringify(getCommonNamespaces().sort()).should.equal(JSON.stringify(expectedNamespacesOld));
  });
});

describe("isCommonNamespace", () => {
  expectedNamespaces.forEach((namespace) => {
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
    JSON.stringify(getCommonNamespaces().sort()).should.equal(JSON.stringify(expectedNamespaces));
  });
});
