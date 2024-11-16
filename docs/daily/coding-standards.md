---

title: 个人编码习惯
toc: content

---

## 规范整理导入语句块

在大型项目中，文件顶部通常有大量导入语句，包括第三方库、UI 库、项目内工具方法、样式文件和类型等。如果这些导入语句杂乱无章地堆积在一起，后续维护无疑将变得极为困难。为了提升代码的可读性和维护效率，我习惯根据实际意义对这些导入语句进行组织，安排的顺序通常如下：

- 最上面是 React；
- 其次是第三方 UI 组件，然后是项目内封装的其他组件；
- 接着是第三方工具库，再然后是项目内封装的工具方法，其中 hooks 和 utils 等分类的顺序可以根据个人偏好调整；
- 类型导入，包括第三方库的类型导入和项目内的类型导入；
- 最后是样式文件，使用 `CSS-IN-JS` 方案的组件应该在第二部分的其他组件部分中规范。

示例如下：

```typescript
import { useEffect } from 'react';

import { Button, Dialog } from 'ui';
import { ChildComp } from './child';

import { store } from '@/store';
import { useCookie } from '@/hooks/useCookie';
import { SOME_CONSTANTS } from '@/utils/constants';

import type { FC } from 'react';
import type { Foo } from '@/typings/foo';
import type { Shared } from '@/typings/shared';

import styles from './index.module.scss';
```

## 项目中的类型声明文件

在使用 TypeScript 开发项目时，常常需要处理大量的类型代码。而如何有序地存放这些类型代码显得尤为重要。目前，我采用的方式是，在项目中创建一个专门的文件夹来存放类型代码（对于仅在组件内部使用的类型，建议遵循就近原则，直接放在组件代码附近）。这些类型代码按照其功能进一步划分，大致分布如下：

```text
PROJECT
├── src
│   ├── types
│   │   ├── shared.ts
│   │   ├── [biz].ts
│   │   ├── request.ts
│   │   ├── tool.ts
│   ├── typings.d.ts
└── tsconfig.json
```

下面详细讲解这些类型声明文件的作用：

- `shared.ts`：存放被其他类型定义所引用的类型，如简单的联合类型封装和基础工具类型等。

- `[biz].ts`：保存与业务逻辑相关的类型定义，例如 `user.ts` 和 `module.ts` 等。推荐在中大型项目中尽可能按照业务模型进行细粒度拆分。

- `request.ts`：定义请求相关的类型。在这其中，建议定义响应结构体，并使用业务逻辑类型进行填充：

  ```typescript
  import type { Status } from './shared';

  export interface IRequestStruct<TData = never> {
      status: Status;
      code: number;
      data: TData;
  }

  export interface IPaginationRequestStruct<TData = never> {
      status: Status;
      curPage: number;
      totalCount: number;
      hasNextPage: boolean;
      data: TData[];
  }
  ```

  实际使用时：

  ```typescript
  import type { IPaginationRequestStruct } from '@/types/request';
  import type { IUserProfile } from '@/types/user';

  export function fetchUserList(): Promise<IPaginationRequestStruct<IUserProfile>> {}
  ```

  通过这种方式，可以在类型定义之间建立清晰且与业务逻辑一致的引用关系。

- `tool.ts`：用于定义工具类型。通常比较通用的工具类型应该抽离到一个专门的工具类型库，这里只存放特殊使用场景的工具类型。

- `typings.d.ts`：用于全局类型声明，包含非代码文件的导入、无类型 npm 包的类型声明、全局变量的类型定义等。你也可以根据需要进一步拆分为 `env.d.ts`、`runtime.d.ts`、`module.d.ts` 等文件，各司其职。

在实践中，该规范的粒度可能尚不能满足你的需求，但你可以根据这个思路进行类型定义的梳理和妥善放置。
