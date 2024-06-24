import { getAllTitles, getAllPrintTitles, productMapping } from "../../lib/titles.js";

describe("get titles", () => {
  it("should return all titles", () => {
    const allTitles = getAllTitles();
    const allTitlesFromConfig = productMapping.filter((pm) => pm.title).map((pm) => pm.title);
    allTitles.should.eql(allTitlesFromConfig);
  });

  it("should return all print titles", () => {
    const allTitles = getAllPrintTitles();
    const allTitlesFromConfig = productMapping.filter((pm) => pm.tsCode).map((pm) => pm.title);
    allTitles.should.eql(allTitlesFromConfig);
  });
});
