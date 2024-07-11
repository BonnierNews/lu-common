import config from "exp-config";

import getUrl from "../../../lib/utils/get-url.js";

describe("getUrl", () => {
  const gcpProxyBackup = config.gcpProxy;

  [ "https", "http" ].forEach((protocol) => {
    it(`should get url with set ${protocol} protocol in baseUrl`, () => {
      delete config.gcpProxy;

      const params = {
        baseUrl: `${protocol}://greenfield-test.bn.nr`,
        path: "/",
      };
      const result = getUrl(params);
      result.should.eql(`${protocol}://greenfield-test.bn.nr/`);

      config.gcpProxy = gcpProxyBackup;
    });
  });

  it("should get url with default protocol when protocol is NOT set in baseUrl", () => {
    delete config.gcpProxy;

    const params = {
      baseUrl: "greenfield-test.bn.nr",
      path: "/",
    };

    const result = getUrl(params);
    result.should.eql("https://greenfield-test.bn.nr/");

    config.gcpProxy = gcpProxyBackup;
  });

  it("should get url with set protocol when baseUrl ends with /", () => {
    delete config.gcpProxy;

    const params = {
      baseUrl: "greenfield-test.bn.nr/",
      path: "/",
    };

    const result = getUrl(params);
    result.should.eql("https://greenfield-test.bn.nr/");

    config.gcpProxy = gcpProxyBackup;
  });

  it("should get url with set protocol in gcpConfig.url", () => {
    delete config.gcpProxy;

    const params = {
      gcpConfig: { url: "https://greenfield-test.bn.nr" },
      path: "/",
    };
    const result = getUrl(params);
    result.should.eql("https://greenfield-test.bn.nr/");

    config.gcpProxy = gcpProxyBackup;
  });

  it("should get url with default protocol when protocol is NOT set in gcpConfig.url", () => {
    delete config.gcpProxy;

    const params = {
      gcpConfig: { url: "greenfield-test.bn.nr" },
      path: "/",
    };
    const result = getUrl(params);
    result.should.eql("https://greenfield-test.bn.nr/");

    config.gcpProxy = gcpProxyBackup;
  });

  it("should get url with set protocol in gcpProxy.url", () => {
    config.gcpProxy = { url: "https://greenfield-test.bn.nr" };

    const params = { path: "/" };

    const result = getUrl(params);
    result.should.eql("https://greenfield-test.bn.nr/");

    config.gcpProxy = gcpProxyBackup;
  });

  it("should get url with default protocol when protocol is NOT set in gcpProxy.url", () => {
    config.gcpProxy = { url: "greenfield-test.bn.nr" };

    const params = { path: "/" };

    const result = getUrl(params);
    result.should.eql("https://greenfield-test.bn.nr/");

    config.gcpProxy = gcpProxyBackup;
  });
});
