"use strict";

const createBackOfficeCaseBody = require("../../../lib/helpers/case-body-helper");

const description = "An order is in an unresolveable state for the system",
  namespace = "dn",
  subject = "Bad order";

const backOfficeCaseBody = {
  businessType: "BN_B2C",
  category: "Övriga ärenden",
  description,
  namespace,
  origin: "Greenfield",
  owner: "DNBO",
  priority: "Medium",
  sourceQueue: "DNBO",
  subject,
};

describe("create back office case body", () => {
  describe("when calling the create body with description, namespace and subject", () => {
    it("should create the expected body with sent in parameters", () => {
      createBackOfficeCaseBody(subject, description, namespace).should.eql(backOfficeCaseBody);
    });
  });

  describe("when calling the create body with optional parameters", () => {
    it("should create the expected body with sent in parameters", () => {
      const deploymentName = "some-deployment",
        externalReference = "some-id";
      createBackOfficeCaseBody(subject, description, namespace, { deploymentName, externalReference }).should.eql({
        ...backOfficeCaseBody,
        deploymentName: "some-deployment",
        externalReference: "some-id",
      });
    });
  });

  describe("when calling the create body with non-default parameters", () => {
    it("should create the expected body with sent in parameters", () => {
      const category = "some-category",
        priority = "High";
      createBackOfficeCaseBody(subject, description, namespace, { category, priority }).should.eql({
        ...backOfficeCaseBody,
        category,
        priority,
      });
    });
  });

  describe("when calling the create body with a badly formed contact", () => {
    it("should fail the joi validation", () => {
      try {
        createBackOfficeCaseBody(subject, description, namespace, { contact: { firstName: "Joe", lastName: "Bloggs" } });
      } catch (error) {
        error.message.should.eql('"contact.email" is required');
      }
    });
  });

  describe("when calling the create body with an invalid priority", () => {
    it("should fail the joi validation", () => {
      try {
        createBackOfficeCaseBody(subject, description, namespace, { priority: "Highest" });
      } catch (error) {
        error.message.should.eql('"priority" must be one of [High, Medium, Low]');
      }
    });
  });
});
