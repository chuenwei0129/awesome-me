# React 文档摆烂不是一天两天了

> 别问，问就是程序员最擅长写文档

## React Hooks

- [React useEvent RFC](https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md)
- [精读 useEffect 完全指南](https://zhuanlan.zhihu.com/p/60277120)
- [React 新文档：不要滥用 Ref 哦～](https://zhuanlan.zhihu.com/p/529491295)
- [React Hooks 使用误区，驳官方文档](https://zhuanlan.zhihu.com/p/450513902)
- [如何看待《React Hooks 使用误区，驳官方文档》？](https://www.zhihu.com/question/508780830/answer/2486581940)
- [React 18 全览](https://zhuanlan.zhihu.com/p/500072933)
- [在 React18 中请求数据的正确姿势](https://zhuanlan.zhihu.com/p/536624672)
- [React 18 对 Hooks 的影响](https://zhuanlan.zhihu.com/p/490929650)
- [React 推荐函数组件是纯函数，但是组件有状态就不可能是纯函数，怎么理解有状态的纯函数？](https://www.zhihu.com/question/537538929)

## React + Typescript

- [🔖TypeScript 备忘录：如何在 React 中完美运用？](https://juejin.cn/post/6910863689260204039)
- [Upgrading to React 18 with TypeScript](https://blog.logrocket.com/upgrading-react-18-typescript/)
- [React + TypeScript 常用类型汇总](https://mp.weixin.qq.com/s?__biz=Mzg3ODAyNDI0OQ==&mid=2247489283&idx=1&sn=2b49af5b171398db1821237ba1551ad1&chksm=cf1b5455f86cdd433210a386c1ae528e8a580fb4ce4931f83baa900205bc00caa63dfa369950&scene=178&cur_album_id=1791658055365935110#rd)

## React 生态

- [React Native](https://reactnative.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [React Query](https://tanstack.com/query/v4/docs/overview)
- [React Table](https://tanstack.com/table/v8/docs/guide/introduction)

## 教程

- [可访问的 React 表单](https://www.carlrippon.com/accessible-react-forms/)

<!-- 顺序是父组件render>子组件render> 子组件useLayoutEffect>父组件useLayoutEffect>子组件useEffect>父组件useEffect

假如父组件 有 logCount 函数，使用 useLayoutEffect 版本的 useEvent 包裹，传给子组件作为 props ，则 子组件render 阶段 和 子组件useLayoutEffect 阶段因为执行在父组件 useLayoutEffect 之前， 这两个阶段子组件从props里读取的 logCount 函数不符合预期，是旧的。但因为是引用，所以当父组件 useLayoutEffect 执行完后，子组件 props里的 logCount 就符合预期了。这一点我认为不常见，但的确会有，只是答主表达的比较隐晦，难以get到。

而答主后文的意思是，需要有新hooks执行时机，保持在render之后，且先父组件后子组件执行。插入于原顺序为：父组件render>父组件新hooks>子组件render>子组件新hooks> 子组件useLayoutEffect>父组件useLayoutEffect 。。。 顺序执行 -->
