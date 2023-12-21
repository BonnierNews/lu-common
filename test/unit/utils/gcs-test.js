import config from "exp-config";

import { getCredentials } from "../../../lib/utils/gcs.js";

describe("gcs", () => {
  it("should return whole credentials object for AWS", () => {
    config.livesIn = "AWS";
    const credentials = getCredentials();
    credentials.should.eql(config.gcs.credentials);
    config.livesIn = "GCP";
  });

  it("should credentials object without keyFilename for GCP", () => {
    config.livesIn = "GCP";

    const credentials = getCredentials();
    const expected = JSON.parse(JSON.stringify(config.gcs.credentials));
    delete expected.keyFilename;
    credentials.should.eql(expected);

    delete config.livesIn;
  });
});
