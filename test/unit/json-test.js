import testData from "test-data";

import { importJson } from "../../lib/utils/json.js";

const expectedJson = await testData("unit/utils/import-json", "json");

describe("importJson", () => {
  it("should import a json file", () => {
    const result = importJson("/test-data/unit/utils/import-json.json");
    JSON.stringify(result).should.equal(JSON.stringify(expectedJson));
  });
});
