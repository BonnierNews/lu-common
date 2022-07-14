"use strict";

const { postalDeliveryAllowed } = require("../../lib/namespaces");

const scenarios = [
  {
    expected: true,
    namespace: "dn",
    text: "DN",
  },
  {
    expected: false,
    namespace: "some-namespace",
    text: "Some namespace",
  },
];

describe("check if postal delivery allowed", () => {
  for (const s of scenarios) {
    describe(s.text, () => {
      const postOk = postalDeliveryAllowed(s.namespace);

      it(`should${!s.expected ? " not" : ""} allow postal delivery`, () => {
        Boolean(postOk).should.eql(Boolean(s.expected));
      });
    });
  }
});
