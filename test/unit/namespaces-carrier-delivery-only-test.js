import { carrierDeliveryOnly } from "../../lib/namespaces.js";

const scenarios = [
  {
    expected: true,
    namespace: "bnlo",
    text: "Privata Affärer",
  },
  {
    expected: false,
    namespace: "some-namespace",
    text: "Some namespace",
  },
];

describe("check if carrier delivery only", () => {
  for (const s of scenarios) {
    describe(s.text, () => {
      const postOk = carrierDeliveryOnly(s.namespace);

      it(`should${!s.expected ? " not" : ""} only allow carrier delivery`, () => {
        Boolean(postOk).should.eql(Boolean(s.expected));
      });
    });
  }
});
