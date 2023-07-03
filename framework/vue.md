# 记录个人学习 Vue 的过程中的一些心得以及收获

## 响应式原理与依赖收集

<!-- 初次渲染：Watcher -> render 视图 ——> getter -> Dep -->
<!-- 更新：setter -> Dep -> Watcher -> patch -> 视图 -->
<!-- 实现了 data 那么对 data 的派生就很正常 computed，在 data 变化时，watcher render 会执行，其他注册的 watcher 也会执行，在 data 变化时，需要做一些事情时使用  -->
> [刨根问底：搞懂 vue 1.0 的响应式原理](https://github.com/chuenwei0129/build-my-own-x/blob/main/build-my-own-vue/README.md)

## 虚拟 DOM

> [Vue 采用虚拟 DOM 的目的是什么?](https://www.zhihu.com/question/271485214/answer/386097473)

## 更新粒度

<!-- Vue 的组件更新确实是精确到组件本身的。并没有像 React 中的那样去递归的更新子组件树。 -->
<!-- 在组件初始化 `props` 的时候，就实现了对于 `props` 上字段变更的劫持。也就是变成了响应式数据，所以只要 `ChildComponent` 在模板里也读取了这个属性，自然也能精确的收集到依赖。 -->
<!-- vm.$forceUpdate：迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。 -->
> [为什么说 Vue 的响应式更新精确到组件级别？（原理深度解析）](https://juejin.cn/post/6844904113432444942)

## 更新策略

<!-- watcher render1，render2，... render 1000 合并为一次 render->
<!-- 去 1.0 代码执行一次就明白了 -->
<!-- 常见操作，内存代替 io（指视图更新） -->
> [Vue 批量异步更新策略及 nextTick 原理](https://1996f.cn/content/Vue/#_15-vue%E6%89%B9%E9%87%8F%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E7%AD%96%E7%95%A5%E5%8F%8A-nexttick-%E5%8E%9F%E7%90%86)

## 生命周期

![16ca74f183827f46~tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/16ca74f183827f46%7Etplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0.webp)

## 组件通信

![bf775050e1f948bfa52f3c79b3a3e538~tplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/bf775050e1f948bfa52f3c79b3a3e538%7Etplv-k3u1fbpfcp-zoom-in-crop-mark_4536_0_0_0.webp)

## 依赖注入

> [Vue 组件通信 —— provide/inject](https://zhuanlan.zhihu.com/p/147798646)

<!-- > **文档**：provide 和 inject 绑定并**不是可响应**的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。
>
> **举例**：msg 是一个字符串，基本数据类型是不具有响应特性的（即 inject 组件更改了 msg 的值，provide 组件中 msg 值也不会随之改变）。如果传递一个对象，那么对象的属性是具有响应特性的（即 inject 组件更改了 msg 的值，provide 组件中 msg 值也会随之改变）。
>
> 当然为了保护单向数据流机制，最佳实践还是不要在子组件里更改 inject 中的数据。
>
> **provide 和 inject 缺点（类似于全局变量）：**
>
> 当多个后代组件同时依赖同一个父组件提供数据时，只要任一组件对数据进行了修改，所有依赖的组件都会受到影响，实际上是增加了耦合度。
>
> 任意层级访问使数据追踪变的比较困难，你并不能准确的定位到是哪一个层级对数据进行了改变，当数据出现问题时，尤其是多人协作时，可能会大大增加问题定位的损耗。 -->

## JSX

- [渲染函数 & JSX](https://v2.cn.vuejs.org/v2/guide/render-function.html)
- [Vue2：在 Vue 中使用 JSX 的正确姿势](https://juejin.cn/post/6844903620689788936)

## Vue.extend

> [从零开始徒手撸一个 vue 的 toast 弹窗组件](https://juejin.cn/post/6844903604902428679)

## @hook

> [Vue官方文档里没告诉你的神秘钩子 —— @hook](ttps://juejin.cn/post/7006616545119961101)

## scoped

> [不只懂 Vue 語法：請說明 style 裏的 scoped、deep selector 的作用？](https://ithelp.ithome.com.tw/articles/10266005?sc=rss.iron)

## 路由

- [Vue Router 3.x 的文档](https://v3.router.vuejs.org/zh/installation.html)
- [Vue Router 3.x For Vue2 的源码解析](https://ustbhuangyi.github.io/vue-analysis/v2/vue-router/)

## 状态管理

- [前端框架中 redux , vuex 为什么被称为状态管理，这里的 `状态` 是什么意思？](https://www.zhihu.com/question/535610198)
- [Vuex、Flux、Redux、Redux-saga、Dva、MobX](https://zhuanlan.zhihu.com/p/53599723)
- [Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/vuex/#%E4%BB%80%E4%B9%88%E6%98%AF-%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E6%A8%A1%E5%BC%8F-%EF%BC%9F)
- [Pinia 官网文档](https://pinia.vuejs.org/zh/introduction.html)
- [Pinia 源码分析 1 —— 初始化](https://zhuanlan.zhihu.com/p/616990123)

## 优化

- [揭秘 Vue.js 九个性能优化技巧](https://mp.weixin.qq.com/s?__biz=MzI3NTM5NDgzOA==&mid=2247491159&idx=1&sn=d1d78bdd47a12395f098a234e35c0c75&chksm=eb04262edc73af38013e0b06796672b30068291be3299a88889f577642dae47e3206637c6c87&token=431470234&lang=zh_CN#rd)
- [Vue Table 组件提速 10 倍的秘密](https://mp.weixin.qq.com/s?__biz=MzI3NTM5NDgzOA==&mid=2247501270&idx=2&sn=61c581eac4b5850a3cab9f8605d4b451&chksm=eb07fdafdc7074b9304a5d1d46e9339ffd1b2e08c5f2e6c2e91d49c3b4c702c51aef0fa4793d&token=431470234&lang=zh_CN#rd)

## 后台管理

> [手摸手，带你用 Vue 撸后台系列](https://juejin.cn/post/6844903476661583880#comment)

## 八股文

- [30 道 Vue 面试题，内含详细讲解](https://juejin.cn/post/6844903918753808398#heading-1)
- [历时一个月，2.6W字！50+Vue经典面试题源码级详解，你值得收藏！](https://juejin.cn/post/7097067108663558151#heading-0)
- [又一个月，1.5W字！50+Vue经典面试题源码级详解，完结篇！](https://juejin.cn/post/7115055320913117220#heading-0)


<!-- 使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 `scoped CSS` 和子组件的 `scoped CSS` 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

所以在使用 `scoped` 属性后，父组件只能修改子组件根节点样式，那么怎样才能修改更深层级的子元素呢？ -->

## 文档速查

- [事件处理](https://v2.cn.vuejs.org/v2/guide/events.html)
- [表单输入绑定](https://v2.cn.vuejs.org/v2/guide/forms.html)
- [程序化的事件侦听器](https://v2.cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8)
- [自定义事件](https://v2.cn.vuejs.org/v2/guide/components-custom-events.html)

## 组件拓展

按照**逻辑扩展**和**内容扩展**来列举

<!-- react 复用是高阶函数，class 继承 -->
<!-- mixins：类似于两个对象合并，合并跪着类似于 config 文件，mixin 相当于全局变量。slots：renderProps -->
<!-- 组件整个复用，组件的逻辑复用，组件的一部分动态变化，粒度不同的复用 -->
- 逻辑扩展有：mixins
- 内容扩展有 slots

直接给一个数组项赋值，Vue 能检测到变化吗？
由于 JavaScript 的限制，Vue 不能检测到以下数组的变动：

当你利用索引直接设置一个数组项时，例如：vm.items[indexOfItem] = newValue
当你修改数组的长度时，例如：vm.items.length = newLength

为了解决第一个问题，Vue 提供了以下操作方法：
vim复制代码// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
为了解决第二个问题，Vue 提供了以下操作方法：
haxe复制代码// Array.prototype.splice
vm.items.splice(newLength)

@hook


Vue有一组默认指令，比如v-model或v-for，同时Vue也允许用户注册自定义指令来扩展Vue能力


自定义指令主要完成一些可复用低层级DOM操作


使用自定义指令分为定义、注册和使用三步：

定义自定义指令有两种方式：对象和函数形式，前者类似组件定义，有各种生命周期；后者只会在mounted和updated时执行
注册自定义指令类似组件，可以使用app.directive()全局注册，使用{directives:{xxx}}局部注册
使用时在注册名称前加上v-即可，比如v-focus



我在项目中常用到一些自定义指令，例如：

复制粘贴 v-copy
长按 v-longpress
防抖 v-debounce
图片懒加载 v-lazy
按钮权限 v-premission
页面水印 v-waterMarker
拖拽指令 v-draggable



vue3中指令定义发生了比较大的变化，主要是钩子的名称保持和组件一致，这样开发人员容易记忆，不易犯错。另外在v3.2之后，可以在setup中以一个小写v开头方便的定义自定义指令，更简单了！


