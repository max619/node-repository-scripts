import LoggerIface from "./common/LoggerIface";
import { findScripts, ScriptsTree } from "./common/ScriptTree";
import { obtainRunnerFromSource } from "./runners/obtainRunnerFromSource";

export async function run(
  path: string,
  trees: ScriptsTree[],
  logger: LoggerIface
): Promise<void> {
  logger.log(`Launching ${path}`);

  for (const tree of trees) {
    const script = findScripts(path, tree);
    if (script) {
      const runner = obtainRunnerFromSource(script);
      await runner.run(logger);
      return;
    }
  }

  logger.error(`Script '${path}' is not found`);
}
