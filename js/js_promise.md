# JavaScript 基础知识梳理(六)<!-- omit in toc -->

- [回调](#回调)
- [Promise](#promise)
	- [Promise.all](#promiseall)
	- [Promise.finally](#promisefinally)
	- [Promise.resolve](#promiseresolve)
	- [Promise.race](#promiserace)
	- [微任务（Microtask）](#微任务microtask)
- [co + Generator](#co--generator)

## 回调

在程序设计中，这种设计叫做回调，即：我们现在开始执行的行为，但它们会在稍后完成。例如，`setTimeout` 函数就是一个这样的函数。

```js
function loadScript(src) {
  // 创建一个 <script> 标签，并将其附加到页面
  // 这将使得具有给定 src 的脚本开始加载，并在加载完成后运行
  let script = document.createElement('script');
  script.src = src;
  document.head.append(script);
}
```

它将带有给定 `src` 的新动态创建的标签 `<script src="…">` 附加到文档中。浏览器将自动开始加载它，并在加载完成后执行。

我们可以像这样使用这个函数：

```js
// 在给定路径下加载并执行脚本
loadScript('/my/script.js');
```

脚本是“异步”调用的，因为它从现在开始加载，但是在这个加载函数执行完成后才运行。

如果在 `loadScript(…)` 下面有任何其他代码，它们不会等到脚本加载完成才执行。

```js
loadScript('/my/script.js');
// loadScript 下面的代码
// 不会等到脚本加载完成才执行
// ...
```

假设我们需要在新脚本加载后立即使用它。它声明了新函数，我们想运行它们

但如果我们在 `loadScript(…)` 调用后立即执行此操作，这将不会有效。

```js
loadScript('/my/script.js'); // 这个脚本有 "function newFunction() {…}"

newFunction(); // 没有这个函数！
```

`loadScript` 函数并没有提供跟踪加载完成的方法。

让我们添加一个 `callback` 函数作为 `loadScript` 的第二个参数，该函数应在脚本加载完成时执行：

```js
function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(script);

  document.head.append(script);
}
```

现在，如果我们想调用该脚本中的新函数，我们应该将其写在回调函数中：

```js
loadScript('/my/script.js', function() {
  // 在脚本加载完成后，回调函数才会执行
  newFunction(); // 现在它工作了
  ...
});
```

这是我们的想法：第二个参数是一个函数（通常是匿名函数），该函数会在行为（action）完成时运行

这被称为“基于回调”的异步编程风格。异步执行某项功能的函数应该提供一个 `callback` 参数用于在相应事件完成时调用。（译注：上面这个例子中的相应事件是指脚本加载）

这里我们在 `loadScript` 中就是这么做的，但当然这是一种通用方法。

## Promise

> TIP

```js
const PENDING = 'PENDING',
	RESOLVED = 'RESOLVED',
	REJECTED = 'REJECTED'

// 处理 then 返回值 promise2 与 x 的关系, x 需要通过 promise2 resolve 下去
const resolvePromise = (promise2, x, resolve, reject) => {
	let called
	if (x === promise2) {
		return reject(
			new TypeError('Chaining cycle detected for promise #<Promise>')
		)
	}
	// 处理值透传
	if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
		// 取值会出错 defineProperty
		try {
			let then = x.then
			// 判断 x 是否是 promise
			if (typeof then === 'function') {
				then.call(
					x,
					(y) => {
						if (called) return
						called = true
						resolvePromise(promise2, y, resolve, reject)
					},
					(r) => {
						if (called) return
						called = true
						reject(r)
					}
				)
			} else {
				// x 不是 promise 只是有 then 属性的普通对象
				resolve(x)
			}
		} catch (error) {
			if (called) return
			called = true
			reject(error)
		}
	} else {
		// x 为普通值
		resolve(x)
	}
}

class Promise {
	constructor(executor) {
		this.status = PENDING
		this.value = null
		this.reason = null
		this.resolvedCallbacks = []
		this.rejectedCallbacks = []

		const resolve = (value) => {
			if (this.status === PENDING) {
				this.status = RESOLVED
				this.value = value
				this.resolvedCallbacks.forEach((fn) => fn())
			}
		}

		const reject = (reason) => {
			if (this.status === PENDING) {
				this.status = REJECTED
				this.reason = reason
				this.rejectedCallbacks.forEach((fn) => fn())
			}
		}

		try {
			executor(resolve, reject)
		} catch (error) {
			reject(error)
		}
	}

	then(onResolved, onRejected) {
		// 此处对应用法 promise.then().then().then(data => data)
		onResolved = typeof onResolved === 'function' ? onResolved : (data) => data
		onRejected =
			typeof onRejected === 'function'
				? onRejected
				: (err) => {
						throw err
				  }

		let promise2 = new Promise((resolve, reject) => {
			// 写在 executor 里立即执行
			if (this.status === RESOLVED) {
				// 处理 promise2 未定义
				setTimeout(() => {
					try {
						let x = onResolved(this.value)
						resolvePromise(promise2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				}, 0)
			}
			if (this.status === REJECTED) {
				setTimeout(() => {
					try {
						let x = onRejected(this.reason)
						resolvePromise(promise2, x, resolve, reject)
					} catch (error) {
						reject(error)
					}
				}, 0)
			}
			if (this.status === PENDING) {
				this.resolvedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onResolved(this.value)
							resolvePromise(promise2, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					}, 0)
				})
				this.rejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onRejected(this.reason)
							resolvePromise(promise2, x, resolve, reject)
						} catch (error) {
							reject(error)
						}
					}, 0)
				})
			}
		})

		return promise2
	}
}

// 测试代码
Promise.defer = Promise.deferred = function () {
	let dfd = {}
	dfd.promise = new Promise((resolve, reject) => {
		dfd.resolve = resolve
		dfd.reject = reject
	})
	return dfd
}

module.exports = Promise
```

```sh
promises-aplus-tests Promise.js
```

### Promise.all

```js
const promise1 = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('我是 promise1')
		}, 1000)
	})
}

const promise2 = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('我是 promise2')
		}, 0)
	})
}

const promise3 = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject('我是出错的情况')
		}, 0)
	})
}

const arr = [1, 2, 3, 4, promise1(), promise2(), promise3(), 5, 6, 7, 8]

Promise.all(arr)
	.then((data) => {
		console.log('Promise.all', data)
	})
	.catch((err) => {
		console.log(err)
	})

Promise.myAll = (arr) => {
	return new Promise((resolve, reject) => {
		// 需要考虑 传入空数组情况 直接 resolve 成功
		if (arr.length === 0) {
			return resolve(arr)
		}

		let res = []
		let index = 0
		const resolveData = (i, data) => {
			// 都成功才能 resolve, res.length === arr.length 异步时此时 data 为 undefined，无法判断结束
			res[i] = data
			if (++index === arr.length) {
				resolve(res)
			}
		}

		for (let i = 0; i < arr.length; i++) {
			const val = arr[i]
			if (
				(typeof val === 'object' && val !== null) ||
				typeof val === 'function'
			) {
				if (typeof val.then === 'function') {
					val.then((data) => {
						// res[i] = data 这里可以写个方法统一处理
						// 给个计数器，函数执行了计数器加一
						resolveData(i, data)
					}, reject)
				} else {
					// res[i] = val
					resolveData(i, val)
				}
			} else {
				// res[i] = val
				resolveData(i, val)
			}
		}
	})
}

Promise.myAll(arr)
	.then((data) => {
		console.log('Promise.myAll', data)
	})
	.catch((err) => {
		console.log(err)
	})

// 需要考虑 传入空数组情况 直接 resolve 成功
Promise.all([]).then((data) => {
	console.log('hello')
})

Promise.myAll([]).then((data) => {
	console.log('world')
})
```

### Promise.finally

```js
const promise = (timeout, data) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(data)
		}, timeout)
	})
}

promise(1000, 1000)
	.finally(() => {
		// 1. finally 回调函数中不接收任何参数，上层数据透传到了下一层 then 中
		// 2. finally 返回一个 promise，返回其他值会被忽略
		// 3. 回调函数的返回值无论是什么都会成为成功的 promise
		console.log('hello world1') // 异步
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve(2000)
			}, 3000)
		})
	})
	.then((data) => {
		console.log(data)
	})

Promise.prototype._finally = function (cb) {
	// 注意点1，为了 this 无法用箭头函数
	// 注意点2，cb 是无论成功失败都执行
	// 注意点2，cb 可能返回一个 promise，透传的数据需要等待 promise 执行完在传出去，需要 return
	return this.then(
		(data) => Promise.resolve(cb()).then(() => data),
		(err) =>
			Promise.resolve(cb()).then(() => {
				throw err
			})
	)
}

promise(2000, 2000)
	._finally(() => {
		console.log('hello world2')
	})
	.then((data) => {
		console.log(data)
	})
```

### Promise.resolve

```js
const promise1 = (function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('我是 promise1，我已经 resolve 了')
		}, 1000)
	})
})()

// promise 实例
console.log(Promise.resolve(promise1) === promise1) // true

// 即 鸭子类型判断符合 isPromise 的对象
const thenable = {
	then(resolve) {
		resolve('我是thenable对象')
	},
}
//  普通类型
Promise.resolve(1).then((data) => {
	console.log(data)
})

Promise.resolve(thenable).then((data) => {
	console.log(data)
})

// 三种情况
// 已经 resolved 的 实例 返回本身
// thenable 对象调用它自身的 resolve
// 其余 resolve 包一下
Promise.myResolve = (promise) => {
	if (promise instanceof Promise) return promise
	return new Promise((resolve) => {
		if (promise && promise.then && typeof promise.then === 'function') {
			// 传入 promise 的 resolve 方法,相当于 resolve 执行了
			promise.then(resolve)
		} else {
			resolve(promise)
		}
	})
}

console.log(Promise.myResolve(promise1) === promise1) // true

Promise.myResolve(thenable).then((data) => {
	console.log(data)
})

Promise.myResolve(1).then((data) => {
	console.log(data)
})
```

### Promise.race

```js
const promise1 = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject('我是 promise1')
		}, 1000)
	})
}

const promise2 = function () {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			reject('我是 promise2')
		}, 0)
	})
}

const arr = [promise1(), promise2()]

Promise.race(arr)
	.then((data) => {
		console.log(data)
	})
	.catch((err) => {
		console.log(err)
	})

Promise.race([]).then((data) => {
	console.log('我执行了')
})

// 注意点 1.空数组 直接 return
// 错误处理
// 不按顺序来,哪个先完成哪个 return 与 all 不同,返回一个promise

Promise.myRace = function (arr) {
	return new Promise((resolve, reject) => {
		if (arr.length === 0) return

		arr.forEach((item) => {
			Promise.resolve(item).then((data) => {
				resolve(data)
				return
			}, reject)
		})
	})
}

Promise.myRace(arr)
	.then((data) => {
		console.log(data)
	})
	.catch((err) => {
		console.log(err)
	})

Promise.myRace([]).then((data) => {
	console.log('我执行了')
})
```

### 微任务（Microtask）

## co + Generator

```js
function* gen(data0) {
	console.log(data0)
	const data1 = yield '1'
	console.log(data1)
	const data2 = yield '2'
	console.log(data2)
	const data3 = yield '3'
	console.log(data3)
	return '4'
}

const it = gen('0') // 只是生成 iterator 内部 log 不执行

console.log(it.next()) // '1'
console.log(it.next('data1')) '2'
console.log(it.next('data2')) '3'
console.log(it.next('data3')) '4'

// for of 消费的 生成器 需要定义在 symbol.iterator函数上 {next() {return value: done }} index 原型链上的对象具有该方法也可）

// yield *
//   yield * 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口

// return(), throw(), next()

// Generator 函数可以不用yield表达式，这时就变成了一个单纯的暂缓执行函数

const arrLike = {
	[Symbol.iterator]() {
		let index = 0
		return {
			next: () => {
				return {
					value: this[index],
					done: index++ === this.length,
				}
			},
		}
	},
	0: 'javascript',
	1: 'vue',
	2: 'react',
	3: 'webpack',
	length: 4,
}

console.log(...arrLike)

const _arr = {
	*[Symbol.iterator]() {
		yield* ['javascript', 'react', 'vue', 'webpack']
	},
	length: 4,
}

console.log(..._arr)

const fs = require('fs').promises
const path = require('path')

fs.readFile('./Toys/filename.md')
	.then((data) => {
		return fs.readFile(path.join(data.toString().trimEnd()))
	})
	.then((data) => {
		console.log('promise 串行读取文件', data)
	})

// 第二次读取依赖第一次读取的结果

// 使用 Generator 读取文件

function* readFile(file1Name) {
	const file2Name = yield fs.readFile(file1Name)
	const fileData = yield fs.readFile(file2Name.toString().trimEnd())
	return fileData
}

function co(it) {
	return new Promise((resolve, reject) => {
		const next = (data) => {
			let { value, done } = it.next(data)
			if (!done) {
				Promise.resolve(value).then((data) => next(data), reject)
			} else {
				resolve(data)
			}
		}
		next()
	})
}

const readAsync = readFile('./Toys/filename.md')

co(readAsync).then((data) => {
	console.log(data)
})
```

Generator 组合
Generator 组合（composition）是 generator 的一个特殊功能，它允许透明地（transparently）将 generator 彼此“嵌入（embed）”到一起。

例如，我们有一个生成数字序列的函数：

function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}
现在，我们想重用它来生成一个更复杂的序列：

首先是数字 0..9（字符代码为 48…57），
接下来是大写字母 A..Z（字符代码为 65…90）
接下来是小写字母 a...z（字符代码为 97…122）
我们可以对这个序列进行应用，例如，我们可以从这个序列中选择字符来创建密码（也可以添加语法字符），但让我们先生成它。

在常规函数中，要合并其他多个函数的结果，我们需要调用它们，存储它们的结果，最后再将它们合并到一起。

对于 generator 而言，我们可以使用 yield* 这个特殊的语法来将一个 generator “嵌入”（组合）到另一个 generator 中：

组合的 generator 的例子：

function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generatePasswordCodes() {

  // 0..9
  yield* generateSequence(48, 57);

  // A..Z
  yield* generateSequence(65, 90);

  // a..z
  yield* generateSequence(97, 122);

}

let str = '';

for(let code of generatePasswordCodes()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
yield* 指令将执行 委托 给另一个 generator。这个术语意味着 yield* gen 在 generator gen 上进行迭代，并将其产出（yield）的值透明地（transparently）转发到外部。就好像这些值就是由外部的 generator yield 的一样。

执行结果与我们内联嵌套 generator 中的代码获得的结果相同：

function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

function* generateAlphaNum() {

  // yield* generateSequence(48, 57);
  for (let i = 48; i <= 57; i++) yield i;

  // yield* generateSequence(65, 90);
  for (let i = 65; i <= 90; i++) yield i;

  // yield* generateSequence(97, 122);
  for (let i = 97; i <= 122; i++) yield i;

}

let str = '';

for(let code of generateAlphaNum()) {
  str += String.fromCharCode(code);
}

alert(str); // 0..9A..Za..z
Generator 组合（composition）是将一个 generator 流插入到另一个 generator 流的自然的方式。它不需要使用额外的内存来存储中间结果。

异步可迭代对象
当值是以异步的形式出现时，例如在 setTimeout 或者另一种延迟之后，就需要异步迭代。

最常见的场景是，对象需要发送一个网络请求以传递下一个值，稍后我们将看到一个它的真实示例。

要使对象异步迭代：

使用 Symbol.asyncIterator 取代 Symbol.iterator。
next() 方法应该返回一个 promise（带有下一个值，并且状态为 fulfilled）。
关键字 async 可以实现这一点，我们可以简单地使用 async next()。
我们应该使用 for await (let item of iterable) 循环来迭代这样的对象。
注意关键字 await。
作为开始的示例，让我们创建一个可迭代的 range 对象，与前面的那个类似，不过现在它将异步地每秒返回一个值。

我们需要做的就是对上面代码中的部分代码进行替换：

let range = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() { // (1)
    return {
      current: this.from,
      last: this.to,

      async next() { // (2)

        // 注意：我们可以在 async next 内部使用 "await"
        await new Promise(resolve => setTimeout(resolve, 1000)); // (3)

        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      }
    };
  }
};

(async () => {

  for await (let value of range) { // (4)
    alert(value); // 1,2,3,4,5
  }

})()
正如我们所看到的，其结构与常规的 iterator 类似:

为了使一个对象可以异步迭代，它必须具有方法 Symbol.asyncIterator (1)。
这个方法必须返回一个带有 next() 方法的对象，next() 方法会返回一个 promise (2)。
这个 next() 方法可以不是 async 的，它可以是一个返回值是一个 promise 的常规的方法，但是使用 async 关键字可以允许我们在方法内部使用 await，所以会更加方便。这里我们只是用于延迟 1 秒的操作 (3)。
我们使用 for await(let value of range) (4) 来进行迭代，也就是在 for 后面添加 await。它会调用一次 range[Symbol.asyncIterator]() 方法一次，然后调用它的 next() 方法获取值。
这是一个对比 Iterator 和异步 iterator 之间差异的表格：

Iterator	异步 iterator
提供 iterator 的对象方法	Symbol.iterator	Symbol.asyncIterator
next() 返回的值是	任意值	Promise
要进行循环，使用	for..of	for await..of
Spread 语法 ... 无法异步工作
需要常规的同步 iterator 的功能，无法与异步 iterator 一起使用。

例如，spread 语法无法工作：

alert( [...range] ); // Error, no Symbol.iterator
这很正常，因为它期望找到 Symbol.iterator，而不是 Symbol.asyncIterator。

for..of 的情况和这个一样：没有 await 关键字时，则期望找到的是 Symbol.iterator。

回顾 generator
现在，让我们回顾一下 generator，它使我们能够写出更短的迭代代码。在大多数时候，当我们想要创建一个可迭代对象时，我们会使用 generator。

简单起见，这里省略了一些解释，即 generator 是“生成（yield）值的函数”。关于此的详细说明请见 Generator 一章。

Generator 是标有 function*（注意星号）的函数，它使用 yield 来生成值，并且我们可以使用 for..of 循环来遍历它们。

下面这例子生成了从 start 到 end 的一系列值：

function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for(let value of generateSequence(1, 5)) {
  alert(value); // 1，然后 2，然后 3，然后 4，然后 5
}
正如我们所知道的，要使一个对象可迭代，我们需要给它添加 Symbol.iterator。

let range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return <带有 next 方法的对象，以使对象 range 可迭代>
  }
}
对于 Symbol.iterator 来说，一个通常的做法是返回一个 generator，这样可以使代码更短，如下所示：

let range = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() { // [Symbol.iterator]: function*() 的一种简写
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};

for(let value of range) {
  alert(value); // 1，然后 2，然后 3，然后 4，然后 5
}
如果你想了解更多详细内容，请阅读 Generator 一章。

在常规的 generator 中，我们无法使用 await。所有的值都必须按照 for..of 构造的要求同步地出现。

如果我们想要异步地生成值该怎么办？例如，对于来自网络请求的值。

让我们再回到异步 generator，来使这个需求成为可能。

异步 generator (finally)
对于大多数的实际应用程序，当我们想创建一个异步生成一系列值的对象时，我们都可以使用异步 generator。

语法很简单：在 function* 前面加上 async。这即可使 generator 变为异步的。

然后使用 for await (...) 来遍历它，像这样：

async function* generateSequence(start, end) {

  for (let i = start; i <= end; i++) {

    // 哇，可以使用 await 了！
    await new Promise(resolve => setTimeout(resolve, 1000));

    yield i;
  }

}

(async () => {

  let generator = generateSequence(1, 5);
  for await (let value of generator) {
    alert(value); // 1，然后 2，然后 3，然后 4，然后 5（在每个 alert 之间有延迟）
  }

})();
因为此 generator 是异步的，所以我们可以在其内部使用 await，依赖于 promise，执行网络请求等任务。

引擎盖下的差异
如果你还记得我们在前面章节中所讲的关于 generator 的细节知识，那你应该知道，从技术上讲，异步 generator 和常规的 generator 在内部是有区别的。

对于异步 generator，generatr.next() 方法是异步的，它返回 promise。

在一个常规的 generator 中，我们使用 result = generator.next() 来获得值。但在一个异步 generator 中，我们应该添加 await 关键字，像这样：

result = await generator.next(); // result = {value: ..., done: true/false}
这就是为什么异步 generator 可以与 for await...of 一起工作。

异步的可迭代对象 range
常规的 generator 可用作 Symbol.iterator 以使迭代代码更短。

与之类似，异步 generator 可用作 Symbol.asyncIterator 来实现异步迭代。

例如，我们可以通过将同步的 Symbol.iterator 替换为异步的 Symbol.asyncIterator，来使对象 range 异步地生成值，每秒生成一个：

let range = {
  from: 1,
  to: 5,

  // 这一行等价于 [Symbol.asyncIterator]: async function*() {
  async *[Symbol.asyncIterator]() {
    for(let value = this.from; value <= this.to; value++) {

      // 在 value 之间暂停一会儿，等待一些东西
      await new Promise(resolve => setTimeout(resolve, 1000));

      yield value;
    }
  }
};

(async () => {

  for await (let value of range) {
    alert(value); // 1，然后 2，然后 3，然后 4，然后 5
  }

})();
现在，value 之间的延迟为 1 秒。

请注意：
从技术上讲，我们可以把 Symbol.iterator 和 Symbol.asyncIterator 都添加到对象中，因此它既可以是同步的（for..of）也可以是异步的（for await..of）可迭代对象。

但是实际上，这将是一件很奇怪的事情。

常规的 iterator 和 generator 可以很好地处理那些不需要花费时间来生成的的数据。

当我们期望异步地，有延迟地获取数据时，可以使用它们的异步版本，并且使用 for await..of 替代 for..of。

异步 iterator 与常规 iterator 在语法上的区别：

Iterable	异步 Iterable
提供 iterator 的对象方法	Symbol.iterator	Symbol.asyncIterator
next() 返回的值是	{value:…, done: true/false}	resolve 成 {value:…, done: true/false} 的 Promise
异步 generator 与常规 generator 在语法上的区别：

Generator	异步 generator
声明方式	function*	async function*
next() 返回的值是	{value:…, done: true/false}	resolve 成 {value:…, done: true/false} 的 Promise