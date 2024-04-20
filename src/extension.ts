import * as vscode from "vscode";
import { getCurrentFileName } from "./utils/tool";
import { generateTemplate } from "./utils/index";
import { Params, allTemplates, TemplateConfig } from "./types/index";

let auto: boolean;

let allTemplates: allTemplates; // 数组中存放的所有模板
// let allOptions: Array<string>; // 显示给用户看的所有模板名称，便于选择
let templateConfig: TemplateConfig;

function getTemplate(newFileName: string = "") {
  const params: Params = {
    ...templateConfig,
    name: getCurrentFileName(templateConfig.componentName, newFileName),
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

// 模板继承
function extendTemplate(allTemplates: any) {
  // 解决继承问题
  let parentTemplate: allTemplates;

  // 继承链进行继承
  let pointer = templateConfig;
  while (pointer.extend) {
    parentTemplate = allTemplates.find((item) => item.key === pointer.extend);
    pointer = parentTemplate;
    vscode.window.showInformationMessage("1" + parentTemplate.name);
    if (parentTemplate) {
      templateConfig = { ...parentTemplate, ...templateConfig };
    }
  }
}

function updateConfig(selectOption: any = null) {
  const config = vscode.workspace.getConfiguration("autoVueTemplate");
  let allTemplates = config.get("allTemplates") as allTemplates;
  if (selectOption) {
    // vscode.window.showInformationMessage(">>>选择模板成功<<<")
    templateConfig = selectOption;
    extendTemplate(allTemplates);
    // 把设置中的选项也更新
    const config = vscode.workspace.getConfiguration("autoVueTemplate");
    config.update("option", selectOption.key, true);
    return;
  }
  let option = config.get("option") as string;
  auto = config.get("auto") as boolean;
  // 根据key来查找allTemplates中对应的模板配置
  let flag = false;
  for (let i = 0; i < allTemplates.length; i++) {
    if (allTemplates[i].key === option) {
      templateConfig = allTemplates[i];
      flag = true;
      break;
    }
  }
  if (!flag) {
    // 也就是说用户错误输入了模板名称
    vscode.window.showErrorMessage(`模板${option}不存在`);
    return;
  }
  if (!templateConfig.extend) {
    return;
  }
  //  继承
  extendTemplate(allTemplates);
}

function listenCreateFiles() {
  // vscode.window.showInformationMessage("监听文件创建事件");
  vscode.workspace.onDidCreateFiles((event: vscode.FileCreateEvent) => {
    // vscode.window.showInformationMessage("created a file!");
    if (auto) {
      for (const file of event.files) {
        const fileName = file.fsPath.split("/").pop();
        const fileExtension = fileName?.split(".").pop();
        if (fileExtension === "vue") {
          // vscode.window.showInformationMessage("created a Vue file!");
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
  let disposable = vscode.commands.registerCommand(
    "autovuetemplate.quickSelector",
    () => {
      const config = vscode.workspace.getConfiguration("autoVueTemplate");
      let allTemplates = config.get("allTemplates") as allTemplates;
      const names = allTemplates.map((template) => {
        return template.name + ` [key=${template.key}]`;
      });
      vscode.window.showQuickPick(names).then((selectName) => {
        let option: TemplateConfig | undefined = allTemplates.find(
          (template) => template.name + ` [key=${template.key}]` === selectName
        );
        if (!option) {
          // vscode.window.showErrorMessage(`模板${selectName}不存在`);
          return;
        }
        updateConfig(option);
        vt();
      });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
