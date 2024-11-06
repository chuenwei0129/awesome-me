---
title: setState 相同值为何会重新渲染？
group:
  title: 深入探讨
---

# setState 相同值为何会重新渲染？

对于如下组件点击 `button` 3 次，`console.log` 的打印顺序是什么？

```jsx
/**
 * defaultShowCode: true
 */

import React, { useState } from 'react';

function A() {
  console.log(2);
  return null;
}

function App() {
  const [state, setState] = useState(false);
  console.log(1);
  return (
    <>
      <button
        onClick={() => {
          console.log('click');
          setState(true);
        }}
      >
        click the button 3 times
      </button>
      <A />
    </>
  );
}
export default () => <App />;
```

> 前往 [Deeper Dive Into React](https://jser.pro/ddir/quiz/ddir-rq-05-usestate-quirk) 体验交互式答题。

<details><summary><b>点击展示答案</b></summary>

**答案**：

![20240620070429](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240620070429.png)

**缘由**：

当不存在更新时，理论上说是不需要多余的 render，这种优化策略在 React 源码里叫 `eagerState`。这里问题出在 `eagerState` 判断是否存在更新的方式上。

**图解**：

![set-same-state](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/set-same-state.gif)

React 中数据都保存在 fiber 树中，由于双缓存机制，实际存在至少 2 棵 fiber 树。当我们标记 App 组件存在更新，实际是在 App 组件对应 fiber 树中相关的 2 个 fiber 节点中保存 “存在更新” 这一信息的。

当第一次点击，更新完成后，其中一个 fiber 中 “存在更新” 这一信息被抹去，但与他相关的另一个 fiber 中还存在 “存在更新” 这一信息。

当第二次点击时，App 组件还会 render，这一次会把剩下这个 fiber 中的 “存在更新” 信息抹去。这次的 render 只是处理双缓存问题，所以 A 组件的 render 会跳过。

第三次点击时，与 App 组件相关的 2 个 fiber 中都不存在更新，App 组件可以命中 `eagerState`，就不会 render 了。

</details>
