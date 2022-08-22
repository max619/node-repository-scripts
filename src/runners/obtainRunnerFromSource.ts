import RunnerIface from "../common/RunnerIface";
import { ScriptsSource } from "../common/ScriptTree";
import FunctionRunner from "./FunctionRunner";
import { SeriesRunner } from "./SeriesRunner";
import ShellRunner from "./ShellRunner";

export function obtainRunnerFromSource(
  source: ScriptsSource | ScriptsSource[]
): RunnerIface {
  if (Array.isArray(source)) {
    return new SeriesRunner(source.map((s) => obtainRunnerFromSource(s)));
  }

  if (typeof source === "string") {
    return new ShellRunner(source);
  }

  if (typeof source === "function") {
    return new FunctionRunner(source);
  }

  return source;
}
