"use strict";

const expect = require("chai").expect;

const { toZuora, fromZuora } = require("../../../lib/utils/format-amount");

describe("to zuora amount", () => {
  const scenarios = [
    { input: 10000, output: 100.00 },
    { input: 100, output: 1.00 },
    { input: 0, output: 0 },
  ];

  scenarios.forEach(({ input, output }) => {
    it(`should convert ${input} to ${output}`, () => {
      expect(toZuora(input)).to.eql(output);
    });
  });
});

describe("from zuora amount", () => {
  const scenarios = [
    { input: 100.00, output: 10000 },
    { input: 1, output: 100 },
    { input: 0, output: 0 },
  ];

  scenarios.forEach(({ input, output }) => {
    it(`should convert ${input} to ${output}`, () => {
      expect(fromZuora(input)).to.eql(output);
    });
  });
});
