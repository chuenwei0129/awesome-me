关于组件分割：

1，页面里看上去像个组件的局部，就应该是个组件。看上去不像组件的局部，也未必不应该是组件，大部分时候，分割组件用力过猛，比分割不足强。

2，组件是树形分级的，不是一个局部封装成了组件，它内部就不需要再分组件了，要层层细分。

3，凡是“肚子”里内容有可能变化的区域，都应该抽取成与内容无关的容器组件，包括不限于弹框，卡片，下拉，message。

1，组件接口应该是尽量抽象的，而不应该过分具体。比如一个代表 logo 的 prop，就不宜假设 logo 一定是一个 http 开头的 url，因为实际使用完全有可能是一串 base64 字符串，或者一个 image 组件实例。

2，与上一条有点相关，组件 prop 应当具备重载性，比如凡是接收正则表达式的 prop，都应该同时允许接收一个 js 函数，从而支持高度定制。

3，如果你不确切知道什么时候用非受控组件，你应该永远封装受控组件，直到你非常清楚什么情况下受控组件不好用为止。

4，组件的 prop 应该具备统一的语义，比如 onClick 应该永远是我们熟知的那个意思，并且它接受的实参类型也应该符合直觉。

5，组件的 prop 应该具备统一范式，比如所有的回调类 prop 都应该有一个什么都不做的函数作为默认值。再比如如果一个组件的文案类 prop（比如 title）不支持多语言，那么所有组件的所有文案类 prop 都应该忽略多语言问题。

3，绝大部分组件，不管是组件库中的组件还是业务项目中的组件，都不该引用全局数据流。

4，请务必重视组件的渲染次数问题，你的组件的渲染次数可能比你以为的要多的多。什么情况下应该用非受控组件呀？比如 onchange 输出的状态数据很大，也不 immutable，一来一回比较费时，然而外部除了存储一下之外确实也没啥要中途改动的诉求。 -->

brew services start mysql
设置 root 密码：
首次运行 MySQL 服务后，系统会提供一个临时的初始密码。运行以下命令来设置 root 密码：

mysql_secure_installation
按照提示，设置 root 密码并进行其他安全设置。

验证安装：
使用 MySQL 客户端 (例如 MySQL Workbench 或终端中的 mysql 命令) 连接到 MySQL 服务器，确保你可以成功登录。

假如你是一位诗人，请你结合我提供给你的内容元素、主题，为我写出符合文体、体裁的诗词，段落内容不要重复。

我要求的诗词词牌名为满江红，文体如下：

“” “遣步春风，乍回首、虹霓夜落。
况薄衾，难消寒雨，春风犹恶。
年岁一如流水去，无常总似穿心槊。
算人生，长是不如意，苦中乐。
人成各，今非昨。于前路，难相酌。
伫倚故桥边，难填心壑。
数载相知何忍负，阴差谁料成阳错。
更如今，难忍泪偷弹，寒声薄。
” “”

我的内容：
“” “发现自己总爱用 “以后” 作为承诺的前提，抛出一个模糊的臆想，让对方也跟着期待，仿佛眼前的山在下一刻会被时间移平。
可在那些我忘记掉的时刻，总有人拾起当时的话来问：“你还记得吗？我在等待它的发生。”
于是心脏被小小地锉了下，愧疚也扑面而来。
我会多说此刻，多讲现在。
” “”

brew services start mysql
设置 root 密码：
首次运行 MySQL 服务后，系统会提供一个临时的初始密码。运行以下命令来设置 root 密码：

mysql_secure_installation
按照提示，设置 root 密码并进行其他安全设置。

验证安装：
使用 MySQL 客户端 (例如 MySQL Workbench 或终端中的 mysql 命令) 连接到 MySQL 服务器，确保你可以成功登录。

假如你是一位诗人，请你结合我提供给你的内容元素、主题，为我写出符合文体、体裁的诗词，段落内容不要重复。

我要求的诗词词牌名为满江红，文体如下：

“” “遣步春风，乍回首、虹霓夜落。
况薄衾，难消寒雨，春风犹恶。
年岁一如流水去，无常总似穿心槊。
算人生，长是不如意，苦中乐。
人成各，今非昨。于前路，难相酌。
伫倚故桥边，难填心壑。
数载相知何忍负，阴差谁料成阳错。
更如今，难忍泪偷弹，寒声薄。
” “”

我的内容：
“” “发现自己总爱用 “以后” 作为承诺的前提，抛出一个模糊的臆想，让对方也跟着期待，仿佛眼前的山在下一刻会被时间移平。
可在那些我忘记掉的时刻，总有人拾起当时的话来问：“你还记得吗？我在等待它的发生。”
于是心脏被小小地锉了下，愧疚也扑面而来。
我会多说此刻，多讲现在。
” “”

---
nav:
  title: 指南
  order: -1
group:
  title: 介绍
  order: -1
---

# 这是什么？

> ❤️ 没有经过整理的知识才是徒然浪费时间，伤透脑筋！

对于所有的问题，我都希望得到一个很漂亮的回答，**一个让人一眼看过去就茅塞顿开的回答**。实际上这是很难的。就好比人们总是希望一句话就说清楚生活的意义是什么。实际上也是很难的。

**怀揣着这种不确定感继续学习，不要有知识包袱，不要假装自己很聪明**。这个世界本身就是抽象又复杂的。这没什么大不了。

**内容**：

博客
知识库
组件库
hooks 库
工具库

# 刷点面试题

：muscle： ：rocket：约束自己每天都在这个仓库下更新新的问题。

答案在问题下方的折叠部分，点击即可展开问题。祝我好运：heart：

我以前记录过相似面试题，我问的时候一般从统计次数最多的标签问起，再循序渐进问最多的三个标签，再让候选人考虑出现次数同样多的情况。

![F8g9YGhbYAAwYkx](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/F8g9YGhbYAAwYkx.jpeg)

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/v2-28f6f7db565f706637a119248f576ce6_1440w_副本.png)

![twitter_aesthetic content(@animesvibes__)_20230422-200640_1649867335686029312_photo](<https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/twitter_aesthetic%20content(%40animesvibes__)_20230422-200640_1649867335686029312_photo.jpg>)

我想做继续写代码

但上学要五年

我毕业时已经 45 岁了
无论你做什么五年后
你都会变成 45 岁

既然如此你不想 45 岁时是兽医吗

前端工程化的主要目的，就是通过规范化的流程和自动化的工具，提高代码质量，提升开发效率，让开发者能够更专注于业务逻辑的编写，而不用过多地关注构建和部署等繁琐的工作。

前端工程化的主要目的，就是通过规范化的流程和自动化的工具，提高代码质量，提升开发效率，让开发者能够更专注于业务逻辑的编写，而不用过多地关注构建和部署等繁琐的工作。

如果是视图，多加几个状态 (data/error/loading)，多来几次判断就能解决了。

如果有依赖关系，就用 watch/computed 转一下，注意数据的流动关系就好了。

尽量别用生命周期，因为生命周期钩子函数 Q 是同步调用，对于传递的异步函数 Q 参数它也不会等你。比如 onMounted，它是子组件先调用，再到父组件，如果你在父组件获取数据，传递给子组件，而子组件在 onMounted 里铁定拿不到。

不用学什么乱七八糟的，也不用想得太复杂。

使用全局变量做状态共享 Q 其实也可以，只不过要考虑以下几类问题，最终还是会演变成如今这个景象：

单例、保活

ESM 没有可见性机制，也就是 export 的元素可以在任意位置 import，你需要进行命名空问 Q 管理，并且谨防协作时出现问题

全局变量既然是全局的，它的生命周期自然是随着应用共存亡，当然你也可以用特殊手段使其惰性初始化与析构

全局也意味着是单例，想复用就必须封装成工厂

当然，以上几点都可以加强人员培训/管理缓解，但心智负担增大，一个人的武林 Q 那就无所谓。

分时代。

据说搁以前，书稿的排版与上色是分开做的，到了 Web 开发初期便沿用了这一 “规则”，即所谓的关注点分离。

但是搁现在，在组件化开发、模块化 Q 开发的浪潮下，结构与样式 “融合” 起来显然能减少维护的心智负担。

比如 Tailwind，比如编程上下文统一 (JS/TS) 的 styled-componentsQ 等是趋势，这些库的意图很明显，主要解决 CSS 强依赖 HTML 结构与缓解 CSS 不正交的问题，强调结构 Q 与样式融合 (至少是书面形式上的融合)，提高可维护性，但可读性 Q 就会相对降低。

而过往的 Less/Scss 等预处理方案，更强调的是可编程性与可复用性，但是嵌套语法依然是对 HTML 结构的再一次复刻。

而 css-modules 更为粗暴，扁平化，命名无关化，心智负担极低，但是可编程性太弱。

而过往的 Less/Scss 等预处理方案，更强调的是可编程性与可复用性，但是嵌套语法依然是对 HTML 结构的再一次复刻。

而 css-modules 更为粗暴，扁平化，命名无关化，心智负担极低，但是可编程性太弱。

样式书写方案五花八门，其原因在于 CSS 太过复杂又不好扩展，不过可以期待一下 CSS Houdini 系列的 API，开放 CSS 可元编程 Q 的能力，届时 CSS 与 HTML 应该会发生一场革命。

所以，有些规范并不能适用于每一个 “阶段”，保守式思维 Q 也会成为阻碍。至于优化方面，没有什么是编译器做不了的 (。

只针对问题点评价。

1。不是用了 class 就是 OOP，诚然，不是写个 Function 就是 FP。

2。视图交互·和业务交互耦合不是一个最佳实践。

3。站在前端的角度来说，复刻一个 Model 再赋予行为，实际上就是一个 Service，如何以及何时实例化无非就是单例与多例 Q 的区别，这个看业务场景而定。

4。TS 如果只是用来弥补编辑器的智能感知~，并且不写类型体操的话，JSDoc 也不是不行。

但是从以上的简述来看，第 2 和第 3 点是冲突的，可能是每个人的理解有偏差。

并且每个人的<标准>不同，这里的每一点都可以单独拎出来长篇大论，很难说得清楚，只有实践过才知道。

1。在响应式编程 Q 中，要转化成响应式的一般是数据，数据转化之后被称为状态。

2。状态往往需要复用 (组件共享 Q)，并且是非持久化的，这也就意味着这些状态在整个应用的生命周期内，需要互相、交替、层层传递。

3。因此为了缓解错综复杂的 “状态流动” 维护链路，引 l 入了状态管理库 Q 的概念。例如 Redux，真本质上就是一个 “全局的、单例的” 数据源，同时贯彻数据与行为分离。

但相应的也带来了其它问题：“全局” 何必是 “应用全局 9”？

整个应用的所有状态交由一个仓库管理 9，再根据命名或类型划分 (module/namespace) 之后分发，分散在各地的行为，不符合模块化开发的高内聚性标准，并且每个状态大多数时候只会被若干个组件所共享，当这些组件不在生命周期內时，这些全局状态有没有必要保活？

全局的数据源，为何不是 “模块全局 Q”，仅该模块下可用？

反正有依赖注入的 “特性” 就不会再有 “状态管理库” 的需求，持久化也不是状态管理库所要做的事。[捂脸]
运行时校验是给不玩 TS 的人用的。

如果项目用了 TS，还用运行时校验，那就是纯纯的。。。

如果项目用了 TS，并且运行时校验和 Q 编译时校验混用，那就是纯纯的大。。。

**笔记内容**：[Make Web Great Again](#make-web-great-again) | [工具用的好，下班回家早](#工具用的好下班回家早) | [这就是前端](#这就是前端) | [Make Web Great Again](#make-web-great-again) | [前端工程化](#前端工程化) | [计算机基础知识](#计算机基础知识)

## 面试

- `[FE]` [找工作前准备](interview/index.md)

## Make Web Great Again

> Always bet on JavaScript, Because there is only JavaScript.

- `[HTML]` [Is HTML a programming language?](html/html.md)
- `[CSS]` [是煮，是煮在又一次严重酗酒后创造了这个奇迹。](css/css.md)
- `[JavaScript]` [My life sucks and I'm going to rewrite it in JavaScript.](js/js.md)
- `[TypeScript]` [You mastered Typescript but you're still not her type](ts/ts.md)
<!-- - `[FE]` [我在知乎学前端](interview/fe.md) -->
- `[Vue]` [You finally mastered vue, but she still disappears from view](framework/vue.md)
- `[React]` [You learned react, your crush is online but you can't react](react/react.md)
<!-- - React is not reactive. Vue is not only view. -->
<!-- - `[Hacker]` 都什么年代了，还再写传统 JS -->
<!-- - `[Component]` 组件库，但无 UI -->
<!-- - `TODO` [人类高质量函数式编程学习笔记](summary/fp.md) -->
- `[Browser]` [到达前端最高城！](computer/browser.md)

## 工具用的好，下班回家早

> 折腾工具而不干活就是感觉很爽

- `[Mac]` [最傻逼的用户，被 macOS 百般折磨后，努力至今终尝回报，突然得到了最强使用技巧！](others/mac.md)
- `[Windows]` [呼呼… Windows 酱… 抱歉了呢… 我可能回不去了…… 能够出生，并与你相遇，真是太好了！](others/win.md)
- `[Terminal]` [只用命令行就能覆盖所有操作而且能提升工作效率的终端使用技巧你喜欢吗？](others/terminal.md)
- `[VSCode]` [VSCode 因为插件丰富、功能强大被大家喜欢，真是令人烦恼啊！](others/code.md)
- `[Git]` [怕遗忘 Git 的我，把相关知识点都记录下来就对了！](others/git.md)
- `[Switch]` [关于我破解了 Switch 并且装满了游戏依然吃灰这件事。](others/switch.md)

## 前端工程化

> js 是世界上最好的语言，php 是比 js 还要好的语言

- `[Node]` [Node 版本管理和 npm 包管理](engineering/node.md)
- `[Babel]` [前端领域需要哪些转译器](engineering/ast.md)
- `[Webpack]` [webpack 配置指北](engineering/webpack.md)
- `[Webpack]` [webpack 原理分析与思考](engineering/pack-origin.md)
- `[Create React App]` [记录一次 react 环境配置](engineering/cra.md)

## 计算机基础知识

> 时光荏苒，岁月如梭。每一个框架或者库只能陪你走一段路，最终都会逝去。留在你心中的，不是一条一条的语法规则，而是一个一个的思想，这些思想才是推动进步的源泉。

- `[Network]` [计算机网络怎么学？](computer/network.md)
- `[CS]` [谁还不是个科班出身了？](computer/computer.md)
- `[Program]` [精确本身就是祛魅。](computer/program.md)
- `[Algorithms]` [我接触过的前端数据结构与算法。](computer/data.md)
- `[Data structure]` [救救孩子，数据结构自学攻略](summary/data-structure.md)
- `[Algorithms]` [程序员界的《五年高考，三年模拟》—— LeetCode](summary/leetcode.md)

## 醍醐灌顶

> 崔颢题诗在上头

## 他山之石

> TODO

- [React Status 中文周刊](https://docschina.org/weekly/react/)
- [云音乐技术团队](https://www.zhihu.com/org/yun-yin-le-qian-duan-ji-zhu-tuan-dui)
- [前端精读](https://github.com/ascoders/weekly)
- [Hello Github 有趣、入门级的开源项目](https://hellogithub.com/)
- [为了不折腾而去折腾的那些事](https://www.zhihu.com/column/funny)
- [阿里妈妈前端快爆](https://www.zhihu.com/column/mm-fe)
- [初级前端工程师](https://www.zhihu.com/column/makewebgreatagain)

<!-- 一个充满了既神奇又无用的 JavaScript 知识的合集。为什么要研究这些？因为它就在那儿呀！ -->
