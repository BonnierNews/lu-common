"use strict";

const BaseJoi = require("joi");
const Extension = require("@joi/date");
const joi = BaseJoi.extend(Extension);

const addressSchema = {
  address: joi.object().keys({
    streetName: joi.string().required(),
    streetNumber: joi.string().optional(),
    stairCase: joi.string().optional(),
    stairs: joi.string().optional(),
    apartmentNumber: joi.string().optional(),
    zipCode: joi
      .string()
      .required()
      .length(5) // FIXME: this works while we don't have country here - i.e. we only allow SE addresses. Later we should look at using e.g. https://www.npmjs.com/package/joi-postalcode
      .pattern(/^[0-9]+$/), // FIXME: this works while we don't have country here - i.e. we only allow SE addresses. Later we should look at using e.g. https://www.npmjs.com/package/joi-postalcode
    city: joi.string().required(),
    careOf: joi.string().optional(),
    companyName: joi.string().optional()
  }),
  createdBy: joi.string()
};

module.exports = {
  addressSchema
};
