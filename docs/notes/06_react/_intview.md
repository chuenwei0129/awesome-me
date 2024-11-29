# 写给自己的面试题

关于 react diff。react 的 diff 与 vue2 的 diff 有什么区别？与 vue3 呢？仅仅是 lis 吗？
关于 react fiber。fiber 的引入究竟对 react 有什么架构层面的影响，double fiber tree 是否有必要存在？
关于 react schedule。schedule 究竟以一个什么形式，什么规律来运行，中断和恢复呢？lane 解决了什么问题？
关于 vue。reactive core 有自己实现过吗？为什么要做这种启发式的 aot？slot 的实现？
关于 ng。脏检测怎么做到高性能？看过 svelte 的脏检测吗？ivy 是什么？增量 dom 和 virtual dom 的区别？ng 里模块化和分层 di 是怎么实现的？
关于 node eventloop。在 node 里，udp 和文件 api 任务什么区别吗？什么是快 io 什么是慢 io？nodejs 如何调度快慢 io 的？node10 之前的事件循环是怎么样的？libuv 是以一种什么样的趋向去调度 io 任务的？async task 的抽象是什么呢？什么是 tickcallback？
关于 node runtime。node 是怎么启动的？node 怎么 console 调试？console 什么时候注入 node 的？
关于 node addon。node_api 是一种什么抽象？jsvalue 为什么是 Object 的二级指针？cpp 和 js 层面的共享内存靠什么实现最为简单？ffi 是怎么实现的？
关于 v8。什么是 isolate？什么是 context？值的抽象？v8 是怎么管理内存的？怎么直接用 v8 api 写 node-addon？
关于 js 优化。自己会熟练使用 js profiler 吗？甚至是否是从未使用过？做过 ms 级别的优化吗？自己问的问题是否真的需要在 js trick 层面进行优化？
关于 js-native 框架。知道 js 到 native 端的详细通信过程吗？做过 binding 吗？知道 jsbridge 的实现吗？知道怎么热更新吗？知道热更新的原理吗？知道怎么手写 js 引擎去做热更新吗？
关于工程化。webpack5 是怎么做持久化储存的？mf 是怎么服务于微前端的，又是怎么解决 external 的问题的？mf 的原理是什么？hardsourceplugin 的原理是什么，它为什么这么快？lerna 的最佳实践？submodule 的最佳实践？webpack 和 gulp 怎么配合？tapable 究竟是什么抽象？
浏览器。render object 的晋升过程？css 和 dom 的融会时机？slp 和 raf 的时机？什么是 rafwithtimeout，存在的意义？vsync 影响了什么？为什么不要为滚动增加事件监听？为什么要 eval(“debugger”)？

全局变量本质上就是一个单例模式，redux 只是在单例模式基础上加了订阅机制、采用 reducer 约束修改，以及加上 middleware 机制保证扩展性。

如果自己实现一个，也会需要做这些事情。

因为一个全局变量在被改变之后无法驱动 React 组件重新渲染。

React 的核心价值观是：状态决定渲染结果，因此只有状态改变了才需要重新渲染。如果你用一个非状态的全局变量来保存状态，那任何一个 React 组件都不会因为这个全局变量的人改变而重新渲染。

在没有 hook 之前，Redux 通过 HOC 来解决这个问题。Redux 状态变化会触发 HOC 里的属性变化，因而触发被 HOC 包裹的原组件重新渲染。在有了 hook 之后，React 观察 hook 是否触发状态变化，Redux 通过 hook 来通知 React 状态变化。

如果你想要让你的全局变量发生变化时能通知 React，那么你需要把上述 Redux 做的事情再做一遍。如果这个全局变量内的任何变化都通知每一个 React 组件重新渲染，那就会造成过度重复渲染。你希望一个变化只通知关心这个变化的相关组件，你在实现了这个优化之后你就重新发明了 Redux selector。

Redux 确实有很多简单场景用不到的「设计模式」，例如要有 action 然后还要有 action creator 这种，我把它们称之为过度设计。把这些砍掉后，你就得到了一个简单一些的带 selector 的状态极。但这东西也有人写过了，例如 Undex 和 Recoil，不太值得自己从零写一个。

reducer 这种只约束用户写纯函数，是真的繁琐
或者直接不考虑用 useReducer 约束变更
官方推荐 context+useReducer 传递 dispatch，但是 state 的深层使用还是控制不了的，它只是防止深层未使用 state 情况下的意外损耗
而且这部分损耗在异步 commit 下我认为是可以忍受的，用户感知最多的永远是视图变更
抛弃这个，只用 hooks 的特性，其实瞬间就舒服了好多

redux 也实现了结构共享，我的理解，快照式状态管理

reducer 不可变数据

是为了实现 ui = f(props, state), 纯函数，副作用

React 的设计思想之一就是单项数据流，Redux 也严格遵循了这一原则。它对状态的更新本质上就是通过共享变量的作用域提升来实现的，可以理解为这其实就是一个全局变量，只不过是在 React Tree 层级的全局。

重理念 react

把这个 rootState 变成 Observable，每次数据变化后 forceupdate react 组件即可。
全局 state 是个 reactive state
类似于 vue 的做法

开玩笑，react 和 redux 有点婊子配狗，天作之和的意思

redux 就是“全局变量能够和 react 配合的最精简的方式”

全局变量的问题在于它的数据变化没办法驱动组件的重新渲染，所以你需要一个刷新机制。

当然，如果你只是想拥有一个简单全局的状态，请使用 React 内建的 context，在 App 的顶层定义它（这里通常就是一个单例），然后在需要使用的地方使用 useContext 把值取出来使用（顺便能解决刷新的问题）

用啥无所谓，关键是 store 要可被观察。所以即使用全局变量，也要加上发布订阅这种机制才可行，否则又变成命令式了。

改变数据事件机制，set 时触发 forupdate

如果两个组件需要访问同一状态，全局变量

没有银弹

阿里系围绕 react 的生态

有状态的组件没有渲染，有渲染的组件没有状态

recoil API 其实不多，useRecoilState, createSelector, useRecoilCallback。其它的只是基于这几个 API 的衍生，可以用也可以不用。

useRef 到底是个什么东西，它可以生成一个与组件节点生命周期相同的存放可变内容的容器。
所以这时我们就要用到不会触发更新的可变容器：

但是如果遇到 Map 和 Set 这类东西，它天生是可变的集合容器，如果这样写代码：

React 一个很让人头疼的问题是，它的性能是薛定谔的状态，哪怕脑子再清醒犀利，你也很难去判断一个组件在一顿操作猛如虎之下会更新几次、渲染几次，直到哪天性能崩得受不住了你才会回头捡起来看看情况。

插件机制，loader 约定 类似于 aop 给你上下文变量等等，pluhin 事件，hook 钩子，不污染核心代码
代码细节太繁琐

<!-- 比较流行的就是redux和mobx，我个人不推荐dva，dva这套模式是ok的，但是这套模式挂在redux上就不那么ok了 -->
<!-- umi侵入性太强了，用cra更好，数据流这个要看你的产品特性，前端交互很多的肯定要上数据流 -->
<!-- umi我觉得主要问题不是侵入，而是隐性约定太多，不出问题可能爽，出了问题找起来想砸电脑 -->
<!-- 不然知识是学不完的 -->
<!-- 知道原理就行 -->
<!-- 知识会遗忘的 -->

<!-- 想问下 deepEquals对性能的损耗不大吗

​赞
​回复
​踩
​ 举报
张立理
张立理 (作者) 回复ssh-晨曦时梦见兮2020-03-06
大，但理论上比stringify再去比较要好，而且万一引用相同equals是可以快速返回的，实践中尽量用shallow的 -->

Todo：
protal 对于这种场景可能会造成内部 context 的缺失，github 上有一个 react-activation 的项目是我找到目前比较好的活性页面存储方案，可以参考
个人认为最完美的缓存方案还是缓存数据，比较可靠，专注于对数据的维护不受其他关系的影响是比较一致可靠的方案呢

vue 的 keep-alive 是把虚拟 dom 保存在内存中了，确认官方来做这种功能要方便很多

Keep alive 本质是数据或状态持久化，所以只要把数据及相关状态保存个 cache redux 之类的就好了。

# 使用 React hooks 如何只让下面这段代码的子组件只 render 一次？

state form props

<!-- hook 的 setState 会值比较 -->

要弄清楚，状态（state）现在可以分为 UI State 与 Server State。

Server State 可以使用 react-query(推荐)、swr 来管理。

至于 UI State 用什么都可以，怎么简单怎么来，React-Redux 也不复杂啊？

考虑到 immutable 配合 purecomponent 的 diff 成本低，react 模型还是很堪用的，全局冲渲染的模型确实简单耐用啊。

1. Hooks 确实有「坑」，比如 deps 补全，虽有编辑器提醒，但有时候新加逻辑还是会忘，而且 deps 一多，代码就一坨。

2. 「deps 多了可以拆分逻辑，这是 Hooks 附带的一个优点，帮你更好的组织代码」—— 这马上陷入另一个麻烦，逻辑拆越细，代码就越「散」越「长」，一眼看过去老眼昏花。

3. 「代码长了可以拆分组件，这是 Hooks 附带的一个优点，帮你更好的拆分组件」—— 这马上陷入另一个编程学难题，就是代码不是「最近」原则，项目一大，就陷入溯文件、找代码、理逻辑的黑洞。要改一点逻辑，得挨个把亲戚盆友们都改一遍。

4. 当然，改的时候，每个组件里 useEffect、useMemo、useCallback 的 deps，请不要遗忘 …

5. 纯视觉清晰来说，变量与函数混一起，写在一个函数里，很容易头大，怎么组织代码也成了纯个人爱好，是就近原则，还是同类原则，没撒最佳实践。还是 class 组件里 state 与 methods 隔离看起来清晰。

6. 当然，Hooks 最大的一个心智挑战，其实是之前写的：

React Hooks 为撒难搞？其心智模型反复提到「声明式」编程，区别于「命令式」编程。光整名词还是迷惑，举个例子，1.「命令式」就你开车，你想停停想走走，车是你命令的，除非车情绪崩溃，不然不可能突然失控，2.「声明式」就 Tesla 自动驾驶，声明了各种各样边界条件，然后让车在声明下运行 —— 看看 Tesla 的一些自动驾驶失控新闻，能理解为撒 Hooks 让人心有余悸了吗？—— 你总担心一些边界条件没考虑到，就像 Autopilot 工程师担心的一样。 7. Hooks 附带的一个焦虑，就是总觉得代码是可以「优化」的，总觉得可能哪里 deps 没搞对，总觉得还可以再抢救一下，总觉得再努力一下就出任 CEO 走向人生巅峰 … 骚瑞跑题了。总之，太多样板代码，跟 Redux 似的，写逻辑的快感全被卷入了 memo 无底洞里。

维护一个对应视图的状态。
将状态与外部提供的属性合并后通过一个幂等的函数转换为视图结构。
响应用户在界面上的交互。
针对用户的交互调用业务的逻辑，进而更新状态以达到视图变化的目的。

Redux 在解决第 1 点状态的维护以后，就会希望进一步地继续压缩组件的职能。但其中“状态到视图的映射”是组件最核心的能力，无论如何也不可能剥离的，对应的“响应用户的交互”也是与视图耦合无法剥离的，除此之外，“业务逻辑”却是一个可选项，因此它有可能从组件中移到任意地其它位置。

带了中间件以后的 Redux，其实就是想做这个事：它希望组件只完成与视图强耦合的职能，其它的职能包括状态的管理与逻辑的管理，都不再由组件负责。
而如果你不选择这样的模式，你同样要回答：

那么在你的系统中，你怎么定义组件的 4 个职责，其中“状态管理”与“逻辑管理”应该在什么地方。
永远不可能有一个系统“只有”组件组成，因此组件的职责边界你打算怎么定义，它们应该做什么，不能做什么。
对于需要共享数据的场合，你打算用哪一个或者哪几个解决方案来处理，这包括了父子的共享、同级兄弟的共享、跨层的远亲的共享，以及状态从不共享变成共享、从共享变成不共享的迁移。
Redux 重要的时光机你是否依然需要，如果需要的话，在什么解决方案的基础上来实现？

让系统以声明式地方式驱动，避免命令式带来的逻辑膨胀以后的相互干扰 很有道理
redux-thunk 的意义是把

fetchUser(dispatch) 
改为

dispatch(fetchUser)  // fetchUser 这个函数就是所谓的「异步action」


redux-promise 的意义是把

fetchUserPromise().then(user => dispatch({type:'fetchUser', payload: user})) 
改为

dispatch({type:'fetchUser', payload: fetchUserPromise() })
// 这个 payload 为 promise 的 action 就是所谓的「异步action」
简单来说，就是帮你把单词调换位置，方便阅读一点点。

代码量可是一点都没少。

完。


n2 双指针碰撞
