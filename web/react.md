# 关于 React 的一切（二）<!-- omit in toc -->

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

## React Hooks 的理念、实现、源码

### 代数效应


