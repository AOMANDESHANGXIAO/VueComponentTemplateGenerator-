// import * as vscode from "vscode";
import { Params } from "../types/index";

function generateVue2(params: Params): string {
  const vue2TemplateLines: string[] = [
    "<template>", // 0
    "	<div></div>", // 1
    "</template>", // 2
    "", // 3
    `<script${params.script.lang ? ` lang="${params.script.lang}"` : ""}>`, //4
    "export default {", //5
    `${params.componentName.isExist ? "    name: '" + params.name + "'," : ""}`, // 6
    "    props: {",
    "",
    "    },",
    "    data() {",
    "        return {",
    "",
    "        }",
    "    },",
    "    computed: {",
    "",
    "    },",
    "    created() {",
    "",
    "    },",
    "    mounted() {",
    "",
    "    },",
    "    methods: {",
    "",
    "    },",
    "}",
    "</script>",
    "",
    `<style${params.style.lang ? ` lang="${params.style.lang}"` : ""}${
      params.style.scoped ? " scoped" : ""
    }>`,
    "",
    "</style>",
  ];
  //   如果第六行为空，则移除之
  if (!params.componentName.isExist) {
    vue2TemplateLines.splice(6, 1);
  }

  return vue2TemplateLines.join("\n");
}

function generateVue3(params: Params): string {
  const name = `defineOptions({\n    name: '${params.name}'\n})`;

  const vue3TemplateLines: string[] = [
    `<script${params.script.lang ? ` lang="${params.script.lang}"` : ""}${
      params.script.setup ? " setup" : ""
    }>`, // 0
    `${params.componentName.isExist ? name : ""}`, // 1
    "</script>",
    '',
    "<template>",
    "    <div></div>",
    "</template>",
    '',
    `<style${params.style.lang ? ` lang="${params.style.lang}"` : ""}${
      params.style.scoped ? " scoped" : ""
    }>`,
    "",
    "</style>",
  ];
  return vue3TemplateLines.join("\n");
}
function generateTemplate(params: Params): string {
  if (params.vueVersion === "2") {
    return generateVue2(params);
  } else {
    return generateVue3(params);
  }
}

export { generateTemplate };
