"use strict";

const {
  addressSchema,
  distributionFeeSchemaNand,
  distributionFeeSchemaXor,
} = require("../../../lib/validation-helpers/schemas");

const {
  addressScenarios,
  distributionFeeScenarios,
} = require("../../../test-data/unit/validation-helpers/schemas-test-data");

describe("check if address is correct", () => {
  for (const s of addressScenarios) {
    describe(s.text, () => {
      const { value, error: notValidAddress } = s.stripped
        ? s.strippedSchema.validate(s.address, { stripUnknown: true })
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
    describe(`${s.text || s.nandText} with nand schema`, () => {
      const { error: nandError } = distributionFeeSchemaNand.validate(s.distributionFee);

      it(`is a${s.nandExpected ? " valid" : "n invalid"} distributionFee using nand schema`, () => {
        Boolean(!nandError).should.eql(Boolean(s.nandExpected));
      });

      if (!s.nandExpected) {
        it(`should have the error message: '${s.error || s.nandError}'`, () => {
          nandError.details[0].message.should.contain(s.error || s.nandError);
        });
      }
    });

    describe(`${s.text || s.xorText} with xor schema`, () => {
      const { error: xorError } = distributionFeeSchemaXor.validate(s.distributionFee);

      it(`is a${s.xorExpected ? " valid" : "n invalid"} distributionFee using xor schema`, () => {
        Boolean(!xorError).should.eql(Boolean(s.xorExpected));
      });

      if (!s.xorExpected) {
        it(`should have the error message: '${s.error || s.xorError}'`, () => {
          xorError.details[0].message.should.contain(s.error || s.xorError);
        });
      }
    });
  }
});
