"use strict";

const chai = require("chai");

const trimmer = require("../../../lib/utils/trimmer");

const expect = chai.expect;

describe("trimmer", () => {
  it("should trim values from spaces in address", () => {
    const address = {
      streetName: "LINNEGATAN ",
      streetNumber: "98",
      stairCase: null,
      stairs: null,
      apartmentNumber: null,
      zipCode: "11523",
      city: " Stockholm",
      country: "SE",
      justInCase: {},
    };

    const result = trimmer(address);
    result.should.eql({
      streetName: "LINNEGATAN",
      streetNumber: "98",
      stairCase: null,
      stairs: null,
      apartmentNumber: null,
      zipCode: "11523",
      city: "Stockholm",
      country: "SE",
      justInCase: {},
    });
  });

  it("should NOT crash when undefined", () => {
    const address = undefined;

    const result = trimmer(address);
    expect(result).to.eql(undefined);
  });
});
