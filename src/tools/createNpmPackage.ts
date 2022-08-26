import RunnerIface from "common/RunnerIface";
import { writeFile } from "fs-extra";
import * as path from "path";
import { describe, execAt } from "../index";

export function createNpmPackage(
  npmPackageDir: string,
  packageFile: Record<string, any>
): RunnerIface {
  const name = packageFile.name ?? npmPackageDir;

  return describe(
    `Create npm package '${name}'`,
    async (logger) => {
      const packageJsonFile = path.join(npmPackageDir, "package.json");
      const json = JSON.stringify(packageFile, undefined, 4);
      logger.log(json);
      await writeFile(packageJsonFile, json);
    },
    execAt("npm pack", npmPackageDir)
  );
}
