"use strict";

const {addressSchema, distributionFeeSchema} = require("../../../lib/validation-helpers/schemas");

const {
  addressScenarios,
  distributionFeeScenarios
} = require("../../../test-data/unit/validation-helpers/schemas-test-data");

describe("check if address is correct", () => {
  for (const s of addressScenarios) {
    describe(s.text, () => {
      const {value, error: notValidAddress} = s.stripped
        ? s.strippedSchema.validate(s.address, {stripUnknown: true})
        : addressSchema.validate(s.address);

      it(`is a${s.expected ? " valid " : "n invalid "} address`, () => {
        Boolean(!notValidAddress).should.eql(Boolean(s.expected));
      });

      if (Object.entries(value).length) {
        it("should have a country assigned", () => {
          Boolean(value.country).should.eql(true);
        });
      }

      if (!s.expected) {
        it(`should have the error message: '${s.error}'`, () => {
          notValidAddress.details[0].message.should.contain(s.error);
        });
      }
    });
  }
});

describe("check if distributionFee is correct", () => {
  for (const s of distributionFeeScenarios) {
    describe(s.text, () => {
      const {error} = distributionFeeSchema.validate(s.distributionFee);

      it(`is a${s.expected ? " valid" : "n invalid"} distributionFee`, () => {
        Boolean(!error).should.eql(Boolean(s.expected));
      });

      if (!s.expected) {
        it(`should have the error message: '${s.error}'`, () => {
          error.details[0].message.should.contain(s.error);
        });
      }
    });
  }
});
