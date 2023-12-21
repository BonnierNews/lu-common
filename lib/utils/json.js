import fs from "fs";

function importJson(path) {
  const root = process.cwd();

  return JSON.parse(fs.readFileSync(`${root}/${path}`).toString());
}

export { importJson };
