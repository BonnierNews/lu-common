/* eslint-disable import/namespace */
import * as titles from "../../lib/titles.js";

const allFunctions = Object.keys(titles)
  .filter((f) => typeof titles[f] === "function")
  .map((f) => {
    return { name: f, params: getParams(titles[f]) };
  });
const titleFunctions = allFunctions.filter((f) => f.params.includes("title"));

describe("check that alternative titles work everywhere that title does", () => {
  titleFunctions.forEach((f) => {
    it(`should return the same result for function ${f.name} with title and alternative title`, () => {
      const params = mapParams(f.params, "bnlo", "ht");
      const alternativeParams = mapParams(f.params, "bnlo", "hudiksvalsstidning");

      const result = titles[f.name](...params);
      const resultAlternative = titles[f.name](...alternativeParams);

      result.should.eql(resultAlternative);
    });
  });
});

function mapParams(params, namespace, title) {
  return params.map((p) => {
    if (p === "title") return title;
    if (p === "namespace") return namespace;
    throw new Error(`Test can't currently handle parameter ${p}, fix it!`);
  });
}

function getParams(func) {
  // courtesy of Geeks for Geeks
  // https://www.geeksforgeeks.org/how-to-get-the-javascript-function-parameter-names-values-dynamically/#:~:text=Approach%3A%20JavaScript%20contains%20a%20method,equivalent%20using%20toString()%20method.

  // String representation of the function code
  let str = func.toString();

  // Remove comments of the form /* ... */
  // Removing comments of the form //
  // Remove body of the function { ... }
  // removing '=>' if func is arrow function
  str = str
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/(.)*/g, "")
    .replace(/{[\s\S]*}/, "")
    .replace(/=>/g, "")
    .trim();

  // Start parameter names after first '('
  const start = str.indexOf("(") + 1;

  // End parameter names is just before last ')'
  const end = str.length - 1;

  const result = str.substring(start, end).split(", ");

  const params = [];

  result.forEach((element) => {
    // Removing any default value
    element = element.replace(/=[\s\S]*/g, "").trim();

    if (element.length > 0) {
      params.push(element);
    }
  });

  return params;
}
