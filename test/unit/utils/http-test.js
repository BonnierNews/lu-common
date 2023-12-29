"use strict";

const config = require("exp-config");
const nock = require("nock");
const fakeApi = require("../../helpers/fake-api")();
const awsFakeApi = require("../../helpers/fake-api")(config.awsProxyUrl);
const gcpFakeApi = require("../../helpers/fake-api")(config.gcpProxy.url);
const credentialsFakeApi = require("../../helpers/fake-api")(config.gcpConfigs.credentials.cloudRunUrl);
const credentialsLoadBalancerFakeApi = require("../../helpers/fake-api")(config.gcpConfigs.credentials.url);
const http = require("../../../lib/utils/http");
const fakeGcpAuth = require("../../helpers/fake-gcp-auth");
const urlencode = require("urlencode");

describe("http", () => {
  beforeEach(() => {
    fakeApi.reset();
    awsFakeApi.reset();
    gcpFakeApi.reset();
    credentialsFakeApi.reset();
    credentialsLoadBalancerFakeApi.reset();
    fakeGcpAuth.reset();
  });
  describe("asserted", () => {
    before(() => {
      // Mock that we live in aws and use the aws proxy
      config.livesIn = "AWS";
    });
    after(() => {
      delete config.livesIn;
    });
    const correlationId = "http-test-asserted";

    it("should do get-requests", async () => {
      fakeApi.get("/some/path").reply(200, { ok: true });
      const result = await http.asserted.get({ path: "/some/path", correlationId });
      result.should.eql({ ok: true });
    });

    it("should do get-requests with query-string", async () => {
      fakeApi.get("/some/path").query({ q: "some-query" }).times(2).reply(200, { ok: true });
      const result = await http.asserted.get({ path: "/some/path", correlationId, qs: { q: "some-query" } });
      result.should.eql({ ok: true });

      const next = await http.asserted.get({ path: "/some/path?q=some-query", correlationId });
      next.should.eql({ ok: true });
    });

    it("should fail on 500", (done) => {
      fakeApi.get("/some/path").reply(500, { ok: false });
      http.asserted
        .get({ path: "/some/path", correlationId })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should throw on 404", (done) => {
      fakeApi.get("/some/path").reply(404, { ok: true });
      http.asserted
        .get({ path: "/some/path", correlationId })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should do delete-requests", async () => {
      fakeApi.delete("/some/path").reply(200, { ok: true });
      const result = await http.asserted.del({ path: "/some/path", correlationId });
      result.should.eql({ ok: true });
    });

    [ "PATCH", "POST", "PUT" ].forEach((method) => {
      it(`should do ${method}-requests`, async () => {
        fakeApi[method.toLowerCase()]("/some/path", (body) => {
          body.should.eql({ correlationId });
          return true;
        }).reply(200, { ok: true });
        const result = await http.asserted[method.toLowerCase()]({
          path: "/some/path",
          correlationId,
          body: { correlationId },
        });
        result.should.eql({ ok: true });
      });

      [ 200, 201, 204, 301, 302 ].forEach((code) => {
        it(`should not fail on ${code}`, async () => {
          fakeApi[method.toLowerCase()]("/some/path", (body) => {
            body.should.eql({ correlationId });
            return true;
          }).reply(code, { ok: true });
          const result = await http.asserted[method.toLowerCase()]({
            path: "/some/path",
            correlationId,
            body: { correlationId },
          });
          result.should.eql({ ok: true });
        });
      });

      it("should throw on 404", (done) => {
        fakeApi[method.toLowerCase()]("/some/path").reply(404, { ok: true });
        http.asserted[method.toLowerCase()]({ path: "/some/path", correlationId })
          .then(() => done("should not come here"))
          .catch(() => done());
      });
    });
  });

  describe("with results", () => {
    const correlationId = "http-test-verbs";

    it("should do get-requests", async () => {
      fakeApi.get("/some/path").reply(200, { ok: true });
      const result = await http.get({ path: "/some/path", correlationId });
      result.statusCode.should.eql(200);
      result.body.should.eql({ ok: true });
    });

    it("should do get-requests with query-string", async () => {
      fakeApi.get("/some/path").query({ q: "some-query" }).times(2).reply(200, { ok: true });
      const result = await http.get({ path: "/some/path", correlationId, qs: { q: "some-query" } });
      result.statusCode.should.eql(200);
      result.body.should.eql({ ok: true });

      const next = await http.get({ path: "/some/path?q=some-query", correlationId });
      next.statusCode.should.eql(200);
      next.body.should.eql({ ok: true });
    });

    it("should handle paramsSerializer", async () => {
      const realQuery = { q: "söme/qüèry" };
      fakeApi.get("/some/path?q=s%C3%B6me%2Fq%C3%BC%C3%A8ry").reply(200, { ok: true });
      const result = await http.get({ path: "/some/path", correlationId, qs: realQuery });
      result.statusCode.should.eql(200);
      result.body.should.eql({ ok: true });

      fakeApi.get("/some/path?%71=%73%F6%6D%65%2F%71%FC%E8%72%79").reply(200, { ok: true });
      const next = await http.get({ path: "/some/path", correlationId, qs: realQuery, paramsSerializer: { encode: (val) => urlencode(val, "iso-8859-1") } });
      next.statusCode.should.eql(200);
      next.body.should.eql({ ok: true });
    });

    it("should fail on 500", async () => {
      fakeApi.get("/some/path").reply(500, { ok: false });
      const result = await http.get({ path: "/some/path", correlationId });
      result.statusCode.should.eql(500);
      result.body.should.eql({ ok: false });
    });

    it("should be 404", async () => {
      fakeApi.get("/some/path").reply(404, { ok: true });
      const result = await http.get({ path: "/some/path", correlationId });
      result.statusCode.should.eql(404);
      result.body.should.eql({ ok: true });
    });

    it("should do delete-requests", async () => {
      fakeApi.delete("/some/path").reply(200, { ok: true });
      const result = await http.del({ path: "/some/path", correlationId });
      result.statusCode.should.eql(200);
      result.body.should.eql({ ok: true });
    });

    [ "PATCH", "POST", "PUT" ].forEach((method) => {
      it(`should do ${method}-requests`, async () => {
        fakeApi[method.toLowerCase()]("/some/path", (body) => {
          body.should.eql({ correlationId });
          return true;
        }).reply(200, { ok: true });
        const result = await http[method.toLowerCase()]({ path: "/some/path", correlationId, body: { correlationId } });
        result.statusCode.should.eql(200);
        result.body.should.eql({ ok: true });
      });

      it("should fail on 500", async () => {
        fakeApi[method.toLowerCase()]("/some/path").reply(500, { ok: false });
        const result = await http[method.toLowerCase()]({ path: "/some/path", correlationId });
        result.statusCode.should.eql(500);
        result.body.should.eql({ ok: false });
      });

      it("should be 404", async () => {
        fakeApi[method.toLowerCase()]("/some/path").reply(404, { ok: true });
        const result = await http[method.toLowerCase()]({ path: "/some/path", correlationId });
        result.statusCode.should.eql(404);
        result.body.should.eql({ ok: true });
      });
    });
  });

  describe("with baseUrl, auth, timeout and responseType", () => {
    const correlationId = "http-test-with-base-url";
    it("should allow url as param", async () => {
      nock("http://other-api.example.com").get("/some/path").reply(200, { ok: true });
      const result = await http.get({ baseUrl: "http://other-api.example.com", path: "/some/path", correlationId, auth: "some-auth-string", timeout: 50, responseType: "json" });
      result.statusCode.should.eql(200);
      result.body.should.eql({ ok: true });
    });
  });

  describe("get as stream", () => {
    const data = [ "1", "2", "3" ];
    const correlationId = "http-test-with-base-url";
    it("should return a stream", async () => {
      fakeApi.get("/some/path").reply(200, data.join("\n"));
      const result = await http.getAsStream({
        path: "/some/path",
        correlationId,
      });
      const receivedData = [];
      result.on("data", (d) => {
        receivedData.push(d);
      });
      result.on("end", () => {
        receivedData.toString().should.eql(data.join("\n"));
      });
    });
  });

  describe("get as stream with opts", () => {
    const data = [ "1", "2", "3" ];
    const correlationId = "http-test-with-base-url";
    it("should return a stream", async () => {
      fakeApi.get("/some/path").reply(200, data.join("\n"));
      const result = await http.getAsStream({
        path: "/some/path",
        opts: { decompress: false },
        correlationId,
      });
      const receivedData = [];
      result.on("data", (d) => {
        receivedData.push(d);
      });
      result.on("end", () => {
        receivedData.toString().should.eql(data.join("\n"));
      });
    });
  });

  describe("asserted gcp", () => {
    beforeEach(fakeGcpAuth.authenticated);
    after(fakeGcpAuth.reset);
    const correlationId = "http-test-asserted";

    it("should do get-requests", async () => {
      gcpFakeApi.get("/gcp/some/path").reply(200, { ok: true });
      const result = await http.asserted.get({ path: "/gcp/some/path", correlationId });
      result.should.eql({ ok: true });
    });

    it("should do get-requests with query-string", async () => {
      gcpFakeApi.get("/gcp/some/path").query({ q: "some-query" }).times(2).reply(200, { ok: true });
      const result = await http.asserted.get({ path: "/gcp/some/path", correlationId, qs: { q: "some-query" } });
      result.should.eql({ ok: true });

      const next = await http.asserted.get({ path: "/gcp/some/path?q=some-query", correlationId });
      next.should.eql({ ok: true });
    });

    it("should fail on 500", (done) => {
      gcpFakeApi.get("/gcp/some/path").reply(500, { ok: false });
      http.asserted
        .get({ path: "/gcp/some/path", correlationId })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should throw on 404", (done) => {
      gcpFakeApi.get("/gcp/some/path").reply(404, { ok: true });
      http.asserted
        .get({ path: "/gcp/some/path", correlationId })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should do delete-requests", async () => {
      gcpFakeApi.delete("/gcp/some/path").reply(200, { ok: true });
      const result = await http.asserted.del({ path: "/gcp/some/path", correlationId });
      result.should.eql({ ok: true });
    });

    [ "PATCH", "POST", "PUT" ].forEach((method) => {
      it(`should do ${method}-requests`, async () => {
        gcpFakeApi[method.toLowerCase()]("/gcp/some/path", (body) => {
          body.should.eql({ correlationId });
          return true;
        }).reply(200, { ok: true });
        const result = await http.asserted[method.toLowerCase()]({
          path: "/gcp/some/path",
          correlationId,
          body: { correlationId },
        });
        result.should.eql({ ok: true });
      });

      [ 200, 201, 204, 301, 302 ].forEach((code) => {
        it(`should not fail on ${code}`, async () => {
          gcpFakeApi[method.toLowerCase()]("/gcp/some/path", (body) => {
            body.should.eql({ correlationId });
            return true;
          }).reply(code, { ok: true });
          const result = await http.asserted[method.toLowerCase()]({
            path: "/gcp/some/path",
            correlationId,
            body: { correlationId },
          });
          result.should.eql({ ok: true });
        });
      });

      it("should throw on 404", (done) => {
        gcpFakeApi[method.toLowerCase()]("/gcp/some/path").reply(404, { ok: true });
        http.asserted[method.toLowerCase()]({ path: "/gcp/some/path", correlationId })
          .then(() => done("should not come here"))
          .catch(() => done());
      });
    });
  });

  describe("call other teams gcp with cloudrun url because we live in GCP, with sent-in gcpConfig", () => {
    before(() => {
      config.livesIn = "GCP";
    });
    beforeEach(fakeGcpAuth.authenticated);
    after(() => {
      fakeGcpAuth.reset();
      delete config.livesIn;
    });
    const correlationId = "http-gcp-config";
    const gcpConfig = config.gcpConfigs.credentials;

    it("should do get-requests", async () => {
      credentialsFakeApi.get("/credentials/some/path").reply(200, { ok: true }).matchHeader("authorization", `Bearer ${gcpConfig.cloudRunUrl}`);
      const result = await http.get({ path: "/credentials/some/path", gcpConfig, correlationId });
      result.body.should.eql({ ok: true });
    });

    it("should fail on 500", (done) => {
      credentialsFakeApi.get("/credentials/some/path").reply(500, { ok: false }).matchHeader("authorization", `Bearer ${gcpConfig.cloudRunUrl}`);
      http.asserted
        .get({ path: "/credentials/some/path", gcpConfig, correlationId })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should throw on 404", (done) => {
      credentialsFakeApi.get("/credentials/some/path").reply(404, { ok: true }).matchHeader("authorization", `Bearer ${gcpConfig.cloudRunUrl}`);
      http.asserted
        .get({ path: "/credentials/some/path", gcpConfig, correlationId })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should do delete-requests", async () => {
      credentialsFakeApi.delete("/credentials/some/path").reply(200, { ok: true }).matchHeader("authorization", `Bearer ${gcpConfig.cloudRunUrl}`);
      const result = await http.asserted.del({ path: "/credentials/some/path", gcpConfig, correlationId });
      result.should.eql({ ok: true });
    });

    [ "PATCH", "POST", "PUT" ].forEach((method) => {
      it(`should do ${method}-requests`, async () => {
        credentialsFakeApi[method.toLowerCase()]("/credentials/some/path", (body) => {
          body.should.eql({ correlationId });
          return true;
        }).reply(200, { ok: true }).matchHeader("authorization", `Bearer ${gcpConfig.cloudRunUrl}`);
        const result = await http.asserted[method.toLowerCase()]({
          path: "/credentials/some/path",
          gcpConfig,
          correlationId,
          body: { correlationId },
        });
        result.should.eql({ ok: true });
      });

      [ 200, 201, 204, 301, 302 ].forEach((code) => {
        it(`should not fail on ${code}`, async () => {
          credentialsFakeApi[method.toLowerCase()]("/credentials/some/path", (body) => {
            body.should.eql({ correlationId });
            return true;
          }).reply(code, { ok: true }).matchHeader("authorization", `Bearer ${gcpConfig.cloudRunUrl}`);
          const result = await http.asserted[method.toLowerCase()]({
            path: "/credentials/some/path",
            gcpConfig,
            correlationId,
            body: { correlationId },
          });
          result.should.eql({ ok: true });
        });
      });

      it("should throw on 404", (done) => {
        credentialsFakeApi[method.toLowerCase()]("/credentials/some/path").reply(404, { ok: true }).matchHeader("authorization", `Bearer ${gcpConfig.cloudRunUrl}`);
        http.asserted[method.toLowerCase()]({ path: "/credentials/some/path", gcpConfig, correlationId })
          .then(() => done("should not come here"))
          .catch(() => done());
      });
    });
  });

  describe("call other teams gcp with audience, because we don't live in GCP, with sent-in gcpConfig", () => {
    before(() => {
      config.livesIn = "NOT-GCP";
      credentialsLoadBalancerFakeApi.reset();
    });
    beforeEach(fakeGcpAuth.authenticated);
    after(() => {
      fakeGcpAuth.reset();
      delete config.livesIn;
    });
    const correlationId = "http-gcp-config";
    const gcpConfig = config.gcpConfigs.credentials;

    it("should do get-requests", async () => {
      credentialsLoadBalancerFakeApi.get("/credentials/some/path").reply(200, { ok: true });
      const result = await http.get({ path: "/credentials/some/path", gcpConfig, correlationId });
      result.body.should.eql({ ok: true });
    });
  });

  describe("lives in GCP", () => {
    beforeEach(fakeGcpAuth.authenticated);
    after(() => {
      fakeGcpAuth.reset();
    });
    const correlationId = "http-test-asserted";

    it("should do get-requests", async () => {
      gcpFakeApi.get("/gcp/some/path").reply(200, { ok: true });
      const result = await http.asserted.get({ path: "/gcp/some/path", correlationId });
      result.should.eql({ ok: true });
    });

    it("should do get-requests with a manually added Auth header", async () => {
      gcpFakeApi.get("/gcp/some/path").reply(200, { ok: true });
      const result = await http.asserted.get({ path: "/gcp/some/path", headers: { Authorization: "Bearer some-cool-token" }, correlationId });
      result.should.eql({ ok: true });
    });

    it("should do get-requests with query-string", async () => {
      gcpFakeApi.get("/gcp/some/path").query({ q: "some-query" }).times(2).reply(200, { ok: true });
      const result = await http.asserted.get({ path: "/gcp/some/path", correlationId, qs: { q: "some-query" } });
      result.should.eql({ ok: true });

      const next = await http.asserted.get({ path: "/gcp/some/path?q=some-query", correlationId });
      next.should.eql({ ok: true });
    });

    it("should fail on 500", (done) => {
      gcpFakeApi.get("/gcp/some/path").reply(500, { ok: false });
      http.asserted
        .get({ path: "/gcp/some/path", correlationId })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should throw on 404", (done) => {
      gcpFakeApi.get("/gcp/some/path").reply(404, { ok: true });
      http.asserted
        .get({ path: "/gcp/some/path", correlationId })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should do delete-requests", async () => {
      gcpFakeApi.delete("/gcp/some/path").reply(200, { ok: true });
      const result = await http.asserted.del({ path: "/gcp/some/path", correlationId });
      result.should.eql({ ok: true });
    });

    [ "PATCH", "POST", "PUT" ].forEach((method) => {
      it(`should do ${method}-requests`, async () => {
        gcpFakeApi[method.toLowerCase()]("/gcp/some/path", (body) => {
          body.should.eql({ correlationId });
          return true;
        }).reply(200, { ok: true });
        const result = await http.asserted[method.toLowerCase()]({
          path: "/gcp/some/path",
          correlationId,
          body: { correlationId },
        });
        result.should.eql({ ok: true });
      });

      [ 200, 201, 204, 301, 302 ].forEach((code) => {
        it(`should not fail on ${code}`, async () => {
          gcpFakeApi[method.toLowerCase()]("/gcp/some/path", (body) => {
            body.should.eql({ correlationId });
            return true;
          }).reply(code, { ok: true });
          const result = await http.asserted[method.toLowerCase()]({
            path: "/gcp/some/path",
            correlationId,
            body: { correlationId },
          });
          result.should.eql({ ok: true });
        });
      });

      it("should throw on 404", (done) => {
        gcpFakeApi[method.toLowerCase()]("/gcp/some/path").reply(404, { ok: true });
        http.asserted[method.toLowerCase()]({ path: "/gcp/some/path", correlationId })
          .then(() => done("should not come here"))
          .catch(() => done());
      });
    });
  });

  describe("lives in GCP calling AWS", () => {
    before(() => {
      config.livesIn = "GCP";
    });
    const correlationId = "http-test-asserted";

    it("should do get-requests", async () => {
      awsFakeApi.get("/some/path").reply(200, { ok: true });
      const result = await http.asserted.get({ path: "/some/path", correlationId });
      result.should.eql({ ok: true });
    });
  });

  describe("lives in AWS", () => {
    before(() => {
      config.livesIn = "AWS";
    });
    beforeEach(fakeGcpAuth.authenticated);
    after(() => {
      config.livesIn = "GCP";
      fakeGcpAuth.reset();
    });
    const correlationId = "http-test-asserted";

    it("should do get-requests", async () => {
      gcpFakeApi.get("/gcp/some/path").reply(200, { ok: true });
      const result = await http.asserted.get({ path: "/gcp/some/path", correlationId });
      result.should.eql({ ok: true });
    });

    it("should do get-requests with query-string", async () => {
      gcpFakeApi.get("/gcp/some/path").query({ q: "some-query" }).times(2).reply(200, { ok: true });
      const result = await http.asserted.get({ path: "/gcp/some/path", correlationId, qs: { q: "some-query" } });
      result.should.eql({ ok: true });

      const next = await http.asserted.get({ path: "/gcp/some/path?q=some-query", correlationId });
      next.should.eql({ ok: true });
    });

    it("should fail on 500", (done) => {
      gcpFakeApi.get("/gcp/some/path").reply(500, { ok: false });
      http.asserted
        .get({ path: "/gcp/some/path", correlationId })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should throw on 404", (done) => {
      gcpFakeApi.get("/gcp/some/path").reply(404, { ok: true });
      http.asserted
        .get({ path: "/gcp/some/path", correlationId })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should do delete-requests", async () => {
      gcpFakeApi.delete("/gcp/some/path").reply(200, { ok: true });
      const result = await http.asserted.del({ path: "/gcp/some/path", correlationId });
      result.should.eql({ ok: true });
    });

    [ "PATCH", "POST", "PUT" ].forEach((method) => {
      it(`should do ${method}-requests`, async () => {
        gcpFakeApi[method.toLowerCase()]("/gcp/some/path", (body) => {
          body.should.eql({ correlationId });
          return true;
        }).reply(200, { ok: true });
        const result = await http.asserted[method.toLowerCase()]({
          path: "/gcp/some/path",
          correlationId,
          body: { correlationId },
        });
        result.should.eql({ ok: true });
      });

      [ 200, 201, 204, 301, 302 ].forEach((code) => {
        it(`should not fail on ${code}`, async () => {
          gcpFakeApi[method.toLowerCase()]("/gcp/some/path", (body) => {
            body.should.eql({ correlationId });
            return true;
          }).reply(code, { ok: true });
          const result = await http.asserted[method.toLowerCase()]({
            path: "/gcp/some/path",
            correlationId,
            body: { correlationId },
          });
          result.should.eql({ ok: true });
        });
      });

      it("should throw on 404", (done) => {
        gcpFakeApi[method.toLowerCase()]("/gcp/some/path").reply(404, { ok: true });
        http.asserted[method.toLowerCase()]({ path: "/gcp/some/path", correlationId })
          .then(() => done("should not come here"))
          .catch(() => done());
      });
    });
  });

  afterEach(() => {
    fakeApi.reset();
    gcpFakeApi.reset();
  });
});
