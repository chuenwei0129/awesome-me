你可以通过在 VSCode 的命令面板调用命令 Developer: Startup Performance 查看各个扩展的在 VSCode 启动时的加载时间。

功能已经被 VSCode 内置
文中列出的数据为文章最后更新时的数据，不保证具有时效性，Last updated 为该扩展最后一次发布到 VSCode 扩展市场的时间。

Path Intellisense

其实 VSCode 自身已经支持在 import/require 也就是导入语句中使用路径补全，但是在其它场景中写路径字符串时还是没有提示。如果你觉得在导入语句中有路径补全已经能够满足你的使用需求，那我觉得这个插件可以考虑卸载了。类似的还有 Path Autocomplete。

Auto Close Tag
Last updated: 2018/2/17
Issues open/close: 100/59
Download: 2.6M
从侧边栏可以看到我一个扩展都没打开，实测在 HTML, js, jsx, tsx 文件中已经内置支持自动闭合标签功能，但是 vue 还是不支持，可以看一下我提的 issue：auto close tag doesn't work in vue file。

这个扩展的作者开发了很多优秀的 VSCode 扩展，包括这个和下面的 Auto Rename Tag，最有名的应该是 Code Runner。我觉得有些扩展的功能被内置一方面也是好事，毕竟人的精力是有限的，维护开源项目还是很累的。

Auto Rename Tag
Last updated: 2019/10/27
Issues open/close: 453/71
Download: 2.6M
直接使用快捷键 F2 重构即可，不需要安装扩展。auto close tag 和 auto rename tag 的扩展包 Auto Complete Tag 也可以考虑卸载了。

通过设置 "editor.renameOnType": true（默认没开启），你可以达到和 auto rename tag 一毛一样的效果 , 如果你想只在某种特定语言中开启这个特性，可以参考下面的配置：

// settings.json
"[html]": {
    "editor.renameOnType": true,
  },
还有一款也是这个作者开发的扩展 Terminal 早就在 2017/7/22 就不维护了，下载量高达 581 K。不维护的理由作者在扩展主页上也说了，一个是 Code Runner 的功能比它还多，另一个是 VSCode 已经内置了这个扩展的部分功能。

Document This
Last updated: 2018/6/4
Issues open/close: 64/124
Download: 638K
VSCode 已经内置自动生成 jsdoc 和注释补全功能。

尤其是前端开发，所以那些基础特性即便是现在没内置，必然在将来某个版本会被内置。 Auto Import, TypeScript Hero, TypeScript Importer, Move TS 都可以考虑卸载了。安装量最高的 auto import 下载量高达 867K，最少的都有 250 多 K。

维护不积极
Color Highlight
Last updated: 2017/7/12
Issues open/close: 49/25
Download: 894K
可以考虑 vscode-colorize 作为替代品。

TODO Highlight
Last updated: 2018/7/22
Issues open/close: 45/93
Download: 953K
推荐替代品 Todo Tree，下面是参考了 TODO Highlight 源码中的色彩配置修改 Todo Tree 配置的后使用效果：






推荐配置：

// settings.json
"todo-tree.general.tags": ["TODO:", "FIXME:"],
"todo-tree.highlights.defaultHighlight": {
    "gutterIcon": true
},
"todo-tree.highlights.customHighlight": {
    "TODO:": {
        "foreground": "#fff",
        "background": "#ffbd2a",
        "iconColour": "#ffbd2a"
    },
    "FIXME:": {
        "foreground": "#fff",
        "background": "#f06292",
        "icon": "flame",
        "iconColour": "#f06292"
    }
}
Live Server
Last updated: 2019/4/17
Issues open/close: 332/326
Download: 4.8M
live server 确实是个好东西，能让你修改 HTML 代码时自动刷新网页，最主要的是它是以真实的服务器托管的网页，而不是像我们直接用浏览器打开文件时是使用 file:// 协议托管的，更贴近实际生产环境，file:// 协议还会导致跨域等问题。

这个扩展其实从更新时间上来看也不算太长没更新，主要是你去它的 github issue 页面 一看，有很多和性能相关的 issues，这个扩展的作者是个印度小哥，在扩展市场的主页也置顶说了他最近非常忙，在找人维护这个项目。

我翻看了这个作者的 github 仓库，发现他 fork 过 liver-server 这个 npm 包，但是这个包 18 年 10 月就不更新了。目前我也没发现合适的替代品，有需要的读者我觉得可以继续用。






Bracket Pair Colorizer 2
Last updated: 2019/11/29
Issues open/close: 187/38
Download: 779K
进 github issues 页面 看，一堆 issues 没人理，和很多不维护的扩展一样，最多的就是导致 CPU 占用过高的问题。这个功能我感觉官方不太可能会集成，搜了一下 VSCode 中这个作者提的 issues，将近有 60 个，但也没提 issue 让官方考虑集成这个功能。有评论问我这个扩展有啥好的替代品，我其实也没发现什么好的替代品，有一个同类型的 Rainbow Brackets 更不靠谱，它 16 年 5 月 9 号上架的，5 月 12 号到现在就一直没更新过，总共也就维护了几天。我目前就是使用内置的缩进线，其实也够用了，而且我发现自从不用这个插件，代码的配色都清爽多了。

另一个和缩进线相关的扩展 indent-rainbow 也有一年没维护了。

import-cost
Last updated: 2018/11/30
Issues open/close: 81/57
Download: 581K
import-cost 是 wix 开源项目下的 VSCode 扩展之一，另一个下载量比较高的扩展是 glean，是一个 React 重构扩展。想当初我刚入坑 VSCode 的时候这是当时被安利率最高的扩展之一。和前面说的几个扩展一样，有 CPU 占用过高的 issues，没人维护了。

Output Colorizer
Last updated: 2017/7/6
Issues open/close: 10/13
Download: 240K
冲这最后更新时间我也不敢用了啊，从 issues 来看都说这个扩展的功能已经失效。如果你只是想要 log 文件有色彩高亮的话，我觉得不需要安装扩展，貌似这是 VSCode 主题应该做的事情，默认主题已经支持 log 文件色彩高亮：






SVG Viewer
Last updated: 2019//28
Issues open/close: 21/20
Download: 431K
这个扩展是个日本小哥开发的，该项目已经放弃维护，github 仓库 都已经被封存了，推荐国人开发的替代品：vscode-svg2。

Regex Previewer
Last updated: 2018/4/27
Issues open/close: 23/13
Download: 172K
推荐在线工具 regex101。

vscode-fileheader
Last updated: 2016/8/10
Issues open/close: 19/5
Download: 143K
这个扩展自从第一次发布之后就一直没更新过... 推荐国人开发的替代品：koroFileHeader。

XML Tools
Last updated: 2019/6/1
Issues open/close: 53/171
Download: 1.7M
从 github issues 来看貌似没人维护了，同类的推荐替代品是红帽的 XML。

其它一些不推荐使用的扩展
TSLint
如果你还不知道 tslint 去年年初就被废弃了，并且现在是以插件的形式被集成到 ESLint 了，那你可能是个假前端。

Beautify
VSCode 内置的格式化器就是使用 js-beautify，但是前端界当前最流行的格式化工具是 prettier，建议安装 prettier，然后设置 VSCode 使用 prettier 作为格式化器。同样的道理，下载量奇高的 JS-CSS-HTML Formatter, Prettify JSON 等格式化插件也不推荐安装。

// settings.json
"[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[yaml]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
jshint
就没见几个开源项目还在用 jshint，推荐使用 ESLint。

JavaScript (ES6) code snippetsJavaScript (ES6) code snippets
如果你平时开发 React，那你极大可能也安装了 ES7 React/Redux/GraphQL/React-Native snippets，你可以去对比它俩提供的 snippets，后者基本上覆盖了前者提供的 snippets，除了 commonjs 的导入语句，也就是说后者没有 rqr 和 mde 的两个代码片段。snippets 扩展装多了是会影响代码提示的速度的，因为每次显示的补全列表都是到对应语言的 snippets 里面过滤出来的。

GitHub
这个扩展的作者推荐使用 github 官方开发的 GitHub Pull Requests 作为替代品。






IntelliSense for CSS class names in HTML





HTML CSS Support 和 IntelliSense for CSS class names in HTML 是功能差不多两个扩展，我更推荐使用前者，原因是它的贡献者中有 VSCode 的核心开发人员。

如何推荐别人使用一些扩展
我们可以在项目根目录的 .vscode/extensions.json 文件中配置一些推荐和不推荐使用的扩展，在扩展市场选择 Show Recommended Extensions 就可以看到我们推荐的扩展。

// .vscode/extensions.json
{
    "recommendations": [
        "editorconfig.editorconfig",
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode",
        "yutengjing.view-github-repository",
        "yutengjing.open-in-external-app"
    ],
    "unwantedRecommendations": [
        "hookyqr.beautify",
        "ms-vscode.vscode-typescript-tslint-plugin",
        "dbaeumer.jshint"
    ]
}





最后
VSCode 最近几个月一直都在做设置同步的功能，也就是 Settings Sync 做的事情，估计正式上线后这个扩展也可以考虑卸载了。以前写过推荐 VSCode 扩展的文章，那时我安装的扩展有 100 多个，现在也就将近 50 个左右，是越来越挑剔了。我自己也写了两个简单的扩展 View GitHub Repository 和 Open in External App，之前开发扩展后还提炼了一个 VSCode 扩展开发模板：vscode-extension-boilerplate，感兴趣的读者可以了解下。如果文章有什么错误之处或者读者有什么推荐的更好的替代品，欢迎在评论区指出。

最后奉上我的 VSCode 扩展 gist 地址：cloudSettings，可以搭配 Settings Sync 使用。

"todo-tree.highlights.defaultHighlight": {
"type": "text",
"foreground": "#FF8C00",
"background": "#000000",
"opacity": 0,
"gutterIcon": false
},

「直接使用快捷键 F2 重构即可，不需要安装扩展。」
----------
Rename Symbol 和 Auto Rename Tag 的功能和结果都不一样，Rename Symbol 会整个文件替换

VSCode 现在有 html mirror cursor 了（默认没开启） https://code.visualstudio.com/updates/v1_41#_html-mirror-cursor

但还不支持 JSX
https://github.com/microsoft/vscode/issues/85707

​1
​回复
​踩
​ 举报
余腾靖
余腾靖 (作者) 回复小小景2020-04-13
html.mirrorCursorOnMatchingTag 已经被废弃了，使用 "editor.renameOnType": true, 可以达到可 auto rename tag 一毛一样的效果。

怎么查看vs内置了哪些插件？[好奇]
​赞
​回复
​踩
​ 举报
孤辰
孤辰回复落叶不知秋01-12
点击扩展面板右上角第一个筛选图标，选项里就有内置

我这colorize装了以后不知道为啥显示不出来

​赞
​回复
​踩
​ 举报
余腾靖
余腾靖 (作者) 回复盛夏的清凉2020-04-07
默认只在这些语言显示： ["css", "sass", "scss", "less", "postcss", "sss", "stylus", "xml", "svg"]。别的语言要配置，参考：https://github.com/kamikillerto

谢谢回复
不过可能是更新了，这个命令改成了
>Developer: Show Running Extensions

这里解析几个常用配置项：

（1）editor.fontsize用来设置字体大小，可以设置editor.fontsize : 14;

（2）files.autoSave这个属性是表示文件是否进行自动保存，推荐设置为onFocusChange——文件焦点变化时自动保存。

（3）editor.tabCompletion用来在出现推荐值时，按下Tab键是否自动填入最佳推荐值，推荐设置为on;

（4）editor.codeActionsOnSave中的source.organizeImports属性，这个属性能够在保存时，自动调整 import 语句相关顺序，能够让你的 import 语句按照字母顺序进行排列，推荐设置为true,即"editor.codeActionsOnSave": { "source.organizeImports": true }；

（5）editor.lineNumbers设置代码行号,即editor.lineNumbers ：true；

```
{
  "files.associations": {
  "*.vue": "vue",
  "*.wpy": "vue",
  "*.wxml": "html",
  "*.wxss": "css"
  },
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
  "git.enableSmartCommit": true,
  "git.autofetch": true,
  "emmet.triggerExpansionOnTab": true,
  "emmet.showAbbreviationSuggestions": true,
  "emmet.showExpandedAbbreviation": "always",
  "emmet.includeLanguages": {
  "vue-html": "html",
  "vue": "html",
  "wpy": "html"
  },
  //主题颜色 
  //"workbench.colorTheme": "Monokai",
  "git.confirmSync": false,
  "explorer.confirmDelete": false,
  "editor.fontSize": 14,
  "window.zoomLevel": 1,
  "editor.wordWrap": "on",
  "editor.detectIndentation": false,
  // 重新设定tabsize
  "editor.tabSize": 2,
  //失去焦点后自动保存
  "files.autoSave": "onFocusChange",
  // #值设置为true时，每次保存的时候自动格式化；
  "editor.formatOnSave": false,
   //每120行就显示一条线
  "editor.rulers": [
  ],
  // 在使用搜索功能时，将这些文件夹/文件排除在外
  "search.exclude": {
      "**/node_modules": true,
      "**/bower_components": true,
      "**/target": true,
      "**/logs": true,
  }, 
  // 这些文件将不会显示在工作空间中
  "files.exclude": {
      "**/.git": true,
      "**/.svn": true,
      "**/.hg": true,
      "**/CVS": true,
      "**/.DS_Store": true,
      "**/*.js": {
          "when": "$(basename).ts" //ts编译后生成的js文件将不会显示在工作空中
      },
      "**/node_modules": true
  }, 
  // #让vue中的js按"prettier"格式进行格式化
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatterOptions": {
      "js-beautify-html": {
          // #vue组件中html代码格式化样式
          "wrap_attributes": "force-aligned", //也可以设置为“auto”，效果会不一样
          "wrap_line_length": 200,
          "end_with_newline": false,
          "semi": false,
          "singleQuote": true
      },
      "prettier": {
          "semi": false,
          "singleQuote": true
      }
  }
}
```

对于 行 的操作：

重开一行：光标在行尾的话，回车即可；不在行尾，ctrl + enter 向下重开一行；ctrl+shift + enter 则是在上一行重开一行
删除一行：光标没有选择内容时，ctrl + x 剪切一行；ctrl +shift + k 直接删除一行
移动一行：alt + ↑ 向上移动一行；alt + ↓ 向下移动一行
复制一行：shift + alt + ↓ 向下复制一行；shift + alt + ↑ 向上复制一行
ctrl + z 回退
对于 词 的操作：

选中一个词：ctrl + d
搜索或者替换：

ctrl + f ：搜索
ctrl + alt + f： 替换
ctrl + shift + f：在项目内搜索
通过Ctrl + ` 可以打开或关闭终端

Ctrl+P 快速打开最近打开的文件

Ctrl+Shift+N 打开新的编辑器窗口

Ctrl+Shift+W 关闭编辑器

Home 光标跳转到行头

End 光标跳转到行尾

Ctrl + Home 跳转到页头

Ctrl + End 跳转到页尾

Ctrl + Shift + [ 折叠区域代码

Ctrl + Shift + ] 展开区域代码

Ctrl + / 添加关闭行注释

Shift + Alt +A 块区域注释

Bracket Pair Colorizer

Path Intellisense

Import Cost

Turbo Console Log

ctrl + alt + l 选中变量之后，使用这个快捷键生成 console.log
alt + shift + c 注释所有 console.log
alt + shift + u 启用所有 console.log
alt + shift + d 删除所有 console.log

Code Spell Checker

JSON to Code

Colorful Comments

arrr

 100 Days of Code

 local history

  TODO Tree
Better Align

change-case

 Markdown All in One

 Error Lens

 Duplicate action

 A-super-translate

 TabNine
机器学习自动补全变量 / 学习模拟结构 ,自动补全。

可以智能识别写过的代码结构。

以css为简单例子 ，假如你前文写过多次

 height:1.07rem
 line-height: 1.07rem;
当你写
 height:22rem
再写line,会自动补全为

line-height: 22rem
还有,自动取名等强大的功能

内存劝退 ,大概占用200-300mb内存

 Image preview

 Quokka.js

 GitLens

 Drawio

 read-vscode-e

 daily-anime

 vsc-netease-music

 Trailing Spaces

 JSON5 syntax

 Code Runner

 filesize

 Rainbow Fart

 会了吧

 代码翻译

 npm

 emojisense

 Bookmarks

 Zhihu On VSCode
VSC Netease Music

random