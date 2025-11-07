---
group:
  title: CSS
  order: 2
title: tailwind-merge 和 clsx
toc: content
order: 17
---

## 概述

在使用 Tailwind CSS 开发 React 组件时，我们经常需要处理动态类名和样式冲突的问题。`clsx` 和 `tailwind-merge` 是两个互补的工具库：

- **clsx**：用于**条件化地构建**类名字符串，简化动态样式逻辑
- **tailwind-merge**：用于**智能合并**Tailwind 类名，自动解决样式冲突

两者结合使用可以构建既灵活又健壮的组件样式系统。

## tailwind-merge 详解

### 什么是 tailwind-merge？

[tailwind-merge](https://github.com/dcastil/tailwind-merge) 是一个用于合并和去重 Tailwind CSS 类名的库。它可以智能地合并类名字符串，并自动处理冲突的类名，保证最终的类名字符串既精简又不会因为类名冲突导致样式出现问题。

### 为什么需要 tailwind-merge？

在没有 tailwind-merge 的情况下，如果我们直接将传入的类名与组件的默认类名字符串拼接，可能会遇到样式冲突的问题。当多个 Tailwind 类名作用于同一 CSS 属性时（如不同的内边距设置），由于 CSS 特异性和 Tailwind 生成的 CSS 顺序的影响，可能导致样式表现不符合预期。

### 使用示例

**问题示例：不使用 tailwind-merge**

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

export default function Page() {
  return <MyInput className="p-[5px]" />;
}
```

如上述代码所示，我们有一个 `MyInput` 组件，该组件有默认的内边距样式 `px-[20px] py-[20px]`。当通过 props 传入一个新的内边距 `p-[5px]` 时，期望的结果是组件的内边距变为 `5px`。

但是，最终的类名将是 `border rounded px-[20px] py-[20px] p-[5px]`。由于这些类名都会生成对应的 CSS 规则，且它们的特异性相同，最终哪个生效取决于 Tailwind 生成的 CSS 文件中规则的定义顺序，而不是类名字符串中的顺序。这会导致样式结果不可预期，通常内边距不会是我们期望的 `5px`。

![20241021152512](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241021152512.png)

**解决方案：使用 tailwind-merge**

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

export default function Page() {
  return <MyInput className="p-[5px]" />;
}
```

## clsx 详解

### 什么是 clsx?

[clsx](https://github.com/lukeed/clsx#readme) 是一个小型的 JavaScript 库，用于动态地构建 className 字符串。它适用于 React 组件中需要根据某些条件应用不同的 CSS 类。

### 为什么需要 clsx?

`clsx` 简化了根据条件动态应用多个 CSS 类的逻辑，使代码更清晰、可维护。尤其在复杂场景中，`clsx` 能有效减少样板代码，防止人为错误。

### 使用示例

假设我们有一个按钮组件，其样式根据按钮的类型（`primary`、`secondary`）及状态（`active`、`disabled`）变化。

#### 不使用 clsx

```tsx | pure
import React from 'react';

const Button = ({
  type,
  isActive,
  isDisabled,
}: {
  type: string;
  isActive: boolean;
  isDisabled: boolean;
}) => {
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

  return (
    <button className={className} disabled={isDisabled}>
      Click Me
    </button>
  );
};

export default Button;
```

这种情况下，我们需要手动管理字符串拼接，代码可能变得冗长且容易出错。

#### 使用 clsx

```tsx | pure
import React from 'react';
import clsx from 'clsx';

const Button = ({
  type,
  isActive,
  isDisabled,
}: {
  type: string;
  isActive: boolean;
  isDisabled: boolean;
}) => {
  return (
    <button
      className={clsx('px-4 py-2', {
        'bg-blue-500 text-white': type === 'primary',
        'bg-gray-500 text-black': type === 'secondary',
        'border-black': isActive,
        'bg-gray-300 cursor-not-allowed': isDisabled,
      })}
      disabled={isDisabled}
    >
      Click Me
    </button>
  );
};

export default Button;
```

使用 `clsx` 后，逻辑变得更加清晰且易于维护。我们不再需要手动拼接字符串，可以更加直观地看到每个条件所对应的类。

### 与 classnames 的对比

`clsx` 的主要竞争者之一是 `classnames`。两者的功能非常相似，但 `clsx` 有一些优势：

1. **更小的体积**：`clsx` 通常比 `classnames` 更轻量。
2. **性能**：`clsx` 在性能上有些微提升，特别是在处理大批量样式时。
3. **灵活性**：支持不同类型的输入（如字符串、对象、数组）。

![20240618063005](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240618063005.png)

## 两者结合使用的业务场景

在实际开发中，`clsx` 和 `tailwind-merge` 经常需要配合使用，以同时满足**条件化构建类名**和**解决样式冲突**两个需求。

### 典型使用模式

```ts
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

// 推荐的组合方式
const className = twMerge(
  clsx(
    // 基础样式
    'base-class',
    // 条件样式
    {
      'conditional-class': condition,
    },
  ),
  // 外部传入的类名（可能会覆盖内部样式）
  props.className,
);
```

### 实际案例：可复用的 Button 组件

假设我们要构建一个企业级的 Button 组件，需要支持：

- 多种变体（primary、secondary、outline）
- 多种尺寸（small、medium、large）
- 多种状态（active、disabled、loading）
- 允许外部覆盖样式

```tsx | pure
import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  isActive?: boolean;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  isActive = false,
  isLoading = false,
  className,
  children,
  disabled = false,
}) => {
  return (
    <button
      className={twMerge(
        // 第一步：使用 clsx 条件化地构建内部样式
        clsx(
          // 基础样式
          'rounded font-semibold transition-colors duration-200',

          // 根据 variant 应用不同的颜色方案
          {
            'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
            'bg-gray-500 text-white hover:bg-gray-600': variant === 'secondary',
            'border-2 border-blue-500 text-blue-500 hover:bg-blue-50':
              variant === 'outline',
          },

          // 根据 size 应用不同的尺寸
          {
            'px-3 py-1 text-sm': size === 'small',
            'px-4 py-2 text-base': size === 'medium',
            'px-6 py-3 text-lg': size === 'large',
          },

          // 根据状态应用样式
          {
            'ring-2 ring-blue-300 ring-offset-2': isActive,
            'opacity-50 cursor-not-allowed': disabled || isLoading,
            'cursor-wait': isLoading,
          },
        ),
        // 第二步：使用 twMerge 合并外部传入的 className，解决可能的冲突
        className,
      )}
      disabled={disabled || isLoading}
    >
      {isLoading ? '加载中...' : children}
    </button>
  );
};

export default Button;
```

### 使用示例

```tsx | pure
// 基础使用
<Button>点击我</Button>

// 自定义变体和尺寸
<Button variant="outline" size="large">大按钮</Button>

// 外部覆盖内边距（tailwind-merge 会智能处理冲突）
<Button className="px-8 py-4">自定义内边距</Button>

// 外部覆盖背景色（tailwind-merge 会移除内部冲突的 bg-blue-500）
<Button variant="primary" className="bg-green-500 hover:bg-green-600">
  绿色按钮
</Button>
```

### 为什么需要同时使用？

1. **clsx 的作用**：

   - 处理复杂的条件逻辑（variant、size、状态等）
   - 避免手动拼接字符串带来的冗余代码
   - 提高代码可读性

2. **tailwind-merge 的作用**：

   - 当外部传入 `className="px-8"` 时，自动移除内部的 `px-4`
   - 当外部传入 `className="bg-green-500"` 时，自动移除内部的 `bg-blue-500`
   - 确保最终生效的是**最后一个**相同属性的类名

3. **结合使用的优势**：
   - 组件内部：使用 `clsx` 灵活处理条件样式
   - 组件外部：使用 `twMerge` 允许调用者安全地覆盖样式
   - 避免样式冲突，确保结果可预期

## 核心区别对比

| 特性             | clsx                             | tailwind-merge                         |
| ---------------- | -------------------------------- | -------------------------------------- |
| **核心功能**     | 条件化构建类名字符串             | 智能合并 Tailwind 类名，解决冲突       |
| **主要用途**     | 根据状态/props 动态添加/移除类名 | 合并多个类名源，避免 Tailwind 样式冲突 |
| **处理对象**     | 任意 CSS 类名（不限于 Tailwind） | 专门针对 Tailwind CSS 类名             |
| **冲突处理**     | 不处理冲突，只是拼接字符串       | 智能识别并解决 Tailwind 类名冲突       |
| **典型场景**     | `{ 'text-red-500': hasError }`   | `twMerge('p-4', props.className)`      |
| **能否独立使用** | 可以                             | 可以                                   |
| **是否互补**     | 是，经常配合使用                 | 是，经常配合使用                       |

## 最佳实践建议

1. **组件内部样式管理**：

   - 使用 `clsx` 处理条件逻辑
   - 将结果传给 `twMerge` 与外部 `className` 合并

2. **性能考虑**：

   - 对于非 Tailwind 类名的简单场景，只用 `clsx` 即可
   - 只有在需要处理 Tailwind 冲突时才引入 `twMerge`

3. **可维护性**：

   - 将复杂的类名逻辑封装到独立的函数或工具中
   - 考虑使用 `cva`（class-variance-authority）等更高级的工具来管理变体

4. **常见封装模式**：

```tsx | pure
import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

// 创建一个通用的 cn 辅助函数
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 在组件中使用
<button
  className={cn(
    'base-class',
    {
      'variant-class': condition,
    },
    props.className,
  )}
/>;
```

这个 `cn` 函数已经成为 Tailwind CSS 社区的事实标准，在 shadcn/ui 等流行组件库中被广泛使用。
