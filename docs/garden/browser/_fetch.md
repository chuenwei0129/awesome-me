---
title: Fetch
order: -1
toc: content
group:
  title: WEB API
---

当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject，即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve (如果响应的 HTTP 状态码不在 200 - 299 的范围内，则设置 resolve 返回值的 ok 属性为 false)，仅当网络故障时或请求被阻止时，才会标记为 reject。
fetch 不会发送跨域 cookie，除非你使用了 credentials 的初始化选项。(自 2018 年 8 月以后，默认的 credentials 政策变更为 same-origin。Firefox 也在 61.0b13 版本中进行了修改)

比较下 fetch 与 xhr。一起来看下 fetch 的功能性优势：Service Worker 环境里也能用，相比 xhr 只能运行在渲染进程内同源请求也可以自定义不带 cookie，某些服务不需要 cookie 场景下能少些流量可自定义重定向场景，xhr 只能 follow 自由度更高的 cache 配置可自定义 referrer 注意，上面都是功能上的，就是 xhr 无法通过 polyfill 实现的。关于 cache 的部分：xhr 配置 Cache-Control header 能平替掉 fetch 中的 cache：default、no-store、no-cache 但是 fetch cache 中的这些值是特有的，xhr 做不到：reload：拉取最新资源，并缓存在本地，即使资源未发生变更 (我想不到使用场景，有知道的同学感谢评论区告知我) force-cache：本地资源只要存在就直接使用，即使已经过期了 only-if-cached：本地资源只要存在就直接使用，即使已经过期，不存在则抛错 ERR_CACHE_MISS

fetch 不支持上传进度，但是 readable stream 支持下载进度，xhr 相反
cr 的 fetch 支持 readble Steam 做 body 了，所以也可以看上传进度了，就是准不准不太好说

流是一个很常见的概念，就是允许我们一段一段地接受和处理数据。相对于获取完整的一大块数据再进行后续处理，流只要一段一段地接收并实时处理数据，不需要等所有数据都接收完成再进行处理，缩短了整个操作的耗费时间。流在接收和处理的时候，不需要占用一大块的内存来进行数据的存储，可以在处理后释放掉已经处理好的数据，较少的内存占用是它的特点。此外流还有管道的概念，我们可以封装一些类似中间件的中间流，用管道将各个流连接起来，在管道的末端就能拿到处理后的数据。

这些中间件就是既可以写，又可以读的流，Input 进来的是可以读的流，Output 出来的是一个可以写的流。这样就引申出来 3 个名词：

ReadableStream 可读流
WritableStream 可写流
TransformStream 转换流 (可读可写流)

这样，就像是一个完整的数据处理流水线。

现在 Streams API 已经在浏览器上逐步实现，能用上流处理的 API 想必也会越来越多，Fetch API 就是最早一批使用 Stream API 的。

前端在引入 fetch 时已经做好了跟其它前端内建类型的兼容，这也是 axios 底层的 XMLHttpRequest 不可能支持的。当然，axios 可以在封装的时候加入支持，但 fetch 的支持是原生的。这包括为 fetch 引入的 Header、Request、Response 类型，也包括 fetch 之外的内建类型如 URL、Blob、BufferArray、FormData、URLSearchParams、ReadableStream、WritableStream 等。这些内建类型还有机会继续演化，fetch 可能会跟着进行兼容性演化。前端的 axios 如同被智子锁定了科技一样，fetch 支持的流式 (stream) 请求和响应都没办法做。理论上 axios 最终可以在不改变 API 的前提下切换到 fetch 上面去，但如果 axios 变成了一个 fetch 的封装，那等 Node 有了 fetch 之后为什么不直接用 fetch 呢？




关于 fetch 的 keepalive MDN 是这么说的：The keepalive option can be used to allow the request to outlive the page。可能这种情况你没有遇到过，但是如果在页面发起一个 POST (或者说，带有请求体，或需要 preflight 的) 请求时立即关闭或刷新页面，这个进行了一半的请求会停止。这是因为页面已经没了，这个进行了一半的请求不再知道应当如何完成自己。而这个参数是在说，即使页面已经不在了，这个请求依然需要完成，因此浏览器会延长它的生存期。曾经开发者为了完成此类请求必须设法延长页面的生存期，而有了这类机制之后就可以只是延长这个请求而非整个页面的生存期了。所以为什么也叫 keepalive 呢，因为 “即使页面死了，这个请求也必须活下来”。

---
group:
  title: 待定
  order: 0
---

# Promise

## 1。输出是什么？

```javascript
function Son() {
  console.log('child render!');
  return <div>Son</div>;
}


function Parent(props) {
  const [count, setCount] = React.useState(0);

  return (
    <div onClick={() => {setCount(count + 1)}}>
      count:{count}
      {props.children}
    </div>
  );
}


function App() {
  return (
    <Parent>
      <Son/>
    </Parent>
  );
}

const rootEl = document.querySelector("#root");
ReactDOM.render(<App/>, rootEl);
```

<details><summary><b>答案</b></summary>
<p>

## 答案

在函数内部，我们首先通过 `var` 关键字声明了 `name` 变量。这意味着变量被提升了 (内存空间在创建阶段就被设置好了)，直到程序运行到定义变量位置之前默认值都是 `undefined`。因为当我们打印 `name` 变量时还没有执行到定义变量的位置，因此变量的值保持为 `undefined`。

通过 `let` 和 `const` 关键字声明的变量也会提升，但是和 `var` 不同，它们不会被<i>初始化</i>。在我们声明 (初始化) 之前是不能访问它们的。这个行为被称之为暂时性死区。当我们试图在声明之前访问它们时，JavaScript 将会抛出一个 `ReferenceError` 错误。

</p>
</details>

---

###### 2。输出是什么？

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}
```

- A：`0 1 2` 和 `0 1 2`
- B：`0 1 2` 和 `3 3 3`
- C：`3 3 3` 和 `0 1 2`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

由于 JavaScript 的事件循环，`setTimeout` 回调会在*遍历结束后*才执行。因为在第一个遍历中遍历 `i` 是通过 `var` 关键字声明的，所以这个值是全局作用域下的。在遍历过程中，我们通过一元操作符 `++` 来每次递增 `i` 的值。当 `setTimeout` 回调执行的时候，`i` 的值等于 3。

在第二个遍历中，遍历 `i` 是通过 `let` 关键字声明的：通过 `let` 和 `const` 关键字声明的变量是拥有块级作用域 (指的是任何在 {} 中的内容)。在每次的遍历过程中，`i` 都有一个新值，并且每个值都在循环内的作用域中。

</p>
</details>

---
