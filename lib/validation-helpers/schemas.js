"use strict";

const Basejoi = require("joi");
const joi = Basejoi.extend(require("joi-postalcode"));
const fs = require("fs");
const validCountries = fs.readFileSync(`${__dirname}/country-codes.txt`, "utf-8").split("\n");

const customValidation = function (value, helpers) {
  const {country, zipCode} = value;
  if (!country) {
    value.country = "SE";
  }
  if (value.country === "SE") {
    value.zipCode = zipCode.replace(" ", ""); // Always save swedish zipcode without spacing.
  }
  const {error: invalidZipCode} = joi.string().postalCode(country).validate(zipCode); // Validation doesn't care about whitespaces.
  if (invalidZipCode) {
    return helpers.error(invalidZipCode);
  }
  return value;
};

const addressSchema = joi
  .object()
  .custom(customValidation, "custom zipcode validation")
  .keys({
    streetName: joi.string().required(),
    streetNumber: joi.string().optional().allow(null),
    stairCase: joi.string().optional().allow(null),
    stairs: joi.string().optional().allow(null),
    apartmentNumber: joi.string().optional().allow(null),
    zipCode: joi.string().required(), // ZipCode validation in our customValidation above.
    city: joi.string().required(),
    country: joi.custom((val, helpers) => {
      if (!val) {
        return; // We will default to SE in our customValidation above.
      }
      return validCountries.includes(val) ? val : helpers.error("any.invalid");
    }),
    careOf: joi.string().optional().allow(null),
    companyName: joi.string().optional().allow(null)
  });

module.exports = {
  addressSchema
};
