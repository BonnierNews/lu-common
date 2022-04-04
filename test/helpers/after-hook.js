"use strict";
const nock = require("nock");
const chai = require("chai");
// eslint-disable-next-line no-undef
afterEachScenario(() => {
  if (nock.pendingMocks().length > 0) {
    // eslint-disable-next-line no-console
    const error = `There are pending mocks after test is done: ${JSON.stringify(nock.pendingMocks(), null, 2)}`;
    throw new chai.AssertionError(error);
  }
});
