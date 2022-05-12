"use strict";

const Basejoi = require("joi");
const joi = Basejoi.extend(require("joi-postalcode"));
const fs = require("fs");
const validCountries = fs.readFileSync(`${__dirname}/country-codes.txt`, "utf-8").split("\n");

const customZipCodeValidation = function (value) {
  const {country, zipCode} = value;
  if (!country) {
    value.country = "SE";
  }
  if (value.country === "SE") {
    value.zipCode = zipCode.replace(" ", ""); // Always save swedish zipcode without spacing.
  }
  const {error: invalidZipCode} = joi
    .string()
    .postalCode(country ? country : "SE") // Default to SE
    .validate(zipCode); // Validation doesn't care about whitespaces.
  if (invalidZipCode) {
    throw new Error(invalidZipCode.details[0].message); // Throws an any.custom error
  }
  return value;
};

const addressSchema = joi
  .object()
  .custom(customZipCodeValidation, "custom zipcode validation")
  .error((errors) => {
    errors.forEach((err) => {
      if (err.code === "any.custom") {
        // Customize potential error from above to look like '"zipCode" failed validation because <message from joi-postalcode>'
        err.local.label = "zipCode";
        err.path.push("zipCode"); // Also adds what field form input the error exists in.
        err.messages["any.custom"]._template[1] = " failed validation because ";
      }
    });
    return errors;
  })
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
    companyName: joi.string().optional().allow(null),
    deliveryMethod: joi.string().optional().allow("POST")
  });

module.exports = {
  addressSchema
};
