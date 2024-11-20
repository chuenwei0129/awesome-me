## 1. 流（Streaming）

### 1.1. 介绍

Streaming 可以翻译为“流”，它是一种数据传输技术，通过将路由拆分成更小的 chunks，在它们就绪后，逐步将它们从服务器传输到客户端。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/557c278eae1643ff8a8bae6af4749eff~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3200\&h=1236\&s=842460\&e=png\&b=141414)

通过 Streaming，可以避免出现缓慢的数据请求阻塞整个页面的情况，同时也可以让用户查看页面的部分内容并与之交互，而无须等待所有内容加载完成后再向用户展示 UI。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f719b37ef2604242a79f8631daac6a09~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3200\&h=900\&s=604411\&e=png\&b=161616)

Streaming 和 React 组件模型简直是绝配，因为每个组件都可以被视为一个 chunk。

在 Next.js 中有两种实现 Streaming 的方法：

1.  页面级别，使用 `loading.jsx` 文件
2.  特定组件，使用 `<Suspense>`

让我们看看它是如何工作的。

### 1.2. 流式渲染整个页面

在 `app/dashboard`文件夹下，创建一个名为 `loading.jsx`的文件：

```jsx
// /app/dashboard/loading.jsx 
export default function DashboardLoading() {
  return <>Loading dashboard...</>
}
```

再创建一个名为 `page.jsx`的文件：

```javascript
// app/dashboard/page.jsx
async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  return {
    message: 'Hello, Dashboard!',
  }
}
export default async function DashboardPage(props) {
  const { message } = await getData()
  return <h1>{message}</h1>
}
```

效果如下：

![11.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cd31cc361fb418f9657597e6916cc59~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=450\&h=342\&s=7964\&e=gif\&f=9\&b=000000)

其中：

1.  `loading.jsx` 是一个使用 Suspense 的特殊 Next.js 文件，用来创建回退 UI，以便在页面内容加载的时候显示
2.  在这个例子中并没有展现出来，其实如果页面还有其他的静态内容，这些内容会被立刻展现出来，用户可以在动态内容还在加载的时候就与这些内容交互，举个例子：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ad3bc51813464585be88b95f7c542ed9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920\&h=1046\&s=223166\&e=png\&a=1\&b=ffffff)

在这张图中，当右侧内容还在加载的时候，左侧的  Sidebar 其实是可以进行交互的，用户也可以选择跳转离开当前路由。

### 1.3. 流式渲染组件

你也可以使用 React Suspense 流式渲染特定组件。

Suspense 允许你推迟渲染某些内容，直到满足某些条件（例如数据加载完毕）。你可以将动态组件包装在 Suspense 中，然后向其传递一个回退组件，以便在动态组件加载时显示。如果有数据请求缓慢，使用 Suspense 流式渲染该组件，会立即展示页面其余 UI，而不会阻塞整个页面。示例代码：

```javascript
// app/dashboard/page.js
import { Suspense } from 'react'
import { PostFeed, Weather, Recommend } from './Components'
 
export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
      <Suspense fallback={<p>Loading recommend...</p>}>
        <Recommend />
      </Suspense>
    </section>
  )
}
```

效果如下：

![111.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cfd5d8cf5b8b454ba6cc19faa3d562f9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=459\&h=336\&s=21350\&e=gif\&f=7\&b=fefefe)

### 1.4. 流式渲染的背景、原理

了解了 Streaming 是什么，我们来具体了解下 Streaming 出现的背景和原理。我们先从 SSR 开始说起。

使用 SSR，需要经过一系列的步骤，用户才能查看页面并与之交互，具体这些步骤是：

1.  服务端获取给定页面的所有数据
2.  服务端渲染给定页面 HTML
3.  将页面的 HTML、CSS、JavaScript 发送到客户端
4.  用 HTML 和 CSS 生成非交互的用户界面
5.  React 对用户界面进行[水合（hydrate）](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html)，使其可交互

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d7284f31aace4a8f8672a66a0f22c2b9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1600\&h=612\&s=307750\&e=png\&b=161616)

这些步骤是连续且阻塞的，这意味着服务端只能在获取所有数据后渲染 HTML，React 只能下载了所有组件的代码才能进行水合。虽然 SSR 可以尽快向用户展示一个非交互的页面，让用户感觉加载快了。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/690ddb2375fc45d792a46f6c5fb1ae70~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1600\&h=748\&s=373884\&e=png\&b=141414)

但是它仍然可能很慢，因为它在用户显示页面之前，需要在服务端完成所有数据的获取。而 Streaming 通过将路由拆分成更小的 chunks，逐步将它们从服务器传输到客户端。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54ca7bc301cc4acfacada062c19e6cdd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1600\&h=785\&s=475591\&e=png\&b=151515)

这样可以更快的显示页面的某些部分，而无须等待所有数据加载完毕再开始呈现 UI。

前面讲到 Streaming 与 React 组件模型是绝配，因为每个组件都可以被视为一个块。优先级较高的组件后者不依赖数据的组件可以先发送，React 可以更早的开始水合，优先级较低的组件（例如评论、相关产品）可以在获取数据后再发送：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c5796b97681a40708dbc07d2d54ead31~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1600\&h=730\&s=373563\&e=png\&b=171717)

Streaming 可以有效的阻止出现耗时长的数据请求阻塞整个页面加载的情况。因为它可以减少加载[第一个字节所需时间（TTFB）](https://web.dev/articles/ttfb?hl=zh-cn)和[首次内容绘制（FCP）](https://developer.chrome.com/docs/lighthouse/performance/first-contentful-paint/)，它还有助于缩短[可交互时间（TTI）](https://developer.chrome.com/en/docs/lighthouse/performance/interactive/)，尤其在速度慢的设备上。

### 1.5 Streaming 与 SEO

首先，Next.js 会等待 generateMetadata 内的数据请求完毕后，再将 UI 流式传输到客户端，这保证了响应的第一部分就会包含 `<head>` 标签。

其次，因为 Streaming 是服务端渲染的，所以它不会影响 SEO。你可以借助[移动设备适合性测试工具](https://search.google.com/test/mobile-friendly)查看爬虫爬取的序列化的 HTML。（不过这个工具快要废弃了，Chrome 推荐使用 [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/?hl=zh_CN)）

这句话是什么意思呢？第一次接触 Streaming 的时候，我们可能会以为所谓拆分成多个 chunks 就是代码分离，先渲染基本的 HTML，然后在客户端请求多个 chunk 逐渐渲染成最终的样子。然而并不是这样的，我们将刚才的Suspense 的例子改为真实的网络请求后，查看网络请求，你会发现在客户端并没有网络请求产生：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c6d4253b5e3433f96355570677309df~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2916\&h=1178\&s=528796\&e=png\&b=262626)

上图中左边的文章内容其实是通过 fetch 请求获取的：

```javascript
export default async function PostFeed(props) {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  return <h3>{posts[0].body}</h3>
}
```

但你在客户端并不会看到这个服务端请求，因为这是在服务端完成数据请求的，查看 HTML 文件你可以看到文章的内容是在 HTML 中渲染出来的，这也就是为什么说 Streaming 不会影响 SEO。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90bd54494ed9423db036f160a97516b0~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2906\&h=788\&s=524043\&e=png\&b=161616)

那你可能就会好奇那这个 loading 是怎么实现的呢？答案就在于 HTML 是通过 stream 格式进行传输的，查看 dashboard HTML 文件的响应头：

![截屏2023-11-22 上午11.54.35.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/545d79b203df4fd48b25638874dd0eaa~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1810\&h=812\&s=199539\&e=png\&b=292929)

其 `Transfer-Encoding` 标头的值为 `chunked`，表示数据将以一系列分块的形式进行发送。而 HTML 会在收到第一个块的时候就开始渲染，然后不断收到块补充完善。所以假如有 3 个 Suspense，Suspense 中的请求分别耗时 3s、5s、10s，HTML 的 Time 至少会是 10s 以上。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75f88a33872e431b99a2ea181c6e98bd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1826\&h=298\&s=108968\&e=png\&b=292a2b)

## 2. Edge Runtime

### 2.1 介绍

学习 Next.js 的时候，我们可能会接触到 Edge Runtime 和 Node.js Runtime 这两个概念。在 Next.js 中，你可以把运行时（runtime）理解为执行期间一组可用的库、API、和常规功能的集合。在服务端，有两个可以用于渲染应用的运行时：

*   Nodejs Runtime，这是默认的运行时，可以使用 Node.js API 和其生态的包
*   Edge Runtime，基于 [Web API](https://nextjs.org/docs/app/api-reference/edge)

在 Next.js 中，Edge Runtime 是 Nodejs API 的子集，功能上虽有限制，但对应也更轻量，速度也更快，适用于开发小而简单的功能，以低延迟实现动态、个性化的内容。

仅仅是这样的了解是不是还很懵逼？为了讲解 Edge Runtime 这个概念，我们先从 CDN 开始说起。

CDN，全称 Content Delivery Network，中文译为“内容分发网络”，它是由分布于不同地理位置的服务器及数据中心组成的虚拟网络，目的在于以最小的延迟将内容分发给用户。简单的来说，你在杭州请求在美国的网站，因为物理距离太远，响应会有延迟，但如果将网站的内容同步到杭州的服务器上，转而请求杭州服务器上的内容，响应时间就会加快。这组在杭州的用于缓存和传送网络内容的服务器就被称为 “Edge”。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2a3950cc3954c3481d299f66fd5a810~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1536\&h=1409\&s=231537\&e=png\&a=1\&b=f3f3f3)
以前的 Edge 只能存储一些静态的资源，但这不够强大，当你已经是个成熟的 Edge 时，你得学着能够执行代码，当能够执行代码时，CDN 网络就变成了更为强大的边缘网络（Edge Network），在 Edge 发生的计算，也被称为边缘计算，它可以为主要服务器分担一部分处理内容。理解这些概念，也有助于理解 Edge Runtime 这个概念，其术语 Edge 指的正是这种面向即时无服务器计算的环境。

你可能会想到 Serverless。Serverless 很好，但每次请求的时候都会开启不同的实例，并重新初始化环境，尽管底层架构会做很多优化，但依然不能最大限度的复用资源。而对于 Edge Runtime，你可以通过 Vercel Edge functions 或者 Cloudflare workers 或者其他一些工具来部署 Edge Runtime 环境，Edge Runtime 并不运行 Nodejs，而使用 V8 引擎和 Web APIs，这样更加轻量，启动速度更快。多个请求可以使用一个实例，更好的复用资源。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c30eb01fb754f45b86d336f4468fd5c~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1760\&h=1352\&s=844342\&e=png\&b=fcf9f9)
有了 Edge Runtime 的优化再加上 Streaming，这就更快了：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/380bb3c168b845a28c08088e4437317e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1938\&h=1304\&s=384225\&e=png\&b=fdfafa)
总结一下，你可以把 Edge Runtime 理解成一个特殊的运行环境，在这个环境里，只能使用标准的 Web APIs，但对应也会带来更好的性能。至于具体支持哪些，查看 Next.js 提供的 [Edge Runtime Supports](https://nextjs.org/docs/app/api-reference/edge) 文档。

### 2.2 开启

你可以在 Next.js 中为单个路由指定运行时。为此，你需要声明一个名为 `runtime` 的变量并导出它。变量必须是字符串，值为 `'nodejs'` 或者 `'edge'`。举个例子：

```javascript
// app/page.js
export const runtime = 'edge' // 'nodejs' (default) | 'edge'
```

也可以在布局上定义 `runtime`，这会将 Edge Runtime 应用于该布局下的所有路由：

```javascript
// app/layout.js
export const runtime = 'edge' // 'nodejs' (default) | 'edge'
```

如果你没有声明，默认是 Node.js Runtime，所以如果不打算修改，也无须使用该选项。

## 参考链接

1.  <https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming>
2.  <https://edge-runtime.vercel.app/>
3.  <https://www.cdnetworks.com/cn/what-is-a-cdn/>
4.  <https://zhuanlan.zhihu.com/p/510366735>
