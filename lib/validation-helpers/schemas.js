import baseJoi from "joi";
import joiPostalCode from "joi-postalcode";

import validCountries from "./country-codes.js";
import { dateRegex } from "./formatting-helpers.js";
import { salesforceCaseNamespaces } from "../namespaces.js";

const joi = baseJoi.extend(joiPostalCode);

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
  if (country === "CW") {
    if ([ undefined, "0000" ].includes(zipCode)) return;
    return { details: [ { message: 'Curaçao doesn\'t have postal codes, use "0000"' } ] };
  }
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
    streetName: joi.string().required().max(50),
    streetNumber: joi
      .string()
      .pattern(new RegExp("(^[\\-\\d]+$)|(^[a-öA-Ö]+$)"))
      .optional()
      .allow(null)
      .max(50)
      .messages({ "string.pattern.base": '"streetNumber" length must be less than or equal to 50 characters long' }),
    stairCase: joi.string().optional().allow(null).max(50),
    stairs: joi.string().optional().allow(null).max(50),
    apartmentNumber: joi.string().optional().allow(null).max(50),
    zipCode: joi.string().required().max(50), // ZipCode validation in our customValidation above.
    city: joi.string().required().max(50),
    country: joi
      .string()
      .allow(null)
      .default("SE")
      .valid(...validCountries), // no need to limit the length since we restrict to a list anyway but SF allows max(50)
    careOf: joi.string().optional().allow(null).max(255),
    companyName: joi.string().optional().allow(null).max(50),
    deliveryMethod: joi.string().optional().allow(null).valid("POST").max(255),
  });

const distributionFeeSchema = joi.object().keys({
  amount: joi.number().precision(0).positive().allow(0).required().tag("white_list"),
  startDate: joi.string().regex(dateRegex).tag("white_list"),
  monthlyDelay: joi.number().precision(0).allow(0).tag("white_list"),
});

// ---------------------- Salesforce schemas ----------------------

const caseSchema = joi.object().keys({
  namespace: requiredString.valid(...salesforceCaseNamespaces),
  businessType: joi.string().valid("BN_B2C", "BN_B2B"),
  category: joi.string(),
  contact: joi
    .alternatives(
      joi.object().keys({
        firstName: joi.string(),
        lastName: joi.string(),
        email: requiredString,
        phone: joi.string().regex(/^[+\d][0-9]{7,14}$/),
        customerNumber: joi.string(),
        id: joi.string(),
      }),
      joi.object().keys({ id: requiredString })
    )
    .optional(),
  deploymentName: joi.string(),
  description: requiredString,
  externalReference: joi.string().optional(),
  eTaskId: joi.string().optional(),
  origin: requiredString,
  owner: joi.string().optional(),
  priority: joi.string().optional().valid("High", "Medium", "Low"),
  sourceQueue: joi.string().optional(),
  subject: requiredString,
});

const distributionFeeSchemaNand = distributionFeeSchema.nand("startDate", "monthlyDelay");
const distributionFeeSchemaXor = distributionFeeSchema.xor("startDate", "monthlyDelay");

export { addressSchema, caseSchema, distributionFeeSchemaNand, distributionFeeSchemaXor };
