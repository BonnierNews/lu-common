"use strict";

const { caseSchema } = require("../validation-helpers/schemas");

const ownerMapper = {
  "bbm-res": "BBM",
  "bbm-dam": "BBM",
  "bbm-aktuellhallbarhet": "BBM",
  "bbm-fastighetsnytt": "BBM",
  "bbm-byggindustrin": "BBM",
  "bbm-dagensmedicin": "BBM",
  "bbm-dagligvarunytt": "BBM",
  "bbm-dagenssamhalle": "BBM",
  "bbm-market": "BBM",
  "bbm-news": "BBM",
  bnlo: "MittMedia",
  di: "Di_Backoffice_Omni",
  dn: "DNBO",
  expressen: "Expressen_Backoffice",
  paf: "Di_Backoffice_Omni",
};

const sourceQueueMapper = {
  "bbm-res": "BBM_BackOffice",
  "bbm-dam": "BBM_BackOffice",
  "bbm-aktuellhallbarhet": "BBM_BackOffice",
  "bbm-fastighetsnytt": "BBM_BackOffice",
  "bbm-byggindustrin": "BBM_BackOffice",
  "bbm-dagensmedicin": "BBM_BackOffice",
  "bbm-dagligvarunytt": "BBM_BackOffice",
  "bbm-dagenssamhalle": "BBM_BackOffice",
  "bbm-market": "BBM_BackOffice",
  "bbm-news": "BBM_BackOffice",
  bnlo: "MittMedia_Secondline_Support",
  di: "Di_Second_Line",
  dn: "DNBO",
  expressen: "Expressen_Backoffice",
  paf: "PAF_Kundservice",
};

function createBackOfficeCaseBody(
  subject,
  description,
  namespace,
  {
    businessType = "BN_B2C",
    category = "Övriga ärenden",
    contact,
    deploymentName,
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
    owner: owner || ownerMapper[namespace],
    priority,
    sourceQueue: sourceQueue || sourceQueueMapper[namespace],
    subject,
  };

  if (contact) caseBody.contact = contact;
  if (deploymentName) caseBody.deploymentName = deploymentName;
  if (externalReference) caseBody.externalReference = externalReference;

  const result = caseSchema.validate(caseBody);

  if (result.error) throw result.error;

  return caseBody;
}

module.exports = createBackOfficeCaseBody;
