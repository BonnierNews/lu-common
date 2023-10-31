"use strict";

const { caseSchema } = require("../validation-helpers/schemas");

function createBackOfficeCaseBody(
  subject,
  description,
  namespace,
  {
    businessType = "BN_B2C",
    category = "Övriga ärenden",
    contact,
    deploymentName,
    eTaskId,
    externalReference,
    origin = "Greenfield",
    owner,
    priority = "Medium",
    sourceQueue,
  } = {}
) {
  const caseBody = {
    businessType,
    category,
    description,
    namespace,
    origin,
    owner,
    priority,
    sourceQueue,
    subject,
  };

  if (contact) caseBody.contact = contact;
  if (deploymentName) caseBody.deploymentName = deploymentName;
  if (externalReference) caseBody.externalReference = externalReference;
  if (eTaskId) caseBody.eTaskId = eTaskId;

  const result = caseSchema.validate(caseBody);

  if (result.error) throw result.error;

  return caseBody;
}

module.exports = createBackOfficeCaseBody;
