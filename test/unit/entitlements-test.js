import { plusAllt } from "../../lib/entitlements.js";

describe("check if postal delivery allowed", () => {
  plusAllt.should.eql([
    "DNAllArticles",
    "DNMyDN",
    "localAllArticles",
    "plusALLT",
  ]);
});
