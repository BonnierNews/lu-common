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

function getAllPrintTitles() {
  return productMapping.filter((pm) => pm.tsCode).map((pm) => pm.title);
}

function getPrintTitlesByNamespace(namespace) {
  return productConfig[namespace]
    .filter((pm) => pm.tsCode)
    .map((pm) => pm.title)
    .filter((t) => t);
}

function getAllTitles() {
  return productMapping.filter((pm) => pm.title).map((pm) => pm.title);
}

function getSenderId(namespace, title) {
  const senderId = productConfig[namespace]?.find((t) => t.title === title)?.complaintSenderId;
  assert(senderId, "No senderId for report complaint was found. Update product-mapping config");

  return senderId;
}

function getTitlesByNamespace(namespace) {
  return productConfig[namespace].map((pm) => pm.title).filter((t) => t);
}

function getTitleConfig(title) {
  const configByRealTitle = productMapping.find((pm) => pm.title === title);
  if (configByRealTitle) return configByRealTitle;
  return productMapping.find((pm) => pm.alternativeTitles?.includes(title));
}

function getTsCode(title) {
  assert(title, "No title was provided");
  const product = productMapping.find(
    (p) => p.title === title || (p.alternativeTitles && p.alternativeTitles.includes(title))
  );

  return product?.tsCode;
}

function getDeliveryDays(namespace, title) {
  const product = productConfig[namespace].find((p) => p.title === title);
  assert(product?.deliveryDays, "No delivery days for title was found. Update product-mapping config");
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
  const namespaceByRealTitle = productMapping.find((pm) => pm.title === title)?.namespace;
  if (namespaceByRealTitle) return namespaceByRealTitle;
  return productMapping.find((pm) => pm.alternativeTitles?.includes(title))?.namespace;
}

export {
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
  validNamespaces,
};
