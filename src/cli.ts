import { exit } from "process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import * as path from "path";

import LoggerIface from "./common/LoggerIface";
import { obtainRunnerFromSource } from "./runners/obtainRunnerFromSource";
import {
  findScripts,
  iterateOverNodes,
  ScriptsTree,
} from "./common/ScriptTree";
import ConsoleLogger from "./logging/ConsoleLogger";

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
      logger.log(`Running: ${runner.describe()}`);
      await runner.run(logger);
      return;
    }
  }

  logger.error(`Script '${path}' is not found`);
}

const args = yargs(hideBin(process.argv))
  .option("script", { type: "string", requiresArg: true })
  .help(false)
  .parseSync();

const logger = new ConsoleLogger();

function printHelp(tree: ScriptsTree) {
  iterateOverNodes(tree, (name, source) => {
    const runner = obtainRunnerFromSource(source);

    logger.log(`${name}: ${runner.describe()}`);
  });
}

async function runCli() {
  const restArgs = args._.map((v) => String(v));
  if (restArgs.length === 0) {
    restArgs.push("");
  }

  if (!args.script) {
    logger.error("No scripts provided. use --script argument");
    return -1;
  }

  const scriptPath = path.isAbsolute(args.script)
    ? args.script
    : path.join(process.cwd(), args.script);

  const tree: ScriptsTree = (await require(scriptPath)).default;

  if ("help" in args) {
    printHelp(tree);
    return 0;
  }

  for (const scriptName of restArgs) {
    await run(scriptName, [tree], logger);
  }

  return 0;
}

runCli().then(
  (res) => exit(res),
  (err) => {
    logger.error(err);
    exit(-1);
  }
);
