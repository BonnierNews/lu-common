import config from "exp-config";
import nock from "nock";
import urlencode from "urlencode";
import { fakeGcpAuth, fakeApi as fakeApiInit } from "@bonniernews/lu-test";

import http from "../../../lib/utils/http.js";

const fakeApi = fakeApiInit();
const credentialsFakeApi = fakeApiInit(config.gcpConfigs.credentials.url);

describe("http", () => {
  beforeEach(() => {
    fakeApi.reset();
    credentialsFakeApi.reset();
    fakeGcpAuth.reset();
  });

  describe("asserted", () => {
    beforeEach(fakeGcpAuth.authenticated);
    afterEach(fakeGcpAuth.reset);
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
    beforeEach(fakeGcpAuth.authenticated);
    afterEach(fakeGcpAuth.reset);
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
    it("should allow basic auth", async () => {
      nock("http://other-api.example.com").get("/some/path").reply(200, { ok: true });
      const result = await http.get({ baseUrl: "http://other-api.example.com", path: "/some/path", correlationId, auth: { user: "some-user", pass: "some-password" }, timeout: 50, responseType: "json" });
      result.statusCode.should.eql(200);
      result.body.should.eql({ ok: true });
    });
  });

  describe("get as stream", () => {
    beforeEach(fakeGcpAuth.authenticated);
    afterEach(fakeGcpAuth.reset);
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
    beforeEach(fakeGcpAuth.authenticated);
    afterEach(fakeGcpAuth.reset);
    const data = [ "1", "2", "3" ];
    const correlationId = "http-test-with-base-url";
    it("should return a stream", async () => {
      fakeApi.get("/some/path").reply(200, data.join("\n"));
      const result = await http.getAsStream({
        path: "/some/path",
        opts: { decompress: false },
        timeout: 2000,
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

  describe("call other teams gcp with audience because we live in GCP, with sent-in gcpConfig", () => {
    beforeEach(fakeGcpAuth.authenticated);
    after(fakeGcpAuth.reset);
    const correlationId = "http-gcp-config";
    const gcpConfig = config.gcpConfigs.credentials;

    it("should do get-requests", async () => {
      credentialsFakeApi.get("/credentials/some/path").reply(200, { ok: true }).matchHeader("authorization", `Bearer ${gcpConfig.audience}`);
      const result = await http.get({ path: "/credentials/some/path", gcpConfig, correlationId });
      result.body.should.eql({ ok: true });
    });

    it("should fail on 500", (done) => {
      credentialsFakeApi.get("/credentials/some/path").reply(500, { ok: false }).matchHeader("authorization", `Bearer ${gcpConfig.audience}`);
      http.asserted
        .get({ path: "/credentials/some/path", gcpConfig, correlationId })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should throw on 404", (done) => {
      credentialsFakeApi.get("/credentials/some/path").reply(404, { ok: true }).matchHeader("authorization", `Bearer ${gcpConfig.audience}`);
      http.asserted
        .get({ path: "/credentials/some/path", gcpConfig, correlationId })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should do delete-requests", async () => {
      credentialsFakeApi.delete("/credentials/some/path").reply(200, { ok: true }).matchHeader("authorization", `Bearer ${gcpConfig.audience}`);
      const result = await http.asserted.del({ path: "/credentials/some/path", gcpConfig, correlationId });
      result.should.eql({ ok: true });
    });

    [ "PATCH", "POST", "PUT" ].forEach((method) => {
      it(`should do ${method}-requests`, async () => {
        credentialsFakeApi[method.toLowerCase()]("/credentials/some/path", (body) => {
          body.should.eql({ correlationId });
          return true;
        }).reply(200, { ok: true }).matchHeader("authorization", `Bearer ${gcpConfig.audience}`);
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
          }).reply(code, { ok: true }).matchHeader("authorization", `Bearer ${gcpConfig.audience}`);
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
        credentialsFakeApi[method.toLowerCase()]("/credentials/some/path").reply(404, { ok: true }).matchHeader("authorization", `Bearer ${gcpConfig.audience}`);
        http.asserted[method.toLowerCase()]({ path: "/credentials/some/path", gcpConfig, correlationId })
          .then(() => done("should not come here"))
          .catch(() => done());
      });
    });
  });

  describe("http errors", () => {
    beforeEach(fakeGcpAuth.authenticated);
    after(fakeGcpAuth.reset);
    const correlationId = "http-test-errors";

    it("should fail when server not found", (done) => {
      // this get will result in a getaddrinfo ENOTFOUND
      http.get({ path: "/some/path", correlationId })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should fail when axios throws an error", (done) => {
      fakeApi.get("/some/path").reply(400, { ok: false });
      http.get({
        path: "/some/path",
        correlationId,
        opts: {
          validateStatus: function (status) {
            return status === 200;
          },
        },
      })
        .then(() => done("should not come here"))
        .catch(() => done());
    });

    it("should fail when axios throws an error with asserted", (done) => {
      fakeApi.get("/some/path").reply(500, { ok: false });
      http.asserted
        .get({
          path: "/some/path",
          correlationId,
          opts: {
            validateStatus: function (status) {
              return status === 200;
            },
          },
        })
        .then(() => done("should not come here"))
        .catch(() => done());
    });
  });

  afterEach(fakeApi.reset);
});
