"use strict";

function createBackOfficeCaseBody(subject, description, namespace) {
  return {
    category: "Back Office",
    description,
    namespace,
    origin: "Greenfield",
    owner: "Back Office",
    sourceQueue: "Back Office",
    subject
  };
}

module.exports = {createBackOfficeCaseBody};
