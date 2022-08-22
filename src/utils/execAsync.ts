import { spawn, SpawnOptionsWithoutStdio } from "child_process";
import LoggerIface from "../common/LoggerIface";

const defaultOptions: SpawnOptionsWithoutStdio = {
  stdio: "pipe",
  shell: false,
};

export type ExecOptions = Omit<
  Omit<SpawnOptionsWithoutStdio, "stdio">,
  "shell"
>;

export function execAsync(
  command: string,
  logger: LoggerIface,
  options?: ExecOptions
): Promise<number> {
  return new Promise((reject, resolve) => {
    try {
      const process = spawn(command, { ...defaultOptions, ...(options ?? {}) });

      process.stderr.on("data", (data) => logger.error(data));
      process.stdout.on("data", (data) => logger.log(data));

      process.on("close", (code) => resolve(code));
    } catch (e) {
      reject(e);
    }
  });
}
