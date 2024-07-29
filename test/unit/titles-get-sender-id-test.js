import { getSenderId, productMapping } from "../../lib/titles.js";

const allPrintProducts = productMapping.filter((p) => p.title && p.tsCode);

describe("get complaints sender id", () => {
  describe("titles with sender id", () => {
    allPrintProducts.filter((p) => Boolean(p.complaintSenderId)).forEach(({ namespace, title }) => {
      it(`${namespace}/${title}`, () => {
        getSenderId(namespace, title).should.eql(productMapping.find((pm) => pm.title === title).complaintSenderId);
      });
    });
  });
  describe("titles without sender id", () => {
    allPrintProducts.filter((p) => !p.complaintSenderId).forEach(({ namespace, title }) => {
      it(`${namespace}/${title}`, () => {
        try {
          getSenderId(namespace, title);
        } catch (error) {
          error.message.should.eql("No senderId for report complaint was found. Update product-mapping config");
        }
      });
    });
  });
});
