// import * as vscode from "vscode";
import { Params } from "../types/index";

function generateVue2(params: Params): string {
  const vue2Template = `<template>
	<div></div>
</template>

<script${params.script.lang?` lang="${params.script.lang}"`:''}${params.script.setup?` setup`:''}>
export default {
	name: '${params.name}',
    props: {

    },
    data() {
        return {

        }
    },
    computed: {

    },
    created() {

    },
    mounted() {

    },
    methods: {

    },
}

</script>

<style${params.style.lang ? ` lang="${params.style.lang}"` : ""}${params.style.scoped ? " scoped" : ""}>

</style>
`;
  return vue2Template;
}

function generateVue3(params: Params): string {
  const vue3Template = `<script${params.script.lang?` lang="${params.script.lang}"`:''}${params.script.setup?` setup`:''}>
defineOptions({
    name: '${params.name}'
})

</script>

<template>
    <div></div>
</template>

<style${params.style.lang ? ` lang="${params.style.lang}"` : ""}${params.style.scoped ? " scoped" : ""}>

</style>
`;
  return vue3Template;
}
function generateTemplate(params: Params): string {
  if (params.vueVersion === "2") {
    return generateVue2(params);
  } else {
    return generateVue3(params);
  }
}

export { generateTemplate };
