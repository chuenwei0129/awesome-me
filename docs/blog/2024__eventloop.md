---
group:
  title: 2024 🐲
  order: -2024
title: EventLoop 回顾
toc: content
---

## 先来两道面试题测测水平

### 1. 打印顺序是什么？

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react';

const ScriptComponent = () => {
  const runScript = () => {
    alert('begins');

    setTimeout(() => {
      alert('setTimeout 1');
      Promise.resolve().then(() => {
        alert('promise 1');
      });
    }, 0);

    new Promise(function (resolve, reject) {
      alert('promise 2');
      setTimeout(function () {
        alert('setTimeout 2');
        resolve('resolve 1');
      }, 0);
    }).then((res) => {
      alert('dot then 1');
      setTimeout(() => {
        alert(res);
      }, 0);
    });
  };

  return (
    <div className="p-4">
      <button onClick={runScript} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded">
        打印顺序是什么？
      </button>
    </div>
  );
};

export default ScriptComponent;
```

### 2. 打印顺序是什么？

```jsx
/**
 * defaultShowCode: true
 */
import React from 'react';

const ScriptComponent = () => {
  const runScript = () => {
    async function async2() {
      alert('async2');
    }

    async function async1() {
      alert('async1 start');
      await async2();
      alert('async1 end');
    }

    alert('script start');

    setTimeout(function () {
      alert('setTimeout');
    }, 0);

    async1();

    new Promise(function (resolve) {
      alert('promise1');
      resolve();
    }).then(function () {
      alert('promise2');
    });

    alert('script end');
  };

  return (
    <div className="p-4">
      <button type="button" onClick={runScript} className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded">
        打印顺序是什么？
      </button>
    </div>
  );
};

export default ScriptComponent;
```

---

## 单线程模型

### 🌟 **总结** 🌟

Node.js 虽然表面上是单线程的，但其底层通过多线程巧妙地处理各种异步任务，提供了高效的性能。同时，JavaScript 设计成单线程是为了简化编程模型，避免复杂的线程同步问题，确保程序的安全和可靠性

### JavaScript 的“单线程”

搞清楚 Node.js 到底是单线程还是多线程，这事儿堪比在年夜饭桌上解释你那份工作。简短回答：Node.js 是单线程的。

对细节有点兴趣？那就是：Node.js 在拥有 `worker_threads` 模块（就像浏览器里的 [Web Workers API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)）之前，对于用户来说，它是单线程。

深挖一下的话：所谓的“单线程”只是对用户而言，底层究竟有多少线程在跑，对你来说没啥影响，因为你根本碰不到它们。

JavaScript 是一门完完全全的单线程语言，像一个孤独奋斗的小餐馆老板。你的代码在任何时候都只能在这个唯一的主线程上运行。

所以，不要妄想着这个老板在忙着翻炒牛肉的时候还能记账。所有代码都是串行执行的，这也就是为什么 JavaScript 的并发模型是基于事件和回调，而不是传统的多线程并发模型。

### 底层的多线程

尽管你的 JavaScript 代码在一个“单线程”中跑，但不意味着引擎本身只有一个线程。

事实上，现代的浏览器和 Node.js 运行时都巧妙地使用了多线程来处理 I/O 操作、垃圾回收和异步任务等等。这就好比那个小餐馆老板，虽然他一个人经营所有的菜品，但幕后还有一个强大的冷冻库和送货队伍在默默工作，对你来说，他们是完全透明的。

### 举个栗子

想起调用 AJAX 的过程吧，你需要把成功回调传递给 `xhr`，如下：

```js
const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  /* 传入我们的回调 */
};
xhr.open(...);
xhr.send(...);
```

当你在浏览器中发起一个网络请求，JavaScript 代码会注册一个回调函数然后立马返回，不会阻塞主线程。网络请求的实际工作是由浏览器的底层用不同的线程处理的。一旦请求成功，回调函数会被放入事件队列，最终由事件循环取出并在主线程上执行。

尽管浏览器有单独的线程去处理网络请求，回调函数被执行时还是会在 JavaScript 的主线程上。所以，归根结底，JavaScript 确实是在单线程里干活。

## 为什么 JavaScript 要设计成单线程？为什么 Web Worker 不允许操作 UI？

Web Workers 允许我们开启工作线程来处理耗时任务，但有个特例：在 worker 内部，可不能直接操作 DOM 节点。

Workers 和主线程之间的数据交流是通过消息机制进行的——双方都用 `postMessage()` 方法发送消息，并用 `onmessage` 事件处理函数响应消息。**这个过程中数据是被复制的而不是共享**。

进程的地址空间是隔离的，但同一个进程内线程是可以共享数据的，**那为什么 Web Worker 和主线程不能共享变量，而要通过这复杂的消息队列传递数据呢？操作 UI 更是被严严实实地禁止**？

答案揭晓啦：**UI 操作应该永远只在主线程**。

线程间的同步不仅繁琐，还带来了同步问题。如果所有线程都能操作 UI，那么在发生线程切换时，可能会导致数据不一致的问题。假设 a 线程修改界面数据到一半，cpu 切到 b 线程，b 线程也去改同一个地方，那结果就是大混乱。UI 界面本质上是操作系统对数据在显示器上的映射，为了稳定和一致，所有修改只能在主线程进行。

因此，为了保证系统的稳定性和一致性，我们只能遵循这个规则，不准在 Worker 线程中改 UI。而且这种限制确保了 JavaScript 能保持它那种简单但强大的异步操作模型。

## 事件循环（Node.js）

### JavaScript 代码执行的粒度

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

### Node 事件循环内部顺序图

在 Node.js 中，各种异步任务可谓遍地开花，有些任务交给类似 `epoll` 监听 I/O 事件，还有一些交给 `libuv` 的线程池执行。不出意外，“文件系统”和“定时器”任务可能“同时触发”。但它们的执行顺序呢？

一个事件循环的每一步，除了 `Poll for I/O` 任务阶段外，还有好几层。看下图，`timer` 任务步就在 `Run due timers` 层。`setImmediate()`、`process.nextTick()`则分别在其他步骤。

![事件循环顺序图](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240920155840.png)

定时器任务在定时器阶段执行，所有同时到期的定时器顺序执行。而读取文件事件在 `Poll I/O` 事件阶段执行，多任务还是顺序执行。每次“顺序执行”时，只会跑完那一段“同步代码”。

看来是“同时发生”，但所有代码在 Node.js 的主事件循环里都得排好队，串个一个一个来。

### Timer

#### 浏览器中的 `setTimeout()`

在浏览器里，`setTimeout()` 返回一个整数，表明定时器 ID。而且这家伙如果嵌套层级超过 5 且超时时间低于 4 毫秒，超时间会被顶到至少 4 毫秒。这是想防止频繁回调拖慢寿命。

#### Node.js 中的 `setTimeout()`

在 Node.js 里，`setTimeout()` 返回的是一个 `Timeout` 对象（没错，可不是什么小小整数 ID）。Node.js 也没有浏览器中的 4 毫秒规则，所以超时处理上自然不一样。

#### 触发顺序的差异

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

### setImmediate()

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

### queueMicrotask()

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

### process.nextTick()

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

---

## 浏览器事件循环机制

### 浏览器进程模型

浏览器的进程模型和事件循环密切相关。要全面理解事件循环，首先需了解浏览器如何组织和管理多个进程和线程，从而明确事件循环在浏览器内部的具体位置及其运行机制。

进程是指程序在运行时占用的一块专属内存空间，每个程序启动时至少需要一个进程来承载其运行。进程之间相互独立，内存空间隔离，这样即使一个进程崩溃也不会影响其他进程的正常运行。

线程是指进程中执行代码的具体实体，每个进程至少有一个主线程。当一个进程需要同时执行多块代码时，会启动更多线程，这些线程可以并行工作，就像家庭成员可以同时进行不同活动一样。

浏览器是一个复杂的多进程多线程应用程序。为了减少相互影响并提高系统的稳定性和安全性，它为各个功能模块创建独立的内存空间和进程，如浏览器进程、网络进程和渲染进程。即使某个功能模块出现问题，也不会导致整个浏览器进程崩溃。

在浏览器的多进程模型中，有三个主要的进程需要关注：浏览器进程、网络进程和渲染进程。

### 浏览器进程

浏览器进程主要负责界面的呈现（非页面内容展示），例如标签页的样式、后退和前进按钮、刷新按钮以及地址导航栏。这些部分的展示及用户交互（如点选、滚动、键盘输入）都由浏览器进程处理。此外，浏览器进程还负责创建和管理其他子进程，如网络进程和渲染进程。

### 网络进程

网络进程负责与网络的通信，以及处理所有网络资源的加载任务。例如，当用户输入一个URL地址时，浏览器需要通过网络进程来获取并加载相应的网页内容。该进程内部可能包含多个线程来处理不同的网络任务。

### 渲染进程

渲染进程是与页面内容直接关联的进程，每个标签页启动一个全新的渲染进程以保证标签页之间的隔离性。渲染进程启动后，会开启一个渲染主线程，该线程负责解析HTML、计算样式、布局元素、图层排序和绘制页面，并以每秒60次的频率更新显示。此外，它还处理事件循环，例如用户点击事件和定时器事件，并按顺序执行回调函数。

渲染主线程是浏览器中最繁忙的线程之一，负责处理大量任务，并确保任务的顺序执行。于是浏览器采用了消息队列和事件循环机制以提高运行效率。

### 消息队列与事件循环

消息队列（或事件队列）存储了待处理的任务。当主线程执行某个任务时，可能会出现新的任务加入消息队列，例如用户点击按钮时，监听器会将对应的事件处理函数作为一个任务加入队列。

主线程按照先进先出（FIFO）的原则，从队列中取出任务依次执行。

渲染主线程启动后会进入一个看似无穷无尽的循环。每次迭代时，它检查消息队列中是否有待处理的任务。如果有，则从队列头部取出任务并执行；如果没有，则主线程进入休眠状态，直到有新任务进入队列。

### 异步机制

在单线程环境下，如果使用同步方式（如阻塞式的网络IO或长时间计算），主线程会被迫等待这些操作完成，导致阻塞。为了解决这一问题，浏览器采用了异步机制。

异步与事件循环密切相关，指的是代码执行过程中出现不能立即完成的任务（如计时器、网络通信或鼠标点击等），这些任务添加到消息队列中，让主线程可以继续执行其他任务。任务会被分给其他线程处理，如计时器、网络监听等。这些线程独立完成任务后，将回调函数包装成任务并放入消息队列，而非直接交给主线程执行。主线程按照任务的顺序依次执行，实现永不阻塞的效果，确保页面的及时更新和流畅运行。

### 任务类型与微任务队列

最初的任务队列没有优先级，遵循先进先出（FIFO）原则。但这种机制无法满足复杂需求，W3C标准引入了任务类型的概念。不同类型的任务可以分配到不同的队列，同类型的任务必须在同一队列中执行。

W3C最新标准要求，每个任务都有明确的任务类型（如用户交互、网络请求或计时器等），**同类型任务必须在一个队列中执行，不同类型任务可在同队列中执行**。此外，还要求**浏览器准备一个微任务队列，其中的任务具有最高优先级，任何情况下都会优先执行，包括绘制过程**。微任务队列确保其内部任务先被执行完毕。

总的来说，浏览器通过事件循环和异步机制，确保了页面的流畅刷新和对用户操作的及时响应。这一机制使得浏览器能够有效管理多进程和多线程任务，提高了系统的稳定性和安全性。

## JS 中的计时器能不能实现精确计时？

JS 中的计时器不能实现精确计时，原因有以下几点：

1. **计算机硬件的限制**
    计算机硬件层面没有像原子钟那样精确的技术。

2. **操作系统的计时函数存在偏差**
    操作系统提供的计时函数本身存在少量偏差，不同操作系统间的实现方式不同。

3. **W3C 标准的限制**
    按照 W3C 标准，当嵌套层级超过 5 层时，计时器的最小时间会变为 4 毫秒。

4. **事件循环机制的影响**
    计时器的回调函数只能在主线程空闲时运行，这可能导致实际执行时间与预期有所不同。

**详细解释：**

1. 计算机硬件的限制

   计算机的时钟是由硬件组件提供的，其精度受限于硬件本身。与原子钟相比，计算机硬件时钟存在天然的精度限制。

2. 操作系统的计时函数存在偏差

   不同操作系统对计时函数的实现方式不同，可能存在偏差。例如，Windows 和 Linux 的计时精度和实现细节都不尽相同，这会影响计时器的精度。

3. W3C 标准的限制

   根据 W3C 规范，当嵌套的 `setTimeout` 或 `setInterval` 层级超过 5 层时，计时器的最小时间间隔会提升到 4 毫秒。这意味着即使你设置的时间间隔更小，当嵌套层级达到一定程度后，实际执行的时间间隔也不会小于 4 毫秒。

4. 事件循环机制的影响

   JavaScript 的运行基于事件循环，计时器的回调函数只能在主线程空闲时运行。如果主线程繁忙，例如存在大量的同步任务或其他回调待处理，计时器的回调函数就会被推迟执行，导致实际执行时间与设置的时间间隔有所不同。

## 推荐阅读

- [javascript 既然是单线程语言，为什么会分主线程和消息线程(event loop)?](https://www.zhihu.com/question/35905242)
- [【事件循环】【前端】事件原理讲解，超级硬核，忍不住转载](https://www.bilibili.com/video/BV1K4411D7Jb)
- [可视化工具秒懂 JS 事件循环](https://www.jsv9000.app/)
