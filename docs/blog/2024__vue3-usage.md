---

group:
  title: 2024 🐲
  order: -2024
title: Vue3 实践心得
toc: content
order: -999
---

## 🌟 前情提要

> Vue 的就业机会比 React 多好多啊，Vue 是为了工作，而 React 全凭热爱。

所以，接下来的冒险旅程记录了我和 Vue3 相爱相杀的实践心得。

尽管 React 的心智模型被形容得像是一团糊涂浆糊，但基于我使用 Vue 的经验，Vue 的开发者体验（DX）也并非十全十美。还是有些小缺点让人上头，其中最让我头秃的就是 VSCode 对 Vue TypeScript 的支持简直糟糕透顶。

在 Vue3 项目闭关修炼时，我几乎每天都要点三次 Command + P 重启窗口，感觉自己都快修炼成道长了。每次导入模块时，Intellisense 一没反应，我就知道：又该弹窗重启了！

## 🛠️ 项目初始化：create-vue

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

答：不仅要启用 JSX 支持，还要彻底用 JSX 来编写组件，SFC 说啥都不要用。别误会，不是我对 SFC 有意见，相反，他们棒得不行，性能也顶呱呱。只不过啊，Vue 官方 TS 支持实在是太不给力了。

## 为什么要使用 Pinia？

Pinia 虽然名字听起来像个甜品店，但它本身并没有什么特别，完全可以用全局 reactive 替代。SSR 存在漏洞？幸好我用 Vue 都不上 SSR，避坑最重要！Pinia 的两个魅力点：

1. 在 TypeScript 下简化类型计算（例如 `const token = symbol as InjectionKey<ReturnType<typeof hook>>`）
2. 惰性初始化逻辑：只在真正需要时加载，可以大幅提升调试体验。

总之，Pinia 的好处随手拈来，但别忘了，慎用生命周期，否则小心翻车。

## 我的 Vue3 组件编写方式

Vue3 并没有完全搞掉选项式，“多才多艺”的写法让人眼花缭乱。有的选项式，有的组合式，有的全是 JSX，还有啥 defineComponent JSX、defineComponent 双重返回函数 JSX...简直是个大拼盘！以下就是我的 Vue3 编写秘籍：

```js
import { defineComponent, reactive, ref } from "vue"

// 不用 props 和 emits 的组件
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
        <div style="color: red;">Default Slot: {slots.default?.()}</div>
        <div style="color: blue;">Extra Slot: {slots.extra?.(props.modelValue)}</div>
      </>
    )
  }
})

// 父组件
export default defineComponent(() => {
  const inputValue = ref('')

  const defaultProfile = new UserProfile()
  defaultProfile.username = 'Mr. Rabbit'
  defaultProfile.age = 10
  defaultProfile.traits = ['Characteristic 1', 'Characteristic 2']

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

这样写几乎能实现所有单文件组件的魔法，尤其是插槽，简直爽到飞起。

> 用 JSX 或 TSX 在 Vue 中搞事情是可以的，但要知道，文档基本上罚站中。<https://github.com/vuejs/babel-plugin-jsx> 这篇是唯一的文档，具体玩法得靠自己撸源码探索。

有问题？我来开课答疑！

Q: defineComponent 推荐用选项式 + setup，还是一个函数来搞定？
A: 选项式 + setup，虽然看着复杂，但类型提示更友好。

Q: 为什么 slots 没标注类型？
A: 啊哈，Vue 是 MVVM 框架，slots 主要为了视图组织，纠结类型？想太多！

Q: 为什么 emits 要函数返回 true 再断言函数类型？
A: 保证事件通过验证，不然用 eslint 时会哭。

Q: 对象 props 用 class (上面例子中的 UserProfile) 是啥操作？
A: 因为 Vue 要求这些要有构造器。React 用不变性，Vue 用代理，class 实现更给力，还能避免响应性丢失问题。

Q: 用 TSX 写，所有的 ref 都要 .value 吗？
A: 是的，你都要加 .value，这也是 SFC 相对劣势之一，容易忘记。

Q: TSX 的插槽两种写法（v-slots 和 {{}}）推荐哪种？
A: 哪个顺手用哪个，风格自由。

Q: 这种 TSX 是 Vue 的标准做法吗？
A: 根本不是！SFC 才是 Vue 安排的命中注定，只是 TSX 目前能用，我才出此下策。

## 关于 snippet 提示

请移步我在 Notes/VSCode 里记录的笔记，然后在 VSCode 中自定义上述写法的 snippet 提示。

## 为什么需要生命周期？

最坑爹的莫过于 Vue 的生命周期了。看 Solid 官网，人家都说无需生命周期。

![2024-11-29 17:47:41](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241129174741.png)

## 为什么 Vue 事件需要 emit，而不是直接传递 prop？

用事件响应更像 HTML 的天然直觉。

## watch 的正确打开方式

1. 监控非本组件创建的 ref 或 reactive，必须用函数返回形式的 watch。
2. watch 中别乱整外部生命周期（Vue 全域生命周期调用，真是为了新手友好到极限）。

```js
// 监听源是 ref/reactive
watch(refOrReactive, (val, pre, onCleanUp)=>{})
// 监听多个
watch([ref1, ref2], ([val1, val2],[pre1,pre2],onCleanUp)=>{})
// 监听具体值
watch(()=>simpleTypeValue, (val,pre,onCleanUp)=>{})
watch(()=>[value1, value2], ([val1, val2],[pre1,pre2],onCleanUp)=>{})
```

## 疯狂提醒：[跨请求状态污染](https://cn.vuejs.org/guide/scaling-up/ssr#cross-request-state-pollution)

> 内容如下：然而，在 SSR 环境下，应用模块通常只在服务器启动时初始化一次。同一个应用模块会在多个服务器请求之间被复用，而我们的单例状态对象也一样。如果我们用单个用户特定的数据对共享的单例状态进行修改，那么这个状态可能会意外地泄露给另一个用户的请求。我们把这种情况称为跨请求状态污染。

## 尾声

最近研读 ant 和 naive ui 源码，逐渐摆脱纠结症。适合团队就是王道。我自己项目中用 .tsx 来开发公共组件，业务则混用 .vue + setup + 部分 TSX。不需要高法术灵活度的地方，统一使用 template，并且所有代码都写成 TypeScript，眼下来看效果很好。

## 进阶提高班

- [Vue3 中 watch 与 watchEffect 的差别](https://www.zhihu.com/question/462378193/answer/1916657458)
- [Vue 的加载网络组件实战（远程组件）](https://www.zhihu.com/question/65238528/answers/updated)
- [computed 与 v-model](https://www.bilibili.com/video/BV1H5411z7KJ)
- [Vue3 里的 EffectScope 怎么理解？](https://www.zhihu.com/question/508610957/answer/2592195517)

---

以上就是我和 Vue3 一同滚打摸爬的酸甜苦辣，希望你笑着看到最后。Happy coding! 🎉
