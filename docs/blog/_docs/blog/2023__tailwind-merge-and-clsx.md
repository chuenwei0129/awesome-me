---
group:
  title: 2023 🐰
  order: -2023
title: tailwind-merge 与 clsx
toc: content
---

## 什么是 tailwind-merge？

[tailwind-merge](https://github.com/dcastil/tailwind-merge) 是一个用于合并和去重 Tailwind CSS 类名的库。它可以智能地合并类名字符串，并自动处理冲突的类名，保证最终的类名字符串既精简又不会因为类名冲突导致样式出现问题。

## 为什么需要 tailwind-merge？

在没有 tailwind-merge 的情况下，如果我们直接将传入的类名与组件的默认类名字符串拼接，可能会遇到一些问题。例如，如果有相互冲突的样式（如不同的内边距设置），直接拼接可能会导致两个相冲突的类名同时存在，从而使得最终的样式表现不是我们预期的那样。

举个例子：

<code src="./_2023__tailwind-merge-and-clsx/without-tailwind-merge.jsx"></code>

如上述代码所示，我们有一个 `MyInput` 组件，该组件有默认的内边距样式 `px-[20px] py-[20px]`。如果我们想通过 props 传入一个新的内边距 `p-[5px]`，期望的结果是组件的内边距变为 `5px`。

在不使用 tailwind-merge 的情况下，最终的类名将是 `border rounded px-[20px] py-[20px] p-[5px]`。这里，`px-[20px] py-[20px]` 和 `p-[5px]` 会发生冲突，而根据 Tailwind CSS 的工作机制，最终的内边距不会是预期的 `5px`，而是 `20px`。

![20241021152512](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241021152512.png)

使用 tailwind-merge，我们可以避免上述问题。通过 `twMerge` 函数合并类名时，它会自动处理这些冲突，确保每个样式只应用一次最终的值。在上述例子中，`twMerge` 会智能地解析这些类名，最终只保留 `p-[5px]`，从而确保内边距是我们期望的 `5px`。

![20241021152437](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241021152437.png)

<code src="./_2023__tailwind-merge-and-clsx/with-tailwind-merge.jsx"></code>

## 什么是 clsx?

[clsx](https://github.com/lukeed/clsx#readme) 是一个小型的 JavaScript 库，用于动态地构建className字符串。它适用于React组件中需要根据某些条件应用不同的CSS类。

## 场景说明：为什么需要 clsx?

`clsx` 简化了根据条件动态应用多个 CSS 类的逻辑，使代码更清晰、可维护。尤其在复杂场景中，`clsx` 能有效减少样板代码，防止人为错误。

假设我们有一个按钮组件，其样式根据按钮的类型（`primary`、`secondary`）及状态（`active`、`disabled`）变化。

### 不使用 clsx

```tsx | pure
import React from 'react';

const Button = ({ type, isActive, isDisabled }: { type: string; isActive: boolean; isDisabled: boolean }) => {
  let className = 'px-4 py-2';

  if (type === 'primary') {
    className += ' bg-blue-500 text-white';
  } else if (type === 'secondary') {
    className += ' bg-gray-500 text-black';
  }

  if (isActive) {
    className += ' border-black';
  }

  if (isDisabled) {
    className += ' bg-gray-300 cursor-not-allowed';
  }

  return <button className={className} disabled={isDisabled}>Click Me</button>;
};

export default Button;
```

这种情况下，我们需要手动管理字符串拼接，代码可能变得冗长且容易出错。

### 使用 clsx

```tsx | pure
import React from 'react';
import clsx from 'clsx';

const Button = ({ type, isActive, isDisabled }: { type: string; isActive: boolean; isDisabled: boolean }) => {
  return (
    <button
      className={clsx(
        'px-4 py-2',
        {
          'bg-blue-500 text-white': type === 'primary',
          'bg-gray-500 text-black': type === 'secondary',
          'border-black': isActive,
          'bg-gray-300 cursor-not-allowed': isDisabled,
        }
      )}
      disabled={isDisabled}
    >
      Click Me
    </button>
  );
};

export default Button;
```

使用 `clsx` 后，逻辑变得更加清晰且易于维护。我们不再需要手动拼接字符串，可以更加直观地看到每个条件所对应的类。

## 与同类型的 npm 包比较的优势

`clsx` 的主要竞争者之一是 `classnames`。两者的功能非常相似，但 `clsx` 有一些优势：

1. **更小的体积**：`clsx` 通常比 `classnames` 更轻量。
2. **性能**：`clsx` 在性能上有些微提升，特别是在处理大批量样式时。
3. **灵活性**：支持不同类型的输入（如字符串、对象、数组）。

![20240618063005](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240618063005.png)
