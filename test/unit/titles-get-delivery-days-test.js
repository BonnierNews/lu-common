import { getDeliveryDays } from "../../lib/titles.js";

describe("get delivery days", () => {
  describe("get delivery days for dn", () => {
    it("should return the correct days", () => {
      const deliveryDates = getDeliveryDays("dn", "dn");
      deliveryDates.should.eql([ "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday" ]);
    });
  });

  describe("get delivery days for title that does not have any deliverDays configured", () => {
    it("should throw an error", () => {
      try {
        getDeliveryDays("paf", "paf");
      } catch (error) {
        error.message.should.eql("No delivery days for title was found. Update product-mapping config");
      }
    });
  });
});
