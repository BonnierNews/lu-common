"use strict";

function* enumerate(iterable) {
  let counter = 0;

  for (const i of iterable) {
    yield [counter, i];
    counter++;
  }
}

module.exports = {enumerate};
