---
title: Fetch
order: -1
toc: content
group:
  title: 浏览器工作原理
---

[为什么当今 Web 应用不都采用 WebSocket 形式进行数据交互？](https://www.zhihu.com/question/417163973)

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