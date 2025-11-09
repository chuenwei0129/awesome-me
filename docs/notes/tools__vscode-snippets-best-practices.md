---
group:
  title: tools
  order: 99
title: Snippets 最佳实践
toc: content
---

## 快速开始

### 如何配置 Snippets

在 `Code > Preferences` 中选择 `User Snippets` 在弹出框里选择对应的代码片段语言。

在打开的 `json` 中有示例代码：

```json
"Print to console": {
    "prefix": "log",
    "body": [
        "console.log('$1');",
        "$2"
    ],
    "description": "Log output to console"
}
```

### 配置项说明

- `Print to console`：代码片段名称。
- `prefix`：插件前缀。
- `body`：插件内容可以是字符串，也可以为数组，若为数组每个元素都做为单独的一行插入。`body` 的内容支持 js 的转义字符，如 `\n\r` 等，我个人不建议用 `\n`，可另起一行给数组多插入一项，不然一行太多的话不容易观察代码块的格式。
- `description`：插件描述。

## 占位符语法

### 基础占位符

`$` 后面紧跟数字可以指定代码片段插入编辑器后的光标位置，光标会按照数字从小到大的顺序依次跳转。

以上面的 `log` 示例为例：

1. 输入 `log` 并按 `TAB` 键后，光标会落在 `console.log()` 的括号中（`$1` 的位置）
2. 再次按 `TAB` 键，光标会跳转到 `console.log()` 语句**之后的下一行**（`$2` 的位置）
3. 你可以继续设置 `$3`、`$4` 等更多占位符

> 需要注意的是：👇

`$0` 用于设置最终光标的位置，它的优先级最高。当代码片段中存在 `$0` 时，无论按多少次 `TAB` 键，最终都会跳转到 `$0` 的位置并停止跳转。在 `$0` 之后设置的占位符（如 `$1`、`$2` 等）将被忽略，因为 `$0` 终止了整个 `TAB` 的光标跳转流程。

### 带默认值的占位符

除了基础占位符，我们还可以为占位符设置默认值。语法格式为 `${序号:默认值}`，用户可以直接输入新内容替换默认值，或按 `TAB` 键保留默认值并跳转到下一个占位符。

**示例：创建 React 函数组件**

```json
"React函数组件": {
  "prefix": "rfc",
  "body": [
    "function ${1:ComponentName}(${2:props}) {",
    "  return (",
    "    <div className=\"${3:container}\">",
    "      ${4:// 组件内容}",
    "    </div>",
    "  )",
    "}",
    "",
    "export default ${1:ComponentName}",
    "$0"
  ],
  "description": "创建 React 函数组件"
}
```

**使用效果说明：**

1. 输入 `rfc` 并按 `TAB`，光标落在 `ComponentName` 位置（`$1`），该文本被选中，可直接输入新组件名
2. 按 `TAB` 跳转到参数位置（`$2`），默认值为 `props`
3. 继续按 `TAB` 跳转到 `className` 位置（`$3`），默认值为 `container`
4. 再按 `TAB` 跳转到组件内容位置（`$4`）
5. 最后按 `TAB` 跳转到文件末尾（`$0`）

**注意：** 相同序号的占位符（如示例中的两个 `${1:ComponentName}`）会同步修改，这在需要多处使用相同值时非常有用。

### 带可选项的占位符

占位符可以设置多个可选项，让用户在预定义的选项中选择。写法为 `${序号|选项1,选项2,选项3|}`。

**示例：方法注释**

```json
"方法注释": {
    "prefix": "zs-Function",
    "body": [
      "/**",
      " * @description description...",
      " * @param { ${1|Boolean,Number,String,Object,Array,*|} } name description...",
      " * @return { ${2|Boolean,Number,String,Object,Array,*|} } description...",
      " */",
      "$0"
    ],
    "description": "添加方法注释"
  }
```

**使用说明：**

上面的代码在输入 `zs + TAB` 后第一个光标会落在 `param name... {}` 的大括号中 (`$1` 的位置)，如下图可以看到设置的可选项。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/b785edf7c7fc4424a17c2e307bd63357_tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.webp)

选择了参数类型之后，再次按 `TAB`，光标会自动落到返回参数类型处 (`$2` 的位置) 并弹出可选项。如下所示：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/06d157ea12cb4f50a81382f1c899a681_tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.webp)

选择了第二个选项之后，再次按 `TAB`，光标自动落到我们配置的 `$0` 处，也就是 `*/` 的下一行：

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/ts/955b0a49efa54691ba0599e934e6813b_tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.webp)

### 嵌套占位符

占位符支持嵌套，即在一个占位符的默认值中包含另一个占位符，语法为 `${1:outer ${2:inner}}`。这个特性允许创建**层级化的、递进式的输入流程**，特别适合处理复杂的代码模板。

#### 执行顺序

当使用 `${1:another ${2:placeholder}}` 时：

1. **首次按 TAB**：光标跳转到 `$1` 的位置，整个 `another placeholder` 被选中

   - 你可以直接输入新内容，完全替换掉默认值
   - 或者按 TAB 继续深入到嵌套的 `$2`

2. **再次按 TAB**：如果没有替换 `$1`，光标会跳转到嵌套的 `$2` 位置

   - 此时只有 `placeholder` 被选中
   - 你可以单独修改这个嵌套的占位符

3. **继续按 TAB**：跳出嵌套结构，继续到后续的占位符

#### 示例 1：TypeScript 接口命名

```json
"TypeScript接口": {
  "prefix": "tsinterface",
  "body": [
    "interface ${1:${2:I}${3:Name}} {",
    "  ${4:property}: ${5:string}",
    "}",
    "$0"
  ],
  "description": "创建 TypeScript 接口"
}
```

**使用流程：**

1. 输入 `tsinterface` + TAB → 整个 `IName` 被选中（`$1` 位置）

   - 想用完全不同的命名（如 `UserData`）？直接输入即可
   - 想保留 `I` 前缀？再按 TAB 深入编辑

2. 再按 TAB → `I` 被选中（`$2` 位置），可修改或删除前缀

3. 再按 TAB → `Name` 被选中（`$3` 位置），输入实际的接口名

#### 示例 2：HTML 自定义标签

```json
"HTML自定义标签": {
  "prefix": "tag",
  "body": [
    "<${1:${2:div} ${3:class=\"${4:container}\"}}>",
    "  $5",
    "</${2:div}>"
  ],
  "description": "创建 HTML 标签"
}
```

**使用流程：**

- `$1`：包含整个标签定义（标签名 + 属性）
- `$2`：嵌套的标签名（出现两次，会同步修改）
- `$3`：嵌套的属性部分
- `$4`：属性值

#### 嵌套占位符的优势

1. **灵活性**：提供多层次的修改选项，用户可选择替换整体或修改细节
2. **智能默认值**：支持复杂的默认结构，符合特定编码规范
3. **提高效率**：对于遵循命名规范的代码（如 `IUserName`、`getUserData`），可快速调整部分内容

> **使用建议：** 过度嵌套会让代码片段变得复杂，建议仅在真正需要层级化编辑时使用。对于大多数场景，简单的 `${1:default}` 就足够了。

## 内置变量

使用 `$name` 或者 `${name:default}` 可以插入变量的值。如果未设置变量，则会插入其默认值或空字符串。当变量未知 (未定义其名称) 时，会将插入的变量名称转换为占位符。

### 文档相关变量

| 变量               | 变量含义                       |
| ------------------ | ------------------------------ |
| `TM_SELECTED_TEXT` | 当前选定的文本或空字符串       |
| `TM_CURRENT_LINE`  | 当前行的内容                   |
| `TM_CURRENT_WORD`  | 光标下的单词内容或空字符串     |
| `TM_LINE_INDEX`    | 基于零索引的行号               |
| `TM_LINE_NUMBER`   | 基于单索引的行号               |
| `TM_FILENAME`      | 当前文档的文件名               |
| `TM_FILENAME_BASE` | 当前文档没有扩展名的文件名     |
| `TM_DIRECTORY`     | 当前文档的目录                 |
| `TM_FILEPATH`      | 当前文档的完整文件路径         |
| `CLIPBOARD`        | 剪贴板的内容                   |
| `WORKSPACE_NAME`   | 已打开的工作空间或文件夹的名称 |

### 日期和时间变量

| 变量                       | 变量含义                                        |
| -------------------------- | ----------------------------------------------- |
| `CURRENT_YEAR`             | 当前年份                                        |
| `CURRENT_YEAR_SHORT`       | 当前年份的最后两位数                            |
| `CURRENT_MONTH`            | 月份为两位数（例如'02'）                        |
| `CURRENT_MONTH_NAME`       | 月份的全名（例如'June'）（中文语言对应六月）    |
| `CURRENT_MONTH_NAME_SHORT` | 月份的简称（例如'Jun'）（中文语言对应是 6 月）  |
| `CURRENT_DATE`             | 这个月的哪一天                                  |
| `CURRENT_DAY_NAME`         | 当天是星期几（例如'星期一'）                    |
| `CURRENT_DAY_NAME_SHORT`   | 当天是星期几的简称（例如'Mon'）（中文对应周一） |
| `CURRENT_HOUR`             | 24 小时时钟格式的当前小时                       |
| `CURRENT_MINUTE`           | 当前分                                          |
| `CURRENT_SECOND`           | 当前秒                                          |

### 注释相关变量

要插入行或块注释，请遵循当前语言：

| 变量                  | 变量含义                      |
| --------------------- | ----------------------------- |
| `BLOCK_COMMENT_START` | 输出：PHP /\*或 HTML 格式<!-- |
| `BLOCK_COMMENT_END`   | 输出：PHP \*/或 HTML 格式-->  |
| `LINE_COMMENT`        | 输出：PHP //或 HTML 格式      |

## 实用示例

### 示例 1：作者和时间注释

下面的代码块是常用的文件顶部添加作者和时间的块注释，其中用到了年 (`CURRENT_YEAR`) 月 (`CURRENT_MONTH`) 日 (`$CURRENT_DATE`) 的系统变量。

```json
"作者和时间注释": {
    "prefix": "zs-Author & Time",
    "body": [
      "/**",
      " * Created by preference on $CURRENT_YEAR/$CURRENT_MONTH/$CURRENT_DATE",
      " */",
      "$0"
    ],
    "description": "添加作者和时间注释"
}
```

### 示例 2：Vue 文件模板

下面的代码块是新建 `.Vue` 文件的模板代码块，其中用到了当前文档没有扩展名的文件名 (`TM_FILENAME_BASE`)，默认把文件名填入 `name` 和 `class` 中。

```json
 "Vue模板": {
    "prefix": "vue-template",
    "body": [
      "<template>",
      "  <section class=\"$TM_FILENAME_BASE\">",
      "    $1",
      "  </section>",
      "</template>\n",
      "<script>",
      "export default {",
      " name: '$TM_FILENAME_BASE',",
      "  data() {",
      "    return {\n",
      "    }",
      "  },",
      "  components: {},",
      "  watch: {},",
      "  mounted() {},",
      "  methods: {}",
      "}",
      "</script>\n",
      "<style scoped lang=\"less\">\n",
      "</style>",
      "$0"
    ],
    "description": "Vue模板"
  }
```

## 工具推荐

> [snippet-generator.app](https://snippet-generator.app/?description=&tabtrigger=&snippet=&mode=vscode)
