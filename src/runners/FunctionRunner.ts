import LoggerIface from "../common/LoggerIface";
import RunnerIface from "../common/RunnerIface";
import { FunctionScriptSource } from "../common/ScriptTree";

export default class FunctionRunner implements RunnerIface {
  constructor(private func: FunctionScriptSource) {}

  async run(logger: LoggerIface): Promise<void> {
    await this.func(logger);
  }
}
