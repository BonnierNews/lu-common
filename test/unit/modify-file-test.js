"use strict";

const { modifyFile } = require("../helpers/file-utils");

describe("modify file", () => {
  it("should modify a file", () => {
    const input = '{"some-key":"some-value"}\n{"some-key":"some-other-value"}\n{"some-key":"some-third-value"}\n';
    const expected =
      '{"some-key":"some-value","added-key":"added-value"}\n{"some-key":"some-other-value","added-key":"added-value"}\n{"some-key":"some-third-value","added-key":"added-value"}\n';
    modifyFile(input, (o) => Object({ ...o, "added-key": "added-value" })).should.eql(expected);
  });
});
