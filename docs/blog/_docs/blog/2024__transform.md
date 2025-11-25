---
group:
  title: 2024 🐲
  order: -2024
title: 解代码题
# toc: content
order: 2
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

<code src="./_2024__transform/transform1.tsx"></code>

支持一下用户输入：

<code src="./_2024__transform/transform2.tsx"></code>

解题思路：

这道题的核心任务是将扁平化的对象结构转换为嵌套结构。我们需要解决以下几个问题：

1. 按照键名中的点号`.`进行分隔，分隔成不同层级。
2. 根据各层级逐次建立嵌套对象。
3. 合并结果，形成最终结构。

具体步骤如下：

1. 遍历输入对象的每一个键值对。
2. 对于每个键值对:
   - 用点号`.`分隔键名，确定路径。
   - 根据路径逐层建立嵌套对象。
3. 使用递归或者迭代的方法，在构建过程中不断检查并创建新的子对象。
