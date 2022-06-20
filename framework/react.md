# 渐进式学习 react<!-- omit in toc -->

- [从 DOM 谈起：前端为什么操作 DOM 是最耗性能的呢？](#从-dom-谈起前端为什么操作-dom-是最耗性能的呢)
- [JSX 是什么？](#jsx-是什么)
- [REACT 15](#react-15)
- [React 为什么需要并发](#react-为什么需要并发)
  - [任务时长超过一帧怎么处理？](#任务时长超过一帧怎么处理)
  - [浏览器的一帧里做了什么？](#浏览器的一帧里做了什么)
  - [React 15 的问题](#react-15-的问题)
  - [如何解决这个问题呢？](#如何解决这个问题呢)
- [时间切片](#时间切片)
- [为什么 Vue 3 里没有时间分片？](#为什么-vue-3-里没有时间分片)
- [Fiber 架构](#fiber-架构)
- [JSX 转 Fiber 模拟实现](#jsx-转-fiber-模拟实现)
- [并发调度](#并发调度)
  - [更新优先级](#更新优先级)
  - [Automatic batching](#automatic-batching)
  - [tearing](#tearing)
- [React 组件更新策略](#react-组件更新策略)
  - [React 组件 render 需要满足的条件](#react-组件-render-需要满足的条件)
  - [bailout 需要满足的条件](#bailout-需要满足的条件)
  - [优化 fiber 树](#优化-fiber-树)
  - [Demo 分析](#demo-分析)
- [如何优雅处理使用 React Context 导致的不必要渲染？](#如何优雅处理使用-react-context-导致的不必要渲染)
  - [新 Context 内部实现](#新-context-内部实现)
  - [方案一：Split contexts](#方案一split-contexts)
  - [方案二：使用「泛 memo」方案](#方案二使用泛-memo方案)
  - [方案三：context selector —— ObservedBits](#方案三context-selector--observedbits)
  - [方案四：在 provider 和 context 之间做 client 级别的依赖订阅更新](#方案四在-provider-和-context-之间做-client-级别的依赖订阅更新)
- [Hooks](#hooks)
- [关于 useState 的一切](#关于-usestate-的一切)
  - [两个问题](#两个问题)
  - [hooks 状态的保存和更新](#hooks-状态的保存和更新)
- [关于 useEffect 的一切](#关于-useeffect-的一切)
- [关于 ref 的一切](#关于-ref-的一切)
  - [string ref](#string-ref)
  - [React.createRef](#reactcreateref)
  - [useRef](#useref)
  - [function ref](#function-ref)
  - [forwardRef](#forwardref)
  - [useImperativeHandle](#useimperativehandle)
- [闭包陷阱](#闭包陷阱)
- [React 合成事件](#react-合成事件)
- [受控组件](#受控组件)
- [泛型组件](#泛型组件)
- [React.Fragment](#reactfragment)
- [React.StrictMode](#reactstrictmode)
- [React.lazy](#reactlazy)
- [React.memo](#reactmemo)
- [React.cloneElement](#reactcloneelement)
- [isValidElement](#isvalidelement)
- [React.children.map](#reactchildrenmap)
- [Immutable](#immutable)
- [Record 和 Tuple](#record-和-tuple)
  - [语法](#语法)
  - [更容易使用的 useMemo](#更容易使用的-usememo)
  - [更加符合心智的 useEffect](#更加符合心智的-useeffect)
  - [简单不易出错的 memo 机制](#简单不易出错的-memo-机制)
  - [更容易书写 key](#更容易书写-key)
- [Profiler](#profiler)
- [双缓存 Fiber 树](#双缓存-fiber-树)
- [ErrorBoundary](#errorboundary)
  - [ErrorBoundary 实现原理](#errorboundary-实现原理)
  - [getDerivedStateFromError 原理](#getderivedstatefromerror-原理)
  - [componentDidCatch 原理](#componentdidcatch-原理)
  - [没有定义 `ErrorBoundary`](#没有定义-errorboundary)

## 从 DOM 谈起：前端为什么操作 DOM 是最耗性能的呢？

**其一：** 浏览器的 JavaScript 引擎与 DOM 引擎共享一个主线程。任何 DOM API 调用都要先将 JS 数据结构转为 DOM 数据结构，再挂起 JS 引擎并启动 DOM 引擎，执行过后再把可能的返回值反转数据结构，重启 JS 引擎继续执行。**这种上下文切换很耗性能**，类似的还有单机进程间调用、远程过程调用等。

**其二：** 很多 DOM API 的读写都涉及页面布局的“重新计算”，以确保返回值的准确，涉及样式、结构的还会触发页面“重新绘制”，更耗性能。

**综上：** **单次 DOM API 调用性能就不够好**，频繁调用就会迅速积累上述损耗，导致 DOM 引擎占用主线程过久，用户操作不能及时触发 JS 事件回调，让用户感觉卡顿。

所以，解决此问题的方案本质不在于用不用 jQuery、用不用虚拟 DOM，而是 —— **减少不必要的 DOM API 调用。**

而减少不必要调用的各种方案，都遵循 **「在 JS 中缓存必要数据，计算界面更新时的阶段数据差异，只提交最终差集」** 的基本思路。

**虚拟 DOM 计算的是最终 DOM 结构的差异，还有的引擎计算的是 DOM 所绑定数据的差异，各有千秋。**

## JSX 是什么？

HTML tag 书写方式和 JSON 的书写方式是差不多的：**它们都是树形结构**。

DOM 是一个树形结构，这个树形结构对应的就是我们的 HTML tag，书写 HTML 其实并不是很费脑，因为一切都抽象成了一个人能够看懂的 Tag ，层级之间的关系就好像画图一样。

如果我们使用 JS api 去书写 HTML tag 是非常痛苦的，所以开发人员就瞄上了和 HTML tag 有相似结构的 json 数据格式。因为 json 是 javascript 的原生对象，所以就让 **「在 JS 中 声明式书写 HTML 带来了可能」。**

但是能够书写 HTML 远远已经不能满足我们现代工业的需求，我们需要一种机制：

- **能够声明式的书写 HTML**
- **能够在 JS 中书写 HTML**
- **能够小粒度的复用我们的这些 HTML**

那么，通过 babel 转化的 jsx 就应运而生了，**让人们拥有了使用 JS 写 HTML，并且声明式，又可以控制粒度的复用的能力**。

## REACT 15

> [温故知新：手写迷你 react 15](https://github.com/chuenwei0129/build-my-own-x/blob/main/packages/build-my-own-react-15/README.md)

## React 为什么需要并发

### 任务时长超过一帧怎么处理？

帧是画面的意思，浏览器页面就像视频一样，每一秒会绘制很多帧，**每一帧的耗时是不定的，可以是任意的时间**。

如果用户不操作页面，也没有什么定时任务，每一帧耗时大概 16 ms，也就是 60 fps。

```js
let lastTime = Date.now()
requestAnimationFrame(function cb() {
  console.log("这一帧耗时：", Date.now() - lastTime)
  lastTime = Date.now()
  requestAnimationFrame(cb)
})
```

如果有耗时的代码，比如：

```js
document.addEventListener("click", function () {
  var now = Date.now()
  requestAnimationFrame(() => console.log("这一帧持续了" + (Date.now() - now)))
  while (Date.now() < now + 1000)
})
```

那么这一帧耗时就会至少 1 秒钟，1 fps。**任务耗时的后果是让一帧耗时变长，帧率变低，任务不会被跳过。**

> for 循环里有个 await 也很容易让一个任务耗时变的很长很长，因为每个任务都需要执行完它所引起的所有的微任务才算完。这叫微任务阻塞渲染。

### 浏览器的一帧里做了什么？

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/1_ad-k5hYKQnRQJF8tv8BIqg.png)

### React 15 的问题

**在 React 15 中，组件树更新过程是同步地一层组件套一层组件，这可能会导致性能问题。**

当 React 决定要加载或者更新组件树时，会做很多事，比如调用各个组件的生命周期函数，计算和比对 Virtual DOM，最后更新 DOM 树，这整个过程是同步进行的，也就是说只要一个加载或者更新过程开始，那 React 就以不破楼兰终不还的气概，**一鼓作气运行到底，中途绝不停歇**。

表面上看，这样的设计也是挺合理的，因为更新过程不会有任何 I/O 操作嘛，完全是 CPU 计算，所以无需异步操作，的确只要一路狂奔就行了，但是，当组件树比较庞大的时候，问题就来了。

**假如更新一个组件需要 1 毫秒，如果有 200 个组件要更新，那就需要 200 毫秒，在这 200 毫秒的更新过程中，浏览器那个唯一的主线程都在专心运行更新操作，无暇去做任何其他的事情。**

想象一下，在这 200 毫秒内，用户往一个 input 元素中输入点什么，敲击键盘也不会获得响应，因为渲染输入按键结果也是浏览器主线程的工作，但是浏览器主线程被 React 占着呢，抽不出空，最后的结果就是用户敲了按键看不到反应，等 React 更新过程结束之后，咔咔咔那些按键一下子出现在 input 元素里了。

**这就是所谓的界面卡顿，很不好的用户体验。**

### 如何解决这个问题呢？

如何解决这个问题呢？React18 给出的答案就是：并发。

我们可以将 react 更新看作一个任务，click 事件看作一个任务。**在并发的情况下，react 更新到一半的时候，进来了 click 任务，这个时候先去执行 click 任务。等 click 任务执行完成后，接着继续执行剩余的 react 更新。** 这样就保证了即使在耗时更新的情况下，用户依旧是可以进行交互的。

**官网如此描述：**

> Concurrency is not a feature, per se. It’s a new behind-the-scenes mechanism that enables React to prepare multiple versions of your UI at the same time.（并发是一种新的幕后机制，它允许在同一时间里，准备多个版本的 UI，即多个版本的更新）

## 时间切片

**API：** [window.requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)

**核心：** 浏览器去在一帧有空闲的情况下，去执行某个低优先级的任务。比如其余任务执行了 10 ms，那么这一帧里就还剩 6.7ms 的时间，那么就会触发 requestIdleCallback 的回调。

**假设：** 如果我们把 React 的更新（如 200ms）拆分成一个个小的更新（如 40 个 5ms 的更新），然后每个小更新放到 requestIdleCallback 中执行。那么就意味着这些小更新会在浏览器每一帧的空闲时间去执行。如果一帧里有多余时间就执行，没有多余时间就推到下一帧继续执行。这样的话，更新一直在继续，并且同时还能确保每一帧里的事件如 click，宏任务，微任务，渲染等能够正常执行，也就可以达到用户可交互的目的。

**兼容性：** [实现 React requestIdleCallback 调度能力](https://juejin.cn/post/7021506472232583199)

**拓展：**

设置 10000 个 `setTimeout(fn, 0)`，并不会阻塞线程，而是浏览器会将这 10000 个回调合理分配到每一帧当中去执行。

比如：10000 个 setTimeout 在执行时，第一帧里可能执行了 300 个 setTimeout 回调，第二帧里可能执行了 400 个 setTimeout 回调，第 n 帧里可能执行了 200 个回调。浏览器为了尽量保证不掉帧，会合理将这些宏任务分配到帧当中去。

## [为什么 Vue 3 里没有时间分片？](https://mp.weixin.qq.com/s?__biz=MzIxNzUzOTk1MQ==&mid=2247484011&idx=1&sn=4e989038cc078729fbfd436780176e81&chksm=97f9766ba08eff7dbd54f698293dc0d032de8460bccc6f1c5ce8e5f44012ae084d889dcafff1&cur_album_id=2291981265736302593&scene=189#wechat_redirect)

Fiber 只是递归改循环，树变链表。用的是 requestAnimationFrame 来调度， requestAnimationFrame 和 setTimeout 其实差不多的，**本质都是化同步为异步的渲染方式**。

<!-- 类似 setState 异步调度更新组件：在决定更新之前，如何合并及去重多次小量更新？ -->

Vue 的渲染是走[异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)，简单说就是所有 setter 的更新会被推入 watchers 队列，等 nextTick（早期原理是 Promise > MutationObserver > setTimeout 看浏览器支持程度优先级实现）的时候再执行 Render Function。

**而针对单次的大数据量更新：**

- CPU 计算量不大，但 DOM 操作非常复杂（比如说你向页面中插入了十万个节点）。这种场景下不管你做不做时间分片，页面都会很卡。
- CPU 计算量非常大。理论上时间分片在这种场景里会有较大收益，但是人机交互研究表明，除了动画之外，大部分用户不会觉得 10 毫秒和 100 毫秒有很大区别。

## Fiber 架构

React 传统的 Reconciler 是通过类似于虚拟 DOM 的方式来进行对比和标记更新。树的结构不能很好满足将更新拆分的需求。因为它一旦发生中断，下次更新时，很难找到上一个节点和下一个节点的信息，虽然有办法能找到，但是相对而言比较麻烦。所以，React 团队引入了 Fiber 来解决这一问题。

**普通树：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/SCR-20220611-1xf.png)

**链表树：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/SCR-20220611-1wv.png)

如果节点 2 发生中断，普通树结构由于只保存了 3，4 的索引，恢复中断时，其它节点信息就会丢失，而链表树就能够指针把其它节点的信息都找回来。

## JSX 转 Fiber 模拟实现

**DOM 结构：**

```html
const element = (
<div id="A1">
  <div id="B1">
    <div id="C1"></div>
    <div id="C2"></div>
  </div>
  <div id="B2"></div>
</div>
)
```

**实现：**

```js
const vnode = {
  type: 'div',
  props: {
    id: 'A1',
    children: [
      {
        type: 'div',
        props: {
          id: 'B1',
          children: [
            {
              type: 'div',
              props: {
                id: 'C1',
                children: []
              }
            },
            {
              type: 'div',
              props: {
                id: 'C2',
                children: []
              }
            }
          ]
        }
      },
      {
        type: 'div',
        props: {
          id: 'B2',
          children: []
        }
      }
    ]
  }
}

const PLACEMENT = 'PLACEMENT'

let rootFiber = {
  stateNode: document.getElementById('root'),
  props: {
    children: [vnode]
  }
}

let nextUnitOfWork = rootFiber

function workloop() {
  // 有工作单元，执行它，并返回新的工作单元
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  // 循环结束，下个工作单元没了，提交不可以打断
  if (!nextUnitOfWork) {
    commitRoot()
  }
}

function commitRoot() {
  let currentFiber = rootFiber.firstEffect
  while (currentFiber) {
    if (currentFiber.effectTag === 'PLACEMENT') {
      currentFiber.return.stateNode.appendChild(currentFiber.stateNode)
    }
    currentFiber = currentFiber.nextEffect
  }

  rootFiber = null
}

function performUnitOfWork(workingInProgressFiber) {
  beginWork(workingInProgressFiber)

  if (workingInProgressFiber.child) {
    return workingInProgressFiber.child
  }

  while (workingInProgressFiber) {
    completeWork(workingInProgressFiber)

    if (workingInProgressFiber.sibling) {
      return workingInProgressFiber.sibling
    }

    workingInProgressFiber = workingInProgressFiber.return
  }
}

function beginWork(workingInProgressFiber) {
  if (!workingInProgressFiber.stateNode) {
    workingInProgressFiber.stateNode = document.createElement(workingInProgressFiber.type)
    for (const [k, v] of Object.entries(workingInProgressFiber.props)) {
      // 处理 dom 属性
      if (k !== 'children') {
        workingInProgressFiber.stateNode[k] = v
      }
    }
  }

  let prevFiber = null
  workingInProgressFiber.props.children.forEach((vnode, idx) => {
    let childFiber = {
      type: vnode.type,
      props: vnode.props,
      return: workingInProgressFiber,
      effectTag: PLACEMENT,
      nextEffect: null
    }

    if (idx === 0) {
      workingInProgressFiber.child = childFiber
    } else {
      prevFiber.sibling = childFiber
    }
    prevFiber = childFiber
  })
}

function completeWork(workingInProgressFiber) {
  // 第一次进来是 C1，最后一次是 rootFiber
  let returnFiber = workingInProgressFiber.return

  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = workingInProgressFiber.firstEffect
    }
    if (workingInProgressFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workingInProgressFiber.firstEffect
      }

      returnFiber.lastEffect = workingInProgressFiber.lastEffect
    }

    if (workingInProgressFiber.effectTag) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workingInProgressFiber
      } else {
        returnFiber.firstEffect = workingInProgressFiber
      }
      returnFiber.lastEffect = workingInProgressFiber
    }
  }
}

requestIdleCallback(workloop)
```

## 并发调度

### 更新优先级

React 通过 lane 的方式为每个更新分配了相关优先级。lane 可以简单理解为一些数字，数值越小，表明优先级越高。

假如有两个更新，他们同时对 App 组件的一个 count 属性更新：

```jsx
<p>You clicked {count} times</p>
<button onClick={() => setCount(count + 1)}>
  A按钮
</button>
<button onClick={() => startTransition(() => { setCount(count + 1) })}>
  B按钮
</button>
```

- 一个是 `A` 按钮：`click` 事件触发的更新，叫做 `A更新`，对应于 `SyncLane`。
- 一个是 `B` 按钮：`startTransition` 触发的更新，叫做 `B更新`，对应于 `TransitionLane1`。

假设 `B` 按钮先点击，`B更新`开始，按照之前提到时间切片的形式进行更新。中途触发了 `A` 按钮点击，进而触发 `A更新`。那么此时就会通过 `lane` 进行对比，发现 `DefaultLane` 优先级高于 `TransitionLane1`。此时会中断 `B更新`，开始 `A更新`。直到 `A` 更新完成时，再重新开始 `B` 更新。

**那么 React 是如何区分 B 更新对 App 的 count 的更改和 A 更新中对 count 的更改呢？**

实际上，在每次更新时，更新 state 的操作会被创建为一个 Update，放到循环链表当中

在更新的时候就会依次去执行这个链表上的操作，从而计算出最终的 state。

每个 Update 里都有一个 lane 属性。该属性标识了当前的这个 Update 的更新优先级，属于哪个更新任务中的操作。

因此当 A 更新在执行的时候，我们在计算 state 的时候，只需要去计算与 A 更新相同 lane 的 update 即可。同样，B 更新开始，也只更新具有同等 lane 级别的 Update，从而达到不同更新的状态互不干扰的效果。

### Automatic batching

> [给女朋友讲 React18 新特性：Automatic batching](https://zhuanlan.zhihu.com/p/382216973)

批处理：**React 会尝试将同一上下文中触发的更新合并为一个更新**

在 v18 之前，只有事件回调、生命周期回调中的更新会批处理，而在 promise、setTimeout 等异步回调中不会批处理。

```js
onClick() {
  setTimeout(() => {
    // ReactDOM 中使用 unstable_batchedUpdates 方法手动批处理。
    ReactDOM.unstable_batchedUpdates(() => {
      this.setState({a: 3});
      this.setState({a: 4});
    })
  })
}
```

v18 后，批处理是以更新的「优先级」为依据：

```js
onClick() {
  // 属于同一优先级
  this.setState({a: 3});
  this.setState({a: 4});
}

onClick() {
  setTimeout(() => {
  // 属于同一优先级
    this.setState({a: 3});
    this.setState({a: 4});
  })
}
```

### tearing

[撕裂](https://en.wikipedia.org/wiki/Screen_tearing)（tearing）是图形编程中的一个传统术语，是指视觉上的不一致。

**撕裂通常是由于 React 使用了外部的状态导致的。React 在并发渲染过程中，这些外部的状态会发生变化，但是 React 却无法感知到变化。**

假设我们有一个外部 store，初始颜色是蓝色。在我们的应用中组件树中有多个组件都依赖于 store 的值。

假设组件树的渲染需要 400 ms，在渲染到 100 ms 时，假设一个用户点击了按钮，将 store 的颜色由蓝色改为红色。

在非并发渲染场景下，不会发生任何处理。因为组件树的渲染是同步的。用户的点击事件会在视图渲染完成后执行。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/0c371a43388a4ce29eba5a7deb888c85_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.webp)

但是在并发渲染场景下，React 可以让点击发生反应，打断视图渲染。此时很有可能因为时间分片的原因，前 100ms 有一些组件已经完成了渲染，引用的 store 值是蓝色，剩下 300ms 渲染的组件引用的 store 值是红色，这些组件虽然读取同一个数据却显示出不同的值，这种边缘情况就是 “撕裂”。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/e758382e98814f5ab364e85ec3524ef9_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.webp)

## React 组件更新策略

### React 组件 render 需要满足的条件

`React`  创建  `fiber`  树时，每个组件对应的  `fiber`  都是通过如下两个逻辑之一创建的：

- **render**：即调用  `render`  函数，根据返回的  `JSX`  创建新的  `fiber`
- **bailout**：即满足一定条件时，`React`  判断该组件在更新前后没有发生变化，则**复用**该组件在上一次更新的  `fiber`  作为本次更新的  `fiber`

> 可以看到，当命中  `bailout`  逻辑时，是不会调用  `render`  函数的

### bailout 需要满足的条件

什么情况下会进入 `bailout` 逻辑？当同时满足如下 `4` 个条件时：

1. `oldProps === newProps`
2. `context` 没有变化，即 `context` 的 `value` 没有变化。
3. `workInProgress.type === current.type` 更新前后 `fiber.type` 是否变化，比如 `div` 是否变为 `p`
4. `!includesSomeLane(renderLanes, updateLanes)` 即当前 `fiber` 上是否存在更新，如果存在那么更新的优先级是否和本次整棵 `fiber` 树调度的优先级一致？**说人话就是，当前组件是否触发更新（通过调用 setState）**

**关于 `oldProps === newProps`：**

注意这里是**全等比较**。

我们知道组件 `render` 会返回 `JSX`，`JSX` 是 `React.createElement` 的语法糖。

所以 `render` 的返回结果实际上是 `React.createElement` 的执行结果，即一个包含 `props` 属性的对象。

> 即使本次更新与上次更新 `props` 中每一项参数都没有变化，但是本次更新是 `React.createElement` 的执行结果，是一个全新的 `props` 引用，所以 `oldProps !== newProps`

所以 `React` 未进行优化的心智模型可以简化成，**父组件渲染，子组件必然渲染**

如果我们使用了 `PureComponent` 或 `Memo`，那么在判断是进入 `render` 还是 `bailout` 时，不会判断 `oldProps` 与 `newProps` 是否全等，而是会对 `props` 内每个属性进行浅比较。

当使用 `shouldComponentUpdate`，这个组件 bailout 的条件会产生变化：

```js
--oldProps === newProps
++SCU === false
```

### 优化 fiber 树

> React 每次更新都会重新生成一棵 fiber 树，性能确实不算很棒，所以内部做了一些优化。

fiber 树生成过程中并不是所有组件都会 render，有些满足优化条件的组件会走 bailout 逻辑。

但如果一棵 fiber 子树所有节点都没有更新，即使所有子孙 fiber 都走 bailout 逻辑，还是有遍历的成本。

所以，**在 bailout 中，会检查**该 fiber 的所有子孙 fiber 是否满足条件 4（该检查时间复杂度 O(1)）。

**如果所有子孙 fiber 本次都没有更新需要执行，则 bailout 会直接返回 null。整棵子树都被跳过。该 fiber 子树也不会再继续遍历生成。**

**不会 bailout 也不会 render，就像不存在一样**。对应的 DOM 不会产生任何变化。

> 小知识：老 Context API 的实现依赖 fiber 树的遍历，Context 对应数据会保存在栈中。在递阶段，Context 不断入栈，所以 Consumer 可以通过 Context 栈向上找到对应的 context value。在归阶段，Context 不断出栈。

所以当我们使用 shouldComponentUpdate 或者其它性能优化时，可能会导致
：组件命中 bailout 逻辑，如果组件的子树满足 bailout 的条件 4 的话那么其 fiber 子树不会再继续遍历生成。Context 的入栈、出栈就失效了。

### Demo 分析

<!-- 根 fiber 必走 bailout（函数组件重新 render 才会返回新 jsx），其子 fiber 如果有满足 4 的 子 fiber 就不处理，其它走 bailout 和 render 逻辑-->

```jsx
function Child() {
  // 点击 Parent div 不会打印 child render!
  console.log('child render!')
  return <div>Son</div>
}

function Parent(props) {
  const [count, setCount] = React.useState(0)

  return (
    <div
      onClick={() => {
        setCount(count + 1)
      }}
    >
      count:{count}
      {props.children}
    </div>
  )
}

function App() {
  return (
    <Parent>
      <Child />
    </Parent>
  )
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

本次更新开始时，`Fiber` 树存在如下 2 个 `fiber`：

```js
FiberRootNode
|
RootFiber
|
```

其中 `FiberRootNode` 是整个应用的根节点，`RootFiber` 是调用 `ReactDOM.render` 创建的 `fiber`。

> 之所以要区分 fiberRootNode 与 rootFiber，是因为在应用中我们可以多次调用 ReactDOM.render 渲染不同的组件树，他们会拥有不同的 rootFiber。但是整个应用的根节点只有一个，那就是 fiberRootNode。

首先，`RootFiber` 会进入 `bailout` 的逻辑，所以返回的 `App fiber` 和更新前是一致的。

```js
FiberRootNode
|
RootFiber
|
App fiber
```

由于 `App fiber` 是 `RootFiber` 走 `bailout` 逻辑返回的，所以对于 `App fiber`，`oldProps === newProps`。并且 `bailout` 剩下 3 个条件也满足。

所以 `App fiber` 也会走 `bailout` 逻辑，返回 `Parent fiber`。

```js
FiberRootNode
|
RootFiber
|
App fiber
|
Parent fiber
```

由于更新是 `Parent fiber` 触发的，所以他不满足条件 4，会走 `render` 的逻辑。

接下来是关键

如果 `render` 返回的 `Child` 是如下形式：

```jsx
<Child />
```

会编译为

```js
React.createElement(Child, null)
```

执行后返回虚拟 DOM 对象。

由于 `props` 对象的引用改变，`oldProps !== newProps`。会走 `render` 逻辑。

但是在 `Demo` 中 `Child` 是如下形式：

```jsx
{
  props.children
}
```

其中，`props.children` 是 `Child` 对应的 `JSX`，而这里的 `props` 是 `App fiber` 走 `bailout` 逻辑后返回的。

所以 `Child` 对应的 `JSX` 与上次更新时一致，`JSX` 中保存的 `props` 也就一致，满足条件 1。

可以看到，`Child` 满足 `bailout` 的所有条件，所以不会 `render`。

## 如何优雅处理使用 React Context 导致的不必要渲染？

> [如何优雅地处理使用 React Context 导致的不必要渲染问题？](https://www.zhihu.com/question/450047614/answer/1788226254)

### 新 Context 内部实现

React 中新 Context 的逻辑是，只要 Provider 的 value 一变，**所有的 Consumer 都会得到通知，才不管你只依赖于 value 中某个子段**，所以把 context 当 store 用会导致不必要的渲染。

**原理：**

当遍历组件生成对应 fiber 时，遍历到 `Ctx.Provider` 组件，`Ctx.Provider` 内部会判断 `context value` 是否变化。

如果 `context value` 变化，`Ctx.Provider` 内部会执行一次向下深度优先遍历子树的操作，寻找与该 Provider 配套的所有 Consumer，并为该 fiber 触发一次更新。从而进入 render 逻辑。

### 方案一：Split contexts

顾名思义，就是拆分 Contexts，这里面主要指对于不同上下文背景的 Contexts 进行拆分，实现合理的 Contexts hierarchy，这样就很容易能做到「组件按需选用订阅自己的 Contexts data」。

```js
const App = () => {
  // ...
  return (
    <ContextA.Provider value={valueA}>
      <ContextB.Provider value={valueB}>
        <ContextC.Provider value={valueC}>...</ContextC.Provider>
      </ContextB.Provider>
    </ContextA.Provider>
  )
}
```

如果你觉得「这种 Context hierarchy 好麻烦啊」，那请你养成更好的编程习惯吧，Split Contexts 也是官方所推荐的「最佳」方案——麻烦和合理往往就在一念之间。（btw, 是真的那么麻烦么？）

另外值得一提的是，除了层级式按使用场景拆分 Contexts，我们还需要了解：**将多变的和不变的 Contexts 分开，让不变的 Contexts 在外层，多变的 Contexts 在内层。**

### 方案二：使用「泛 memo」方案

「泛 memo」既可以是 `React.memo`，也可以是 useMemo 包裹一个 React 组件，以达到类似 scu 的优化目的。

`React.memo` 场景：

```js
function Button() {
  let appContextValue = useContext(AppContext)
  let theme = appContextValue.theme
  return <ThemedButton theme={theme} />
}
// 对 ThemedButton 使用 Memo，只「响应」theme 的变化，浅比较 theme bailout
const ThemedButton = memo(({ theme }) => {
  return <ExpensiveTree className={theme} />
})
```

`useMemo` 包裹 React 组件场景：

```js
function Button() {
  let appContextValue = useContext(AppContext)
  let theme = appContextValue.theme // 相当于自己实现的 selector

  // useMemo 缓存 jsx 对象，bailout jsx
  return useMemo(() => {
    return <ExpensiveTree className={theme} />
  }, [theme])
}
```

毕竟对于新的 Context API，我们知道：对于层级上祖先被 memorized bailout 的情况，新的 Context 特性依然可以订阅到 context data 的变化。

在这个方案中，我也愿意把 props.children 的用法列举出来，本质上也是一种依靠「缓存」的 bailout 优化方案，简单示例：

```js
const Container = props => {
  //...

  return <Context.Provider value={value}>{props.children}</Context.Provider>
}

const Demo = () => {
  return (
    <div>
      <Container>
        <Count />
        <SetCount />
        <Pure />
      </Container>
    </div>
  )
}
```

这种 lift content up 为 props.children 的做法，能够防止不必要的渲染，其本质原理和 Memo 异曲同工：对应上面代码，只要作为 Context.Provider 的子组件不变化，props.children 引用不变化，React 可以自动优化规避掉不必要的渲染（相比于 Memo 指定的比对项，这种比对更加粗粒度）。

### 方案三：context selector —— ObservedBits

<!-- bit 计算最多支持 31个不够用，可以改为在 createContext 第二个回调参数里派发事件通知并 return 0，以上实践完美解决了 context 按需触发更新 -->

- [位运算基础](bits.md)
- [ObservedBits: React Context 的秘密功能](https://zhuanlan.zhihu.com/p/51073183)

### 方案四：在 provider 和 context 之间做 client 级别的依赖订阅更新

> [use-context-selector](https://github.com/dai-shi/use-context-selector)

## Hooks

<!-- React 的 hooks 是在 fiber 之后出现的特性，所以很多人误以为 hooks 是必须依赖 fiber 才能实现的，其实并不是，它们俩没啥必然联系。 -->

> [29 行代码深入 React Hooks 原理](https://zhuanlan.zhihu.com/p/127255755)

## 关于 useState 的一切

### 两个问题

对于如下函数组件：

```jsx
function App() {
  const [num, updateNum] = useState(0)
  window.updateNum = updateNum
  return num
}
```

**问：** 调用 `window.updateNum(1)` 可以将视图中的 0 更新为 1 么？

**答：** 可以

对于如下函数组件：

```jsx
function App() {
  const [num, updateNum] = useState(0)

  function increment() {
    setTimeout(() => {
      updateNum(num + 1)
    }, 1000)
  }

  return <p onClick={increment}>{num}</p>
}
```

**问：** 在 1 秒内快速点击 p 5 次，视图上显示为几？

**答：** 1

其实，这两个问题本质上是在问：

- useState 如何保存状态？
- useState 如何更新状态？

### hooks 状态的保存和更新

> 在我们自己实现的 hooks 中，是使用一个立即执行函数的内部变量 `let hooks = []` 来保存 hooks 函数使用的变量，`let currentHook = 0` 来保存当前 hook 函数的索引，并通过闭包捕获 hooks 数组，currentHook 索引。

**在 react 中：**

**每个组件有个对应的 fiber 节点，用于保存组件相关信息。**

每次组件渲染时，全局变量 `currentlyRenderingFiber` 都会被赋值为该 `FunctionComponent` 对应的 `fiber` 节点。

所以，hook 内部其实是从 `currentlyRenderingFiber` 中获取状态信息的。

其数据结构如下（类似我们自定义的 `hooks = []`）：

```js
const hook = {
  // hook 保存的数据 === _val
  // 由于中断，保存的是中断前以更改的部份数据
  memoizedState: null,
  // 指向下一个 hook === currentHook
  next: hookForB
  // hook 保存的数据 === _val
  // 初始 hook 保存的数据
  baseState: null,
  // 本次更新开始时已有的 update 队列
  // 中断
  baseQueue: null,
  // 本次更新需要增加的 update 队列
  queue: null,
};
```

当 `FunctionComponent render` 时，每执行到一个 hook，都会将指向`currentlyRenderingFiber.memoizedState` 链表的指针向后移动一次，指向当前 `hook` 对应数据。

> 拓展：[hook 限制](https://cloud.tencent.com/developer/article/1894850)
>
> 1. 只在 React 函数中使用 hook：hook 依赖 currentlyRenderingFiber 上保存的 hooks 链表（自定义 hooks 相当于自执行函数）
>
> 2. 只在最顶层使用 hooks，hooks 不能写在循环、条件语句：hooks 链表是 `FunctionComponent render` 时动态生成的，条件语句可能会导致 useState 取值错乱，比如第一次渲染 `hook1 -> hook2` 第二次渲染 `hook2 -> hook3`，由于 useState 调用取值是顺序的，会导致 hook2 取到 hook1 的数据，hook3 取到 hook2 的数据。

**useState 返回值数组第二个参数为改变 state 的方法。**

在源码中，他被称为 dispatchAction。

```js
// 例子
updateNum === dispatchAction.bind(null, currentlyRenderingFiber, queue)
```

每当调用 setCount，都会创建一个代表一次更新的对象 update，如果是多次调用 dispatchAction 那么，update 会形成一条环状链表。

```js
update3 --next--> update1
  ^                 |
  |               update2
  |______next_______|
```

`updateNum` 方法即绑定了 `currentlyRenderingFiber` 与 `queue` 的 `dispatchAction`。

调用 dispatchAction 的目的是生成 update，并插入到 hook.queue 链表中。

**回答问题 1：**

**既然 `queue`、`currentlyRenderingFiber` 作为预置参数已经绑定给 dispatchAction，那么调用 dispatchAction 就不仅局限在组件内部了。**

**回答问题 2：**

已知 queue 中保存了本次更新 update 的链表。

在计算 state 时，会将 queue 的环状链表剪开挂载在 baseQueue 最后面，baseQueue 基于 baseState 计算新的 state。

在计算 state 完成后，新的 state 会成为 memoizedState

> 为什么更新不基于 memoizedState 而是 baseState，是因为 state 的计算过程需要考虑优先级。所以 memoizedState 并不一定和 baseState 相同。

调用 `updateNum`，其中参数会成为 `update.action`。

```js
let newState = baseState
let firstUpdate = hook.baseQueue.next
let update = firstUpdate

// 遍历 baseQueue 中的每一个update
do {
  if (typeof update.action === 'function') {
    newState = update.action(newState)
  } else {
    newState = update.action
  }
} while (update !== firstUpdate)
```

在 1 秒内点击 5 次。在点击第五次时，第一次点击创建的 update 还没进入更新流程，所以 `hook.baseState` 还未改变。所以 5 次 `update.action` 都是基于 `baseState === 0` 计算，如果传递的是函数，就会基于函数计算。

## 关于 useEffect 的一切

> [关于 useEffect 的一切](https://zhuanlan.zhihu.com/p/208546124)

- `effectList` 构建的顺序就是 `useEffect` 的执行顺序。
- `useLayoutEffect` 是在 UI 绘制之前同步调用，会阻塞 UI 绘制。
- 处理 `Passive effect` 是在渲染完成后异步执行，而`componentDidMount` 是在渲染完成后同步执行，所以他们是不同的。

## 关于 ref 的一切

> [关于 ref 的一切](https://zhuanlan.zhihu.com/p/215745959)

### string ref

当使用 `render props` 的开发模式，获得 `ref` 的组件实例可能与预期不同。

```js
// 使用方式：this.refs.['input-']
class App extends React.Component {
  renderRow = index => {
    // this.refs -> this 会绑定到 DataTable 组件实例，而不是 App 组件实例上
    return <input ref={'input-' + index} />

    // 如果使用 function 类型 ref，则不会有这个问题
    // return <input ref={input => this['input-' + index] = input} />;
  }

  render() {
    return <DataTable data={this.props.data} renderRow={this.renderRow} />
  }
}
```

### React.createRef

`React.createRef()` 返回 `ref` 对象，该对象仅仅是包含 `current` 属性的普通对象。

```js
function createRef() {
  return { current: null }
}
```

### useRef

对于 mount 与 update，useRef 分别对应两个函数。

```js
// mount
function mountRef<T>(initialValue: T) {
  // 获取当前 useRef hook
  const hook = mountWorkInProgressHook()
  // 创建 ref
  const ref = { current: initialValue }
  hook.memoizedState = ref
  return ref
}

// update
function updateRef<T>(initialValue: T) {
  // 获取当前 useRef hook
  const hook = updateWorkInProgressHook()
  // 返回保存的数据
  return hook.memoizedState
}
```

可以看到，ref 对象确实仅仅是包含 current 属性的对象。

> **注意：**
>
> 1. React.createRef 与 useRef 的返回值一个会被缓存，一个不会被缓存
>
> 2. **创建 useRef 时候，会创建一个原始对象，只要函数组件不被销毁，原始对象就会一直存在，那么我们可以利用这个特性，来通过 useRef 保存一些数据。**

通过 useRef 保存一些数据：

```jsx
const DemoUseRef = () => {
  const dom = useRef(null)
  // 渲染时为 null
  // console.log(dom.current)
  const handle = () => {
    /*  点击时打印 <div>div</div> dom 节点 */
    console.log(dom.current)
  }
  return (
    <div>
      {/* ref 标记当前 div 节点 */}
      <div ref={dom}>div</div>
      <button onClick={() => handle()}>点击</button>
    </div>
  )
}
```

### function ref

在 React 中，HostComponent、ClassComponent、ForwardRef 可以赋值 ref 属性。

> 这个属性在 ref 生命周期的不同阶段会被执行（对于function）或赋值（对于 `{current: any}`）。

生命周期可以分为两个大阶段：

- render 阶段为含有 ref 属性的 fiber 添加 Ref effectTag
- commit 阶段为包含 Ref effectTag 的 fiber 执行对应操作

```js
// function 与 {current: any} 类型的 ref 没有什么不同，只是一种函数会被调用，一种会被赋值。

// render 阶段执行 ref 变化，在 commit 阶段会先删除旧 ref，再执行 ref 更新。

// 内联函数会被调用两次，commitDetachRef（删除 ref） 一次，commitAttachRef（更新 ref） 一次

// 第一次 dom 的值删除后赋值为 null，第二次为更新的 DOM。
<input ref={input => (this.input = input)} />
```

### forwardRef

- 通过 forwardRef 可以将 ref 转发给子组件
- 子组件拿到父组件创建的 ref, 绑定到自己的某一个元素中

```jsx
import { useRef, forwardRef } from 'react'

// forwardRef 可以将 ref 转发给子组件
const JMInput = forwardRef((props, ref) => {
  return <input type="text" ref={ref} />
})

export default function ForwardDemo() {
  // forward 用于获取函数式组件 DOM 元素
  const inputRef = useRef()
  const getFocus = () => {
    inputRef.current.focus()
  }

  return (
    <div>
      <button onClick={getFocus}>聚焦</button>
      <JMInput ref={inputRef} />
    </div>
  )
}
```

forwardRef 的做法本身没有什么问题, 但是我们是将子组件的 DOM 直接暴露给了父组件:

- 直接暴露给父组件带来的问题是某些情况的不可控
- 父组件可以拿到 DOM 后进行任意的操作
- 我们只是希望父组件可以操作的 focus，其他并不希望它随意操作其他方法

### useImperativeHandle

```js
// useImperativeHandle(ref, createHandle, [deps])
import { useRef, forwardRef, useImperativeHandle } from 'react'

const JMInput = forwardRef((props, ref) => {
  const inputRef = useRef()
  // 作用: 减少父组件获取的 DOM 元素属性,只暴露给父组件需要用到的 DOM 方法
  // 参数1: 父组件传递的 ref 属性
  // 参数2: 返回一个对象，父组件通过 ref.current 调用对象中方法
  useImperativeHandle(ref, () => ({
    focus: () => {
      // 包了一层
      inputRef.current.focus()
    }
  }))
  return <input type="text" ref={inputRef} />
})

export default function ImperativeHandleDemo() {
  // 为什么使用: 因为使用 forward + useRef 获取子函数式组件 DOM 时，获取到的 dom 属性暴露的太多了
  // 解决: 在子函数式组件中定义父组件需要进行 DOM 操作，减少获取 DOM 暴露的属性过多
  const inputRef = useRef()

  return (
    <div>
      <button onClick={() => inputRef.current.focus()}>聚焦</button>
      <JMInput ref={inputRef} />
    </div>
  )
}
```

## 闭包陷阱

```js
// 每次都会执行
function Chat() {
  const [text, setText] = useState('')

  const onClick = useCallback(() => {
    // 只执行一次 text 是第一次执行时的值 text === ''
    sendMessage(text)
    // 添加 text 依赖项，每当 text 变化，useCallback 会返回一个全新的 onClick 引用，但这样就失去了 useCallback「缓存函数引用」的作用。
  }, [])

  return <SendButton onClick={onClick} />
}
```

我们期望点击后 `sendMessage` 能传递 `text` 的最新值。

然而实际上，由于回调函数被 `useCallback` 缓存，形成闭包，所以点击的效果始终是 `sendMessage('')`。

这就是：**「闭包陷阱」**。

> [React 官方团队出手，补齐原生 Hook 短板](https://zhuanlan.zhihu.com/p/509972998)

## React 合成事件

在 v17 之前，整个应用的事件会冒泡到同一个根节点（html DOM 节点）。

而在 v17 之后，每个应用的事件都会冒泡到该应用自己的根节点（ReactDOM.render 挂载的节点）。

合成事件的实现原理很好理解：

- 在 document 绑定 event handler，通过事件委托的方式监听事件
- 当事件触发后，通过 e.target 获取触发事件的 DOM，找到 DOM 对应的 fiber
- 从该 fiber 向根 fiber 遍历，收集遍历过程中所有绑定了该类型事件的 fiber 的 event handler，保存在数组 paths 中
- 遍历 paths，依次调用 event handler，模拟捕获流程
- 遍历 paths.reverse()，依次调用 event handler，模拟冒泡流程

## 受控组件

> [React 源码中如何实现受控组件](https://zhuanlan.zhihu.com/p/267008933)

```jsx
function App() {
  const [num, updateNum] = React.useState(0)

  const onChange = ({ target: { value } }) => {
    updateNum(value)
  }

  return <input value={num} onChange={onChange} />
}
```

## 泛型组件

> [React 泛型组件是什么？](https://mp.weixin.qq.com/s?__biz=MzIxNzUzOTk1MQ==&mid=2247484006&idx=1&sn=a2bdb658a24c648af72125f4d9b1a632&chksm=97f97666a08eff709b40bd49e58738682c37716cdc2b8e999881fb93e67d75bba32ff2cb7e70&scene=178&cur_album_id=2291981265736302593#rd)

## React.Fragment

React 的 render 函数可接受的返回值类型包括：

- string，比如 `return 'hello world'`
- number，比如 `return 123`
- array，比如 `return [<p>hello</p>, <p>world</p>]`
- JSX，比如 `return <div>hello world</div>`

其中 `[]` 会被处理为 `React.Fragment`，`React.Fragment` 可以支持 `key` 属性。`<></>` 不支持 key 属性。

> v16.14 版本之前的 React 中 JSX 对象会被编译为 `React.createElement`，此版本之后 createElement 被从 React 包中拆分出来，独立在 `react/jsx-runtime` 中。

编译工作则由 `@babel/plugin-transform-react-jsx` 插件完成。**需要注意插件执行顺序**，polyfill 包的执行顺序可能存在：`jsx-runtime -> core-js -> React -> ReactDOM` 情况。

## React.StrictMode

对于 react 而言，它推崇的是渲染结果只与 state 和 props 有关，也就是说，`result = f(props, state)`。

```js
let count = 0

function App() {
  const [state, setState] = useState(1)

  count++
  console.log(`I have run ${count} time(s)!`)
  return (
    <div>
      <button onClick={() => setState(e => e + 1)}>{state}</button>
    </div>
  )
}

export default App
```

React 在开发模式下会刻意执行两次渲染，如果传的 state 和 props 是一样的，渲染结果应该是一致的。如果不一致的话，那么可能你代码里存在了副作用，比如例子中，依赖了外部的 count，这就可能导致重复渲染的结果不一致。而 react 这种做法就是想在开发者在开发的时候就发现这个隐患并解决。

这就跟 get 请求一样，同样参数的两次 get 请求，返回的结果应该是一样的，叫做幂等原则。render 函数应该也是幂等的。

只有启用了 React.StrictMode 才会有这样的行为。

## React.lazy

```js
import { lazy, useEffect } from 'react'

const Test = () => {
  useEffect(() => {
    console.log('子组件 lazy 渲染')
  }, [])

  return (
    <div>
      <h2 style={{ color: 'red' }}>我是异步组件</h2>
    </div>
  )
}

const Lazy = lazy(() => {
  // React.lazy 和 Suspense 配合一起用，能够有动态加载组件的效果。
  // React.lazy 接受一个函数，这个函数需要动态调用 import()。
  // 它必须返回一个 Promise ，该 Promise 需要 resolve 一个 default export 的 React 组件。
  // lazy(() => import(异步组件))
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        default: () => <Test />
      })
    }, 4000)
  })
})

export default Lazy
```

## React.memo

```js
import { memo } from 'react'
import { shallEqual } from './utils/shallEqual'

const Memo = props => {
  console.log('子组件 Memo 渲染')
  return (
    <div>
      <h2>{props.count}</h2>
    </div>
  )
}

// 第二个参数类似于 scu 函数，默认浅比较
// 重写它会使默认浅比较失效，相当于自己写了浅比较
const propsEqual = (prevProps, nextProps) => {
  // true 不需要渲染，false 需要渲染
  // 浅比较
  if (shallEqual(prevProps, nextProps)) {
    return true
    // 拦截 props equal，大于 5 就不需要渲染子组件
  } else if (nextProps.count > 5) {
    return true
  } else {
    return false
  }
}

export default memo(Memo, propsEqual)
```

## React.cloneElement

```js
import React from 'react'

const Father = ({ children }) => {
  // children === {'Son', {className:}, ... } 和 msg 合并
  const newChildren = React.cloneElement(children, { msg: '我是混入的props' })
  return newChildren
}

const Son = props => {
  console.log('🚀 ~ file: Clone.jsx ~ line 7 ~ Son ~ props', props)

  return (
    <>
      <h2>Son 组件</h2>
    </>
  )
}

export { Father, Son }
```

## isValidElement

这个方法可以用来检测是否为 `react element` 元素,接受待验证对象，返回 true 或者 false。

## React.children.map

React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。

```js
import React from 'react'

export const Hello = () => {
  return <h2>hello Map1</h2>
}

export const OpacityMap = props => {
  console.log('不透明结构：props.children.length', props.children.length)
  // Children.count可以返回同一级别子组件的数量。
  console.log('不透明结构：React.Children.count', React.Children.count(props.children))

  // 对于不透明数据结构我们可以使用 React.Children.map 来遍历
  // Children.toArray 返回，props.children 扁平化后结果
  const children = React.Children.map(props.children, child => <div style={{ color: 'red' }}>{child}</div>)

  return children
}

export const LucencyMap = props => {
  console.log('透明结构：props.children.length', props.children.length)
  console.log('透明结构：React.Children.count', React.Children.count(props.children))
  return props.children
}
```

如果 children 是一个 Fragment 对象，它将被视为单一子节点的情况处理，而不会被遍历。

## Immutable

Immutable 不是 React 的任何一部分，更不是核心。React 唯一需要的是知道 state 何时改变了，但 React 无法监控深层次的 state 对象变化。那如何避免程序员不小心改变了深层次的对象但 React 不知道呢？训练程序员使用 Immutable，使得程序员不能修改对象，只能创建新对象，这样就能保证 React 一定能监控到变化。

```js
// 手写 react 15
// 核心：更新状态
this._instanceComponent.state = { ...this._instanceComponent.state, ...nextState }

// 组件
// 训练程序员使用 Immutable
this.state = { count: 0 }
this.setState({ count: this.state.count + 1 })
```

## Record 和 Tuple

### 语法

- Record ：不可变的哈希表
- Tuple ：不可变的数组

这两者，除了不可变外，另一个重要的特性是，他们是按值比较的，也就是说，带有相同内容的 Record 和 Tuple 在进行严格比较(===)时 ，会被认为是同一个对象，而非像 object 一样，按引用比较。

> [使用 Record 和 Tuple](https://github.com/bloomberg/record-tuple-polyfill)

```js
// 声明
const record = #{
  a: 1,
  b: 2
}

const tuple = #[1, 2]

// 复用

const record = #{
  a: 1,
  b: 2
}

const anotherRecord = #{
  ...record,
  c: 3
}

const tuple = #[1, 2]

const anotherTuple = #[...tuple, 3]

// 解构

const { bar } = #{ foo: 1, bar: 2 }
// bar => 2

const [head] = #[1, 2]
// head => 2

// 根据值比较特性利用 Set 去重

const foo = new Set(#[#{ id: 1 }, #{ id: 1 }, #{ id: 2 }])
// foo => Set(2) { #{id: 1}, #{id: 2} }
```

可以看到 Record 和 Tuple 用起来非常像 object 和 Array，然而不同于他们的是，Record 和 Tuple 存储的类型是被严格限制的，Record 和 Tuple 只能存放基础数据类型以及 Record 和 Tuple，不支持函数或其他引用类型。

如果你尝试这么做 `const foo = #{ bar: () => {} };` 你会得到一段报错 `"TypeError: cannot use a function as a value in a record"` 告诉你，函数不能作为 Record 的值，对于 Tuple 同理。

### 更容易使用的 useMemo

当我们想要优化性能的时候，我们会尝试将引用类型或需要大量计算的值使用 useMemo 进行存储，防止重复计算带来的损耗，以及新的引用类型产生的时候，打破 React 对不可变数据的约定，进而导致无效的重渲染。

但是 useMemo 的问题在于，一旦你构建的值并非基于基本类型的话，就必须将依赖的值同样记忆化，这种传染的性质导致很多的重复工作，究其原因在于，基础类型是值比较 的，而引用类型则比较的是内存地址。

```js
// ---- version1
const input = { id: props.id, content: props.content };
const data = expensiveEffect(input);
// 为了优化这段代码，我们需要
// ---- version2
const input = { id: props.id, content: props.content };
const data = useMemo(() => expensiveEffect(input), [input]);
// 不行，每次渲染 input 依旧会重新生层，依旧会触发重复计算
// ---- version3
const input = useMemo(() => { id: props.id, content: props.content }, [props.id, props.content]);
const data = useMemo(() => expensiveEffect(input), [input]);
// 可以了，通过使用 Tuple，我们只需要加个 # 符合即可
// ---- version4
const input = #{ id: props.id, content: props.content };
const data = useMemo(() => expensiveEffect(input), [input]);
```

### 更加符合心智的 useEffect

函数式组件经常带来的一个心智成本是，除非你显式的使用了 useMemo 包裹了引用类型的数据结构，否则每一次渲染都会创建一个新的引用类型，考虑一下代码：

```js
const UserProfile1 = props => {
  const user = {
    id: props.id,
    name: props.name
  }

  useEffect(() => {
    fetchUserDetail(user)
  }, [user])
}

const UserProfile2 = props => {
  const user = #{
    id: props.id,
    name: props.name
  }

  useEffect(() => {
    fetchUserDetail(user)
  }, [user])
}
```

对于 UserProfile1 来说，每一次渲染都会触发 useEffect 的执行，因为对于按引用比较的 object 来说，每一次渲染时创建的 user 对象的引用必然与上一次的不同，尽管可能其内容并没有发生改变。

而对于 UserProfile2，由于 Record 比较是根据值本身，因此即使重复渲染时生成了一个新的 Record 对象，由于内容和先前的相同，JavaScript 也会认为其没有发生变化，也就不会触发 React 的重渲染。

### 简单不易出错的 memo 机制

当我们想要组件仅在 props 发生变化的时候进行重渲染，我们需要使用 memo 函数(对于函数组件来说)来包裹组件，例如我们会写出以下代码

```js
const ExpansiveComponent = props => {
  // some expensive effects
  const data = expensiveEffect(props.input)
  // ...
}

export default memo(ExpansiveComponent)
```

但是对于 React 的初学者来说，很容易写出一下代码

```js
const Container = props => {
  // ...
  return <ExpansiveComponent input={{ id: props.id }} />
}
```

这种情况下，由于 memo 默认使用浅比较的方式比较前后的 props ，因此每一次 Container 的重渲染，都会生成一个新的 input 对象传给 ExpansiveComponent，进而导致重渲染的发生，而 memo 机制完全没有起到任何作用。

然而，同样的代码如果使用 Record 编写却是符合需求的。

```js
const Container = props => {
  // ...
  return <ExpansiveComponent input={#{ id: props.id }} />
}
```

### 更容易书写 key

React 使用 key 机制来保证渲染列表时候的性能，React 希望对于一个对象，会有一个属性来标识自身，但是现实场景中可能会出现其唯一性是由多个属性决定的，当然我们可以使用数组索引值当做 key ，但这会造成性能下降。我们也可以手动拼接多个属性，当做 key 传给 React 。

```js
const list = [
  { country: 'FR', localPhoneNumber: '111111' },
  { country: 'FR', localPhoneNumber: '222222' },
  { country: 'US', localPhoneNumber: '111111' }
]

;<>
  {list.map(item => (
    <Item key={`${item.country}_${item.localPhoneNumber}`} item={item} />
  ))}
</>
```

但是由于 Record 本身就是独一无二的 ，我们可以直接将 Record 当做 key 传给 React。

```js
const list = #[#{ country: 'FR', localPhoneNumber: '111111' }, #{ country: 'FR', localPhoneNumber: '222222' }, #{ country: 'US', localPhoneNumber: '111111' }]
;<>
  {list.map(item => (
    <Item key={item} item={item} />
  ))}
</>
```

## Profiler

Profiler 这个 api 一般用于开发阶段，性能检测，检测一次 react 组件渲染用时，性能开销。

Profiler 需要两个参数：

- 第一个参数：是 id，用于表识唯一性的 Profiler。
- 第二个参数：onRender 回调函数，用于渲染完成，接受渲染参数。

实践：

```js
<Profiler id="father" onRender={callBack}>
  <Father>
    <Son name="son" />
  </Father>
</Profiler>
```

- 0 -id: root -> Profiler 树的 id 。
- 1 -phase: mount -> mount 挂载 ， update 渲染了。
- 2 -actualDuration: 6.685000262223184 -> 更新 committed 花费的渲染时间。
- 3 -baseDuration: 4.430000321008265 -> 渲染整颗子树需要的时间
- 4 -startTime : 689.7299999836832 -> 本次更新开始渲染的时间
- 5 -commitTime : 698.5799999674782 -> 本次更新 committed 的时间
- 6 -interactions: set{} -> 本次更新的 interactions 的集合

尽管 Profiler 是一个轻量级组件，我们依然应该在需要时才去使用它。对一个应用来说，每添加一些都会给 CPU 和内存带来一些负担。

## 双缓存 Fiber 树

> 在内存中构建并直接替换的技术叫做双缓存 (opens new window)。

**在 React 中最多会同时存在两棵 Fiber 树。当前屏幕上显示内容对应的 Fiber 树称为 current Fiber 树，正在内存中构建的 Fiber 树称为 workInProgress Fiber 树。**

React 使用“双缓存”来完成 Fiber 树的构建与替换——对应着 DOM 树的创建与更新。

```js
currentFiber.alternate === workInProgressFiber
workInProgressFiber.alternate === currentFiber
```

首次执行 `ReactDOM.render` 会创建 fiberRootNode（源码中叫 fiberRoot）和 rootFiber。其中 fiberRootNode 是整个应用的根节点，rootFiber 是  `<App/>`  所在组件树的根节点。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/rootfiber.png)

**流程：**

> **mount-render：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/workInProgressFiber.png)

> **mount-commit：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/wipTreeFinish.png)

> **update-render：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/wipTreeUpdate.png)

> **update-commit：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/currentTreeUpdate.png)

## ErrorBoundary

> [为什么 Hook 没有 ErrorBoundary？](https://zhuanlan.zhihu.com/p/528040023)

### ErrorBoundary 实现原理

`ErrorBoundary` 可以捕获子孙组件中 **「React工作流程」** 内的错误。

**「React工作流程」**：

- render 阶段，即 **「组件render」**、**「Diff算法」** 发生的阶段
- commit 阶段，即 **「渲染DOM」**、**「componentDidMount/Update执行」** 的阶段

这也是为什么 **「事件回调中发生的错误」** 无法被`ErrorBoundary`捕获 —— 事件回调并不属于 **「React工作流程」**。

### getDerivedStateFromError 原理

当捕获错误后，即：

- 对于 **「render阶段」**，handleError 执行后
- 对于 **「commit阶段」**，captureCommitPhaseError

会在 ErrorBoundary 对应组件中触发类似如下更新：

```js
// 同 this.setState(num => num + 1)
this.setState(
  // 获取从 error 派生的 state
  getDerivedStateFromError.bind(null, error)
)
```

getDerivedStateFromError 要求开发者返回 **「新的 state」** —— **本质来说，就是触发一次新的更新**。

### componentDidCatch 原理

生命周期函数 —— `componentDidCatch` 的实现原理：

`ClassComponent` 中 `this.setState` 的第二个参数，可以接收 **「回调函数」** 作为参数：

```js
this.setState(newState, () => {
  // ...回调
})
```

**当触发的更新渲染到页面后，回调会触发。**

当捕获错误后，会在 ErrorBoundary 对应组件中触发类似如下更新：

```js
this.setState(this.state, componentDidCatch.bind(this, error))
```

### 没有定义 `ErrorBoundary`

可以发现，**「React运行流程」** 中的错误，都已经被 `React` 自身捕获了，再交由 `ErrorBoundary` 处理。

如果没有定义 `ErrorBoundary`，这些 **「被捕获的错误」** 需要重新抛出，营造 **「错误未被捕获的感觉」**。

`ReactDOM.render(element, container[, callback])` 第三个参数能接收 **「回调函数」**。

如果开发者没有定义 `ErrorBoundary`，那么 `React` **最终会在 `ReactDOM.render` 的回调中抛出错误**。
