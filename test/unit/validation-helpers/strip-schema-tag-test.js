"use strict";

const expect = require("chai").expect;
const joi = require("joi");
const stripper = require("../../../lib/validation-helpers/strip-schema-tag");

describe("strip joi fields without tags", () => {
  describe("nested", () => {
    const schema = joi.object({
      a: joi.string().required().tag("white_list"),
      b: joi.object().keys({
        a: joi.string().tag("white_list"),
        b: joi.string(),
        c: joi.object().keys({ a: joi.number().tag("white_list") }),
      }),
    });

    it("should remove keys fields without the tag 'white_list'", () => {
      const strippedSchema = stripper(schema, "white_list");

      const o = { a: "a", b: { a: "a", b: "b", c: { a: 1 } } };

      const { value, error } = strippedSchema.validate(o, { stripUnknown: true });

      expect(error).to.eql(undefined);
      value.should.eql({ a: "a", b: { a: "a", c: { a: 1 } } });
    });
  });

  describe("nested, with more tags after nesting and an unknown flag", () => {
    const schema = joi.object({
      a: joi.string().required().tag("white_list"),
      b: joi.object().keys({
        a: joi.string().tag("white_list"),
        b: joi.string(),
        c: joi.object().keys({ a: joi.number().tag("white_list") }),
      }).unknown(true),
      c: joi.array().tag("white_list"),
      d: joi.array(),
    });

    it("should remove keys fields without the tag 'white_list'", () => {
      const strippedSchema = stripper(schema, "white_list");

      const o = { a: "a", b: { a: "a", b: "b", c: { a: 1 } }, c: [ "a", "b" ], d: [ 1, 2 ] };

      const { value, error } = strippedSchema.validate(o, { stripUnknown: true });

      expect(error).to.eql(undefined);
      value.should.eql({ a: "a", b: { a: "a", c: { a: 1 } }, c: [ "a", "b" ] });
    });
  });
});
