"use strict";

const Basejoi = require("joi");
const joi = Basejoi.extend(require("joi-postalcode"));

const addressSchema = joi.object().keys({
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
  country: joi.string().default("SE"),
  careOf: joi.string().optional(),
  companyName: joi.string().optional()
});

module.exports = {
  addressSchema
};
