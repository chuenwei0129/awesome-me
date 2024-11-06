---
nav:
  second:
    title: 工程化
    order: -1
order: -999
title: 这是什么？
group:
  title: 介绍
  order: -999
---

因为 webpack 支持多种模块化，他一开始必须要统一模块化代码，所以意味着他需要将所有的依赖全部读一遍

// index.js
// 这一段代码最终会到浏览器里去运行
const lodash = require (“lodash”)； // commonjs 规范
import Vue from “vue”； // es6 module

// webpack 是允许我们这么写的

依赖预构建：首先 vite 会找到对应的依赖，然后调用 esbuild (对 js 语法进行处理的一个库)，将其他规范的代码转换成 esmodule 规范，然后放到当前目录下的 node_modules/.vite/deps，同时对 esmodule 规范的各个模块进行统一集成

// a
export default function a() {}
export {default as a} from “./a.js”
vite 重写以后

function a() {}
他解决了 3 个问题：

不同的第三方包会有不同的导出格式 (这个是 vite 没法约束人家的事情)
对路径的处理上可以直接使用。vite/deps，方便路径重写
叫做网络多包传输的性能问题 (也是原生 esmodule 规范不敢支持 node_modules 的原因之一)，有了依赖预构建以后无论他有多少的额外 export 和 import，vite 都会尽可能的将他们进行集成最后只生成一个或者几个模块
vite.config.js === webpack.config.hs

叫做网络多包传输的性能问题 (也是原生 esmodule 规范不敢支持 node_modules 的原因之一)，有了依赖预构建以后无论他有多少的额外 export 和 import，vite 都会尽可能的将他们进行集成最后只生成一个或者几个模块

环境变量：会根据当前的代码环境产生值的变化的变量就叫做环境变量

代码环境：

开发环境
测试环境
预发布环境
灰度环境
生产环境
举个例子：百度地图 sdk，小程序的 sdk

APP_KEY：测试环境和生产还有开发环境是不一样的 key

开发环境：110
生产环境：111
测试环境：112
我们去请求第三方 sdk 接口的时候需要带上的一个身份信息

我们在和后端同学对接的时候，前端在开发环境中请求的后端 API 地址和生产环境的后端 API 地址是一个吗？肯定不是同一个

开发和测试：http://test.api/
生产：https://api/
在 vite 中的环境变量处理：

vite 内置了 dotenv 这个第三方库

dotenv 会自动读取。env 文件，并解析这个文件中的对应环境变量并将其注入到 process 对象下 (但是 vite 考虑到和其他配置的一些冲突问题，他不会直接注入到 process 对象下)

涉及到 vite.config.js 中的一些配置：

root
envDir：用来配置当前环境变量的文件地址
vite 给我们提供了一些补偿措施：我们可以调用 vite 的 loadEnv 来手动确认 env 文件

process.cwd 方法：返回当前 node 进程的工作目录

。env：所有环境都需要用到的环境变量。env.development：开发环境需要用到的环境变量 (默认情况下 vite 将我们的开发环境取名为 development)。env.production：生产环境需要用到的环境变量 (默认情况下 vite 将我们的生产环境取名为 production)

yarn dev --mode development 会将 mode 设置为 development 传递进来

当我们调用 loadenv 的时候，他会做如下几件事：

直接找到。env 文件不解释并解析其中的环境变量并放进一个对象里
会将传进来的 mode 这个变量的值进行拼接： 。env.development，并根据我们提供的目录去取对应的配置文件并进行解析，并放进一个对象
我们可以理解为
const baseEnvConfig = 读取。env 的配置
const modeEnvConfig = 读取 env 相关配置
const lastEnvConfig = {...baseEnvConfig， ...modeEnvConfig}
如果是客户端，vite 会将对应的环境变量注入到 import.meta.env 里去

vite 做了一个拦截，他为了防止我们将隐私性的变量直接送进 import.meta.env 中，所以他做了一层拦截，如果你的环境变量不是以 VITE 开头的，他就不会帮你注入到客户端中去，如果我们想要更改这个前缀，可以去使用 envPrefix 配置

补充一个小知识：为什么 vite.config.js 可以书写成 esmodule 的形式，这是因为 vite 他在读取这个 vite.config.js 的时候会率先 node 去解析文件语法，如果发现你是 esmodule 规范会直接将你的 esmodule 规范进行替换变成 commonjs 规范

仅执行转译
请注意，Vite 仅执行。ts 文件的转译工作，并不执行任何类型检查。并假定类型检查已经被你的 IDE 或构建过程处理了。
