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
      country: "SE",
      deliveryMethod: "POST"
    }
  },
  {
    text: "Valid foregin address",
    expected: true,
    address: {
      streetName: "Awesome street in canada",
      streetNumber: "1",
      zipCode: "S0J 2Y0",
      city: "Saskatchewan",
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
    text: "Valid address with normal fields, normal spacing in swedish zipcode",
    expected: true,
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      zipCode: "123 45",
      city: "Teststaden",
      country: "SE"
    }
  },
  {
    text: "Valid address with normal fields, missing country so default to SE",
    expected: true,
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      zipCode: "12345",
      city: "Teststaden"
    }
  },
  {
    text: "Valid address with normal fields, some null values",
    expected: true,
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      stairCase: null,
      stairs: null,
      apartmentNumber: null,
      zipCode: "12345",
      city: "Teststaden",
      careOf: "Bestefar",
      companyName: null,
      country: null
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
    text: "Invalid address default country address, bad zipCode",
    expected: false,
    error: '"zipCode" failed validation because Postal code A123 is not valid for country SE',
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      zipCode: "A123",
      city: "Teststaden"
    }
  },
  {
    text: "Invalid address cause of zipCode to long",
    expected: false,
    error: '"zipCode" failed validation because Postal code 123456789 is not valid for country SE',
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
    error: '"zipCode" failed validation because Postal code 1337 is not valid for country SE',
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
    error: '"streetName" is required',
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
    error: '"city" is required',
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
    error: '"country" contains an invalid value',
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
  },
  {
    text: "Invalid address cause of invalid foregin zipcode",
    expected: false,
    error: '"zipCode" failed validation because Postal code 12 is not valid for country US',
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      stairCase: "A",
      stairs: "1",
      apartmentNumber: "1101",
      zipCode: "12",
      city: "Teststaden",
      careOf: "Bestefar",
      companyName: "AwesomeCompany AB",
      country: "US"
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

      if (!s.expected) {
        it(`should have the error message: '${s.error}'`, () => {
          notValidAddress.details[0].message.should.eql(s.error);
        });
      }
    });
  }
});
