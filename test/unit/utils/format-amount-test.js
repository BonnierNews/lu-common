"use strict";

const expect = require("chai").expect;

const { toZuora, fromZuora } = require("../../../lib/utils/format-amount");

const scenarios = [
  { gfFormat: 10000, zuoraFormat: 100.00 },
  { gfFormat: 100, zuoraFormat: 1.00 },
  { gfFormat: 0, zuoraFormat: 0 },
];

describe("to zuora amount", () => {
  scenarios.forEach(({ gfFormat, zuoraFormat }) => {
    it(`should convert ${gfFormat} to ${zuoraFormat}`, () => {
      expect(toZuora(gfFormat)).to.eql(zuoraFormat);
    });
  });
});

describe("from zuora amount", () => {
  scenarios.forEach(({ gfFormat, zuoraFormat }) => {
    it(`should convert ${zuoraFormat} to ${gfFormat}`, () => {
      expect(fromZuora(zuoraFormat)).to.eql(gfFormat);
    });
  });
});
