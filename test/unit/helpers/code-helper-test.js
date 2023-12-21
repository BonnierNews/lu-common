import config from "exp-config";

import { enumerate, getUrl } from "../../../lib/helpers/code-helper.js";

describe("Enumerate an array", () => {
  describe("when looping on enumerate of array", () => {
    it("should send us back an index on each value", () => {
      for (const [ index, value ] of enumerate([ 0, 1, 2, 3, 4, 5 ])) {
        value.should.eql(index);
      }
      const result = {};
      for (const [ index, value ] of enumerate([ "a", "b", "c", "d" ])) {
        result[value] = index;
      }
      result.a.should.eql(0);
      result.b.should.eql(1);
      result.c.should.eql(2);
      result.d.should.eql(3);
    });
  });
});

describe("Get url based on where the application lives", () => {
  describe("when getting an url with an application that lives in gcp", () => {
    it("we should get the gcpProxy url", () => {
      getUrl({ path: "/gcp-app/some-path" }).should.eql(`${config.gcpProxy.url}/gcp-app/some-path`);
    });
  });
  describe("when getting an url with an application that doesn't yet live in gcp", () => {
    it("we hould get the normal proxyurl", () => {
      getUrl({ path: "/some-app/some-path" }).should.eql(`${config.proxyUrl}/some-app/some-path`);
    });
  });
  describe("when getting an url with a sent in baseUrl", () => {
    it("we should use the baseUrl that was sent in", () => {
      getUrl({ path: "/some-app/some-path", baseUrl: "http://some-base-url" }).should.eql(
        "http://some-base-url/some-app/some-path"
      );
    });
  });
});
