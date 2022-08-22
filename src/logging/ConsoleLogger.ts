import LoggerIface from "../common/LoggerIface";

export default class ConsoleLogger implements LoggerIface {
  log(...values: any[]): void {
    console.log(values);
  }
  warn(...values: any[]): void {
    console.warn(values);
  }
  error(...values: any[]): void {
    console.error(values);
  }
}
