import { concurrent, describe } from "../src/index";
import LoggerIface from "../src/common/LoggerIface";

function scriptEcho(logger: LoggerIface) {
  logger.log("Function says: Hello world!");
}

export default {
  default: "echo 'Default Hello world!'",
  echo: "echo 'Hello world!'",
  echoSeries: ["echo 'Hello world! 1'", "echo 'Hello world! 2'"],
  scriptEcho,
  mixedEcho: ["echo 'Mixed Hello world!'", scriptEcho],

  nestedEcho: {
    default: 'echo "Default nested echo',
    describedEcho: describe("Prints echo", 'echo "echo with description"'),
    concurrentEcho: concurrent('echo "echo 0"', 'echo "echo 1"'),
    concurrentDescribed: describe(
      "Concurrently runs multiple echos",
      concurrent('echo "echo 0"', 'echo "echo 1"')
    ),
  },
};
