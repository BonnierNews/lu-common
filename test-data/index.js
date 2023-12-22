import { readFileSync } from "fs";

async function getFile(filepath, fileType = "js") {
  if (fileType === "json") {
    // FIXME: once eslint supports import with assert, we can do this instead
    // const jsonFile = await import(`./${filename}.json`) assert { type: "json" };
    // return jsonFile.default;
    const fileUrl = new URL(`./${filepath}.json`, import.meta.url);
    const jsonFile = JSON.parse(readFileSync(fileUrl));
    return jsonFile;
  }
  return await import(`./${filepath}.js`);
}

export default getFile;
