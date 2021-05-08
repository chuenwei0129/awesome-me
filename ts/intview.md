# 写给自己的面试题

关于 react diff。react 的 diff 与 vue2 的 diff 有什么区别？与 vue3 呢？仅仅是 lis 吗？
关于 react fiber。fiber 的引入究竟对 react 有什么架构层面的影响，double fiber tree 是否有必要存在？
关于 react schedule。schedule 究竟以一个什么形式，什么规律来运行，中断和恢复呢？lane 解决了什么问题？
关于 vue。reactive core 有自己实现过吗？为什么要做这种启发式的 aot？slot 的实现？
关于 ng。脏检测怎么做到高性能？看过 svelte 的脏检测吗？ivy 是什么？增量 dom 和 virtual dom 的区别？ng 里模块化和分层 di 是怎么实现的？
关于 node eventloop。在 node 里，udp 和文件 api 任务什么区别吗？什么是快 io 什么是慢 io？nodejs 如何调度快慢 io 的？node10 之前的事件循环是怎么样的？libuv 是以一种什么样的趋向去调度 io 任务的？async task 的抽象是什么呢？什么是 tickcallback？
关于 node runtime。node 是怎么启动的？node 怎么 console 调试？console 什么时候注入 node 的？
关于 node addon。node_api 是一种什么抽象？jsvalue 为什么是 Object 的二级指针？cpp 和 js 层面的共享内存靠什么实现最为简单？ffi 是怎么实现的？
关于 v8。什么是 isolate？什么是 context？值的抽象？v8 是怎么管理内存的？怎么直接用 v8 api 写 node-addon？
关于 js 优化。自己会熟练使用 js profiler 吗？甚至是否是从未使用过？做过 ms 级别的优化吗？自己问的问题是否真的需要在 js trick 层面进行优化？
关于 js-native 框架。知道 js 到 native 端的详细通信过程吗？做过 binding 吗？知道 jsbridge 的实现吗？知道怎么热更新吗？知道热更新的原理吗？知道怎么手写 js 引擎去做热更新吗？
关于工程化。webpack5 是怎么做持久化储存的？mf 是怎么服务于微前端的，又是怎么解决 external 的问题的？mf 的原理是什么？hardsourceplugin 的原理是什么，它为什么这么快？lerna 的最佳实践？submodule 的最佳实践？webpack 和 gulp 怎么配合？tapable 究竟是什么抽象？
浏览器。render object 的晋升过程？css 和 dom 的融会时机？slp 和 raf 的时机？什么是 rafwithtimeout，存在的意义？vsync 影响了什么？为什么不要为滚动增加事件监听？为什么要 eval(“debugger”)？
