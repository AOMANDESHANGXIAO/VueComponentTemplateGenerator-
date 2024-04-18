interface Params {
  vueVersion: string; // 使用的vue.js版本是什么
  name: string; // 根据文件名填写组件的名称
  script: Script;
  style: Style;
  componentName: ComponentName
}
interface Script {
  lang: string;
  setup: boolean;
}
interface Style {
  lang: string;
  scoped: boolean;
}
interface ComponentName {
  isExist: boolean;
  isHump: boolean;
}
export { Params, Script, Style, ComponentName };
