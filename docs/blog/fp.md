Functor (函子) 是实现了 map 并遵守一些特定规则的容器类型。也就是说，如果我们要将普通函数应用到一个被容器包裹的值，那么我们首先需要定义一个叫 Functor 的数据类型，在这个数据类型中需要定义如何使用 map 来应用这个普通函数。把东西装进一个容器，只留出一个接口 map 给容器外的函数，这么做有什么好处呢？本质上，Functor 是一个对于函数调用的抽象，我们赋予容器自己去调用函数的能力。当 map 一个函数时，我们让容器自己来运行这个函数，这样容器就可以自由地选择何时何地如何操作这个函数，以致于拥有惰性求值、错误处理、异步调用等等非常牛掰的特性。

作者：Starkwang
链接：https://zhuanlan.zhihu.com/p/21926955
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

const f = x => x + 1

函数这个词是文言文，凡此变数中函彼变数者，则此为彼之函数。意为：变数 f(x) 函变数 x，则 f(x) 为 x 之函数。函，是箭囊，引申为是装包东西的口袋。

函数只是两种数值之间的关系：输入和输出。
尽管每个输入都只会有一个输出，但不同的输入却可以有相同的输出。

纯函数是这样一种函数，对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。

副作用：纯函数是这样一种函数，对于相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。

引用透明性 (Referential Transparency) 指的是，如果一段代码在不改变整个程序行为的前提下，可以替换成它的执行结果。
副作用是在计算的过程中，系统状态的一种变化，或者与外部世界进行的可观察的交互。

简单来说，一个多参函数 (n-ary)，柯里化后就变成了 n \* 1-ary，而偏函数应用了 x 个参数后就变成了 (n-x)-ary

科利华的好处，参数闭包保存变量

![function-composition](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/function-composition.png)

首先让我们从抽象的层次来思考一下：一个 app 由什么组成？(当然是由 a、p、p 三个字母组成的啦)

所谓纯函数，就是一次计算，调用结果永远不变的函数。

为了这个目标，其他什么 Monad，Continuation，Lazy，Effect，都只是手段罢了，殊途同归。

不是说你用 map 就是函数式，你 map 里有什么 print，random，fs，基本上就告别函数式的初衷了。

```ts
const msg = 'hello world'

const speak = (msg: string) => console.log(msg)

speak(msg)
```

[Playground Link](https://www.typescriptlang.org/zh/play?#code/MYewdgzgLgBAthA5jAvDARACwKYBtcgwDuIATrgCboDcAULaJLBAA7YCGA1qjABQKIAXDGikAlmEQBKVAD4YjCCFzYAdAUT8kUurVYdOW6XSA)

https://www.typescriptlang.org/zh/play?#code/MYewdgzgLgBAthA5jAvDARACwKYBtcgwDuIATrgCboDcAULaJLBAA7YCGA1qjABQKIAXDGikAlmEQBKVAD4YjCCFzYAdAUT8kUurVYdOW6XSA
