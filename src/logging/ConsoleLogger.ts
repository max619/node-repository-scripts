import LoggerIface from "../common/LoggerIface";

function logEvery(logFunction: (v: any) => void, ...values: any[]) {
  values.forEach((v) => logFunction(v));
}

export default class ConsoleLogger implements LoggerIface {
  log(...values: any[]): void {
    logEvery(console.log, ...values);
  }
  warn(...values: any[]): void {
    logEvery(console.warn, ...values);
  }
  error(...values: any[]): void {
    logEvery(console.error, ...values);
  }
}
