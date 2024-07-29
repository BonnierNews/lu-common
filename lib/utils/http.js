import assert from "assert";
import axios from "axios";
import config from "exp-config";
import http from "http";
import https from "https";
import { debugMeta, logger } from "lu-logger";
import util from "util";

import { getGcpAuthHeaders } from "./gcp-auth.js";
import getUrl from "./get-url.js";

const backends = buildBackends();

const httpAgent = new http.Agent({ keepAlive: false });
const httpsAgent = new https.Agent({ keepAlive: false });
const httpAgentKeepAlive = new http.Agent({ keepAlive: true });
const httpsAgentKeepAlive = new https.Agent({ keepAlive: true });

async function performRequest(method, params) {
  assert(config.appName, "appName must be set in config");

  const correlationId = params.correlationId || debugMeta.getDebugMeta().correlationId;
  const url = getUrl(params);
  logger.info(`HTTP ${method}, ${url}, params: ${JSON.stringify(params)}`, { correlationId });

  // default to not let axios validate status, we do that ourselves, but allow override via opts
  let validateStatus = () => true;
  if (params?.opts?.validateStatus) validateStatus = params.opts.validateStatus;

  const opts = {
    method,
    params: { ...params.qs, ...params.query },
    headers: await buildHeaders({ ...params, correlationId }, { ...(params.headers || {}) }),
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

  if (params.keepAlive) {
    opts.httpAgent = httpAgentKeepAlive;
    opts.httpsAgent = httpsAgentKeepAlive;
  } else {
    opts.httpAgent = httpAgent;
    opts.httpsAgent = httpsAgent;
  }

  let response;
  try {
    response = await axios(url, opts);
    logger.info(`HTTP response for ${method} ${url}, ${response.status}, ${JSON.stringify(response.data)}`, { correlationId });
  } catch (err) {
    logger.warning(`HTTP ${method}:${url} , error: ${err}`, { correlationId });
    throw err;
  }

  // for backwards compability
  response.statusCode = response.status;
  response.body = response.data;
  return response;
}

async function buildHeaders(params, headers = {}) {
  if (!headers.Authorization) {
    // We have enabled the possibility to send in a different gcp config to use
    const conf = params.gcpConfig || config.gcpProxy;
    let gcpHeader = {};
    if (!params.baseUrl && conf.audience) gcpHeader = await getGcpAuthHeaders(conf.audience);
    headers = { ...headers, ...gcpHeader };
  }
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
  const body = response && response.data && JSON.stringify(response.data);
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

export default backends;
