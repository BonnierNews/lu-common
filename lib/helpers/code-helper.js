import config from "exp-config";

const enumerate = (arr) => arr.map((value, index) => [ index, value ]);

const getUrl = (params) => {
  return `${params.baseUrl || config.gcpProxy.url}${params.path}`;
};

export { enumerate, getUrl };
