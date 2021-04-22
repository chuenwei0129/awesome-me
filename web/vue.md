# vue<!-- omit in toc -->

- [响应式](#响应式)
  - [Object.defineProperty](#objectdefineproperty)
  - [reactive](#reactive)
- [依赖收集](#依赖收集)
- [更新粒度](#更新粒度)
  - [vue 有了数据响应式，为何还要 diff](#vue-有了数据响应式为何还要-diff)
  - [defineProperty 升级到 Proxy](#defineproperty-升级到-proxy)
  - [响应式更新](#响应式更新)
  - [Vue 的更新粒度](#vue-的更新粒度)
    - [Vue 的组件更新是精确到组件本身的](#vue-的组件更新是精确到组件本身的)
    - [props 的更新触发重渲染](#props-的更新触发重渲染)
    - [vm.$forceUpdate](#vmforceupdate)
- [API](#api)
  - [Vue.extend](#vueextend)
  - [Vue.component](#vuecomponent)
  - [Vue.use](#vueuse)
  - [Vue.mixin](#vuemixin)
  - [函数式组件](#函数式组件)
- [其他](#其他)
  - [nextTick](#nexttick)
  - [v-if 和 v-for 能不能一起使用](#v-if-和-v-for-能不能一起使用)
  - [v-if 和 v-show 的区别](#v-if-和-v-show-的区别)
  - [递归组件](#递归组件)
  - [watch、computed 和 methods](#watchcomputed-和-methods)
- [生命周期](#生命周期)
- [组件通信](#组件通信)
- [SPA](#spa)
- [Vuex](#vuex)
- [scoped](#scoped)
  - [渲染规则](#渲染规则)
  - [深度作用选择器](#深度作用选择器)

## 响应式

### Object.defineProperty
```js
let data = { msg: '我是数据' } 

console.log('代理前', data.msg); // 1) 代理前 我是数据

const oldVal = data.msg

Object.defineProperty(data, 'msg', {
	// 代理是为了返回与原值不同值，不改变原值默认返回 undefined，与 value: '42' 区别在 todo...
	get() {
		// todo...
		// 内部因为 this 原因，需要闭包保存代理的值
		// 内部只能返回代理后的值
		console.log('数据被代理。。。');
		return oldVal
	},
	set(newVal) {
		// 🏁 this 是 `.msg` 前的值 data
		console.log('数据发生了改变。。。')
		console.log('旧值', oldVal, '新值', newVal);
	},
})

console.log('代理后', data.msg); 
// 数据被代理。。。
// 代理后 数据

data.msg = '我是改变后的数据'
// 数据发生了改变。。。
// 旧值 数据 新值 我是改变后的数据
```

### reactive

```js
function reactive(data) {
 // 遍历对象，对对象的每个属性都使用defineProperty
	for (let [k, v] of Object.entries(data)) {
		// + if (typeof v === 'object' && v !== null) reactive(v) 处理对象嵌套
		if (typeof v === 'object' && v !== null) reactive(v)
		Object.defineProperty(data, k, {
			get() {
				console.log(`属性 ${k} 被代理`);
				// 此处可以做一些对代理前的值做一些个性化处理，这里的 v 只是闭包保存值的变量
				// v = v + '123'
				return v
			},
			set(newV) {
				// 执行 set 和 get 毫无关系，互不影响
				// + if (typeof newV === 'object' && newV !== null) reactive(newV)  对象嵌套，监听的对象重新赋值为新的对象
				if (typeof newV === 'object' && newV !== null) reactive(newV)
				console.log(`属性 ${k} 数据发生改变，原值为 ${v}，新值为 ${newV}`);
				v = newV
			}
		})
	}
	return data
}

let proxyData = reactive(data)

// 1. 简单赋值，对象无嵌套
proxyData.msg = 'hello world' // 属性 msg 数据发生改变，原值为 hello vue，新值为 hello world

//! proxyData.obj.str 进行此类操作，proxyData.obj 相当于执行了一次 proxyData.obj 的 get 在执行 proxyData.obj.str 的 set

// 2. 对象嵌套
proxyData.obj.str = 'str1' // 属性 str 数据发生改变，原值为 str，新值为 str1

// 3. 对象嵌套，监听的对象重新赋值为新的对象，那么这个对象就没有 get set
proxyData.obj = { num: 1 } // 属性 obj 数据发生改变，原值为 [object Object]，新值为 [object Object]
proxyData.obj.num = 2 // 属性 num 数据发生改变，原值为 1，新值为 2

// 4. 给对象添加新的属性，Object.defineProperty 无法解决，本质是只对存在的 data 代理，后来的没有代理，vue 中 $set 就是解决此类问题
proxyData.newProperty = '新属性'
proxyData.newProperty = '改变新属性'

// 解决办法其实就是给新的属性加代理就是了

// 5. 数组
// 使用了函数劫持的方式，重写了数组的方法，Vue将data中的数组进行了原型链重写，指向了自己定义的数组原型方法。这样当调用数组api时，可以通知依赖更新。如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控。这样就实现了监测数组变化。
const arrMethods = ['push', 'shift', 'unshift']
// 函数劫持，批量重写数组常用方法
arrMethods.forEach((method) => {
	let oldMethod = Array.prototype[method]
	Array.prototype[method] = function (...args) {
		console.log('数组数据改变了');
		oldMethod.call(this, ...args)
	}
})

// const originArray = Array.prototype
// const vueArray = Object.create(originArray)

// 改写数组
// vueArray.push = () => {}
// 通过原型链调用
// data.__proto__ = vueArray

proxyData.arr.push(5) // 数组数据改变了
proxyData.arr.length = 2 // vue 无法处理
// 索引也无法处理
```

## 依赖收集

```html
<!DOCTYPE html>
<html lang="en">

<body>
  <div id="app"></div>
  <button id="btn"> + </button>

  <script>
    const el = document.querySelector('#app')

    const data = { num: 0 }

    // 渲染页面，死数据
    // el.innerHTML = `<h1>${data.num}</h1>`

    let target

    function reactive(data) {
      for (let [k, v] of Object.entries(data)) {
        let dep = []
        if (typeof v === 'object' && v !== null) reactive(v)
        Object.defineProperty(data, k, {
          get() {
            // 发生取值操作就会把依赖值的函数传入 dep 中
            target && dep.push(target)
            return v
          },
          set(newV) {
            if (typeof newV === 'object' && newV !== null) reactive(newV)
            v = newV
            dep.forEach(watcher => watcher())
          }
        })
      }
      return data
    }

    // 响应式数据
    const vmData = reactive(data)

    const watcher = (fn) => {
      target = fn
      fn()
      target = null
    }

    // 期望响应式数据变化页面重新渲染，定义一个监控函数，数据一变化就执行页面重新渲染
    // 第一次 watcher 执行，fn依次执行，并且把 fn 都订阅到 dep 中
    watcher(() => {
      el.innerHTML = `<h1>${vmData.num}</h1>`
    })

    watcher(() => {
      console.log(`当前 num 的值${vmData.num}`)
    })

    const btn = document.querySelector('#btn')

    // 用户点击 数据发生变化，fn 再次依次执行
    btn.addEventListener('click', () => {
      vmData.num++
    })

  </script>
</body>

</html>
```

## 更新粒度

### vue 有了数据响应式，为何还要 diff

**粒度过细的依赖收集会更占用内存**，虚拟 `DOM` 的 `Diff` 是 `CPU` 密集型运算，占用内存更少，跟依赖收集可正交使用，比如哪个组件触发了 `Getter/Setter` 就 `Diff` 哪个子组件（DOM 树是一种典型的分形结构），此处跟 `React` 加入 `ShouldUpdateComponent` 的跳过子组件 `Diff` 相似或者说正好相反。

`Vue` 的策略就是靠依赖追踪让组件自然成为更新的 `boundary`，这样就确保了**永远只触发必要的组件更新**，在组件内部则是 `vdom diff`，因为实际场景下一个或几个组件的 `diff` 几乎一定足够快。这样通过些微的性能来保留全局状态和 `vdom` 的好处。

`vdom` 另一个好处是在写纯逻辑组件的时候可以降级到手写 `render function`，获得 `js` 的灵活性。

> Virtual DOM 不快，只是避免了重大性能损失，`Model` 和 `View` 的分离导致 `Diff` 本身都不能达到最高效率，`Virtual DOM` 的根本目的只是希望以声明式设计简化乱七八糟的浏览器环境，简化开发。

### defineProperty 升级到 Proxy

框架实现依赖收集的代码量更少，`defineProperty` 以属性为维度，后者以对象为维度，同时也无需 `hack` 数组之类。以对象为维度意味着没有那么多 `G/S`，内存占用自然也少

> 手动操作 `DOM` 永远是最快的，性能最好的。任何一个项目，如果手动去优化，性能都可以提高很多，但是得不偿失

### 响应式更新
<!-- 异步更新，同一个 watcher 会去重，渲染节流，同一个组件的不同属性也是同一个 watcher，多次调用同一属性的 set 等于同一个 watcher 会进入更新队列 -->
任何⼀个 `Vue Component` 都有⼀个与之对应的 `Watcher` 实例

`Vue` 的 `data` 上的属性会被添加 `getter` 和 `setter` 属性
<!-- render函数执行，渲染页面 -->
当 `Vue Component render` 函数被执⾏的时候，`data` 上会被触碰(touch)，即被读，`getter` ⽅法会被调⽤，此时 `Vue` 会去记录此 `Vue component` 所依赖的所有 `data`(这⼀过程被称为依赖收集)
<!-- 包括依赖父组件 props 的子组件也会更新，更新组件是通过 dom diff 更新的，依赖收集仅提供通知作用 -->
`data` 被改动时(主要是⽤户操作)，`setter` ⽅法会被调⽤，此时 `Vue` 会**去通知所有依赖于此 `data` 的组件**去调⽤他们的 `render` 函数进⾏更新

![](../../Images/vue.png)

### Vue 的更新粒度

#### Vue 的组件更新是精确到组件本身的

假设组件是这样的：

```js
<ul>
  <component>1</component>
  <component>2</component>
  <component>3</component>
<ul>
```

那么在 `diff` 的过程中，只会对 `component` 上声明的 `props`、`listeners` 等属性进行更新，而不会深入到子组件内部进行更新。

> 注意：不会深入到组件内部进行更新！

假设组件是这样的

```js
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
<ul>
```

会对于 `ul` 中的三个 `li` 子节点 `vnode` 利用 `diff` 算法来更新

#### props 的更新触发重渲染

如果不会递归的去对子组件更新，如果我们把 `msg` 这个响应式元素通过 `props` 传给 `ChildComponent`，此时它怎么更新呢？

在组件初始化 `props` 的时候，就实现了对于 `props` 上字段变更的劫持。也就是变成了响应式数据，所以只要 `ChildComponent` 在模板里也读取了这个属性，自然也能精确的收集到依赖。

#### vm.$forceUpdate

`vm.$forceUpdate`：迫使 `Vue` 实例重新渲染。

> 注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

`vm.$forceUpdate` 本质上就是触发了渲染 `watcher` 的重新执行，和你去修改一个响应式的属性触发更新的原理是一模一样的，它只是帮你调用了 `vm._watcher.update()`，不会触发 `props` 的重渲染

## API

### Vue.extend

使用基础 `Vue` 构造器，创建一个“子类”构造函数。参数是一个包含组件选项的对象。

`Vue` 中组件除根实例以外都是 `Vue.extend({...vue选项})` 构造函数的实例

```js
// 它没有 $parent, $root 指向自己
const UserExtend = Vue.extend()
const extend = new UserExtend({
  name: 'extend',
  el: '.app',
  mounted(){ 
    console.log(this.$root, this.$parent)
  }, 
  render(h) {
    return h('h1', {}, 'hello world')
  }
})
// el 会挂载到 dom 节点中，会替换 $el 和 vue 初始化一样
```

每个 `Vue` 组件都是 `Vue.extend()` 的实例，每个 `Vue` 组件中的 `this` 都不一样（排除同一组件复用情况）

同一组件代表同一实例，实例属性如果是引用类型就会有问题，所以 `data` 必须是函数，因此每个实例可以维护一份被返回对象的独立的拷贝。这样才能完成同一组件的复用。类似 `<component1></component1><component1></component1>`

### Vue.component

注册或获取全局组件。注册还会自动使用给定的 `id` 设置组件的名称

```js
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')
```

### Vue.use

安装 `Vue.js` 插件。如果插件是一个对象，必须提供 `install` 方法。如果插件是一个函数，它会被作为 `install` 方法。`install` 方法调用时，会将 `Vue` 作为参数传入。

该方法需要在调用 `new Vue()` 之前被调用。

当 `install` 方法被同一个插件多次调用，插件将只会被安装一次。

### Vue.mixin

全局注册一个混入，影响注册之后所有创建的每个 `Vue` 实例。插件作者可以使用混入，向组件注入自定义的行为。

### 函数式组件

使组件无状态 (没有 data) 和无实例 (没有 this 上下文)。他们用一个简单的 `render` 函数返回虚拟节点使它们渲染的代价更小。

```js
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})
```

在 `2.5.0` 及以上版本中，如果你使用了单文件组件，那么基于模板的函数式组件可以这样声明：

```html
<template functional>
</template>
```

组件需要的一切都是通过 `context` 参数传递，它是一个包括如下字段的对象：

- `props`：提供所有 `prop` 的对象
- `children`：`VNode` 子节点的数组
- `slots`：一个函数，返回了包含所有插槽的对象
- `scopedSlots`：(2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
- `data`：传递给组件的整个数据对象，作为 `createElement` 的第二个参数传入组件
- `parent`：对父组件的引用
- `listeners：(2.3.0+)` 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 `data.on` 的一个别名。
- `injections：(2.3.0+)` 如果使用了 `inject` 选项，则该对象包含了应当被注入的 `property`。

在添加 `functional: true` 之后，需要更新我们的锚点标题组件的渲染函数，为其增加 `context` 参数，并将 `this.$slots.default` 更新为 `context.children`，然后将 `this.level` 更新为 `context.props.level`。

## 其他

### nextTick

在下次 `DOM` 更新循环结束之后执行延迟回调。`nextTick` 主要使用了宏任务和微任务。根据执行环境分别尝试采用

- Promise
- MutationObserver
- setImmediate

如果以上都不行则采用 setTimeout

定义了一个异步方法，多次调用 `nextTick` 会将方法存入队列中，通过这个异步方法清空当前队列。

本质上在同步渲染 watcher 结束，同步渲染页面结束后的微任务中执行

### v-if 和 v-for 能不能一起使用

`v-for` 指令的优先级要高于 `v-if`（编译原因），当处于同一节点时候，意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中，所以应该尽量避免 `v-for` 和 `v-if` 在同一节点

### v-if 和 v-show 的区别

`v-if` 是真正的条件渲染
1. 因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被**销毁和重建**
2. 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 `CSS` 的 `display: none` 属性进行切换。

所以，`v-if` 适用于在运行时很少改变条件，不需要频繁切换条件的场景；`v-show` 则适用于需要非常频繁切换条件的场景。

### 递归组件

组件是可以在它们自己的模板中调用自身的。不过它们只能通过 `name` 选项来做这件事。首先我们要知道，既然是递归组件，那么一定要有一个结束的条件，否则就会使用组件循环引用，最终出现 `“max stack size exceeded”` 的错误，也就是栈溢出。那么，我们可以使用 `v-if="false"` 作为递归组件的结束条件。当遇到 `v-if` 为 `false` 时，组件将不会再进行渲染

### watch、computed 和 methods

- `methods` 是一个方法，它可以接受参数，写在 `{{fn()}}` 中本质上相当于渲染 `watcher` 每次页面刷新都会执行

- `watch` 用户自定义 `watcher`，接受三个参数 `handler` 函数、`deep` 是否深度、`immeditate` 是否立即执行，通过 `this.$watch` 调用，需要手动销毁 `unwatch = this.$watch(); unwatch()`

- `computed` 初始化页面时会执行一次，然后缓存，计算属性执行在组件 `mounted` 之前（渲染 watcher）执行 `create` 之后执行，方便处理数据

- 执行顺序：`用户 watcher >>> computed >>> 渲染 watcher`

## 生命周期

![](../../Images/vue_life.png)

## 组件通信
<!-- 组件的调用顺序都是先父后子,渲染完成的顺序是先子后父 -->
## SPA

`SPA`（ single-page application ）仅在 `Web` 页面初始化时加载相应的 `HTML`、`JavaScript` 和 `CSS`。一旦页面加载完成，`SPA` 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 `HTML` 内容的变换，`UI` 与用户的交互，避免页面的重新加载。

优点：

- 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染；
- 基于上面一点，`SPA` 相对对服务器压力小；
- 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理；

缺点：

- 初次加载耗时多：为实现单页 `Web` 应用功能及显示效果，需要在加载页面的时候将 `JavaScript`、`CSS` 统一加载，部分页面按需加载；
- 前进后退路由管理：由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理；
- `SEO` 难度较大：由于所有的内容都在一个页面中动态替换显示，所以在 `SEO` 上其有着天然的弱势。

## Vuex

```js
let Vue
const install = (_Vue) => {
  Vue = _Vue
  Vue.mixin({
    beforeCreate() {
      console.log('当前组件实例', this);
      // 组件执行顺序 先父后子, mounted 先子后父
      if (this.$options.store) {
        this.$store = this.$options.store
      } else {
        // 一层一层往下赋值 $store
        this.$store = this.$parent && this.$parent.$store
      }
    },
  })
}

class Store {
  constructor(options) {
    // 这一步是把 store 中数据变成响应式数据
    this.vm = new Vue({
      data: {
        state: options.state
      }
    })
  }

  get state() {
    // 写在这是为了这边可以多做操作
    return this.vm.state
  }
}

export default {install, Store}
```

```js
// 导出 Vuex 中必须要有 install 函数
import Vuex from './vuex'

// 把 Vue 构造函数传入 install 中并执行
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		age: 28
	}
})

new Vue({
	mounted() {
		console.log('vm store', this.$store)
	},
	// 注入根 store 然后根据 $parent 递归 注入子 $store
	store,
	render: h => h(App)
}).$mount('#app')
```

## scoped

### 渲染规则

`scoped` 是通过使用 `PostCSS` 来进行转换，给 `DOM` 节点增加一个 `data-v-xxx` 的唯一属性，再利用 `CSS` 的属性选择器，来达到样式隔离的效果。

```js
<style scoped> 
  .a {
    color: red;
  }
</style>

// 编译后
.a[data-v-xxx] {
    color: red;
}
```

> 使用 `scoped` 后，父组件的样式将不会渗透到子组件中。不过一个子组件的根节点会同时受其父组件的 `scoped CSS` 和子组件的 `scoped CSS` 的影响。这样设计是为了让父组件可以从布局的角度出发，调整其子组件根元素的样式。

所以在使用 `scoped` 属性后，父组件只能修改子组件根节点样式，那么怎样才能修改更深层级的子元素呢？

### 深度作用选择器

深度作用选择器的目的，就是为了修改更深层级的子元素样式。

我们可以使用 `>>>` 操作符

```html
<style scoped> 
  .a >>> .b {
    color: red;
  }
</style>
```
上面代码会被编译为 `.a[data-v-xxx] .b ` 

- 不推荐使用 `/deep/`
- 在 `Sass` 之类的预处理器中使用 `::v-deep`
- 没有预处理器的情况下使用 `>>>`
  
使用上面的操作符，`style` 必须有 `scoped` 属性


<!-- 在React + Redux体系中，数据变更与视图变更之间的过程，就是经过了“精确——不精确——精确”这样的步骤。前一步是简单合并，而且是要改变数据引用的合并，后一步是diff。

任何时候对视图进行修改，都应该造成“整个视图被重新渲染”的效果。其它的方面都是在这个效果的基础上进行的优化，而非破坏这个效果 -->