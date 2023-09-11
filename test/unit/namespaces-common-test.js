"use strict";

const { isCommonNamespace, getCommonNamespaces } = require("../../lib/namespaces");
// FIXME: get rid of expectedNamespacesOld once paf have migrated
const expectedNamespaces = [ "bnlo", "dn", "expressen", "paf" ];
const expectedNamespacesOld = [ "bnlo", "dn", "expressen" ];

describe("isCommonNamespace (paf toggled off)", () => {
  beforeEach(() => {
    process.env["NODE-DISABLE-TOGGLE"] = "pafInCommonNamespaces";
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

  it("should NOT confirm 'di' as part of common namespace", () => {
    const result = isCommonNamespace("di");
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

  it("should NOT confirm 'di' as part of common namespace", () => {
    const result = isCommonNamespace("di");
    result.should.equal(false);
  });

  it("should give us a list of common namespaces", () => {
    JSON.stringify(getCommonNamespaces().sort()).should.equal(JSON.stringify(expectedNamespaces));
  });
});
