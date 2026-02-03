# JavaScript 性能优化

## 概述

JavaScript 性能优化关注如何编写高效的 JavaScript 代码，包括循环优化、数据结构选择、DOM 操作和缓存策略。

## 目录

1. [避免布局抖动](#1-避免布局抖动)
2. [为重复查找构建索引映射](#2-为重复查找构建索引映射)
3. [缓存循环中的属性访问](#3-缓存循环中的属性访问)
4. [缓存重复的函数调用](#4-缓存重复的函数调用)
5. [缓存存储 API 调用](#5-缓存存储-api-调用)
6. [合并多个数组迭代](#6-合并多个数组迭代)
7. [数组比较时先检查长度](#7-数组比较时先检查长度)
8. [函数中提前返回](#8-函数中提前返回)
9. [提升 RegExp 创建](#9-提升-regexp-创建)
10. [使用循环而不是排序来查找最小/最大值](#10-使用循环而不是排序来查找最小/最大值)
11. [使用 Set/Map 进行 O(1) 查找](#11-使用-setmap-进行-o1-查找)
12. [使用 toSorted() 而不是 sort()](#12-使用-tosorted-而不是-sort)

---

## 1. 避免布局抖动

### 问题

混合读取和写入 DOM 属性会触发多次强制同步布局（reflow），导致性能下降。

### 错误示例

```typescript
function layoutThrashing(element: HTMLElement) {
  element.style.width = '100px'
  const width = element.offsetWidth  // 强制 reflow

  element.style.height = '200px'
  const height = element.offsetHeight  // 又一次强制 reflow
}
```

### 正确示例

```typescript
function updateElementStyles(element: HTMLElement) {
  // 批量所有写入
  element.style.width = '100px'
  element.style.height = '200px'

  // 在所有写入后读取（单次 reflow）
  const { width, height } = element.getBoundingClientRect()
}
```

### 更好的方式（使用 CSS 类）

```typescript
function updateElementStyles(element: HTMLElement) {
  // 使用 CSS 类批量更新样式
  element.classList.add('large')
}

// CSS
.large {
  width: 100px;
  height: 200px;
}
```

### 为什么重要

- 防止强制同步布局
- 减少重排次数
- 更好的性能

---

## 2. 为重复查找构建索引映射

### 问题

使用 `Array.find()` 进行重复查找是 O(n) 操作，在大量数据时性能较差。

### 错误示例

```typescript
function processOrders(orders: Order[], users: User[]) {
  // 问题：对于每个订单都遍历所有用户
  return orders.map(order => ({
    ...order,
    user: users.find(u => u.id === order.userId)
  }))
}

// 时间复杂度：O(n × m)
```

### 正确示例

```typescript
function processOrders(orders: Order[], users: User[]) {
  // 预先构建 Map
  const userById = new Map(users.map(u => [u.id, u]))

  // 现在 O(1) 查找
  return orders.map(order => ({
    ...order,
    user: userById.get(order.userId)
  }))
}

// 时间复杂度：O(n + m)
```

### 性能对比

| 操作 | 查找次数 | 复杂度 |
|------|----------|--------|
| 错误方式 | 1000 × 1000 | O(n × m) = 1,000,000 |
| | 正确方式 | 1000 × 1 | O(n + m) = 2,000 |

### 为什么重要

- O(n) 查找变为 O(1)
- 1000 × 1000 操作从 1M 降到 2K
- 显著提高性能

---

## 3. 缓存循环中的属性访问

### 问题

在循环中重复访问深层属性会导致多次查找。

### 错误示例

```typescript
for (let i = 0; i < arr.length; i++) {
  // 问题：每次迭代都进行属性查找
  process(obj.config.settings.value)
}
```

### 正确示例

```typescript
// 缓存到局部变量
const value = obj.config.settings.value
const len = arr.length

for (let i = 0; i < len; i++) {
  process(value)
}
```

### 为什么重要

- 减少查找次数
- 提高循环性能
- 更清晰的代码

---

## 4. 缓存重复的函数调用

### 问题

重复调用纯函数会产生冗余计算。

### 错误示例

```typescript
function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map(project => {
        // 问题：相同名称调用多次
        const slug = slugify(project.name)
        return <ProjectCard key={project.id} slug={slug} />
      })}
    </div>
  )
}
```

### 正确示例

```typescript
const slugifyCache = new Map<string, string>()

function cachedSlugify(text: string): string {
  if (slugifyCache.has(text)) {
    return slugifyCache.get(text)!
  }
  const result = slugify(text)
  slugifyCache.set(text, result)
  return result
}

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div>
      {projects.map(project => {
        const slug = cachedSlugify(project.name)
        return <ProjectCard key={project.id} slug={slug} />
      })}
    </div>
  )
}
```

### 为什么重要

- 避免冗余计算
- 提高性能
- 特别适合昂贵的纯函数

---

## 5. 缓存存储 API 调用

### 问题

`localStorage` 和 `sessionStorage` 是同步且昂贵的操作。

### 错误示例

```typescript
function getTheme() {
  return localStorage.getItem('theme') ?? 'light'
}

// 调用 10 次 = 10 次存储读取
```

### 正确示例

```typescript
const storageCache = new Map<string, string | null>()

function getLocalStorage(key: string) {
  if (!storageCache.has(key)) {
    storageCache.set(key, localStorage.getItem(key))
  }
  return storageCache.get(key)
}

function setLocalStorage(key: string, value: string) {
  localStorage.setItem(key, value)
  storageCache.set(key, value)
}

// 调用 10 次 = 1 次存储读取
```

### 为什么重要

- `localStorage/sessionStorage` 是同步且昂贵的
- 减少存储访问次数
- 提高性能

---

## 6. 合并多个数组迭代

### 问题

多次遍历同一数组会增加时间复杂度。

### 错误示例

```typescript
const admins = users.filter(u => u.isAdmin)     // 第 1 次迭代
const testers = users.filter(u => u.isTester)   // 第 2 次迭代
const inactive = users.filter(u => !u.isActive) // 第 3 次迭代

// 总共 3 次迭代
```

### 正确示例

```typescript
const admins: User[] = []
const testers: User[] = []
const inactive: User[] = []

for (const user of users) {
  if (user.isAdmin) admins.push(user)
  if (user.isTester) testers.push(user)
  if (!user.isActive) inactive.push(user)
}

// 只需 1 次迭代
```

### 为什么重要

- 减少迭代次数
- 时间复杂度从 O(n × m) 降到 O(n)
- 更好的缓存局部性

---

## 7. 数组比较时先检查长度

### 问题

在比较数组时，如果先进行昂贵的操作，会浪费计算资源。

### 错误示例

```typescript
function hasChanges(current: string[], original: string[]) {
  // 问题：即使长度不同也执行昂贵的操作
  return current.sort().join() !== original.sort().join()
}
```

### 正确示例

```typescript
function hasChanges(current: string[], original: string[]) {
  // 早期退出：长度不同肯定有变化
  if (current.length !== original.length) {
    return true
  }

  // 只在长度相同时才进行比较
  const currentSorted = current.toSorted()
  const originalSorted = original.toSorted()

  for (let i = 0; i < currentSorted.length; i++) {
    if (currentSorted[i] !== originalSorted[i]) {
      return true
    }
  }
  return false
}
```

### 为什么重要

- **MEDIUM-HIGH 级别**优化
- 避免长度不同时的昂贵操作
- 提高性能

---

## 8. 函数中提前返回

### 问题

继续执行不必要的代码会导致性能浪费。

### 错误示例

```typescript
function validateUsers(users: User[]) {
  let hasError = false
  let errorMessage = ''

  for (const user of users) {
    if (!user.email) {
      hasError = true
      errorMessage = 'Email required'
    }
    if (!user.name) {
      hasError = true
      errorMessage = 'Name required'
    }
  }

  return hasError ? { valid: false, error: errorMessage } : { valid: true }
}
```

### 正确示例

```typescript
function validateUsers(users: User[]) {
  for (const user of users) {
    // 早期返回：发现错误立即返回
    if (!user.email) {
      return { valid: false, error: 'Email required' }
    }
    if (!user.name) {
      return { valid: false, error: 'Name required' }
    }
  }
  return { valid: true }
}
```

### 为什么重要

- 避免不必要的计算
- 更清晰的代码流程
- 提高性能

---

## 9. 提升 RegExp 创建

### 问题

在组件渲染时创建 `RegExp` 会导致重复创建。

### 错误示例

```tsx
function Highlighter({ text, query }: Props) {
  // 问题：每次渲染都创建新的 RegExp
  const regex = new RegExp(`(${query})`, 'gi')
  const parts = text.split(regex)
  return <>{parts.map((part, i) => ...)}</>
}
```

### 正确示例（常量）

```tsx
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function EmailValidator({ email }: { email: string }) {
  const isValid = EMAIL_REGEX.test(email)
  return <div>{isValid ? 'Valid' : 'Invalid'}</div>
}
```

### 正确示例（动态）

```tsx
function Highlighter({ text, query }: Props) {
  // 使用 useMemo 缓存
  const regex = useMemo(
    () => new RegExp(`(${escapeRegex(query)})`, 'gi'),
    [query]
  )
  const parts = text.split(regex)
  return <>{parts.map((part, i) => ...)}</>
}
```

### 注意事项

```typescript
// ⚠️ 全局 regex 有可变的 lastIndex 状态
const GLOBAL_REGEX = /abc/g

GLOBAL_REGEX.test('abc')  // true
GLOBAL_REGEX.test('abc')  // false（lastIndex 移动了）

// ✅ 解决方案 1：每次创建新实例
const regex = new RegExp('abc', 'g')

// ✅ 解决方案 2：重置 lastIndex
GLOBAL_REGEX.lastIndex = 0
GLOBAL_REGEX.test('abc')  // true
```

### 为什么重要

- 避免每次渲染时重新创建
- 减少内存分配
- 提高性能

---

## 10. 使用循环而不是排序来查找最小/最大值

### 问题

使用 `sort()` 查找最小/最大值的时间复杂度是 O(n log n)，而循环是 O(n)。

### 错误示例

```typescript
function getLatestProject(projects: Project[]) {
  // 问题：O(n log n)
  const sorted = [...projects].sort((a, b) => b.updatedAt - a.updatedAt)
  return sorted[0]
}
```

### 正确示例

```typescript
function getLatestProject(projects: Project[]) {
  if (projects.length === 0) return null

  // 优化：O(n)
  let latest = projects[0]

  for (let i = 1; i < projects.length; i++) {
    if (projects[i].updatedAt > latest.updatedAt) {
      latest = projects[i]
    }
  }

  return latest
}
```

### 为什么重要

- O(n) 而不是 O(n log n)
- 不需要创建新数组
- 更好的性能

---

## 11. 使用 Set/Map 进行 O(1) 查找

### 问题

使用 `Array.includes()` 进行查找是 O(n) 操作。

### 错误示例

```typescript
const allowedIds = ['a', 'b', 'c', /* ... 很多 */]
items.filter(item => allowedIds.includes(item.id))
// O(n × m)
```

### 正确示例

```typescript
const allowedIds = new Set(['a', 'b', 'c', /* ... 很多 */])
items.filter(item => allowedIds.has(item.id))
// O(n)
```

### 使用场景对比

| 数据结构 | 查找 | 插入 | 删除 |
|----------|------|------|------|
| Array | O(n) | O(1) | O(n) |
| Set | O(1) | O(1) | O(1) |
| Map | O(1) | O(1) | O(1) |

### 为什么重要

- O(n) 查找变为 O(1)
- 显著提高查找性能
- 适合大量数据的查找

---

## 12. 使用 toSorted() 而不是 sort()

### 问题

`sort()` 会就地突变数组，可能导致 React 状态突变错误。

### 错误示例

```typescript
function UserList({ users }: { users: User[] }) {
  const sorted = useMemo(
    () => users.sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  )
  return <div>{sorted.map(renderUser)}</div>
}
// 问题：sort() 突变了 users 数组
```

### 正确示例

```typescript
function UserList({ users }: { users: User[] }) {
  const sorted = useMemo(
    () => users.toSorted((a, b) => a.name.localeCompare(b.name)),
    [users]
  )
  return <div>{sorted.map(renderUser)}</div>
}
// 优化：toSorted() 返回新数组，不突变原数组
```

### 其他不可变数组方法

```typescript
// toReversed()
const reversed = array.toReversed()

// toSpliced()
const spliced = array.toSpliced(1, 2, 'new')

// with()
const replaced = array.with(1, 'new')
```

### 兼容性

```typescript
// 降级方案
function safeSort<T>(array: T[], compareFn: (a: T, b: T) => number): T[] {
  if (array.toSorted) {
    return array.toSorted(compareFn)
  }
  return [...array].sort(compareFn)
}
```

### 为什么重要

- **MEDIUM-HIGH 级别**优化
- 防止 React 状态中的突变错误
- 更安全的代码

---

## 总结

JavaScript 性能优化关注编写高效的代码：

| 规则 | 优先级 | 影响 |
|------|--------|------|
| 避免布局抖动 | 低中 | 减少 reflow |
| 构建索引映射 | 低中 | O(n) → O(1) |
| 缓存属性访问 | 低 | 减少查找 |
| 缓存函数调用 | 低 | 避免冗余计算 |
| 缓存存储调用 | 低 | 减少存储访问 |
| 合并数组迭代 | 低 | O(n × m) → O(n) |
| 先检查长度 | 低中 | 避免昂贵操作 |
| 提前返回 | 低 | 避免不必要计算 |
| 提升 RegExp | 低 | 避免重复创建 |
| 循环查找 min/max | 低 | O(n log n) → O(n) |
| Set/Map 查找 | 低 | O(n) → O(1) |
| toSorted() | 低中 | 防止突变 |

### 核心原则

1. **批量 DOM 操作**：读写分离，使用 CSS 类
2. **使用合适的数据结构**：Set/Map 用于频繁查找
3. **缓存重复操作**：函数调用、属性访问、存储 API
4. **合并迭代**：一次循环完成多个操作
5. **提前返回**：发现错误或条件满足时立即返回
6. **避免突变**：使用不可变方法

### 检查清单

- [ ] DOM 读写是否分离？
- [ ] 频繁查找是否使用 Set/Map？
- [ ] 循环中的属性访问是否缓存？
- [ ] 重复的函数调用是否缓存？
- [ ] localStorage 调用是否缓存？
- [ ] 多次迭代是否可以合并？
- [ ] 是否使用 toSorted() 而不是 sort()？
