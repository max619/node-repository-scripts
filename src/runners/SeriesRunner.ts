import LoggerIface from "../common/LoggerIface";
import RunnerIface from "../common/RunnerIface";

export class SeriesRunner implements RunnerIface {
  constructor(private runners: RunnerIface[]) {}

  async run(logger: LoggerIface): Promise<void> {
    for (const runner of this.runners) {
      await runner.run(logger);
    }
  }
}
