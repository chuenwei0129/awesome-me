---
group:
  title: 2020 🐭
  order: 1
title: CRA 项目配置
toc: content
---

# 记录一次 CRA 初始化项目配置流程

## create-react-app

```perl
npx create-react-app my-app --template typescript
```

## prettier

```perl
# 安装 prettier 依赖
npm i --save-dev --save-exact prettier
# 生成配置文件
echo {}> .prettierrc.cjs
# 生成忽略文件
touch .prettierignore
# 手动格式化项目
# yarn prettier --write .
```

**`.prettierrc.cjs` 配置：**

```js
module.exports = {
  // 一行最多 200 字符
  printWidth: 200,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 行尾不需要分号
  semi: false,
  // 使用单引号
  singleQuote: true,
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // 末尾不需要逗号
  trailingComma: 'none',
  // 大括号内的首尾需要空格
  bracketSpacing: true,
  // 箭头函数，只有一个参数的时候，也需要括号：always，avoid：省略括号
  arrowParens: 'avoid',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 换行符使用 lf
  endOfLine: 'lf'
  // 不格式化 vue 文件，vue 文件的格式化单独设置
  // disableLanguages: ['vue']
}
```

**`.prettierignore` 配置：**

```perl
# Ignore artifacts:
build
coverage
```

## eslint

> Create React App 默认集成了 eslint，但是默认的配置并没有集成 prettier，所以我们需要自己配置一下。

**解决与 prettier 冲突：**

```perl
npm i eslint-config-prettier eslint-plugin-prettier -D
```

**[推荐配置](https://github.com/prettier/eslint-plugin-prettier#recommended-configuration)：**

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest",
    "plugin:prettier/recommended"
  ],
  "rules": {}
},
```

**交互式配置 eslint：**

```perl
npm init @eslint/config
```

## git hooks

### hooks

> Git 有很多的 hooks，让我们在不同的阶段，对代码进行不同的操作，控制提交到仓库的代码的规范性，和准确性。

**以下只是几个常用的钩子：**

- 提交的代码规范

  - **pre-commit**
  - 描述：通过钩子函数，判断提交的代码是否符合规范

- 提交的信息规范

  - **commit-msg**
  - 描述：通过钩子函数，判断 commit 信息是否符合规范

- 提交的代码影响
  - **pre-push**
  - 描述：通过钩子，执行测试，避免对以前的内容造成影响

### 工具

- **husky**：操作 git 钩子的工具
- **lint-staged**：本地暂存代码检查工具
- **commitlint**：commit 信息校验工具
- **commitizen**：辅助 commit 信息，通过选择输入，规范提交信息

### 流程

**安装代码校验依赖：**

```sh
npm i lint-staged husky -D
# 相当于在 package.json 中手动配置 scripts
npm set-script prepare "husky install"
# 初始化 husky，将 git hooks 钩子交由 husky 执行
# 会在根目录创建 .husky 文件夹
npm run prepare
# 添加 pre-commit 命令配置，会在 commit 前执行 npx lint-staged 命令
npx husky add .husky/pre-commit "npx lint-staged"
```

**根目录创建 `.lintstagedrc.json` 文件配置检查和操作方式：**

```json
{
  "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix"],
  "*.md": ["prettier --write"]
}
```

> 更多操作：[Eslint + Prettier + Husky + Commitlint + Lint-staged 规范前端工程代码规范](https://juejin.cn/post/7038143752036155428)

## 路径简写

在 `tsconfig.json` 里指定 `baseUrl` 和 `paths` 路径：

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "utils/*": ["src/utils/*"]
    }
  }
}
```

解释一下，**所谓的 “路径简写” 本质上只是路径映射。所以 `tsconfig.json` 里的 `paths` 就是把 `utils/xxx` 映射成 `src/utils/xxx`。**

也可以不这么写，而是用别名作为路径开头：`import sum from "@/utils/sum"`。这依旧是路径匹配，`tsconfig.json` 的配置相当简单：

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 配置 eslint 规则

**首次提交可能会遇到如下情况：**

```sh
eslint --fix:

/Users/gakki/code/learn-react-api/src/App.test.tsx
2:17 error Unable to resolve path to module './App' import/no-unresolved
2:17 error Missing file extension for "./App" import/extensions
4:1 error 'test' is not defined no-undef
5:10 error 'React' must be in scope when using JSX react/react-in-jsx-scope
5:10 error JSX not allowed in files with extension '.tsx' react/jsx-filename-extension
7:3 error 'expect' is not defined no-undef

/Users/gakki/code/learn-react-api/src/App.tsx
6:5 error 'React' must be in scope when using JSX react/react-in-jsx-scope
6:5 error JSX not allowed in files with extension '.tsx' react/jsx-filename-extension
7:7 error 'React' must be in scope when using JSX react/react-in-jsx-scope
8:9 error 'React' must be in scope when using JSX react/react-in-jsx-scope
9:9 error 'React' must be in scope when using JSX react/react-in-jsx-scope
10:16 error 'React' must be in scope when using JSX react/react-in-jsx-scope
12:9 error 'React' must be in scope when using JSX react/react-in-jsx-scope

/Users/gakki/code/learn-react-api/src/index.tsx
3:17 error Unable to resolve path to module './App' import/no-unresolved
3:17 error Missing file extension for "./App" import/extensions
5:29 error Unable to resolve path to module './reportWebVitals' import/no-unresolved
5:29 error Missing file extension for "./reportWebVitals" import/extensions
9:3 error JSX not allowed in files with extension '.tsx' react/jsx-filename-extension

✖ 18 problems (18 errors, 0 warnings)

husky - pre-commit hook exited with code 1 (error)
```

**解决 [import/no-unresolved](https://github.com/alexgorbatchev/eslint-import-resolver-typescript) 报错：**

```sh
npm i -D eslint-import-resolver-typescript
```

**配置 `.eslintrc.js`：**

```js
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'import'],
  rules: {
    // turn on errors for missing imports
    'import/no-unresolved': 'error',
    // 其它规则
    'import/extensions': 0,
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json'
      }
    }
  }
}
```
