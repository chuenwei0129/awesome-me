import React from 'react'
import ReactDOM from 'react-dom'
// import './index.css';
// import reportWebVitals from './reportWebVitals';
import App from './App'

// const element = (
//   <div id="A1">
//     <div id="B1">
//       <div id="C1"></div>
//       <div id="C2"></div>
//     </div>
//     <div id="B2"></div>
//   </div>
// )

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

// ReactDOM.render(element, document.getElementById('root'))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
