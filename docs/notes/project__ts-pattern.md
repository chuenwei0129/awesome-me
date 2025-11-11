---
group:
  title: project
  order: 99
title: ts-pattern
toc: content
---

# TS-Pattern：TypeScript 的强大模式匹配库

## 简介

TS-Pattern 是一个为 TypeScript 设计的详尽模式匹配库，它提供了智能的类型推断，使条件逻辑更加可读和安全。通过模式匹配，你可以用声明式的方式处理复杂的数据结构，同时获得完整的类型安全保证。

### 为什么使用 TS-Pattern？

- **类型安全**：自动推断类型，减少类型错误
- **详尽性检查**：编译时确保所有情况都被处理
- **可读性强**：声明式语法比传统的 if-else 更清晰
- **功能强大**：支持复杂的嵌套模式、守卫条件等

## 安装

你可以使用任何包管理器安装 ts-pattern：

```bash
# npm
npm install ts-pattern

# pnpm
pnpm add ts-pattern

# yarn
yarn add ts-pattern

# bun
bun add ts-pattern

# jsr
npx jsr add @gabriel/ts-pattern
```

## 基础用法

### 1. 基本模式匹配

最简单的用法是匹配不同的数据类型：

```typescript
import { match, P } from 'ts-pattern';

const toString = (value: unknown): string =>
  match(value)
    .with(P.string, (str) => str)
    .with(P.number, (num) => num.toFixed(2))
    .with(P.boolean, (bool) => `${bool}`)
    .otherwise(() => 'Unknown');

console.log(toString('hello')); // "hello"
console.log(toString(42)); // "42.00"
console.log(toString(true)); // "true"
```

### 2. 对象模式匹配

处理复杂对象结构的利器：

```typescript
type Input =
  | { type: 'user'; name: string }
  | { type: 'image'; src: string }
  | { type: 'video'; seconds: number };

const processInput = (input: Input) =>
  match(input)
    .with({ type: 'image' }, () => 'image')
    .with({ type: 'video', seconds: 10 }, () => 'video of 10 seconds')
    .with({ type: 'user' }, ({ name }) => `user of name: ${name}`)
    .otherwise(() => 'something else');
```

### 3. 详尽性检查

使用 `.exhaustive()` 确保处理所有情况：

```typescript
type Permission = 'editor' | 'viewer';
type Plan = 'basic' | 'pro';

const checkAccess = (org: Plan, user: Permission) =>
  match([org, user])
    .with(['basic', 'viewer'], () => 'readonly')
    .with(['basic', 'editor'], () => 'basic edit')
    .with(['pro', 'viewer'], () => 'readonly')
    .with(['pro', 'editor'], () => 'full access')
    .exhaustive(); // 如果漏掉任何情况，编译时会报错
```

## 核心模式 API

### 通配符模式

```typescript
import { match, P } from 'ts-pattern';

// P._ 或 P.any - 匹配任何值
match(input)
  .with(P._, () => 'matches everything')
  .with(P.any, () => 'same as P._');

// 类型特定的通配符
match(value)
  .with(P.string, (str) => `string: ${str}`)
  .with(P.number, (num) => `number: ${num}`)
  .with(P.boolean, (bool) => `boolean: ${bool}`)
  .with(P.bigint, (n) => `bigint: ${n}`)
  .with(P.symbol, (s) => `symbol`);
```

### 字符串模式

TS-Pattern 提供了强大的字符串匹配方法：

```typescript
const analyzeQuery = (query: string) =>
  match(query)
    .with(P.string.startsWith('SELECT'), () => 'selection query')
    .with(P.string.endsWith('FROM user'), () => 'user table query')
    .with(P.string.includes('*'), () => 'wildcard query')
    // 方法可以链式调用
    .with(P.string.startsWith('SET').includes('*'), () => 'complex query')
    .with(P.string.regex(/^[a-z]+$/), () => 'lowercase only')
    .otherwise(() => 'other query');
```

### 数字模式

支持多种数字条件匹配：

```typescript
const analyzePosition = (position: { x: number; y: number }) =>
  match(position)
    .with({ x: P.number.gte(100) }, () => 'far right')
    .with({ x: P.number.between(0, 100) }, () => 'middle')
    .with({ x: P.number.lt(0) }, () => 'left side')
    .with(
      {
        x: P.number.positive().int(),
        y: P.number.positive().int(),
      },
      () => 'positive integers',
    )
    .otherwise(() => 'other position');

// 可用的数字方法
P.number.between(1, 10);
P.number.lt(12);
P.number.gt(12);
P.number.gte(12);
P.number.lte(12);
P.number.int();
P.number.finite;
P.number.positive;
P.number.negative;
```

### 数组模式

```typescript
// 固定长度数组
match([1, 2, 3])
  .with([1, 2, 3], () => 'exact match')
  .otherwise(() => 'no match');

// 动态长度数组
match(response)
  .with({ data: P.array({ name: P.string }) }, (users) => users)
  .otherwise(() => []);

// 可变元组模式 - 非空字符串列表
match(value)
  .with([P.string, ...P.array(P.string)], (value) => 'non-empty string list')
  .with(
    [P.string, P.string, ...P.array(P.string)],
    (value) => 'at least 2 strings',
  )
  .otherwise(() => null);
```

### 可选属性

```typescript
type Input = { key?: string | number };

match(input)
  .with({ key: P.optional(P.string) }, (a) => {
    return a.key; // string | undefined
  })
  .with({ key: P.optional(P.number) }, (a) => {
    return a.key; // number | undefined
  })
  .exhaustive();
```

### 实例检查

```typescript
class A {
  a = 'a';
}
class B {
  b = 'b';
}

match(input)
  .with({ value: P.instanceOf(A) }, (a) => 'instance of A!')
  .with({ value: P.instanceOf(B) }, (b) => 'instance of B!')
  .exhaustive();
```

## 高级用法

### 1. 选择器 (P.select)

选择器允许你提取匹配的部分：

```typescript
// 基础选择
match(result)
  .with({ type: 'ok', data: { type: 'img', src: P.select() } }, (src) => (
    <img src={src} />
  ))
  .exhaustive();

// 命名选择
type Img = { type: 'img'; src: string };
type Text = { type: 'text'; content: string; length: number };
type User = { type: 'user'; username: string };
type Org = { type: 'org'; orgId: number };

match(input)
  .with({ author: P.select('org', { type: 'org' }) }, ({ org }) => {
    // org: Org
  })
  .with(
    {
      author: P.select('org', { type: 'org' }),
      content: P.select('text', { type: 'text' }),
    },
    ({ org, text }) => {
      // org: Org, text: Text
    },
  )
  .otherwise(() => {});
```

### 2. 守卫模式 (P.when)

使用自定义条件进行匹配：

```typescript
const isString = (x: unknown): x is string => typeof x === 'string';
const isNumber = (x: unknown): x is number => typeof x === 'number';

match(input)
  .with({ id: P.when(isString) }, (narrowed /* { id: string } */) => 'yes')
  .with({ id: P.when(isNumber) }, (narrowed /* { id: number } */) => 'yes')
  .with(
    {
      status: 'loading',
      startTime: P.when((t) => t + 2000 < Date.now()),
    },
    () => 'loading timeout',
  )
  .exhaustive();
```

### 3. 否定模式 (P.not)

排除特定值：

```typescript
match(value)
  .with(P.not('admin'), () => 'not an admin')
  .with(P.not(P.string), () => 'not a string')
  .otherwise(() => 'other');
```

### 4. 联合与交集模式

```typescript
// 联合 - 匹配任一模式
type Input =
  | { type: 'a'; value: string }
  | { type: 'b'; value: number }
  | { type: 'c'; value: boolean };

match(input)
  .with({ type: P.union('a', 'b') }, (x) => 'type a or b')
  .with({ type: 'c' }, () => 'type c')
  .exhaustive();

// 交集 - 必须同时匹配所有模式
class A {
  constructor(public foo: 'bar' | 'baz') {}
}

match(input)
  .with(
    { prop: P.intersection(P.instanceOf(A), { foo: 'bar' }) },
    ({ prop }) => 'A with foo=bar',
  )
  .otherwise(() => 'other');
```

### 5. Set 和 Map 匹配

```typescript
match(value)
  .with(P.set(P.number), (set) => 'a set of numbers')
  .with(P.map('key', P.number), (map) => "map.get('key') is a number")
  .otherwise(() => null);
```

### 6. 从模式推断类型

使用 `P.infer` 从模式定义中提取 TypeScript 类型：

```typescript
const postPattern = {
  title: P.string,
  description: P.optional(P.string),
  content: P.string,
  likeCount: P.number,
};

// 从模式推断类型
type Post = P.infer<typeof postPattern>;
// Post: { title: string, description?: string, content: string, likeCount: number }

const userPattern = {
  name: P.string,
  postCount: P.number,
  bio: P.optional(P.string),
  posts: P.optional(P.array(postPattern)),
};

type User = P.infer<typeof userPattern>;
// User: { name: string, postCount: number, bio?: string, posts?: Post[] }

// 用于运行时验证
const isUserList = isMatching(P.array(userPattern));

const res = await fetchUsers();
if (isUserList(res)) {
  // res: User[]
}
```

### 7. 显式返回类型

使用 `.returnType()` 明确指定返回类型：

```typescript
match({ isAdmin, plan })
  .returnType<number>() // 显式指定返回类型
  .with({ isAdmin: true }, () => 123)
  .with({ plan: 'free' }, () => 456)
  .otherwise(() => 789);
```

## 实际应用案例

### 案例 1: 状态机 Reducer

```typescript
type State =
  | { status: 'idle' }
  | { status: 'loading'; startTime: number }
  | { status: 'success'; data: string }
  | { status: 'error'; error: Error };

type Event =
  | { type: 'fetch' }
  | { type: 'success'; data: string }
  | { type: 'error'; error: Error }
  | { type: 'cancel' };

const reducer = (state: State, event: Event): State =>
  match([state, event])
    .returnType<State>()
    .with([{ status: 'loading' }, { type: 'success' }], ([_, event]) => ({
      status: 'success',
      data: event.data,
    }))
    .with(
      [{ status: 'loading' }, { type: 'error', error: P.select() }],
      (error) => ({ status: 'error', error }),
    )
    .with([{ status: P.not('loading') }, { type: 'fetch' }], () => ({
      status: 'loading',
      startTime: Date.now(),
    }))
    .with(
      [
        {
          status: 'loading',
          startTime: P.when((t) => t + 2000 < Date.now()),
        },
        { type: 'cancel' },
      ],
      () => ({ status: 'idle' }),
    )
    .with(P._, () => state)
    .exhaustive();
```

### 案例 2: API 响应处理

```typescript
type Data = { type: 'text'; content: string } | { type: 'img'; src: string };

type Result = { type: 'ok'; data: Data } | { type: 'error'; error: Error };

const renderResult = (result: Result) =>
  match(result)
    .with({ type: 'error' }, () => <p>Oups! An error occurred</p>)
    .with({ type: 'ok', data: { type: 'text' } }, (res) => (
      <p>{res.data.content}</p>
    ))
    .with({ type: 'ok', data: { type: 'img', src: P.select() } }, (src) => (
      <img src={src} />
    ))
    .exhaustive();
```

### 案例 3: 验证和解析外部数据

```typescript
const responsePattern = {
  data: P.array({
    id: P.string,
    post: P.array({
      title: P.string,
      content: P.string,
    }),
  }),
};

type Response = P.infer<typeof responsePattern>;

const isValidResponse = isMatching(responsePattern);

fetchSomething().then((value: unknown) => {
  if (isValidResponse(value)) {
    // value 的类型已被正确推断
    return value.data;
  }
  throw new Error('unexpected response');
});
```

## 全局模式方法

所有模式都支持这些全局方法：

```typescript
// .optional() - 标记为可选
match(value)
  .with(
    {
      username: P.string,
      displayName: P.string.optional(),
    },
    () => 'matched',
  )
  .otherwise(() => null);

// .select() - 选择匹配的值
match(value)
  .with(
    {
      title: P.string,
      author: { username: P.string.select() },
    },
    (username) => `author is ${username}`,
  )
  .otherwise(() => null);

// .and() - 交集
match(value)
  .with(
    P.instanceOf(Error).and({ source: P.string }),
    () => 'Error with source',
  )
  .otherwise(() => null);

// .or() - 联合
match(value)
  .with(P.string.or(P.number), () => 'string or number')
  .otherwise(() => null);
```

## 最佳实践

### 1. 优先使用 exhaustive()

使用 `.exhaustive()` 而不是 `.otherwise()` 可以获得编译时的详尽性检查，确保处理所有情况。

```typescript
// ✅ 推荐
match(status)
  .with('idle', () => 'idle')
  .with('loading', () => 'loading')
  .with('success', () => 'success')
  .with('error', () => 'error')
  .exhaustive();

// ❌ 不推荐（除非有明确的默认行为）
match(status)
  .with('idle', () => 'idle')
  .with('loading', () => 'loading')
  .otherwise(() => 'other'); // 可能会遗漏 success 和 error
```

### 2. 使用类型推断

充分利用 TS-Pattern 的类型推断能力，减少手动类型注解：

```typescript
// ✅ 推荐 - 自动类型推断
match(input)
  .with({ type: 'user' }, (user) => user.name) // user 自动推断为 User 类型
  .exhaustive();

// ❌ 不需要手动注解
match(input)
  .with({ type: 'user' }, (user: User) => user.name)
  .exhaustive();
```

### 3. 提取复杂模式为常量

对于复杂的模式，建议提取为常量以提高可读性和可重用性：

```typescript
const userPattern = {
  type: 'user' as const,
  name: P.string,
  age: P.number.gte(0),
};

const adminPattern = {
  type: 'admin' as const,
  name: P.string,
  permissions: P.array(P.string),
};

match(input)
  .with(userPattern, (user) => handleUser(user))
  .with(adminPattern, (admin) => handleAdmin(admin))
  .exhaustive();
```

### 4. 利用 P.select 简化代码

使用 `P.select` 可以直接提取需要的数据，避免在处理函数中多次访问：

```typescript
// ✅ 推荐
match(result)
  .with({ type: 'ok', data: { value: P.select() } }, (value) =>
    processValue(value),
  )
  .otherwise(() => null);

// ❌ 不够简洁
match(result)
  .with({ type: 'ok' }, (result) => processValue(result.data.value))
  .otherwise(() => null);
```

## v4 到 v5 的主要变更

如果你正在从 v4 升级到 v5，需要注意以下变更：

### 1. 立即执行 vs 惰性执行

```typescript
// v4: 惰性执行 - 不会执行任何代码
match(input)
  .with({ type: 'ok' }, ({ value }) => {
    console.log(value);
  })
  .with({ type: 'error' }, ({ error }) => {
    throw error;
  });
// 需要 .exhaustive() 或 .otherwise() 才会执行

// v5: 立即执行 - 一旦匹配就立即执行
match(input)
  .with({ type: 'ok' }, ({ value }) => {
    console.log(value); // 立即执行
  })
  .with({ type: 'error' }, ({ error }) => {
    throw error;
  });
```

### 2. Set 和 Map 匹配语法

```typescript
// v4
match(value)
  .with(new Set([P.number]), (set) => 'set of numbers')
  .with(new Map([['key', P.number]]), (map) => 'map');

// v5
match(value)
  .with(P.set(P.number), (set) => 'set of numbers')
  .with(P.map('key', P.number), (map) => 'map');
```

## 性能优化

TS-Pattern 的设计已经相当高效，但如果需要极致性能，可以考虑使用 [Pattycake](https://github.com/aidenybai/pattycake) —— 一个 TS-Pattern 的优化编译器，它可以将模式匹配转换为高效的 if 语句，实现零运行时开销。

## 总结

TS-Pattern 是一个强大而优雅的库，它将模式匹配带入 TypeScript 生态系统。通过：

- **类型安全的模式匹配**：消除运行时错误
- **详尽性检查**：确保处理所有情况
- **丰富的 API**：满足各种复杂场景
- **优秀的类型推断**：减少手动类型注解

你可以编写更加健壮、可读和可维护的 TypeScript 代码。无论是处理复杂的状态机、验证外部数据，还是简化条件逻辑，TS-Pattern 都是一个值得信赖的工具。

## 参考资源

- [官方 GitHub 仓库](https://github.com/gvergnaud/ts-pattern)
- [完整 API 文档](https://github.com/gvergnaud/ts-pattern/blob/main/README.md)
- [v4 到 v5 迁移指南](https://github.com/gvergnaud/ts-pattern/blob/main/docs/v4-to-v5-migration-guide.md)
