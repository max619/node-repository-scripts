import RunnerIface from "../common/RunnerIface";

export function joinDescribes(describes: string[]): string {
  return describes.join("; ");
}

export function joinDescribesOfRunners(runners: RunnerIface[]): string {
  return joinDescribes(runners.map((runner) => runner.describe()));
}
