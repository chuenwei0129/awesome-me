总结，mounted 时，react 是以组件为单位 innerHTML 字符串

一层组件
更新是 使用 diff 算法算出，最小 innerHTML 位置，node.parentNode.appendChild(repeatedNode)，或者 html 插入

渲染是递归渲染的，初次渲染时，就会有递归过长的问题，更新问题是，嵌套过生会出现，父 setstate 子组件也会更新，所以需要手动跳过

子组件也会有无效的 diff，通过跳过diff，可以更新精确位置

使用不可变，是为了 diff 应为组件不知道 对象变美变，如果直接改状态，state，react就不知道当前状态变化了，就不会触发更新

我写的代码 只有单层 diff，只考虑了单组件的所有问题

dom diff 强依赖于 key ，diff 会出现 key 相同的琴况 

16 的事件
17 的事件

16 的 React.create
17 的 jsx.create

dom diff

15 diff
17 两重循环

diff 15 vdom
diff 17 fiber vdom 

hooks 解决了



