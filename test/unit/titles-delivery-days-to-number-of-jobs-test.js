import { deliveryDaysToNumberOfJobs } from "../../lib/titles.js";

describe("delivery days to number of jobs", () => {
  it("should return the correct days: monday, tuesday, wednesday, thursday, friday, saturday, sunday", () => {
    const deliveryDays = [ "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday" ];
    const numberOfJobs = deliveryDaysToNumberOfJobs(deliveryDays);
    numberOfJobs.should.eql({
      monday: 1,
      tuesday: 1,
      wednesday: 1,
      thursday: 1,
      friday: 3,
      saturday: 0,
      sunday: 0,
    });
  });

  it("should return the correct days: tuesday, thursday, saturday", () => {
    const deliveryDays = [ "tuesday", "thursday", "saturday" ];
    const numberOfJobs = deliveryDaysToNumberOfJobs(deliveryDays);
    numberOfJobs.should.eql({
      monday: 2,
      tuesday: 0,
      wednesday: 2,
      thursday: 0,
      friday: 3,
      saturday: 0,
      sunday: 0,
    });
  });

  it("should return the correct days: friday, saturday, sunday", () => {
    const deliverDays = [ "friday", "saturday", "sunday" ];
    const numberOfJobs = deliveryDaysToNumberOfJobs(deliverDays);
    numberOfJobs.should.eql({
      monday: 3,
      tuesday: 0,
      wednesday: 0,
      thursday: 1,
      friday: 3,
      saturday: 0,
      sunday: 0,
    });
  });
  it("should return the correct days: monday, wednesday, friday, sunday", () => {
    const numberOfJobs = deliveryDaysToNumberOfJobs([ "monday", "wednesday", "friday", "sunday" ]);
    numberOfJobs.should.eql({
      monday: 1,
      tuesday: 2,
      wednesday: 0,
      thursday: 1,
      friday: 3,
      saturday: 0,
      sunday: 0,
    });
  });
  it("should return the correct days", () => {
    const numberOfJobs = deliveryDaysToNumberOfJobs([ "monday", "tuesday", "thursday" ]);
    numberOfJobs.should.eql({
      monday: 2,
      tuesday: 0,
      wednesday: 2,
      thursday: 0,
      friday: 3,
      saturday: 0,
      sunday: 0,
    });
  });

  it("should return the correct days", () => {
    const numberOfJobs = deliveryDaysToNumberOfJobs([ "monday" ]);
    numberOfJobs.should.eql({
      monday: 4,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 3,
      saturday: 0,
      sunday: 0,
    });
  });

  it("should return the correct days", () => {
    const numberOfJobs = deliveryDaysToNumberOfJobs([ "monday", "friday" ]);
    numberOfJobs.should.eql({
      monday: 3,
      tuesday: 0,
      wednesday: 0,
      thursday: 1,
      friday: 3,
      saturday: 0,
      sunday: 0,
    });
  });

  it("should return the correct days", () => {
    const numberOfJobs = deliveryDaysToNumberOfJobs([ "monday", "tuesday", "thursday", "friday", "saturday", "sunday" ]);
    numberOfJobs.should.eql({
      monday: 2,
      tuesday: 0,
      wednesday: 1,
      thursday: 1,
      friday: 3,
      saturday: 0,
      sunday: 0,
    });
  });
});
