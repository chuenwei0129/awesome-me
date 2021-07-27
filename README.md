# 保持好奇心

> 没有经过整理的知识才是徒然浪费时间，伤透脑筋！

**笔记内容**：[好看是第一生产力](#好看是第一生产力) | [JavaScript](#javascript) | [浏览器](#浏览器) | [构建工具](#构建工具) | [CSS](#CSS) | [前端武器库](#前端武器库)

## 好看是第一生产力

- `[Windows]` [Windows Terminal 完美配置 PowerShell](win/win_terminal.md)
- `[Windows]` [打造完美的、纯净的 Windows 开发环境](win/win_env.md)
- `[Windows]` [Windows 日常使用的技巧](win/win_tips.md)
- `[Windows]` [我的 Windows 工具清单](win/win_tools.md)
- `[MacOS]` [我的 MacOS 工具清单](mac/mac_tools.md)

## JavaScript

- `[基础]` [JavaScript 基础知识梳理(一)](js/js_base.md)
- `[函数]` [JavaScript 基础知识梳理(二)](js/js_function.md)
- `[对象]` [JavaScript 基础知识梳理(三)](js/js_object.md)
- `[数据结构]` [JavaScript 基础知识梳理(四)](js/js_data_structure.md)
- `[类]` [JavaScript 基础知识梳理(五)](js/js_class.md)
- `[异步]` [JavaScript 基础知识梳理(六)](js/js_promise.md)
- `[杂项]`[JavaScript 基础知识梳理(七)](js/js_other.md)
- `[正则]` [JavaScript 基础知识梳理(八)](js/js_regexp.md)
- `[手写]` [JavaScript 基础知识梳理(九)](js/js_code.md)

## TypeScript

- `[基础]`[写给自己的 TypeScript 教程(一)](ts/ts_1.md)
- `[进阶]`[写给自己的 TypeScript 教程(二)](ts/ts_2.md)
- `[思考]`[写给自己的 TypeScript 教程(三)](ts/ts_3.md)
- `[实践]`[写给自己的 TypeScript 教程(四)](ts/ts_4.md)

## 框架

- `[vue]`[vue 知识点梳理](web/vue.md)
- `[axios]`[axios 学习指南](web/axios.md)
- `[Node]` [Node 版本及源管理](others/nvm.md)
- `[react]` [关于 React 的一切（一）](web/react1.md)
- `[react]` [关于 React 的一切（二）](web/react.md)

## 浏览器

- `[DOM]` [DOM 基础知识整理](web/dom.md)
- `[HTML]`[网页元素](web/element.md)
- `[坐标]` [窗口、坐标和滚动](web/scroll.md)
- `[事件]` [事件和表单](web/event.md)
- `[渲染原理]` [浏览器渲染原理](web/browser.md)
- `[二进制]` [前端操作文件和二进制数据](web/data.md)
- `[HTTP]` [什么是 HTTP](web/http.md)
- `[Cookies]` [数据存储、安全和鉴权](web/cookie.md)
- `[网络请求]`[网络请求](web/xhr.md)
<!-- - `[Web components]`[浅尝 Web components](web/component.md) -->

## 构建工具

- `[基础配置]` [渐进式的学习 Webpack](webpack/webpack_base.md)
- `[进阶原理]` [Webpack 从入门到入土](webpack/webpack_high.md)

## CSS

- `[知识整理]` [CSS 查漏补缺](web/css.md)
- `[基础实践]` [CSS 居中和三栏布局](web/layout.md)

## 前端武器库

- `[Vscode]` [Vscode 使用指北](web/code.md)
- `[ESLint]` [搞懂 ESLint 和 Prettier](ts/eslint.md)
- `[Chrome]` [Chrome DevTools 面板全攻略](ts/devTool.md)
- `[Markdown]` [Markdown 的基本撰写和格式语法](others/markdown.md)

## 技术思考

<!-- 命名 - 让人秒懂
变量 - 使用合理，不多不少
嵌套 - 越少越好
行数 - 合理即可。即不是奇技淫巧的 one-line 怪，又不是像整天操心你安全的妈妈，各种唠叨
原理 - 通俗易懂，最好使用大家都明白的数据结构和算法知识
写法 - 最好是 language-agnostic，即可以方便的迁移到主流编程语言 -->

<!-- - `[奇技淫巧]` [JavaScript 中的奇技淫巧]() -->
<!-- 开发技巧 -->

<!-- ## 设计模式
## 算法 -->

<!-- 知乎问题 -->

  <!-- - `[Git]` [Git 简单学习与高频使用的命令] -->
  <!-- - `[SSH]` [使用 SSH 登录 Linux 实例](others/ssh.md) -->

<!-- 我答的是一些表单配置化、拖拽、业务组件、微前端等等（其实前面两个我都没做过，就顺便提了一下），管理系统因为没有设计师，所以体验想要做好就更要细心去考虑各种情况。现在比较火的 low code 也很适合中后台管理系统这个场景。 -->
<!-- 一套后端管理页面都要专门定制一套（自我感觉）没卵用的UI样式 -->
 <!-- Maybe we don't need a better program, we need a smarter person -->
 <!-- 中后台业务虽然看起来样子比较简单，但实际业务逻辑非常复杂，你见过 800 个字段的表单么，极限情况下写代码总是最好的解决办法。实际上发明一个 dsl 不过是换了种语言来解决问题，除非跟业务高度 match（那就意味着覆盖面不广），否则不好用。我们团队目前在做的尝试是，让业务方提供接口、模型等等形式的数据描述，然后机器生成带全功能的页面，对于不满足需求的部分，仍然可以基于生成产物进行修改，当然这种变更是单向的。目前我们只做了表单表格，幸运的是短短半年已经有 超过 40% 的代码是这样生成的了，目前正在计划把这套功能推到整个应用研发上。 -->
<!-- 前端天坑集锦
上传组件（IE / Flash 时代）
动态表单
拖拽生成页面
工作流引擎
富文本编辑器
Web IDE
写一个新系统，还原老系统的所有功能
停机问题（别笑 -->
<!-- 当表单需要和其他地方联动 -->
<!-- 还有数据可视化 -->
<!-- 笑死，前司做的一个系统就是，重构老电子流系统，变成在线的拖拉拽开发电子流的系统。上面的点全部中枪，（我只是做后台管理的 -->
<!-- 前端考验五——监控、日志与灰度

我习惯将监控、日志和灰度称为前端三板斧，是衡量一个前端团队是否专业的重要指标。 -->

<!-- fiber 并不会减少 diff 时间，只是将diff 精确分割，优先级概念， -->

<!-- 单独开发多个提升工作效率的前端工具

独立设计大前端公共架构服务多个项目

多次组织前端项目重构并担任核心开发

撰写16件技术专利并成功提交专利保护

连续三年蝉联部门专利输出数量前两名 -->
<!--
项目
炉石传说游戏相关业务

暗黑破坏神游戏相关业务

阴阳师游戏相关业务

我的世界游戏相关业务

网易大神社区相关业务

NGP游戏平台社区相关业务

网易职位内推系统

网易沙龙课程系统

网易人力管理系统

大前端项目公共架构

职责
负责前端项目自动化构建脚手架的设计、开发、测试和维护

负责前端项目开发的需求对接、技术沟通、主导开发和上线部署

负责前端项目重构的整体设计、组件规范、接口管理和工具整合

负责大前端项目公共架构的整体设计、文档撰写和开发维护

负责Web应用和Node应用的核心开发和任务分发

负责编码规范定制和技术文档管理

成绩
单独开发多个提升工作效率的前端工具

独立设计大前端公共架构服务多个项目

多次组织前端项目重构并担任核心开发

撰写16件技术专利并成功提交专利保护

连续三年蝉联部门专利输出数量前两名

前端组长
高级前端开发工程师
2015.06 ~ 2017.08
碧桂园／互联网技术中心
项目
诚加装饰官网网站

橙家装饰官网网站

橙家家居移动客户端

橙师傅移动客户端

橙家体验馆移动客户端

橙家数据中心桌面客户端

橙家产品管理后台系统网站

职责
负责前端项目自动化构建脚手架的设计、开发、测试和维护

负责前端项目开发的需求对接、技术沟通、主导开发和上线部署

负责Web应用和Node应用的核心开发和任务分发

负责后台系统的需求设计和数据接口的功能设计

负责编码规范定制和技术文档管理

成绩
2016年度碧桂园最佳进步奖

2017年度碧桂园最佳员工奖

撰写16件技术专利并成功提交专利保护

部门首位前端且参与部门所有前端项目建设

连续两年担任前端组长并带领组员开发多个前端项目 -->
