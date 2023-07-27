"use strict";

const config = require("exp-config");
const { livesInGcp } = config;

const enumerate = (arr) => arr.map((value, index) => [ index, value ]);

const getUrl = (params) => {
  const application = params.path.split("/").find(Boolean);
  if (livesInGcp?.includes(application)) {
    return `${params.baseUrl || config.gcpProxy.url}${params.path}`;
  }
  return `${params.baseUrl || config.proxyUrl}${params.path}`;
};

module.exports = { enumerate, getUrl };
