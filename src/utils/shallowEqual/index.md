---
group:
  title: 工具函数
  order: 3
title: shallowEqual
toc: content
---

# shallowEqual

## 一、是什么？

`shallowEqual` 是一个**浅比较（shallow comparison）工具函数**，用于判断两个值在「表层意义」上是否相等。

```ts
function shallowEqual(a: unknown, b: unknown): boolean;
```

### 核心特征

| 特性           | 说明                               |
| -------------- | ---------------------------------- |
| **比较深度**   | 只比较第一层，不递归               |
| **比较算法**   | 使用 `Object.is`（SameValue 语义） |
| **比较范围**   | 只比较 own + enumerable 属性       |
| **时间复杂度** | O(n)，n 为属性数量                 |

### 不是什么

- ❌ 深度比较（deep equal）
- ❌ 业务语义比较
- ❌ 结构递归比较

它的目标非常克制：

> **用最低的成本，回答一个工程问题：「这两个值，在当前这一层，看起来有没有变化？」**

---

## 二、为什么需要它？

### 问题：只有「引用相等」太严格

```js
const a = { x: 1 };
const b = { x: 1 };

a === b; // false
```

在工程中，这种「看起来没变，但引用变了」的情况非常常见：

- props 重新创建
- selector 返回新对象
- reducer 返回浅拷贝

如果只用 `===`，会产生大量**不必要的更新**。

### 问题：深度比较又太昂贵

```js
deepEqual(a, b); // 递归、不可控、性能不稳定
```

深比较的问题在于：

- 时间复杂度不可预测
- 很容易踩到循环引用
- 对 UI 渲染而言，往往「比较过头了」

### 解决方案：shallowEqual

`shallowEqual` 处在中间位置：

| 方式           | 特点             |
| -------------- | ---------------- |
| `===`          | 极快，但太严格   |
| `shallowEqual` | 快、稳定、足够好 |
| `deepEqual`    | 精确，但代价高   |

它服务的不是「数学上的相等」，而是：

> **「是否值得重新计算 / 重新渲染」**

---

## 三、怎么用？

### 基础用法

<code src="./examples/basic.tsx"></code>

### 在 React 中使用

<code src="./examples/react.tsx"></code>

这正是 React / Redux / Zustand 等生态中最常见的用法。

### 常见误用（必读）

<code src="./examples/pitfalls.tsx"></code>

---

## 四、实现原理

### 整体流程

```
┌─────────────────────────────────────────┐
│  Object.is(a, b) === true?              │
│  → 快速路径，直接返回 true              │
└─────────────────┬───────────────────────┘
                  │ false
                  ▼
┌─────────────────────────────────────────┐
│  a 或 b 不是对象 / 为 null?             │
│  → 类型守卫，返回 false                 │
└─────────────────┬───────────────────────┘
                  │ 都是对象
                  ▼
┌─────────────────────────────────────────┐
│  Object.keys(a).length !== keys(b).length? │
│  → 键数量不同，返回 false               │
└─────────────────┬───────────────────────┘
                  │ 数量相同
                  ▼
┌─────────────────────────────────────────┐
│  遍历 a 的所有键：                       │
│  - b 是否有这个键？                      │
│  - Object.is(a[key], b[key]) ?          │
│  → 任一不满足则返回 false               │
└─────────────────┬───────────────────────┘
                  │ 全部通过
                  ▼
              return true
```

### 核心代码

```ts
function shallowEqual(a: unknown, b: unknown): boolean {
  // 快速路径：使用 Object.is 进行 SameValue 比较
  // 如果两个值完全相同，直接返回 true
  if (Object.is(a, b)) {
    return true;
  }

  // 只有当两个值都是非空对象时才需要进一步比较
  // 对于原始类型或 null/undefined，已经通过 Object.is 比较过，可以直接返回 false
  if (
    typeof a !== 'object' ||
    a === null ||
    typeof b !== 'object' ||
    b === null
  ) {
    return false;
  }

  // 获取两个对象自身的可枚举属性键数组
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);

  // 如果两个对象的属性数量不同，则它们不相等
  if (aKeys.length !== bKeys.length) {
    return false;
  }

  // 遍历第一个对象的所有键，检查第二个对象是否具有相同的键和值
  for (let i = 0; i < aKeys.length; i++) {
    const key = aKeys[i];

    // 检查第二个对象是否具有相同的键（包括不可枚举属性的检查）
    if (!Object.prototype.hasOwnProperty.call(b, key)) {
      return false;
    }

    // 使用 Object.is 比较两个对象对应键的值
    // Object.is 提供了更精确的相等性检查，例如区分 +0 和 -0，以及认为 NaN 等于 NaN
    if (
      !Object.is(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key],
      )
    ) {
      return false;
    }
  }

  // 所有检查都通过，两个对象浅相等
  return true;
}
```

### SameValue 语义

`shallowEqual` 使用 `Object.is` 而非 `===`，这意味着：

```js
Object.is(NaN, NaN); // true  （=== 返回 false）
Object.is(+0, -0); // false （=== 返回 true）
```

因此：

```js
shallowEqual(NaN, NaN); // true
shallowEqual(+0, -0); // false
```

### 复杂度分析

| 指标       | 值                 |
| ---------- | ------------------ |
| 时间复杂度 | O(n)，n 为属性数量 |
| 空间复杂度 | O(1)               |

这也是它可以放心用在 render hot path 的原因。

---

## 五、边界情况

### 已知限制

`shallowEqual` **明确不处理以下情况**：

| 场景          | 原因                 |
| ------------- | -------------------- |
| 深层嵌套结构  | 只比较第一层         |
| Date / RegExp | 没有可枚举属性       |
| Map / Set     | 内部数据不可枚举     |
| Symbol 键     | `Object.keys` 不包含 |
| 不可枚举属性  | `Object.keys` 不包含 |
| 原型链差异    | 只比较 own 属性      |

### ⚠️ 特殊对象陷阱

```js
// Date - 没有可枚举属性
shallowEqual(new Date('2024-01-01'), new Date('2099-12-31')); // true ⚠️

// RegExp - 没有可枚举属性
shallowEqual(/test/, /completely-different/); // true ⚠️

// Map/Set - 内部数据不是可枚举属性
shallowEqual(new Map(), new Map([['a', 1]])); // true ⚠️
```

**这不是 bug，而是浅比较的固有限制**。如果你需要比较这些类型，请使用专门的比较函数。

### 数组与类数组对象

数组不被特殊对待，只比较可枚举的索引键：

```js
shallowEqual([1, 2], [1, 2]); // true
shallowEqual([1, 2], { 0: 1, 1: 2 }); // true（可能不符合预期）
```

---

## 六、什么时候不该用？

如果你遇到以下需求，请**不要使用 shallowEqual**：

- 表单深层数据 diff
- JSON 语义比较
- 时间 / 金额 / 领域对象相等性
- 需要「值意义」而非「形状稳定性」的场景

`shallowEqual` 不是通用比较工具，它是**工程级工具**。

---

## 七、一句话总结

> **shallowEqual 解决的不是「是否完全相等」，而是「在这一层，是否值得重新计算」。**

当你理解这一点时，你就不会再试图「增强它」，而是会在正确的地方使用它。
