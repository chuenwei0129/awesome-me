# react

## react 文档

## componentWillXXX 为什么 UNSAFE

我们经常在componentWillRecieveProps内处理props改变带来的影响。有些同学认为这个钩子会在每次props变化后触发。
真的是这样么？让我们看看源码。

这段代码出自updateClassInstance方法：

if (
  unresolvedOldProps !== unresolvedNewProps ||
  oldContext !== nextContext
) {
  callComponentWillReceiveProps(
    workInProgress,
    instance,
    newProps,
    nextContext,
  );
}
你可以从这里看到这段源码
其中callComponentWillReceiveProps方法会调用componentWillRecieveProps。

可以看到，是否调用的关键是比较unresolvedOldProps与 unresolvedNewProps是否全等，以及context是否变化。

其中unresolvedOldProps为组件上次更新时的props，而unresolvedNewProps则来自ClassComponent调用this.render返回的JSX中的props参数。

可见他们的引用是不同的。所以他们全等比较为false。

基于此原因，每次父组件更新都会触发当前组件的componentWillRecieveProps。

在React源码中，每次发起更新都会创建一个Update对象，同一组件的多个Update（如上图所示的A -> B -> C）会以链表的形式保存在updateQueue中。

在某个组件updateQueue中存在四个Update，其中字母代表该Update要更新的字母，数字代表该Update的优先级，数字越小优先级越高。

baseState = '';

A1 - B2 - C1 - D2
首次渲染时，优先级1。B D优先级不够被跳过。

为了保证更新的连贯性，第一个被跳过的Update（B）及其后面所有Update会作为第二次渲染的baseUpdate，无论他们的优先级高低，这里为B C D。

baseState: ''
Updates: [A1, C1]
Result state: 'AC'
接着第二次渲染，优先级2。

由于B在第一次渲染时被跳过，所以在他之后的C造成的渲染结果不会体现在第二次渲染的baseState中。所以baseState为A而不是上次渲染的Result state AC。这也是为了保证更新的连贯性。

baseState: 'A'          
Updates: [B2, C1, D2]  
Result state: 'ABCD'
我们发现，C同时出现在两次渲染的Updates中，他代表的状态会被更新两次。

如果有类似的代码：

componentWillReceiveProps(nextProps) {
    if (!this.props.includes('C') && nextProps.includes('C')) {
        // ...do something
    }
}
则很有可能被调用两次，这与同步更新的React表现不一致！

基于以上原因，componentWillXXX被标记为UNSAFE。

第一步：开发埋点
“埋点“是什么？

一般我们把用于统计 “谁” “在什么时间” “在什么地方” “做了什么”的方法统称为“埋点”，可分为“前端埋点”和“后端埋点”。
一是因为业务开发日常都会接触到埋点，从熟悉的领域到陌生的领域是一条渐进的学习过程。二是所有业务洞察都是基于数据，而埋点是数据采集的源头。

使用场景，用户输入框，提示请求数据，他们有优先级概念，

context 会合并，不知道是谁给的，爸爸，爷爷

## 关于useState的一切
## 对于如下函数组件：
function App() {
  const [num, updateNum] = useState(0);
  window.updateNum = updateNum;
  return num;
}
调用window.updateNum(1)可以将视图中的0更新为1么？

对于如下函数组件：
function App() {
  const [num, updateNum] = useState(0);
  
  function increment() {
    setTimeout(() => {
      updateNum(num + 1);
    }, 1000);
  }
  
  return <p onClick={increment}>{num}</p>;
}
在1秒内快速点击p5次，视图上显示为几？

 向右滑动展示答案                                             1. 可以
                                                            2. 显示为1
其实，这两个问题本质上是在问：

useState如何保存状态？
useState如何更新状态？
本文会结合源码，讲透如上两个问题。

这些，就是你需要了解的关于useState的一切。

hook如何保存数据
FunctionComponent的render本身只是函数调用。

那么在render内部调用的hook是如何获取到对应数据呢？

比如：

useState获取state
useRef获取ref
useMemo获取缓存的数据
答案是：

每个组件有个对应的fiber节点（可以理解为虚拟DOM），用于保存组件相关信息。

每次FunctionComponent render时，全局变量currentlyRenderingFiber都会被赋值为该FunctionComponent对应的fiber节点。

所以，hook内部其实是从currentlyRenderingFiber中获取状态信息的。

多个hook如何获取数据
我们知道，一个FunctionComponent中可能存在多个hook，比如：

function App() {
  // hookA
  const [a, updateA] = useState(0);
  // hookB
  const [b, updateB] = useState(0);
  // hookC
  const ref = useRef(0);
  
  return <p></p>;
}
那么多个hook如何获取自己的数据呢？

答案是：

currentlyRenderingFiber.memoizedState中保存一条hook对应数据的单向链表。

对于如上例子，可以理解为：

const hookA = {
  // hook保存的数据
  memoizedState: null,
  // 指向下一个hook
  next: hookB
  // ...省略其他字段
};

hookB.next = hookC;

currentlyRenderingFiber.memoizedState = hookA;
当FunctionComponent render时，每执行到一个hook，都会将指向currentlyRenderingFiber.memoizedState链表的指针向后移动一次，指向当前hook对应数据。
这也是为什么React要求hook的调用顺序不能改变（不能在条件语句中使用hook） —— 每次render时都是从一条固定顺序的链表中获取hook对应数据的。

这也是为什么React要求hook的调用顺序不能改变（不能在条件语句中使用hook） —— 每次render时都是从一条固定顺序的链表中获取hook对应数据的。

我们知道，useState返回值数组第二个参数为改变state的方法。

在源码中，他被称为dispatchAction。

每当调用dispatchAction，都会创建一个代表一次更新的对象update：

const update = {
  // 更新的数据
  action: action,
  // 指向下一个更新
  next: null
};
对于如下例子

function App() {
  const [num, updateNum] = useState(0);
  
  function increment() {
    updateNum(num + 1);
  }
  
  return <p onClick={increment}>{num}</p>;
}
调用updateNum(num + 1)，会创建：

const update = {
  // 更新的数据
  action: 1,
  // 指向下一个更新
  next: null
  // ...省略其他字段
};
如果是多次调用dispatchAction，例如：

function increment() {
  // 产生update1
  updateNum(num + 1);
  // 产生update2
  updateNum(num + 2);
  // 产生update3
  updateNum(num + 3);
}
那么，update会形成一条环状链表。

update3 --next--> update1
  ^                 |
  |               update2
  |______next_______|
                          
这条链表保存在哪里呢？

既然这条update链表是由某个useState的dispatchAction产生，那么这条链表显然属于该useState hook。

我们继续补充hook的数据结构。

const hook = {
  // hook保存的数据
  memoizedState: null,
  // 指向下一个hook
  next: hookForB
  // 本次更新以baseState为基础计算新的state
  baseState: null,
  // 本次更新开始时已有的update队列
  baseQueue: null,
  // 本次更新需要增加的update队列
  queue: null,
};
其中，queue中保存了本次更新update的链表。

在计算state时，会将queue的环状链表剪开挂载在baseQueue最后面，baseQueue基于baseState计算新的state。

在计算state完成后，新的state会成为memoizedState。

回到我们开篇第一个问题：

function App() {
  const [num, updateNum] = useState(0);
  window.updateNum = updateNum;
  return num;
}
调用window.updateNum(1)可以将视图中的0更新为1么？

我们需要看看这里的updateNum方法的具体实现：

updateNum === dispatchAction.bind(null, currentlyRenderingFiber, queue);
可见，updateNum方法即绑定了currentlyRenderingFiber与queue（即hook.queue）的dispatchAction。

上文已经介绍，调用dispatchAction的目的是生成update，并插入到hook.queue链表中。

既然queue作为预置参数已经绑定给dispatchAction，那么调用dispatchAction就步仅局限在FunctionComponent内部了。

既然queue作为预置参数已经绑定给dispatchAction，那么调用dispatchAction就步仅局限在FunctionComponent内部了。

在1秒内快速点击p5次，视图上显示为几？

我们知道，调用updateNum会产生update，其中传参会成为update.action。

在1秒内点击5次。在点击第五次时，第一次点击创建的update还没进入更新流程，所以hook.baseState还未改变。

那么这5次点击产生的update都是基于同一个baseState计算新的state，并且num变量也还未变化（即5次update.action（即num + 1）为同一个值）

可见，当传值时，由于我们5次action为同一个值，所以最终计算的newState也为同一个值。

而传函数时，newState基于action函数计算5次，则最终得到累加的结果。

如果这个例子中，我们使用useReducer而不是useState，由于useReducer的action始终为函数，所以不会遇到我们例子中的问题。

事实上，useState本身就是预置了如下reducer的useReducer。

function basicStateReducer(state, action) {
  return typeof action === 'function' ? action(state) : action;
}

// 遍历baseQueue中的每一个update
do {
  if (typeof update.action === 'function') {
    newState = update.action(newState);
  } else {
    newState = action;
  }
} while (update !== firstUpdate)

在1秒内点击5次。在点击第五次时，第一次点击创建的update还没进入更新流程，所以hook.baseState还未改变。

那么这5次点击产生的update都是基于同一个baseState计算新的state，并且num变量也还未变化（即5次update.action（即num + 1）为同一个值）。

经过一年多的改造，将其从流程不可中断的「递归实现」（被称为Stack Reconciler）改为流程可中断的「遍历实现」（被称为Fiber Reconciler）。

在此之后，基于Fiber Reconciler，实现了一套可以区分任务优先级的机制，大体原理如下：

不同交互（用户点击交互/请求数据/用户拖拽...）触发的状态更新（比如调用this.setState）会拥有不同优先级，在源码内对应一个时间戳变量expirationTime。

React会根据expirationTime的大小调度这些更新，最终实现的效果为：「用户交互」触发的更新会拥有更高的优先级，先于「请求数据」触发的更新。
React会根据expirationTime的大小调度这些更新，最终实现的效果为：「用户交互」触发的更新会拥有更高的优先级，先于「请求数据」触发的更新。

高优先级意味着该更新对DOM产生的影响会更快呈现在用户面前。

在此之后，React Core Team发现基于expirationTime的调度算法虽然能满足fiber树的整体优先级调度，但是不够灵活（比如无法满足局部fiber树的优先级调度（例如Suspense））。
所以去年React Core Team的Andrew Clark将expirationTime模型重构为以一个32位二进制的位代表优先级的lane模型。

Context API重构
Hooks
目标与关键成果法
不能因为你没有产出就代表你没有价值（一把辛酸泪）

前端能精确控制组件的状态（加载中/加载失败/加载成功），即Suspense特性

所以，当务之急是让社区尽快跟上React升级的步伐。

当前社区大量React生态库的逻辑都是基于如下React运行流程：

状态更新 --> render --> 视图渲染
如果React的运行流程变为：

状态更新 --> render（可暂停） --> 视图渲染

或

状态更新 --> render（中断）--> 重新状态更新 --> render（可暂停） --> 视图渲染

会发生什么？

会发生一种被称为tearing的现象，我们来举个例子：

假设我们有一个变量externalSource，初始值为1。

1000ms后externalSource会变为2。

let externalSource = 1;

setTimeout(() => {
    externalSource = 2;
}, 1000)
我们有个组件A，他渲染的DOM依赖于externalSource的值：

function A() {
  return <p>{externalSource}</p>;
}
在当前版本的React中，在我们的应用中组件树的不同地方使用A组件，会出现某些地方的DOM是<p>1</p>，某些地方是<p>2</p>么？

答案是：不会。

因为当前React的如下运行流程是同步的：

状态更新 --> render --> 视图渲染
使externalSource变为2的setTimeout会在这个流程对应的task（宏认为）执行完后再执行。

但是当切换到Concurrent Mode：

状态更新 --> render（可暂停） --> 视图渲染
当render暂停时，浏览器获得JS线程控制权，就会执行使externalSource变为2的setTimeout。

这样可能不同的A组件渲染出的p标签内的数字不一样。

这种由于React运行流程变化，导致依赖外部资源时，状态与视图不一致的现象，就是tearing。

这里改变externalSource的外力，可能来自于各种task(IO、setTimeout...)

当前有个解决外部资源状态同步的提案useMutableSource[3]

这个库will-this-react-global-state-work-in-concurrent-mode[4]测试了主流状态管理库是否会导致tearing
至于suspense和concurrent mode，还不足以说服业务和第三方库迁移，没有到非彼不可的地步。

都什么年代了，SSR还有那么重要吗，一个渲染库在服务端搞七搞八不值当，不如好好挖掘一下用户端。

显然，Hooks源码内部存在一种机制，能够感知当前执行的上下文环境。

当我们在一个Hooks内部调用其他Hooks时会报开篇提到的错误。

比如如下代码就会报错：

function App() {

  useEffect(() => {
    const a = useRef();
  }, [])

  // ...
}
Hooks只是函数，他如何感知到自己在另一个Hooks内部执行？

这个问题在自己开发组件并且本地使用link调试的时候经常出现。


给个第二种解决方案：

在webpack.config.js中配置resolve.alias 属性为

{

react: path.resolve('./node_modules/react')

}

来保证项目本地启动时统一使用项目自身安装的react模块，而非第三方组件中的react模块。

在package.json文档中提供了一个配置项：resolutions，可以临时解决这个问题。

resolutions允许你复写一个在项目node_modules中被嵌套引用的包的版本。

在我们项目的package.json中作出如下修改：

// 项目package.json
{
  // ...
  "resolutions": {
    "react": "17.0.2",
    "react-dom": "17.0.2"
  },
  // ...
}
这样，项目中用到的这两个依赖都会使用resolutions中指定的版本。

不管是「组件库」还是我们的项目代码中的react与react-dom，都会指向同一个文件。

类似于 that !== this
这样就能判断了
内部都会执行warnInvalidHookAccess报错，提示自己在别的Hooks内执行了

由于「组件库」使用dependencies而不是peerDependencies，导致「组件库」中引用的react与reactDOM是「组件库」目录node_modules下的文件。
项目中使用的react与reactDOM是项目目录node_modules下的文件。
「组件库」中react与项目目录中react在运行时分别初始化ReactCurrentDispatcher
这两个ReactCurrentDispatcher分别依赖对应目录的reactDOM
我们在项目中执行项目目录下reactDOM的ReactDOM.render方法，他会随着程序运行改变项目目录中react包下的ReactCurrentDispatcher.current的指向
「组件库」中的ReactCurrentDispatcher.current始终是null
当调用「组件库」中的Hooks时，由于ReactCurrentDispatcher.current始终是null导致报错

缺少ESM标准的约束，在tree-shaking上存在天生劣势。






<!-- React的render函数可接受的返回值类型包括：

string，比如return 'I am kasong';
number，比如return 123;
array，比如return [<p>ka</p>, <p>song</p>];。
其中[]会被处理为React.Fragment

object，比如return <p>ka song</p>;。
function App() {
  reutrn {};
}
返回值是个object，但非JSX对象

jsx-runtime -> core-js -> React -> ReactDOM
core-js -> React -> ReactDOM

很精彩的一次排查，我这边移动业务上使用一般是把react&reactDOM external 出来，并且在最前面单独引入 map&set 的 polyfill -->






















<!-- 而 React 在类似的场景下是自顶向下的进行递归更新的，也就是说，React 中假如 ChildComponent 里还有十层嵌套子元素，那么所有层次都会递归的重新render（在不进行手动优化的情况下），这是性能上的灾难。（因此，React 创造了Fiber，创造了异步渲染，其实本质上是弥补被自己搞砸了的性能）。

他们能用收集依赖的这套体系吗？不能，因为他们遵从Immutable的设计思想，永远不在原对象上修改属性，那么基于 Object.defineProperty 或 Proxy 的响应式依赖收集机制就无从下手了（你永远返回一个新的对象，我哪知道你修改了旧对象的哪部分？）

同时，由于没有响应式的收集依赖，React 只能递归的把所有子组件都重新 render一遍，然后再通过 diff算法 决定要更新哪部分的视图，这个递归的过程叫做 reconciler，听起来很酷，但是性能很灾难。

<!-- 在React + Redux体系中，数据变更与视图变更之间的过程，就是经过了“精确——不精确——精确”这样的步骤。前一步是简单合并，而且是要改变数据引用的合并，后一步是diff。

任何时候对视图进行修改，都应该造成“整个视图被重新渲染”的效果。其它的方面都是在这个效果的基础上进行的优化，而非破坏这个效果 -->


<!-- 16.6ms

react请求调度 ---- 用户输入输出处理事件 ----- setTimout ----- resize/scroll ---- raf ---- layout ---- paint ---- idle cb

空闲时间 ---- 执行任务 ---- 下一个任务单元是否存在 ---- 存在，执行任务单元 ---执行完毕 是否还有时间 ---- 有时间继续执行 下个循环 没时间---浏览器
                             ----不存在 ----浏览器


fiber 数据结构 父亲，儿子，兄弟


raf刷新页面的起点 --> -->