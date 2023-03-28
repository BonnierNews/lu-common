"use strict";

const {enumerate} = require("../../../lib/helpers/code-helper");

describe("Enumerate an array", () => {
  describe("when looping on enumerate of array", () => {
    it("should send us back an index on each value", () => {
      for (const [index, value] of enumerate([0, 1, 2, 3, 4, 5])) {
        value.should.eql(index);
      }
      const result = {};
      for (const [index, value] of enumerate(["a", "b", "c", "d"])) {
        result[value] = index;
      }
      result.a.should.eql(0);
      result.b.should.eql(1);
      result.c.should.eql(2);
      result.d.should.eql(3);
    });
  });
});