import * as vscode from "vscode";
import { getCurrentFileName } from "./utils/tool";
import { generateTemplate } from "./utils/index";
import { Params, Script, Style, ComponentName } from "./types/index";

let auto: boolean;
let option: string;

let vueVersion: string;
let script: Script;
let style: Style;
let componentName: ComponentName;

function getTemplate(newFileName: string = "") {
  const params: Params = {
    vueVersion: vueVersion,
    script: script,
    name: getCurrentFileName(componentName, newFileName),
    style: style,
    componentName: componentName,
  };
  return generateTemplate(params);
}

// 注册命令，用户输入v3t时就会生成Vue3的模板
const vt = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showErrorMessage("No active text editor found.");
    return;
  }
  editor.insertSnippet(
    new vscode.SnippetString(getTemplate()),
    editor.selection.active
  );
};

function updateConfig() {
  const config = vscode.workspace.getConfiguration("autoVueTemplate");
  auto = config.get("auto") as boolean;
  option = config.get("option") as string;
  vueVersion = config.get(`${option}.vueVersion`) as string;
  script = config.get(`${option}.script`) as Script;
  style = config.get(`${option}.style`) as Style;
  componentName = config.get(`${option}.componentName`) as ComponentName;
}

async function listenCreateFiles() {
  vscode.window.showInformationMessage("监听文件创建事件");
  vscode.workspace.onDidCreateFiles((event: vscode.FileCreateEvent) => {
    vscode.window.showInformationMessage("created a file!");
    if (auto) {
      for (const file of event.files) {
        const fileName = file.fsPath.split("/").pop();
        const fileExtension = fileName?.split(".").pop();
        if (fileExtension === "vue") {
          vscode.window.showInformationMessage("created a Vue file!");
          vscode.workspace.fs.writeFile(
            vscode.Uri.file(file.fsPath),
            Buffer.from(getTemplate(fileName))
          );
        }
      }
    }
  });
}

export function activate(context: vscode.ExtensionContext) {
  // 初始化配置项
  updateConfig();
  listenCreateFiles();

  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("autoVueTemplate")) {
        updateConfig();
      }
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("autovuetemplate.vt", vt)
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
