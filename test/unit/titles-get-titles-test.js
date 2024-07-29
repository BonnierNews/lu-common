import {
  alternativeTitleConfig,
  allTitlesConfig,
  getAllTitles,
  getAllPrintTitles,
  getTitleConfig,
  productMapping,
  getTitlesByNamespace,
  getPrintTitlesByNamespace,
  productConfig,
  realTitlesConfig,
} from "../../lib/titles.js";

const namespaceSafety = [
  { namespace: "dn", text: "DN" },
  { namespace: "di", text: "DI" },
  { namespace: "expressen", text: "Expressen" },
  { namespace: "bnlo", text: "BN Local" },
  { namespace: "paf", text: "Privata Affärer" },
  { namespace: "gotamedia", text: "Gota Media" },
];

describe("get titles", () => {
  describe("getting all titles", () => {
    it("should return all titles", () => {
      const allTitles = getAllTitles();
      const allTitlesFromConfig = productMapping.filter((p) => p.title).map((p) => p.title);
      allTitles.sort().should.eql(allTitlesFromConfig.sort());
    });

    it("should return all print titles", () => {
      const allTitles = getAllPrintTitles();
      const allTitlesFromConfig = productMapping.filter((p) => p.title && p.tsCode).map((p) => p.title);
      allTitles.sort().should.eql(allTitlesFromConfig.sort());
    });
  });

  describe("get titles by namespace", () => {
    for (const n of namespaceSafety) {
      describe(n.text, () => {
        it(`should return all titles in namespace: ${n.namespace}`, () => {
          const titles = getTitlesByNamespace(n.namespace);
          const titlesFromConfig = productConfig[n.namespace].map((p) => p.title).filter((t) => t);
          titles.should.eql(titlesFromConfig);
        });

        it(`should return all print titles in namespace: ${n.namespace}`, () => {
          const titles = getPrintTitlesByNamespace(n.namespace);
          const titlesFromConfig = productConfig[n.namespace]
            .filter((t) => t.tsCode)
            .map((pm) => pm.title)
            .filter((t) => t);
          titles.should.eql(titlesFromConfig);
        });
      });
    }
  });

  describe("get specific title config", () => {
    it("should return the config for a title", () => {
      getTitleConfig("dn").should.eql({
        namespace: "dn",
        title: "dn",
        tsCode: "0440",
        shortName: "DN",
        subDirectory: "",
        type: "paper",
        productName: "DN",
        diCustomerSystem: "DNY",
        diTitle: "Dagens Nyheter",
        complaintSenderId: "1160",
        deliveryDays: [ "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday" ],
        expectDiffFileEveryDeliveryDay: true,
      });
    });
    it("should return the config for an alternative title", () => {
      getTitleConfig("ljusnan").should.eql({
        namespace: "bnlo",
        title: "lj",
        alternativeTitles: [ "ljusnan" ],
        tsCode: "1230",
        shortName: "",
        subDirectory: "",
        type: "paper",
        productName: "Ljusnan",
        diCustomerSystem: "",
        deliveryDays: [ "monday", "wednesday", "thursday", "friday" ],
      });
    });
    it("should return nothing for an unknown title", () => {
      should.not.exist(getTitleConfig("whatever"));
    });
    [ "di", "dn" ].forEach((title) => {
      it(`should expect ${title} to have so many subscriptions that a start/stop file is expected every day`, () => {
        getTitleConfig(title).expectDiffFileEveryDeliveryDay.should.eql(true);
      });
    });
    it("should expect expressen to have so few subscriptions that there won't necessarily be a start/stop file every day", () => {
      Boolean(getTitleConfig("expressen").expectDiffFileEveryDeliveryDay).should.eql(false);
    });
  });

  describe("title lists", () => {
    it("should provide a list of all titles with config", () => {
      const numTitles = productMapping.filter((p) => p.title).length;
      realTitlesConfig.length.should.eql(numTitles);

      const expectedConfig = productMapping.find((p) => p.title === realTitlesConfig[0].title);
      realTitlesConfig[0].should.eql(expectedConfig);
    });
    it("should provide a list of all alternative titles with config", () => {
      const numAlternativeTitles = productMapping
        .filter((p) => p.alternativeTitles)
        .reduce((acc, p) => acc + p.alternativeTitles.length, 0);
      alternativeTitleConfig.length.should.eql(numAlternativeTitles);

      const expectedConfig = {
        ...productMapping
          .filter((p) => p.alternativeTitles)
          .find((p) => p.alternativeTitles.includes(alternativeTitleConfig[0].title)),
        title: alternativeTitleConfig[0].title,
      };
      alternativeTitleConfig[0].should.eql(expectedConfig);
    });
    it("should provide a list of titles including alternative titles", () => {
      allTitlesConfig.should.eql([ ...realTitlesConfig, ...alternativeTitleConfig ]);
    });
  });
});
