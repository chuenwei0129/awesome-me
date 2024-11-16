---
group:
  title: 2022 🐯
title: 异常处理
toc: content
---

## try-catch

`try-catch` 结构用于处理异常。`try` 块中的代码会尝试执行，如果发生异常，控制会立即转移到对应的 `catch` 块，而不会继续执行 `try` 块中的剩余代码。执行 `catch` 块中的代码后，如果没有显式的中断（比如 `return`、`throw` 等），代码会继续执行 `catch` 块之后的代码。

```js
try {
    console.log("Start of try block");
    throw new Error("Something went wrong!");
    console.log("This line will not be executed");
} catch (error) {
    console.log("Caught an error: " + error.message);
}
console.log("This line will be executed after the catch block");
```

## await

根据 ECMA-262 规范，`await` 关键字用于等待一个 `Promise` 完成。

1. `await v` 会将 `v` 转换为一个 `Promise`。
2. 如果这个 `Promise` 被拒绝（rejected），`await` 会抛出一个错误，就像你在代码中写了 `throw` 一样，这个错误会传播到外层的 `try-catch` 块。

## 捕获 `async` 函数内的异常

捕获同步异常非常简单：

```js
const f = () => {
  throw new Error('sync func error');
};

try {
  f();
} catch (e) {
  console.log(e.message); // sync func error
}
```

异步错误却无法被直接捕获：

```js
const f = async () => {
  throw new Error('async func error');
};

try {
  f();
} catch (error) {
  console.log(error.message); // uncaught
}
```

要捕获 `async` 函数内的异常，可以调用 `.catch`，因为 `async` 函数返回一个 `Promise`：

```js
const f = async () => {
  throw new Error('async func error');
};

f().catch((error) => {
  console.log(error.message); // async func error
});
```

当然也可以在函数体内直接用 `try-catch`：

```js
(async () => {
  try {
    throw new Error('err')
  } catch (e) {
    console.log(e) // caught
  }
})();
```

## 处理包含异步操作的 Promise

Promise 内再包含一个异步操作时，必须使用 `reject` 方式显式抛出异常才能被捕获：

手写过 promise 就知道 error 已经被内部显式 rejected，所以可以 catch 到错误。

```js
new Promise(() => {
  throw new Error('err') // exec error
}).catch((e) => {
  console.log(e)
})
```

下面代码就明显 catch 不到 setTimeout 中 抛出的错误。

```js
new Promise(() => {
  setTimeout(() => {
    throw new Error('err') // uncaught
  }, 0)
}).catch((e) => {
  console.log(e)
})
```

需要做以下修改，才能 catch：

```js
new Promise((_, reject) => {
  setTimeout(() => {
    try {
      throw new Error('uncaught err');
    } catch (error) {
      reject(error);
    }
  }, 0);
}).catch((e) => {
  console.log('e: ', e);
});
```

## `promise.then` 与 `await` 混用下的异步错误处理

```js
const wait = (ms) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

(async () => {
  try {
    const p1 = wait(3000).then(() => {
      console.log('3000');
      throw new Error('err');
    }); // uncaught

    await wait(2000).then(() => {
      console.log('2000');
      throw new Error('err2');
    }); // caught

    console.log('This line will not be executed');
    await p1; // 会不会执行呢？
  } catch (e) {
    console.log(e.message); // err2
  }
})();
```

在这个例子中：

- `wait(3000)` 后的 `.then` 抛出的错误没有被捕获，因为这个 `Promise` 没有被 `await` 等待。
- `await wait(2000)` 抛出的错误被捕获，因为 `await` 会将 `rejected promise` 转变成一个 `throw`，并被 `try-catch` 捕获。
- 因为 `try-catch` 处理异常。`try` 块中的代码会尝试执行，如果发生异常，控制会立即转移到对应的 `catch` 块，而不会继续执行 `try` 块中的剩余代码。所以 `await p1` 并不会执行。

如果换一个场景：

```js
const wait = (ms) => new Promise((res) => setTimeout(res, ms))

;(async () => {
  try {
    const p1 = wait(1000).then(() => {
      throw new Error('err')
    }) // uncaught

    await wait(3000)
    // 当前 context 抛出异常，可以捕获到
    await p1

  } catch (e) {
    console.log(e)
  }
})()
```

浏览器 1s 后会抛出一个未捕获异常，但再过 1s 这个未捕获异常就消失了，变成了捕获的异常。

## DOM 事件监听中的错误处理

DOM 事件监听器内抛出的错误无法被全局捕获（同步异步都一样），必须在函数体内使用 `try-catch` 捕获：

```js
document.querySelector('button').addEventListener('click', async () => {
  try {
    throw new Error('err');
  } catch (e) {
    console.log(e);
  }
});
```

## 全局异常监控

要监控所有异常，可以使用全局事件监听器：

```js
window.addEventListener('error', (event) => {
  console.log('Caught error: ', event.message);
});

window.addEventListener('unhandledrejection', (event) => {
  console.log('Unhandled rejection: ', event.reason);
});
```

- `error` 事件可以监听所有同步和异步的运行时错误，但无法监听语法、接口、资源加载错误。
- `unhandledrejection` 事件可以监听 `Promise` 中抛出的未被 `.catch` 捕获的错误。
