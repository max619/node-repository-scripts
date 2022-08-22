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
};
