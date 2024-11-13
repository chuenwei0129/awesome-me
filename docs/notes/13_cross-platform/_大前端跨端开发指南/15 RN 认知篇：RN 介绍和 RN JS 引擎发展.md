## 前言

从本章开始，就进入到了 React Native （简称 RN ）的章节。在 RN 的章节中，我们主要围绕着**应用实践**和**运行原理**两个方向进行探讨，本章节我们将重点介绍 RN 以及其背后运转的 JS 引擎。

## Native 模式和 WebView 模式

在前面的章节中，我们介绍了 H5 和小程序，它们本质上都是用 WebView 渲染的，而我们今天介绍的 RN 是通过 Native 渲染的，两者本质上差别很大。

**WebView 渲染**：WebView 渲染还是浏览器渲染的模式那一套，WebView是 Native 的一个组件，能够像打开浏览器那样打开 HTML 页面。在小程序章节我们也讲到了，小程序页面也是由多个 HTML 页面构成。

WebView 渲染视图窗口可以由 Native 来控制，所以 Native 可以利用设置 WebView 宽高来实现局部动态化，也可以让 WebView 布满全屏来实现 H5 页面。

对于 Native 来说，WebView 打开的链接可以是线上资源，也可以是本地资源。如果把 HTML、JS 等资源在本地打开，速度会比加载网络资源快。这也是小程序打开速度和体验上要比直接打开 H5 强的原因，小程序会预先下载资源包，如果小程序已经打开过，就会缓存起来。

**Native 渲染：** Native 渲染就比较简单了，在 iOS 和 Android 系统上分别用 Native 模式渲染。而我们今天要讲的 RN ，也是用 Native 渲染的，Native 渲染的用户体验会更好，还能直接调用系统接口。

## 认识 RN

目前来说 RN 是一个很流行的跨端动态化方案。那么，相比 Web 和原生 Native 来说，RN 有什么好处呢？

### 为什么不是 Web？

Web 发布上线非常快，可以作为动态化方案之一，但是同样也暴露出很多问题。

*   H5 用户体验很差，这种体验分为**首屏加载**和**交互体验**。首先 H5 WebView 的方式加载受到网络波动影响比较大，白屏时间长，这样的用户体验非常不好。整个 WebView 加载流程实质上和浏览器输入 url 到页面展示流程一样，而且 WebView 交互体验比 Native 差很多，比如长列表场景、手势交互、动画效果等等。

*   原生能力支持弱，H5 WebView 这种方式很难调用移动设备的原生能力，比如语音功能、照相、扫脸支付等。一般情况下，可以通过桥和 Native 通信，让 Native 来完成，这会让流程变得非常繁琐，也会带来很多问题。

### 为什么不是 Native?

目前很多互联网公司的移动端开发都在朝着跨端动态化方向发展。由于快速迭代开发，对原生包体积要求严格，及其对资源成本的把控，实现跨端动态化迫在眉睫。

我们先来看看 Native 原生开发的一些不足之处：

*   原生开发周期时间长，审核周期长，会影响到需求发布和迭代效率，有些场景下会更加棘手，比如修复线上紧急 Bug ，或者是频繁迭代一些开发需求。

*   目前移动端主要的平台就是 Android 和 iOS，如果一款前端应用想要同时运行在两个平台，采用 Native 就需要双端各自开发一遍，这样无疑浪费了资源,提高了维护成本。

*   Native 开发代码要打包在客户端包中，这样增加了包的体积，用户下载的时候，会下载更多的资源，而且 Android 和 iOS 应用平台也对包体积严格把控。

### 为什么是 RN?

RN 采用 React 语法，与 React Web 开发类似，前端开发人员很容易上手。而且，React 包含 JSX 语法，可以结合多种设计模式进行开发，使 RN 同样具备灵活性和可扩展性。

RN 受欢迎的原因并不仅仅是支持安卓和 iOS 平台，还有动态化。那么，这种动态化相比于原生客户端有什么优点呢？

首先，RN 是采用运行 React 的 JS 作为开发平台，这样可以让 Web 开发者也能够参与到 Native 开发中来。而且，RN 让一套代码可以运行在两端，大大减少了开发和维护成本。

其次，RN 采用原生渲染，性能和体验仅次于 Native 开发。最后也是最重要的，就是 RN 是动态化的方案，也就是 RN 打出来的应用包，并不是和 Native 包绑定在一起发布的，而是在运行 Native 的时候拉下 RN 的包。这样做，一是减少了 Native 包体积，二是 RN 包可以随时发布，提高了迭代效率，也让一些线上问题能够快速解决。

近两年，也有一些兴起的跨端技术方案，比如 Flutter，阿里巴巴开源的 Rax 等，相比这些动态化方法，RN 也有一定优势：

*   生态成熟，技术社区活跃，采用 React 语法，学习成本低；
*   目前业界已经出现了很多成熟方案，比如京东的 JDRN 和美团的 MRN 等。

### RN 的构成

RN 本质上是用 JS 作为逻辑层，用 Native 作为渲染层，还需要一个中间层作为逻辑层与渲染层的通信。所以 RN 本质上由逻辑层 JS，渲染层 Java (Android)和 iOS (Objective-C)，以及通信层 C++ 组成。

其中需要 JS 引擎来运行 RN 的 JS 代码，那么我们来看一下 RN 中的 JS 引擎。

## 上到 JS 引擎

### V8引擎

计算机本身并不能读懂编程语言，只能读懂二进制文件，因此，为了让计算机读懂编程语法，就必须编译成二进制文件。这就是编译语言，Java、Golang 等都是编译型的语言。编译型语法在编译成二进制文件后，会保存二进制文件，在运行时候，可以直接运行二进制文件，不需要重复编译。

还有一类语言，不需要编译成文件，而是需要通过解释器对语言进行动态解释和执行，这类语言就是解释型语言，比如 Python、JS 等。如下图就是两种类型的语言执行过程：

![1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54d74d00b9eb4bfebbe9e88b966fce0a~tplv-k3u1fbpfcp-watermark.image?)

编译型语言启动需要编译成二进制文件，所以启动速度比很慢，而执行的时候是直接使用编译好的二进制文件，所以执行速度会快一些。

相比之下，解释型语言启动很快，但是执行慢。因为执行时候需要通过解释器解析语法树，变成中间代码，再执行字节码，浪费了时间，使执行速度会变慢。

由于 JS 是解释型语言，它的执行需要宿主环境提供，转成语法树，并且读懂语法树，转成字节码并执行的能力，V8 引擎的工作就需要有这些能力。

- Parser：将 JS 源码转换成抽象语法树。在计算机科学中，抽象语法树(abstract syntax tree 或者缩写为 AST)，或者语法树(syntax tree),是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。

- Lgniton：interpreter 解释器，负责将 AST 转换成指令字节码，解释执行指令字节码（ByteCode），解释器执行的时候主要有四个模块：内存中的字节码、寄存器、栈和堆。

- TurboFan：compiler 编译器，通过 Lgniton 收集的信息，将指令字节码转换成优化汇编代码。

- Orinoco：garbage collector 简称 GC，垃圾回收模块，负责将程序不需要的内存空间回收，提升引擎性能。

如上还有一个问题就是如果每一次都通过 TurboFan 将指令字节码转换成汇编代码，十分浪费性能。在 V8 出现之前，所有的 JS 虚拟机所采用的都是解释执行的方式，这是 JS 执行速度过慢的主要原因之一。

而 V8 率先引入了即时编译（JIT）的双轮驱动设计（混合使用编译器和解释器的技术），这是一种权衡策略，给 JS 的执行速度带来了极大的提升。

那么 JIT 就是取编译执行语言和解释执行语言的长处，利用解释器对代码进行处理，对于频率高的代码进行热区收集，在之后指令字节码编译成机器码的时候，储存高频率的二机制机器码，之后就可以复用并执行二机制代码，以减少解释器和编译器的压力。

V8 通过优化后的工作流程如下：

![2.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be62bb0ad93b46fe8c55d21f3df78021~tplv-k3u1fbpfcp-watermark.image?)

### JSI 是什么？

以 V8 为例子介绍 JS 引擎的流程，我们看一下 RN 的应用中用了什么 JS 引擎呢？

RN 在 0.60 版本之前使用 JSCore 作为默认的 JS 引擎。JSCore 全名 JavaScriptCore，是 WebKit 默认内嵌的 JS 引擎，JSCore作为一个系统级 Framework 被苹果提供给开发者，作为苹果的浏览器引擎 WebKit 中重要组成部分。

所以在 iOS 应用中默认为 JSCore 引擎，这使得 RN 也用 JSCore，但是 JSCore 没有对 Android 机型做好适配，在性能、体积和内存上和 V8 有着明显的差别。

基于这个背景，RN 团队提供了 JSI （JavaScript Interface）框架，JSI 并不是 RN 的一部分，JSI 可以视作一个兼容层，意在磨平不同 JS 引擎中的差异性。

JSI 实现了引擎切换，比如在 iOS 平台运行的 JSCore，在 Andriod 中运行的是 Hermes 引擎。我们来看一下具体的实现细节。


JSI 作为引擎统一的通用层，JSI 会定义与 JS 引擎交互的接口以及数据转化的方法。比如在 JSI 中定义了一个执行 JS 的方法叫做 evaluateJavaScript()。具体如何执行 JS 代码其实是由各引擎实现的，通过这种方式屏蔽不同引擎间的差异，可以方便地实现 JS 引擎切换。

我们看一下 evaluateJavaScript 接口基于 JSI 在不同引擎上的实现。

首先是 JSC 中的实现：

```c++
jsi::Value JSCRuntime::evaluateJavaScript(
    const std::shared_ptr<const jsi::Buffer> &buffer,
    const std::string &sourceURL) {
  std::string tmp(
      reinterpret_cast<const char *>(buffer->data()), buffer->size());
  JSStringRef sourceRef = JSStringCreateWithUTF8CString(tmp.c_str());
  JSStringRef sourceURLRef = nullptr;
  if (!sourceURL.empty()) {
    sourceURLRef = JSStringCreateWithUTF8CString(sourceURL.c_str());
  }
  JSValueRef exc = nullptr;
  JSValueRef res =
      JSEvaluateScript(ctx_, sourceRef, nullptr, sourceURLRef, 0, &exc);
  JSStringRelease(sourceRef);
  if (sourceURLRef) {
    JSStringRelease(sourceURLRef);
  }
  checkException(res, exc);
  return createValue(res);
}
```

Hermes 中的实现:

```c++
//https://github.com/facebook/hermes/blob/main/API/hermes/hermes.cpp
jsi::Value HermesRuntimeImpl::evaluateJavaScript(
    const std::shared_ptr<const jsi::Buffer> &buffer,
    const std::string &sourceURL) {
  return evaluateJavaScriptWithSourceMap(buffer, nullptr, sourceURL);
}
```

### JSI 的功能

JSI 按照功能细分为 3 个方面。

1. JS 和 C++ 可以相互感知，在 C++ 侧定义了可以在 JS 侧调用的方法 HostFunctionType，和 JS 侧可以直接引用的对象 HostObject。

2. 定义了与 JS 侧对应的各种数据类型 (undefined, null, boolean, number, symbol, string, or object) 及 JS Value 与 Native Value 相互转化的方法

3. 抽象的接口层，定义了与 JS 引擎交互的接口。

#### 互相感知

首先我们来看一下 HostObject。HostObject 是 Native Module 在运行时注入到 JSI 中的一个对象，这是一个特殊的对象，并不像普通的 JS 对象一样可以随意的创建或者访问，这个流程需要 Native 的支持，才能在 JS 中创建和使用 HostObject 。

为了更清晰的把原理讲出来，我们从 JS 的对象说起。在 JS 中如果我们想创建一个对象，可以使用字面量 {} 或者是 Object.create。

但是以 JSC 为例子，创建对象本质上调用的是 JSObjectMake，JSC 将会为该对象分配一段内存并在其中存储对象的属性和方法等信息。

**我用 JS 代码代替 C++ 代码，来描述一下整体流程。** 我们在 JS 中创建一个对象，本质上在引擎层是这样实现的：

```js
/* jsObject 为 C++ 给 JS 运行时使用的对象, NativeObject 为 C++ 中 JS 对象的引用 */
const JsObject = JSObjectMake(NativeObject)
```

现在我们要实现 JS 和 C++ 的相互感知，也就是说在 JsObject 中改变属性，那么 C++ 中也能够感知到，这样就需要给 Native Object 做一层 Proxy 代理。来看一下在 JS 中怎么实现。

```js
/* 模拟 c++ 实现代理对象 */
class ProxyObject {
   constructor(){
       /* 创建一个私有对象 */
       this.object = Object.create(null)
       this.proxy = new Proxy(this.object,{
           get:this.getProperty.bind(this),
           set:this.setProperty.bind(this)
       })
   }
   getProperty(target,prop){
      hostHandle.get  && hostHandle.get(target,prop)
       return target[prop]
   }
   setProperty(target,prop,value){
      hostHandle.set && hostHandle.set(target,prop,value)
      target[prop] = value
      return true
   }
}
const JsObject = JSObjectMake(new ProxyObject().proxy)
```

这里我模拟了 JSC 的代理对象，将 object 私有对象进行代理处理，劫持了 get、set 等方法，这样当对象执行 get 或者 set 的时候，hostObject 就能感知到变化。

接下来我们来看一下 hostObject 的实现：

```js
function createFromHostObject(hostHandle){
    class ProxyObjecy{...}
    const JsObject = JSObjectMake(new ProxyObject().object)
    return JsObject
}
```

如上就是在 object 上做了一层代理 ，接下来我们验证一下效果：

```js
/* ========以下代码在 c++ 层执行======== */
const handleModule = {
    get(target,value){
        console.log('JS HostObject 发生 get',target,value)
    },
    set(target,value){
        console.log('JS HostObject 发生 set',target,value)
    },
}
/* 创建一个 wrapHostObject */
const wrapHostObject = createFromHostObject(handleModule)

// 将 wrapHostObject 注册到 JS 层

/* ========以下代码在 js 层执行======== */
// import 引入 wrapHostObject 

wrapHostObject.name = 'alien'

console.log(wrapHostObject.name)
```

当 Native 需要注册一个 hostObject 的时候，需要通过 createFromHostObject 创建一个 wrapHostObject，然后进行注册，这样在 React Native 中可以通过 NativeModule 引入使用，当值发生变化的时候，可以感知到 wrapHostObject 的变化，如上代码打印所示：

![4.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e2b6154489d04ceca6acb390cf7651c3~tplv-k3u1fbpfcp-watermark.image?)

> 注：以上是 JS 的模拟实现，C++ 源码有所差异，敬请谅解。我们来看一下 hostObject 在 JSI 中的真正定义：

```js
/* HostObject 定义 */
class JSI_EXPORT HostObject {
 public:
  virtual ~HostObject();

  virtual Value get(Runtime&, const PropNameID& name); // get 方法

  virtual void set(Runtime&, const PropNameID& name, const Value& value); // set 方法

  virtual std::vector<PropNameID> getPropertyNames(Runtime& rt);
};
/* createFromHostObject 方法接收一个 HostObject 对象，使用 runtime.createObject 返回一个 JS Object */
class JSI_EXPORT Object : public Pointer {
   ...
  static Object createFromHostObject(
      Runtime& runtime,
      std::shared_ptr<HostObject> ho) {
    return runtime.createObject(ho);
  }
  ...
}
```
#### 数据转化

JSI 提供了 C++ 和 JS 数据转化的能力，比如在 React Native 通信过程中，涉及数据由 JS 层向 C++ 桥层的通信。那么，在没有 JSI 之前，React Native 是如何进行 C++ 和 JS 层通信的呢？

在之前没有 JSI 之前，是需要 JS 序列化成 JSON 串，然后通过反序列化 JSON 成 C++ 数据来完成通信的，这样的序列化和反序列化通信效率很差，JSI 提供了数据深拷贝的能力，也就是说从序列化变成了深拷贝，整体提升了性能。

对于数据转化逻辑，在 JSIDynamic.cpp 文件中存在主要的两个方法：valueFromDynamic 和 dynamicFromValue。

*   valueFromDynamic： 将 JSI 中的动态类型转换为 JS 引擎中的原始 JS 值。
*   dynamicFromValue： 将 JS 中的原始类型值转换成 C++ 动态类型值。

其中，转换有一定的规则：

*   对于数组和对象是一个遍历浅比较流程；
*   对于 string 是内容的拷贝；
*   对于 boolean 和 number 是基本数据类型赋值操作。

![5.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f3b0453f07f46f095e1fb2cf976fe47~tplv-k3u1fbpfcp-watermark.image?)

我们来看一下 JS 和 C++ 转化的大致逻辑：

```c++
void dynamicFromValueShallow(
    Runtime& runtime,
    std::vector<FromValue>& stack, 
    const jsi::Value& value, // JS 类型
    folly::dynamic& output) { // c++ 类型
  if (value.isUndefined() || value.isNull()) {
    output = nullptr;
  } else if (value.isBool()) {
    output = value.getBool(); // 布尔类型
  } else if (value.isNumber()) {
    output = value.getNumber(); // 数字类型
  } else if (value.isString()) { // 字符串类型
    output = value.getString(runtime).utf8(runtime);
  } else if (value.isObject()) {
    Object obj = value.getObject(runtime);
    if (obj.isArray(runtime)) {
      output = folly::dynamic::array();
    } else if (obj.isFunction(runtime)) {
      throw JSError(runtime, "JS Functions are not convertible to dynamic");
    } else {
      output = folly::dynamic::object();
    }
    stack.emplace_back(&output, std::move(obj));
  } else if (value.isBigInt()) {
    throw JSError(runtime, "JS BigInts are not convertible to dynamic");
  } else if (value.isSymbol()) {
    throw JSError(runtime, "JS Symbols are not convertible to dynamic");
  } else {
    throw JSError(runtime, "Value is not convertible to dynamic");
  }
}
```

C++ 类型转 JS 类型：

```js
Value valueFromDynamicShallow(
    Runtime& runtime,
    std::vector<FromDynamic>& stack,
    const folly::dynamic& dyn) {
  switch (dyn.type()) {
    case folly::dynamic::NULLT:
      return Value::null();
    case folly::dynamic::ARRAY: {
      Object arr = Array(runtime, dyn.size());
      Value ret = Value(runtime, arr);
      stack.emplace_back(&dyn, std::move(arr));
      return ret;
    }
    case folly::dynamic::BOOL:
      return Value(dyn.getBool());
    case folly::dynamic::DOUBLE:
      return dyn.getDouble();
    case folly::dynamic::INT64:
      return Value((double)dyn.getInt());
    case folly::dynamic::OBJECT: {
      auto obj = Object(runtime);
      Value ret = Value(runtime, obj);
      stack.emplace_back(&dyn, std::move(obj));
      return ret;
    }
    case folly::dynamic::STRING:
      return Value(String::createFromUtf8(runtime, dyn.getString()));
  }
  CHECK(false);
}
```

如上判断类型的转化关系。

接下来我们看一下 React 引入 JSI 后新老架构对比：



![6.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3de5c75c17f54ff1b87b1196082de0bb~tplv-k3u1fbpfcp-watermark.image?)

老架构：业务启动，一次性初始化全部 NativeModule。所有的调用为异步操作（同步桥除外），JS 和 Native 端通过序列化、反序列化进行通信。桥通讯由于排队、线程切换易引起阻塞。

新架构：
- JSI：增加引擎抽象层，实现引擎解耦便于切换引擎。同时支持 JS 持有 C++ HostObject 类型对象引用，实现 JS 和 Native 相互感知。
- TurboModule：替换原有桥机制，实现 NativeModule 按需加载，和 JS<->Native 同步调用Fabric：新 UI 架构，替换原有 UIManager。对于 TurboModule 和 Fabric 后面会有对应的章节介绍。

## 下到 JS bundle

React Native 和传统的 Web 端 React 应用开发非常类似，因为它们都使用JavaScript 编程语言。这使得 Web 开发者能够轻松上手 RN 开发。不同之处在于，RN 的打包产物是单一的 JavaScript 文件(jsbundle)，而在 Web 中则需要部署 HTML、CSS 和 JavaScript 文件的集合体。

### 单 Bundle 和多 Bundle 模式

每次运行一个 bundle 时，RN 需要外层容器提供 JS 引擎来运行当前的jsbundle。在 RN 中，可以通过路由方案来实现页面跳转，通常情况下一个 jsbundle 对应一个或多个页面。

在业务开发中，需要根据具体情况选择单 bundle 或者多个 bundle 的方式。比如有一些独立的页面，需要不同的发版流程、上线周期，或者不同的团队维护，这种情况下一个页面对应一个 bundle 比较适合。但是有一些上下关联密切的页面，或者是上下级父子页面，也可以采用一个 bundle 对应多个页面，当然现实场景下：一对一、一对多的复杂情况都有可能发生，或者共存在一个项目中。


![7.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5175c07f80e84b57abbfaafaa3fd7c0f~tplv-k3u1fbpfcp-watermark.image?)

在同一 bundle 下，文件运行在相同的 JS 上下文中，因此可以使用 Redux 等状态管理工具在 React Native 中实现组件或页面状态的共享。

### RN 在 Native 中的形态

RN 在 Native 中，可以是独立的页面，也就是整个页面都是 RN，也有可能是局部动态化方案，只有一部分是 RN，其他部分是 Native 或者其他的技术栈。

在 RN 中每一个应用都有一个入口文件，RN 中提供了注册根本应用的方法，那就是 AppRegistry，这一点和 React Web 应用会有一些区别。Web 应用中，主要依赖于 react-dom 中提供的 api ，但是在 RN 项目中，无需再下载 react-dom，取而代之的是 react-native 包。

```js
import {AppRegistry} from 'react-native'
/* 根组件 */
import App from './app' 

AppRegistry.registerComponent('MyReactNativeApp', () => <App />)
```

我们拿安卓为例，看一下怎么注册页面。在安卓中，每一个页面都是一个 Activity，在 RN 的 Android 中，有用于管理和渲染 RN 组件的 Android Activity 类。

```java
import com.facebook.react.ReactActivity;

public class MyReactActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() {
    return "MyReactNativeApp"; /* 这里的名称对应你的 RN 应用的名称 */
  }
}
```

现在我们清楚了，在 Native 中 RN 是什么。

## 总结

本章节介绍了 RN 和 RN 优势，介绍了 JS 引擎，已经 RN 用的 JSI 的现状，下一章节，我们将深入介绍 RN 的应用。

### 参考

*   [React跨端动态化序章—从JS引擎到RN落地](https://juejin.cn/post/7147485010277171208)
