import config from "exp-config";

function getUrl(params) {
  // If we send in a baseUrl, always use that.
  // If not then call the loadbalancer url.
  if (params.baseUrl) return parse(params.baseUrl, params.path);

  // Enable the usage of sent in gcpConfig.
  const conf = params.gcpConfig || config.gcpProxy;
  return parse(conf.url, params.path);
}

function parse(baseUrl, path) {
  const baseUrlWithProtocol = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;
  const baseUrlWithoutEndSlash = baseUrlWithProtocol.endsWith("/") ? baseUrlWithProtocol.slice(0, -1) : baseUrlWithProtocol;
  const url = new URL(`${baseUrlWithoutEndSlash}${path}`);
  return url.href;
}

export default getUrl;
