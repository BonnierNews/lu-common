"use strict";

const Basejoi = require("joi");
const joi = Basejoi.extend(require("joi-postalcode"));
const fs = require("fs");
const path = require("path");
const validCountries = fs.readFileSync(path.join(__dirname, "country-codes.txt"), "utf-8").split("\n");

const customZipCodeValidation = function (value) {
  // Return empty object if address is empty.
  // Will only happend in stripped schemas in our case from nested validation in anonymization
  // In all other cases it should crash on the required fields.
  if (Object.entries(value).length === 0) return {};

  const { country, zipCode } = value;
  if (!country) {
    value.country = "SE";
  }
  if (value.country === "SE") {
    value.zipCode = zipCode.replace(" ", ""); // Always save swedish zipcode without spacing.
  }
  const { error: invalidZipCode } = joi
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
    country: joi
      .string()
      .allow(null)
      .default("SE")
      .valid(...validCountries),
    careOf: joi.string().optional().allow(null),
    companyName: joi.string().optional().allow(null),
    deliveryMethod: joi.string().optional().allow(null).valid("POST"),
  });

module.exports = { addressSchema };
