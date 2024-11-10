---
group:
  title: 2024 🐲
  order: -2024
title: 事件循环
toc: content
---

## 单线程模型

网上经常会有这样的问题出现，Node.js 究竟是单线程还是多线程的？其实不止是 Node.js，对于浏览器上的 JavaScript，大家都会有这样的疑问。

基础回答：Node.js 是单线程的。

再严谨一些：Node.js 在 worker_threads 模块（同浏览器中的 [Web Workers API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)）出来之前，在用户层面是单线程的。

展开说说：单线程是对你而言。对底层可不是，只不过其他线程对你不开放的。

怎么理解？

这个问题涉及到编程模型与实现细节之间的区别。让我们来分解一下这个答案：

> JavaScript 是单线程的，但是 JavaScript 的执行环境不是单线程的，如浏览器。主流的 JS 引擎至少都要有一个用户(JS)线程外加一个 IO 线程。比如一个线程给 JS 和渲染，一个给 Ajax。但严谨的说 Ajax 是使用引擎包装后的，不算引擎自身的。

1. **单线程对开发者而言**: 当人们说 Node.js 或浏览器中的 JavaScript 是单线程的，他们指的是 JavaScript 代码的执行模型。在这个模型中，**你的 JavaScript 代码在任何时候都只在一个主线程上执行**，这意味着你写的**任何 JavaScript 代码都不会并行执行**。这就是为什么 JavaScript 中的并发模型基于事件和回调，而不是传统的多线程并发模型。

2. **底层的多线程**: 尽管 JavaScript 代码是在单线程中运行的，但这并不意味着 JavaScript 引擎只有一个线程。实际上，现代的 JavaScript 引擎和 Node.js 运行时都使用多线程来处理 I/O 操作、垃圾收集、执行异步任务等。这些操作通常由引擎或运行时的内部线程池处理，对于开发者来说是完全透明的。

## 举例说明

有人会说浏览器中 ajax 请求也是系统单独开了一个线程去执行的网络请求，那么浏览器在没有引入 Web Worker API 之前是不是也可以说 JavaScript 也有多个线程呢？

错！在没有引入 Web Worker API 之前，JavaScript 确确实实是运行在一个单线程里面！那 ajax 怎么说？ 回忆一下调用 ajax 的过程，我们是需要把成功回调传递给 xhr 的，典型的代码如下：

```js
const xhr = new XMLHttpRequest();
xhr.onreadystatechange＝function(){} // 传入我们的回调
xhr.open(...)
xhr.send(...)
```

当你在浏览器中进行网络请求，JavaScript 代码会注册一个回调函数然后立即返回，不会阻塞主线程。实际的网络请求操作是在浏览器的底层由不同的线程处理的。一旦网络请求成功后，回调函数会被放入事件队列中，最终由事件循环取出并在主线程上执行。

浏览器虽然会在一个单独的线程去进行网络请求，但是我们是通过传递一个回调的方式去处理数据，浏览器在网络请求成功后，仍然是在主线程执行我们的回调，也就是说我们所有的 JavaScript 代码都是在 JavaScript 线程中运行的。所以 JavaScript 确实是在一个单线程中。

## 为什么以前 JavaScript 要设计成单线程，为什么不允许在 Web Worker 中操作 UI？

[Web Workers](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers) 允许我们开一个工作线程处理一些耗时的任务，在 worker 线程中你可以运行任何你喜欢的代码，不过有一些例外情况。比如：在 worker 内，**不能直接操作 DOM 节点**。

workers 和主线程间的数据传递通过这样的消息机制进行——双方都使用 `postMessage()` 方法发送各自的消息，使用 `onmessage` 事件处理函数来响应消息。**这个过程中数据并不是被共享而是被复制**。

进程的地址空间是隔离的，但同一个进程的线程之见是可以共享数据的，为什么 Web Worker 和 JS 虽然不在同一线程，但是如果在同一个进程中，也是应该能共享变量的，为什么 Web Worker 和 JS 主线程之间要通过消息对列这种复杂的方式来传递数据？为什么不允许在 Web Worker 中操作 UI？

**界面开发，一条黄金原则就是不要在其它线程中操作 UI。**

线程之间同步是有开销的，并且面临着同步问题，如果所有的线程都能操作 UI，**一旦 cpu 发生线程切换，都会面临数据不完整的风险**，例如 a 线程 UI 界面改了一半，cpu 发生线程切换，b 线程又去改同一处。**而界面本质上来说只是操作系统对数据在显示器上的一个映射，各个线程操作的都是数据**，这么一来，你改我也改，你还没改完我有改，你改了一半我接着改，那还怎么玩，所以要支持多线程，必须提供同步工具。

## 事件循环（Node.js）

### JavaScript 代码执行的粒度

Node.js 有一条主事件循环，所有的 JavaScript 代码都是在主事件循环上按“同步代码”为粒度一整段一整段执行的。

```js
setTimeout(() => {
  console.log('a few moment later...');
}, 10);

setTimeout(() => {
  console.log('a few moment later as well...');
}, 15);

console.log('right now');
```

上面所谓同步代码，事件循环中的“第一段”是：

```js
setTimeout(callback, 10); // setTimeout 函数入栈，出栈
setTimeout(callback, 15); // setTimeout 函数入栈，出栈
console.log('right now'); // console.log 函数入栈，出栈
```

这一整块代码不执行完，Node.js 是不会跳出当前调用栈的。如果这一段代码中有一段死循环卡住了：

```js
setTimeout(callback, 10);
setTimeout(callback, 15);
console.log('right now');
while (1) {}
```

那么就会困死在当前 Tick 中。

而后续的 `setTimeout()` 里面的回调函数也一样。在 libuv 的事件循环中，等到定时器阶段触发，会串行执行两次 `setTimeout()` 里面的回调函数。

同样的道理，如果在第一段回调函数中写出死循环：

```js
() => {
  console.log('a few moment later...');
  while (1) {}
}
```

那么，Node.js 就永远跳不出这一段同步执行。理所当然，就到不了第二段的定时器回调。

`setTimeout(callback, 1000)` 这段“同步代码”所做的事是新建一个 Timeout 实例，并将传进来的 `callback` 存在某个地方，仅此而已。`callback` 只有在后续异步逻辑中 libuv 的定时器事件被触发，回到 JavaScript 逻辑时才会被调用。而此时调用也是“全身心投入”到这个回调函数中，只有它的一整块同步逻辑调用完之后，才会进入到下一段异步事件中。

如果有多个 Timer 都在当前时间到期了，在所谓的“一大段同步逻辑中”也是会通过“薅羊毛算法”（下文中 timer 部分会讨论）逐一去执行各个定时器，并不会真正地“同时进行”。

### libuv 的事件循环内部顺序图

在 Node.js 中，异步体现在方方面面，有些异步任务是交给类似 epoll 等进行 I/O 监听，还有一些任务则是交给 libuv 的线程池进行执行。

那么理所当然，“文件系统”和“定时器”可能“同时触发”。他们的执行顺序又是怎么样的呢？

一个事件循环除了 Poll for I/O 之外，前前后后还包了好几层。所谓的 Timer 就在 Run due timers 这层。而 `setImmediate()`、`process.nextTick()` 这些则分别在其他几层。

![20240920155840](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240920155840.png)

定时器任务是在定时器阶段（Run due timers）被执行，里面同时到期的定时器尚且串行执行。而读取文件的事件是在 Poll I/O 事件阶段（Poll for I/O）中被执行的，里面如果有多个 I/O 事件同时到达，也是逐一串行执行。每次“串行执行”的时候都只会执行完那一段相关的“同步代码”。

所以看起来“同时发生”，但在 Node.js 的主事件循环中，所有的一大段代码都是各自串行执行的。哪有什么岁月静好，不过是有人替你负重前行。

### Timer

#### 浏览器中的 `setTimeout()`

在浏览器中，`setTimeout()` 的返回值是一个整数（integer），表示定时器的 ID。此外，如果嵌套层级大于 5 且超时时间小于 4 毫秒，超时时间会被设定为最少 4 毫秒。这是为了防止过于频繁的回调影响性能。

#### `Node.js` 中的 `setTimeout()`

在 `Node.js` 中，`setTimeout()` 返回的是一个 `Timeout` 对象，而不是一个整数 ID。此外，`Node.js` 中并没有强制实施浏览器中的 4 毫秒规则，因此超时的处理方式有所不同。

#### 触发顺序的差异

以下是一个示例代码，展示了在不同环境中定时器的触发顺序差异：

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

在浏览器中，Timeout 的触发时间按实际超时时间的迟早进行排序。上例中，三个 Timeout 的触发时间分别为 10 毫秒、15 毫秒和 110 毫秒，所以触发顺序应该是 `1`、`2`、`3`。实际上，由于第二个阻塞（200 毫秒）结束时，所有的 Timeout 都已经过期，因此它们会立即被触发，顺序是 `1`、`2`、`3`。

**在 `Node.js` 中：**

在 `Node.js` 中，事件循环机制有所不同，导致触发顺序不再是 `1`、`2`、`3`，而是 `1`、`3`、`2`。在上例中，定时器被插入到事件循环中时，大家都超时了，`1`、`3` 定时器属于 `10ms` 链表，`2` 属于 `15ms` 链表，因此按照薅羊毛算法，会优先执行 `10ms` 链表中所有的羊毛，所以先输出 `1`、`3`，然后再输出 `2`。

如果把最后一段代码注释掉，那么输出顺序就和浏览器一样是 `1`、`2`、`3`。

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

`setTimeout()` 时机为 libuv 里唯一 Timer 定时器在事件循环中最近一次超时事件。那 `setImmediate()` 呢？

一次事件循环的逻辑顺序依次为：定时器事件、Pending 态 I/O 事件、空转事件、准备事件、Poll I/O 事件、复查事件及扫尾。

看一下 `setImmediate()` 官方文档：

> Schedules the "immediate" execution of the callback after I/O events' callbacks.

也就是说按 Node.js 官方文档来看，`setImmediate()` 执行时机是在复查事件阶段，在定时器事件、Poll for I/O 事件之后。

但事实上呢？我们来看一段代码：

```js
setImmediate(() => {
  console.log('setImmediate');
});

setTimeout(() => {
  console.log('setTimeout');
}, 0);
```

用 Node.js 跑几次看看？我们会发现结果是随机的，有时先 setImmediate，而有时则先执行 setTimeout。说好的定时器事件先执行呢？

这里其实被偷换概念了。libuv 设计的确是定时器先于复查的——但那仅限于同一个 Tick 呀。抛开一个 Tick 讲执行顺序的都是耍流氓。就 `setTimeout()` 原理那个不精确的劲儿，它指不定是哪个 Tick 执行呢，而 setImmediate 的执行顺序则恰恰在该 Tick 末尾。

在上面代码中，执行了这两句代码后，才进入事件循环。在第一个 Tick 中，先判断 `setTimeout()` 有没有到期。超时时间为 `0`，在 Timeout 构造函数中会被自动设为 `1`。通常情况下，第一个 Tick 还超不了时，所以略过定时器，走到了复查阶段；而有时候计算机稍微脑抽卡一下，第一个 Tick 的时候就已经超时了，这个时候自然是先执行这个 Timeout。如果已经在事件循环中，再跑这两行句代码，那肯定是先执行 Immediate，毕竟定时器阶段未检查到超时 Timeout。如下：

```js
// timer1 -> check -> timer2
setTimeout(() => {
  setImmediate(() => {
    console.log('setImmediate');
  });

  setTimeout(() => {
    console.log('setTimeout');
  }, 0);
}, 0);
```

这就铁定先执行 setImmediate 再执行 setTimeout 了，因为跑完外层 Timeout 后，直接就到后续阶段了，一路过去肯定是先执行复查阶段，然后再是下个 Tick 才能执行后续的 Timeout。但如果这样呢：

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

这个时候，里面的两个 setImmediate 与 setTimeout 肯定都是要在下个 Tick 进行了，因为当前已经处于复查阶段，而且防重入机制让里面的 Immediate 肯定不会再在当前 Tick 进行。那这个时候还是要看电脑有没有脑抽，所以它的结果是跟最开始那两句代码一样，顺序是随机的。

那如果是 `setImmediate()` 与 fs 呢？比如：

```js
setImmediate(() => {
  console.log('setImmediate');
});
require('fs').readFile('temp.js', () => {
  console.log('readFile');
});
```

这个执行顺序又是怎么样的？首先，在这个 Tick 中的执行顺序肯定是先 Poll for I/O 然后再复查。但问题在于，Poll for I/O 阶段，它等待文件系统事件的时间为 0，0 时间内等不到事件，那么会继续执行后续逻辑。而对一个这种可读事件来说，通常不会在 0 的时间内完成触发，所以第一个 Tick 基本上都是直接在 Poll for I/O 阶段假模假式等你 0 毫秒，然后就直奔复查阶段去了。第一个 Tick 没读出来，那 fs 自然是在后续 Tick 中读出来了。所以如果没有一些特殊情况，上面的代码 setImmediate 总会先于 readFile 被输出。

改一下上面的代码：

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
  process.exit(0); //
});
```

执行几次，会发现，输出了几行 setImmediate 后，终于读取成功了，然后输出 readFile 并退出了。这又是什么科学道理呢？虽然我们执行等待的时候等待时间为 0，但是整段 JavaScript 在每个 Tick 执行时间还是有纳秒、微妙、毫秒级别的耗时，所以到下几个 Tick 的时候，事件已经到了，不用等就能直接拿到。这个时候哪怕等待 0 也能直接拿到事件，于是终于等到了 readFile() 的回调函数出场了。

### queueMicrotask()

**微任务是在“当前 JavaScript 执行上下文堆栈”完毕之后，要开始执行下一坨 JavaScript 之前，在这个空档之间执行的任务**。这与事件循环没有必然联系。

比如我们监听了很多文件系统 I/O 事件，并且在某一个事件循环中同时拿到事件并触发，它们处于同个阶段，但它们的 JavaScript 执行上下文堆栈则不同。

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
```

### process.nextTick()

`process.nextTick()` 并不属于事件循环内的概念。这里的 Tick 也与我们之前讲的事件循环的 Tick 不是一回事。它是 Node.js 中的 Tick 概念（可以理解成 Timer 的间隙）。

所以，`process.nextTick()` 回调执行时机是：

1. Node.js 内部一些 callback 执行完毕后；
2. Timeout、Immediate 触发执行的间隙。

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

而且它与微任务的关系是，上面两种情况发生后，若无 Tick 回调，也必定会执行微任务；若有 Tick 回调，则先执行 Tick 回调，然后执行微任务，若期间有新的 Tick 回调插入，那么就继续执行，循环往复，不会跳出该 Tick。

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
// start
// tick1
// tick2
// promise1
// promise2
// tick3
```

## 事件循环（浏览器）

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

## 参考资料

- [javascript 既然是单线程语言，为什么会分主线程和消息线程(event loop)?](https://www.zhihu.com/question/35905242)
- [浏览器动画帧渲染与执行机制探索](https://jelly.jd.com/article/5fda117df708c8014219e056)
- [【事件循环】【前端】事件原理讲解，超级硬核，忍不住转载](https://www.bilibili.com/video/BV1K4411D7Jb/?spm_id_from=333.337.search-card.all.click&vd_source=c4234488bc8659e17c631716b9036762)
- [可视化工具秒懂 JS 事件循环](https://www.jsv9000.app/)
- [事件冒泡是宏任务还是微任务，以及冒泡的触发时机?](https://www.zhihu.com/question/613559688)
