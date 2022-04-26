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
      companyName: "AwesomeCompany AB",
      country: "SE"
    }
  },
  {
    text: "Valid foregin address",
    expected: true,
    address: {
      streetName: "Awesome city of the states",
      streetNumber: "1",
      zipCode: "123A 12A",
      city: "City of testing",
      country: "CA"
    }
  },
  {
    text: "Valid address with normal fields",
    expected: true,
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      zipCode: "12345",
      city: "Teststaden",
      country: "SE"
    }
  },
  {
    text: "Valid address with minimum fields",
    expected: true,
    address: {
      streetName: "Testgatan",
      zipCode: "12345",
      city: "Teststaden",
      country: "SE"
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
      zipCode: "123456789",
      city: "Teststaden",
      careOf: "Bestefar",
      companyName: "AwesomeCompany AB",
      country: "SE"
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
      companyName: "AwesomeCompany AB",
      country: "SE"
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
      companyName: "AwesomeCompany AB",
      country: "SE"
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
      companyName: "AwesomeCompany AB",
      country: "SE"
    }
  },
  {
    text: "Invalid address cause of invalid country",
    expected: false,
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      stairCase: "A",
      stairs: "1",
      apartmentNumber: "1101",
      zipCode: "12345",
      city: "Teststaden",
      careOf: "Bestefar",
      companyName: "AwesomeCompany AB",
      country: "BLAH"
    }
  }
];

describe("check if address is correct", () => {
  for (const s of scenarios) {
    describe(s.text, () => {
      const {error: notValidAddress} = addressSchema.validate(s.address);

      it(`is a${s.expected ? " valid " : "n invalid "} address`, () => {
        Boolean(!notValidAddress).should.eql(Boolean(s.expected));
      });
    });
  }
});
