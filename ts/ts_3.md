# 写给自己的 TypeScript 教程(三)<!-- omit in toc -->

## 写 TypeScript 时，什么时候用 any？什么时候用 unknown？有没有规律或准则？

any 是被视为 union 的 unknown 不是

两者最大的区别就是 unknown 只是个 top type(任何类型都是他的 subtype），而 any 即是 top type 又是 bottom type（他是任何类型的 subtype), 这导致 any 基本上就是放弃了任何类型检查。

使用 unknown 你还可以继续保证类型安全，使用 any 就是彻底放弃了类型检查

然而大部分的场景你仅仅是需要个 top type 而已，最典型的场景就是泛型默认类型

为了保证你能传入所有类型，所以默认的 constraint 应该是 top type，但是如果你选择了用 any 实际上是放弃了你范型内部的实现安全这时用 unknown+narrow 就合理很多

什么时候用
什么时候用因此也显而易见了。

如果一个变量的类型是变化的（比如来自 JS 程序的对象，随时都有可能多一个属性，甚至变成完全不同的类型），就用 any。
如果一个变量的类型是固定的，但是目前还不能确定或不想确定，就用 unknown。要用这个变量的时候就断言一下吧，不能像 any 那样糊里糊涂地用。

我个人的经验是能用 unknown 就尽量用 unknown，不要滥用 any。

写 unknown 表示程序逻辑不需要知道

写 any 表示程序（逻辑）需要知道，但编译器不知道

## TypeScript 中的 never 类型具体有什么用？

举个具体点的例子，当你有一个 union type:

interface Foo {
type: 'foo'
}

interface Bar {
type: 'bar'
}

type All = Foo | Bar
在 switch 当中判断 type，TS 是可以收窄类型的 (discriminated union)：

function handleValue(val: All) {
switch (val.type) {
case 'foo':
// 这里 val 被收窄为 Foo
break
case 'bar':
// val 在这里是 Bar
break
default:
// val 在这里是 never
const exhaustiveCheck: never = val
break
}
}
注意在 default 里面我们把被收窄为 never 的 val 赋值给一个显式声明为 never 的变量。如果一切逻辑正确，那么这里应该能够编译通过。但是假如后来有一天你的同事改了 All 的类型：

type All = Foo | Bar | Baz
然而他忘记了在 handleValue 里面加上针对 Baz 的处理逻辑，这个时候在 default branch 里面 val 会被收窄为 Baz，导致无法赋值给 never，产生一个编译错误。所以通过这个办法，你可以确保 handleValue 总是穷尽 (exhaust) 了所有 All 的可能类型。

never 的主要作用就是充当 Typescript 类型系统里的 Bottom Type (Typescript 还有个 top type unknown 和即是 top 也是 bottom 的 any)，所以问题就变成了 bottom type 有什么作用

ADT 的 Exhaustive Check
这个功能实际上和 never 一点关系都没有，实际上就是利用了任何不是 never 的类型都不是 never 的 subType 制造了个编译期错误，结合 narrowing 的一个小 hack 而已，实际上我用 any，unknown 照样可以 Exhaustive check

TS 也并不需要依赖这样的 hack 来实现 exhaustive check，TS 在开启了 noimplicitReturn 情况下，如果函数显示的表明了返回类型，我们直接具有了 exhaustive check 功能，如上面
@尤雨溪
的例子，直接就可以了，但缺点也很明显，缺少了运行时使用 default 的兜底逻辑了

控制流分析
不是所有的函数都是 total 的，对于非 totoal 的函数如何处理不合法的输入才能保证类型安全，要么通过 Maybe|Either，要么通过异常，异常带来的问题问题就是一方面破坏了引用透明性，另一方面导致非本地跳转影响了后续的控制流分析，never 可以用来使得异常的处理更加安全，如果一个函数返回了 never 类型，那意味着这个函数不会返回给 caller，这就意味着 caller 在调用返回 never 函数后的代码都成了 unreachable code，这样就可以做 unreachable code 分析了。3.7 下就支持通过 never 进行 unreachable code 分析

类型运算
不相交类型的 inteserction 结果为 never:
type result = 1 & 2 // 结果为 never 2. 是任何类型的 subtype

type Check<T> = never extends T ? true : false
type result = check<xxx> // 结果始终为 true 3. 除了 never，没有其他类型是 never 的 subtype

type Check<T> = never extends never ? false : T extends never ? true : false
type result = check<xxx> // 结果始终为 false 4. 布尔运算

union 运算的幺元，intersection 运算的零元

T | never // 结果为 T
T & never // 结果为 never
这些性质在 TS 的类型库中有这广泛的应用，如 https://github.com/pirix-gh/ts-

Javascript 里不存在的东西通通是没有用的，因为 typescript 最后会被转义成 javascript 来执行。那些“没有用”的东西通常都是给编译器看的。

nerver 类型表示“无法返回”。比如说，函数里触发了 throwError，或者 switch 没有捕捉到值且不存在 default，这些都导致无法走到最后也无法返回。调用这个函数的时候就可以通过测试 never 来知道这个函数出错了，而不是 void。void 表示正确执行完毕，返回空。typescript 编译器自动认为 never 和所有类型 union。所以当函数返回 number 的时候，你返回一个 never 编译器也能通过。这是在编译阶段的用处。

这个概念出现在函数式编程，没有这方面的理论知识就不要深究了。如果是学 C#这种面向对象的语言出身的，更没必要搞太清楚了。毕竟很多人都把 typescript 当成 C#版的 javascript。笑）

总之，你应该尽量使用具体的类型。never 是最具体的类型，因为没有哪个集合比空集合更小了；而 unknown 是最弱的类型，因为它包含了全部可能的值。any 则不为集合，它破坏了类型检查，因此请尽量不要使用 any！

Em... 你可以这么以为，但是，any 很飘渺，它压根不管你什么类型；而 unknown 认为，你这个值是有类型的，只是，当前还不知道它是什么类型，在不确定类型之前，你不能作赋值操作，因为这不安全。因此，在不知类型之前，它可能是任何类型，也就是全集。any 算不得类型，any 甚至认为 string 是 number。

用来告知编译器某处代码永远不会执行,从而获得编译器提示, 以避免程序员在一个永远不会(或不应该)执行的地方编写代码.

Unreachable 检查

例如,某萌新写下了自己的第一个程序如下(憋住别笑 ):

process.exit(0)
console.log("hello world")
如果在 js 下,萌新可能没法一次跑过了. 但是如果 ts 下,该萌新可以获得一个编译器提示,被告知,exit()后面的代码是不可达的. ts 编译器之所以可以「贴心的」给萌新提示,就是因为 process.exit() 返回类型被定义为了 never,

另外再给出几个常见的使用场景:

监听套接字
function listen() : never{
while(true){
let conn = server.accept()
}
}

listen()
console.log("!!!") //Error: Unreachable code detected.ts(7027) 2. 某个方法总是抛出异常

function throwError(msg: string ) :never {
throw new Error(msg)
}

throwError("some error")
console.log("!!!") //Error: Unreachable code detected.ts(7027)

收窄类型

除了上面列举的识别「Unreachable code」之外, 还可以帮助编译器收窄其他数据的类型.

例如下面的两个例子中,后者用 never 避免了一次空检查:

function throwError(){
throw new Error()
}

function firstChar(msg : string | undefined){
if(msg==undefined)
throwError()
let chr =msg.charAt(1) //❌Object is possibly 'undefined'.

function throwError() :never{
throw new Error()
}

function firstChar(msg : string | undefined){
if(msg==undefined)
throwError()
let chr =msg.charAt(1) // ✅

总结
检查「Unreachable code」 2. 间接收窄其他数据的类型

3. 尤大(
   @尤雨溪
   ) 那个 switch 的例子,借助 never 检查,避免了业务性错误.

## TypeScript 的好处都有啥？和 JavaScript 的区别在哪？

杜绝手误导致的变量名写错。
自动完成。
重构支持。
类型可以一定程度上充当文档
类型标注麻烦。
现阶段大部分静态类型语言的类型系统还不够强。
eval 和 new Function() 这种骚操作类型系统管不到。
需要编译，类型检查会增加编译时长，语法和类型系统复杂的话时间特别特别长，比如 scala。
去除第一个元素
type TupleTail<T extends any[]> = T extends [x: any, ...other: infer R] ? R : []
取得最后一个元素
type TupleLast<T extends any[]> = T extends [x: any, ...other: infer R] ? T[R['length']] : undefined
去除最后一个元素
type TupleInit<T extends any[]> = T extends [...f: infer R1, l: infer _R2] ? R1 : undefined
从头部加入一个元素
type TupleUnshift<T extends any[], X> = [X, ...T]
从尾部加入一个元素
type TuplePush<T extends any[], X> = [...T, X]
连接两个元组
type TupleConcat<A extends any[], B extends any[]> = [...A, ...B]

不过大概意思是 extends 左边联合类型被拆开判断的情况只会出现在左边是一个类型参数的情况。

大概就是 type F<T> = T extends xxx 的这个左边是会被拆开，而 type F = T|1 extends xxx 的左边就不会被拆开。

一脸懵逼。

type UnionToIntersection<T> = [(T extends unknown ? (p: T) => void : never)] extends [(p: infer P) => void] ? P : never;

这样就没有依赖那个奇怪的行为了

一个不确定会不会改的地方就是只有类型参数联合类型会被拆开，这个地方不放心的话可以在外面套一个[]，变成一个一个元素的元组，这样就稳了

## typescript 已经有模块系统了，为什么还需要 namespace？

ts 和 js 一样需要作用与空间，模块化关键字不写就会当作一个大文件处理
由于引入了专门的语法，不需要像 AMD 那样依靠函数作用域来隔离代码块，显得更为简洁。

随着 ES2015 出现（以及随之而来的规范演进机制），TypeScript 的定位也发生了转变，不再提供 ES 规范中没有的功能，转而专注于为 ES 代码提供静态类型检查。

所以必然地，TypeScript 放弃了自身的模块系统，转而使用 ES 规范中的模块系统，相应的
这个问题等价于：

柯南已经有灰原哀了，为什么还需要毛利兰？
得先分清楚谁是青梅竹马谁是天降。

放到 js 的开发环境下，比如 ts 开源项目的 tsc 编译器，最终是编译（合并）成一个大的 js 文件，所以根本没必要用 es 标准的模块，并且项目有几百个文件，如果都用标准模块去设计，一个文件平均下来得写 50-100 行的 import，并且要设计很多的包索引文件去 export 子模块；这种情况下 ns 方案显然更人性化，反正维护该项目的都是老熟人。

以上就是 namespace 保留的价值，说到底其实就是 js 的原始闭包，不关注代码是同步还是异步加载的，只关注使用体验。

<!-- TypeScript 有哪些设计缺陷？
最大缺陷也是最大优势就是兼容 js 了

同时有 null 和 undefined，很多正常语言是只有 null 没有 undefined。

一：合成事件层太厚了。我一直在关注这个 issue React Fire: Modernizing React DOM · Issue #13525 · facebook/react 。现代浏览器的 DOM API 已经趋于一致和稳定。只要放弃 IE，打薄事件层，立刻可以让 react-dom 大幅度瘦身。

并且这个合成事件带来了和原生事件不一致的地方。最著名的莫过于 onChange 和 onInput。

另外说到 onChange，还有个不得不吐的槽：

const App = () => {
const [value, setValue] = React.useState("");
const onChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
setValue(ev.target.value);
}, []);
return <input value={value} onChange={onChange} />;
}
有时候，不需要绑定 input 的 value，不需要频繁更新，因为更新可能是个昂贵的操作，比如搜索数据库。

那怎么办？用非受控组件，使用更新频率低的事件，比如 onBlur。当然非受控组件，传入 value 会阻止用户输入，解决方法是用 defaultValue。

const App = () => {
const [value, setValue] = React.useState("");
const onBlur = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
setValue(ev.target.value);
}, []);
return <input defaultValue={value} onBlur={onBlur} />;
};
你以为这就完了？

看上去没问题，但是实际上如果你在其他地方更新了 value，就会发现这个更新没办法反映到 input 上， defaultValue 真的是非常 lazy 的值，由于 react 的渲染机制，它真的只会更新一次。

这时候你有两种解决方案：

（1）：添加 key，让 input 强制更新

const App = () => {
const [value, setValue] = React.useState("");
const onBlur = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
setValue(ev.target.value);
}, []);
return <input key={value} defaultValue={value} onBlur={onBlur} />;
};
受控组件是更新其中的值，而我们这里要更新整个 input 组件，虽然更新频率低了，但是更新一次代价大了。我们有第二种方法。

（2）：用 ref 指向真实 dom 节点，在适当时机手动更新其中的值。

const App = () => {
const [value, setValue] = React.useState("");
const ref = React.useRef<HTMLInputElement>(null);
React.useEffect(() => {
ref.current!.value = value;
}, [value]);
const onBlur = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
setValue(ev.target.value);
}, []);
return <input ref={ref} defaultValue={value} onBlur={onBlur} />;
};
好了，但是对比受控组件，我们写了更多的代码。

我甚至专门抽象出一个自定义 hook 来专门做这件事。╮( •́ω•̀)╭

这一切都是因为， onChange 的语义在 React 里变成了 onInput，而原本的 onChange 缺失，这样的“半受控组件”只能用非受控组件，自己来操纵 dom 更新其中的值。

并且，这个问题我觉得很难修复，因为已经有大量的现存代码依赖这个行为，你很难去劝说大家全都改成 onInput。（除非发布大版本 React 17，升级表示接受 breaking change

二：JSX 转换到 JS 丢失了一部分信息。这部分算是 JSX 的，可能和 React 关系不大。

比如说，一段代码：

const App = () => {
const [a, setA] = React.useState(0);
const [b, setB] = React.useState(0);

    return (
        <div className="counter">
            <button onClick={() => setA((a) => a + 1)}>{a}</button>
            <button onClick={() => setB((b) => b + 1)}>{b}</button>
            <section className="output">{a + b}</section>
        </div>
    );

};
经过 babel/tsc 转换后变成了这样

const App = () => {
const [a, setA] = React.useState(0);
const [b, setB] = React.useState(0);
return React.createElement(
"div",
{ className: "counter" },
React.createElement("button", { onClick: () => setA((a) => a + 1) }, a),
React.createElement("button", { onClick: () => setB((b) => b + 1) }, b),
React.createElement("section", { className: "output" }, a + b)
);
};
注意，在 JSX 中，className 的值都是静态的，在整个渲染周期内都没有改变的可能，而两个 button 中的 a 和 b 都是动态的，会随着应用状态的转移而发生改变。

是静态还是动态，我们在 JSX 中看得清清楚楚，然而转换成 JavaScript，喂给 React.createElement 函数，它并不能知道 "counter"，"output"这样的字面量，和 a, b 这样的变量有什么不同。这中间一些有用的信息就丢失了。

这是静态分析就能知道的信息，可以提供给 diff 算法，减轻 diff 负担。

这其中的想法来源于 lit-html，如果可能的话，是以后可以优化的点。

写完发现槽点都是集中在 react-dom 上，其实 react 不一定是以 react-dom 为渲染器的，它还有其他的比如 react-native（我没用过，可能槽点更多吧），甚至你能用 react 输出 PDF。

暂时先吐槽这么多。有缘更新。

(提交完，发现 JSX 的高亮没了，修改再提交，发现还是没有，知乎的编辑器太烂了！！！ -->