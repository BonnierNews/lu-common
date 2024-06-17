import { expect } from "chai";

import * as swedishBankday from "../../../lib/utils/swedish-bankday.js";

describe("isBankDay", () => {
  it("should handle weekdays", () => {
    expect(swedishBankday.isBankDay("2020-06-17")).to.eql(true);
    expect(swedishBankday.isBankDay("2020-06-21")).to.eql(false);
  });

  it("should handle non-weekend holidays", () => {
    expect(swedishBankday.isBankDay("2020-06-19")).to.eql(false); // Midsummer's Day
    expect(swedishBankday.isBankDay("2020-04-10")).to.eql(false); // Good Friday
  });
});

describe("nextBankDay", () => {
  it("should handle weekdays", () => {
    expect(swedishBankday.nextBankDay("2020-06-17")).to.eql("2020-06-18");
  });

  it("should handle non-weekend holidays", () => {
    expect(swedishBankday.nextBankDay("2020-06-18")).to.eql("2020-06-22"); // Midsummer's Day
    expect(swedishBankday.nextBankDay("2020-04-09")).to.eql("2020-04-14"); // Good Friday
  });
});
