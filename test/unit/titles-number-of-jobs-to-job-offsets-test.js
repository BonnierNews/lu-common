import { numberOfJobsToJobOffsets } from "../../lib/titles.js";

describe("number of jobs to jobs offset", () => {
  it("should return the correct days", () => {
    const numberOfJobs = {
      monday: 1,
      tuesday: 1,
      wednesday: 1,
      thursday: 1,
      friday: 3,
      saturday: 0,
      sunday: 0,
    };
    const jobsOffset = numberOfJobsToJobOffsets(numberOfJobs);
    jobsOffset.should.eql({
      monday: 3,
      tuesday: 1,
      wednesday: 1,
      thursday: 1,
      friday: 1,
      saturday: 1,
      sunday: 2,
    });
  });

  it("should return the correct days", () => {
    const numberOfJobs = {
      monday: 3,
      tuesday: 0,
      wednesday: 0,
      thursday: 1,
      friday: 3,
      saturday: 0,
      sunday: 0,
    };
    const jobsOffset = numberOfJobsToJobOffsets(numberOfJobs);
    jobsOffset.should.eql({
      monday: 3,
      tuesday: 1,
      wednesday: 2,
      thursday: 3,
      friday: 1,
      saturday: 1,
      sunday: 2,
    });
  });

  it("should return the correct days", () => {
    const numberOfJobs = {
      monday: 2,
      tuesday: 0,
      wednesday: 2,
      thursday: 0,
      friday: 3,
      saturday: 0,
      sunday: 0,
    };
    const jobsOffset = numberOfJobsToJobOffsets(numberOfJobs);
    jobsOffset.should.eql({
      monday: 3,
      tuesday: 1,
      wednesday: 2,
      thursday: 1,
      friday: 2,
      saturday: 1,
      sunday: 2,
    });
  });

  it("should return the correct days", () => {
    const numberOfJobs = {
      monday: 1,
      tuesday: 2,
      wednesday: 0,
      thursday: 1,
      friday: 3,
      saturday: 0,
      sunday: 0,
    };
    const jobsOffset = numberOfJobsToJobOffsets(numberOfJobs);
    jobsOffset.should.eql({
      monday: 3,
      tuesday: 1,
      wednesday: 1,
      thursday: 2,
      friday: 1,
      saturday: 1,
      sunday: 2,
    });
  });

  it("should return the correct days", () => {
    const numberOfJobs = {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 7,
      saturday: 0,
      sunday: 0,
    };
    const jobsOffset = numberOfJobsToJobOffsets(numberOfJobs);
    jobsOffset.should.eql({
      monday: 3,
      tuesday: 4,
      wednesday: 5,
      thursday: 6,
      friday: 7,
      saturday: 1,
      sunday: 2,
    });
  });
});
