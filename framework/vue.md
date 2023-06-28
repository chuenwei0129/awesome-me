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
<!-- 将 number 增加 1000 次时，视图上的 number 从 0 直接变成 1000。 -->
<!-- 常见操作，内存代替 io（指视图更新） -->
> [Vue 批量异步更新策略及 nextTick 原理](https://1996f.cn/content/Vue/#_15-vue%E6%89%B9%E9%87%8F%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E7%AD%96%E7%95%A5%E5%8F%8A-nexttick-%E5%8E%9F%E7%90%86)

## 生命周期

![16ca74f183827f46~tplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/16ca74f183827f46%7Etplv-t2oaga2asx-zoom-in-crop-mark_3024_0_0_0.webp)

## 组件通信

<!-- todo -->

<!-- 使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 `scoped CSS` 和子组件的 `scoped CSS` 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

所以在使用 `scoped` 属性后，父组件只能修改子组件根节点样式，那么怎样才能修改更深层级的子元素呢？ -->
