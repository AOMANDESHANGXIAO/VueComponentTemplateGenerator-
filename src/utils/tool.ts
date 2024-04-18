import path from "path";
import * as vscode from "vscode";
function getCurrentFileName() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage("No active text editor found.");
    return "null";
  }
  const document = editor.document;

  //   获取文件名
  const baseName = path.basename(document.fileName);

  //   去除文件扩展名
  const fileName = path.parse(baseName).name;

  //   将驼峰式命名转换为减号连接形式
  const kebabCaseName = fileName
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

  return kebabCaseName;
}

export { getCurrentFileName };
