"use strict";

const Basejoi = require("joi");
const joi = Basejoi.extend(require("joi-postalcode"));
const fs = require("fs");
const validCountries = fs.readFileSync(`${__dirname}/country-codes.txt`, "utf-8").split("\n");

const addressSchema = joi
  .object()
  .custom((value, helpers) => {
    const {country, zipCode} = value;

    const {error: invalidZipCode} = joi.string().postalCode(country).validate(zipCode);
    if (invalidZipCode) {
      return helpers.error(invalidZipCode);
    }
    return value;
  })
  .keys({
    streetName: joi.string().required(),
    streetNumber: joi.string().optional(),
    stairCase: joi.string().optional(),
    stairs: joi.string().optional(),
    apartmentNumber: joi.string().optional(),
    zipCode: joi.when("country", {
      is: "SE",
      then: joi
        .string()
        .required()
        .length(5)
        .pattern(/^[0-9]+$/),
      otherwise: joi.string().required()
    }),
    city: joi.string().required(),
    country: joi
      .string()
      .required()
      .custom((val, helpers) => {
        return validCountries.includes(val) ? val : helpers.error("any.invalid");
      }),
    careOf: joi.string().optional(),
    companyName: joi.string().optional()
  });

module.exports = {
  addressSchema
};
