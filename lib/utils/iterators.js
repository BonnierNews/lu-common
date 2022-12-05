"use strict";

function cons(...o) {
  return async function* (iterables) {
    for await (const iterable of iterables) {
      yield [...o, iterable];
    }
  };
}

function decorate(o) {
  return async function* (iterables) {
    for await (const iterable of iterables) {
      yield {...iterable, attributes: {...iterable.attributes, ...o}};
    }
  };
}

function inject(o) {
  return async function* (iterables) {
    yield o;
    for await (const iterable of iterables) {
      yield iterable;
    }
  };
}
async function* parse(data) {
  for await (const line of data) {
    if (line) {
      yield JSON.parse(line);
    }
  }
}

async function* split(iterable) {
  let previous = "";
  for await (const chunk of iterable) {
    previous += chunk;
    let eolIndex;
    const eol = previous.indexOf("\r\n") !== -1 ? "\r\n" : "\n";

    while ((eolIndex = previous.indexOf(eol)) >= 0) {
      // line includes the EOL
      const line = previous.slice(0, eolIndex);
      yield line;
      previous = previous.slice(eolIndex + 1 + (eol === "\r\n" ? 1 : 0));
    }
  }
  if (previous.length > 0) {
    yield previous;
  }
}

async function* stringify(iterable) {
  for await (const o of iterable) {
    if (o) {
      yield `${JSON.stringify(Buffer.isBuffer(o) ? o.toString() : o)}\n`;
    }
  }
}

/**
 *
 * @param {Array} data
 */
async function* generate(data) {
  for await (const d of data) yield d;
}

module.exports = {
  cons,
  decorate,
  inject,
  parse,
  split,
  stringify,
  generate
};
