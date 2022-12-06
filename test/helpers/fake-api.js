"use strict";

const nock = require("nock");
const config = require("exp-config");
const path = require("path");
const fs = require("fs");

function init(url = config.proxyUrl) {
  let api = nock(url);

  function reset() {
    nock.enableNetConnect();
    nock.cleanAll();
    api = nock(url);
  }

  function disableNetConnect() {
    nock.disableNetConnect();
  }

  function mount(testData, times) {
    if (Array.isArray(testData)) {
      return testData.map(mount);
    }
    if (typeof testData === "string") {
      testData = require("test-data")(testData);
    }
    let actualBody;
    const {request} = testData;
    if (request.baseUrl && request.baseUrl !== url) throw new Error(`Missmatching urls ${request.baseUrl} ${url}`);
    const mock = api[request.method](request.path, (body) => {
      actualBody = body;
      return true;
    });

    if (times || testData.times) mock.times(times || testData.times);

    if (request.query) {
      mock.query(request.query);
    }

    if (request.headers) {
      for (const [key, val] of Object.entries(request.headers)) {
        mock.matchHeader(key, val);
      }
    }

    mock.reply(testData.statusCode || testData.status || 200, testData.body);

    return {
      hasExpectedBody: (body) => {
        return actualBody.should.eql(body || request.body);
      },
      hasNotBeenCalled: () => {
        return should.not.exist(actualBody);
      },
      calledBody: () => {
        return actualBody;
      }
    };
  }

  function mountFolder(folderName) {
    const dirName = path.join(path.dirname(require.resolve("test-data")), folderName);
    return fs.readdirSync(dirName).map((fileName) => mount(path.join(folderName, fileName)));
  }

  function fakePrefixedResource(prefix, content, times = 1) {
    return fakeJsonResponse(`${prefix}/${content.type}/${content.id}`, content, times);
  }

  function fakeJsonResponse(apiPath, content, times = 1, status = 200) {
    return api.get(apiPath).times(times).reply(status, content);
  }

  function fakeNotExisting(apiPath, content, times = 1) {
    content = content || {};
    return api.get(apiPath).times(times).reply(404, content);
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  return {
    clone,
    disableNetConnect,
    fakeJsonResponse,
    fakeNotExisting,
    fakePrefixedResource,
    filteringPath: api.filteringPath.bind(api),
    get: api.get.bind(api),
    mount,
    mountFolder,
    pendingMocks: api.pendingMocks.bind(api),
    post: api.post.bind(api),
    put: api.put.bind(api),
    reset
  };
}

module.exports = init;
