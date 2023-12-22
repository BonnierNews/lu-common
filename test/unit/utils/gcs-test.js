import config from "exp-config";

import { getCredentials } from "../../../lib/utils/gcs.js";

describe("gcs", () => {
  it("should credentials object", () => {
    const credentials = getCredentials();
    const expected = JSON.parse(JSON.stringify(config.gcs.credentials));
    credentials.should.eql(expected);
  });
});
