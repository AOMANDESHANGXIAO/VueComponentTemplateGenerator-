# Vue Component Template Generator
简介：本项目为Vscode的一款插件。旨在为使用Vue的前端开发者提供快速生成可自定义的组件模板的功能。对于Vue2和Vue3都适用。

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
| auto                 | 当你创建文件后，是否根据你的配置自动生成组件模板             | true \| false              | false                           |
| sequence             | 控制创建的`script`,`template`,`style`标签的顺序。你可以传入一个数组来控制他们的创建顺序。例如：['script', 'template', 'style']表示依次创建`script`,`template`,`style`这三个标签。 |                            | ['script', 'template', 'style'] |

