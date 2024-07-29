import { getTsCode, productMapping } from "../../lib/titles.js";

const titleTsCodeMapping = [
  {
    tsCode: "0550",
    title: "expressen",
    text: "Expressen",
    singleTitle: false,
  },
  {
    tsCode: "0760",
    title: "gt",
    text: "GT",
    singleTitle: false,
  },
  {
    tsCode: "1160",
    title: "kvp",
    text: "Kvällsposten",
    singleTitle: false,
  },
  {
    tsCode: "0440",
    title: "dn",
    text: "DN",
    singleTitle: false,
  },
  {
    tsCode: "0435",
    title: "di",
    text: "DI",
    singleTitle: true,
  },
  {
    tsCode: "0990",
    title: "ht",
    text: "Hudiksvalls Tidning",
    singleTitle: false,
  },
  {
    tsCode: "0990",
    title: "hudiksvalsstidning",
    expectedTitle: "ht",
    text: "Hudiksvalls Tidning (wrong spelling)",
    singleTitle: false,
  },
];

describe("sanity check productMapping", () => {
  describe("get tsCode by title", () => {
    for (const s of titleTsCodeMapping) {
      describe(s.text, () => {
        it(`should find tsCode ${s.tsCode} based on title ${s.title}`, () => {
          const tsCode = getTsCode(s.title);
          tsCode.should.eql(s.tsCode);
        });
      });
    }
  });

  describe("get title by tsCode", () => {
    for (const s of titleTsCodeMapping) {
      describe(s.text, () => {
        it(`should find title ${s.title} based on tsCode ${s.tsCode}`, () => {
          const { title } = productMapping.find((pm) => pm.tsCode === s.tsCode);
          title.should.eql(s.expectedTitle || s.title);
        });
      });
    }
  });

  describe("get tsCode for invalid title", () => {
    it("should not find a tsCode for some-title", () => {
      const tsCode = getTsCode("some-title");
      Boolean(tsCode).should.eql(false);
    });
  });
});
