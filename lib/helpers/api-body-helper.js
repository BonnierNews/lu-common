"use strict";

const ownerMapper = {
  dn: "DNBO"
};

const sourceQueueMapper = {
  dn: "DNBO"
};

function createBackOfficeCaseBody(subject, description, namespace) {
  return {
    category: "Övriga ärenden",
    description,
    namespace,
    origin: "Greenfield",
    owner: ownerMapper[namespace],
    sourceQueue: sourceQueueMapper[namespace],
    subject
  };
}

module.exports = {createBackOfficeCaseBody};
