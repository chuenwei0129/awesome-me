---
title: clsx
toc: content
---

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

## 与同类型的npm包比较的优势

`clsx` 的主要竞争者之一是 `classnames`。两者的功能非常相似，但 `clsx` 有一些优势：

1. **更小的体积**：`clsx` 通常比 `classnames` 更轻量。
2. **性能**：`clsx` 在性能上有些微提升，特别是在处理大批量样式时。
3. **灵活性**：支持不同类型的输入（如字符串、对象、数组）。

![20240618063005](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240618063005.png)
