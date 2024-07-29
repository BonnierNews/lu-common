import { productMapping, productConfig } from "../../lib/titles.js";

describe("sanity check productMapping", () => {
  describe("check for duplicate productCode/type combinations", () => {
    it("should not find any duplicate productCode/type combinations", () => {
      const allProductCodeTypeCombos = productMapping
        .filter((pm) => pm.productCode)
        .map((pm) => pm.type + pm.productCode);
      const thereAreDuplicates = hasDuplicates(allProductCodeTypeCombos);
      thereAreDuplicates.should.eql(false);
    });
  });

  describe("check for duplicate titles", () => {
    it("should not find any duplicate titles", () => {
      const allTitles = productMapping.filter((pm) => pm.title).map((pm) => pm.title);
      const thereAreDuplicates = hasDuplicates(allTitles);
      thereAreDuplicates.should.eql(false);
    });
  });
});

describe("sanity check productConfig", () => {
  const flattenedProductConfig = [];
  Object.keys(productConfig).map((namespace) => {
    flattenedProductConfig.push(...productConfig[namespace]);
  });

  describe("check for duplicate tsCodes", () => {
    it("should not find any duplicate tsCodes", () => {
      const allTsCodes = flattenedProductConfig.filter((pm) => pm.tsCode).map((pm) => pm.tsCode);
      const thereAreDuplicates = hasDuplicates(allTsCodes);
      if (thereAreDuplicates) reportDuplicates(flattenedProductConfig, "tsCode");
      thereAreDuplicates.should.eql(false);
    });
  });

  describe("check for duplicate titles", () => {
    it("should not find any duplicate titles", () => {
      const allTitles = flattenedProductConfig.filter((pm) => pm.title).map((pm) => pm.title);
      const thereAreDuplicates = hasDuplicates(allTitles);
      if (thereAreDuplicates) reportDuplicates(flattenedProductConfig, "title");
      thereAreDuplicates.should.eql(false);
    });
  });

  describe("check for duplicate short names", () => {
    it("should not find any duplicate short names", () => {
      const allShortNames = flattenedProductConfig.filter((pm) => pm.shortName).map((pm) => pm.shortName);
      const thereAreDuplicates = hasDuplicates(allShortNames);
      if (thereAreDuplicates) reportDuplicates(flattenedProductConfig, "shortName");
      thereAreDuplicates.should.eql(false);
    });
  });

  describe("check for duplicate subdirectories", () => {
    it("should not find any duplicate subdirectories", () => {
      const allSubDirectories = flattenedProductConfig.filter((pm) => pm.subDirectory).map((pm) => pm.subDirectory);
      const thereAreDuplicates = hasDuplicates(allSubDirectories);
      if (thereAreDuplicates) reportDuplicates(flattenedProductConfig, "subDirectory");
      thereAreDuplicates.should.eql(false);
    });
  });
});

function hasDuplicates(arr) {
  return new Set(arr).size !== arr.length;
}

function reportDuplicates(arr, property) {
  const propertyMap = {};
  arr
    .filter((o) => o[property])
    .map((o) => {
      const thisProperty = o[property];
      if (!propertyMap[thisProperty]) propertyMap[thisProperty] = [];
      propertyMap[thisProperty].push(o.title || o.shortName || o.productName);
    });
  const foundMultiples = [];
  Object.keys(propertyMap).forEach((p) => {
    if (propertyMap[p].length > 1) {
      const multiple = {};
      multiple[p] = propertyMap[p];
      foundMultiples.push(multiple);
    }
  });
  if (foundMultiples.length) console.log(foundMultiples); // eslint-disable-line no-console
}
