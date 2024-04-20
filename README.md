# 自动生成Vue模板插件( Auto Vue Template Generator-- A extension for Visual Code)

## 1. 简介：

本项目为Vscode的一款插件。旨在为使用Vue2或者3的前端开发者提供快速生成可自定义的组件模板的功能。

## 2. 如何使用

### 2.1 简单使用

默认的快捷键为`ctrl`+`shift`+`t`(t表示template)。按下即可根据配置项生成模板。

我们为`vue2`和`vue3`分别预设了一套模板。

按下快捷键时默认生成`vue3`的模板。如下：

```vue
<script setup>
defineOptions({
    name: 'vue3-template'
})
</script>

<template>
    <div></div>
</template>

<style scoped>

</style>

```

如何使用我们为你预设的`vue2`模板呢？

按下`ctrl`+`shift`+`p`。你就会在vscode中看到一个下拉列表选项。如图1所示。

![image-20240420172505153](D:\Typora_img\image-20240420172505153.png)

**图1. 切换预设的vue模板。**

之后，你再使用快捷键就会生成`vue2`的模板。如下。

```vue
<template>
    <div></div>
</template>

<script>
export default {
    name: 'vue2-Template',
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

<style scoped>

</style>

```

### 2.2 自动生成模板

当你创建一个`vue`文件时，我们的插件可以自动生成模板(根据你的配置项)。如果你不想在创建文件后自动生成模板，可以在配置项中进行配置将其关闭。

**配置项：**

```json
{
	"autoVueTemplate.auto": true // 设置为false即可关闭
}
```

### 2.3 自定义模板

本插件允许你自定义多套模板，你可以根据不同的开发场景选择合适的模板。

那么如何自定义模板呢？可以通过配置`autoVueTemplate.allTemplates`来实现。

这是默认的`autoVueTemplate.allTemplates`选项。我以注释的形式详细解释了每个参数的意义。

```json
"autoVueTemplate.allTemplates":[ 
    {
      "name": "默认vue3模板", // 名称，显示在下拉菜单中
      "key": "defaultVue3", // key值，控制选择哪一套模板作为生成的模板
      "extend": "",
      "vueVersion": "3", // 生成vue2还是vue3
      "script": { // 控制生成的script标签中的属性
        "lang": "", // 是否加上lang属性，例如：将lang设置为ts，则生成的script标签为<script lang="ts"></script>
        "setup": true // 是否加上setup属性，例如：将setup设置为true，则生成的script标签为<script setup></script>,仅对生成vue3代码有效
      },
      "style": { // 控制生成的style标签中的属性
        "lang": "", // 是否加上lang属性，例如：将lang设置为scss，则生成的script标签为<style lang="scss"></script>
        "scoped": true // 是否加上scoped属性，例如：将scoped设置为true，则生成的script标签为<style scoped></script>
      },
      "componentName": { // 组件名字选项
        "isExist": true, // 是否为组件取一个名字，根据你的文件名生成        
         "isHump": false // 是否采用驼峰命名法， 如果为false，则生成的组件名会以 - 连接。将你已驼峰命名法命名的文件自动转换为以-相连。例如：你的文件名为testTemplate, 则生成的组件名为，test-template
      },
      "sequence": ["script", "template", "style"] // 生成的标签顺序
    },
    {
      "name": "默认vue2模板",
      "key": "defaultVue2",
      "extend": "",
      "vueVersion": "2",
      "script": {
        "lang": ""
      },
      "style": {
        "lang": "",
        "scoped": true
      },
      "componentName": {
        "isExist": true,
        "isHump": false
      },
      "sequence": ["template", "script", "style"]
    }
]
```

如果要自定义自己的模板，很简单。你只需要在`autoVueTemplate.allTemplates`中进行追加即可。例如我在项目中使用了`ts`和`less`，那么我可以在配置项中追加一个元素。

```json
  "autoVueTemplate.allTemplates": [
  	// ...
    {
      "name": "ts+less",
      "key": "zidingyi",
      "extend": "",
      "vueVersion": "3",
      "script": {
        "lang": "ts",
        "setup": true
      },
      "style": {
        "lang": "less",
        "scoped": true
      },
      "componentName": {
        "isExist": true,
        "isHump": true
      },
      "sequence": [
        "script",
        "template",
        "style"
      ]
    }
  ],
```

这样你就可以按下`ctrl`+`shift`+`p`,在下拉列表中看到自定义的模板了。如图2所示。

![image-20240420180017051](D:\Typora_img\image-20240420180017051.png) 

**图2. 添加的自定义模板**

### 2.4 模板继承

觉得写自定义配置项很麻烦？我提供了一个模板继承的功能来简化操作。

## 3. 配置项

### 3.1 通用配置项

```json
{
	"autoVueTemplate.auto": true, // 是否在创建文件后自动生成模板
	"autoVueTemplate.option": "default", // 当前选择的是哪一套模板，默认为default
    "autoVueTemplate.allTemplates": [ // 自定义的所有模板描述
        {
          "name": "default template", // 本插件提供的默认模板描述，显示在选择的下拉菜单中
          "option": "default" // 模板选项，当autoVueTemplate.option与该值相同时，选择该模板
        },
        {
          "name":"my template", // 自定义的默认模板
          "option":"my"
        }
      ],
}
```

## 配置可选项

| 参数                 | 描述                                                         | 可选项                     | 默认值                          |
| -------------------- | ------------------------------------------------------------ | -------------------------- | ------------------------------- |
| vueVersion           | 控制生成的是vue2还是vue3的代码                               | 2 \| 3                     | 3                               |
| script.lang          | 控制生成的script标签中的编程语言选项                         | ''\|'js'\|'ts'             | ''                              |
| script.setup         | 只有vueVersion为3时才有效，为script标签带上setup选项         | true \| false              | true                            |
| style.name           | 控制生成的style标签中的css预处理器                           | ''\|'scss'\|'sass'\|'less' | ''                              |
| style.scoped         | 控制生成的style标签中是否携带scoped选项                      | true \| false              | false                           |
| componentName.isOpen | 控制生成的组件模板是否在选项里根据你的文件名生成name         | true \| false              | false                           |
| componentName.isHump | 生成的组件名称是否以驼峰命名，如果为false，则生成的组件名会以 - 连接。将你已驼峰命名法命名的组件名自动转换为以-相连 | true \| false              | false                           |
| auto                 | 当你创建文件后，是否根据你的配置自动生成组件模板             | true \| false              | true                            |
| sequence             | 控制创建的`script`,`template`,`style`标签的顺序。你可以传入一个数组来控制他们的创建顺序。例如：['script', 'template', 'style']表示依次创建`script`,`template`,`style`这三个标签。 | -                          | ['script', 'template', 'style'] |
| option               | 我们允许您配置多套模板，option用于控制您默认选择哪一套模板。 | -                          | “default”                       |
| allTemplates         | 该选项为一个数组，您需要将配置的模板以数组元素的形式填入到这一选项中。数组元素的格式为：{`name`: string, `option`: string, `extend`: string}。name是自定义模板的名称，在您按下`ctrl`+`shift`+`p`时可以看到这些名称，并进行选择。option是你自定义模板的选项，可以认为是自定义模板的索引。extend表示该模板继承自哪一套模板，如果本模板中的配置项不全，则我们会根据其继承的模板补齐配置项。如果不填写或者取值为空字符串，则不发生继承。允许继承链的存在。 | -                          | “”                              |

