import LoggerIface from "../common/LoggerIface";
import RunnerIface from "../common/RunnerIface";
import { ShellScriptFailedError } from "../common/ScriptFailedError";
import { execAsync, ExecOptions } from "../utils/execAsync";

export default class ShellRunner implements RunnerIface {
  constructor(private command: string, private options?: ExecOptions) {}

  async run(logger: LoggerIface): Promise<void> {
    const exitCode = await execAsync(this.command, logger, this.options);
    if (exitCode !== 0) {
      throw new ShellScriptFailedError(exitCode, this.command);
    }
  }
}
