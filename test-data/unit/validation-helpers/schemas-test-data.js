import stripSchemaTag from "../../../lib/validation-helpers/strip-schema-tag.js";
import { addressSchema } from "../../../lib/validation-helpers/schemas.js";

const defaultAddress = {
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
  deliveryMethod: "POST",
};

const addressScenarios = [
  {
    text: "Valid address with all the fields",
    expected: true,
    address: defaultAddress,
  },
  {
    text: "Valid foreign address",
    expected: true,
    address: {
      streetName: "Awesome street in canada",
      streetNumber: "1",
      zipCode: "S0J 2Y0",
      city: "Saskatchewan",
      country: "CA",
    },
  },
  {
    text: "Valid address in obscure country (Curaçao)",
    expected: true,
    address: {
      city: "Willemstad",
      country: "CW",
      streetName: "Telamonstraat",
      streetNumber: "59",
      zipCode: "0000",
    },
  },
  {
    text: "Invalid address in obscure country (Curaçao)",
    expected: false,
    error: '"zipCode" failed validation because Curaçao doesn\'t have postal codes, use "0000"',
    address: {
      city: "Willemstad",
      country: "CW",
      streetName: "Telamonstraat",
      streetNumber: "59",
      zipCode: "59",
    },
  },
  {
    text: "Valid address with normal fields",
    expected: true,
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      zipCode: "12345",
      city: "Teststaden",
      country: "SE",
    },
  },
  {
    text: "Valid address with normal fields, normal spacing in swedish zipcode",
    expected: true,
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      zipCode: "123 45",
      city: "Teststaden",
      country: "SE",
    },
  },
  {
    text: "Valid address with normal fields, missing country so default to SE",
    expected: true,
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      zipCode: "12345",
      city: "Teststaden",
    },
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
      country: null,
      deliveryMethod: null,
    },
  },
  {
    text: "Valid address with minimum fields",
    expected: true,
    address: {
      streetName: "Testgatan",
      zipCode: "12345",
      city: "Teststaden",
      country: "SE",
    },
  },
  {
    text: "Valid address with negative streetNumber",
    expected: true,
    address: {
      streetName: "Testgatan",
      streetNumber: "-39",
      zipCode: "12345",
      city: "Teststaden",
      country: "SE",
    },
  },
  {
    text: "Valid address with only letters as streetNumber",
    expected: true,
    address: {
      streetName: "Testgatan",
      streetNumber: "ABC",
      zipCode: "12345",
      city: "Teststaden",
      country: "SE",
    },
  },
  {
    text: "Invalid address due to bad streetNumber 1A",
    expected: false,
    error: '"streetNumber" length must be less than or equal to 50 characters long',
    address: {
      streetName: "Testgatan",
      streetNumber: "1A",
      zipCode: "12345",
      city: "Teststaden",
      country: "SE",
    },
  },
  {
    text: "Invalid address default country address, bad zipCode",
    expected: false,
    error: '"zipCode" failed validation because Postal code 123 is not valid for country SE',
    address: {
      streetName: "Testgatan",
      streetNumber: "1",
      zipCode: "A123",
      city: "Teststaden",
    },
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
      country: "SE",
    },
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
      country: "SE",
    },
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
      country: "SE",
    },
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
      country: "SE",
    },
  },
  {
    text: "Invalid address cause of invalid country",
    expected: false,
    error: '"country" must be one of',
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
      country: "BLAH",
    },
  },
  {
    text: "Invalid address cause of invalid foreign zipcode",
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
      country: "US",
    },
  },
  {
    text: "Valid address with invalid zipcode, extra letters get trimmed",
    expected: true,
    address: {
      streetName: "Testulica",
      streetNumber: "10",
      stairCase: "A",
      stairs: "1",
      apartmentNumber: "1101",
      zipCode: "36-100abc",
      city: "Kolbuszowa",
      careOf: "Besteojciec",
      companyName: "Kompany Z.O.O",
      country: "PL",
    },
  },
  {
    text: "Invalid, address is empty",
    expected: false,
    error: '"streetName" is required',
    address: {},
  },
  {
    text: "Valid, stripped address is empty",
    strippedSchema: stripSchemaTag(addressSchema, "test"),
    expected: true,
    stripped: true,
    address: {},
  },
];

for (const key of Object.keys(addressSchema.describe().keys).filter(
  (k) => ![ "country", "deliveryMethod" ].includes(k)
)) {
  const badAddress = JSON.parse(JSON.stringify(defaultAddress));
  badAddress[key] = Buffer.alloc(500, "Hej").toString();
  const allowedLength = key === "careOf" ? 255 : 50;
  addressScenarios.push({
    text: `Invalid address with long ${key}`,
    expected: false,
    address: badAddress,
    error: `"${key}" length must be less than or equal to ${allowedLength} characters long`,
  });
}

const distributionFeeScenarios = [
  {
    nandText: "Valid distributionFee with only amount",
    xorText: "Invalid distributionFee with only amount",
    nandExpected: true,
    xorExpected: false,
    error: '"value" must contain at least one of [startDate, monthlyDelay]',
    distributionFee: { amount: 5000 },
  },
  {
    text: "Valid distributionFee with startDate",
    nandExpected: true,
    xorExpected: true,
    distributionFee: {
      amount: 5000,
      startDate: "2022-12-13",
    },
  },
  {
    text: "Valid distributionFee with montlyDelay",
    nandExpected: true,
    xorExpected: true,
    distributionFee: {
      amount: 5000,
      monthlyDelay: 18,
    },
  },
  {
    text: "Invalid distributionFee, both startDate and monthlyDelay exists",
    nandExpected: false,
    xorExpected: false,
    nandError: '"startDate" must not exist simultaneously with [monthlyDelay]',
    xorError: '"value" contains a conflict between exclusive peers [startDate, monthlyDelay]',
    distributionFee: {
      amount: 5000,
      startDate: "2022-12-13",
      monthlyDelay: 18,
    },
  },
  {
    text: "Invalid distributionFee, amount doesn't exist",
    nandExpected: false,
    xorExpected: false,
    error: '"amount" is required',
    distributionFee: { monthlyDelay: 18 },
  },
  {
    text: "Invalid distributionFee, monthlyDelay is not a number",
    nandExpected: false,
    xorExpected: false,
    error: '"monthlyDelay" must be a number',
    distributionFee: {
      amount: 5000,
      monthlyDelay: "arton",
    },
  },
  {
    text: "Invalid distributionFee, amount is not a number",
    nandExpected: false,
    xorEpected: false,
    error: '"amount" must be a number',
    distributionFee: { amount: "5000öre" },
  },
  {
    text: "Invalid distributionFee, startDate is malformatted",
    nandExpected: false,
    xorEpected: false,
    error:
      '"startDate" with value "2022-foo-bar" fails to match the required pattern: /^(19\\d{2}|20\\d{2})-([0][1-9]|1[0-2])-([0][1-9]|[1-2]\\d|3[0-1])$/',
    distributionFee: {
      amount: 50000,
      startDate: "2022-foo-bar",
    },
  },
];

export { addressScenarios, distributionFeeScenarios };
