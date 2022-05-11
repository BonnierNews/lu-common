"use strict";

const {zipCodeRanges} = require("../../lib/zip-code-ranges");

const scenarios = [
  {
    expected: false,
    zipCode: "11846",
    deliveryCompany: "tab",
    text: "Stockholm zipcode is not TAB"
  },
  {
    expected: true,
    zipCode: "84013",
    deliveryCompany: "tab",
    text: "Torpshammar zipcode is TAB"
  },
  {
    expected: false,
    zipCode: "84013",
    deliveryCompany: "nim",
    text: "Unconfigured delivery company"
  },
  {
    expected: false,
    zipCode: 84013,
    deliveryCompany: "tab",
    text: "Numeric zipcode"
  }
];

describe("check if zipcode specific to a delivery company", () => {
  for (const s of scenarios) {
    describe(s.text, () => {
      const zipCodeAllowed = zipCodeRanges[s.deliveryCompany]?.includes(s.zipCode);

      it(`${s.zipCode} should${!s.expected ? " not" : ""} be included`, () => {
        Boolean(zipCodeAllowed).should.eql(Boolean(s.expected));
      });
    });
  }
});
