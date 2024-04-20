import path from "path";
import * as vscode from "vscode";
import { ComponentName } from "../types";

function getCurrentFileName(componentName: ComponentName, newFileName: string) {
  // 1. 如果没有传入新的文件名，就获取当前打开的文件名

  let fileName: string;
  if (!newFileName) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showWarningMessage("No active text editor found.");
      return "null";
    }
    const document = editor.document;

    //   获取文件名
    const baseName = path.basename(document.fileName);

    //   去除文件扩展名
    fileName = path.parse(baseName).name;
  } else {
    fileName = path.parse(path.basename(newFileName)).name;
  }
  let kebabCaseName: string;
  if (!componentName.isHump) {
    //   将驼峰式命名转换为减号连接形式
    kebabCaseName = fileName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  } else {
    kebabCaseName = fileName;
  }
  return kebabCaseName;
}

export { getCurrentFileName };
