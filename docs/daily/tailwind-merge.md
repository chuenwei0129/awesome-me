---
title: tailwind-merge
toc: content
---

## 什么是 tailwind-merge？

[tailwind-merge](https://github.com/dcastil/tailwind-merge) 是一个用于合并和去重 Tailwind CSS 类名的库。它可以智能地合并类名字符串，并自动处理冲突的类名，保证最终的类名字符串既精简又不会因为类名冲突导致样式出现问题。

## 为什么需要 tailwind-merge？

在没有 tailwind-merge 的情况下，如果我们直接将传入的类名与组件的默认类名字符串拼接，可能会遇到一些问题。例如，如果有相互冲突的样式（如不同的内边距设置），直接拼接可能会导致两个相冲突的类名同时存在，从而使得最终的样式表现不是我们预期的那样。

举个例子：

```jsx
/**
 * defaultShowCode: true
 */
import React from 'react';

const MyInput = (props) => {
  const className = `border rounded px-[20px] py-[20px] ${
    props.className || ''
  }`;

  return <input {...props} className={className}></input>;
};

export default function page() {
  return <MyInput className="p-[5px]" />;
}
```

如上述代码所示，我们有一个 `MyInput` 组件，该组件有默认的内边距样式 `px-[20px] py-[20px]`。如果我们想通过 props 传入一个新的内边距 `p-[5px]`，期望的结果是组件的内边距变为 `5px`。

在不使用 tailwind-merge 的情况下，最终的类名将是 `border rounded px-[20px] py-[20px] p-[5px]`。这里，`px-[20px] py-[20px]` 和 `p-[5px]` 会发生冲突，而根据 Tailwind CSS 的工作机制，最终的内边距不会是预期的 `5px`，而是 `20px`。

![20241021152512](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241021152512.png)

## 使用 tailwind-merge 的优势

使用 tailwind-merge，我们可以避免上述问题。通过 `twMerge` 函数合并类名时，它会自动处理这些冲突，确保每个样式只应用一次最终的值。在上述例子中，`twMerge` 会智能地解析这些类名，最终只保留 `p-[5px]`，从而确保内边距是我们期望的 `5px`。

![20241021152437](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241021152437.png)

```jsx
/**
 * defaultShowCode: true
 */
import React from 'react';
import { twMerge } from 'tailwind-merge';

const MyInput = (props) => {
  const className = twMerge(
    `border rounded px-[20px] py-[20px] ${props.className || ''}`,
  );

  return <input {...props} className={className}></input>;
};

export default function page() {
  return <MyInput className="p-[5px]" />;
}
```
