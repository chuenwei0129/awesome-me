## 数据竞态问题

假如 effect 中 callback 执行 3 次，3 个 promise 并发，effect 中的 callback 每次都是新的函数，所以 3 个 ignore 代表 3 个不同的变量，只有 state 才是读取同一个变量
effect 中 callback 返回函数是在第二个 callback 之前执行，且同步执行
所以当 3 个 promise 执行完毕之后，ignore1 === true, 2 === true, 3 === false，3 === true 需要第 4 个 effect callback
所以只有第三个 promise 会触发渲染

state 组件“记住”一些信息，会渲染
但又不想让这些信息触发新的渲染时，你可以使用 ref。

# 盘盘逻辑

初始化：

```js
history = [0]
currentMove = 0
currentCount = 0

const handleCountClick = () => {
// nextCount = 1
// nextHistory = [0, 1]
// setHistory([0, 1])
// setCurrentMove(2-1)
}

const jumpTo = (0) => {
// setCurrentMove(0)
}

// <li key={0}>
//   <button onClick={() => jumpTo(0)}>{Go to Counter 0}</button>
// </li>

```

点击 +1：

```js
执行 handleCountClick
执行 setHistory([0, 1])
执行 setCurrentMove(2-1)
然后照初始化开始重新渲染
```

点击 Go to Counter 0：
再点击 +1：

```js
执行 jumpTo(0)
执行 setCurrentMove(0)
然后照初始化开始重新渲染
此时 history 还是原来的 [0, 1]
```

交叉类型
/ 具体是抽象的子类型
// 交叉本质是同时满足两个类型，子类 & 父类 === 子类
// 由于 {} 就是一个空对象，因此除 null、undefined 以外的一切基础类型，都可以被视为是继承于 {} 之后派生出来的。
// 实现原理则是 null & {}、undefined & {} 会直接被判断为 never ，从而消失在联合类型结果中。

type A = { x: string }
type B = { y: string }

type C = A & B
type D = A | B

const c: C = { x: 'x', y: 'y' }
// const c1: C = { x: 'x' } // error
const d1: D = { x: 'x' }
const d2: D = { y: 'y' }
const d3: D = { x: 'x', y: 'y' }

console.log(c, d1, d2, d3)

a & b 表示 c 既是 a 的子类型，也是 b 的子类型
a | b 表示 c 是 a 或 b 的子类型
更具体的是子类
比如 a = { x: string }，b = { x: string, y: string }
b 就是 a 的子类
