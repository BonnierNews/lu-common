"use strict";

const Basejoi = require("joi");
const joi = Basejoi.extend(require("joi-postalcode"));
const validCountries = require("../validation-helpers/country-codes");
const { dateRegex } = require("./formatting-helpers");

const requiredString = joi.string().min(1).required();

const customZipCodeValidation = function (value) {
  // Return empty object if address is empty.
  // Will only happen in stripped schemas in our case from nested validation in anonymization
  // In all other cases it should crash on the required fields.
  if (Object.entries(value).length === 0) return {};

  const { country, zipCode } = value;
  if (!country) {
    value.country = "SE";
  }
  if (value.country === "SE") {
    value.zipCode = zipCode.replace(" ", ""); // Always save swedish zipcode without spacing.
  }

  let invalidZipCode = isValidZipCode(zipCode, country);
  if (invalidZipCode) {
    const trimmedZipCode = zipCode.replace(/[a-zA-Z]+/g, ""); // Trim away letters

    invalidZipCode = isValidZipCode(trimmedZipCode, country); // Validate again
    if (invalidZipCode) {
      throw new Error(invalidZipCode.details[0].message);
    }
    value.zipCode = trimmedZipCode;
  }
  return value;
};

function isValidZipCode(zipCode, country = "SE") {
  const { error } = joi.string().postalCode(country).validate(zipCode); // Validation doesn't care about whitespaces.
  return error;
}

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

const distributionFeeSchema = joi.object().keys({
  amount: joi.number().precision(0).positive().allow(0).required().tag("white_list"),
  startDate: joi.string().regex(dateRegex).tag("white_list"),
  monthlyDelay: joi.number().precision(0).allow(0).tag("white_list"),
});

// ---------------------- Salesforce schemas ----------------------

const caseSchema = joi.object().keys({
  namespace: requiredString.valid("dn", "expressen", "di", "bnlo"),
  businessType: joi.string().valid("BN_B2C", "BN_B2B"),
  category: joi.string(),
  contact: joi.object().keys({
    firstName: joi.string(),
    lastName: joi.string(),
    email: requiredString,
    phone: joi.string().regex(/^[+\d][0-9]{7,14}$/),
    customerNumber: joi.string(),
  }).optional(),
  deploymentName: joi.string(),
  description: requiredString,
  externalReference: joi.string().optional(),
  origin: requiredString,
  owner: requiredString,
  priority: joi.string().optional().valid("High", "Medium", "Low"),
  sourceQueue: requiredString,
  subject: requiredString,
});

module.exports = {
  addressSchema,
  caseSchema,
  distributionFeeSchemaNand: distributionFeeSchema.nand("startDate", "monthlyDelay"),
  distributionFeeSchemaXor: distributionFeeSchema.xor("startDate", "monthlyDelay"),
};
