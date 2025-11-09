---
group:
  title: css
  order: 2
title: CVA (Class Variance Authority)
toc: content
order: 18
---

## 是什么

### CVA 简介

[CVA (Class Variance Authority)](https://cva.style/docs) 是一个用于管理组件样式变体的 TypeScript 库。它提供了一种结构化、类型安全的方式来定义和管理组件的各种变体（variants）、尺寸（sizes）、状态等样式组合。

CVA 本质上是对 `clsx` 和 `tailwind-merge` 的高级封装，通过声明式的配置来管理复杂的样式逻辑。

### 核心概念

```tsx | pure
import { cva } from 'class-variance-authority';

const button = cva('基础样式', {
  variants: {
    // 变体维度 1
    intent: {
      primary: '主要样式',
      secondary: '次要样式',
    },
    // 变体维度 2
    size: {
      small: '小尺寸样式',
      large: '大尺寸样式',
    },
  },
  // 复合变体：当多个变体同时存在时的特殊样式
  compoundVariants: [
    {
      intent: 'primary',
      size: 'large',
      class: '特殊组合样式',
    },
  ],
  // 默认变体
  defaultVariants: {
    intent: 'primary',
    size: 'small',
  },
});
```

## 为什么

### 不使用 CVA 的痛点

当我们仅使用 `clsx` 和 `twMerge` 时，对于复杂的组件，代码会变得难以维护：

```tsx | pure
import React from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

// ❌ 问题：样式逻辑分散，难以维护
const Button = ({ variant, size, state, className, children }) => {
  return (
    <button
      className={twMerge(
        clsx(
          // 基础样式
          'rounded font-semibold transition-colors duration-200',

          // variant 逻辑
          {
            'bg-blue-500 text-white hover:bg-blue-600': variant === 'primary',
            'bg-gray-500 text-white hover:bg-gray-600': variant === 'secondary',
            'border-2 border-blue-500 text-blue-500': variant === 'outline',
          },

          // size 逻辑
          {
            'px-3 py-1 text-sm': size === 'small',
            'px-4 py-2 text-base': size === 'medium',
            'px-6 py-3 text-lg': size === 'large',
          },

          // state 逻辑
          {
            'opacity-50 cursor-not-allowed': state === 'disabled',
            'ring-2 ring-blue-300': state === 'focused',
          },

          // 复合逻辑：primary + large 的特殊处理
          {
            'shadow-lg': variant === 'primary' && size === 'large',
          },
        ),
        className,
      )}
    >
      {children}
    </button>
  );
};
```

### CVA 解决的问题

1. **样式逻辑分散**：使用 `clsx` 时，所有条件判断都混在一起，难以快速定位某个变体的样式
2. **缺乏类型安全**：手动拼接字符串容易出现拼写错误，且 TypeScript 无法提供有效的类型检查
3. **复合变体难管理**：当需要处理多个变体的组合时（如 `primary + large`），条件判断会变得非常复杂
4. **可复用性差**：样式逻辑与组件耦合，难以在多个组件间复用
5. **缺乏默认值管理**：需要手动在多处设置和维护默认值

CVA 通过声明式配置解决了这些问题：

```tsx | pure
import { cva } from 'class-variance-authority';

// ✅ 解决方案：结构化的样式定义
const buttonStyles = cva(
  'rounded font-semibold transition-colors duration-200',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        outline: 'border-2 border-blue-500 text-blue-500',
      },
      size: {
        small: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
      },
      state: {
        disabled: 'opacity-50 cursor-not-allowed',
        focused: 'ring-2 ring-blue-300',
        normal: '',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        size: 'large',
        class: 'shadow-lg',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      state: 'normal',
    },
  },
);
```

### CVA 的核心优势

1. **清晰的结构**：每个变体维度独立定义，代码组织更清晰
2. **类型安全**：自动生成 TypeScript 类型，避免拼写错误
3. **复合变体支持**：`compoundVariants` 专门处理多个变体的组合场景
4. **默认值管理**：`defaultVariants` 统一管理默认值
5. **可复用性强**：样式定义可以独立导出，在多个组件间复用
6. **更好的 IDE 支持**：享受自动补全和类型检查

## 怎么用

### 安装

```bash
npm install class-variance-authority
# or
pnpm add class-variance-authority
# or
yarn add class-variance-authority
```

### 基础使用

#### 1. 定义样式变体

```tsx | pure
import { cva } from 'class-variance-authority';

const buttonStyles = cva(
  // 基础样式（始终应用）
  'rounded font-semibold transition-all duration-200',
  {
    variants: {
      // 变体：intent（意图）
      intent: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      },
      // 变体：size（尺寸）
      size: {
        small: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
      },
    },
    // 默认变体
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  },
);
```

#### 2. 在组件中使用

```tsx | pure
import React from 'react';
import { VariantProps } from 'class-variance-authority';

// 使用 VariantProps 提取类型
type ButtonProps = VariantProps<typeof buttonStyles> & {
  children: React.ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  intent,
  size,
  className,
  children,
}) => {
  return (
    <button
      // 调用 buttonStyles 函数生成类名
      className={buttonStyles({ intent, size, className })}
    >
      {children}
    </button>
  );
};

export default Button;
```

#### 3. 使用示例

```tsx | pure
// 使用默认样式（primary + medium）
<Button>默认按钮</Button>

// 自定义变体
<Button intent="danger" size="large">
  危险操作
</Button>

// 覆盖样式
<Button className="rounded-full">
  圆形按钮
</Button>
```

### 高级功能

#### 1. 复合变体（Compound Variants）

当多个变体组合时需要应用特殊样式：

```tsx | pure
const buttonStyles = cva('base-styles', {
  variants: {
    intent: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500',
    },
    size: {
      small: 'text-sm',
      large: 'text-lg',
    },
    outlined: {
      true: 'border-2',
      false: '',
    },
  },
  compoundVariants: [
    {
      // 当 intent 为 primary 且 size 为 large 时
      intent: 'primary',
      size: 'large',
      class: 'shadow-xl font-bold',
    },
    {
      // 当 intent 为 primary 且 outlined 为 true 时
      intent: 'primary',
      outlined: true,
      class: 'border-blue-500 bg-transparent text-blue-500',
    },
  ],
  defaultVariants: {
    intent: 'primary',
    size: 'small',
    outlined: false,
  },
});
```

#### 2. 布尔变体

处理开关式的样式：

```tsx | pure
const alertStyles = cva('p-4 rounded', {
  variants: {
    variant: {
      info: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
    },
    // 布尔变体
    dismissible: {
      true: 'pr-10 relative',
      false: '',
    },
    border: {
      true: 'border-2',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'error',
      border: true,
      class: 'border-red-500',
    },
  ],
  defaultVariants: {
    variant: 'info',
    dismissible: false,
    border: false,
  },
});

// 使用
<Alert variant="error" dismissible border>
  这是一个可关闭的错误提示
</Alert>;
```

#### 3. 可空变体（Nullable Variants）

某些变体可以为空：

```tsx | pure
const badgeStyles = cva('px-2 py-1 rounded font-medium', {
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
    },
    // 可选的 size 变体
    size: {
      small: 'text-xs',
      large: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    // size 没有默认值，可以不传
  },
});

// size 可以不传
<Badge variant="primary">徽章</Badge>

// 也可以传入
<Badge variant="success" size="large">大徽章</Badge>
```

#### 4. 与现有工具结合

CVA 内部已经集成了冲突解决机制，但如果你想与 `cn` 工具函数结合：

```tsx | pure
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import clsx, { ClassValue } from 'clsx';

// 通用的 cn 工具函数
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 定义样式
const buttonStyles = cva('base-styles', {
  variants: {
    variant: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500',
    },
  },
});

// 在组件中使用
const Button = ({ variant, className, children }) => {
  return (
    <button
      className={cn(
        buttonStyles({ variant }),
        className, // 外部传入的类名会正确覆盖内部样式
      )}
    >
      {children}
    </button>
  );
};
```

### 实际案例：构建一个复杂的 Card 组件

```tsx | pure
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

// 定义 Card 样式
const cardStyles = cva(
  // 基础样式
  'rounded-lg overflow-hidden transition-all duration-200',
  {
    variants: {
      // 变体：样式主题
      variant: {
        default: 'bg-white border border-gray-200',
        elevated: 'bg-white shadow-md',
        outlined: 'bg-transparent border-2 border-gray-300',
      },
      // 变体：内边距
      padding: {
        none: '',
        small: 'p-3',
        medium: 'p-4',
        large: 'p-6',
      },
      // 变体：是否可悬停
      hoverable: {
        true: 'hover:shadow-lg cursor-pointer',
        false: '',
      },
      // 变体：是否全宽
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      {
        // elevated + hoverable：增强悬停效果
        variant: 'elevated',
        hoverable: true,
        class: 'hover:shadow-xl hover:-translate-y-1',
      },
      {
        // outlined + hoverable：改变边框颜色
        variant: 'outlined',
        hoverable: true,
        class: 'hover:border-blue-400',
      },
    ],
    defaultVariants: {
      variant: 'default',
      padding: 'medium',
      hoverable: false,
      fullWidth: false,
    },
  },
);

// 提取 props 类型
type CardProps = VariantProps<typeof cardStyles> & {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

// Card 组件
const Card: React.FC<CardProps> = ({
  variant,
  padding,
  hoverable,
  fullWidth,
  className,
  children,
  onClick,
}) => {
  return (
    <div
      className={cardStyles({
        variant,
        padding,
        hoverable,
        fullWidth,
        className,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
```

#### 使用 Card 组件

```tsx | pure
// 基础用法
<Card>
  <h3>标题</h3>
  <p>内容</p>
</Card>

// 可点击的卡片
<Card variant="elevated" hoverable onClick={() => console.log('点击了卡片')}>
  <h3>可点击的卡片</h3>
</Card>

// 全宽的描边卡片
<Card variant="outlined" fullWidth padding="large">
  <h3>全宽卡片</h3>
</Card>

// 自定义样式覆盖
<Card variant="elevated" className="bg-gradient-to-r from-purple-500 to-pink-500">
  <h3>渐变背景卡片</h3>
</Card>
```

### 样式复用：抽离样式定义

对于大型项目，可以将样式定义抽离到独立文件：

```tsx | pure
// styles/button.styles.ts
import { cva } from 'class-variance-authority';

export const buttonStyles = cva(
  'rounded font-semibold transition-colors duration-200',
  {
    variants: {
      intent: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
      },
      size: {
        small: 'px-3 py-1 text-sm',
        medium: 'px-4 py-2 text-base',
        large: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  },
);

// components/Button.tsx
import { buttonStyles } from '@/styles/button.styles';
import { VariantProps } from 'class-variance-authority';

type ButtonProps = VariantProps<typeof buttonStyles> & {
  children: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
  intent,
  size,
  className,
  children,
}) => {
  return (
    <button className={buttonStyles({ intent, size, className })}>
      {children}
    </button>
  );
};
```

## 总结备忘

### 核心要点

1. **CVA 的本质**：

   - CVA 是对 `clsx` 和 `tailwind-merge` 的高级封装
   - 提供声明式、类型安全的样式变体管理方案
   - 适合管理复杂组件的多维度样式变化

2. **何时使用 CVA**：

   - 组件有 3 个以上的样式变体维度
   - 需要处理多个变体的组合场景（复合变体）
   - 需要类型安全和更好的 IDE 支持
   - 样式逻辑需要在多个组件间复用

3. **何时不需要 CVA**：
   - 简单的组件（1-2 个变体维度）
   - 一次性的样式逻辑
   - 不需要类型检查的小型项目

### 技术对比

| 特性           | clsx + twMerge | CVA                             |
| -------------- | -------------- | ------------------------------- |
| **学习曲线**   | 低             | 中等                            |
| **代码组织**   | 命令式         | 声明式                          |
| **类型安全**   | 弱             | 强（自动生成类型）              |
| **复合变体**   | 手动处理       | 原生支持                        |
| **默认值管理** | 手动设置       | 统一管理                        |
| **适用场景**   | 简单到中等     | 中等到复杂                      |
| **包大小**     | 更小           | 稍大（~1.5kb gzipped）          |
| **性能**       | 快             | 快（底层仍使用 clsx + twMerge） |

### API 速查

```tsx | pure
import { cva, type VariantProps } from 'class-variance-authority';

// 1. 定义样式
const styles = cva('基础样式', {
  variants: {
    // 定义变体维度
    variant: {
      option1: '样式1',
      option2: '样式2',
    },
  },
  compoundVariants: [
    {
      // 复合变体：多个条件同时满足时的样式
      variant: 'option1',
      size: 'large',
      class: '组合样式',
    },
  ],
  defaultVariants: {
    // 默认值
    variant: 'option1',
  },
});

// 2. 提取类型
type Props = VariantProps<typeof styles>;

// 3. 使用
const className = styles({
  variant: 'option1',
  className: '额外样式',
});
```

### 最佳实践

1. **样式文件组织**：

   ```
   src/
   ├── components/
   │   └── Button/
   │       ├── Button.tsx          # 组件实现
   │       └── Button.styles.ts    # 样式定义
   ```

2. **命名约定**：

   - 样式变体函数：`xxxStyles`（如 `buttonStyles`）
   - 变体维度：使用语义化名称（如 `intent`、`size`、`variant`）

3. **类型导出**：

   ```tsx | pure
   // Button.styles.ts
   export const buttonStyles = cva(/* ... */);
   export type ButtonStylesProps = VariantProps<typeof buttonStyles>;

   // Button.tsx
   import { buttonStyles, type ButtonStylesProps } from './Button.styles';
   ```

4. **与 cn 工具结合**：

   ```tsx | pure
   // 推荐模式
   const className = cn(
     styles({ variant, size }), // CVA 生成的类名
     props.className, // 外部传入的类名
   );
   ```

### 常见问题

**Q1: CVA 和直接用 clsx + twMerge 有什么区别？**

- CVA 提供了更好的结构和类型安全，适合复杂组件
- 对于简单场景，clsx + twMerge 更轻量

**Q2: CVA 是否会增加包体积？**

- CVA gzipped 后约 1.5kb，对大多数项目影响可忽略
- 换来的是更好的开发体验和代码维护性

**Q3: 可以在非 Tailwind 项目中使用 CVA 吗？**

- 可以，CVA 不限于 Tailwind CSS
- 任何基于 class 的样式系统都可以使用

**Q4: 如何处理主题切换？**

```tsx | pure
const buttonStyles = cva('base', {
  variants: {
    theme: {
      light: 'bg-white text-black',
      dark: 'bg-black text-white',
    },
  },
});

// 使用
<Button theme={currentTheme}>按钮</Button>;
```

### 相关资源

- [CVA 官方文档](https://cva.style/docs)
- [CVA GitHub](https://github.com/joe-bell/cva)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) - 大量使用 CVA 的组件库示例
