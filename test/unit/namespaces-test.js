import {
  carrierDeliveryOnly,
  carrierDeliveryOnlyNamespaces,
  commonNamespaces,
  getCommonNamespaces,
  isCommonNamespace,
  kayakNamespaces,
  knownNamespaces,
  migratingNamespaces,
  platformNamespaces,
  postalDeliveryOnly,
  printNamespaces,
  provisionedNamespaces,
  postalDeliveryOnlyNamespaces,
  salesforceCaseNamespaces,
  upsalesNamespaces,
} from "../../lib/namespaces.js";

// here in the tests we maintain a full list of expected namespaces just so that we're super clear what is what
//   because the namespace config affects a lot of different parts of the system and we don't want to mess it up
//   by making mistakes in the config
const expectedCarrierOnlyNamespaces = [ "bnlo", "gotamedia" ];
const expectedCommonNamespaces = [
  "bbm-aktuellhallbarhet",
  "bbm-byggindustrin",
  "bbm-dagensmedicin",
  "bbm-dagenssamhalle",
  "bbm-dagligvarunytt",
  "bbm-dam",
  "bbm-fastighetsnytt",
  "bbm-market",
  "bbm-news",
  "bbm-res",
  "bnlo",
  "di",
  "dn",
  "expressen",
  "gotamedia",
  "paf",
];
const expectedKayakNamespaces = [ "di", "hbl" ];
const expectedKnownNamespaces = [
  "bbm-aktuellhallbarhet",
  "bbm-byggindustrin",
  "bbm-dagensmedicin",
  "bbm-dagenssamhalle",
  "bbm-dagligvarunytt",
  "bbm-dam",
  "bbm-fastighetsnytt",
  "bbm-market",
  "bbm-news",
  "bbm-res",
  "bnlo",
  "di",
  "dn",
  "expressen",
  "gotamedia",
  "hbl",
  "paf",
];
const expectedMigratingNamespaces = [ "bnlo", "gotamedia" ];
const expectedPlatformNamespaces = [ "bnlo", "dn", "expressen", "gotamedia", "paf" ];
const expectedPostalDeliveryOnlyNamespaces = [ "paf" ];
const expectedPrintNamespaces = [ "bnlo", "dn", "expressen", "gotamedia", "paf" ];
const expectedProvisionedNamespaces = [
  "bbm-aktuellhallbarhet",
  "bbm-byggindustrin",
  "bbm-dagensmedicin",
  "bbm-dagenssamhalle",
  "bbm-dagligvarunytt",
  "bbm-dam",
  "bbm-fastighetsnytt",
  "bbm-market",
  "bbm-news",
  "bbm-res",
  "bnlo",
  "di",
  "gotamedia",
  "hbl",
];
const expectedSfdcCaseNamespaces = [ "bnlo", "di", "dn", "expressen", "gotamedia", "paf" ];
const expectedUpsalesNamespaces = [
  "bbm-aktuellhallbarhet",
  "bbm-byggindustrin",
  "bbm-dagensmedicin",
  "bbm-dagenssamhalle",
  "bbm-dagligvarunytt",
  "bbm-dam",
  "bbm-fastighetsnytt",
  "bbm-market",
  "bbm-news",
  "bbm-res",
];

describe("namespaces tests", () => {
  describe("distribution related namespace tests", () => {
    describe("printNamespaces", () => {
      it("should give us the expected print namespaces", () => {
        JSON.stringify(printNamespaces.sort()).should.equal(JSON.stringify(expectedPrintNamespaces.sort()));
      });

      it("should NOT contain 'whatever' as part of print namespace", () => {
        const result = expectedPrintNamespaces.includes("whatever");
        result.should.equal(false);
      });
    });

    describe("carrier delivery only tests", () => {
      const scenarios = [
        { expected: true, namespace: "bnlo" },
        { expected: false, namespace: "some-namespace" },
      ];
      for (const s of scenarios) {
        it(`should${!s.expected ? " not" : ""} only allow carrier delivery for ${s.namespace}`, () => {
          const carrierOnly = carrierDeliveryOnly(s.namespace);
          carrierOnly.should.eql(s.expected);
        });
      }

      it("should give us a list of carrier only namespaces", () => {
        JSON.stringify(carrierDeliveryOnlyNamespaces.sort()).should.equal(
          JSON.stringify(expectedCarrierOnlyNamespaces)
        );
      });
    });

    describe("postal delivery only tests", () => {
      const scenarios = [
        { expected: true, namespace: "paf" },
        { expected: false, namespace: "some-namespace" },
      ];
      for (const s of scenarios) {
        it(`should${!s.expected ? " not" : ""} only allow postal delivery for ${s.namespace}`, () => {
          const postOnly = postalDeliveryOnly(s.namespace);
          postOnly.should.eql(s.expected);
        });
      }
    });
  });
  describe("namespace state tests", () => {
    it("should give us a list of known namespaces", () => {
      knownNamespaces.sort().should.eql(expectedKnownNamespaces);
    });

    it("should give us a list of namespaces that are currently migrating into the Platform", () => {
      migratingNamespaces.sort().should.eql(expectedMigratingNamespaces);
    });

    it("should give us a list of namespaces that can receive provisioned resources", () => {
      provisionedNamespaces.sort().should.eql(expectedProvisionedNamespaces);
    });

    it("should give us a list of namespaces that can create Salesforce cases", () => {
      salesforceCaseNamespaces.sort().should.eql(expectedSfdcCaseNamespaces);
    });

    describe("common (credentials) namespace tests", () => {
      it("should give us a list of common namespaces", () => {
        JSON.stringify(commonNamespaces.sort()).should.equal(JSON.stringify(expectedCommonNamespaces));
      });

      it("should give us a list of common namespaces via function call", () => {
        JSON.stringify(getCommonNamespaces().sort()).should.equal(JSON.stringify(expectedCommonNamespaces));
      });

      expectedCommonNamespaces.forEach((namespace) => {
        it(`should confirm '${namespace}' as part of common namespace`, () => {
          const result = isCommonNamespace(namespace);
          result.should.equal(true);
        });
      });

      it("should NOT confirm 'whatever' as part of common namespace", () => {
        const result = isCommonNamespace("whatever");
        result.should.equal(false);
      });

      it("should give us a list of postal delivery only namespaces", () => {
        JSON.stringify(postalDeliveryOnlyNamespaces.sort()).should.equal(
          JSON.stringify(expectedPostalDeliveryOnlyNamespaces)
        );
      });
    });
  });

  describe("system related namespace tests", () => {
    it("should give us a list of Kayak namespaces", () => {
      kayakNamespaces.should.eql(expectedKayakNamespaces);
    });
    it("should give us a list of Platform namespaces", () => {
      platformNamespaces.sort().should.eql(expectedPlatformNamespaces);
    });
    it("should give us a list of Upsales namespaces", () => {
      upsalesNamespaces.sort().should.eql(expectedUpsalesNamespaces);
    });
  });
});
