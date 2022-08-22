export default interface LoggerIface {
  log(...values: any[]): void;
  warn(...values: any[]): void;
  error(...values: any[]): void;
}
