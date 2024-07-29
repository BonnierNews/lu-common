import { getNamespaceByTitle } from "../../lib/titles.js";

const testCases = [
  { title: "dn", namespace: "dn" },
  { title: "di", namespace: "di" },
  { title: "expressen", namespace: "expressen" },
  { title: "lj", namespace: "bnlo" }, // a local title by real title
  { title: "ljusnan", namespace: "bnlo" }, // the same local title by alternative title
  { title: "paf", namespace: "paf" },
  { title: "smp", namespace: "gotamedia" },
];

describe("get namespace by title", () => {
  for (const tc of testCases) {
    it(`should return ${tc.namespace} for: ${tc.title}`, () => {
      const namespace = getNamespaceByTitle(tc.title);
      namespace.should.eql(tc.namespace);
    });
  }
  it("should raise an error for a title that does not exist", () => {
    try {
      getNamespaceByTitle("some-title");
    } catch (error) {
      error.message.should.eql("title some-title not found in product-mapping. Check product-mapping config");
    }
  });
});
