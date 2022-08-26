import { platform } from "os";

import { describe } from "../index";
import RunnerIface from "../common/RunnerIface";
import { pathExists, copyFile } from "fs-extra";
import { execAsync } from "../utils/execAsync";

export function rmdirIfExists(path: string): RunnerIface {
  const command =
    platform() === "win32" ? `rmdir /S /Q "${path}"` : `rm -rf "${path}"`;

  return describe(`Remove directory '${path}'`, async (logger) => {
    if (await pathExists(path)) {
      await execAsync(command, logger);
    }
  });
}

export function copy(src: string, dst: string): RunnerIface {
  return describe(`Copy directory '${src}' to ${dst}`, () => {
    return copyFile(src, dst);
  });
}
