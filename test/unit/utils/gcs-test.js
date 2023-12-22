import config from "exp-config";

import {
  createReadStream,
  createWriteStream,
  exists,
  getCredentials,
  toLakeDate,
  lakeUri,
  parseUri,
  list,
  metadata,
  toPath,
} from "../../../lib/utils/gcs.js";

describe("gcs", () => {
  it("should credentials object", () => {
    const credentials = getCredentials();
    const expected = JSON.parse(JSON.stringify(config.gcs.credentials));
    credentials.should.eql(expected);
  });
});
