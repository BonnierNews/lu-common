/* c8 ignore start */
// Reason: we'll soon be moving this functionaltiy to Google's smtp
import { createSandbox } from "sinon";

import * as ses from "../../lib/utils/ses.js";

const sandbox = createSandbox();

let sendEmailStub, sendRawEmailStub;
const sent = [];
const sentRaw = [];

function sendEmail(response) {
  if (!sendEmailStub) sendEmailStub = sandbox.stub(ses, "sendEmail");

  const fn = (namespace, params) => {
    sent.push(params);
    return response;
  };

  sendEmailStub.callsFake(fn);
}

function sendRawEmail(response) {
  if (!sendRawEmailStub) sendRawEmailStub = sandbox.stub(ses, "sendRawEmail");

  const fn = (namespace, params) => {
    sentRaw.push(params);
    return response;
  };

  sendRawEmailStub.callsFake(fn);
}

// eslint-disable-next-line
function sendRawEmailWithError(errorMessage) {
  if (!sendRawEmailStub) sendRawEmailStub = sandbox.stub(ses, "sendRawEmail");

  // eslint-disable-next-line
  const fn = () => {
    throw new Error(errorMessage);
  };

  sendRawEmailStub.callsFake(fn);
}

function reset() {
  sendEmailStub = null;
  sendRawEmailStub = null;
  sent.splice(0, sent.length);
  sentRaw.splice(0, sentRaw.length);
  sandbox.restore();
}

export { sendEmail, sendRawEmail, reset, sent, sentRaw, sendRawEmailWithError };
/* c8 ignore stop */
