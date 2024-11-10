---
group:
  title: 2024 🐲
  order: -2024
title: 事件循环
toc: content
---

## 单线程模型

搞清楚Node.js到底是单线程还是多线程，这事儿堪比在年夜饭桌上解释你那份工作。简短回答：Node.js是单线程的。

对细节有点兴趣？那就是：Node.js在拥有worker_threads模块（就像浏览器里的[Web Workers API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)）之前，对于用户来说，它是单线程。

深挖一下的话：所谓的“单线程”只是对用户而言，底层究竟有多少线程在跑，对你来说没啥影响，因为你根本碰不到它们。

### JavaScript 的“单线程”

JavaScript是一门完完全全的单线程语言，像一个孤独奋斗的小餐馆老板。你的代码在任何时候都只能在这个唯一的主线程上运行。

所以，不要妄想着这个老板在忙着翻炒牛肉的时候还能记账。所有代码都是串行执行的，这也就是为什么JavaScript的并发模型是基于事件和回调，而不是传统的多线程并发模型。

### 底层的多线程

尽管你的JavaScript代码在一个“单线程”中跑，但不意味着引擎本身只有一个线程。

事实上，现代的浏览器和Node.js运行时都巧妙地使用了多线程来处理I/O操作、垃圾回收和异步任务等等。这就好比那个小餐馆老板，虽然他一个人经营所有的菜品，但幕后还有一个强大的冷冻库和送货队伍在默默工作，对你来说，他们是完全透明的。

### 举个栗子

想起调用AJAX的过程吧，你需要把成功回调传递给xhr，如下：

```js
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  /* 传入我们的回调 */
};
xhr.open(...);
xhr.send(...);
```

当你在浏览器中发起一个网络请求，JavaScript代码会注册一个回调函数然后立马返回，不会阻塞主线程。网络请求的实际工作是由浏览器的底层用不同的线程处理的。一旦请求成功，回调函数会被放入事件队列，最终由事件循环取出并在主线程上执行。

尽管浏览器有单独的线程去处理网络请求，回调函数被执行时还是会在JavaScript的主线程上。所以，归根结底，JavaScript确实是在单线程里干活。

## 为什么 JavaScript 要设计成单线程？为什么 Web Worker 不允许操作 UI？

Web Workers允许我们开启工作线程来处理耗时任务，但有个特例：在worker内部，可不能直接操作DOM节点。

Workers和主线程之间的数据交流是通过消息机制进行的——双方都用`postMessage()`方法发送消息，并用`onmessage`事件处理函数响应消息。**这个过程中数据是被复制的而不是共享**。

进程的地址空间是隔离的，但同一个进程内线程是可以共享数据的，**那为什么Web Worker和主线程不能共享变量，而要通过这复杂的消息队列传递数据呢？操作UI更是被严严实实地禁止**？

答案揭晓啦：**UI操作应该永远只在主线程**。

线程间的同步不仅繁琐，还带来了同步问题。如果所有线程都能操作UI，那么在发生线程切换时，可能会导致数据不一致的问题。假设a线程修改界面数据到一半，cpu切到b线程，b线程也去改同一个地方，那结果就是大混乱。UI界面本质上是操作系统对数据在显示器上的映射，为了稳定和一致，所有修改只能在主线程进行。

因此，为了保证系统的稳定性和一致性，我们只能遵循这个规则，不准在Worker线程中改UI。而且这种限制确保了JavaScript能保持它那种简单但强大的异步操作模型。

# 事件循环（Node.js）

## JavaScript 代码执行的粒度

在 Node.js 世界里，所有的 JavaScript 代码都在一条主事件循环上跑动，这就像一位多才多艺的厨师在厨房里一刻不停地忙碌。所有代码都是以“同步代码”为基本单位，一整块一整块地执行。

来看个例子：

```js
setTimeout(() => {
  console.log('过了几秒...');
}, 10);

setTimeout(() => {
  console.log('过了几秒，也过了几秒...');
}, 15);

console.log('现在');
```

在上面的代码中，所谓的同步代码，第一段是这样的：

```js
setTimeout(callback, 10); // setTimeout 函数入栈，出栈
setTimeout(callback, 15); // setTimeout 函数入栈，出栈
console.log('现在'); // console.log 函数入栈，出栈
```

这整个大块儿代码不执行完，Node.js 是不会跳出当前调用栈的。如果这段代码里有个死循环，那情况如何呢？

```js
setTimeout(callback, 10);
setTimeout(callback, 15);
console.log('现在');
while (true) {}
```

那么，你就会在这 "Tick" 中被困住，后续 `setTimeout()` 里的回调简直连出场的机会都没有。

后续事件循环中的 `setTimeout()` 回调也是一样。在 libuv 的事件循环中，等到定时器都超时触发时，会串行执行两个 `setTimeout()` 的回调。如果第一个定时器回调里再搞个死循环，那更绝了：

```js
() => {
  console.log('过了几秒...');
  while (true) {}
}
```

如此一来，Node.js 永远陷入这段同步执行，根本到不了第二个定时器回调了。

`setTimeout(callback, 1000)` 实际上同期所做的事儿很简单：新建一个 `Timeout` 实例，把传进来的 `callback` 存好。回调函数 `callback` 只有等到异步逻辑中 libuv 的定时器事件被触发，才会回到 JavaScript 逻辑中执行。而一旦执行，又是全身心投入，只知道盯着这段同步逻辑，一直到执行完毕才转战下一段异步事件。

如有多个定时器因时间到了一起到期，那多亏“薅羊毛”算法（后面会解释），我们会一一串行执行所有的定时器，但绝不可能真地“同时进行”。

## 事件循环内部顺序图

在 Node.js 中，各种异步任务可谓遍地开花，有些任务交给类似 `epoll` 监听 I/O 事件，还有一些交给 `libuv` 的线程池执行。不出意外，“文件系统”和“定时器”任务可能“同时触发”。但它们的执行顺序呢？

一个事件循环的每一步，除了 `Poll for I/O` 任务阶段外，还有好几层。看下图，`timer` 任务步就在 `Run due timers` 层。`setImmediate()`、`process.nextTick()`则分别在其他步骤。

![事件循环顺序图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240920155840.png)

定时器任务在定时器阶段执行，所有同时到期的定时器顺序执行。而读取文件事件在 `Poll I/O` 事件阶段执行，多任务还是顺序执行。每次“顺序执行”时，只会跑完那一段“同步代码”。

看来是“同时发生”，但所有代码在 Node.js 的主事件循环里都得排好队，串个一个一个来。

## Timer

### 浏览器中的 `setTimeout()`

在浏览器里，`setTimeout()` 返回一个整数，表明定时器 ID。而且这家伙如果嵌套层级超过 5 且超时时间低于 4 毫秒，超时间会被顶到至少 4 毫秒。这是想防止频繁回调拖慢寿命。

### Node.js 中的 `setTimeout()`

在 Node.js 里，`setTimeout()` 返回的是一个 `Timeout` 对象（没错，可不是什么小小整数 ID）。Node.js 也没有浏览器中的 4 毫秒规则，所以超时处理上自然不一样。

### 触发顺序的差异

看个例子，展示在不同环境中定时器的触发顺序有何不同：

```js
setTimeout(() => {
  console.log(1);
}, 10);

setTimeout(() => {
  console.log(2);
}, 15);

let now = Date.now();
while (Date.now() - now < 100) {
  // 阻塞 100 ms
}

setTimeout(() => {
  console.log(3);
}, 10);

now = Date.now();
while (Date.now() - now < 100) {
  // 阻塞 100 ms
}
```

**在浏览器中：**

Timeout 的触发时间按实际超时迟早排序，上例里三个 Timeout 的触发时间分别是 10 毫秒、15 毫秒和 110 毫秒。所以顺序该是`1`、`2`、`3`。但因第二次阻塞（200 毫秒）结束时，所有的 Timeout 全过期了，所以按顺序是`1`、`2`、`3`。

**在 Node.js 中：**

事件循环机制不同，触发顺序变成了 `1`、`3`、`2`。多个定时器插入事件循环时，所有的都超时了，`1`、`3`是在`10ms`链表，而`2`在`15ms`链表。按牛羊算法，先执行`10ms`链表的所有定时器：输出 `1`、`3`，再输出 `2`。

注释掉最后一段代码，那么输出顺序就和浏览器一样是`1`、`2`、`3`。

```js
setTimeout(() => {
  console.log(1);
}, 10);

setTimeout(() => {
  console.log(2);
}, 15);

let now = Date.now();
while (Date.now() - now < 100) {
  // 阻塞 100 ms
}

setTimeout(() => {
  console.log(3);
}, 10);
```

## setImmediate()

`setTimeout()` 的定时器触发最新超时事件，那 `setImmediate()` 呢？一次事件循环的逻辑顺序是：定时器事件、Pending 态 I/O 事件、空转事件、准备事件、Poll I/O 事件、复查事件和扫尾。

根据官方文档：

> Schedules the "immediate" execution of the callback after I/O events' callbacks.

即：按文档，`setImmediate()`实施时机是在复查事件阶段，**在定时器事件和 `Poll for I/O` 事件之后。**

实际上呢？我们来点代码：

```js
setImmediate(() => {
  console.log('setImmediate');
});

setTimeout(() => {
  console.log('setTimeout');
}, 0);
```

Node.js 下跑几次看看？结果随机复杂，一会儿先 `setImmediate` ，一会儿先 `setTimeout`。说好的定时器事件先运行呢？

在 libuv，定时器确实先于复查步骤执行——不过这仅限于同一个 Tick。超时不准的 `setTimeout()` 指不定跑到哪个 Tick，而 `setImmediate` 则在当前 Tick 末尾明确执行。

解释如下：代码执行后，Node 才进入事件循环。从第一个 Tick 来看，先看 `setTimeout()` 是否到期。超时间为 `0`，但构造时自动设为 `1`，通常第一个 Tick 还没超期，略过定时器进入复查阶段执行 `setImmediate()`。

有时计算机状态不同，第一个 Tick 中就已经超时，自然先执行这个 Timeout。而跑这两行代码后，在事件循环中确认先执行`Immediate`，后看定时器未超时转去复查执行。如下：

```js
setTimeout(() => {
  setImmediate(() => {
    console.log('setImmediate');
  });

  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
}, 0);
```

此时，先执行 `setImmediate`，因 Timeout 阶段跳过。再看：

```js
setImmediate(() => {
  setImmediate(() => {
    console.log('setImmediate');
  });

  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
});
```

里面两个 `setImmediate` 与 `setTimeout` 次要在下个 Tick 执行，因当前已在复查阶段，防重入机制让里面的 `Immediate`不会当前执行，结果和最初代码相同、顺序随机。

那和 `fs` 文件系统比又如何呢？比如：

```js
setImmediate(() => {
  console.log('setImmediate');
});
require('fs').readFile('temp.js', () => {
  console.log('readFile');
});
```

执行顺序如何？正常情况下先 `Poll for I/O`，再复查。因 `Poll for I/O` 等待文件系统时间为 0，拿不到事件，执行后续复查阶段输出 `setImmediate`。之后的 Tick 文件事件触发输出 `readFile`。

若代码为：

```js
function imm() {
  setImmediate(() => {
    console.log('setImmediate');
    imm();
  });
}
imm();

require('fs').readFile('temp.js', () => {
  console.log('readFile');
  process.exit(0);
});
```

输出几行 `setImmediate` 后，读取成功后输出 `readFile` 退出。原因是虽等 0 秒，但执行每个 Tick 需些微时间，几个 Tick 后事件到时读出，从而输出 `readFile` 的回调。

## queueMicrotask()

**微任务是在“当前 JavaScript 执行上下文堆栈”完毕后执行**，与事件循环无关。像这种：

```js
function sleep(milliseconds) {
  const start = new Date().getTime();
  while (new Date().getTime() - start < milliseconds) {
    // 此循环会阻塞执行，直到指定的毫秒数过去
  }
}

setTimeout(() => {
  console.log('setTimeout1');
  queueMicrotask(() => {
    console.log('queueMicrotask1');
  });
}, 10);

setTimeout(() => {
  console.log('setTimeout2');
  queueMicrotask(() => {
    console.log('queueMicrotask2');
  });
}, 15);

sleep(100);

setTimeout(() => {
  console.log('setTimeout3');
  queueMicrotask(() => {
    console.log('queueMicrotask3');
  });
}, 10);

sleep(100);

// 执行顺序
// setTimeout1
// queueMicrotask1
// setTimeout3
// queueMicrotask3
// setTimeout2
// queueMicrotask2
```

## process.nextTick()

`process.nextTick()` 不属事件循环，Tick 概念与事件循环 Tick 不同。它在 Node.js 中表示 Timer 间隙。

执行时机：

1. Node.js 内部 callback 完毕后；
2. Timeout、Immediate 触发间隙。

```js
console.log('start');

process.nextTick(() => {
  console.log('tick1');
});

setTimeout(() => {
  setImmediate(() => {
    console.log('setImmediate');
    process.nextTick(() => {
      console.log('tick2');
    });
  });

  setTimeout(() => {
    console.log('setTimeout');
    process.nextTick(() => {
      console.log('tick3');
    });
  }, 0);
});
```

与微任务关系：

上面两情况后，若无 Tick 回调，执行微任务；若有，先执行 Tick 回调，再微任务。期间再插入新 Tick 回调，优先执行循环不会跳出。

```js
console.log('start');

process.nextTick(() => {
  console.log('tick1');
  process.nextTick(() => {
    console.log('tick2');
  });
});

Promise.resolve().then(() => {
  console.log('promise1');
  process.nextTick(() => {
    console.log('tick3');
  });
  Promise.resolve().then(() => {
    console.log('promise2');
  });
});

//输出结果：
// start
// tick1
// tick2
// promise1
// promise2
// tick3
```

原因：Node.js 事件循环中 `process.nextTick()` 回调优先级高于到达微任务队列的 Promise。在例中，所有 `nextTick` 回调（`tick1, tick2`）优先于微任务（`promise1, promise2`）执行。又因 `nextTick` 回调执行时机是某 callback 执行完后的间隙，所以 `tick3` 在 `promise2` 之后执行。

## 事件循环（浏览器）

浏览器它启动的时候，实际上会开辟多个进程。这些进程里边主要有三个，其实不止三个。但是我们要关心的其实就这三个，一个是浏览器进程，一个是网络进程，一个是渲染进程。每个进程是不有一块独立的内存空间，对吧？这浏览器进程的这是网络进程的这是渲染进程的。那么这样子有什么好处呢？比方说网络这一块，这一块崩溃了，它不会影响到渲染，不会影响到浏览器的进程。三个进程到底干嘛用的。首先是浏览器进程，它主要做什么呢？他主要负责界面的展示。什么界面展示？不是页面的展示，它不是这个界面的展示。他是负责比如说这个标签页的样子，还有这里后退前进按钮、刷新按钮，这个导航栏，就这些部分的展示。懂我的意思吧？这是这个浏览器今天要做的事儿。还包括用户交互，比如用户在浏览器窗口里面点的啥，滚动的滚动条，滚动的一个鼠标滚轮，或者是按照键盘，这些东西都属于用户交互，也是浏览器进行主要负责的。他监听到底动没动，你到底点没点，到底划没划这些是浏览器进程要处理的事儿，还有一些什么子进程管理，实际上这个顺便了解一下就行了，就是像这些进程，网络进程，确认进程，都是浏览器进程它启动出来的。就一开始最开始是只有一个进程，他们他马上就会启动，多个进程是由他来启动进程启动起来的，所以到紫禁城管理，就其他进程是由他来启动的。好，恢复浏览器进程了解就行了。然后接下来第二个进程，网络进程。因为我们浏览器需要跟网络通信，对吧？你写一个U21地址标，这里写个百度一回传，不等于网络通信吗？是吧？这图片不是网络通信加载出来吗？所以说这些网络资源的加载又需要单独的一个程序处理，叫做网络进程。当然它里边也会分为很多个线程来处理不同的网络任务。了解就行了，我们这节课这些东西不会的详细讲，重点关注下面这个进程，渲染进程，这是我们本节课要重点讲解的进程和科学。渲染进程启动后他要说什么呢？他会开启一个渲染主线程，这个好理解。一个进程启动过后都都有一个进程。那么渲染进程启动过后，他那个随着开启的主线程。主线程又称为渲染主线程。我们后边讲的都是他都跟他相关而且浏览器它会为每一个标签页开启一个全新的宣传进程。刚才我们看到过了对吧？它可以保证标签页之间不相互影响我们接着往后看说这个渲染主线程是如何工作的呢？渲染主线程是浏览器里边最繁忙的境最繁忙的现场，需要他处理的任务特别多。展开来说的话，他要解析，听没有要解析对吧？听老师个字符串，他叫他解析，这写的是啥？你写了个间括号，这个玩意儿是啥？他理解。CS里面写的选择器一个点，后面写一个英文单词的这是啥？他就先把它理解的过程就是解析，之后我会详细说，后面课程我会详细说，这里我们简单了解下就行，还有就是样式要算呗，你写了EM差别也要把它换算成PS把它换成像素，你写的百分比也要把它换成像素，这都需要计算的。包括样式冲突，是不是要进行层叠规则，要淘汰掉一些优先级低的，最后就只剩一个。这些计算过程也是主线程要做的。还有就是布局，我们每一个元素它有多宽多高要算出来，每个元素的位置要算出来，我们把这一块统称为几何信息，要全部算出来。好，然后就可以到页面上去了。还有图层一个Z这个是哪个在前，哪一个哪个在后，对吧？先画背景，还是先画一个元素里的元素，它都要计算的。我们平时觉得理所当然的事儿，写代码就可以显示出来。其实他做很多很多复杂的操作才能把显示出来。这些玩意儿都是渲染出现成的工作？还要把每秒把页面画64。这里简单了解，主要是为了说明他很忙，每秒把这页面画到64。还要执行计算，还要处理事件函数是吧？监听了事件过后，按照点了按钮之后，他要运行的函数也是他处理。即使是到时间了，他还要指向的回调函数全是他的处理。像我们的浏览器线上没有用户交互事件吗？给用户点击了一下，是由其他线程在监听，还记得吗？看一下看到没？浏览器进程里边它可以监听用户到底点没点。用户点那个按钮，这个时候，他会把按钮的事件处理函数作为一个任务拿去排队。因为浏览器主线程它是浏览器线程，它是不执行GS代码的，但它可以做一件事儿，把这个任务拿去排队等待渲染主线程序执行。那对方那个计时器到时间了，一个人拿个卡个表正在计时，计时个1分钟30秒。那计时器到时间了，他又把那个回调函数拿去排队等待执行，明白这意思吗？所以说是不是可以回答一个问题了当用当正在执行的介绍函数说明正在执行一个任务。执行到一般的时候，用户点这个按钮，我应该立即去执行点击事件的处理函数吗？不会，他得把手上的事情干完了之后，从这个排队里面去拿。比方说这个地方用户点了按钮，正在执行，用户点了个按钮，其他线路能监听到了。于是他把这个任务加到这里面去等待被执行排队的。而前面的可能已经有了两个任务了，已经排着了。那你继续排好。当我组建成把这个任务搞定之后，把这个人搞定之后，那么主线程清空了，没东西可以执行了。于是从消息对接里边拿第一个认出来，下一位往前面走是吧？来执行，执行完了过后，那这个也OK了，然后又拿下一个，然后又拿下一个，对吧？依次拿去执行，就这个意思。好，咱们来具体看一下。在最一开始的时候，渲染主线程它会进入一个无限循环。什么叫无限循环？这就是无限循环的无穷无尽的循环下去。那真的是如此吗？咱们来看一下，看啥呢？事件循环它又叫做消息循环，只是不同的名称而已。在W3C这个官方文档里边，因为我们说的标准，HYCS的A标准都是属于包括浏览器的标准都属于W3C的。W3C的标准文档里边，它把它叫做事件循环，叫一问loop。但是在谷歌浏览器里面，它把它叫做message loop，都一个意思，其实有点细微的感觉上有点不一样。所以说我们说消息循环和事件循环是一个东西。好看一下，这就是消息循环。为什么消息你知道了吧？它就是循环在拿消息，每一次循环从队列里面哪一个任务去执行，执行完了过后，下一次循环拿下一个任务。所以看教条每一次循环会检查消息对中是否有任务存在，如果有的话就取出第一个任务执行，执行完过后进入下次循环。如果说没有的话，他如果说没任务的话，没有去休息，踏踏实实休息。你没事的时候不休干嘛呢？进入休眠状态，如果说突然一开始没有任务，后来又突然出现一个任务，那么就会唤醒其他所有县城，包括其他进城的县城。

### Event Loop

Event Loop（事件循环）是用来协调事件、用户交互、脚本、渲染、网络的一种浏览器内部机制。

我们这里主要讨论的是 window event loop。也就是浏览器一个渲染进程内主线程所控制的 Event Loop。

Event Loop 处理过程：

1. 在所选 task queue (taskQueue) 中约定必须包含一个可运行任务。如果没有此类 task queue，则跳转至下面 microtasks 步骤。
2. 让 taskQueue 中最老的 task (oldestTask) 变成第一个可执行任务，然后从 taskQueue 中删掉它。
3. 将上面 oldestTask 设置为 event loop 中正在运行的 task。
4. 执行 oldestTask。
5. 将 event loop 中正在运行的 task 设置为 null。
6. 执行 microtasks 检查点（也就是执行 microtasks 队列中的任务）。
7. 设置 hasARenderingOpportunity 为 false。
8. 更新渲染。
9. 如果当前是 window event loop 且 task queues 里没有 task 且 microtask queue 是空的，同时渲染时机变量 hasARenderingOpportunity 为 false ，去执行 idle period（requestIdleCallback）。
10. 返回到第一步。

以上是来自规范关于 event loop 处理过程的精简版整理，省略了部分内容。

更新渲染具体流程：

1. 遍历当前浏览上下文中所有的 document ，必须按在列表中找到的顺序处理每个 document 。
2. 渲染时机（Rendering opportunities）：如果当前浏览上下文中没有到渲染时机则将所有 docs 删除，取消渲染（此处是否存在渲染时机由浏览器自行判断，根据硬件刷新率限制、页面性能或页面是否在后台等因素）。
3. 如果当前文档不为空，设置 hasARenderingOpportunity 为 true 。
4. 不必要的渲染（Unnecessary rendering）：如果浏览器认为更新文档的浏览上下文的呈现不会产生可见效果且文档的 animation frame callbacks（requestAnimationFrame）是空的，则取消渲染。
5. 从 docs 中删除浏览器认为出于其他原因最好跳过更新渲染的文档。
6. 如果文档的浏览上下文是顶级浏览上下文，则刷新该文档的自动对焦候选对象。
7. 处理 resize 事件，传入一个 `performance.now()` 时间戳。
8. 处理 scroll 事件，传入一个 `performance.now()` 时间戳。
9. 处理媒体查询，传入一个 `performance.now()` 时间戳。
10. 运行 CSS 动画，传入一个 `performance.now()` 时间戳。
11. 处理全屏事件，传入一个 `performance.now()` 时间戳。
12. 执行 requestAnimationFrame 回调，传入一个 `performance.now()` 时间戳。
13. 执行 intersectionObserver 回调，传入一个 `performance.now()` 时间戳。
14. 对每个 document 进行绘制。
15. 更新 ui 并呈现。

根据更新渲染流程可知，如下案列页面隐藏时并不会闪烁，**因为 JS 脚本作为一个整体，必须等到执行完毕后，浏览器才会开始渲染**。

```js
document.body.appendChild(el)
el.style.display = 'none'
```

下面代码中实际上只有最后一行代码是有意义的。

```js
button.addEventListener('click', () => {
  box.style.display = 'none'
  box.style.display = 'block'
  box.style.display = 'none'
  box.style.display = 'block'
  box.style.display = 'none'
  box.style.display = 'block'
  box.style.display = 'none'
  box.style.display = 'block'
})
```

### Event Loop 与 requestAnimationFrame

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
      }
      .box1 {
        width: 100px;
        height: 100px;
        background-color: #ccc;
      }
      .box2 {
        width: 100px;
        height: 100px;
        background-color: #9c5f5f;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="box1"></div>
    <div class="box2"></div>
    <button type="button">click me</button>

    <script>
      const box1 = document.querySelector('.box1');
      const box2 = document.querySelector('.box2');
      const button = document.querySelector('button');

      button.addEventListener('click', () => {
        let j = 0;
        let requestId;
        function animation1() {
          box1.style.marginLeft = `${j}px`;
          requestId = requestAnimationFrame(animation1);
          j++;
          if (j > 200) {
            cancelAnimationFrame(requestId);
          }
        }
        animation1();

        let i = 0;
        let timerId;
        function animation() {
          box2.style.marginLeft = `${i}px`;
          timerId = setTimeout(animation, 0);
          i++;
          if (i > 200) {
            clearTimeout(timerId);
          }
        }
        animation();
      });
    </script>
  </body>
</html>
```

<!-- 浏览器渲染前 raf 必执行，关于 timer 与 raf 的顺序，实际是 timer 与渲染的顺序 -->
点击按钮可以看到：`setTimeout` 动画比 `requestAnimationFrame` 动画更快。

根据上文可知：`requestAnimationFrame` 的回调时机 ———— 它会在 `style/layout/paint` 之前调用。

![20240920214724](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240920214724.png)

首先，浏览器渲染有个渲染时机的问题，也就是浏览器会根据当前的浏览上下文判断是否进行渲染，它会尽量高效，只有必要的时候才进行渲染，如果没有界面的改变，就不会渲染。按照规范里说的一样，因为考虑到硬件的刷新频率限制、页面性能以及页面是否存在后台等等因素，有可能执行完 setTimeout 这个 task 之后，发现还没到渲染时机，所以 setTimeout 回调了几次之后才进行渲染，此时设置的 marginLeft 和上一次渲染前 marginLeft 的差值要大于 1px 的，因为屏幕的刷新频率是 60 Hz，所以大致在 16.6ms 之内执行了多次 setTimeout task 之后才到了渲染时机并执行渲染。

requestAnimationFrame 帧动画不同之处在于，每次渲染之前都会调用，此时设置的 marginLeft 和上一次渲染前 marginLeft 的差值为 1px 。

所以看上去 setTimeout “快”了很多。

### Event Loop 与 EventTarget.dispatchEvent()

与浏览器原生事件不同，**原生事件**是由 DOM 派发的，并通过 `event loop` **异步调用**事件处理程序，而`dispatchEvent()`则是**同步调用**事件处理程序。在调用 `dispatchEvent()` 后，所有监听该事件的事件处理程序将在代码继续前执行并返回。

我们来看个示例：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <button>Click me!</button>
    <script>
      const button = document.querySelector('button');

      button.addEventListener('click', () => {
        Promise.resolve().then(() => {
          console.log('Microtask 1');
        });
        console.log('Listener 1');
      });

      button.addEventListener('click', () => {
        Promise.resolve().then(() => {
          console.log('Microtask 2');
        });
        console.log('Listener 2');
      });
    </script>
  </body>
</html>
```

<!-- 可以把用户事件看作 Timer 理解 -->
点击按钮打印顺序为：`Listener 1 -> Microtask 1 -> Listener 2 -> Microtask 2`。

假设我们使用 `dispatchEvent()` 来模拟点击事件：

```js
button.click();
```

点击按钮打印顺序为：`Listener 1 -> Listener 2  -> Microtask 1 -> Microtask 2`。

事件冒泡也是如此：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>事件循环</title>
    <style>
      .outer {
        background-color: #ccc;
        width: 200px;
        height: 200px;
      }
      .inner {
        background-color: blanchedalmond;
        width: 100px;
        height: 100px;
      }
    </style>
  </head>
  <body>
    <div class="outer">
      <div class="inner"></div>
    </div>
    <script>
      // 让我们获取这些元素
      const outer = document.querySelector('.outer');
      const inner = document.querySelector('.inner');

      // 下面是一个点击监听器
      function callback() {
        console.log('click'); // 当元素被点击时, 打印 'click'

        setTimeout(function () {
          console.log('timeout'); // 0毫秒后, 打印 'timeout'
        }, 0);

        Promise.resolve().then(function () {
          console.log('promise'); // 当前事件循环结束时, 打印 'promise'
        });
      }

      // 我们将事件监听器添加到两个元素上
      inner.addEventListener('click', callback); // 为内部元素添加点击监听器
      outer.addEventListener('click', callback); // 为外部元素添加点击监听器

      // 手动触发
      // inner.click(); // 点击内部元素
    </script>
  </body>
</html>
```

<!-- timeout 执行顺序是看超时时间的 -->
点击按钮打印顺序为：click -> promise -> click -> promise -> timeout -> timeout。

## 事件循环面试题

### 1. 打印顺序是什么？

```js
console.log('begins'); // 1

setTimeout(() => {
  console.log('setTimeout 1'); // 3
  Promise.resolve().then(() => {
    console.log('promise 1'); // 4
  });
}, 0);

new Promise(function (resolve, reject) {
  console.log('promise 2'); // 2
  setTimeout(function () {
    console.log('setTimeout 2'); // 5
    resolve('resolve 1');
  }, 0);
}).then((res) => {
  console.log('dot then 1'); // 6
  setTimeout(() => {
    console.log(res); // 7
  }, 0);
});
```

<details><summary><code>结果：</code></summary>

`begins -> promise 2 -> setTimeout 1 -> promise 1 -> setTimeout 2 -> dot then 1 -> resolve 1`

</details>

### 2. 打印顺序是什么？

```js
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(function () {
  console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});

console.log('script end');
```

<details><summary><code>结果：</code></summary>

`script start -> async1 start -> async2 -> promise1 -> script end -> async1 end -> promise2 -> setTimeout`

</details>

## 拓展知识：任务时长超过一帧怎么处理？

帧是画面的意思，浏览器页面就像视频一样，每一秒会绘制很多帧，**每一帧的耗时是不定的，可以是任意的时间**。

![20240920010014](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240920010014.png)

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

那么这一帧耗时就会至少 1 秒钟，1 fps。**任务耗时的后果是让一帧耗时变长，帧率变低，产生丢帧，但任务不会被跳过。**

## 推荐阅读

- [javascript 既然是单线程语言，为什么会分主线程和消息线程(event loop)?](https://www.zhihu.com/question/35905242)
- [浏览器动画帧渲染与执行机制探索](https://jelly.jd.com/article/5fda117df708c8014219e056)
- [【事件循环】【前端】事件原理讲解，超级硬核，忍不住转载](https://www.bilibili.com/video/BV1K4411D7Jb/?spm_id_from=333.337.search-card.all.click&vd_source=c4234488bc8659e17c631716b9036762)
- [可视化工具秒懂 JS 事件循环](https://www.jsv9000.app/)
- [事件冒泡是宏任务还是微任务，以及冒泡的触发时机?](https://www.zhihu.com/question/613559688)
