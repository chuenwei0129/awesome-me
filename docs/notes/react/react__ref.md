---
title: 关于 ref 的理解
group:
  title: 深入探讨
---

# React 文档摆烂不是一天两天了。<!-- omit in toc -->

> 别问，问就是程序员最擅长写[文档](https://zh-hans.react.dev/)。

## 重读 React 文档

1. [React 元素 vs React 节点](https://zh-hans.react.dev/reference/react/isValidElement#react-elements-vs-react-nodes)

## 从 DOM 谈起：[前端为什么操作 DOM 是最耗性能的呢？](https://www.zhihu.com/question/324992717)

**其一：** 浏览器的 JavaScript 引擎与 DOM 引擎共享一个主线程。任何 DOM API 调用都要先将 JS 数据结构转为 DOM 数据结构，再挂起 JS 引擎并启动 DOM 引擎，执行过后再把可能的返回值反转数据结构，重启 JS 引擎继续执行。**这种上下文切换很耗性能**。

**其二：** 很多 DOM API 的读写都涉及**页面布局的重新计算**，以确保返回值的准确，涉及样式、结构的还会触发**页面重新绘制**，更耗性能。

**综上：** **单次 DOM API 调用性能就不够好**，频繁调用就会迅速积累上述损耗，导致 DOM 引擎占用主线程过久，用户操作不能及时触发 JS 事件回调，让用户感觉卡顿。

所以，**解决此问题的方案本质不在于用不用 jQuery、用不用虚拟 DOM，而是 —— 减少不必要的 DOM API 调用。**

而减少不必要调用的各种方案，都遵循 **「在 JS 中缓存必要数据，计算界面更新时的阶段数据差异，只提交最终差集」** 的基本思路。

**虚拟 DOM 计算的是最终 DOM 结构的差异，还有的引擎计算的是 DOM 所绑定数据的差异，各有千秋。**

## [JSX 是什么？](https://www.zhihu.com/question/271485214/answer/386097473)

HTML tag 书写方式和 JSON 的书写方式是差不多的：**它们都是树形结构**。

DOM 是一个树形结构，这个树形结构对应的就是我们的 HTML tag，书写 HTML 其实并不是很费脑，因为一切都抽象成了一个人能够看懂的 Tag ，层级之间的关系就好像画图一样。

如果我们使用 JS api 去书写 HTML tag 是非常痛苦的，所以开发人员就瞄上了和 HTML tag 有相似结构的 json 数据格式。因为 json 是 javascript 的原生对象，所以就让 **「在 JS 中 声明式书写 HTML 带来了可能」。**

但是能够书写 HTML 远远已经不能满足我们现代工业的需求，我们需要一种机制：

- **能够声明式的书写 HTML**
- **能够在 JS 中书写 HTML**
- **能够小粒度的复用我们的这些 HTML**

那么，通过 babel 转化的 jsx 就应运而生了，**让人们拥有了使用 JS 写 HTML，并且声明式，又可以控制粒度的复用的能力**。

## [为什么说 immutable 是 React 的核心，如何理解这一概念？](https://www.zhihu.com/question/446377023)

React 中虚拟 DOM 计算的是最终 DOM 结构的差异，即等价于**如何判断两个对象所有属性是否相等？**

假设 React 设计成 state 对象树是 mutable，可以随时赋值（即不使用 setState），那么定位到具体变化的 state 就需要遍历了，不得不进行深度比较才能发现变化的地方。时间复杂度就上去了。

本质上你可以认为，让 state 的对象树仅接受 immutable 对象子树合并和替换，**是一种避免深度 diff 的技巧。替换的位置就是改动的起始检查位置**。

那么 React 的默认渲染行为就很容易理解了：**一旦 parent 触发重新渲染那么其 child 也必然跟着触发重新渲染，不管它依赖的 props 有没有变。**

那么提供性能优化也就很有必要了：React 由于只触发更新，然后自上而下递归更新，所以并不能精确控制更新的细粒度，因此 React 引入了一些叫做 ShouldUpdateComponent 的玩意来手动做性能优化。通过 shallow compare 判断 vdom 有没有变来控制组件的更新，但即使是 shallow compare 也不是一个免费的过程 - 它是 `o(n)`。所以把所有的组件都套在 `React.memo`，`PureComponent` 这些 API 里面大概率可能会让你的整体 performance 更差。

**总结：**

immutable 是一个约束。是 React 底层实现需要的，到了上层使用方就 immutable 完事，好好表达业务逻辑，别挖坑。

## DOM Diff

> [温故知新：手写迷你 react](https://github.com/chuenwei0129/build-my-own-x/blob/main/build-my-own-react/README.md)

## React 为什么需要并发

### 浏览器的一帧里做了什么？

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/1_ad-k5hYKQnRQJF8tv8BIqg.png)

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

### React 15 的问题

**在 React 15 中，组件树更新过程是同步地一层组件套一层组件，这可能会导致性能问题。**

当 React 决定要加载或者更新组件树时，会做很多事，比如调用各个组件的生命周期函数，计算和比对 Virtual DOM，最后更新 DOM 树，这整个过程是同步进行的，也就是说只要一个加载或者更新过程开始，那 React 就以不破楼兰终不还的气概，**一鼓作气运行到底，中途绝不停歇**。

表面上看，这样的设计也是挺合理的，因为更新过程不会有任何 I/O 操作嘛，完全是 CPU 计算，所以无需异步操作，的确只要一路狂奔就行了，但是，当组件树比较庞大的时候，问题就来了。

**假如更新一个组件需要 1 毫秒，如果有 200 个组件要更新，那就需要 200 毫秒，在这 200 毫秒的更新过程中，浏览器那个唯一的主线程都在专心运行更新操作，无暇去做任何其他的事情。**

想象一下，在这 200 毫秒内，用户往一个 input 元素中输入点什么，敲击键盘也不会获得响应，因为渲染输入按键结果也是浏览器主线程的工作，但是浏览器主线程被 React 占着呢，抽不出空，最后的结果就是用户敲了按键看不到反应，等 React 更新过程结束之后，咔咔咔那些按键一下子出现在 input 元素里了。

**这就是所谓的界面卡顿，很不好的用户体验。**

### 如何解决这个问题呢？

如何解决这个问题呢？React18 给出的答案就是：**并发**。

我们可以将 react 更新看作一个任务，click 事件看作一个任务。**在并发的情况下，react 更新到一半的时候，进来了 click 任务，这个时候先去执行 click 任务。等 click 任务执行完成后，接着继续执行剩余的 react 更新。** 这样就保证了即使在耗时更新的情况下，用户依旧是可以进行交互的。

**官网如此描述：**

> Concurrency is not a feature, per se. It’s a new behind-the-scenes mechanism that enables React to prepare multiple versions of your UI at the same time.

## 时间切片

**API：** [window.requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback)

**核心：** 浏览器在一帧有空闲的情况下，去执行某个低优先级的任务。比如其余任务执行了 10 ms，那么这一帧里就还剩 6.7ms 的时间，那么就会触发 requestIdleCallback 的回调。

**假设：** 如果我们把 React 的更新（如 200 ms）拆分成一个个小的更新（如 40 个 5 ms 的更新），然后每个小更新放到 requestIdleCallback 中执行。那么就意味着这些小更新会在浏览器每一帧的空闲时间去执行。如果一帧里有多余时间就执行，没有多余时间就推到下一帧继续执行。这样的话，更新一直在继续，并且同时还能确保每一帧里的事件如 click，宏任务，微任务，渲染等能够正常执行，也就可以达到用户可交互的目的。

**兼容性：** [实现 React requestIdleCallback 调度能力](https://juejin.cn/post/7021506472232583199)

**小知识：**

设置 10000 个 `setTimeout(fn, 0)`，并不会阻塞线程，而是浏览器会将这 10000 个回调合理分配到每一帧当中去执行。

比如：10000 个 setTimeout 在执行时，第一帧里可能执行了 300 个 setTimeout 回调，第二帧里可能执行了 400 个 setTimeout 回调，第 n 帧里可能执行了 200 个回调。浏览器为了尽量保证不掉帧，会合理将这些宏任务分配到帧当中去。

## [为什么 Vue 3 里没有时间分片？](https://mp.weixin.qq.com/s?__biz=MzIxNzUzOTk1MQ==&mid=2247484011&idx=1&sn=4e989038cc078729fbfd436780176e81&chksm=97f9766ba08eff7dbd54f698293dc0d032de8460bccc6f1c5ce8e5f44012ae084d889dcafff1&cur_album_id=2291981265736302593&scene=189#wechat_redirect)

Fiber 只是递归改循环，树变链表。用的是 requestAnimationFrame 来调度， requestAnimationFrame 和 setTimeout 其实差不多的，**本质都是化同步为异步的渲染方式**。

Vue 的渲染是走[异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#%E5%BC%82%E6%AD%A5%E6%9B%B4%E6%96%B0%E9%98%9F%E5%88%97)，简单说就是所有 setter 的更新会被推入 watchers 队列，等 nextTick（早期原理是 Promise > MutationObserver > setTimeout 看浏览器支持程度优先级实现）的时候再执行 Render Function。

**而针对单次的大数据量更新：**

- CPU 计算量不大，但 DOM 操作非常复杂（比如说你向页面中插入了十万个节点）。这种场景下不管你做不做时间分片，页面都会很卡。
- CPU 计算量非常大。理论上时间分片在这种场景里会有较大收益，但是人机交互研究表明，除了动画之外，大部分用户不会觉得 10 毫秒和 100 毫秒有很大区别。

## Fiber

React 传统的 Reconciler 是通过类似于虚拟 DOM 的方式来进行对比和标记更新。树的结构不能很好满足将更新拆分的需求。因为它一旦发生中断，下次更新时，很难找到上一个节点和下一个节点的信息，虽然有办法能找到，但是相对而言比较麻烦。所以，React 团队引入了 Fiber 来解决这一问题。

**普通树：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/SCR-20220611-1xf.png)

**链表树：**

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/SCR-20220611-1wv.png)

如果节点 2 发生中断，普通树结构由于只保存了 3，4 的索引，恢复中断时，其它节点信息就会丢失，而链表树就能够指针把其它节点的信息都找回来。

**实现：**

```js
// html 结构
// const element = (
// <div id="A1">
//   <div id="B1">
//     <div id="C1"></div>
//     <div id="C2"></div>
//   </div>
//   <div id="B2"></div>
// </div>
// )

// 虚拟 dom
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

// 实现 fiber
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

## Hooks

  > React 的 hooks 是在 fiber 之后出现的特性，所以很多人误以为 hooks 是必须依赖 fiber 才能实现的，其实并不是，**它们俩没啥必然联系。**

**视频：**

> [Can Swyx recreate React Hooks and useState in under 30 min? - JSConf.Asia](https://www.youtube.com/watch?v=KJP1E-Y-xyo)

**文章：**

> [29 行代码深入 React Hooks 原理](https://zhuanlan.zhihu.com/p/127255755)

## useState

> [关于 useState 的一切](https://zhuanlan.zhihu.com/p/200855720)

## useEffect

- [关于 useEffect 的一切](https://zhuanlan.zhihu.com/p/208546124)

```js
import * as React from 'react';

export default function App() {
  console.log('App render');

  React.useEffect(() => {
    console.log('App useEffect');
  });

  React.useLayoutEffect(() => {
    console.log('App useLayoutEffect');
  });

  return <Parent />;
}

const Parent = () => {
  console.log('Parent render');

  React.useEffect(() => {
    console.log('Parent useEffect');
  });

  React.useLayoutEffect(() => {
    console.log('Parent useLayoutEffect');
  });

  return <div>Parent</div>;
};

// 协调器的工作流程是使用遍历实现的递归。所以可以分为递与归两个阶段。
// useLayoutEffect 是在 UI 绘制之前（虚拟 DOM 准备完成）同步调用，会阻塞 UI 绘制。
// useEffect 是在渲染完成后异步执行，而类组件 componentDidMount 是在渲染完成后同步执行，所以他们是不同的。
// 与 componentDidMount 更类似的是 useLayoutEffect，他会在渲染完成后同步执行。

// 执行顺序
// 递
// App render
// Parent render
// 归
// Parent useLayoutEffect
// App useLayoutEffect
// 渲染完成后异步执行
// Parent useEffect
// App useEffect
```

## useRef

> [关于 ref 的一切](https://zhuanlan.zhihu.com/p/215745959)

### forwardRef

- 通过 forwardRef 可以将 ref 转发给子组件
- 子组件拿到父组件创建的 ref, 绑定到自己的某一个元素中

```js
import { useRef, forwardRef } from 'react'

const JMInput = forwardRef((props, ref) => {
  return <input type="text" ref={ref} />
})

export default function ForwardDemo() {
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
  // 作用: 减少父组件获取的 DOM 元素属性, 只暴露给父组件需要用到的 DOM 方法
  // 参数 1: 父组件传递的 ref 属性
  // 参数 2: 返回一个对象，父组件通过 ref.current 调用对象中方法
  useImperativeHandle(ref, () => ({
    focus: () => {
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

## 纯函数

> [React 推荐函数组件是纯函数，但是组件有状态就不可能是纯函数，怎么理解有状态的纯函数？](https://www.zhihu.com/question/537538929)

hooks 在思维模型上只是组件函数的参数的另一种写法，函数组件只是一个接受参数 `(props, [state1, setState1], [state2, setState2], ...restHooks)` 然后返回 jsx 的纯函数。

**那 hooks 不能放 if 里面就是自然而然的了 —— 一个函数有多少个参数、各个参数的顺序是什么，这应当是永远不会变的，不能允许它在每次调用时都可能不同。**

函数组件并不会调用 `setState`，调用 `setState` 的是用户行为触发的回调函数，它已经脱离了函数组件本身的作用域了。

```js
function pure() {
  return () => console.log(...)
}
```

不能说因为 `pure` 返回的回调函数有副作用，所以 `pure` 本身有副作用。

## 闭包陷阱

```js
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

## 事件

> [合成事件层太厚了](https://www.zhihu.com/question/316425133/answer/673451425)

在 v17 之前，整个应用的事件会冒泡到同一个根节点（html DOM 节点）。而在 v17 之后，每个应用的事件都会冒泡到该应用自己的根节点（ReactDOM.render 挂载的节点）。

## 组件

- [React 源码中如何实现受控组件](https://zhuanlan.zhihu.com/p/267008933)
- [React 组件的受控与非受控](https://zhuanlan.zhihu.com/p/536322574)
- [React 泛型组件是什么？](https://mp.weixin.qq.com/s?__biz=MzIxNzUzOTk1MQ==&mid=2247484006&idx=1&sn=a2bdb658a24c648af72125f4d9b1a632&chksm=97f97666a08eff709b40bd49e58738682c37716cdc2b8e999881fb93e67d75bba32ff2cb7e70&scene=178&cur_album_id=2291981265736302593#rd)

## StrictMode

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

> [React 18: useEffect Double Call，Mistake or Awesome？](https://www.youtube.com/watch?v=j8s01ThR7bQ)

这就跟 get 请求一样，同样参数的两次 get 请求，返回的结果应该是一样的，叫做幂等原则。render 函数应该也是幂等的。

只有启用了 React.StrictMode 才会有这样的行为。

> [什么是严格模式](https://ahooks.js.org/zh-CN/guide/blog/strict/)

## 双缓存 Fiber 树

> 在内存中构建并直接替换的技术叫做双缓存 (opens new window)。

**在 React 中最多会同时存在两棵 Fiber 树。当前屏幕上显示内容对应的 Fiber 树称为 current Fiber 树，正在内存中构建的 Fiber 树称为 workInProgress Fiber 树。**

React 使用 **双缓存** 来完成 Fiber 树的构建与替换——对应着 DOM 树的创建与更新。

首次执行 `ReactDOM.render` 会创建 fiberRootNode（源码中叫 fiberRoot）和 rootFiber。其中 fiberRootNode 是整个应用的根节点，rootFiber 是 `<App/>` 所在组件树的根节点。

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

## Portals

> [react 中的神器-- 渲染到父组件之外的 dom 用什么？](https://www.bilibili.com/video/BV15R4y1x75Y?spm_id_from=333.999.0.0&vd_source=c4234488bc8659e17c631716b9036762)

## 并发调度

### Automatic batching

> [给女朋友讲 React18 新特性：Automatic batching](https://zhuanlan.zhihu.com/p/382216973)

### tearing

[撕裂](https://en.wikipedia.org/wiki/Screen_tearing)（tearing）是图形编程中的一个传统术语，是指视觉上的不一致。

**撕裂通常是由于 React 使用了外部的状态导致的。React 在并发渲染过程中，这些外部的状态会发生变化，但是 React 却无法感知到变化。**

假设我们有一个外部 store，初始颜色是蓝色。在我们的应用中组件树中有多个组件都依赖于 store 的值。

假设组件树的渲染需要 400 ms，在渲染到 100 ms 时，假设一个用户点击了按钮，将 store 的颜色由蓝色改为红色。

在非并发渲染场景下，不会发生任何处理。因为组件树的渲染是同步的。用户的点击事件会在视图渲染完成后执行。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/0c371a43388a4ce29eba5a7deb888c85_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.webp)

但是在并发渲染场景下，React 可以让点击发生反应，打断视图渲染。此时很有可能因为时间分片的原因，前 100ms 有一些组件已经完成了渲染，引用的 store 值是蓝色，剩下 300ms 渲染的组件引用的 store 值是红色，这些组件虽然读取同一个数据却显示出不同的值，这种边缘情况就是 “撕裂”。

![](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/fe-engineering/e758382e98814f5ab364e85ec3524ef9_tplv-k3u1fbpfcp-zoom-in-crop-mark_1304_0_0_0.webp)

## 组件更新策略

> [React 组件到底什么时候 render 啊](https://zhuanlan.zhihu.com/p/268158686)

**小知识 1：**

老 Context API 的实现依赖 fiber 树的遍历，Context 对应数据会保存在栈中。在递阶段，Context 不断入栈，所以 Consumer 可以通过 Context 栈向上找到对应的 context value。在归阶段，Context 不断出栈。

所以当我们使用 `shouldComponentUpdate` 或者其它性能优化时，可能会导致
：**组件命中 bailout 逻辑，如果组件的子树满足 bailout 的条件 4 的话那么其 fiber 子树不会再继续遍历生成。Context 的入栈、出栈就失效了。**

**小知识 2：**

`FiberRootNode` 是整个应用的根节点，`RootFiber` 是调用 `ReactDOM.render` 创建的 `fiber`。之所以要区分 fiberRootNode 与 rootFiber，是因为在应用中我们可以多次调用 ReactDOM.render 渲染不同的组件树，他们会拥有不同的 rootFiber。但是整个应用的根节点只有一个，那就是 fiberRootNode。

**小知识 3：**

我们知道组件 `render` 会返回 `JSX`，`JSX` 是 `React.createElement` 的语法糖。所以 render 的返回结果实际上是 `React.createElement` 的执行结果，即一个包含 `props` 属性的对象。

即使本次更新与上次更新 `props` 中每一项参数都没有变化，但是**本次更新是 `React.createElement` 的执行结果，是一个全新的 `props` 引用**，所以 `oldProps !== newProps`，组件不会命中 bailout 逻辑。

React 未进行优化的心智模型可以简化成，**父组件渲染，子组件必然渲染**。如果我们使用了 PureComponent 或 Memo，那么在判断是进入 render 还是 bailout 时，不会判断 oldProps 与 newProps 是否**全等**，而是会对 props 内每个属性进行浅比较。

```js
// 写 react 就是在写 js
<Child />
// 会编译为
React.createElement(Child, null)
```

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

<!-- bit 计算最多支持 31 个不够用，可以改为在 createContext 第二个回调参数里派发事件通知并 return 0，以上实践完美解决了 context 按需触发更新 -->

- [搞明白位运算、补码、反码、原码](bits.md)
- [ObservedBits: React Context 的秘密功能](https://zhuanlan.zhihu.com/p/51073183)

### 方案四：在 provider 和 context 之间做 client 级别的依赖订阅更新

> [use-context-selector](https://github.com/dai-shi/use-context-selector)

## 状态管理

> [Vuex、Flux、Redux、Redux-saga、Dva、MobX](https://zhuanlan.zhihu.com/p/53599723)


> [React新文档：不要滥用Ref哦～](https://zhuanlan.zhihu.com/p/529491295)

<code src="../../../playground/react/ref1"></code>

<code src="../../../playground/react/view"></code>
