import { getTitlesByNamespace, getPrintTitlesByNamespace, productConfig } from "../../lib/titles.js";

const namespaceSafety = [
  { namespace: "dn", text: "DN" },
  { namespace: "di", text: "DI" },
  { namespace: "expressen", text: "Expressen" },
  { namespace: "bnlo", text: "BN Local" },
  { namespace: "paf", text: "Privata Affärer" },
  { namespace: "gotamedia", text: "Gota Media" },
];

describe("get titles by namespace", () => {
  for (const n of namespaceSafety) {
    describe(n.text, () => {
      it(`should return all titles in namespace: ${n.namespace}`, () => {
        const titles = getTitlesByNamespace(n.namespace);
        const titlesFromConfig = productConfig[n.namespace].map((pm) => pm.title).filter((t) => t);
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
