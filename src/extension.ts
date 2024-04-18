import * as vscode from "vscode";
import { getCurrentFileName } from "./utils/tool";
import { generateTemplate } from "./utils/index";
import { Params, Script, Style } from "./types/index";

let vueVersion: string;
let script: Script;
let style: Style;
function updateConfig() {
  const config = vscode.workspace.getConfiguration("autoVueTemplate");
  vueVersion = config.get("vueVersion") as string;
  script = config.get("script") as Script;
  style = config.get("style") as Style;
}

export function activate(context: vscode.ExtensionContext) {
  // 初始化配置项
  updateConfig();

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("autoVueTemplate")) {
        updateConfig();
      }
    })
  );
  // 注册命令，用户输入v3t时就会生成Vue3的模板
  const v3t = () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("No active text editor found.");
      return;
    }
    // 给定参数
    const params: Params = {
      vueVersion: vueVersion,
      script: script,
      name: getCurrentFileName(),
      style: style,
    };
    editor.insertSnippet(
      new vscode.SnippetString(generateTemplate(params)),
      editor.selection.active
    );
  };
  context.subscriptions.push(
    vscode.commands.registerCommand("autovuetemplate.v3t", v3t)
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
