---
title: React 中 Form 的最佳实践
toc: content
group:
  title: 深入探讨
---

## 受控与非受控

```tsx
import React, { useEffect, useRef, useState } from 'react';

export default function App() {
  const [ className, setClassName] = useState('aaa');

  useEffect(() => {
    setTimeout(() => setClassName('bbb'), 2000);
  }, []);

  const containerRef = useRef(null);

  useEffect(() => {
    const targetNode = containerRef.current!;
  
    const callback = function (mutationsList: MutationRecord[]) {
      console.log(mutationsList);
    };
    
    const observer = new MutationObserver(callback);
    
    observer.observe(targetNode, { 
      attributes: true, 
      childList: true, 
      subtree: true 
    });

  }, []);

  return (
    <div>
        <div id="container" ref={containerRef}>
          <div className={className}>
            {
              className === 'aaa' ? <div>aaa</div> : <div>
                <p>bbb</p>
              </div>
            }
          </div>
        </div>
    </div>
  )
}

```

理解 React 中表单的关键点在于 “受控” 与 “非受控” 的概念，这是 React 中构建表单的两种不同的方法。

受控表单使用 `state` 存储每个 `input` 的值，用户输入之后通过 `onChange` 拿到值然后 `setValue`，触发重新渲染。

它们看起来往往是这个样子的：

```tsx
import React, { type ChangeEvent } from 'react';

export default function App() {
  const [value, setValue] = React.useState('初始值');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('🚀 ~ handleChange ~ e.target.value:', e.target.value);
    setValue(e.target.value);
  };

  return <input value={value} onChange={handleChange}></input>;
}
```

注意，用 `<form>` 将 input 包裹起来并且给 input 一个命名从语义上来讲更加准确，但是这不是必需的。
因为数据已经保存在 state 中，所以我们并不需要真正的 onSubmit事件，而且在按钮点击时，我们也并不需要直接访问 input 的值。

这种方式有一些不足之处：

你可能不想要每次用户输入时都去重新渲染组件。
你需要写许多代码去管理复杂的表单，因为随着表单规模的增长，会导致出现大量的 state 和 setSate，从而使代码变的非常臃肿。
构建动态表单将变的非常困难，因为你无法在条件判断中使用像 useState 的 hooks。为了修复这个问题，你可能需要：

整个表单的值将存储在一个巨大的对象中，然而这会导致所有的子组件将在任一其他组件变化时全部重新渲染，因为我们更新的方式是 setState({ ...preState, field: newValue })。 要解决上述的问题，唯一的办法就是缓存，但这又会增加大量的代码。



在大型表单例如表格和 Excel 中，这会导致性能问题。

作者：古茗前端团队
链接：https://juejin.cn/post/7349791638111207434
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

非受控模式就是完全用户自己修改 value，我们只是设置个 defaultValue，可以通过 onChange 或者 ref 拿到表单值。
受控模式是代码来控制 value，用户输入之后通过 onChange 拿到值然后 setValue，触发重新渲染。
单独用的组件，绝大多数情况下，用非受控模式就好了，因为你只是想获取到用户的输入。
受控模式只在需要对用户的输入做一些修改然后再设置到 value 的情况用，再就是实时同步表单值到父组件的时候，比如 Form。
如果需要结合 Form 表单用，那是要支持受控模式，因为 Form 会通过 Store 来统一管理所有表单项。
封装业务组件的话，用非受控模式或者受控都行。
但是基础组件还是都要支持，也就是支持 defaultValue 和 value + onChange 两种参数，内部通过判断 value 是不是 undefined 来区分。
写组件想同时支持受控和非受控，可以直接用 ahooks 的 useControllableValue，也可以自己实现。
arco design、ant design 等组件库都是这么做的，并且不约而同封装了 useMergedValue 的 hook，我们也封装了一个。
理清受控模式和非受控模式的区别，在写组件的时候灵活选用或者都支持。

与受控表单不同的是，非受控表单不在 state 中存储表单的值。相反，非受控表单使用原生 HTML 内置的 `<form>` 的功能和 JavaScript 去管理数据。

非受控模式就是完全用户自己修改 value，我们只是设置个 defaultValue，可以通过 onChange 或者 ref 拿到表单值。


非受控表单的不足之处是你无法直接访问每个 input 的值。这会使自定义校验变的棘手。例如你需要在用户输入手机号的时候格式化手机号。

使用非受控表单的一个好处就是会减少大量的冗余代码：
即便只有 1 个 input，区别也是非常显著的，当有许多 input 时，效果会更加明显：




```tsx
import React, { type ChangeEvent } from 'react';

export default function App() {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('🚀 ~ handleChange ~ e.target.value:', e.target.value);
  };

  return <input defaultValue={'初始值'} onChange={handleChange}></input>;
}
```

```tsx
import React from 'react';

export default function App() {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    console.log('🚀 ~ useEffect ~ inputRef.current?.value:', inputRef.current?.value);
  }, []);

  return <input defaultValue={'初始值'} ref={inputRef}></input>;
}
```

<hr>

<code src="../../../playground/react/control"></code>
