"use strict";

const {createBackOfficeCaseBody} = require("../../../lib/helpers/api-body-helper");

const description = "An order is in an unresovable state for the system",
  namespace = "some-namespace",
  subject = "Bad order";

const backOfficeCaseBody = {
  category: "Back Office",
  description,
  namespace,
  origin: "Greenfield",
  owner: "Back Office",
  sourceQueue: "Back Office",
  subject
};

describe("create back office case body", () => {
  describe("when calling the create body with description, namespace and subject", () => {
    it("should create the expected body with sent in parameters", () => {
      createBackOfficeCaseBody(subject, description, namespace).should.eql(backOfficeCaseBody);
    });
  });
});
