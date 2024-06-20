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
  return productMapping.filter((pm) => pm.title).map((pm) => pm.title);
}

function getPrintTitlesByNamespace(namespace) {
  return productConfig[namespace].map((pm) => pm.title).filter((t) => t);
}

export {
  postalDeliveryAllowed,
  getAllPrintTitles,
  getPrintTitlesByNamespace,
  productMapping,
  productConfig,
};
