"use strict";

const createBackOfficeCaseBody = require("../../../lib/helpers/case-body-helper");

const description = "An order is in an unresovable state for the system",
  namespace = "dn",
  subject = "Bad order";

const backOfficeCaseBody = {
  category: "Övriga ärenden",
  description,
  namespace,
  origin: "Greenfield",
  owner: "DNBO",
  sourceQueue: "DNBO",
  subject,
};

describe("create back office case body", () => {
  describe("when calling the create body with description, namespace and subject", () => {
    it("should create the expected body with sent in parameters", () => {
      createBackOfficeCaseBody(subject, description, namespace).should.eql(backOfficeCaseBody);
    });
  });
});
