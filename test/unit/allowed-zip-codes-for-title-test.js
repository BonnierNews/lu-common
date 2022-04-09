"use strict";

const {allowedPrintZipCodesForTitle} = require("../../lib/allowed-zip-codes-for-title");

const scenarios = [
  {
    expected: true,
    zipCode: "11846",
    title: "dn",
    text: "DN in Stockholm"
  },
  {
    expected: false,
    zipCode: 11846,
    title: "dn",
    text: "Numeric zipcode"
  },
  {
    expected: true,
    zipCode: "98596",
    title: "dn",
    text: "DN (DN specific postcode)"
  },
  {
    expected: false,
    zipCode: "98596",
    title: "expressen",
    text: "Expressen (DN specific postcode)"
  },
  {
    expected: false,
    zipCode: "11846",
    title: "some-title",
    text: "Some title"
  },
  {
    expected: true,
    zipCode: "11846",
    title: "expressen",
    text: "Expressen in Stockholm"
  },
  {
    expected: false,
    zipCode: "11846",
    title: "gt",
    text: "GT in Stockholm"
  },
  {
    expected: true,
    zipCode: "41102",
    title: "gt",
    text: "GT in Gothenburg"
  },
  {
    expected: false,
    zipCode: "11846",
    title: "kvp",
    text: "KVP in Stockholm"
  },
  {
    expected: true,
    zipCode: "21111",
    title: "kvp",
    text: "KVP in Malmö"
  }
];

describe("check if delivery allowed to zipcode", () => {
  for (const s of scenarios) {
    describe(s.text, () => {
      const zipCodeAllowed = allowedPrintZipCodesForTitle[s.title]?.includes(s.zipCode);

      it(`should${!s.expected ? " not" : ""} allow delivery`, () => {
        Boolean(zipCodeAllowed).should.eql(Boolean(s.expected));
      });
    });
  }
});

describe("check that we have unique values", () => {
  describe("28733 appears only once for DN (available for both GT and Expressen", () => {
    const targetZipCodes = allowedPrintZipCodesForTitle.dn.filter((zC) => zC === "28733");

    it(`should only appear once`, () => {
      targetZipCodes.length.should.eql(1);
    });
  });
});
