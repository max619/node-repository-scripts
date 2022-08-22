import LoggerIface from "./common/LoggerIface";
import { findScripts, ScriptsTree } from "./common/ScriptTree";
import { obtainRunnerFromSource } from "./runners/obtainRunnerFromSource";

export async function run(
  path: string,
  tree: ScriptsTree,
  logger: LoggerIface
): Promise<void> {
  const script = findScripts(path, tree);
  if (!script) {
    logger.error(`Script '${path}' is not found`);
    return;
  }

  const runner = obtainRunnerFromSource(script);
  await runner.run(logger);
}
