"use strict";

const {addressSchema} = require("../../../lib/validation-helpers/schemas");

const scenarios = [
  {
    text: "Valid address with all the fields",
    expected: true,
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      stairCase: "A",
      stairs: "1",
      apartmentNumber: "1101",
      zipCode: "12345",
      city: "Teststaden",
      careOf: "Bestefar",
      companyName: "AwesomeCompany AB"
    }
  },
  {
    text: "Valid address with normal fields",
    expected: true,
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      zipCode: "12345",
      city: "Teststaden"
    }
  },
  {
    text: "Valid address with minimum fields",
    expected: true,
    address: {
      streetName: "Testgatan",
      zipCode: "12345",
      city: "Teststaden"
    }
  },
  {
    text: "Invalid address cause of zipCode to long",
    expected: false,
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      stairCase: "A",
      stairs: "1",
      apartmentNumber: "1101",
      zipCode: "1234511",
      city: "Teststaden",
      careOf: "Bestefar",
      companyName: "AwesomeCompany AB"
    }
  },
  {
    text: "Invalid address cause of zipCode to short",
    expected: false,
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      stairCase: "A",
      stairs: "1",
      apartmentNumber: "1101",
      zipCode: "1337",
      city: "Teststaden",
      careOf: "Bestefar",
      companyName: "AwesomeCompany AB"
    }
  },
  {
    text: "Invalid address cause of missing streetName",
    expected: false,
    address: {
      streetNumber: "1",
      stairCase: "A",
      stairs: "1",
      apartmentNumber: "1101",
      zipCode: "12345",
      city: "Teststaden",
      careOf: "Bestefar",
      companyName: "AwesomeCompany AB"
    }
  },
  {
    text: "Invalid address cause of missing city",
    expected: false,
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      stairCase: "A",
      stairs: "1",
      apartmentNumber: "1101",
      zipCode: "12345",
      careOf: "Bestefar",
      companyName: "AwesomeCompany AB"
    }
  }
];

describe("check if address is correct", () => {
  for (const s of scenarios) {
    describe(s.text, () => {
      const validAddress = addressSchema.validate(s.address);

      it(`is a ${s.expected ? "valid " : "invalid "} address`, () => {
        Boolean(validAddress).should.eql(Boolean(s.expected));
      });
    });
  }
});
