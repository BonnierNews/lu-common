import { getDeliveryDays } from "../../lib/titles.js";

describe("get delivery days", () => {
  describe("get delivery days for dn", () => {
    it("should return the correct days", () => {
      const deliveryDates = getDeliveryDays("dn", "dn");
      deliveryDates.should.eql([ "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday" ]);
    });
  });

  describe("get delivery days for title that does not have any deliveryDays configured", () => {
    it("should throw an error", () => {
      try {
        getDeliveryDays("paf", "pff");
      } catch (error) {
        error.message.should.eql("No delivery days for title pff was found. Update product-mapping config");
      }
    });
  });

  describe("get delivery days for title in wrong namespace", () => {
    it("should throw an error", () => {
      try {
        getDeliveryDays("paf", "dn");
      } catch (error) {
        error.message.should.eql("title dn not valid for namespace paf. Check product-mapping config");
      }
    });
  });
});
