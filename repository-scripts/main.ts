import { readFileSync } from "fs";
import { describe } from "../src/index";
import { createNpmPackage } from "../src/tools/createNpmPackage";
import { rmdirIfExists, copy } from "../src/tools/shell";

const distPath = "./dist";
const build = describe("Build typescript", "tsc -P ./tsconfig.json");
const clear = rmdirIfExists(distPath);

const packageJson = JSON.parse(readFileSync("./package.json", "utf-8"));

delete packageJson.scripts;
delete packageJson.devDependencies;

packageJson.bin = { nrs: "./cli.js" };

export default {
  build,
  package: [
    clear,
    build,
    copy("./LICENSE", "./dist/LICENSE"),
    createNpmPackage(distPath, packageJson),
  ],
  clear,
};
