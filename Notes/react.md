jsx语法

1. class className
2. style {}
3. 表达式 {}
4. <h1>hello</h1> === React.createElement('h1',null, 'hello') === {type: h1, props: {className: xxx, children: [type: ...]}}
5. react元素最小单位，即html标签
6. ReactDom.render(可以使用if else 返回虚拟dom, 真实挂载dom)
7. react元素不可变，只可以重新渲染
8. 函数组件 返回唯一react元素（jsx）参数props，收集组件中的属性传入props最后传入jsx ===》 {...props} === {解构props参数}，泪组件， this.props=== props参数 写法：render里面返回jsx 传构造函数super传实力this。props = props
9. 