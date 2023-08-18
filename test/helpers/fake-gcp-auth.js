"use strict";

const { createSandbox } = require("sinon");

const GoogleAuth = require("google-auth-library");

const sandbox = createSandbox();

let stub;
function init() {
  if (!stub) {
    stub = sandbox.stub(GoogleAuth.GoogleAuth.prototype);
  }
}

function authenticated() {
  init();
  stub.getIdTokenClient = (audience) => {
    return {
      getRequestHeaders: () => {
        return { Authorization: `Bearer ${audience}` };
      },
    };
  };
}

module.exports = {
  reset: () => {
    sandbox.restore();
    stub = null;
  },
  authenticated,
};
