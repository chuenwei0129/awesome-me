# React 全部 api 解读<!-- omit in toc -->

## React 组件 render 时机

## PureComponent

## memo

## forwardRef

<!-- 转发引入Ref -->
<!-- 高阶组件转发Ref -->
<!-- react不允许ref通过props传递，因为组件上已经有 ref 这个属性,在组件调和过程中，已经被特殊处理，forwardRef出现就是解决这个问题，把ref转发到自定义的forwardRef定义的属性上，让ref，可以通过props传递。 -->

## lazy

lazy

React.lazy 和 Suspense 技术还不支持服务端渲染。如果你想要在使用服务端渲染的应用中使用，我们推荐 Loadable Components 这个库

React.lazy 和 Suspense 配合一起用，能够有动态加载组件的效果。React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise ，该 Promise 需要 resolve 一个 default export 的 React 组件。
我们模拟一个动态加载的场景。
父组件
import Test from './comTest'
const LazyComponent = React.lazy(()=> new Promise((resolve)=>{
setTimeout(()=>{
resolve({
default: ()=> <Test />
})
},2000)
}))
class index extends React.Component{  
 render(){
return <div className="context_box" style={ { marginTop :'50px' } } >
<React.Suspense fallback={ <div className="icon" ><SyncOutlined  spin  /></div> } >
<LazyComponent />
</React.Suspense>

</div>
}
}
复制代码
我们用 setTimeout 来模拟 import 异步引入效果。
Test
class Test extends React.Component{
constructor(props){
super(props)
}
componentDidMount(){
console.log('--componentDidMount--')
}
render(){
return <div>
<img src={alien}  className="alien" />
</div>
}
}
复制代码
效果

Suspense
何为 Suspense, Suspense 让组件“等待”某个异步操作，直到该异步操作结束即可渲染。
用于数据获取的 Suspense 是一个新特性，你可以使用 <Suspense> 以声明的方式来“等待”任何内容，包括数据。本文重点介绍它在数据获取的用例，它也可以用于等待图像、脚本或其他异步的操作。
上面讲到高阶组件 lazy 时候，已经用 lazy + Suspense 模式，构建了异步渲染组件。我们看一下官网文档中的案例：

作者：我不是外星人
链接：https://juejin.cn/post/6950063294270930980
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

和 Fragment 区别是，Fragment 可以支持 key 属性。<></>不支持 key 属性。
温馨提示。我们通过 map 遍历后的元素，react 底层会处理，默认在外部嵌套一个<Fragment>。
比如：
{
[1,2,3].map(item=><span key={item.id} >{ item.name }</span>)
}
复制代码
react 底层处理之后，等价于：
<Fragment>
<span></span>
<span></span>
<span></span>
</Fragment>

作者：我不是外星人
链接：https://juejin.cn/post/6950063294270930980
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

那么 cloneElement 感觉在我们实际业务组件中，可能没什么用，但是在一些开源项目，或者是公共插槽组件中用处还是蛮大的，比如说，我们可以在组件中，劫持 children element，然后通过 cloneElement 克隆 element，混入 props。经典的案例就是 react-router 中的 Swtich 组件，通过这种方式，来匹配唯一的 Route 并加以渲染。

unstable_batchedUpdates
在 react-legacy 模式下，对于事件，react 事件有批量更新来处理功能,但是这一些非常规的事件中，批量更新功能会被打破。所以我们可以用 react-dom 中提供的 unstable_batchedUpdates 来进行批量更新。

作者：我不是外星人
链接：https://juejin.cn/post/6950063294270930980
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

作者：我不是外星人
链接：https://juejin.cn/post/6950063294270930980
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

Profiler 这个 api 一般用于开发阶段，性能检测，检测一次 react 组件渲染用时，性能开销。
Profiler 需要两个参数：
第一个参数：是 id，用于表识唯一性的 Profiler。
第二个参数：onRender 回调函数，用于渲染完成，接受渲染参数。
实践：
const index = () => {
const callback = (...arg) => console.log(arg)
return <div >

<div >
<Profiler id="root" onRender={ callback } >
<Router  >
<Meuns/>
<KeepaliveRouterSwitch withoutRoute >
{ renderRoutes(menusList) }
</KeepaliveRouterSwitch>
</Router>
</Profiler>
</div>

  </div>
}
复制代码
结果

onRender

0 -id: root -> Profiler 树的 id 。
1 -phase: mount -> mount 挂载 ， update 渲染了。
2 -actualDuration: 6.685000262223184 -> 更新 committed 花费的渲染时间。
3 -baseDuration: 4.430000321008265 -> 渲染整颗子树需要的时间
4 -startTime : 689.7299999836832 -> 本次更新开始渲染的时间
5 -commitTime : 698.5799999674782 -> 本次更新 committed 的时间
6 -interactions: set{} -> 本次更新的 interactions 的集合

尽管 Profiler 是一个轻量级组件，我们依然应该在需要时才去使用它。对一个应用来说，每添加一些都会给 CPU 和内存带来一些负担。

作者：我不是外星人
链接：https://juejin.cn/post/6950063294270930980
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

cloneElement
可能有的同学还傻傻的分不清楚 cloneElement 和 createElement 区别和作用。
createElement 把我们写的 jsx，变成 element 对象; 而 cloneElement 的作用是以 element 元素为样板克隆并返回新的 React 元素。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。
那么 cloneElement 感觉在我们实际业务组件中，可能没什么用，但是在一些开源项目，或者是公共插槽组件中用处还是蛮大的，比如说，我们可以在组件中，劫持 children element，然后通过 cloneElement 克隆 element，混入 props。经典的案例就是 react-router 中的 Swtich 组件，通过这种方式，来匹配唯一的 Route 并加以渲染。
我们设置一个场景，在组件中，去劫持 children，然后给 children 赋能一些额外的 props

作者：我不是外星人
链接：https://juejin.cn/post/6950063294270930980
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

createRef
createContext

isValidElement
这个方法可以用来检测是否为 react element 元素,接受待验证对象，返回 true 或者 false。这个 api 可能对于业务组件的开发，作用不大，因为对于组件内部状态，都是已知的，我们根本就不需要去验证，是否是 react element 元素。
但是，对于一起公共组件或是开源库，isValidElement 就很有作用了。

作者：我不是外星人
链接：https://juejin.cn/post/6950063294270930980
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

接下来的五个 api 都是和 react.Chidren 相关的，我们来分别介绍一下，我们先来看看官网的描述，React.Children 提供了用于处理 this.props.children 不透明数据结构的实用方法。
有的同学会问遍历 children 用数组方法,map ，forEach 不就可以了吗？ 请我们注意一下不透明数据结构,什么叫做不透明结构?
我们先看一下透明的结构：
class Text extends React.Component{
render(){
return <div>hello,world</div>
}
}
function WarpComponent(props){
console.log(props.children)
return props.children
}
function Index(){
return <div style={{ marginTop:'50px' }} >
<WarpComponent>
<Text/>
<Text/>
<Text/>
<span>hello,world</span>
</WarpComponent>

</div>
}
复制代码
打印

但是我们把 Index 结构改变一下：
function Index(){
return <div style={{ marginTop:'50px' }} >
<WarpComponent>
{ new Array(3).fill(0).map(()=><Text/>) }
<span>hello,world</span>
</WarpComponent>

</div>
}
复制代码
打印

这个数据结构，我们不能正常的遍历了，即使遍历也不能遍历，每一个子元素。此时就需要 react.Chidren 来帮忙了。
但是我们把 WarpComponent 组件用 react.Chidren 处理 children:
function WarpComponent(props){
const newChildren = React.Children.map(props.children,(item)=>item)
console.log(newChildren)
return newChildren
}
复制代码
此时就能正常遍历了，达到了预期效果。

注意
如果 children 是一个 Fragment 对象，它将被视为单一子节点的情况处理，而不会被遍历。

作者：我不是外星人
链接：https://juejin.cn/post/6950063294270930980
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

useImperativeHandle 可以配合 forwardRef 自定义暴露给父组件的实例值。这个很有用，我们知道，对于子组件，如果是 class 类组件，我们可以通过 ref 获取类组件的实例，但是在子组件是函数组件的情况，如果我们不能直接通过 ref 的，那么此时 useImperativeHandle 和 forwardRef 配合就能达到效果。
useImperativeHandle 接受三个参数：

第一个参数 ref: 接受 forWardRef 传递过来的 ref。

第二个参数 createHandle ：处理函数，返回值作为暴露给父组件的 ref 对象。

第三个参数 deps:依赖项 deps，依赖项更改形成新的 ref 对象。

我们来模拟给场景，用 useImperativeHandle，使得父组件能让子组件中的 input 自动赋值并聚焦。
function Son (props,ref) {
console.log(props)
const inputRef = useRef(null)
const [ inputValue , setInputValue ] = useState('')
useImperativeHandle(ref,()=>{
const handleRefs = {
/_ 声明方法用于聚焦 input 框 _/
onFocus(){
inputRef.current.focus()
},
/_ 声明方法用于改变 input 的值 _/
onChangeValue(value){
setInputValue(value)
}
}
return handleRefs
},[])
return <div>
<input
            placeholder="请输入内容"
            ref={inputRef}
            value={inputValue}
        />

</div>
}

const ForwarSon = forwardRef(Son)

class Index extends React.Component{
cur = null
handerClick(){
const { onFocus , onChangeValue } =this.cur
onFocus()
onChangeValue('let us learn React!')
}
render(){
return <div style={{ marginTop:'50px' }} >
<ForwarSon ref={cur => (this.cur = cur)} />
<button onClick={this.handerClick.bind(this)} >操控子组件</button>

</div>
}
}

作者：我不是外星人
链接：https://juejin.cn/post/6950063294270930980
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
