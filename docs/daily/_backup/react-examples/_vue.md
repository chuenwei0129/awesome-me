## 前置知识：Object.defineProperty

ES5 提供了 [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法，该方法可以在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。

**语法：**

```js
Object.defineProperty(obj, prop, descriptor)
```

**参数：**

- **obj:** 要在其上定义属性的对象。
- **prop:** 要定义或修改的属性的名称。
- **descriptor:** 将被定义或修改的属性的描述符。

所有的属性描述符都是非必须的，但是 `descriptor` 这个字段是必须的，如果不进行任何配置，你可以这样：

```js
const obj = Object.defineProperty({}, 'num', {})
console.log(obj.num) // undefined
```

**属性描述符默认配置：**

```js
Object.defineProperty({}, 'key', {
  value: undefined,
  writable: false,
  enumerable: false,
  configurable: false,
  get: undefined,
  set: undefined,
})
```

**值得注意的是：**

属性描述符必须是数据描述符或者存取描述符两种形式之一，不能同时是两者。这就意味着你可以：

```js
Object.defineProperty({}, 'num', {
  value: 1,
  writable: true,
  enumerable: true,
  configurable: true,
})
```

**也可以：**

```js
// 外部变量
let value = 1

Object.defineProperty({}, 'num', {
  get() {
    return value
  },
  set(newValue) {
    value = newValue
  },
  enumerable: true,
  configurable: true,
})
```

**但是不可以：**

```js
// 报错
// TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
Object.defineProperty({}, 'num', {
  value: 1,
  get() {
    // this.value 取不到 value
    return 1
  },
})
```

## 前置知识：数据劫持

```JavaScript
const data = {
  msg: 'hello vue',
  students: {
    name: '张三'
  },
  arr: [1, 2, 3]
}

const reactive = data => {
  for (let [k, v] of Object.entries(data)) {
    // 2. if (typeof v === 'object' && v !== null) reactive(v) 处理对象嵌套
    if (typeof v === 'object' && v !== null) reactive(v)
    Object.defineProperty(data, k, {
      get() {
        console.log(`属性 ${k} 被读取`)
        // 此处可以做一些对代理前的值做一些个性化处理
        // v = v + '123'
        return v
      },
      set(newVal) {
        // 3. if (typeof newV === 'object' && newV !== null) reactive(newV) 对象嵌套，监听的对象重新赋值为新的对象
        if (typeof newVal === 'object' && newVal !== null) reactive(newVal)
        console.log(`属性 ${k} 数据发生改变，原值为：${v}，新值为：${newVal}`)
        v = newVal
      }
    })
  }
  return data
}

const reactiveData = reactive(data)

// 1. 对象无嵌套
reactiveData.msg = 'hello world'

// 2. 对象嵌套
reactiveData.students.name = '李四'

// 3. 属性重新赋值为新的对象
reactiveData.students = {
  name: '王五'
}

// 读
console.log(reactiveData.students.name)

// 4. 给 reactiveData 添加新的属性
// 无法监听
reactiveData.newProp = '新属性'
reactiveData.newProp = '改变新属性'

// 5. 劫持数组方法
const arrMethods = ['push', 'shift', 'unshift']
// 函数劫持，批量重写数组常用方法
arrMethods.forEach(method => {
  // 保存原方法
  const oldMethod = Array.prototype[method]
  // 重写原型方法
  Array.prototype[method] = function (...args) {
    console.log(`数组 ${method} 方法被调用`)
    oldMethod.call(this, ...args)
  }
})

// 数组 push 方法被调用
reactiveData.arr.push(4)

// 对数组其它特性有点奇怪
// 监听定义部份，表现如对象
// 属性 2 数据发生改变，原值为：3，新值为：2
reactiveData.arr[2] = 2
// 没监听到
reactiveData.arr.length = 5
// 没监听到
reactiveData.arr[4] = 2
```

## 前置知识：观察者模式

> 发布订阅模式

## 核心逻辑：响应式原理

> 同样使用 live-server 测试

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <div id="app"></div>
    <button id="btn">+</button>

    <script>
      const el = document.querySelector('#app')
      const data = { num: 0 }

      let target

      function reactive(data) {
        for (let [k, v] of Object.entries(data)) {
          let dep = []
          if (typeof v === 'object' && v !== null) reactive(v)
          Object.defineProperty(data, k, {
            get() {
              target && dep.push(target)
              return v
            },
            set(newV) {
              if (typeof newV === 'object' && newV !== null) reactive(newV)
              v = newV
              dep.forEach((watcher) => watcher())
            },
          })
        }
        return data
      }

      // Vue 的 data 上的属性会被添加 getter 和 setter 属性
      const vmData = reactive(data)

      const watcher = (fn) => {
        target = fn
        fn()
        target = null
      }

      // 当 Vue Component render 函数被执⾏的时候，data 上会被触碰(touch)，即被读，getter ⽅法会被调⽤，此时 Vue 会去记录此 Vue component 所依赖的所有 data(这⼀过程被称为依赖收集)
      // render 会执行 10 次，渲染 10 次显然不合理，vue 通过 nextTick 解决
      const render = () => {
        el.innerHTML = `<h1>${vmData.num}</h1>`
      }

      // watcher 立即执行
      // 任何⼀个 Vue Component 都有⼀个与之对应的 Watcher 实例
      watcher(render)

      watcher(() => {
        console.log(`当前 num 的值：${vmData.num}`)
      })

      const btn = document.querySelector('#btn')

      btn.addEventListener('click', () => {
        // data 被改动时(主要是⽤户操作)，setter ⽅法会被调⽤，此时 Vue 会 **去通知所有依赖于此 data 的组件（包括依赖父组件 props 的子组件）** 去调⽤他们的 render 函数进⾏更新 ==> dep.forEach(watcher => watcher())
        for (let i = 0; i < 10; i++) {
          vmData.num++
        }
      })
    </script>
  </body>
</html>
```

## 模板替换：首次渲染

```JavaScript
const complierUtils = {
  // 获取 student.name 的值
  getValue(vm, expr) {
    return expr.split('.').reduce((data, cur) => {
      // vm.$data.student.name
      return data[cur]
    }, vm.$data)
  },

  model(node, expr, vm) {
    // TODO: 双向绑定
  },

  updater: {
    textUpdater(node, value) {
      node.textContent = value
    }
  },

  // 文本替换
  text(node, expr, vm) {
    const operator = this.updater.textUpdater
    // 把数据插入节点中，替换 {{}}
    const value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getValue(vm, args[1])
    })
    operator(node, value)
  },

  // 处理事件
  on(node, expr, vm, eventName) {
    node.addEventListener(eventName, function (e) {
      // 也是为了解决 methods this 指向问题
      // this.reverseTitle()
      vm[expr].call(vm, e)
    })
  }
}

class Vue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    this.computed = options.computed
    this.methods = options.methods

    // 把计算属性 msg 放到 data 上
    // vm.$data.msg 等同于 vm.computed.msg()
    for (const key in this.computed) {
      Object.defineProperty(this.$data, key, {
        get: () => {
          // 不用箭头函数 this === this.$data 用箭头函数 this === vm
          // 这里 call(this) 是为了让 msg 调用时内部 this 指向 vm 而不是 vm.computed
          return this.computed[key].call(this)
        }
      })
    }

    // vue 为了用户体验，把 methods 放到 vm 上
    for (const key in this.methods) {
      Object.defineProperty(this, key, {
        get: () => {
          return this.methods[key]
        }
      })
    }

    // vue 为了用户体验，把数据放到 vm 中
    for (const key in this.$data) {
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key]
        },
        set(newVal) {
          this.$data[key] = newVal
        }
      })
    }

    // 模板编译
    if (this.$el) {
      new Complier(this.$el, this)
    }
  }
}

class Complier {
  constructor(el, vm) {
    // 判断是否元素节点，对应 vue 中传 el: document.querySelector('#app')
    // 最终表示的是 <div id="app">....</div> 真实 dom
    this.el = el.nodeType === 1 ? el : document.querySelector(el)
    this.vm = vm
    // 为了性能 dom 节点转换成 fragment 操作
    // 只转换了所有子节点
    const fragment = this.node2fragment(this.el)
    // 编译，其时就是把 vue 自定义的内容如 {{}} 替换成 this.$data 中的值
    this.complierNode(fragment)
    // // 挂载 dom
    this.el.appendChild(fragment)
  }

  node2fragment(node) {
    // 创建一个文档碎片，内存中的 dom
    const fragment = document.createDocumentFragment()
    let _firstChild
    while ((_firstChild = node.firstChild)) {
      fragment.appendChild(_firstChild)
    }
    return fragment
  }

  // 编译节点
  complierNode(node) {
    ;[...node.childNodes].forEach(child => {
      if (child.nodeType === 1) {
        // 元素节点
        this.complierElement(child)
        // 递归处理子节点
        this.complierNode(child)
      } else {
        // 文本节点
        this.complierText(child)
      }
    })
  }

  // 编译元素: 处理属性
  // 指令处理
  complierElement(node) {
    ;[...node.attributes].forEach(attr => {
      const { name, value: expr } = attr
      if (this.isDirective(name)) {
        const [, directive] = name.split('-')
        // 事件 v-on:click="reverseTitle" eventName = click
        // v-model="student.name" eventName = undefined
        const [directiveName, eventName] = directive.split(':')
        complierUtils[directiveName](node, expr, this.vm, eventName)
      }
    })
  }

  // 编译文本: {{}}
  complierText(node) {
    const content = node.textContent
    // 找出 {{}}
    if (/\{\{(.+?)\}\}/.test(content)) {
      complierUtils.text(node, content, this.vm)
    }
  }

  // 指令判断
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
}
```
