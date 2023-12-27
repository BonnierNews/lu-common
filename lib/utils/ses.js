/* c8 ignore start */
// Reason: we'll soon be moving this functionaltiy to Google's smtp
import config from "exp-config";
import AWS from "aws-sdk";

const awsSes = new AWS.SES({
  region: "eu-west-1",
  httpOptions: { timeout: 1000000 },
  accessKeyId: config.ses?.accessKeyId,
  secretAccessKey: config.ses?.secretAccessKey,
});

const sendEmail = async (namespace, params) => {
  if (namespace !== "expressen") throw new Error(`${namespace} not supported`);
  return await awsSes.sendEmail(params).promise();
};

const sendRawEmail = async (namespace, params) => {
  if (namespace !== "expressen") throw new Error(`${namespace} not supported`);
  return await awsSes.sendRawEmail(params).promise();
};

// we have to export utils as well to make it possible to mock the functions in tests with ES6
const utils = { sendEmail, sendRawEmail };
export { sendEmail, sendRawEmail, utils };
/* c8 ignore stop */
