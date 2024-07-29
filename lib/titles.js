import assert from "assert";

import productConfig from "../config/product-mapping.js";

const postalDeliveryAllowedTitles = [ "dn", "paf", "plg" ];

function postalDeliveryAllowed(title) {
  return postalDeliveryAllowedTitles.includes(title);
}

const validNamespaces = [];
const productMapping = [];
Object.keys(productConfig).forEach((namespace) => {
  if (!validNamespaces.includes(namespace)) validNamespaces.push(namespace);
  productConfig[namespace].forEach((product) => {
    const { modexProducts, ...thisProduct } = product;
    if (modexProducts && modexProducts.length) {
      modexProducts.forEach((modexProduct) => {
        productMapping.push({
          namespace,
          productName: modexProduct.productName,
          productCode: modexProduct.productCode,
          ...thisProduct,
        });
      });
    } else {
      productMapping.push({ namespace, ...thisProduct });
    }
  });
});

const alternativeTitleConfig = productMapping
  .filter((p) => p.alternativeTitles)
  .flatMap((p) =>
    p.alternativeTitles.map((t) => {
      return { ...p, title: t };
    })
  );
const realTitlesConfig = productMapping.filter((p) => p.title);
const allTitlesConfig = [ ...realTitlesConfig, ...alternativeTitleConfig ];

function getAllPrintTitles() {
  return realTitlesConfig.filter((p) => p.tsCode).map((p) => p.title);
}

function getPrintTitlesByNamespace(namespace) {
  return realTitlesConfig.filter((p) => p.tsCode && p.namespace === namespace).map((p) => p.title);
}

function getAllTitles() {
  return realTitlesConfig.map((p) => p.title);
}

function getSenderId(namespace, title) {
  const product = getTitleConfig(title);
  assert(product?.complaintSenderId, "No senderId for report complaint was found. Update product-mapping config");
  assert(
    product.namespace === namespace,
    `title ${title} not valid for namespace ${namespace}. Check product-mapping config`
  );

  return product?.complaintSenderId;
}

function getTitlesByNamespace(namespace) {
  return realTitlesConfig.filter((p) => p.namespace === namespace).map((p) => p.title);
}

function getTitleConfig(title) {
  return productMapping.find((p) => p.title === title || (p.alternativeTitles && p.alternativeTitles.includes(title)));
}

function getTsCode(title) {
  assert(title, "No title was provided");
  const product = getTitleConfig(title);

  return product?.tsCode;
}

function getDeliveryDays(namespace, title) {
  const product = getTitleConfig(title);
  assert(product?.deliveryDays, `No delivery days for title ${title} was found. Update product-mapping config`);
  assert(
    product.namespace === namespace,
    `title ${title} not valid for namespace ${namespace}. Check product-mapping config`
  );
  return product?.deliveryDays;
}

const days = [ "friday", "thursday", "wednesday", "tuesday", "monday" ];

function deliveryDaysToNumberOfJobs(deliveryDays) {
  let counter = 1;
  return days.reduce(
    (week, day, i) => {
      if (day === "friday") {
        week[day] = 3;
      } else {
        if (deliveryDays.includes(days[i - 1])) {
          week[day] = counter;
          counter = 1;
        } else {
          if (day === "monday") {
            week[day] = counter;
          } else {
            counter++;
          }
        }
      }
      return week;
    },
    {
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0,
    }
  );
}

function numberOfJobsToJobOffsets(numberOfJobs) {
  let counter = 1;
  return days.reduce(
    (week, day, i) => {
      for (let j = i; j < days.length; j++) {
        if (days[j + 1]) {
          if (numberOfJobs[days[j + 1]] > 0) {
            week[day] = counter;
            counter = 1;
            break;
          } else {
            if (days[j + 1] === "monday") {
              week[day] = counter + j;
              counter = 1;
              break;
            }
            counter++;
          }
        }
      }
      return week;
    },
    {
      monday: 3,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 1,
      sunday: 2,
    }
  );
}

function getNamespaceByTitle(title) {
  const product = getTitleConfig(title);
  assert(product, `title ${title} not found in product-mapping. Check product-mapping config`);
  return product.namespace;
}

export {
  alternativeTitleConfig,
  allTitlesConfig,
  deliveryDaysToNumberOfJobs,
  getAllPrintTitles,
  getAllTitles,
  getDeliveryDays,
  getNamespaceByTitle,
  getPrintTitlesByNamespace,
  getSenderId,
  getTitlesByNamespace,
  getTitleConfig,
  getTsCode,
  numberOfJobsToJobOffsets,
  postalDeliveryAllowed,
  productConfig,
  productMapping,
  realTitlesConfig,
  validNamespaces,
};
