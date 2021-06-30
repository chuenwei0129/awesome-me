# 写给自己的 TypeScript 教程(三)<!-- omit in toc -->

TypeScript 有哪些设计缺陷？
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

(提交完，发现 JSX 的高亮没了，修改再提交，发现还是没有，知乎的编辑器太烂了！！！
