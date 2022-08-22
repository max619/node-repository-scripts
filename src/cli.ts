import { exit } from "process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { ScriptsTree } from "./common/ScriptTree";
import { run } from "./index";
import ConsoleLogger from "./logging/ConsoleLogger";

const args = yargs(hideBin(process.argv))
  .option("script", { type: "string", array: true, requiresArg: true })
  .parseSync();

const logger = new ConsoleLogger();

async function runCli() {
  const restArgs = args._.map((v) => String(v));
  if (restArgs.length === 0) {
    restArgs.push("");
  }

  const sourceFiles = args.script?.map((v) => String(v)) ?? [];
  if (sourceFiles.length === 0) {
    logger.error("No scripts provided. use --script argument");
  }

  const trees: ScriptsTree[] = [];

  for (const file of sourceFiles) {
    trees.push(await require(file).default);
  }

  for (const scriptName of restArgs) {
    await run(scriptName, trees, logger);
  }
}

runCli().then(
  () => exit(0),
  (err) => {
    logger.error(err);
    exit(-1);
  }
);
