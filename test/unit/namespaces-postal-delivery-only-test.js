import { postalDeliveryOnly } from "../../lib/namespaces.js";

const scenarios = [
  {
    expected: true,
    namespace: "paf",
    text: "Privata Affärer",
  },
  {
    expected: false,
    namespace: "some-namespace",
    text: "Some namespace",
  },
];

describe("check if postal delivery only", () => {
  for (const s of scenarios) {
    describe(s.text, () => {
      const postOk = postalDeliveryOnly(s.namespace);

      it(`should${!s.expected ? " not" : ""} only allow postal delivery`, () => {
        Boolean(postOk).should.eql(Boolean(s.expected));
      });
    });
  }
});
