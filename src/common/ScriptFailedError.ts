export abstract class ScriptFailedError extends Error {
  abstract explain(): string;
}

export class ShellScriptFailedError extends ScriptFailedError {
  constructor(private errorCode: number, private command: string) {
    super();
  }

  explain(): string {
    return `Command '${this.command}' exited with error code ${this.errorCode}`;
  }
}
