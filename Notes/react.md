jsx语法

1. class className
2. style {{color: red}}
3. 表达式 {变量}
4. <h1>hello</h1> === React.createElement('h1',null, 'hello') === {type: h1, props: {className: xxx, children: [type: ...]}}
5. react元素最小单位就是上面函数的返回值{type: h1, props: {className: xxx, children: [type: ...]}}
7. react元素不可变，只可以重新渲染,reactdom.render()重复调用
8. 函数组件 返回唯一react元素（jsx）参数props，收集组件中的属性传入props最后传入jsx ===》 {...props} === {解构props参数}，泪组件， this.props=== props参数 写法：render里面返回jsx 传构造函数super传实力this。props = props
9. 函数组剑

function(props) {
  return jsx
}

props是个对象

泪组件

class xxx extends React.component {
  this.props
  render() {
    return jsx
  }
}

React.fragment

state
setstate
this

forupdate
q强制刷新
不用setstae，直接改状态

setstate 异步
前状态后荒唐函数

object。assign

ref

refs
ipput => this.xxx = input
this.xxx = react.createRef()

手控组建
defaultvalue
value

但想数据流

生命周期
旧版

nextprops，nextstate shoud

static 映射props 为state nextprops prestate
get
getsnapshort
didupdate prevprop prestate snpa的返回值

娇艳

context缺点不知道是爸爸还是爷爷给的

新版

pure

hoc 回调地狱 

render props

portal

susprnse
数据获取渲染只发生一次

redux
router

hooks

web api

dom diff
fiber

