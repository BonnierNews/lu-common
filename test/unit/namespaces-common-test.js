"use strict";

const {isCommonNamespace} = require("../../lib/namespaces");

describe("isCommonNamespace", () => {
  ["dn", "expressen", "bnlo"].forEach((namespace) => {
    it(`should confirm '${namespace}' as part of common namespace`, () => {
      const result = isCommonNamespace(namespace);
      result.should.equal(true);
    });
  });

  it("should NOT confirm 'di' as part of common namespace", () => {
    const result = isCommonNamespace("di");
    result.should.equal(false);
  });
});
