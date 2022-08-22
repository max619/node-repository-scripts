import LoggerIface from "./LoggerIface";

export default interface RunnerIface {
  run(logger: LoggerIface): Promise<void>;
}
