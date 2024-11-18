---
group:
  title: 2024 🐲
  order: -2024
title: 面试准备
toc: content
order: -1
---

## 实现 transform 函数

```js
function transform(obj) {
  return; //....
}

transform({
  'A': 1,
  'B.C': 2,
  'B.D.E': 3,
  'CC.DD.EE': 4,
});
```

得到：

```js
const result = {
  A: 1,
  B: {
    C: 2,
    D: {
      E: 3,
    },
  },
  CC: {
    DD: {
      EE: 4,
    },
  },
};
```

展开代码，查看 transform 函数的实现：

<code src="./_2024__interview/transform1.tsx"></code>

支持一下用户输入：

<code src="./_2024__interview/transform2.tsx"></code>

## 数组转换成树状结构


