---

group:
  title: 2024 🐲
  order: -2024
title: Vue3 实践心得
toc: content
order: -99
---

Vue 的就业机会比 React 更多

> Vue 是为了工作，而 React 全凭热爱。

在此记录我的 Vue3 实践经验

尽管许多人认为 React 的心智模型复杂且难以掌握，但就我以往使用 Vue 的经验，Vue 的开发者体验（DX）远不如 React。虽然 Vue 的 DX 不算差，但确实令人烦恼。

首先是 VSCode 对 Vue TypeScript 支持的糟糕表现。

在编写 Vue3 项目时，我几乎每天都需要按下 Command + P 并重启窗口三次以上。每当我导入一个模块但 Intellisense 无法自动提示和补全时，我就知道需要重新加载 VSCode 窗口了。

## 项目初始化：create-vue

```js
pnpm create vue
?请输入项目名称： > 项目的名字
?是否使用 Typescript 语法？ > 是
?是否启用 JSX 支持？ > 是
?是否引入 Vue Router 进行单页面应用开发？ > 是
?是否引入 Pinia 用于状态管理 > 是
?是否引入 Vitest 用于单元测试 > 是(推荐)
?是否要引入一款端到端测试工具？ > 否
?是否引入 ESLint 用于代码质量检测？ > 是
?是否引入 Prettier 用户代码格式化? > 是
?是否引入 Vue DevTools 7 扩展用于调试？ > 是
```

## 为什么要启用 JSX 支持？

答：不仅要启用 JSX 支持，开发时还应彻底使用 JSX 来编写组件，而不是单文件组件（SFC）。请不要误会，这并非因为 SFC 存在问题。SFC 非常优秀，甚至能更好地利用编译并提升性能。但原因只有一个——Vue Official TS 支持不够理想。

## 为什么要使用 Pinia？

Pinia 本身并没有特别之处，完全可以使用全局 reactive 进行替代。尽管 SSR 存在漏洞（幸运的是我使用 Vue 根本不涉及 SSR），在入口组件中初始化 reactive 配合依赖注入也能解决这个问题。

Pinia 具有以下优势：

1. 在 TypeScript 下简化类型计算

   让代码更简洁（例如 `const token = symbol as InjectionKey<ReturnType<typeof hook>>`）

2. 惰性初始化逻辑：初始化代码（例如 `localStorage.get('token')`）在应用启动时不运行，只在首次使用 store 的组件中初始化。这一特性配合开发工具，可显著简化业务调试。

总之，Pinia 的优势显而易见，而劣势在于生命周期的谨慎使用。但在其他方面，Pinia 的开发与普通 hook 没有任何区别。

## 我的 Vue3 组件编写方式

由于 Vue3 并没有完全废弃选项式，因此还未出现一种固定且功能完善的写法（template SFC 缺少模板引用变量，无法替代 JSX 的编程能力）。目前常见的写法包括选项式、组合式、JSX render、defineComponent JSX 和 defineComponent 双重返回函数 JSX 五种。

以下是我在 Vue3 中完整的实践方案：

```js
import { defineComponent, reactive, ref } from "vue"

// 不使用 props 和 emits 的组件
// const TextInput = defineComponent(() => {
//   const inputText = ref('')
//   return () => <input v-model={inputText.value} />
// })

// 使用 props 和 emits 的组件
class UserProfile {
  username = ''
  age = 0
  traits: string[] = []
}

// 子组件
const UserDetail = defineComponent({
  expose: [],
  props: {
    profile: {
      type: UserProfile,
      default: new UserProfile()
    },
    modelValue: {
      type: String,
      default: ''
    },
  },
  emits: {
    'update:modelValue': (() => true) as (value: string) => void
  },
  setup(props, { emit, slots }) {

    // 静态节点
    const header = <h1>Welcome to User Management</h1>

    return () => (
      <>
        {header}
        <input
          value={props.modelValue}
          onInput={(e) => {
            const val = (e.target as HTMLInputElement).value
            emit('update:modelValue', val)
          }}
        />
        <p>Username: {props.profile.username}</p>
        <p>Age: {props.profile.age}</p>
        {props.profile.traits.map((trait, index) => (
          <p key={index}>{trait}</p>
        ))}
        <div style="color: red;">
          Default Slot:
          {slots.default?.()}
        </div>
        <div style="color: blue;">
          Extra Slot:
          {slots.extra?.(props.modelValue)}
        </div>
      </>
    )
  }
})

// 父组件
export default defineComponent(() => {
  const inputValue = ref('')

  // 初始化默认的 UserProfile 对象，用于重置
  const defaultProfile = new UserProfile()
  defaultProfile.username = 'Mr. Rabbit'
  defaultProfile.age = 10
  defaultProfile.traits = ['Characteristic 1', 'Characteristic 2']

  // 初始化 userProfile
  const userProfile = reactive(defaultProfile)

  const resetUser = () => {
    inputValue.value = ''
    Object.assign(userProfile, defaultProfile)
  }

  return () => (
    <div>
      <button onClick={resetUser}>Reset User</button>
      <UserDetail
        v-model={inputValue.value}
        profile={userProfile}
        v-slots={{
          extra: (content: string) => <div>Additional Info: {content}</div>
        }}
      >
        <div>This is the default slot content.</div>
      </UserDetail>
      {/* TSX 的插槽两种写法（v-slots 和 {{}}) */}
      <UserDetail v-model={inputValue.value} profile={userProfile}>
        {{
          default: () => <div>This is the default slot content.</div>,
          extra: (content: string) => <div>Additional Info: {content}</div>
        }}
      </UserDetail>
    </div>
  )
})
```

这种方法实现了几乎所有的单文件组件功能，特别是在插槽上更为直观。

> 尽管在 Vue 中使用 JSX 或 TSX 是可行的，但这带来了一些问题：缺乏文档支持。<https://github.com/vuejs/babel-plugin-jsx> 仅有一篇文章，具体用法需要查看源码类型声明，例如直接传递 setup 的 defineComponent 写法（这种写法无法识别 v-model，因为这是 ts 的问题）。

问：defineComponent 推荐使用选项式 + setup，还是单纯一个函数的 setup 风格（export default，更有甚者实际上 ()=>()=>jsx 就能声明 vue 组件）？

答：选项式 + setup，因为后者在功能上没有问题，但类型提示很差。在没有 props，emits，expose，v-model 的情况下，也可以使用后者。

问：为什么 slot 没有标注类型？

答：Vue 是 MVVM 框架，而 slots 主要用于视图组织，没必要纠结于这一点。

问：为什么 emits 声明一个函数，返回 true，再断言一个函数类型？

答：返回 true 代表事件通过验证，断言函数类型是因为有参数但不使用时会触发 eslint（unused local），导致无法直接利用类型推断。

问：为什么对象 props 要用 class（上例 Profile）？

答：首先因为 props 声明需要构造器。Vue 与 React 不同，它通过 Proxy 生成代理，而 React 追求不变性的纯变更（immutable）。使用 class 声明数据不仅可行，还能避免许多响应性丢失问题。

问：TSX 写法中，所有 ref 都要 .value 吗？

答：是的，都需要 .value，这也是单文件组件的劣势之一：依赖注入或外部的 ref 无法自动 .value，在没有 ts 提示的情况下很难知道是否需要 .value，而在 ts 提示正常时编辑器又基本不可用。

问：TSX 的插槽两种写法（v-slots 和 {{}}）中，推荐哪种？

答：无所谓，习惯哪种用哪种。

问：这种 TSX 是 Vue 的最佳实践吗？

答：绝不是！单文件组件一直是 Vue 的绝对标准，采用 TSX 仅是因为其实际可用，而目前单文件组件不可行。

## 关于 snippet 提示

请参考本站 VSCode 中的笔记，自定义上述写法的 snippet 提示。

## 为什么需要生命周期？

我最不能理解的是生命周期。Solid 官网明确指出无需生命周期，为简单功能快速实现不情愿地提供了个 onMount。

![2024-11-29 17:47:41](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241129174741.png)

## 为什么 Vue 事件需要 emit，而不是直接传递 prop？

答：事件的处理方式更符合 HTML 的逻辑。

## watch 的使用规范

1. 对于非本组件创建的 ref 或 reactive，watch 必须以函数返回的形式使用。
2. watch 中不应调用外部的 onUnMount 等生命周期（Vue 在任何位置都可以调用生命周期，这是为了照顾新手）。

```js
// 监听源是 ref/reactive
watch(refOrReactive, (val, pre, onCleanUp)=>{})
// 监听多个
watch([ref1, ref2], ([val1, val2],[pre1,pre2],onCleanUp)=>{})
// 监听具体值
watch(()=>simpleTypeValue, (val,pre,onCleanUp)=>{})
watch(()=>[value1, value2], ([val1, val2],[pre1,pre2],onCleanUp)=>{})
```

## 补充：[跨请求状态污染](https://cn.vuejs.org/guide/scaling-up/ssr#cross-request-state-pollution)

> 内容如下：然而，在 SSR 环境下，应用模块通常只在服务器启动时初始化一次。同一个应用模块会在多个服务器请求之间被复用，而我们的单例状态对象也一样。如果我们用单个用户特定的数据对共享的单例状态进行修改，那么这个状态可能会意外地泄露给另一个用户的请求。我们把这种情况称为跨请求状态污染。

## 最后

最近我研究了 ant 和 naive ui 的源码，得到了一些新认识。现在不再纠结哪一种更好，只要适合团队即可。在自己的项目中，我使用 .tsx 来开发公共组件，业务开发则采用 .vue + setup + 部分 tsx。对于没有灵活度要求的业务，我统一使用 template，并全部上 typescript，目前感觉效果不错。

## 提高班

- [Vue3 中 watch 与 watchEffect 的区别是什么？](https://www.zhihu.com/question/462378193/answer/1916657458)
- [Vue 怎么实现加载网络组件（远程组件）？](https://www.zhihu.com/question/65238528/answers/updated)
- [computed 与 v-model](https://www.bilibili.com/video/BV1H5411z7KJ)
- [如何理解 Vue3 里的 EffectScope?](https://www.zhihu.com/question/508610957/answer/2592195517)
