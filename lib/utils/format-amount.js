const fromZuora = (amount) => {
  return Number(amount.toFixed(2).replace(".", ""));
};

const toZuora = (amount) => {
  return Number(amount || 0) / 100.0;
};

export { fromZuora, toZuora };
