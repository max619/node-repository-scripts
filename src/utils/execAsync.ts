import { spawn, SpawnOptionsWithoutStdio } from "child_process";
import LoggerIface from "../common/LoggerIface";

const defaultOptions: SpawnOptionsWithoutStdio = {
  stdio: "pipe",
  shell: true,
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
  return new Promise((resolve, reject) => {
    try {
      const process = spawn(command, { ...defaultOptions, ...(options ?? {}) });

      process.stderr.on("data", (data) => logger.error(String(data)));
      process.stdout.on("data", (data) => logger.log(String(data)));

      process.on("close", (code) => resolve(code ?? -1));
    } catch (e) {
      reject(e);
    }
  });
}
