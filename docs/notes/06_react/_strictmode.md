在开发模式下的 Strict Mode 下进行双重渲染时，useMemo 和 useCallback 会在第二次渲染时重用第一次渲染的 memoized 结果。已经与 Strict Mode 兼容的组件不应该注意到行为上的差异。
例如，在开发过程中，严格模式会在初始挂载时双重调用 ref 回调函数，以模拟组件被 Suspense 回退替换时发生的情况。

现在这也意味着所有的 refs 都是可变的。你将不再遇到无法修改 ref 的问题，因为你使用 null 进行了初始化：
