---
title: 闭包陷阱
toc: content
group:
  title: 深入探讨
---

先来看一个例子：

```jsx | pure
import { useState, useEffect } from 'react';

export default () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      console.log('setInterval:', count);
    }, 1000);
  }, []);

  return (
    <div>
      count: {count}
      <br />
      <button onClick={() => setCount(val => val + 1)}>增加 1</button>
    </div>
  );
};
```

当我点击按钮的时候，发现 setInterval 中打印出来的值并没有发生变化，始终都是 0。这就是 React 的闭包问题。

解析：

它第一次执行的时候，执行 useState，count 为 0。执行 useEffect，执行其回调中的逻辑，启动定时器 `setInterval: 0` ，每隔 1s 输出 0 。

当我点击按钮使 `count` 增加 1 的时候，整个函数式组件重新渲染，这个时候前一个执行的链表已经存在了。useState 将 Hook 对象上保存的状态置为 1， 那么此时 count 也为 1 了。执行 useEffect，其依赖项为空，不执行回调函数。但是之前的回调函数还是在的，它还是会每隔 1s 执行 `console.log("setInterval:", count);`，**但这里的 count 是之前第一次执行时候的 count 值，因为在定时器的回调函数里面被引用了，形成了闭包一直被保存**。
