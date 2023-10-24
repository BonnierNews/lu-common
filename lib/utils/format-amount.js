"use strict";

module.exports = {
  fromZuora: (amount) => {
    return Number(amount.toFixed(2).replace(".", ""));
  },
  toZuora: (amount) => {
    return Number(amount || 0) / 100.0;
  },
};
