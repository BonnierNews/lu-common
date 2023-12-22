import util from "util";
import config from "exp-config";
import { buildLogger } from "lu-logger";
import axios from "axios";
import assert from "assert";

import { getGcpAuthHeaders } from "./gcp-auth.js";

const backends = buildBackends();

async function performRequest(method, params) {
  assert(config.appName, "appName must be set in config");

  const logger = buildLogger({
    meta: {
      correlationId: params.correlationId,
      requesterName: config.appName,
      routingKey: params.routingKey,
      key: params.key,
    },
  });
  const url = getUrl(params);
  logger.info(`HTTP ${method}, ${url}, params: ${JSON.stringify(params)}`);

  // default to not let axios validate status, we do that ourselves, but allow override via opts
  let validateStatus = () => true;
  if (params?.opts?.validateStatus) validateStatus = params.opts.validateStatus;

  const opts = {
    method,
    params: { ...params.qs, ...params.query },
    headers: await buildHeaders(params, { ...(params.headers || {}) }),
    validateStatus,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  };

  if (params.auth) {
    opts.auth =
      params.auth.user && params.auth.pass ? { username: params.auth.user, password: params.auth.pass } : params.auth;
  }
  if (params.body) {
    opts.data = params.body;
  }
  if (params.timeout) {
    opts.timeout = params.timeout;
  }
  if (params.responseType) {
    opts.responseType = params.responseType;
  }
  if (params.paramsSerializer) {
    opts.paramsSerializer = params.paramsSerializer;
  }

  let response;
  try {
    response = await axios(url, opts);
    logger.info(`HTTP response for ${method} ${url}, ${response.status}, ${JSON.stringify(response.data)}`);
  } catch (err) {
    logger.warning(
      `HTTP ${method}:${url} , error: ${err}`
    );
    throw err;
  }

  // for backwards compability
  response.statusCode = response.status;
  response.body = response.data;
  return response;
}

async function buildHeaders(params, headers = {}) {
  // We have enabled the possibility to send in a different gcp config to use
  const conf = params.gcpConfig || config.gcpProxy;
  // We will firsthand use the cloudRunUrl
  // This so we go directly to the cloud run url without going through a LB out on the web.
  const audienceOrUrl = conf.cloudRunUrl || conf.audience;
  let gcpHeader = {};
  if (!params.baseUrl && audienceOrUrl) gcpHeader = await getGcpAuthHeaders(audienceOrUrl);
  headers = { ...headers, ...gcpHeader };

  const defaults = {
    accept: "application/json",
    "correlation-id": params.correlationId,
    "x-debug-meta-requester-name": config.appName,
    "x-debug-meta-routing-key": params.routingKey,
  };
  return { ...defaults, ...headers };
}

function buildVerboseError(method, params, response) {
  const url = getUrl(params);
  const msg = util.format(
    "HTTP %s:%s yielded %s (detail:",
    method,
    url,
    response && response.statusCode,
    dumpResponse(response),
    ")"
  );
  const error = new Error(msg);
  error.statusCode = response.statusCode;

  return error;
}

function dumpResponse(response) {
  const body = (response && response.data && JSON.stringify(response.data)) || response.text; // TODO: SIVA test with response.text - plain/text maybe?
  return `${response.statusCode}:${body}`;
}

function buildBackends() {
  const result = { del: performRequest.bind(null, "DELETE") };

  [ "HEAD", "GET", "PATCH", "POST", "PUT" ].forEach((method) => {
    result[method.toLowerCase()] = performRequest.bind(null, method);
  });

  result.asserted = Object.keys(result).reduce((asserted, verb) => {
    asserted[verb] = withAssertion.bind(withAssertion, verb, result[verb]);
    return asserted;
  }, {});

  result.getAsStream = async (params) => {
    const url = getUrl(params);
    const opts = {
      method: "get",
      params: { ...params.qs, ...params.query },
      headers: await buildHeaders(params, { ...(params.headers || {}) }),
      validateStatus: function () {
        return true; // do not let axios validate status, we do that ourselves
      },
      ...params.opts,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      responseType: "stream",
    };

    if (params.timeout) opts.timeout = params.timeout;

    const response = await axios(url, opts);

    return response.data;
  };

  return result;
}

function withAssertion(verb, fn, params) {
  return fn(params).then((response) => {
    if (verb.toUpperCase() === "GET" && response.statusCode > 299) {
      throw buildVerboseError("GET", params, response);
    } else if (![ 200, 201, 202, 204, 301, 302 ].includes(response.statusCode)) {
      throw buildVerboseError(verb.toUpperCase(), params, response);
    }

    return response.body;
  });
}

function getUrl(params) {
  // Enable the usage of sent in gcpConfig and cloudRunUrl.
  const conf = params.gcpConfig || config.gcpProxy;
  // If we send in a baseUrl, always use that. Then look if we should call the cloudRun url
  // If not then call the loadbalancer url.
  if (params.baseUrl) return `${params.baseUrl}${params.path}`;
  return `${conf.cloudRunUrl || conf.url}${params.path}`;
}

export default backends;
