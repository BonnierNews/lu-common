"use strict";

const BaseJoi = require("joi");
const Extension = require("@joi/date");
const joi = BaseJoi.extend(Extension);

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
      .length(5) // FIXME: this works while we only defaults to country SE - i.e. we only allow SE addresses. Later we should look at using e.g. https://www.npmjs.com/package/joi-postalcode
      .pattern(/^[0-9]+$/), // FIXME: this works while we only defaults to country SE - i.e. we only allow SE addresses. Later we should look at using e.g. https://www.npmjs.com/package/joi-postalcode
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
