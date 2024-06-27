import { printNamespaces } from "../../lib/namespaces.js";

const expectedPrintNamespaces = [ "dn", "expressen", "bnlo", "paf", "gotamedia" ];

describe("printNamespaces", () => {
  it("should give us the expected print namespaces", () => {
    JSON.stringify(printNamespaces.sort()).should.equal(JSON.stringify(expectedPrintNamespaces.sort()));
  });

  it("should NOT contain 'whatever' as part of print namespace", () => {
    const result = expectedPrintNamespaces.includes("whatever");
    result.should.equal(false);
  });
});
