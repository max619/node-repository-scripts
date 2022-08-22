import LoggerIface from "./LoggerIface";
import RunnerIface from "./RunnerIface";

export type FunctionScriptSource =
  | ((logger: LoggerIface) => void)
  | ((logger: LoggerIface) => Promise<void>);

export type ScriptsSource = string | RunnerIface | FunctionScriptSource;

export type ScriptsSources = ScriptsSource | ScriptsSource[];

export type TreeNode<T> = {
  [key: string]: TreeNode<T> | T | undefined;
};

export type ScriptsTree = TreeNode<ScriptsSources>;

const delimiter = ".";
const defaultKey = "default";

function isScriptsSource(
  value: TreeNode<ScriptsSources> | ScriptsSources
): value is ScriptsSources {
  if (Array.isArray(value)) {
    return true;
  }

  if (typeof value === "string") {
    return true;
  }

  if (typeof value === "function") {
    return true;
  }

  if ("run" in value && typeof value.run === "function") {
    return true;
  }

  return false;
}

export function findScripts(
  path: string,
  tree: ScriptsTree
): ScriptsSources | undefined {
  let subpath = path;
  const delimiterIndex = subpath.indexOf(delimiter);
  if (delimiterIndex !== -1) {
    subpath = path.slice(0, delimiterIndex);
    path = path.slice(delimiterIndex);
  } else {
    path = "";
  }

  const node = tree[subpath];
  if (!node) {
    return undefined;
  }

  if (isScriptsSource(node)) {
    if (path.length === 0) {
      return node;
    }
    return undefined;
  }

  if (path.length === 0) {
    return findScripts(defaultKey, node);
  }

  return findScripts(path, node);
}
