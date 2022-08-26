import LoggerIface from "common/LoggerIface";
import { joinDescribesOfRunners } from "../utils/joinDescribes";
import RunnerIface from "../common/RunnerIface";

export class ConcurrentRunner implements RunnerIface {
  constructor(private runners: RunnerIface[]) {}

  async run(logger: LoggerIface): Promise<void> {
    // Todo: create separate loggers for each runner
    await Promise.all(this.runners.map((runner) => runner.run(logger)));
  }

  describe(): string {
    return `Concurrently runs ${joinDescribesOfRunners(this.runners)}`;
  }
}
