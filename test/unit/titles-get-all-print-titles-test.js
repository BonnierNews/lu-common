import { getAllPrintTitles, productMapping } from "../../lib/titles.js";

describe("getAllPrintTitles", () => {
  describe("returns all titles", () => {
    it("should return all titles", () => {
      const allTitles = getAllPrintTitles();
      const allTitlesFromConfig = productMapping.filter((pm) => pm.title).map((pm) => pm.title);
      allTitles.should.eql(allTitlesFromConfig);
    });
  });
});
