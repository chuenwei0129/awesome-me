# 关于 React 的一切（二）<!-- omit in toc -->

- [代数效应](#代数效应)
- [react 中代数效应](#react-中代数效应)
- [hooks](#hooks)
- [requestAnimationFrame](#requestanimationframe)
- [requestIdleCallback](#requestidlecallback)
- [MessageChannel](#messagechannel)
- [react 首次渲染](#react-首次渲染)
- [react dom diff](#react-dom-diff)
  - [单节点 diff](#单节点-diff)
  - [多节点 diff](#多节点-diff)
- [关于 useState 的一切](#关于-usestate-的一切)
  - [hook 如何保存数据](#hook-如何保存数据)
  - [多个 hook 如何获取数据](#多个-hook-如何获取数据)
  - [useState 执行流程](#usestate-执行流程)
  - [第二个问题](#第二个问题)
  - [useState 与 useReducer](#usestate-与-usereducer)
- [关于 useEffect 的一切](#关于-useeffect-的一切)
  - [useEffect 的执行顺序](#useeffect-的执行顺序)
  - [effectList](#effectlist)
  - [渲染](#渲染)
  - [useEffect 与 useLayoutEffect](#useeffect-与-uselayouteffect)
- [useMemo / useCallback](#usememo--usecallback)
- [如何优雅处理使用 React Context 导致的不必要渲染？](#如何优雅处理使用-react-context-导致的不必要渲染)
  - [方案一：Split contexts](#方案一split-contexts)
  - [方案二：使用「泛 memo」方案](#方案二使用泛-memo方案)

## 代数效应

> 回忆一下高深的小学数学，应该是长这样：

```js
2x + 3y + 4z
```

可以给这个代数式起个名字 —— getNum。

变为 JS 函数

```js
function x() {}
function y() {}
function z() {}

function getNum() {
  const a = 2 * x()
  const b = 3 * y()
  const c = 4 * z()
  return a + b + c
}
```

上面代码中的 x、y、z 三个函数，就是「代数式」getNum 中的三个变量。

> 有什么问题？

getNum 依赖于 x、y、z 三个函数。

以函数的作用来分类：做什么 → `getNum()`，怎么做 → `x()` `y()` `z()`。

**「做什么」与「怎么做」是耦合的。**

如何解耦？

```js
function getNum() {
    const a = 2 * perform 'x'
    const b = 3 * perform 'y'
    const c = 4 * perform 'z'
    return a + b + c
}
```

好了，先定义好「做什么」，保证主流程畅通（至于怎么做，关我屁事）。

至于「怎么做」，可以写在任意地方，比如另外一个文件中：

```js
try {
  getNum();
} handle (effect) {
  if (effect === 'x') {

  } else if (effect === 'y') {

  } else if (effect === 'z') {

  }
}
```

WARNING: 上面的是伪代码，目前 JS 中并没有实现上述语法。

> 什么是代数效应？
> 效应（Effects），就是 x y z 三兄弟，这三个函数会产生作用，它们被称为「效应」。

而代数（Algebraic），注意，是个形容词。

什么是代数效应？

就是「效应」如同「代数式」中的变量一样，被插入了函数。

所以「代数效应」这个翻译很猥琐，全称应该是「像是代数式中变量一样的效应」。

这就是我的理解，完了 。

## react 中代数效应

```js
// hooks 的逻辑复用实现，把怎么做逻辑抽离出来
```

## hooks

```js
let workInProgressHook
let isMount = true

const fiber = {
  memoizedState: null,
  stateNode: App
}

function schedule() {
  workInProgressHook = fiber.memoizedState
  const app = fiber.stateNode()
  isMount = false
  return app
}

function dispatchAction(queue, action) {
  const update = {
    action,
    next: null
  }
  if (queue.pending === null) {
    update.next = update
  } else {
    update.next = queue.pending.next
    queue.pending.next = update
  }
  queue.pending = update

  schedule()
}

function useState(initialState) {
  let hook

  if (isMount) {
    hook = {
      queue: {
        pending: null
      },
      memoizedState: initialState,
      next: null
    }
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook
    } else {
      workInProgressHook.next = hook
    }
    workInProgressHook = hook
  } else {
    hook = workInProgressHook
    workInProgressHook = workInProgressHook.next
  }

  let baseState = hook.memoizedState
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next

    do {
      const action = firstUpdate.action
      baseState = action(baseState)
      firstUpdate = firstUpdate.next
    } while (firstUpdate !== hook.queue.pending)

    hook.queue.pending = null
  }
  hook.memoizedState = baseState

  return [baseState, dispatchAction.bind(null, hook.queue)]
}

function App() {
  const [num, updateNum] = useState(0)
  const [num1, updateNum1] = useState(0)

  console.log(`${isMount ? 'mount' : 'update'} num: `, num)
  console.log(`${isMount ? 'mount' : 'update'} num1: `, num1)

  return {
    click() {
      updateNum(num => num + 1)
      updateNum(num => num + 1)
    }
    focus() {
      updateNum1(num => num + 10)
      updateNum1(num => num + 10)
    }
  }
}

window.app = schedule()
app.click()
app.click()
app.focus()
app.focus()
```

我们用尽可能少的代码模拟了 Hooks 的运行，但是相比 React Hooks，他还有很多不足。

以下是他与 React Hooks 的区别：

- React Hooks 没有使用 isMount 变量，而是在不同时机使用不同的 dispatcher。换言之，mount 时的 useState 与 update 时的 useState 不是同一个函数。
- React Hooks 有中途跳过更新的优化手段。
- React Hooks 有 batchedUpdates，当在 click 中触发三次 updateNum，精简 React 会触发三次更新，而 React 只会触发一次。
- React Hooks 的 update 有优先级概念，可以跳过不高优先的 update。

## requestAnimationFrame

```html
<body>
  <div style="background-color: beige; width: 0; height: 20px"></div>
  <button>开始</button>
  <script>
    const div = document.querySelector('div')
    const btn = document.querySelector('button')
    let startTime = null
    function progress() {
      div.style.width = div.offsetWidth + 1 + 'px'
      div.innerHTML = div.offsetWidth + '%'
      if (div.offsetWidth < 100) {
        console.log(Date.now() - startTime + 'ms')
        startTime = Date.now()
        requestAnimationFrame(progress)
      }
    }
    btn.onclick = function () {
      div.style.width = 0
      startTime = Date.now()
      requestAnimationFrame(progress)
    }

    // 每 16 ms 执行一次任务
  </script>
</body>
```

## requestIdleCallback

```js
function sleep(delay) {
  let start = Date.now()
  while (start + delay > Date.now()) {
    // delay ms 內循环工作
    // 表示执行这段任务需要多长时间
  }
}

let i = 0
function progress() {
  console.log('progress')
  i < 1000 && requestAnimationFrame(progress)
  ++i
}

progress()

const works = [
  () => {
    console.log('任务1开始')
    sleep(20)
    console.log('任务1结束')
  },
  () => {
    console.log('任务2开始')
    sleep(12)
    console.log('任务2结束')
  },
  () => {
    console.log('任务3开始')
    sleep(20)
    console.log('任务3结束')
  },
  () => {
    console.log('任务4开始')
    sleep(20)
    console.log('任务4结束')
  },
  () => {
    console.log('任务5开始')
    sleep(20)
    console.log('任务5结束')
  }
]

// requestIdleCallback 若果没有工作，时间片会延长为 50 ms 20 帧
// 回调参数自动获得 deadline 参数
// timeout 代表时间 1000ms后任务还没执行
// {timeout: 1000}
requestIdleCallback(workloop)

function workloop(deadline) {
  console.log(
    '本帧剩余时间',
    deadline.timeRemaining(),
    '时间片是否过期',
    deadline.didTimeout
  )
  // 有剩余时间，并且有工作单元
  while (deadline.timeRemaining() > 0 && works.length > 0) {
    // deadline.timeRemaining() > 0 || deadline.didTimeout 表示任务过期
    peformUnitOfWork()
  }
  // // 20 ms 时候超时了，卡住了
  if (works.length > 0) {
    // 超时处理，等待下次调度
    requestIdleCallback(workloop)
  }
}

function peformUnitOfWork() {
  // 取出工作数组中的第一个工作并执行
  // 每次调度都会执行一次任务，无论超不超时
  works.shift()()
}

// 50 ms，原因
```

## MessageChannel

```js
let channel = new MessageChannel()

let port1 = channel.port1
let port2 = channel.port2

port1.onmessage = e => {
  console.log('por1 接受 por2 的消息', e.data)
}

port2.onmessage = e => {
  console.log('por2 接受 por1 的消息', e.data)
}

port1.postMessage('por1 的消息')
port2.postMessage('por2 的消息')
```

## react 首次渲染

DOM 结构：

```js
const element = (
  <div id='A1'>
    <div id='B1'>
      <div id='C1'></div>
      <div id='C2'></div>
    </div>
    <div id='B2'></div>
  </div>
)
```

实现：

```js
let vnode = {
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
  // 因为 rootFiber 是引用对象，最后会回到它身上
  // 构建的链表就是dom挂载顺序
  // root f-> C1 n-> -> root
  // console.log(rootFiber);
  let currentFiber = rootFiber.firstEffect
  // 循环挂载
  while (currentFiber) {
    if (currentFiber.effectTag === 'PLACEMENT') {
      currentFiber.return.stateNode.appendChild(currentFiber.stateNode)
    }
    currentFiber = currentFiber.nextEffect
  }

  // 挂载完成，清空 rootFiber
  rootFiber = null
}

/**
 * 把 vnode 变成 fiber 树，创建每个 fiber 对应的真实 DOM 节点
 * @param {*} workingInProgressFiber
 */
function performUnitOfWork(workingInProgressFiber) {
  beginWork(workingInProgressFiber)

  // 下个工作单元，查找是一直往下找儿子，然后循环，记住循环图
  if (workingInProgressFiber.child) {
    return workingInProgressFiber.child
  }

  while (workingInProgressFiber) {
    // 最后一个儿子就是第一个完成的工作单元，然后循环找父亲兄弟依次完成，没儿子就表示完成
    completeWork(workingInProgressFiber)

    if (workingInProgressFiber.sibling) {
      return workingInProgressFiber.sibling
    }

    workingInProgressFiber = workingInProgressFiber.return
  }
}

function beginWork(workingInProgressFiber) {
  // console.log('beginWork', workingInProgressFiber);
  // 创建 dom 元素
  if (!workingInProgressFiber.stateNode) {
    workingInProgressFiber.stateNode = document.createElement(
      workingInProgressFiber.type
    )
    for (const [k, v] of Object.entries(workingInProgressFiber.props)) {
      // 处理 dom 属性
      if (k !== 'children') {
        workingInProgressFiber.stateNode[k] = v
      }
    }
  }

  // 第一次进来先执行，创建子 fiber
  let prevFiber = null
  workingInProgressFiber.props.children.forEach((vnode, idx) => {
    let childFiber = {
      type: vnode.type,
      props: vnode.props,
      // 子fiber 指向父亲，第一次该是自己写的 rootFiber 即挂载点 #root
      return: workingInProgressFiber,
      effectTag: PLACEMENT, // 副作用，插入页面
      nextEffect: null // 初始化副作用链条，就是完成顺序，root -> c1 -> c2 -> b2 -> b1 -> a1 -> root
    }

    // 构建父子关系
    if (idx === 0) {
      workingInProgressFiber.child = childFiber
    } else {
      // 有兄弟才会走这里，此时 prevFiber 是自己的兄弟即 idx === 0 时的 fiber 节点
      prevFiber.sibling = childFiber
    }
    // 保存自己
    prevFiber = childFiber
  })
}

function completeWork(workingInProgressFiber) {
  // console.log('completeWork', workingInProgressFiber);
  // 构建副作用链条，链表
  // 这里绕的一笔，不过不用太关心只要知道，是为了构建链表就行了

  // 第一次进来是 C1，最后一次是 rootFiber
  let returnFiber = workingInProgressFiber.return

  // 把它的副作用链表挂父节点上（即它儿子）
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

    // 把它自己挂载到上面链条的next上去
    if (workingInProgressFiber.effectTag) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workingInProgressFiber
      } else {
        // 父 fiber lastEffect 不存在就挂载到 firstEffect 上
        returnFiber.firstEffect = workingInProgressFiber
      }
      // 走 C1 把自己也挂到 B1 的 f, l 上
      returnFiber.lastEffect = workingInProgressFiber
    }
  }
}

// 浏览器空闲时间处理
requestIdleCallback(workloop)
```

## react dom diff

### 单节点 diff

React 通过先判断 key 是否相同（未设置 key prop 默认 key = null;，所以更新前后 key 相同，都为 null），如果 key 相同则判断 type 是否相同，只有都相同时一个 DOM 节点才能复用。

> 新节点更新时只有一个节点，属于单一节点的 Diff

两种情况：

- 一对一
- 多对一

### 多节点 diff

`Diff` 算法的整体逻辑会经历两轮遍历：

- 第一轮遍历：处理更新的节点。

- 第二轮遍历：处理剩下的不属于更新的节点。

第一轮遍历步骤如下：

`let i = 0`，遍历 `newChildren`，将 `newChildren[i]` 与 `oldFiber` 比较，判断 `DOM` 节点是否可复用。

如果可复用，`i++`，继续比较 `newChildren[i]`与 `oldFiber.sibling`，可以复用则继续遍历。

如果不可复用，分两种情况：

- key 不同导致不可复用，立即跳出整个遍历，第一轮遍历结束。

- key 相同 type 不同导致不可复用，会将 oldFiber 标记为 DELETION，并继续遍历

如果 newChildren 遍历完（即 `i === newChildren.length - 1`）或者 oldFiber 遍历完（即 `oldFiber.sibling === null`），跳出遍历，第一轮遍历结束。

第二轮遍历步骤如下：

就是老版本的遍历过程

```js
let lastIndex = 0 // 老得单元数组最后一个不移动复用节点的索引位置
nextChildReactUnits.forEach((nextChildReactUnit, idx) => {
  const nextKey =
    nextChildReactUnit._currentReactElement?.props?.key ?? `${idx}`
  const prevChildReactUnit = prevChildReactUnitsMap[nextKey]
  // 旧节点是否可复用，复用移动，不复用插入新的节点
  console.log('xxx', prevChildReactUnitsMap)
  if (nextChildReactUnit === prevChildReactUnit) {
    if (prevChildReactUnit._mountedIndex < lastIndex) {
      diffQueue.push({
        parentId: this._reactid,
        parentNode: document.querySelector(`[data-reactid="${this._reactid}"]`),
        type: types.MOVE,
        // eslint-disable-next-line sort-keys
        fromIndex: prevChildReactUnit._mountedIndex,
        toIndex: idx
      })
    }
    lastIndex = Math.max(lastIndex, prevChildReactUnit._mountedIndex)
  } else {
    // key相等但无法复用的节点，原因，新数组是把复用和不复用的都放里面 diff
    if (prevChildReactUnit) {
      diffQueue.push({
        parentId: this._reactid,
        parentNode: document.querySelector(`[data-reactid="${this._reactid}"]`),
        type: types.REMOVE,
        // eslint-disable-next-line sort-keys
        fromIndex: prevChildReactUnit._mountedIndex
      })
      // 删除节点需要 解绑事件，也需要把 _childReactUnits，过滤掉老得删掉的
      this._childReactUnits = this._childReactUnits.filter(
        item => item !== prevChildReactUnit
      )
    }
    diffQueue.push({
      parentId: this._reactid,
      parentNode: document.querySelector(`[data-reactid="${this._reactid}"]`),
      type: types.INSERT,
      // eslint-disable-next-line sort-keys
      toIndex: idx,
      // eslint-disable-next-line sort-keys
      insertDOMString: nextChildReactUnit.create(`${this._reactid}_${idx}`)
    })
  }
  nextChildReactUnit._mountedIndex = idx
})
// 旧节点中再行节点中不在的要删掉
Object.keys(prevChildReactUnitsMap).forEach(key => {
  if (!(key in nextChildReactUnitsMap)) {
    diffQueue.push({
      parentId: this._reactid,
      parentNode: document.querySelector(`[data-reactid="${this._reactid}"]`),
      type: types.REMOVE,
      // eslint-disable-next-line sort-keys
      fromIndex: prevChildReactUnitsMap[key]._mountedIndex
    })
    this._childReactUnits = this._childReactUnits.filter(
      item => item !== prevChildReactUnitsMap[key]
    )
  }
})
```

## 关于 useState 的一切

### hook 如何保存数据

FunctionComponent 的 render 本身只是函数调用。

那么在 render 内部调用的 hook 是如何获取到对应数据呢？

比如：

- useState 获取 state
- useRef 获取 ref
- useMemo 获取缓存的数据

答案是：

每个组件有个对应的 fiber 节点（可以理解为虚拟 DOM），用于保存组件相关信息。

每次 FunctionComponent render 时，全局变量 currentlyRenderingFiber 都会被赋值为该 FunctionComponent 对应的 fiber 节点。

所以，hook 内部其实是从 currentlyRenderingFiber 中获取状态信息的。

### 多个 hook 如何获取数据

我们知道，一个 FunctionComponent 中可能存在多个 hook，比如：

```js
function App() {
  // hookA
  const [a, updateA] = useState(0)
  // hookB
  const [b, updateB] = useState(0)
  // hookC
  const ref = useRef(0)

  return <p></p>
}
```

那么多个 hook 如何获取自己的数据呢？

答案是：

currentlyRenderingFiber.memoizedState 中保存一条 hook 对应数据的单向链表。

对于如上例子，可以理解为：

```js
const hookA = {
  // hook保存的数据
  memoizedState: null,
  // 指向下一个hook
  next: hookB
  // ...省略其他字段
}

hookB.next = hookC

currentlyRenderingFiber.memoizedState = hookA
```

> 当 FunctionComponent render 时，每执行到一个 hook，都会将指向 currentlyRenderingFiber.

memoizedState 链表的指针向后移动一次，指向当前 hook 对应数据。

> 这也是为什么 React 要求 hook 的调用顺序不能改变（不能在条件语句中使用 hook） —— 每次 render 时都是从一条固定顺序的链表中获取 hook 对应数据的。

![](../Images/hook-react.jpg)

### useState 执行流程

我们知道，useState 返回值数组第二个参数为改变 state 的方法。

在源码中，他被称为 dispatchAction。

每当调用 dispatchAction，都会创建一个代表一次更新的对象 update：

```js
const update = {
  // 更新的数据
  action: action,
  // 指向下一个更新
  next: null
}
对于如下例子

function App() {
  const [num, updateNum] = useState(0)

  function increment() {
    updateNum(num + 1)
  }

  return <p onClick={increment}>{num}</p>
}
```

调用 `updateNum(num + 1)`，会创建：

```js
const update = {
  // 更新的数据
  action: 1,
  // 指向下一个更新
  next: null
  // ...省略其他字段
}
```

如果是多次调用 dispatchAction，例如：

```js
function increment() {
  // 产生 update1
  updateNum(num + 1)
  // 产生 update2
  updateNum(num + 2)
  // 产生 update3
  updateNum(num + 3)
}
```

那么，update 会形成一条环状链表。

```js
update3 --next--> update1
  ^                 |
  |               update2
  |______next_______|
```

这条链表保存在哪里呢？

既然这条 update 链表是由某个 useState 的 dispatchAction 产生，那么这条链表显然属于该 useState hook。

我们继续补充 hook 的数据结构。

```js
const hook = {
// hook 保存的数据
memoizedState: null,
// 指向下一个 hook
next: hookForB
// 本次更新以 baseState 为基础计算新的 state
baseState: null,
// 本次更新开始时已有的 update 队列
baseQueue: null,
// 本次更新需要增加的 update 队列
queue: null,
};
```

其中，queue 中保存了本次更新 update 的链表。

在计算 state 时，会将 queue 的环状链表剪开挂载在 baseQueue 最后面，baseQueue 基于 baseState 计算新的 state。

在计算 state 完成后，新的 state 会成为 memoizedState

![](../Images/hook-react1.jpg)

> 为什么更新不基于 memoizedState 而是 baseState，是因为 state 的计算过程需要考虑优先级，可能有些 update 优先级不够被跳过。所以 memoizedState 并不一定和 baseState 相同。

我们需要看看这里的 updateNum 方法的具体实现：

```js
updateNum === dispatchAction.bind(null, currentlyRenderingFiber, queue)
```

可见，updateNum 方法即绑定了 currentlyRenderingFiber 与 queue（即 hook.queue）的 dispatchAction。

上文已经介绍，调用 dispatchAction 的目的是生成 update，并插入到 hook.queue 链表中。

**既然 queue 作为预置参数已经绑定给 dispatchAction，那么调用 dispatchAction 就不仅局限在 FunctionComponent 内部了。**

### 第二个问题

```js
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

在 1 秒内快速点击 p5 次，视图上显示为几？

我们知道，调用 updateNum 会产生 update，其中传参会成为 update.action。

在 1 秒内点击 5 次。在点击第五次时，第一次点击创建的 update 还没进入更新流程，所以 hook.baseState 还未改变。

那么这 5 次点击产生的 update 都是基于同一个 baseState 计算新的 state，并且 num 变量也还未变化（即 5 次 update.action（即 num + 1）为同一个值）。

所以，最终渲染的结果为 1。

### useState 与 useReducer

那么，如何 5 次点击让视图从 1 逐步变为 5 呢？

由以上知识我们知道，需要改变 baseState 或者 action。

其中 baseState 由 React 的更新流程决定，我们无法控制。

但是我们可以控制 action。

action 不仅可以传值，也可以传函数。

```js
// action为值
updateNum(num + 1);
// action为函数
updateNum(num => num + 1);
在基于baseState与update链表生成新state的过程中：

let newState = baseState;
let firstUpdate = hook.baseQueue.next;
let update = firstUpdate;

// 遍历baseQueue中的每一个update
do {
  if (typeof update.action === 'function') {
    newState = update.action(newState);
  } else {
    newState = action;
  }
} while (update !== firstUpdate)
```

可见，当传值时，由于我们 5 次 action 为同一个值，所以最终计算的 newState 也为同一个值。

而传函数时，newState 基于 action 函数计算 5 次，则最终得到累加的结果。

如果这个例子中，我们使用 useReducer 而不是 useState，由于 useReducer 的 action 始终为函数，所以不会遇到我们例子中的问题。

事实上，useState 本身就是预置了如下 reducer 的 useReducer。

```js
function basicStateReducer(state, action) {
  return typeof action === 'function' ? action(state) : action
}
```

## 关于 useEffect 的一切

### useEffect 的执行顺序

```js
function Child() {
  useEffect(() => {
    console.log('child')
  }, [])

  return <p>hello</p>
}

function Parent() {
  useEffect(() => {
    console.log('parent')
  }, [])

  return <Child />
}

function App() {
  useEffect(() => {
    console.log('app')
  }, [])

  return <Parent />
}
```

打印顺序 `child -> parent -> app`

### effectList

协调器的工作流程是使用遍历实现的递归。所以可以分为递与归两个阶段。

我们知道，递是从根节点向下一直到叶子节点，归是从叶子节点一路向上到根节点。

effectList 的构建发生在归阶段。所以，effectList 的顺序也是从叶子节点一路向上。

useEffect 对应 fiber 作为 effectList 中的一个节点，他的调用逻辑也遵循归的流程。

现在，我们有充足的知识回答第一个问题：

由于归阶段是从 Child 到 Parent 到 App，所以相应 effectList 也是同样的顺序。

所以 useEffect 回调函数执行也是同样的顺序。

### 渲染

按照流程，effectList 会在渲染器中被处理。

对于 useEffect 来说，遍历 effectList 时，会找到的所有包含 Passive 标记的 fiber。

依次执行对应 useEffect 的 destroy。

所有 destroy 执行完后，再依次执行所有 create。

**整个过程是在页面渲染后异步执行的。**

> react 17 中 第一个参数返回的函数也是异步的

### useEffect 与 useLayoutEffect

与 componentDidMount 更类似的是 useLayoutEffect，他会在渲染完成后同步执行。

useEffect 与 useLayoutEffect 一摸一样，只是调用时机不一样，一个 dom 渲染后同步，一个异步

useEffect 执行顺序: 组件更新挂载完成 -> 浏览器 dom 绘制完成 -> 执行 useEffect 回调。
useLayoutEffect 执行顺序: 组件更新挂载完成 -> 执行 useLayoutEffect 回调-> 浏览器 dom 绘制完成。

## useMemo / useCallback

作为「性能优化」手段，一般用 useMemo 缓存函数组件中比较消耗性能的计算结果：

```js
function App() {
  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])
  // ...
}
```

只有在依赖项改变后才会重新计算新的 memoizedValue。

你有没有想过，如果用 useMemo 缓存函数组件的返回值，会怎么样呢？

```js
function Tree() {
  let appContextValue = useContext(AppContext)
  let theme = appContextValue.theme

  return useMemo(() => {
    return <ExpensiveTree className={theme} />
  }, [theme])
}
```

原理解析
要理解这么做有效的原因，需要了解三点：

- useMemo 返回值是什么
- 函数组件的返回值是什么
- React 组件在什么时候 render

回答第一个问题：useMemo 会将第一个参数（函数）的返回值保存在组件对应 fiber 中，只有在依赖项（第二个参数）变化后才会重新调用第一个参数（函数）计算一个新值。

```js
useMemo(() => 'hello', [])
// deps 比较是 Object.is(preDep, nextDep)
// useMemo 会执行 () => 'hello',useCallback 不会执行
```

回答第二个问题：函数组件的返回值是 JSX 对象。

同一个函数组件调用多次，返回的是多个「不同」的 JSX 对象（即使 props 未变，但 JSX 是新的引用）。

按照以上两个回答，我们可以得出结论：

以上 useMemo 用法实际上在函数组件对应的 fiber 中缓存了一个完整的 JSX 对象
第三个问题，函数组件需要同时满足如下条件才不会 render：

oldProps === newProps
前后两次更新 props 全等，注意是「全等」。

组件 context 没有变化
workInProgress.type === current.type
组件更新前后 fiber.type 未变化，比如 div 没有变为 p。

!includesSomeLane(renderLanes, updateLanes)
当前 fiber 上不存在更新，或者存在更新但优先级低。

更详细的解释，可以参考这篇文章：React 组件到底什么时候 render 啊
当我们不使用 useMemo 包裹返回值，每次 Tree render 返回的都是全新的 JSX 对象。

所以对于 ExpensiveTree，oldProps !== newProps。

再看 2：ExpensiveTree 内部 context 没变，满足

再看 3：ExpensiveTree 更新前后 type 都是 ExpensiveTree，满足

再看 4: ExpensiveTree 内没有状态更新，满足

所以，当我们使用 useMemo 包裹 ExpensiveTree 后，当 theme 不变，每次 Tree render 后返回的都是同一个 JSX 对象，满足第一条。

基于这个原因，ExpensiveTree 不会 render。

## 如何优雅处理使用 React Context 导致的不必要渲染？

### 方案一：Split contexts

顾名思义，就是拆分 Contexts，这里面主要指对于不同上下文背景的 Contexts 进行拆分，实现合理的 Contexts hierarchy，这样就很容易能做到「组件按需选用订阅自己的 Contexts data」。

```
const App = () => {
  // ...
  return (
    <ContextA.Provider value={valueA}>
      <ContextB.Provider value={valueB}>
        <ContextC.Provider value={valueC}>
          ...
        </ContextC.Provider>
      </ContextB.Provider>
    </ContextA.Provider>
  );
};
```

如果你觉得「这种 Context hierarchy 好麻烦啊」，那请你养成更好的编程习惯吧，Split Contexts 也是官方所推荐的「最佳」方案——麻烦和合理往往就在一念之间。（btw, 是真的那么麻烦么？）

另外值得一提的是，除了层级式按使用场景拆分 Contexts，我们还需要了解：**将多变的和不变的 Contexts 分开，让不变的 Contexts 在外层，多变的 Contexts 在内层。**

### 方案二：使用「泛 memo」方案

这里的 「泛 memo」是我编的词语，它 既可以是 React.memo，也可以是 useMemo 包裹一个 React 组件，以达到类似 scu 的优化目的。直接贴一个 Dan 的例子好了：

React.memo 场景：

```js
function Button() {
  let appContextValue = useContext(AppContext)
  let theme = appContextValue.theme
  return <ThemedButton theme={theme} />
}
// 对 ThemedButton 使用 Memo，只「响应」theme 的变化
const ThemedButton = memo(({ theme }) => {
  return <ExpensiveTree className={theme} />
})
```

useMemo 包裹 React 组件场景：

```js
function Button() {
  let appContextValue = useContext(AppContext)
  let theme = appContextValue.theme // 相当于自己实现的 selector

  return useMemo(() => {
    return <ExpensiveTree className={theme} />
  }, [theme])
}
```

毕竟对于新的 Context API，（不像 legacy Context）我们知道：对于层级上祖先被 memorized bailout 的情况，新的 Context 特性依然可以订阅到 context data 的变化。

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

这种 lift content up 为 props.children 的做法，能够防止不必要的渲染，其本质原理和 Memo 异曲同工：对应上面代码，只要作为 Context.Provider 的子组件不变化，props.children 引用不变化，React 可以自动优化规避掉不必要的渲染（相比于 Memo 指定的比对项，这种比对更加粗粒度）。更具体的说明，就牵扯到 JSX 编译为 React.createElement 细节了，这里我就不再赘述。
