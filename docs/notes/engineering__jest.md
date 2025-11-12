---
group:
  title: engineering
  order: 99
title: Jest
toc: content
---

# Jest 29 使用指南

## 安装与初始化

### 安装 Jest

```bash
npm i -D jest@29
```

### 初始化配置文件

安装 Jest 后，用 jest-cli 初始化 jest 配置文件：

```bash
npx jest --init
```

初始化配置文件时，Jest 会问你一堆问题，可以先按我下面的图来选择（只打开覆盖率和自动清除 Mock），别的以后再说：

![20251112045955](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/awesome-me/20251112045955.png)

执行完之后，就会看到有一个 `jest.config.js` 的配置文件。

:::tip
建议不要犯了强迫症把 `jest.config.js` 的注释去掉，它们可以作为配置 Jest 的简单版文档。
:::

## 第一个测试

有了基本配置后，添加一个工具函数文件 `sum.js` 作为我们第一个业务文件：

```javascript
const sum = (a, b) => {
  return a + b;
};

module.exports = sum;
```

然后，添加我们项目的第一个测试用例 `sum.test.js`：

```javascript
const sum = require('./sum');

describe('sum', () => {
  it('可以做加法', () => {
    expect(sum(1, 1)).toEqual(2);
  });
});
```

一切就绪，执行以下命令启动测试：

```bash
npx jest
```

Jest 会在 `coverage` 目录下生成各种不同格式的覆盖率报告文件，有 XML、JSON，也有 HTML 的。生成这么多不同格式的测试报告是为了方便不同工具的读取，比如 JS 读 JSON 就比读 XML 容易，它们描述的内容都是一样的。

## TypeScript 支持

在现代前端开发中，无论我们写业务还是写测试，都会采用比较高级的 JavaScript 语法，或者 TypeScript。

但是，Jest 本身不做代码转译工作。在执行测试时，它会调用已有的转译器/编译器来做代码转译。在前端，我们最熟悉的两个转译器就是 Babel 以及 TSC 了。

**使用 ts-jest：**

Jest 本身不做转译，而是利用别的转译器的能力来转译。因此，我们除了用 tsc 来转译，还能用其它转译器。

:::warning
Babel 做转译的缺点是无法让 Jest 在运行时做类型检查，所以更推荐使用 `ts-jest`，利用 tsc 来转译 TypeScript。
:::

**安装 ts-jest：**

```bash
npm i -D typescript ts-jest@29 @types/jest@29
```

:::warning{title=版本兼容性}
这里 `ts-jest` 一定要和 `jest` 的大版本一致！比如 29 对 29，否则会有兼容问题！同样地，`@types/jest` 的大版本最好和 jest 一样。
:::

**配置 ts-jest：**

在 `jest.config.js` 里添加配置：

```javascript
/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  // ...
};
```

## 路径简写与别名

在大型项目中，我们不希望写 `../../src/utils/sum` 这么长的路径，而是写成 `utils/sum` 这样更简洁的形式。

难道每次都要在 `tsconfig.json` 和 `jest.config.js` 写两份配置吗？

很遗憾，确实如此。造成这个问题的主要原因是 jest 根本不管 tsc。

### 配置 TypeScript 路径映射

我们需要在 `tsconfig.json` 里指定 `baseUrl` 和 `paths`：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "utils/*": ["src/utils/*"]
    }
  }
}
```

### 使用 pathsToModuleNameMapper

`ts-jest` 提供了 `pathsToModuleNameMapper` 工具函数，可以自动复制 `tsconfig.json` 的配置到 `jest.config.js`：

```javascript
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
};
```

## JSDOM 测试环境

在很多时候，我们前端的代码往往只在浏览器里运行，经常要用到浏览器的 API。

### 示例：测试 localStorage

创建一个使用 `localStorage` 的模块：

```typescript
// storage.ts
const KEY_NAME = 'my-app-';

const set = (key: string, value: string) => {
  localStorage.setItem(KEY_NAME + key, value);
};

const get = (key: string) => {
  return localStorage.getItem(KEY_NAME + key);
};

export default {
  get,
  set,
};
```

编写测试用例：

```typescript
// storage.test.ts
import storage from './storage';

describe('storage', () => {
  it('设置值', () => {
    storage.set('key', 'value');
    expect(localStorage.getItem('my-app-key')).toEqual('value');
  });

  it('获取值', () => {
    localStorage.setItem('my-app-newKey', 'newValue');
    expect(storage.get('newKey')).toEqual('newValue');
  });
});
```

### 安装 JSDOM

由于 Node.js 环境并没有 `localStorage`，需要安装 `jest-environment-jsdom`：

```bash
npm i -D jest-environment-jsdom@29
```

### 配置测试环境

在 `jest.config.js` 中配置：

```javascript
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  // ...
};
```

添加 jsdom 测试环境后，全局会自动拥有完整的浏览器标准 API。原理是使用了 [jsdom](https://github.com/jsdom/jsdom)，这个库用 JavaScript 实现了一套 Node.js 环境下的 Web 标准 API。

### 针对单个测试文件指定环境

你也可以使用注释为单个测试文件指定环境：

```javascript
/**
 * @jest-environment jsdom
 */

test('使用 jsdom 环境', () => {
  const element = document.createElement('div');
  expect(element).not.toBeNull();
});
```

### 自定义 JSDOM 环境选项

从 Jest 28 开始，你可以在测试中使用内联注释为 JSDOM 提供选项。例如，设置 URL 和自定义 HTML：

```javascript
/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */

test('使用 jsdom 并设置 URL', () => {
  expect(window.location.href).toBe('https://jestjs.io/');
});
```

在配置文件中设置：

```javascript
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: '<html lang="zh-cmn-Hant"></html>',
    url: 'https://jestjs.io/',
    userAgent: 'Agent/007',
  },
};
```

### Mock 浏览器 API

JSDOM 不支持所有浏览器 API，比如 `window.matchMedia`。你需要手动 mock：

```javascript
// matchMedia.mock.js
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

在测试文件中导入：

```javascript
import './matchMedia.mock'; // 必须在被测试文件之前导入
import { myMethod } from './file-to-test';

describe('myMethod()', () => {
  // 测试代码...
});
```

## Mock 函数

### 创建 Mock 函数

Jest 提供了强大的 mock 功能：

```javascript
// 创建一个简单的 mock 函数
const mockFn = jest.fn();

// 创建带有返回值的 mock 函数
const mockFnWithReturn = jest.fn(() => 'default value');

// 链式调用设置不同的返回值
const myMock = jest.fn();
myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// 输出: 10, 'x', true, true
```

### TypeScript 中使用 Mock

```typescript
import { expect, jest, test } from '@jest/globals';
import type add from './add';

test('mock 函数类型推断', () => {
  // 创建带类型的 mock 函数
  const mockAdd = jest.fn<typeof add>();

  // mockImplementation 现在可以正确推断参数类型
  mockAdd.mockImplementation((a, b) => {
    return a + b;
  });

  expect(mockAdd(1, 2)).toBe(3);
  expect(mockAdd).toHaveBeenCalledTimes(1);
  expect(mockAdd).toHaveBeenCalledWith(1, 2);
});
```

### Mock 模块

```javascript
// utils.js
export default {
  authorize: () => 'token',
  isAuthorized: (secret) => secret === 'wizard',
};
```

```javascript
// utils.test.js
import utils from './utils';

jest.mock('./utils');

test('mock 模块测试', () => {
  // 模块方法自动变成 mock 函数
  expect(utils.authorize.mock).toBeTruthy();
  expect(utils.isAuthorized.mock).toBeTruthy();

  // 提供自定义实现或返回值
  utils.authorize.mockReturnValue('mocked_token');
  utils.isAuthorized.mockReturnValue(true);

  expect(utils.authorize()).toBe('mocked_token');
  expect(utils.isAuthorized('not_wizard')).toBeTruthy();
});
```

### 使用 jest.mocked() 进行类型安全的 Mock

```typescript
import { jest } from '@jest/globals';
import { song } from './song';

jest.mock('./song');

const mockedSong = jest.mocked(song);

test('深度方法类型正确', () => {
  mockedSong.one.more.time.mockReturnValue(12);

  expect(mockedSong.one.more.time(10)).toBe(12);
  expect(mockedSong.one.more.time.mock.calls).toHaveLength(1);
});
```

## Mock Timer

通过 Fake Timer，我们可以控制时间流逝，而不需要真的等待延时。

### 基本使用

```javascript
describe('Timer 测试', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('在指定时间后执行回调', () => {
    const callback = jest.fn();
    setTimeout(callback, 1000);

    // 快进 500ms
    jest.advanceTimersByTime(500);
    expect(callback).not.toHaveBeenCalled();

    // 再快进 500ms
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('执行所有 timer', () => {
    const callback = jest.fn();
    setTimeout(callback, 1000);
    setTimeout(callback, 2000);

    // 执行所有 pending 的 timer
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(2);
  });

  test('只执行当前 pending 的 timer', () => {
    const callback = jest.fn();

    setTimeout(() => {
      callback();
      // 这个 timer 在第一个 timer 的回调中创建
      setTimeout(callback, 1000);
    }, 1000);

    // 只运行当前队列中的 timer
    jest.runOnlyPendingTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
```

## 测试生命周期与设置

### setupFilesAfterEnv vs setupFiles

Jest 提供了两个配置选项来在测试前运行设置代码：

- **`setupFiles`**：在引入测试环境（比如 jsdom）**之后**执行的代码
- **`setupFilesAfterEnv`**：在安装测试框架（Jest/Jasmine）**之后**执行的代码

![20251112061252](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/awesome-me/20251112061252.png)

:::info{title=推荐使用}
`setupFilesAfterEnv` 可以访问 Jest 的全局变量（如 `expect`），适合添加自定义匹配器、配置测试框架插件。
:::

### 配置 setupFilesAfterEnv

```javascript
/** @type {import('jest').Config} */
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};
```

```typescript
// jest-setup.ts
import { expect } from '@jest/globals';
import matchers from 'jest-extended';

// 扩展 Jest 匹配器
expect.extend(matchers);

// 全局测试钩子
afterEach(() => {
  jest.useRealTimers();
});

// 添加自定义匹配器
expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});
```

### 全局钩子

```javascript
// 在所有测试文件之前运行一次
beforeAll(() => {
  const globalDatabase = makeGlobalDatabase();
  return globalDatabase.clear().then(() => {
    return globalDatabase.insert({ testData: 'foo' });
  });
});

// 每个测试之前运行
beforeEach(() => {
  // 重置 mocks
  jest.clearAllMocks();
});

// 每个测试之后运行
afterEach(() => {
  // 清理工作
  jest.useRealTimers();
});

// 所有测试之后运行一次
afterAll(() => {
  // 清理全局资源
});
```

## 常用配置选项

### 完整配置示例

```javascript
/** @type {import('jest').Config} */
module.exports = {
  // 基础配置
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  rootDir: '.',

  // 文件匹配
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // 路径映射
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // 转换器
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // 覆盖率
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/__tests__/'],

  // 全局设置
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  clearMocks: true,
  restoreMocks: true,

  // 性能
  maxWorkers: '50%',

  // 其他
  verbose: true,
};
```

### TypeScript 配置示例

```typescript
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};

export default config;
```

## 常用测试技巧

### 测试异步代码

```javascript
// Promise
test('异步测试 - Promise', () => {
  return fetchData().then((data) => {
    expect(data).toBe('peanut butter');
  });
});

// async/await
test('异步测试 - async/await', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

// 测试 Promise reject
test('测试失败情况', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});

// 使用 rejects
test('使用 rejects', async () => {
  await expect(fetchData()).rejects.toMatch('error');
});
```

### 测试类和构造函数

```javascript
// SoundPlayer.js
export default class SoundPlayer {
  constructor() {
    this.foo = 'bar';
  }

  playSoundFile(fileName) {
    console.log('Playing sound file ' + fileName);
  }
}
```

```javascript
// SoundPlayer.test.js
import SoundPlayer from './SoundPlayer';

jest.mock('./SoundPlayer');

const mockPlaySoundFile = jest.fn();
SoundPlayer.mockImplementation(() => {
  return { playSoundFile: mockPlaySoundFile };
});

beforeEach(() => {
  SoundPlayer.mockClear();
  mockPlaySoundFile.mockClear();
});

test('检查构造函数是否被调用', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  expect(SoundPlayer).toHaveBeenCalledTimes(1);
});

test('检查实例方法是否被调用', () => {
  const soundPlayerConsumer = new SoundPlayerConsumer();
  const coolSoundFileName = 'song.mp3';
  soundPlayerConsumer.playSomethingCool();
  expect(mockPlaySoundFile).toHaveBeenCalledWith(coolSoundFileName);
});
```

### 快照测试

```javascript
test('快照测试', () => {
  const tree = renderer
    .create(<Link page="https://example.com">Example</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

// 内联快照
test('内联快照', () => {
  expect(data).toMatchInlineSnapshot(`
    Object {
      "name": "John",
      "age": 30,
    }
  `);
});
```

## 常用匹配器

### 基础匹配器

```javascript
// 相等性
expect(value).toBe(4); // 严格相等 ===
expect(value).toEqual(4); // 深度相等
expect(value).not.toBe(4); // 取反

// 真值
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();
expect(value).toBeDefined();

// 数字
expect(value).toBeGreaterThan(3);
expect(value).toBeGreaterThanOrEqual(3.5);
expect(value).toBeLessThan(5);
expect(value).toBeLessThanOrEqual(4.5);
expect(0.1 + 0.2).toBeCloseTo(0.3); // 浮点数

// 字符串
expect('team').toMatch(/I/);
expect('Christoph').toMatch(/stop/);

// 数组和可迭代对象
expect(['apple', 'banana']).toContain('apple');
expect(new Set(['apple', 'banana'])).toContain('apple');

// 异常
expect(() => {
  throw new Error('error');
}).toThrow();
expect(() => {
  throw new Error('error');
}).toThrow('error');
expect(() => {
  throw new Error('error');
}).toThrow(/error/);
```

### Promise 匹配器

```javascript
// resolves
await expect(Promise.resolve('lemon')).resolves.toBe('lemon');

// rejects
await expect(Promise.reject(new Error('octopus'))).rejects.toThrow('octopus');
```

### Mock 函数匹配器

```javascript
const mockFn = jest.fn();
mockFn(1, 2);
mockFn(3, 4);

// 检查调用
expect(mockFn).toHaveBeenCalled();
expect(mockFn).toHaveBeenCalledTimes(2);
expect(mockFn).toHaveBeenCalledWith(1, 2);
expect(mockFn).toHaveBeenLastCalledWith(3, 4);
expect(mockFn).toHaveBeenNthCalledWith(1, 1, 2);

// 检查返回值
mockFn.mockReturnValue('result');
expect(mockFn()).toBe('result');
```

## 调试技巧

### 只运行特定测试

```javascript
// 只运行这个测试
test.only('只运行这个测试', () => {
  expect(1 + 1).toBe(2);
});

// 跳过这个测试
test.skip('跳过这个测试', () => {
  expect(1 + 1).toBe(2);
});

// describe 也支持 only 和 skip
describe.only('只运行这个测试套件', () => {
  // ...
});
```

### 调试输出

```javascript
// 在测试中打印调试信息
test('调试', () => {
  console.log('Debug info:', value);
  expect(value).toBe(expected);
});

// 使用 debug 工具
import { debug } from 'jest-preview';

test('可视化调试', () => {
  const { container } = render(<MyComponent />);
  debug(container); // 在浏览器中查看 DOM
});
```

## 最佳实践

1. **测试命名清晰**：使用描述性的测试名称，清楚说明测试的内容
2. **保持测试独立**：每个测试应该独立运行，不依赖其他测试
3. **使用 beforeEach/afterEach**：在每个测试前后清理状态
4. **避免测试实现细节**：测试行为而不是实现
5. **合理使用 Mock**：只 mock 必要的依赖
6. **保持测试简单**：一个测试只测试一件事
7. **使用有意义的断言消息**：帮助快速定位问题
8. **定期运行测试**：集成到 CI/CD 流程中

## React 测试

### 安装 React Testing Library

React Testing Library 是测试 React 组件的推荐工具，它鼓励编写更接近用户行为的测试。

```bash
npm i -D @testing-library/react@latest @testing-library/jest-dom@latest @testing-library/user-event@latest
```

:::tip React 19 支持
最新版本的 React Testing Library 完全支持 React 19 的新特性。
:::

### 配置 Testing Library

在 `jest-setup.ts` 中导入 jest-dom 扩展匹配器：

```typescript
// jest-setup.ts
import '@testing-library/jest-dom';
```

在 `jest.config.js` 中配置：

```javascript
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  // ...
};
```

### 基本用法

#### 渲染组件

```typescript
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Greeting } from './Greeting';

test('渲染欢迎信息', () => {
  render(<Greeting name="张三" />);

  // 使用 screen 查询元素
  expect(screen.getByText('你好, 张三!')).toBeInTheDocument();
});
```

#### 组件示例

```typescript
// Greeting.tsx
interface GreetingProps {
  name: string;
}

export function Greeting({ name }: GreetingProps) {
  return <h1>你好, {name}!</h1>;
}
```

### 查询元素

React Testing Library 提供了多种查询方式，优先级从高到低：

#### 1. getByRole（推荐）

按照可访问性角色查询，最接近用户体验：

```typescript
test('使用 role 查询', () => {
  render(
    <div>
      <button>提交</button>
      <input type="text" />
      <h1>标题</h1>
    </div>
  );

  // 查询按钮
  const button = screen.getByRole('button', { name: '提交' });

  // 查询输入框
  const input = screen.getByRole('textbox');

  // 查询标题
  const heading = screen.getByRole('heading', { level: 1 });
});
```

#### 2. getByLabelText

通过 label 标签查询表单元素：

```typescript
test('通过 label 查询', () => {
  render(
    <div>
      <label htmlFor="username">用户名</label>
      <input id="username" />
    </div>
  );

  const input = screen.getByLabelText('用户名');
  expect(input).toBeInTheDocument();
});
```

#### 3. getByText

通过文本内容查询：

```typescript
test('通过文本查询', () => {
  render(<button>点击我</button>);

  // 完全匹配
  screen.getByText('点击我');

  // 正则表达式
  screen.getByText(/点击/i);
});
```

#### 4. getByTestId

最后的选择，用于难以通过其他方式查询的元素：

```typescript
test('通过 testId 查询', () => {
  render(<div data-testid="custom-element">内容</div>);

  const element = screen.getByTestId('custom-element');
  expect(element).toHaveTextContent('内容');
});
```

### 查询变体

每种查询都有三个变体：

```typescript
// getBy：找不到元素时抛出错误
const button = screen.getByRole('button');

// queryBy：找不到元素时返回 null（用于断言元素不存在）
const button = screen.queryByRole('button');
expect(button).not.toBeInTheDocument();

// findBy：异步查询，返回 Promise（用于等待元素出现）
const button = await screen.findByRole('button');
```

### 用户交互

使用 `@testing-library/user-event` 模拟用户操作（推荐）：

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('用户交互测试', async () => {
  const user = userEvent.setup();

  render(<LoginForm />);

  // 在输入框中输入
  await user.type(
    screen.getByLabelText('用户名'),
    '张三'
  );

  // 点击按钮
  await user.click(screen.getByRole('button', { name: '登录' }));

  // 双击
  await user.dblClick(screen.getByRole('button'));

  // 悬停
  await user.hover(screen.getByText('提示'));

  // 选择下拉选项
  await user.selectOptions(
    screen.getByRole('combobox'),
    '选项1'
  );

  // 上传文件
  const file = new File(['hello'], 'hello.png', { type: 'image/png' });
  await user.upload(screen.getByLabelText('上传文件'), file);
});
```

### 异步测试

#### 使用 findBy 查询

```typescript
test('等待元素出现', async () => {
  render(<AsyncComponent />);

  // 点击加载按钮
  const user = userEvent.setup();
  await user.click(screen.getByText('加载数据'));

  // 等待数据加载完成
  const data = await screen.findByText('数据已加载');
  expect(data).toBeInTheDocument();
});
```

#### 使用 waitFor

```typescript
import { render, screen, waitFor } from '@testing-library/react';

test('等待异步操作', async () => {
  const { rerender } = render(<Counter />);

  await waitFor(() => {
    expect(screen.getByText('计数: 0')).toBeInTheDocument();
  });

  // 等待特定条件
  await waitFor(
    () => {
      expect(screen.getByText('加载完成')).toBeInTheDocument();
    },
    { timeout: 3000 } // 自定义超时时间
  );
});
```

#### 测试异步表单提交

```typescript
test('提交表单', async () => {
  const handleSubmit = jest.fn();
  const user = userEvent.setup();

  render(<MyForm onSubmit={handleSubmit} />);

  // 填写表单
  await user.type(screen.getByLabelText('姓名'), '张三');
  await user.type(screen.getByLabelText('邮箱'), 'zhang@example.com');

  // 提交表单
  await user.click(screen.getByRole('button', { name: '提交' }));

  // 等待提交完成
  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith({
      name: '张三',
      email: 'zhang@example.com',
    });
  });
});
```

### 测试 Hooks

#### 使用组件包装测试

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

function TestComponent() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}

test('测试 useState hook', async () => {
  const user = userEvent.setup();
  render(<TestComponent />);

  expect(screen.getByText('计数: 0')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: '增加' }));

  expect(screen.getByText('计数: 1')).toBeInTheDocument();
});
```

#### 测试自定义 Hook

```typescript
// useCounter.ts
export function useCounter(initialValue = 0) {
  const [count, setCount] = React.useState(initialValue);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);

  return { count, increment, decrement, reset };
}
```

```typescript
// useCounter.test.tsx
function TestHarness({ initialValue = 0 }: { initialValue?: number }) {
  const { count, increment, decrement, reset } = useCounter(initialValue);

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={increment}>增加</button>
      <button onClick={decrement}>减少</button>
      <button onClick={reset}>重置</button>
    </div>
  );
}

test('useCounter hook', async () => {
  const user = userEvent.setup();
  render(<TestHarness initialValue={5} />);

  expect(screen.getByText('计数: 5')).toBeInTheDocument();

  await user.click(screen.getByText('增加'));
  expect(screen.getByText('计数: 6')).toBeInTheDocument();

  await user.click(screen.getByText('重置'));
  expect(screen.getByText('计数: 5')).toBeInTheDocument();
});
```

### 测试 Context

```typescript
// ThemeContext.tsx
const ThemeContext = React.createContext({ theme: 'light' });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return React.useContext(ThemeContext);
}
```

```typescript
// ThemeButton.test.tsx
function ThemeButton() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      当前主题: {theme}
    </button>
  );
}

test('测试 Context', async () => {
  const user = userEvent.setup();

  render(
    <ThemeProvider>
      <ThemeButton />
    </ThemeProvider>
  );

  expect(screen.getByText(/当前主题: light/)).toBeInTheDocument();

  await user.click(screen.getByRole('button'));

  expect(screen.getByText(/当前主题: dark/)).toBeInTheDocument();
});
```

### 自定义 Render 函数

创建一个自定义 render 函数来包装常用的 Provider：

```typescript
// test-utils.tsx
import { render, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}

export function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllTheProviders, ...options });
}

// 重新导出所有内容
export * from '@testing-library/react';
export { customRender as render };
```

使用自定义 render：

```typescript
import { render, screen } from './test-utils';

test('使用自定义 render', () => {
  render(<MyComponent />);
  // 组件已经被 providers 包装
});
```

### Mock 模块和 API

#### Mock API 请求

```typescript
// api.ts
export async function fetchUser(id: string) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

```typescript
// UserProfile.test.tsx
import { fetchUser } from './api';

jest.mock('./api');
const mockFetchUser = fetchUser as jest.MockedFunction<typeof fetchUser>;

test('加载用户数据', async () => {
  mockFetchUser.mockResolvedValue({
    id: '1',
    name: '张三',
    email: 'zhang@example.com',
  });

  render(<UserProfile userId="1" />);

  expect(screen.getByText('加载中...')).toBeInTheDocument();

  const userName = await screen.findByText('张三');
  expect(userName).toBeInTheDocument();
  expect(screen.getByText('zhang@example.com')).toBeInTheDocument();
});
```

#### 使用 MSW (Mock Service Worker)

```bash
npm i -D msw@latest
```

```typescript
// mocks/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/users/:id', ({ params }) => {
    return HttpResponse.json({
      id: params.id,
      name: '张三',
      email: 'zhang@example.com',
    });
  }),

  http.post('/api/login', async ({ request }) => {
    const { username, password } = await request.json();

    if (username === 'admin' && password === 'password') {
      return HttpResponse.json({ token: 'fake-token' });
    }

    return new HttpResponse(null, { status: 401 });
  }),
];
```

```typescript
// mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

```typescript
// jest-setup.ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

// 在所有测试前启动 MSW server
beforeAll(() => server.listen());

// 每个测试后重置 handlers
afterEach(() => server.resetHandlers());

// 所有测试后关闭 server
afterAll(() => server.close());
```

```typescript
// UserProfile.test.tsx
import { server } from './mocks/server';
import { http, HttpResponse } from 'msw';

test('处理 API 错误', async () => {
  // 覆盖默认 handler
  server.use(
    http.get('/api/users/:id', () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  render(<UserProfile userId="1" />);

  const error = await screen.findByText('加载失败');
  expect(error).toBeInTheDocument();
});
```

### React Testing Library 最佳实践

1. **优先使用 getByRole**：这是最接近用户体验的查询方式
2. **避免使用 container.querySelector**：这是实现细节
3. **测试用户行为而非实现**：不要测试组件内部状态
4. **使用 userEvent 而非 fireEvent**：userEvent 更接近真实用户行为
5. **等待异步操作**：使用 findBy 或 waitFor
6. **避免使用 testId**：除非没有其他方式查询元素
7. **测试可访问性**：使用 role 查询可以同时验证可访问性

### 常用的 jest-dom 匹配器

```typescript
// 元素是否在文档中
expect(element).toBeInTheDocument();
expect(element).not.toBeInTheDocument();

// 元素是否可见
expect(element).toBeVisible();
expect(element).not.toBeVisible();

// 文本内容
expect(element).toHaveTextContent('文本');
expect(element).toHaveTextContent(/正则/);

// 表单元素
expect(input).toHaveValue('value');
expect(checkbox).toBeChecked();
expect(button).toBeDisabled();
expect(button).toBeEnabled();

// 属性
expect(element).toHaveAttribute('href', '/path');
expect(element).toHaveClass('className');

// 样式
expect(element).toHaveStyle('display: none');
expect(element).toHaveStyle({
  display: 'none',
  color: 'red',
});

// 焦点
expect(input).toHaveFocus();
```

## 参考资源

- [Jest 官方文档](https://jestjs.io/)
- [ts-jest 文档](https://kulshekhar.github.io/ts-jest/)
- [Testing Library](https://testing-library.com/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [user-event](https://testing-library.com/docs/user-event/intro)
- [jest-dom](https://github.com/testing-library/jest-dom)
- [MSW (Mock Service Worker)](https://mswjs.io/)
- [Jest Extended](https://jest-extended.jestcommunity.dev/)
