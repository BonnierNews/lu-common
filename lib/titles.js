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
  return productConfig[namespace].filter((pm) => pm.tsCode).map((pm) => pm.title).filter((t) => t);
}

function getAllTitles() {
  return productMapping.filter((pm) => pm.title).map((pm) => pm.title);
}

function getTitlesByNamespace(namespace) {
  return productConfig[namespace].map((pm) => pm.title).filter((t) => t);
}

export function getDeliveryDays(namespace, title) {
  const product = productConfig[namespace].find((p) => p.title === title);
  assert(product?.deliveryDays, "No delivery days for title was found. Update product-mapping config");
  return product?.deliveryDays;
}

const days = [ "friday", "thursday", "wednesday", "tuesday", "monday" ];

function deliveryDaysToNumberOfJobs(deliveryDays) {
  let counter = 1;
  return days.reduce((week, day, i) => {
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
  }, {
    sunday: 0,
    saturday: 0,
    friday: 0,
    thursday: 0,
    wednesday: 0,
    tuesday: 0,
    monday: 0,
  });
}

function numberOfJobsToJobOffsets(numberOfJobs) {
  // const days = [ "friday", "thursday", "wednesday", "tuesday", "monday" ];
  let counter = 1;

  return days.reduce((week, day, i) => {

    for (let j = i; j < days.length; j++) {

      // if (day === "monday") break;

      if (numberOfJobs[days[j + 1]] > 0) {

        week[day] = counter;
        counter = 1;
        break;
      } else {
        if (days[j] === "monday") {
          console.log("again");
          // counter += 3;
          // week[day] = counter;
          // break;
        }

        counter++;
      }

      // if (days[j] === "monday" && numberOfJobs[days[j]] === 0) {
      //   console.log("its monday");

      //   counter += 3;
      //   week[day] = counter;
      //   break;

      // }

    }
    return week;
  }, {
    sunday: 2,
    saturday: 1,
    friday: 0,
    thursday: 0,
    wednesday: 0,
    tuesday: 0,
    monday: 3,
  });
}

export {
  deliveryDaysToNumberOfJobs,
  numberOfJobsToJobOffsets,
  postalDeliveryAllowed,
  getAllPrintTitles,
  getPrintTitlesByNamespace,
  getAllTitles,
  getTitlesByNamespace,
  productMapping,
  productConfig,
};
