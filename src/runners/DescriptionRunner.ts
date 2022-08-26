import LoggerIface from "common/LoggerIface";
import RunnerIface from "common/RunnerIface";

export class DescriptionRunner implements RunnerIface {
  constructor(private runner: RunnerIface, private description: string) {}

  run(logger: LoggerIface): Promise<void> {
    return this.runner.run(logger);
  }

  describe(): string {
    return this.description;
  }
}
