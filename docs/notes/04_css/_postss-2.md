从本章节开始，我们开始介绍 **PostCSS** 相关的知识和功能。

## 什么是 PostCSS

**PostCSS** 是一个用于对 **CSS** 进行转换和处理的工具。与传统的预处理器（如 Sass 或 Less）相比，**PostCSS** 不是通过引入新的语法来扩展 **CSS**，而是使用 **JavaScript** 插件来处理 **CSS**。

**PostCSS** 的主要特点是`灵活性`和`可扩展性`。它提供了一个插件系统，允许我们根据需要选择和应用各种插件来处理 **CSS**。这些插件可以用于实现各种功能，例如自动添加浏览器前缀、变量替换、代码压缩、雪碧图合并等等。

使用 PostCSS 的过程非常简单。你可以通过 npm 安装 PostCSS，并在构建工具（如 **Webpack**、**Gulp** 等）中配置 **PostCSS** 插件。然后，你可以选择性地添加各种插件，并通过配置文件来指定插件的参数和顺序。当我们在构建项目时，**PostCSS** 将会按照配置的顺序依次处理 **CSS** 文件，生成转换后的 **CSS**。

总的来说，**PostCSS** 提供了一种灵活、可扩展的方式来处理和转换 **CSS**，它可以帮助我们提高 **CSS** 的开发效率，并提供一些现代化 **CSS** 特性的兼容性处理。

如果只是单纯地说概念可能大家还是有些迷糊，下面我分享几个场景以帮助大家更好地理解 **PostCSS** 是做什么用的。


### 场景一

我们都知道市面上有很多的浏览器，它们都是由不同的浏览器厂商提供，因而导致一个问题就是每个浏览器厂商在实现 **CSS** 标准的时候可能会不尽相同。

就比如我们前端人员避之不及的 **IE 浏览器**，在 **IE9** 之前那简直是开发人员的噩梦，明明我们写的样式代码在别的浏览器上运行没有任何问题，但是在 **IE** 上总会出现各种各样的问题，我们不得不花费大量的时间和精力去做各种适配，以达到我们想要效果。

再比如，谷歌推出的 **chrome** 浏览器、 **Mozilla** 基金会推出的 **firefox** 浏览器，还有苹果公司推出的 **safair** 浏览器，也会有兼容性问题。为了解决 **CSS** 的兼容性问题，我们一般都会在特殊的属性上加上浏览器厂商前缀以便能达到兼容的效果。

比如我们看一下下面的代码，相们大家都遇到过：

```css
.selector {
  background-color: #F00;        /* 支持所有浏览器 */
  color: #FFF;                   /* 支持所有浏览器 */
  border: 1px solid #000;        /* 支持所有浏览器 */
  display: -webkit-box;          /* Safari, iOS Safari 和 Chrome */
  display: -moz-box;             /* Firefox */
  display: -ms-flexbox;          /* IE 10 和 IE 11 */
  display: -webkit-flex;         /* Safari 6.1+ 和 Chrome */
  display: flex;                 /* 标准声明 */

  -webkit-border-radius: 5px;    /* Safari, Chrome (移动端) */
  -moz-border-radius: 5px;       /* Firefox */
  border-radius: 5px;            /* 标准声明 */

  -webkit-transition: all 0.3s;  /* Safari 和 Chrome */
  -moz-transition: all 0.3s;     /* Firefox */
  -o-transition: all 0.3s;       /* Opera */
  transition: all 0.3s;          /* 标准声明 */

  -webkit-box-shadow: 2px 2px 4px #888;    /* Safari, Chrome (移动端) */
  -moz-box-shadow: 2px 2px 4px #888;       /* Firefox */
  box-shadow: 2px 2px 4px #888;            /* 标准声明 */
}
```

通过上面的代码我们可以看出，如果要进行市面上的主流浏览器适配的话，工作量还是挺大，我们要写很多重复的代码，最重要的是我们不能全都记住哪些属性前面或者属性值要进行浏览器适配。在早期的开发工作中我们确实得需要这样去做适配，但是后面一款插件的出现彻底解放了我们。

**Autoprefixer** 是一个流行的前缀自动添加工具，它能够根据我们指定的目标浏览器范围自动为 **CSS** 代码添加需要的浏览器前缀。它使得编写跨浏览器兼容的 **CSS** 样式变得更加简单和高效。

它的工作原理是基于 **Can I Use** 上的数据，它会根据你设置的目标浏览器版本，自动检测和添加相应的浏览器前缀。我们只需编写标准的未添加前缀的 **CSS** 代码，**Autoprefixer** 将在构建或编译过程中自动为这些 **CSS** 属性添加适当的前缀。

其作为 **PostCSS** 中一款插件，在现在项目开发中得到了广泛的应用，可以说是项目的标配。更有甚者说我们使用 PostCSS 的主要目的就是使用 **Autoprefixer**。

通过使用 Autoprefixer ，我们上面的代码就可以简化成下面的写法：

```css
.selector {
  background-color: #F00;        /* 支持所有浏览器 */
  color: #FFF;                   /* 支持所有浏览器 */
  border: 1px solid #000;        /* 支持所有浏览器 */

  display: flex;                 /* 标准声明 */

  border-radius: 5px;            /* 标准声明 */

  transition: all 0.3s;          /* 标准声明 */
  box-shadow: 2px 2px 4px #888;            /* 标准声明 */
}
```

在通过一定的打包执行流程 **Autoprefixer** 最终会把上面的代码转换成我们最开始写的代码。


### 场景二

下面我们再来设想一个场景，在平时的开发中我们难免会因为疏乎有些样式写得不规范，比如引用了一个不存在变量，有个属性或者属性值单词我们拼写错了，或者有些样式我们重复写了，等等。

这些问题在所难免，有的时候这些不规范的代码对线上项目没有任何影响，但有的时候会导致一些样式出不来，我们就不得不去一个个排查问题，最终定位出是一个或者某些属性写的问题。这种不规范的代码也会导致在团队之间传播，从而降低了我们整个团队的能力水平。古人说，勿以恶小而为之，虽然这些不规范的代码不会产生太大的影响，但我们还是要尽量避免。

这个时候我们就在想，如果有一个工具能在我们开发的时候就能检查出来，这样我们就能在第一时间纠正，那该多好。

其实针对我们前端开发而言，也有很多工具能帮助我们做这些事情，比如我们用过的 **ESLint** 就是专门检查我们 **JavaScript** 代码的规范性。而针对 **CSS**，我们也有一款 **PostCSS** 插件可以做到这点——**Stylelint**。

我们看一下下面的 **CSS** 代码：

```css
body{
    background-color:#ffffff;
    color:#333333;
    color:#333333;
}

h1{

}

.container .item{
    display:inline-block;
    background-color:#f0f0f0;
    padding:10px;
    border-radius: 5px;
    margin: 5p;
}
```

第一眼我们看上面的代码没有什么大问题，我们通过 Stylelint 来检查一下就会发现以下问题：

```tex
  4:22  ✖  Expected "#ffffff" to be "#fff"  color-hex-length
  5:11  ✖  Expected "#333333" to be "#333"  color-hex-length
  6:5   ✖  Unexpected duplicate "color"     declaration-block-no-duplicate-properties
  6:11  ✖  Expected "#333333" to be "#333"  color-hex-length
  9:3   ✖  Unexpected empty block           block-no-empty
 18:14  ✖  Unexpected unknown unit "p"      unit-no-unknown

6 problems (6 errors, 0 warnings)
```

这说明一些平时我们看上去不起眼的问题，在 **Stylelint** 下都会暴露出来，从而也让我们的代码更加规范。当然，关于代码规范的问题，每个团队都会有自己的一套规则，我们也可以把我们团队的规范配置到 **Stylelint** 中，让其按我们的代码规范去检查代码。

关于如何使用 **Stylelint** 大家可以去官网进行查看，如果后面章节有涉及，我们再详细看一下用法是怎样的，这里大家先感受一下就好。

通过上面两个场景的讲述，相信大家对 **PostCSS** 以及其插件有了更深的理解，**PostCSS** 本身没有太多的功能，主要是其强大的插件机制，通过其提供的插件机制我们可以编写各种各样我们需要的插件，有些插件如 **Autoprefixer** 和 **Stylelint** 别人都已经帮我们开发好了，我们直接用就好，但有些插件可能得需要我们自己编写才行。



## AST 树

在开始讲解 **PostCSS** 之前，我们有必要先来了解一下什么是 **AST 树**，这对我们后期的学习将非常重要。

在 **PostCSS** 中，**AST** 指的是抽象语法树，英文全称为：**Abstract Syntax Tree**，它是一种将源代码结构化表示的数据结构。

**AST** 是通过解析 **CSS** 代码生成的一种树形结构，它表示了 **CSS** 代码的语法结构和各个部分之间的关系。**AST** 通过节点和节点之间的关系来表示 **CSS** 的不同部分，例如选择器、属性、值等。

在 **PostCSS** 中，**AST** 是通过解析 **CSS** 代码并将其转换为对象表示的。每个节点对象代表着 **CSS** 的不同部分，例如规则集、选择器、属性等。每个节点对象都包含了相应的属性，用来表示其在 **CSS** 中的具体信息。通过遍历和操作 **AST**，可以对 **CSS** 进行各种转换和处理操作。

使用 **AST** 可以方便地对 **CSS** 进行静态分析和处理。**PostCSS** 提供了一些方法和插件，可以操作 **AST** 以实现 **CSS** 的转换、优化和增强功能。通过修改 **AST**，我们开发者可以对 **CSS** 进行自定义的转换和处理，例如自动添加浏览器前缀、变量替换、代码压缩等。

总的来说，**AST** 是在 **PostCSS** 中表示 **CSS** 代码结构的一种数据结构。它通过解析 **CSS** 代码生成，用于进行静态分析和处理，以实现各种对 **CSS** 的转换和操作。通过对 **AST** 进行遍历和修改，可以实现对 **CSS** 的细粒度控制和处理。


### 示例

下面来看一个简单的案例，感受一下什么是 **AST** 树。

假设我们有以下 **CSS** 代码：

```css
* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #fff;
}

#app {
  width: 100%;
  height: 100vh;
}
```

新建一个 `js`文件，内容如下：

```js
import postcss from 'postcss'
const ast = postcss.parse(`* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #fff;
}

#app {
  width: 100%;
  height: 100vh;
}`)
console.log(ast);
```

我们在运行上面的代码之后，控制台打印出的 **AST** 如下：

注：**AST** 本质是一个 **JavaScript** 对象，为了方便打印查看，用 **JSON.stringify(ast)** 方法进行了 **JSON** 化。

```json
{
    "raws": {
        "semicolon": false,
        "after": ""
    },
    "type": "root",
    "nodes": [{
        "raws": {
            "before": "",
            "between": " ",
            "semicolon": true,
            "after": "\n"
        },
        "type": "rule",
        "nodes": [{
            "raws": {
                "before": "\n  ",
                "between": ": "
            },
            "type": "decl",
            "source": {
                "end": {
                    "column": 12,
                    "line": 2,
                    "offset": 15
                },
                "inputId": 0,
                "start": {
                    "column": 3,
                    "line": 2,
                    "offset": 6
                }
            },
            "prop": "margin",
            "value": "0"
        }, {
            "raws": {
                "before": "\n  ",
                "between": ": "
            },
            "type": "decl",
            "source": {
                "end": {
                    "column": 13,
                    "line": 3,
                    "offset": 29
                },
                "inputId": 0,
                "start": {
                    "column": 3,
                    "line": 3,
                    "offset": 19
                }
            },
            "prop": "padding",
            "value": "0"
        }],
        "source": {
            "end": {
                "column": 1,
                "line": 4,
                "offset": 31
            },
            "inputId": 0,
            "start": {
                "column": 1,
                "line": 1,
                "offset": 0
            }
        },
        "selector": "*"
    }, {
        "raws": {
            "before": "\n\n",
            "between": " ",
            "semicolon": true,
            "after": "\n"
        },
        "type": "rule",
        "nodes": [{
            "raws": {
                "before": "\n  ",
                "between": ": "
            },
            "type": "decl",
            "source": {
                "end": {
                    "column": 25,
                    "line": 7,
                    "offset": 65
                },
                "inputId": 0,
                "start": {
                    "column": 3,
                    "line": 7,
                    "offset": 43
                }
            },
            "prop": "background-color",
            "value": "#fff"
        }],
        "source": {
            "end": {
                "column": 1,
                "line": 8,
                "offset": 67
            },
            "inputId": 0,
            "start": {
                "column": 1,
                "line": 6,
                "offset": 34
            }
        },
        "selector": "body"
    }, {
        "raws": {
            "before": "\n\n",
            "between": " ",
            "semicolon": true,
            "after": "\n"
        },
        "type": "rule",
        "nodes": [{
            "raws": {
                "before": "\n  ",
                "between": ": "
            },
            "type": "decl",
            "source": {
                "end": {
                    "column": 14,
                    "line": 11,
                    "offset": 90
                },
                "inputId": 0,
                "start": {
                    "column": 3,
                    "line": 11,
                    "offset": 79
                }
            },
            "prop": "width",
            "value": "100%"
        }, {
            "raws": {
                "before": "\n  ",
                "between": ": "
            },
            "type": "decl",
            "source": {
                "end": {
                    "column": 16,
                    "line": 12,
                    "offset": 107
                },
                "inputId": 0,
                "start": {
                    "column": 3,
                    "line": 12,
                    "offset": 94
                }
            },
            "prop": "height",
            "value": "100vh"
        }],
        "source": {
            "end": {
                "column": 1,
                "line": 13,
                "offset": 109
            },
            "inputId": 0,
            "start": {
                "column": 1,
                "line": 10,
                "offset": 70
            }
        },
        "selector": "#app"
    }],
    "source": {
        "end": {
            "column": 2,
            "line": 13,
            "offset": 110
        },
        "inputId": 0,
        "start": {
            "column": 1,
            "line": 1,
            "offset": 0
        }
    },
    "inputs": [{
        "hasBOM": false,
        "css": "* {\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  background-color: #fff;\n}\n\n#app {\n  width: 100%;\n  height: 100vh;\n}",
        "id": "<input css PjLCa9>"
    }]
}
```

这里面包含了 **AST** 完整的信息，这里我们只需要关注以下几个属性即可。

**最外层的 nodes 属性**

```js
{
    ...,
    nodes: [],
    ....
}
```

这里的 **nodes** 是一个数组，数组的成员是一个个 **CSS** 选择器经过 **PostCSS** 转化后 **JavaScript** 对象。

由于转化后的对象比较繁杂，我们简化来看，以下面的代码为例，看一下经过转化之后的对象具体是什么。

要转化的 **CSS** 代码：

```css
* {
  margin: 0;
  padding: 0;
}
```

由于转化的代码比较长，为了方便好看，我抽取几个重要的属性看一下：

```json
{
    "type": "rule",
    "nodes": [
        {
            "type": "decl",
            "prop": "margin",
            "value": "0"
        },
        {
            "type": "decl",
            "prop": "padding",
            "value": "0"
        }
     ],
     "selector": "*"
 }
```

我们来看一下对应关系：

-   首先上面的 **CSS** 代码是一个`样式规则集`，所以 `type` 值为 `rule`。

-   样式规则集名字为 `*` ，所以 `selector` 值为 `*`。

-   样式规则集中有两个样式属性 `margin 和 padding` ，所以又被转化了一个 **nodes** 数组对象，里面还是有两个对象，因为两个对象的属性都相同，我们以其中一个对象为例来看一下：

    -   `type："decl"` 代表这个样式属性的类型为 `decl`；
    -   `prop: "margin"` 代表这个样式属性的名称为 `margin`；
    -   `value: "0"` 代表这个属性的值为 `0`。

从上面我们可以看出，**CSS** 样式规则中每个部分都会被转成某个 **JavaScript** 对象的某个部分，这样做就是为了方便我们可以最大粒度地操作 **CSS** ，以便实现各种各样的功能。

同时我们也可以看到，一段 **CSS** 代码会被转成一个 **AST** 树，树的节点都对应着不同的 **CSS** 类型。

可能有些同学对 **PostCSS** 转化后的类型不太熟悉，下面我们看下几个常用的类型。

-   "**atrule**"：表示 **CSS** 规则中的 @ 规则，如 **@import**、 **@media** 等。
-   "**rule**"：表示 **CSS** 规则中的普通规则，包含选择器和声明块。
-   "**decl**"：表示 **CSS** 声明，包含属性和值。
-   "**comment**"：表示 **CSS** 注释。
-   "**root**"：表示整个 **CSS** 的根节点，包含所有的规则和声明。

最后我们再来看一个案例：

```css
/* 示例CSS代码 */
@import url('./btn.css');

@media (max-width: 600px) {
  body {
    font-family: 'Roboto', sans-serif;
  }
}

.container {
  display: flex;
}

.button {
  background-color: #007bff;
}

/* 示例注释 */
```

最终转后的 AST 树对象为（已经过 **JSON** 格式化处理）：

```json
{
    "type": "root",
    "nodes": [{
        "type": "comment",
        "text": "示例CSS代码"
    }, {
        "type": "atrule",
        "name": "import",
        "params": "url('./btn.css')"
    }, {
        "type": "atrule",
        "name": "media",
        "params": "(max-width: 600px)",
        "nodes": [{
            "type": "rule",
            "nodes": [{
                "type": "decl",
                "prop": "font-family",
                "value": "'Roboto', sans-serif"
            }],
            "selector": "body"
        }]
    }, {
        "type": "rule",
        "nodes": [{
            "type": "decl",
            "prop": "display",
            "value": "flex"
        }],
        "selector": ".container"
    }, {
        "type": "rule",
        "nodes": [{
            "type": "decl",
            "prop": "background-color",
            "value": "#007bff"
        }],
        "selector": ".button"
    }, {
        "type": "comment",
        "text": "示例注释"
    }]
}
```

相信经过上面的讲述之后，对 **AST 树**也有了一定的认知，最起码我们知道了 **CSS** 在经过 **PostCSS** 处理之后会形成一个树型的数据结构。这一点是非常重要的，要不然对于后面的学习我们还是会一知半解。

最后我们再来看一下整体的 **CSS** 处理流程图：


<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bcef3b27f4114ba5b2a043e2f39e9bf9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1246&h=616&s=43757&e=png&b=fdfdfd" alt="WX20230926-170608@2x.png"  /></p>


### 与预处理器的区别

**PostCSS** 与我们之前学习的预处理器（如 **Sass**、**Less**、**Stylus**）相比，有相似的地方，但更多的是不同，相似的地方就是它们都是为了处理 **CSS** 而生，我们可以通过它们处理不同场景下的 **CSS** 代码。我们主要来看一下它们的不同之处，这样对比着学习会起到事半功倍的效果。

有以下几个主要区别：

-   语法：预处理器通常引入新的语法规则，如 **Sass** 的变量、嵌套规则等。而 **PostCSS** 本身并不定义新的语法，而是通过插件系统来处理现有的 **CSS** 。

-   处理 **CSS** 方式：每一款预处理器有自己的生态系统和工具链，例如 **Sass** 有 **Sass** 编译器，**Less** 有 **Less.js** 编译器，**Stylus** 有 **Stylus** 的编译器……而 **PostCSS** 作为一个通用的工具，有着强大的插件系统，我们通过其各种各样的插件来实现各种功能。
-   功能差异：我们所学的预处理器通常提供一些特定的功能，如嵌套、变量、混合等。侧重于实现 **CSS** 可编程化，让我们能够像写 **JavaScript** 代码那样去写 **CSS** 代码，从而简化逻辑和省略重复的代码。 而 **PostCSS** 的插件丰富多样，可以实现各种功能，它更侧重于后期的 **CSS** 处理效果达到一定的功能。有些功能我们通过预处理器不好处理，但通过 **PostCSS** 可以很好地进行处理，如自动添加浏览器前缀、变量替换、代码压缩、雪碧图合并等等。


### 插件机制

我们通过上面也可以看出 **PostCSS** 的插件机制是其核心特性之一，它使得可以灵活地扩展和定制 **CSS** 处理过程。插件本身没有什么复杂的，复杂的是我们很难想出一个好的 `idea` 去处理 **CSS**。

**PostCSS** 中的插件可以是一个函数，也可以是一个对象。

#### 插件定义

我们以函数式插件为例，每个插件函数都会接收一个 **AST** 作为输入，并返回一个新的 **CSS AST** 或已修改的 **CSS**。插件函数具有以下签名：

```js
function pluginName(css, options) {
// 插件逻辑...
    return modifiedCss;
}
```

-   `css`：表示输入的 **AST**。
-   `options`（可选）：插件的配置选项。

#### 插件调用

如果我们单纯地使用 **PostCSS**，而不是结合一些打包工具，如 **Webpack** 使用的话， 那么插件我们可以通过 `postcss()` 函数来调用，并以插件函数作为参数。例如：

```js
const postcss = require('postcss');
const myPlugin = require('postcss-my-plugin');

const processedCss = postcss()
.use(myPlugin)
.process(cssCode, { /* 配置选项 */ })
.css;
```

`process()` 方法用于处理 CSS，并返回一个 `Promise` 对象。调用 `css` 属性可以获取处理后的 CSS 代码。

我们通过一个非常简单的案例来感受一个插件强大之处：

```js
const postcss = require('postcss')
const originCSS = `
* { 
    margin: 0;
    padding: 0;
}
body {
    width: 100%;
    height: 100vh;
}
`
postcss().use(function (root) {
    root.walkDecls(decl => {
        if (decl.value == '0') {
            decl.value = '0px'
        }
    })    
    return root
}).process(originCSS).then(res => {
    console.log(res.css);
})
```

这个插件的作用非常简单，就是把我们一些属性值为 **0** 的情况自动设置成 **0px**。就是这么简单的一个功能，我们也称之为一个插件，所以大家不要感觉插件是一件很复杂的事情。

原始的 **CSS** 为：

```css
* { 
    margin: 0;
    padding: 0;
}
body {
    width: 100%;
    height: 100vh;
}
```

最终的输出 **CSS** 为：

```css
* { 
    margin: 0px;
    padding: 0px;
}
body {
    width: 100%;
    height: 100vh;
}
```

可能有些同学对如何运行上述代码存有疑问，大家不要着急，下小节我们会具体讲解如何开发一款 **PostCSS** 插件。


#### 插件链式调用

通过上面，我们学会了一个插件如何运行并处理了 **CSS**，那如果多个插件调用，我们就可以通过链式调用的方式组合起来。例如：

```js
postcss()
.use(plugin1)
.use(plugin2)
.use(plugin3)
.process(cssCode, { /* 配置选项 */ })
.then(res => res.css);
```

在处理过程中，每个插件会依次接收上一个插件处理后的 **AST**，并对其进行操作和转换。

插件的调用顺序非常重要，它会影响 CSS AST 的转换结果。通常，应该遵循一些约定俗成的顺序来组织插件。例如，先执行需要处理整个 CSS 的插件，然后是与选择器相关的插件，最后是处理属性和值的插件。

我们再把上面的代码添加一个新的插件，再来运行看一下效果：

```js
const postcss = require('postcss')
const originCSS = `
* { 
    margin: 0;
    padding: 0;
}
body {
    width: 100%;
    height: 100vh;
}
`
postcss()
.use(function (root) {
    root.walkDecls(decl => {
        if (decl.value == '0') {
            decl.value = '0px'
        }
    })    
    return root
})
// 添加了一个新的插件
.use(function (root) {
    root.walkDecls(decl => {
        if (decl.value == '0px') {
            decl.value = '0rem'
        }
    })
    return root
}).process(originCSS).then(res => {
    console.log(res.css);
})
```

我们在上面的基础上添加了一个新的插件，这个插件作用是把第一个插件处理的 **0px** 再继续转化成 **0rem**。

最后的 CSS 代码如下：

```css
* { 
    margin: 0rem;
    padding: 0rem;
}
body {
    width: 100%;
    height: 100vh;
}
```

**上述代码没有实际意义，但却很好地解释了 PostCSS 的插件调用过程。**

通过使用 **PostCSS** 的插件机制，我们可以通过编写自定义插件来实现各种 **CSS** 处理逻辑。这使得 **PostCSS** 非常灵活和可扩展，符合开发者对于定制化 **CSS** 处理的需求。

大体流程如下：

```tex
start
-> 解析 CSS 代码为 CSS AST
-> 依次调用插件处理 CSS AST
   -> 插件1
   -> 插件2
   -> ...
   -> 插件N
-> 转换 CSS AST 为 CSS 代码
end
```

### 常用的插件

PostCSS 提供了许多常用的插件，以下是其中几个常用的插件。

-   Autoprefixer：自动添加浏览器前缀。它根据 **Can I Use** 上的数据，自动为 **CSS** 属性添加所需的浏览器前缀，以确保在各种浏览器中获得最佳的兼容性。

-   cssnano：用于压缩 **CSS** 代码，减小文件体积。它可以删除注释、空格、重复的样式声明，并将颜色、属性等进行优化，以生成更精简的 CSS 代码。
-   postcss-import：支持在 **CSS** 文件中使用 **@import** 导入其他 **CSS** 文件。它可以帮助组织和管理 **CSS** 代码，使代码更易于维护。
-   postcss-url：用于处理 **CSS** 中的 **URL**，并可以自动重写（rewrite）或内联（inline）文件。它可以在处理 **CSS** 代码时修改和管理其中的 **URL** 引用。
-   postcss-px-to-rem：将像素单位 **px** 转换为 **rem** 单位，以实现响应式布局。它可以自动将像素单位转换为 **rem** 单位，并根据设备上的根字体大小（**root font size**）进行相应的缩放。

**postcss** 的强大之处得益于有足够多的插件，所以如果我们想要实现某个功能可以先去**postcss** 官网（[PostCSS Plugins](https://postcss.org/docs/postcss-plugins#control)） 看一下有没有对应的插件。



## 写在最后

本小节主要是针对 **PostCSS** 展开来讲，我们在开篇的时候通过列举两个在实际开发中遇到的场景来加深对 **PostCSS** 的理解。

然后我们详细说明了什么是 **AST 树**，其在 **PostCSS** 中有着主导的地位，它贯穿了整个插件的调用过程。通过一个示例我们加深了对 **AST 树**的理解，其本质是就是**一个庞大的 JavaScript 对象**。

最后我们说明了 **PostCSS** 中最重要且最核心的插件，及其执行过程，插件本身并不难以理解，只要多动手实践一定可以写出符合工作中需要的插件。

整体来说，**PostCSS** 是一款专业处理 **CSS** 的工具，它更像是一个平台，具体工作的是一系列的插件，其提供了大量的 **API**，供插件调用，这样可以满足我们日常开发中遇到的各种各样的需求。