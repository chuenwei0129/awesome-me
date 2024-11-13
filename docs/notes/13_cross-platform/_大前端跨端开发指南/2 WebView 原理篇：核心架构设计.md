##  H5 和小程序架构设计

WebView 是跨端领域比较主流的方式，其本质就是在移动端系统中，内嵌的可以用来展示 Web 应用的组件。这让移动端可以像打开浏览器一样打开页面，被称为 Hybrid （混合）模式。


在 WebView 模式下，主流的技术落地有两种：一种是嵌入 H5 的混合 App，另外一种是小程序。这两种方式在**渲染流程和通信流程**上有一定区别。

在渲染流程中，WebView H5 方案类似于传统的 Web 应用，先由 Native 打开一个 WebView 容器，WebView 就像浏览器一样，打开 WebView 对应的 URL 地址，然后进行请求资源、加载数据、绘制页面，最终页面呈现在我们眼前。

但是，小程序的 WebView 方案有所不同。小程序采用双线程架构，分为**逻辑层**和**渲染层**。首先也是 Native 打开一个 WebView 页面，渲染层加载 WXML 和 WXSS 编译后的文件，同时逻辑层用于逻辑处理，比如触发网络请求、setData 更新等等。接下来是请求资源，请求到数据之后，数据先通过逻辑层传递给 Native，然后通过 Native 把数据传递给渲染层 WebView，再进行渲染。

WebView H5 的通信流程也很简单，由 DOM 触发事件，像 Vue 或者 React 构建的 Web 应用会响应事件，然后通过数据驱动，更新视图。

但是在小程序中，触发的事件首先需要传递给 Native，再传递给逻辑层，逻辑层处理事件，再把处理好的数据传递给 Native，最后 Native 传递给渲染层，由渲染层负责渲染。

整个架构模型如下所示：

![WechatIMG2810.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f4139d2c4e14be1a5ad95e7151d9d4f~tplv-k3u1fbpfcp-zoom-1.image)

H5 模式我们再熟悉不过了，所以接下来我们重点介绍小程序逻辑层和渲染层的架构设计。要声明一点，这里的小程序不限于微信小程序，而是市面上小程序普遍的实现方案，包括支付宝小程序、京东小程序、美团小程序等。

## 逻辑层处理

### 逻辑层到底长什么样子？

所谓小程序的逻辑层，指的就是我们在小程序 js 文件中写的业务逻辑。它和单页面应用 SPA 类似，不过有一定的差异。我们先来回顾一下 SPA 应用，以 React 框架为例，JSX 语法能够形象地表述出页面的结构，但其本质仍是 JS。页面即组件，组件本质上是函数，如果不做代码分割，所有的代码都会打包成一个 js 文件。

这一点小程序也比较像，如果想在小程序中开发一个页面，那么首先在 app.json 中注册页面。

````js
{
  "pages":[
    "pages/index/index", 
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
  },
}
````

如上在 pages 属性下加入 `pages/index/index` ，就注册了第一个页面，然后我们在项目结构中创建对应的文件，如下所示：

![WechatIMG11015.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3655b6e008d84ef287fea24a4ee6d3c0~tplv-k3u1fbpfcp-zoom-1.image)

接下来我们在 index.js 中这么写：

````js
Page({
  data:{
    message:'hello,world',
    context:['小程序'，'React Native']
  },
  onLoad(){
    console.log('===小程序页面 onLoad 执行==>')
    console.log(window) // undefined
    
  },
  onReady() {
    console.log('===小程序页面 onReady 执行==>')
  },
  handleClick(){
    console.log('点击事件')
  }
})
````

在 WXML 中这么写：

````js
<view bind:tap="handleClick" >hello,world</view>
````

这样就能在页面呈现出`hello,world`。那么，一个小程序的页面就创建出来了，但却暴露出了几个问题：

-   index 中的 Page 函数又是怎么来的？我们都知道小程序中存在很多特有的函数，比如 Page、Component、Behaivor 等。它们是从哪里来，又做了些什么呢？
-   在 index.js 中的代码是如何执行的？message 属性都是怎么通过 JS 传到了 WXML 中，并渲染到页面上的。

我们带着上面两个问题来分析一下。首先，在浏览器环境下是不存在 Page 等函数的，并且如上在 onLoad 函数中，打印 window 对象为 undefined，这就说明逻辑层的 runtime 运行时并不是浏览器环境提供的。

小程序会有很多页面，一般情况下主包内容会被打包到一起，形成一个 js 文件，我们先称之为 `app-service.js`。这样一来，像 WebView 打开 `pages/index/index` 页面，逻辑层就会执行 `app-service.js` 中对应的代码，大致如下实现方式：

````js
/* 存放对应的页面 */
self.source_code.pages = [
   {
       name:'pages/index/index', //对应的页面路径
       source:{ // js 逻辑资源
           jsCode:function(exports, require, module){
               module.exports = function(wx,App,Page,Component,getApp,global){
                   // 编译后小程序业务代码，这样就可以获取 wx,Page,Component 属性。
                   // 业务代码
               }
           },
           jsJson:{...}
       }
   },
   {
       name:'/app' // 小程序 app 文件
       source:{
           jsCode:function(exports, require, module){
                module.exports = function(wx,App,Page,Component,getApp,global){
                   // 业务代码 
                   App({})
                }
           },
       }
   },
];
/* 存放对应的组件 */
self.source_code.components = []
/* 存放正常的 js 文件 */
self.source_code.modules = []
````

我们大致实现了小程序逻辑层编译之后的代码，可以看到对于页面（Page）层面的结构存放到了一个数组 pages 里。比如 `pages/index/index`：

-   对于 index.js 里面的代码，可以用 jsCode 函数包装；
-   对于组件（Component）层面的文件放在 components 数组里面；
-   对于一些其他的 js，可以用 modules 数组来保存。

在小程序中，像是页面文件 `pages/index/index.js`，暴露出一个方法：

````js
exports.a = function(){}
Page({ ... })
````

如果在另外的一个组件文件中引入 a：

````js
const index = require('./index')
console.log(index.a) //  function a 
````

这会让 index 页面渲染不出来，原因是此时的 index.js 是按照 module 维度编译的，而不是按照 page 维度编译的。

我们都知道，在小程序中有 app.js ，可以对整个小程序进行整体处理和监控，比如 onLaunch （在小程序初始化过程中，会执行 onLaunch 生命周期）。这个文件的代码在小程序初始化阶段就会执行。

jsCode 函数有点像 common 规范里面的 nodejs 文件处理，传入 exports、require、module 三个变量。如果我们在 index.js 文件中通过 require 引入其他的文件：

````js
const a = require('/a.js')
````

如上通过 require 引入 a.js ，那么本质上就是调用 jsCode 函数的第二个参数 require。明白了逻辑层的本质之后，我们来看一下是什么驱动了逻辑层。

### 什么驱动逻辑层？

逻辑层的运行离不开 js 引擎，以 JavascriptCore 为例，本质上就是执行 js 代码，也就是我们在小程序写的业务代码，因为此时的运行环境并不是浏览器内核提供的，这也就说明为什么我们不能在小程序中使用 DOM 相关的 API 了。

而 js 引擎是通过客户端宿主环境运行的，比如微信小程序，那么运行小程序的宿主环境就是微信客户端。

<!-- 客户端 -> js 引擎 -> 小程序逻辑层代码 -->

#### 小程序基础库

整个逻辑层，除了写在业务层的代码，还有小程序在逻辑层注入的基础库，比如在微信中的 wx 对象，以及上面提到的 Page、Component、Behaivor 等方法。那我们来总结一下小程序的基础库做了些什么：

-   小程序基础库负责驱动整个业务逻辑 js 的执行、运行，并维持整个小程序应用；
-   提供小程序运行时所需的各种 API。

#### 多页面架构

小程序模式采用了多页面架构，一个小程序可以存在多个 WebView 页面，可以对比 SPA 单页面应用来理解。

在单页面应用中，可以通过 router 控制路由的状态，如果要改变路由跳转到新页面，本质上还是要通过路由跳转，先找到对应的路由组件，再卸载掉之前组件，然后渲染新的组件，这种体验非常不好。而我们看到，很多原生 App 有很好的用户体验，比如 A 页面跳转到 B 页面，那么在 B 页面可以通过返回手势丝滑地回到 A 页面，这是单页面 SPA 应用难以做到的。

小程序多页面架构这一点的用户体验更趋近于原生，因为小程序存在多个 WebView，页面跳转时就会重新创建一个 WebView。这样一来，两个 WebView 页面会共存到小程应用中，返回时就会有原生应用中的丝滑效果了。

但是如果小程序页面一直跳转，每一个跳转的新页面都创建一个 WebView，会造成内存越来越大，内存达到一定阈值就会造成应用崩溃。为了解决这个问题，小程序加入了一个页面栈的概念，也就是在整个应用中，最多存在一定数量的 WebView 页面。以微信小程序为例子，页面栈最大数量为 10 个，所以此时需要小程序的开发者控制页面栈的层数。

小程序常用的路由跳转方法有：navigateTo、redirectTo、navigateBack，我们一一来看。

-   navigateTo：打开新页面，新页面入栈。
-   redirectTo：页面重定向，当前页面出栈，而后新页面入栈。
-   navigateBack：页面回退，页面一直出栈，到达指定页面停止。

![WechatIMG2806.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f70981340034d8d8c8cd8a411e5fe84~tplv-k3u1fbpfcp-zoom-1.image)

虽然渲染层采用多个 WebView 页面，但是逻辑层还是在同一个线程处理多个页面栈的。在小程序中，用 Navigator 去控制页面状态，用 pageStack 来保存页面栈的信息。模拟代码如下：

<!-- 页面架构 -->

````js
class Navigator {
    pageStack = [] //保存页面栈信息
    maxPageLimit = 10
    constructor(appWorker) {
        this.appWorker = appWorker
    }
    /* 跳转下一页 */
    _self_navigateTo(query) {
        if (this.pageStack.length === this.maxPageLimit) {
            // 爆栈了，那么跳转失败
            throw new Error('页面栈已满')
        }
        /* 当前最上层的 WebView 页面 */
        const stackTopPage = this.pageStack[this.pageStack.length - 1]
        /* 创建一个新的页面 */
        const page = this.appWorker.createPage()
        if (stackTopPage) {
            /* 当前页面需要改变状态，变成未激活状态 */
            stackTopPage.unActive()
        }
        /* 把当前 WebView 页面放入页面栈 */
        this.pageStack.push(page)
        /* 启动新的 WebView */
        page.launch(query)
    }
    /* 重定向 */
    _self_redirectTo() {
        /* 清除当前最上面的页面栈 */
        const stackTopPage = this.pageStack.pop()
        /* 创建一个新的页面 */
        const page = this.appWorker.createPage()
        /* 把当前 WebView 页面放入页面栈 */
        this.pageStack.push(page)
        /* 启动新的 WebView */
        page.launch(query)
    }
    /* 页面返回 */
    _self_navigateBack() {
        if (this.pageStack.length === 0) {
            throw new Error('页面栈为空')
        }
        /* 清除当前最上面的页面栈 */
        this.pageStack.pop()
        /* 获取上一个页面 */
        const stackTopPage = this.pageStack[this.pageStack.length - 1]
        /* 上一个页面激活 */
        stackTopPage && stackTopPage.active()
    }
}
````

如上代码模拟了整个 WebView 切换的过程，具体细节在后续基于小程序语法的 DSL 应用实战中会详细讲到，现在只要了解即可。

## 视图层处理

明白了逻辑层是什么，做了哪些事情之后，我们接下来看一下渲染层。

### WebView 视图层

首先，我们来说下视图层。小程序的视图层由多个 WebView 构成，每个 WebView 主体部分由 HTML 构成。我们在小程序写的 WXML 结构最后会被转变成 HTML 结构，写的 WXSS 结构，最后被转变成 CSS 结构。

### 渲染层长什么样？

我们还是拿上面的 `pages/index/index` 为例子，视图层 WebView 最终的产物是一个 html 文件，如下所示：

````js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>page/index/index</title>
</head>
<body>
    <!-- 小程序基础库 -->
    <script src="/page-frame/app.js" ></script>
    <script>
        function bootstrap(){
            /* 页面逻辑  */
            window._pageName  = 'page/index/index'
            var script = document.createElement('script')
            /* 加载视图层的 js */
            script.setAttribute('type','text/javascript')
            script.setAttribute('src','/_app/app-view.js')
            document.body.append(script)
        }
        bootstrap()
    </script>
</body>
</html>
````

每当小程序打开一个页面，本质上就是打开了一个新的 HTML 文件，接下来依次加载小程序的基础库 JS 和视图层的 JS 代码。那么，这两个 JS 是做什么的？

小程序基础库负责渲染、通信、底层基建等工作，包括怎么把代码渲染到页面上，怎么和逻辑层做通信。我们在传统 SPA 应用中，如果是用 React 框架构建的应用，那么 React 框架本身就类似于小程序的基础库。

视图层的 JS 就很好理解了，可以理解成我们写的模版结构，比如微信的 WXML。在 WebView 环境下，只能识别 HTML、CSS 和 JS，不能够直接识别 WXML，需要先将 WXML 转成语法树结构，不过这些工作在小程序编译上传阶段就已经完成了。

### 视图层渲染

> 语法树（Syntax Tree）是源代码语法结构的一种抽象表示，它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构

上面我们说到，通过 script 加载视图层，在 app-view 中会保留小程序编译后的语法树信息，这样就可以通过基础库来识别语法树，接着就可以绘制页面了。比如我们在 page/index/index 对应的 WXML 这么写：

````js
<view class="container {{ show ? 'in' : 'out' }}"  >
   <view bind:tap="handleClick" >{{ message }}</view>
</view>
````

如上是一段小程序模版结构，它最后会变成什么？ 在正式回答这个问题之前，我们先来看下 React 中的 jsx 结构，本质上会被编译成 React.createElement 形式。如下：

````js
<div class="container" >hello,world</div>
````

````js
React.createElement(type = 'div' ,props = { class:'container' } ,...children='hello,world')
````

React.createElement 在整个 React 应用 render 阶段执行，返回的对象结构会直观描述出元素的结构与层次。而小程序也符合这个流程，在编译阶段把 WXML 转成语法树结构，再在小程序运行时执行语法树，得到页面元素结构并且渲染。现在，我们看一下上面小程序模版会被编译成什么样子：

````js
window.source_code.pages = [{
    name:'page/index/index',
    source:{
        'wxml': {
            template:null,
            include:null,
            render:function(context){
               return [
                   context.renderNode('view',{
                       props:null,
                       meta:{
                           /* 合并 class 属性 */
                           class: context.mergeClass('container', context.getPropsData('show') ? 'in' : 'out'  )
                       },
                   },
                   function (context){
                           return [
                               context.renderNode('view',{
                                   props:null,
                                   meta:[
                                       on:[{
                                           name:'tap',
                                           event:'handleClick'
                                       }]
                                   ]
                               },
                               function (context){
                                   return [
                                       /* 从 data 中获取 message 属性 */
                                       context.getPropsData('message')
                                   ]
                               }
                               )
                           ]
                     }
                   )
               ]
            }
        }
    }
}]
````

如上就是 WXML 转成语法树之后的结构，可以把 WXML 结构通过一个 render 函数来承载，在渲染层渲染页面的时候执行 render 函数，同时传入 context,context，那它主要做了些什么呢？

-   通过 view、text、image 等标签渲染对应的元素，可以通过 renderNode 来实现。renderNode 和 createElement 类似，接受多个属性，第一个属性为类型，第二个属性为标签属性，比如绑定的 props 等；
-   如果我们想把逻辑层 data 或者是 props 中的数据渲染到视图层，比如我们在 WXML 中获取 data 中的 message 属性，或者通过 data 中 show 属性判断 class 是 in 还是 out，那么需要 getPropsData 去获取逻辑层的数据；
-   如果要把多个 class 合并，可以通过 mergeClass 来实现。
-   ...

我们再看渲染层的流程：首先通过 WebView 加载 html js 等资源，然后加载基础库和视图层的代码，假如是 `pages/index/index` 页面，那么找到对应 render 函数。接下来通过 render 函数，以及 context 提供的各种方法 就可以把页面结构表现出来，再通过基础库转变成真实的 DOM 结构并渲染出来，这样就完成了渲染流程。

![WechatIMG2803.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/435b5b805b9144a083c731e10a56a298~tplv-k3u1fbpfcp-zoom-1.image)

对于 context 提供的各位方法，接下来会有专门的章节介绍。

## 总结

本章节主要讲了 WebView 模式下的 H5 和小程序的区别、小程序的架构设计，以及小程序逻辑层和渲染层的本质。下一章节，我们将重点介绍客户端与 WebView 的通信原理：JSBridge。