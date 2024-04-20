# 自动Vue模板生成器( Auto Vue Template Generator-- A extension for Visual Code)

## 1. 简介：

本项目为Vscode的一款插件。旨在为使用Vue2或者3的前端开发者提供快速生成可自定义的组件模板的功能。

## 2. 如何使用

### 2.1 简单使用

默认的快捷键为`ctrl`+`shift`+`t`(t表示template)。按下即可根据配置项生成模板。

默认生成的模板如下，如你所见这是一个常用的的三段式`Vue3`的模板。如果这个模板不满足你的要求，你也可以自定义模板。如何自定义模板，将在后文详细阐述。

```vue
<template>
    <div></div>
</template>

<script lang="ts" setup>
defineOptions({
    name: 'test-template'
})
</script>

<style lang="scss" scoped>

</style>

```

### 2.2 自动使用

我们的插件提供了自动生成模板的功能，当你创建一个`vue`文件之后，会根据你的配置项生成模板。如果你不想在创建文件后自动生成模板，可以在配置项中进行配置将其关闭。

### 2.3 从多套自定义模板中选择

本插件允许你自定义多套模板，你可以根据不同的开发场景选择合适的模板。如何自定义多套模板将在后文详细阐述。

如果你定义了多套模板，则可以按下快捷键`ctrl`+`shift`+`p`（p表示pick）从多个模板中进行选择。如图1所示，你可以在vscode中看到一个自定义模板的下拉列表。选择即可生成。通过这种方式选择的模板将被设定为默认的模板选项，在你按下`ctrl`+`shift`+`t`或者自动生成模板时会生成你通过下拉菜单选择的那一套模板。

![image-20240420145322926](D:\Typora_img\image-20240420145322926.png)

**图1. 通过下拉菜单选择自定义的模板**

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

