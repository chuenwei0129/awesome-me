---
group:
  title: 2024 🐲
  order: -2024
title: 组件设计模式
toc: content
---

## 原始需求

需求很简单，直接看图：

![pic](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/pic.webp)

**分析需求**：一个简单的计数组件，中间现实 Counter 文案和当前计数，左右两边分别是`-`和`＋`按钮，按钮图标可选。再加一个限定：计数可以自定义初始值，且计数最小值为 0，再限定任何一个数字，当前计数超过或等于它时背景色变为红色。

## 一、基础组件模式 (AntdCounter)

最简单直接的组件封装方式，将所有逻辑和 UI 都封装在一个组件中。

```tsx
// 使用方式
import React from 'react';
import { default as AntdCounter } from '../../src/patterns/AntdCounter';

export default () => {
  const onChange = (count: number) => {
    console.log('count', count);
  };

  return <AntdCounter limit={10} initialValue={0} label={'计数器'} iconDecrement={'square-minus'} iconIncrement={'circle-plus'} onChange={onChange} />;
};
```

特点：

- 使用简单，一个组件搞定所有功能
- 适合简单场景
- 扩展性和复用性较差

比如，我想改个按钮颜色都很难做到，显然是因为我们的组件没有暴露这个接口，对使用者来说扩展性和复用性较差。

## 二、复合组件模式 (CompoundCounter)

将组件拆分成多个子组件，通过 Context 共享状态。

```tsx
import React from 'react';

import { default as CompoundCounter } from '../../src/patterns/CompoundCounter';

export default () => {
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <CompoundCounter onChange={handleChangeCounter} initialValue={0}>
      <CompoundCounter.Decrement icon="minus" />
      <CompoundCounter.Label>计数器</CompoundCounter.Label>
      <CompoundCounter.Count limit={10} />
      <CompoundCounter.Increment icon="plus" />
    </CompoundCounter>
  );
};
```

与其将 Counter 组件的所有属性集中在一个庞大的 Counter 组件配置项中，不如根据组件的功能对其进行进一步的细化拆分。每个相关的属性都被分配到独立的子组件 SubComponent 中，这意味着每个单独的「组件子领域」只关注自己的配置项。

这种方法带来了更大的结构灵活性，使得用户界面更加可控。比如，使用者可以轻松地改变子组件 SubComponent 的显示顺序，如下所示：

```tsx
import React from 'react';

import { default as CompoundCounter } from '../../src/patterns/CompoundCounter';

export default () => {
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <CompoundCounter onChange={handleChangeCounter} initialValue={0}>
      <CompoundCounter.Label>计数器</CompoundCounter.Label>
      <CompoundCounter.Increment icon="circle-plus" />
      <CompoundCounter.Count limit={10} />
      <CompoundCounter.Decrement icon="square-minus" />
    </CompoundCounter>
  );
};
```

只使用部分子组件如下：

```tsx
import React from 'react';

import { default as CompoundCounter } from '../../src/patterns/CompoundCounter';

export default () => {
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <CompoundCounter onChange={handleChangeCounter} initialValue={0}>
      <CompoundCounter.Count limit={10} />
      <CompoundCounter.Increment icon="plus" />
    </CompoundCounter>
  );
};
```

那么弊端，总结如下：

过于灵活的 UI，使用者拥有更多控制权，反过来说，组件自身的控制力被削弱。比如使用者可以用如下方式调用。

```tsx | pure{12}
import React from 'react';
import { default as CompoundCounter } from '../../src/patterns/CompoundCounter';

export default () => {
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <CompoundCounter onChange={handleChangeCounter} initialValue={8}>
      <CompoundCounter.Decrement icon="minus" />
      <h1>hello world</h1>
      <CompoundCounter.Label>计数器</CompoundCounter.Label>
      <CompoundCounter.Count limit={10} />
      <CompoundCounter.Increment icon="plus" />
    </CompoundCounter>
  );
};
```

打开控制台，发现报错了，是因为作为组件提供者的我们做了更多的事，即我们对子组件 SubComponent 做了限制，只接受特定的子组件，其他的都不接受。

![20241114113426](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241114113426.png)

## 三、受控组件模式 (ControlledCounter)

如果我们对 Counter 组件进行一点小魔改，把计数状态 count 作为外部的唯一数据源传给 Counter 组件，那么这个组件的状态管理就会变得更为灵活。毕竟，核心状态数据由你来掌控，怎么用全靠你的想法。所谓受控组件：

```tsx
/**
 * title: 受控组件模式
*/

import { ControlledCounter } from '../../src/patterns/ControlledCounter';
import React from 'react';

export default () => {
  const [count, setCount] = React.useState(8);
  // 回调
  const handleChangeCounter = (newVal: number) => {
    setCount(newVal);
  };

  return (
    <ControlledCounter value={count} onChange={handleChangeCounter}>
      <ControlledCounter.Decrement icon="minus" />
      <ControlledCounter.Label>计数器</ControlledCounter.Label>
      <ControlledCounter.Count limit={10} />
      <ControlledCounter.Increment icon="plus" />
    </ControlledCounter>
  );
};
```

```tsx
/**
 * title: 非受控组件模式
*/
import { ControlledCounter } from '../../src/patterns/ControlledCounter';
import React from 'react';

export default () => {
  // 回调
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <ControlledCounter initialValue={8} onChange={handleChangeCounter}>
      <ControlledCounter.Decrement icon="minus" />
      <ControlledCounter.Label>计数器</ControlledCounter.Label>
      <ControlledCounter.Count limit={10} />
      <ControlledCounter.Increment icon="plus" />
    </ControlledCounter>
  );
};
```

## 四、自定义Hook模式 (CustomHookCounter)

将状态逻辑抽离到自定义Hook中。

```tsx
import { CustomHookCounter, useCounter as useCounterCustomHook } from '../../src/patterns/CustomHookCounter';
import React from 'react';

export default () => {
  const [count, increment, decrement] = useCounterCustomHook(0);

  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <>
      <CustomHookCounter value={count} onChange={handleChangeCounter}>
        <CustomHookCounter.Decrement icon="square-minus" onClick={decrement} disabled={count === 1} />
        <CustomHookCounter.Label>计数器</CustomHookCounter.Label>
        <CustomHookCounter.Count limit={10} />
        <CustomHookCounter.Increment icon="circle-plus" onClick={increment} disabled={count === 12} />
      </CustomHookCounter>
    </>
  );
};
```

在 Hooks 设计模式下，调用组件的方式变得更多样化，控制权进一步扩大。

**优势**：

1. **更大的控制权**：使用者可以在 JSX UI 表达式和 Hook 函数中插入自定义逻辑。
2. **灵活的操作能力**：组件设计方对外暴露 `increment` 方法，消费方可以自定义 `handleClickIncrement` 方法，例如，实现 「count >= 6 时，不再进行计数增加」 这一自定义需求。

```tsx
import { CustomHookCounter, useCounter as useCounterCustomHook } from '../../src/patterns/CustomHookCounter';
import React from 'react';

export default () => {
  const [count, increment, decrement] = useCounterCustomHook(0);

  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  return (
    <>
      <CustomHookCounter value={count} onChange={handleChangeCounter}>
        <CustomHookCounter.Decrement icon="square-minus" onClick={decrement} disabled={count === 1} />
        <CustomHookCounter.Label>计数器</CustomHookCounter.Label>
        <CustomHookCounter.Count limit={10} />
        <CustomHookCounter.Increment icon="circle-plus" onClick={increment} disabled={count === 12} />
      </CustomHookCounter>
      {/* 逻辑复用 */}
      <div style={{ marginTop: '20px' }}>
        <button
          type="button"
          onClick={() => {
            if (count < 6) {
              increment();
            }
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4e76a2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            // opacity: count >= 6 ? 0.3 : 1,
            // transition: 'opacity 0.3s ease',
          }}
        >
          Custom increment btn Max 6
        </button>
      </div>
    </>
  );
};
```

弊端？渲染和逻辑进一步进行了分离，使用者需要对渲染和逻辑部分「感知」的更多。如果想用好现在的 Counter 组件，使用者是需要承担一部分心智负担的。

## 五、Props Getter模式 (PropsGetterCounter)

前一步 Custom hook 模式给了使用者更多控制权，这意味着组件本身具有了更灵活、更容易被复用的能力。同时组件复杂度也更高，心智负担陡增。试想一种 Props Getters Pattern，我们可以屏蔽复杂度，**与其通过 props 对外暴露更多的控制力，不如提供一个 props list，让使用方决定是否以及如何进行定制**：`不需要定制（控制）的部分，复杂度屏蔽在组件内部；需要定制的部分，通过 list select 来进行自定义`。

```tsx
import { PropsGetterCounter } from '../../src/patterns/PropsGetterCounter';
import { useCounter as useCounterPropsGetter } from '../../src/patterns/PropsGetterCounter/useCounter';

import React from 'react';

export default () => {
  const { getCounterProps, getIncrementProps, getDecrementProps } = useCounterPropsGetter({
    initialCount: 0,
    max: 12,
  });

  return (
    <>
      <PropsGetterCounter
        {...getCounterProps()}
      >
        <PropsGetterCounter.Decrement icon="minus" {...getDecrementProps({})} />
        <PropsGetterCounter.Label>计数器</PropsGetterCounter.Label>
        <PropsGetterCounter.Count limit={10} />
        <PropsGetterCounter.Increment icon="plus" {...getIncrementProps()} />
      </PropsGetterCounter>
    </>
  );
};
```

这种模式弊端也很明显：使用者需要感知 getter function 返回的所有的 props 内容。一旦有组件内部逻辑的变动，也需要使用者进行感知。

## 六、State Reducer模式 (StateReducerCounter)

我们在设计组件时，将 Custom Hook Pattern 上更进一步，把所有的变动 hooks 集中管理起来，使用 reducer 函数来承载。**reducer 函数由使用方提供**，我们的组件提供状态数据快照，而消费方提供的 reducer 每次都更新当前的数据状态，进而得到最新的数据状态，再交由组件消费。

通过 state reducers，我们将控制权全部交给了使用者。**组件内部的所有 `action`，`state` 都可以被外部感知并控制**。

```tsx
import { CounterActionType, CounterStateType, DECREMENT, StateReducerCounter } from '../../src/patterns/StateReducerCounter';
import { useCounter as useCounterStateReducer } from '../../src/patterns/StateReducerCounter/useCounter';

import React from 'react';

export default () => {
  const handleChangeCounter = (count: number) => {
    console.log('count', count);
  };

  // 覆盖默认 reducer 行为
  const reducer = (state: CounterStateType, action: CounterActionType) => {
    switch (action.type) {
      case DECREMENT:
        return {
          count: Math.max(0, state.count - 2), // The decrement delta was changed for 2 (Default is 1)
        };
      default:
        return useCounterStateReducer.reducer(state, action);
    }
  };

  const { count, decrement, increment } = useCounterStateReducer({ initialCount: 0, max: 10 }, reducer);

  return (
    <>
      <StateReducerCounter value={count} onChange={handleChangeCounter}>
        <StateReducerCounter.Decrement icon="minus" onClick={decrement} />
        <StateReducerCounter.Label>计数器</StateReducerCounter.Label>
        <StateReducerCounter.Count limit={10} />
        <StateReducerCounter.Increment icon="plus" onClick={increment} />
      </StateReducerCounter>
    </>
  );
};
```

## 总结

这六种设计模式各有特点：

- 基础组件模式适合简单场景
- 复合组件模式提供更好的组件复用
- 受控组件模式提供更好的状态管理
- 自定义Hook模式实现逻辑复用
- Props Getter模式提供更好的props管理
- State Reducer模式提供最大的自定义能力

在实际开发中,应根据具体需求选择合适的设计模式。复杂度越高的组件,越需要采用更灵活的设计模式。

## 推荐阅读

- [5 Advanced React Patterns](https://javascript.plainenglish.io/5-advanced-react-patterns-a6b7624267a6)
- [组件标准化: open-ui.org](https://open-ui.org/)
- [headless 组件库系列（1）概念调研](https://zhuanlan.zhihu.com/p/537385085)
- [headless 组件库实现系列（2）core instance](https://zhuanlan.zhihu.com/p/539944257)
