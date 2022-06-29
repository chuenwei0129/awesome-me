# 函数式编程术语

## 拾人牙慧

- [重新发明 Y 组合子 JavaScript(ES6) 版](http://picasso250.github.io/2015/03/31/reinvent-y.html)
- [Y不动点组合子用在哪里？](https://www.zhihu.com/question/21099081)
- [函数式编程的 Y Combinator 有哪些实用价值？](https://www.zhihu.com/question/20115649/answer/14029761)
- [递归思想为什么是编程的基本思想，它效率很高吗？](https://www.zhihu.com/question/271081962)
- [通用的递归转循环方法](https://zhuanlan.zhihu.com/p/136511316)
- [尾递归为啥能优化？](https://zhuanlan.zhihu.com/p/36587160)
- [写给小白的Monad指北](https://zhuanlan.zhihu.com/p/65449477)
- [学习函数式编程 Monad](https://zhuanlan.zhihu.com/p/306339035)
- [React 推荐函数组件是纯函数，但是组件有状态就不可能是纯函数，怎么理解有状态的纯函数？](https://www.zhihu.com/question/537538929)

[现代浏览器生成一个 JS 函数的开销多大？React hooks 的设计频繁生成新函数对性能有影响吗?](https://www.zhihu.com/question/345689944/answer/943385371)

<!-- 函数 + 参数 + 环境（闭包） => 返回值 + 环境（闭包）
 ↑    ↑    ↑
静态   动态   动态
其中，函数是可以静态编译的，哪怕是匿名函数那也只是匿名，而不是每次执行都要「重新生成」，重新生成的只有「环境（闭包）」，但是在外部环境执行的时候，这个闭包就已经生成了，并不会有多余的开销。

大概明白了，我想应该是这样的。每个函数都会创建一个自身环境，并且自身环境有个指针指向上级环境。而这上下级环境关系是由函数代码定义位置决定的。为了有动态环境(?) js才引入this的概念。 -->
