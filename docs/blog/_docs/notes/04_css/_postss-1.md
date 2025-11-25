上节我们讲述了 **PostCSS** 的基本知识，对其有了最基本的认识，我们了解了两个非常重要的概念：**`AST 树`** 和 **`插件`**。可以说插件就是 **PostCSS** 的灵活所在，只有掌握了插件的知识那才能算是真正学好了 **PostCSS**。

那本章节我们就真正编写一款插件来实战一下。

> 关于编写 **PostCSS** 中插件，我想说的是，如果你是一个初学者，大可不必上手就开始想着我要编写一款非常厉害的插件，像 **Autoprefixer** 那样， 供千万人使用。我们刚开始只需要认真打好基础，写好基础知识。千里之行始于足，只有我们不断学习、不断实践才有可能编写出一款非常成功的插件。
>
> 另外关于插件，PostCSS 生态中提供的插件已经完全可以满足我们的日常开发，如果没有特殊的需求，可以直接拿来使用就好。
> 
> 如果对于本章节我们不做硬性要求，一定要开发出一款插件，我们只需要感受一下就好，实际感觉一下 **PostCSS** 插件到底是一个什么东西，大家根据自己的实际情况去学习。


在开始编写插件之前，我们必须先来了解学习一些基本的前置知识，只有了解掌握了这些知识才能往后进行，否则也只是走马观花，很难深入学习。



## CSS 中的几种类型

我们知道在一个 CSS 中，我们可以写不同语法格式的代码，这些不同格式的语法代码在 PostCSS 解析转化成 **AST** 树的时候会转化成不同的数据类型。在上小节我们简单提了几个常见的类型，下面我们就具体看一下这些类型。


### 规则集（Rule）

**CSS** 规则由选择器和声明块组成。选择器用于选中特定的 **HTML** 元素，声明块包含了一系列的属性和值。

我们看一下下面规则集的转换类型：

```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

类型为：

```json
"type": "rule",
```


### 注释（Comments）

关于 **CSS** 中的注释，我们之前一直没有提及，包括在三大处理器（**Sass、Less、Stylus**）中也没有提及，所以在这里借此机会我给大家再详细说明一下关于 **CSS** 中的注释。

> 注释是在计算机编程中用于解释代码意图或提供相关信息的文本。注释通常不会被编译或执行，而是为开发人员提供了对代码的说明和解释。它们可以用来帮助其他开发人员理解代码，并提供代码的用法、注意事项、算法说明、逻辑解释、作者信息等。
> 
> 注释通常以特定的语法或符号开始，以标识其为注释，并且不会影响程序的实际执行。在很多编程语言中，注释通常以双斜杠（//）或井号（#）开头。在一些语言中，还可以使用多行注释（/\* ... \*/）来注释一块代码。
> 
> 总的来说，注释对于代码的可读性和维护性非常重要，它们可以帮助开发人员更好地理解和修改代码。

**CSS** 作为一门编程语言同样也有注释的功能，而且注释可以分为单行注释和多行注释，且我们可以写在任意位置。

我们先来看一下之前讲过的三大预处理器中的注释是如何编写的。


#### Sass

同 CSS 一样，Sass 支持标准的 CSS 多行注释 `/* */`，以及单行注释 `//`，前者会被完整输出到编译后的 **CSS** 文件中，而后者则不会。例如：

```css
/*
这是一个多行注释：
.container 选择器是给所有要容器指定基本的布局格式
*/
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 这是一个单行注释 */
.selector {
  color: red; // 这是一个单行注释
  // 这是一个单行注释
  background: blue;
}
```

最后输出为：

```css
/*
这是一个多行注释：
.container 选择器是给所有要容器指定基本的布局格式
*/
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 这是一个单行注释 */
.selector {
  color: red;
  background: blue;
}
```

可以看出以 `//` 开头注释的被舍弃了，只保留了 `/**/` 格式的注释

#### Less

**Less** 中的注释和 **Sass** 中的一致，而且也会把 `//` 格式的注释在转化之后进行了舍弃。

由于两者一致，我们不再举例说明，大家可以参考上面的 **Sass** 代码。

#### Stylus

**Stylus** 中的注释也和 **Sass** 中的一致，而且也会把 `//` 格式的注释在转化之后进行了舍弃。

由于两者一致，我们不再举例说明，大家可以参考上面的 **Sass** 代码。


#### CSS

最后我们看一下在 **CSS** 文件中如何编写注释：

```css
/*
这是一个多行注释：
.container 选择器是给所有要容器指定基本的布局格式
*/
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 这是一个单行注释 */
.selector {
  color: red; /* 这是一个单行注释 */
  /* 这是一个单行注释 */
  background: blue;
}
```

可以看到在 CSS 中只有 `/**/` 格式的注释，并没有 `//` 格式的，这也解释了上述三大预处理器为什么会把 `//` 格式的注释在转化成最终 CSS 的时候进行舍弃，因为标准的 CSS 不支持 `//` 这种格式的注释，不进行舍弃则会报错导致程序无法正常运行。

好，我们借着这个地方补习了一下 CSS 中的注释，我们回归到正题，看一下 CSS 中的注释会被 PostCSS 转成什么，我们来看一下下面的转化之后的简化数据：

```css
{
    "type": "comment",
    "text": "这是一个多行注释：\n.container 选择器是给所有要容器指定基本的布局格式"
}, 
{
    "type": "comment",
    "text": "这是一个单行注释"
}, 
{
    "type": "comment",
    "text": "这是一个单行注释"
}, 
{
    "type": "comment",
    "text": "这是一个单行注释"
}, 
```

需要注意的是，在经过 **PostCSS** 转成 **AST 树**之后，无论是**单行注释**还是**多行注释**都会被指定为相同的类型：`comment`。


### @规则（At-Rules）

@规则对于我们来说并不陌生，我们在开发的时候也会经常用到，其用于控制和定义 **CSS** 的特定行为和规范方式。常见的 @规则包括 **@import、@media、@font-face** 等。

如下示例代码：

```css
@import url('styles.css');
@media screen and (max-width: 768px) {
  /* Styles for screens narrower than 768px */
}
```

我们看一下上面的代码会被转成什么数据类型：

```json
{
    "type": "atrule",
    "name": "import",
    "params": "url('styles.css')"
}, 
{  
    "type": "atrule",
    "name": "media",
    "params": "screen and (max-width: 768px)",
}
```

可以看出 **@规则** 会被转化成 `atrule` 类型。


### 声明（Declaration）

声明就是 **CSS** 规则集中某条具体的样式属性和值。如下样式就是一条声明：

```css
display: flex;
```

我们再来看一下转化之后数据类型：

```json
{
    "type": "decl",
    "prop": "display",
    "value": "flex"
}
```

上面数据格式除了 `type` 被设置成了 `decl` 之外，还有两个非常重要的属性 `prop` 和 `value` 分别代表着 **属性** 和 **属性值**。我们后面会经常用到这两个属性，大家要牢记。

### 简单总结

我们再来简单总结一下 **CSS** 中一些常见的语法规则会被转成 **AST 树**的哪些类型。

除了以上的几个常用的类型之外，还有一个类型也比较常用，它就是每个 **AST 树**必有类型 `root`，它代表着整个 CSS 文档，是一个 `根`。

*   **整个文档** 对应着 `root`；
*   **规则集** 对应着 `rule`；
*   **注释** 对应着 `comment`；
*   **@规则** 对应着 `atrule`；
*   **样式声明** 对应着 `decl`。




## 插件常用 API

正如上节我们说的 **PostCSS** 中的插件可以是一个函数也可以是一个 **JavaScript** 对象。如果要处理的逻辑比较简单，可以使用函数的形式；但当需要处理比较复杂的逻辑时，建议还是使用对象的形式，这样代码逻辑更加清晰，方便操作。

这里我们以对象为例来说一下插件中常见的操作 **API**。

当我们通过对象创建一个插件的时候，会有以下几个常用回调方法，完整的方法参见官网文档：[PostCSS API](https://postcss.org/api/#plugin)，关于各**类型**的 API 方法由于比较多，我们看几个常用的。


### Plugins 相关

在一个**插件对象**中我们可以写以下方法或属性，除了 `Once、prepare` 方法和 `postcssPlugin` 属性不会在解析到特定节点调用之外，其他方法都会解析到特定节点时候调用：

```js
const PLUGIN_PROPS = {
  AtRule: true,
  AtRuleExit: true,
  Comment: true,
  CommentExit: true,
  Declaration: true,
  DeclarationExit: true,
  Document: true,
  DocumentExit: true,
  Once: true,
  OnceExit: true,
  postcssPlugin: true,
  prepare: true,
  Root: true,
  RootExit: true,
  Rule: true,
  RuleExit: true
}
```

上面的方法比较多，我们不一定都能用得上，我们简单看几个比较常用的。


#### Once

只在处理过程中执行一次的方法。在此方法中，你可以执行一些只需一次性执行的操作。

```js
function myPlugin(options) {
  return {
    Once(root, { result }) {
      // 只调用一次的操作，可以做一些初始化的工作
    },
    /* 其他插件方法 */
  };
}
```

#### Root

当根节点生成后调用的方法。我们可以对根节点进行处理、修改或获取根节点的信息。

```js
function myPlugin(options) {
  return {
    Root(root, { result }) {
      // 对根节点进行处理或修改，当解析到 Root 类型的时候会被调用，由于一个文档只有一个根，
      // 所以这个方法也只会调用一次
    },
    /* 其他插件方法 */
  };
}
```

#### Declaration

当遍历到 CSS 规则中的声明时调用的方法。你可以处理、修改或获取声明的属性和值。

```js
function myPlugin(options) {
  return {
    Declaration(declaration, { result }) {
      // 处理声明的属性和值
    },
    /* 其他插件方法 */
  };
}
```

#### DeclarationExit

在处理完 CSS 规则中的声明后调用的方法。你可以在声明处理后执行一些清理操作。

```js
function myPlugin(options) {
  return {
    DeclarationExit(declaration, { result }) {
      // 完成处理后的清理操作
    },
    /* 其他插件方法 */
  };
}
```

#### AtRule

当遍历到 CSS 规则中的 @ 规则时调用的方法。你可以处理、修改或获取 @ 规则的参数和内容。

```js
function myPlugin(options) {
  return {
    AtRule(atRule, { result }) {
      // 处理 @ 规则的参数和内容
    },
    /* 其他插件方法 */
  };
}
```

#### AtRuleExit

在处理完 CSS 规则中的 @ 规则后调用的方法。你可以在 @ 规则处理后执行一些清理操作。

```js
function myPlugin(options) {
  return {
    AtRuleExit(atRule, { result }) {
      // 完成处理后的清理操作
    },
    /* 其他插件方法 */
  };
}
```

#### Rule

当遍历到 CSS 规则时调用的方法。你可以处理、修改或获取规则的选择器和内容。

```js
function myPlugin(options) {
  return {
    Rule(rule, { result }) {
      // 处理规则的选择器和内容
    },
    /* 其他插件方法 */
  };
}
```

#### RuleExit

在处理完 CSS 规则后调用的方法。你可以在规则处理后执行一些清理操作。

```js
function myPlugin(options) {
  return {
    RuleExit(rule, { result }) {
      // 完成处理后的清理操作
    },
    /* 其他插件方法 */
  };
}
```

#### Comment

当遍历到 CSS 注释时调用的方法。你可以处理、修改或获取注释的内容。

```js
function myPlugin(options) {
  return {
    Comment(comment, { result }) {
      // 处理注释的内容
    },
    /* 其他插件方法 */
  };
}
```

#### CommentExit

在处理完 CSS 注释后调用的方法。你可以在注释处理后执行一些清理操作。

```js
function myPlugin(options) {
  return {
    CommentExit(comment, { result }) {
      // 完成处理后的清理操作
    },
    /* 其他插件方法 */
  };
}
```

这些方法可以帮助我们在 **PostCSS** 插件中定义不同节点类型的处理逻辑，并实现相应的操作和修改。


### 新增节点

关于新增节点的方法有以下几种：

*   **insertAfter**：容器性方法，也就是说只有像 `Rule` 这样的容器可以使用，在某个节点后面添加。
*   **insertAfter**：容器性方法，也就是说只有像 `Rule` 这样的容器可以使用，在某个节点前面添加。
*   **append**：容器性方法，也就是说只有像 `Rule` 这样的容器可以使用，添加到容器的最后面。
*   **prepend**：容器性方法，也就是说只有像 `Rule` 这样的容器可以使用，添加到容器的最前面。
*   **after**：容器性方法，但与 `insertAfter` 不同的是，它是指当前节点的父容器调用，也就是相当于 `node.parent.insertAfter()`，相当于 `node.parent.insertAfter()`方法的别名。
*   **before**：容器性方法，但与 `insertBefore` 不同的是，它是指当前节点的父容器调用，也就是相当于 `node.parent.insertBefore()`，相当于 `node.parent.insertBefore()`方法的别名。
*   **clone**：节点方法，以当前节点为原型复制出一份新的节点并插入在当前节点的后面。
*   **cloneBefore**：节点方法，以当前节点为原型复制出一份新的节点并插入在当前节点的前面。
*   **cloneAfter**：节点方法，以当前节点为原型复制出一份新的节点并插入在当前节点的后面。


可以看出 PostCSS 还是为我们提供了很多便利的新增节点方法，下面我们分别看一下容器方法和节点方法。


#### insertAfter

假设我们有以下 **CSS** ：

```css
.test {
    display: flex;
}
```

要处理的插件内容如下：

```js
function myPlugin() {
    return {
        postcssPlugin: 'MyPlugin',
        Rule(rule) {
            const decl = rule.nodes[0]
            rule.insertAfter(decl, {prop: decl.prop, value: '-webkit-' + decl.value})
        }
    }
}
```

经过处理之后最后输出的 **CSS** 为：

```css
   .test {
        display: flex;
        display: -webkit-flex;
    }
```

下面我们再来看一下节点 **cloneAfter** 方法。


#### cloneAfter

**CSS** 代码与上述相同，我们来看一下插件内容：

```js
    function myPlugin() {
        return {
            postcssPlugin: 'MyPlugin',
            Rule(rule) {
                const decl = rule.nodes[0]
                decl.cloneAfter({value: '-moz-' + decl.value})
            }
        }
    }
```

最终输出的 **CSS** 也与上述一致。


### 删除节点

对于删除节点方法比较简单，我们也同样分为容器方法和节点方法：

*   remove：节点方法，当前节点自我删除；
*   removeAll：容器方法，删除当前容器中所有的节点；
*   removeChild：容器方法，删除指定的节点。


#### remove

假定我们有以下 CSS：

```css
    .test {
        display: flex;
        display: -webkit-flex;
    }
```

插件内容如下：

```js
    function myPlugin() {
        return {
            postcssPlugin: 'MyPlugin',
            Declaration(decl) {
                if (decl.value.startsWith('-webkit-')) {
                    decl.remove()
                }
            }
        }
    }
```

最终输出的 CSS 为：

```css
    .test {
        display: flex;
    }
```

可以看出，我们把样式值以 `-webkit-` 开头的样式进行了删除。



#### removeAll

假定 CSS 代码如下：

```css
    * {
        margin: 0;
        padding: 0;
    }
    .test {
        display: flex;
        display: -webkit-flex;
    }
```

要处理的插件内容为：

```js
    function myPlugin() {
        return {
            postcssPlugin: 'MyPlugin',
            Declaration(decl) {
                if (decl.value.startsWith('-webkit-')) {
                    decl.parent.removeAll()
                }
            }
        }
    }
```

最终的输出 CSS 为：

```css
    * {
        margin: 0;
        padding: 0;
    }
    .test {
    }
```


### 更改节点

至于更改节点，我们平时做的主要是更改 `Decl` 类型的数据，如 `prop` 值 和 `value` 值，还有就是更改一下 `rule` 类型的 `selector` 值，也就是选择器的名字。

还是来看一个案例，假定有以下 CSS 要处理：

```css
    * {
        margin: 0;
        padding: 0;
    }
    .test {
        display: flex;
        display: -webkit-flex;
    }
```

我们想把属性值为 `0` 的样式改成 `0px`，并把 `.test` 选择器名字改成：`.my-test`。

看一下插件内容：

```js
    function myPlugin() {
        return {
            postcssPlugin: 'MyPlugin',
            Declaration(decl) {
                if (decl.value === '0') {
                    decl.value = '0px'
                }
            },
            Rule(rule) {
                if (rule.selector === '.test') {
                    rule.selector = '.my-test'
                }
            }
        }
    }
```

最终输出 CSS 为：

```css
    * {
        margin: 0px;
        padding: 0px;
    }
    .my-test {
        display: flex;
        display: -webkit-flex;
    }
```


### 查找节点

对于查找功能，我们主要是有以下几个属性或者方法：

*   first：属性，获取容器中第一个节点。
*   last：属性，获取容器中最后一个节点。
*   each：容器方法，循环容器中所有的节点。

用法也相对简单，这里我们不再举例，大家需要注意的是 `first` 和 `last` 这两个是属性，在使用的时候后面不要加上 `()` ，否则会报错。



## 插件实战

在本节开篇我们介绍了很多插件的前置知识，本质上来说这需要一定的 **JavaScript** ，和 CSS 关系不是很大，但是如果我们想要处理好 CSS 这一步是必经之路，大家对 JavaScript 有不明白的地方，可以先去补一下基础知识，或者私信我，我给大家讲解。

在了解上述的**类型和 API** 概念之后，下面我们就开始动手制作一个**插件**。

该插件要实现以下几点功能：

1.   在 CSS 文件的顶部添加版权声明注释信息。
2.   对于文件中的所有选择器，根据指定的规则进行转换。
3.   对于指定属性值，根据指定的规则进行转换。
4.   移除不需要的 CSS 规则和声明。
5.   根据指定的条件添加新的 CSS 规则和声明。
6.   在选择器添加上指定的前缀。


### 要处理的 CSS 样式代码

```css
   #app {
      width: 100%;
      height: 100vh;
   }
   .container {
      margin: 20px;
      padding: 10px;
      background-color: #ffffff;
    }
   .title {
      font-size: 16px;
      color: red;
    }
```

为了我们更加方便观察输出后的 **CSS** 代码，这里我们只简单写了三个**选择器**。代码不在多，能实现功能即可。


### 定义要处理的插件

```js
    const postcss = require('postcss');

    function myComplexPlugin(options) {
        const { prefix, copyright, selectorRules, valueConverter, removeSelectors, removeDeclarations, newSelectors, newDeclarations } = options;

        return {
          postcssPlugin: 'postcss-plugin-complex',
          Once(root, { result }) {
            // 创建版权声明注释节点
            const comment = postcss.comment({ text: copyright });

            // 将注释节点插入到根节点的最顶部
            root.prepend(comment);
          },

          Rule(rule, { result }) {
            // 处理选择器转换
            rule.selectors = rule.selectors.map((selector) => {
              let updatedSelector = selector;

              // 根据规则转换选择器
              Object.keys(selectorRules).forEach((rule) => {
                updatedSelector = updatedSelector.replace(rule, selectorRules[rule]);
              });

              return `${updatedSelector}`;
            });

            // 移除不需要的 CSS 规则
            if (removeSelectors.includes(rule.selector)) {
              rule.remove();
            }
          },

          Declaration(decl, { result }) {
            const prop = decl.prop;
            const value = decl.value;

            // 处理属性值转换
            Object.keys(valueConverter).forEach((property) => {
              if (prop.includes(property)) {
                const converter = valueConverter[property];
                decl.value = converter(value);
              }
            });

            // 移除不需要的 CSS 声明
            if (removeDeclarations.includes(decl.prop)) {
              decl.remove();
            }
          },

          OnceExit(root, { result }) {
            // 添加新的 CSS 规则和声明
            Object.keys(newSelectors).forEach((selector) => {
              const rule = postcss.rule({ selector });

              Object.keys(newDeclarations).forEach((property) => {
                const value = newDeclarations[property];
                const declaration = postcss.decl({ prop: property, value });

                rule.append(declaration);
              });

              root.append(rule);
            });
            root.nodes.filter(it => it.type === 'rule' && it.selector.startsWith('.')).forEach(it => {
                it.selector = `.${prefix}${it.selector.replace('.', '')}`
            })
          }
        };
      }
```

上述代码我们定义了一个 **postcss** 插件，可以看出是通过定义一个函数并返回一个对象的形式，并为插件取名为：`postcss-plugin-complex`。注：插件名是必须要输入的，如果没有该属性，则会报错。

另外，我们在给插件起名的时候一般都是以`postcss-plugin-xxx` 这样格式进行命名。

对象中的各函数都是上面我们提到的回调函数。



### 插件测试

在准备好插件和要转换的 css 之后，下面开始进行验证，先通过 **postcss** 命令行的模式进行验证，代码如下：

```js
      // 规则定义
      const selectorRules = {
        '.container': '.custom-container',
        '.title': '.custom-title'
      };

      // 属性值转换函数定义
      const valueConverters = {
        'margin': (value) => {
          const parsedValue = parseInt(value, 10);
          return `${(parsedValue * 0.5)}px`; // 假设按照一般的规则进行转换
        },
        'background-color': (value) => {
          return value.toUpperCase(); // 将颜色值转换为大写形式
        }
      };

      // 需要移除的选择器和声明
      const removeSelectors = [];
      const removeDeclarations = ['color'];

      // 需要添加的新选择器和声明
      const newSelectors = {
        '.new-selector': {
          'color': 'blue',
          'font-size': '14px'
        }
      };

      const newDeclarations = {
        'padding': '5px',
        'border': '1px solid black'
      };

      // 插件配置选项
      const pluginOptions = {
        prefix: 'qqx-',
        copyright:  `
         @auth: qqx
         @email: 353087890@qq.com 
        `,
        selectorRules: selectorRules,
        valueConverter: valueConverters,
        removeSelectors: removeSelectors,
        removeDeclarations: removeDeclarations,
        newSelectors: newSelectors,
        newDeclarations: newDeclarations
      };

      const result = await postcss([myComplexPlugin(pluginOptions)]).process(css, { /* options */ });

      console.log(result.css);
```


最终输出的 **css** 代码为：

```css
        /* 
         @auth: qqx
         @email: 353087890@qq.com 
         */
        #app {
            width: 100%;
            height: 100vh;
        }
        .qqx-custom-container {
          margin: 0px;
          padding: 10px;
          background-color: #FFFFFF;
        }

        .qqx-custom-title {
          font-size: 16px;
        }

        .qqx-new-selector {
            padding: 5px;
            border: 1px solid black;
        }
```

我们通过一张图来对比一下前后的变化：

<p align=center><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/872d4969cb1b413ca9d5cdccfa439273~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=702&h=524&s=83707&e=png&b=1d1d1d" alt="WX20230927-212339.png"  /></p>


在上图中，左边部分代码是原始代码，也就是还未经过 **PostCSS** 处理的代码。右面部分代码是经过 **PostCSS** 处理之后的代码，经过对比我们发现左右两边以下几点不同：

*   右面的代码已经在最顶部添加上了注释。
```css
    /* 
    @auth: qqx
    @email: 353087890@qq.com 
    */
```
*   右面的`类选择器` 前面都已经加上了 `.qqx-` 前缀，但 `id 选择器`没有添加。
*   右面部分的最下面新添加了一个`类选择器`：

```css
    .qqx-new-selector {
        padding: 5px;
        border: 1px solid black;
    }
```
*   左面代码中的 `color: red` 属性，通过指定的规则在右面已经进行删除。
*   左面代码中的 `margin: 20px` ，通过指定的规则在右面替换成了 `margin: 0px`。
*   左面代码中 `.container` 和 `.title` 选择器名称，通过指定的规则已经替换成了 `.custom-container` 和 `.title` ，只不过最后我们又在前面加上了前缀。

通过上面的观察，发现了六种不同的地方，也正好对应了一开始我们要实现的六个功能：

*    在 CSS 文件的顶部添加版权声明注释信息。
*    对于文件中的所有选择器，根据指定的规则进行转换。
*    对于指定属性值，根据指定的规则进行转换。
*    移除不需要的 CSS 规则和声明。
*    根据指定的条件添加新的 CSS 规则和声明。
*    在选择器添加上指定的前缀。

在编写插件时候，还有两个地方需要注意一下，虽然不是大问题，但如果不注意代码则不能正常运行。

*   如果我们通过一个函数来实现插件，如果是一个返回对象的函数，我们在使用的时候一定设置属性 `postcss` 为 `true`，如下：

```js
        function myPlugin() {
            return {
                Once(root) {}
                //...其它方法
            }
        }
        // 这行代码必须要设置，否则插件不会正常执行
        myPlugin.postcss = true
```
*   如果我们使用对象形式的插件，无论是直接使用对象还是通过函数返回的对象，则一定要设置 `postcssPlugin` 属性，该属性一般为我们的插件名称，如下：
```js
        function myPlugin() {
            return {
                // 该属性必须要设置，否则插件会报错
                postcssPlugin: 'MyPluginName',
                Once(root) {},
                //...其它方法
            }
        }
        myPlugin.postcss = true
```

至于为什么要这样设置，这得需要看一下 PostCSS 内部源码，我们简单来看一下：

```js
    // 下面的方法是插件在初始化的时候调用
    normalize(plugins) {
        let normalized = []
        for (let i of plugins) {
          if (i.postcss === true) {
            /**
             * 从这里我们可以看出，如果设置了 postcss 为 true 才会调用该函数
             * 才会正常返回一个 JavaScript 对象
             * 否则只会当成一个普通的函数添加到插件列表中
             */
            i = i()
          } else if (i.postcss) {
            i = i.postcss
          }

          if (typeof i === 'object' && Array.isArray(i.plugins)) {
            normalized = normalized.concat(i.plugins)
          } else if (typeof i === 'object' && i.postcssPlugin) {
            /**
             * 上面的判断则说明如果我们返回的是一个对象
             * 但还要同时满足 postcssPlugin 属性有值
             * 才能正常添加到插件列表
             */
            normalized.push(i)
          } else if (typeof i === 'function') {
            normalized.push(i)
          } else if (typeof i === 'object' && (i.parse || i.stringify)) {
            if (process.env.NODE_ENV !== 'production') {
              throw new Error(
                'PostCSS syntaxes cannot be used as plugins. Instead, please use ' +
                  'one of the syntax/parser/stringifier options as outlined ' +
                  'in your PostCSS runner documentation.'
              )
            }
          } else {
            // 如果上述所的判断都不满足，则直接抛出一个异常
            throw new Error(i + ' is not a PostCSS plugin')
          }
        }
        return normalized
      }
```
关于更多的 PostCSS 源码我们不再细看，总之 PostCSS 作为一款非常流行的工具，其内部原理还是非常复杂的，尤其是在多个插件需要调用的时候，场景比较复杂，如果对这源码感兴趣的同学可以去查看一下尝试阅读。我们不再缀述更多关于源码的介绍



## 写在最后

本小节虽然标题是 **PostCSS** 插件实战，但是涉及到的知识非常多，也绝不是我们一篇文章就能全部讲完，通过本小节我给大家做了简单整理，把主要的知识点介绍给大家，希望大家以此为基础，多去官网查阅相关的资料，多动手实践，只有这样才能掌握好 **PostCSS** 的精华。

虽然这只是一个比较简单的例子，也没太有实际的意义，但是也用到了我们提到绝大部分 **API** 和讲解的知识，让大家感受一下**插件**是如何进行工作和编写的。

最后还是提一下文章最开始说的那些，自己编写 **PostCSS 插件**在平时的工作中用到的地方很少，**PostCSS** 为我们提供的大量插件已经满足了我们日常开发，如果不是特殊情况下我们没有必要自己编写插件。当然，如果你有一个很好的想法，想为大家提高 **CSS** 开发效率而编写一款实用的插件，这部分知识还是必须要掌握的。

我们最后来总结一下本小节的主要内容：

*   CSS 中的几种类型

    *   规则集
    *   注释
    *   @规则
    *   样式声明
    *   与 AST 树中哪些类型一一对应

*   插件常用 API

    *   plugin 相关的方法
    *   新增节点方法
    *   删除节点方法
    *   更改节点方法
    *   查找节点方法

*   插件实战
