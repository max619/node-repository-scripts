import ShellRunner from "./runners/ShellRunner";
import RunnerIface from "./common/RunnerIface";
import { ScriptsSource } from "./common/ScriptTree";
import { ConcurrentRunner } from "./runners/ConcurrentRunner";
import { DescriptionRunner } from "./runners/DescriptionRunner";
import { obtainRunnerFromSource } from "./runners/obtainRunnerFromSource";

export function describe(
  description: string,
  ...scripts: ScriptsSource[]
): RunnerIface {
  return new DescriptionRunner(obtainRunnerFromSource(scripts), description);
}

export function concurrent(...scripts: ScriptsSource[]): RunnerIface {
  return new ConcurrentRunner(
    scripts.map((script) => obtainRunnerFromSource(script))
  );
}

export function execAt(command: string, cwd: string): RunnerIface {
  return new ShellRunner(command, { cwd });
}
