---
group:
  title: 2022 🐯
  order: -2022
title: dispatchEvent
toc: content
---

# EventTarget.dispatchEvent

与浏览器原生事件不同，**原生事件**是由 DOM 派发的，并通过 `event loop` **异步调用**事件处理程序，而 `dispatchEvent()` 则是 **同步调用** 事件处理程序。在调用 `dispatchEvent()` 后，所有监听该事件的事件处理程序将在代码继续前执行并返回。

## 示例

### 使用原生点击事件

以下示例展示了使用原生点击事件的行为：

```tsx
import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const button = document.querySelector<HTMLButtonElement>('#native-button')

    const handleClickListener1 = () => {
      Promise.resolve().then(() => {
        alert('Microtask 1');
      });
      alert('Listener 1');
    };

    const handleClickListener2 = () => {
      Promise.resolve().then(() => {
        alert('Microtask 2');
      });
      alert('Listener 2');
    };

    button?.addEventListener('click', handleClickListener1);
    button?.addEventListener('click', handleClickListener2);

    return () => {
      button?.removeEventListener('click', handleClickListener1);
      button?.removeEventListener('click', handleClickListener2);
    };
  }, []);

  return (
    <div>
      <button id="native-button">native click</button>
    </div>
  );
};

export default App;
```

点击按钮，`alert` 顺序为：`Listener 1 -> Microtask 1 -> Listener 2 -> Microtask 2`。

### 使用 `dispatchEvent()`

现在，我们使用 `dispatchEvent()` 来模拟点击事件：

```tsx
import React, { useEffect, useRef } from 'react';

const App = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickListener1 = () => {
      Promise.resolve().then(() => {
        alert('Microtask 1');
      });
      alert('Listener 1');
    };

    const handleClickListener2 = () => {
      Promise.resolve().then(() => {
        alert('Microtask 2');
      });
      alert('Listener 2');
    };

    buttonRef.current?.addEventListener('click', handleClickListener1);
    buttonRef.current?.addEventListener('click', handleClickListener2);

    return () => {
      buttonRef.current?.removeEventListener('click', handleClickListener1);
      buttonRef.current?.removeEventListener('click', handleClickListener2);
    };
  }, []);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    buttonRef.current?.click();
  };

  return (
    <div>
      <button className="hidden" ref={buttonRef}>native click</button>
      <button onClick={onClick} >dispatch click</button>
    </div>
  );
};

export default App;
```

使用 `dispatchEvent()` 模拟点击事件，`alert` 顺序为：`Listener 1 -> Listener 2  -> Microtask 1 -> Microtask 2`。

## 事件冒泡

### 使用原生点击事件

以下示例展示了事件冒泡中的原生点击行为：

```tsx
import React, { useRef } from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  background-color: #ccc;
  width: 200px;
  height: 200px;
`;

const Inner = styled.div`
  background-color: red;
  width: 100px;
  height: 100px;
`;

const EventLoopExample: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null!);
  const innerRef = useRef<HTMLDivElement>(null!);

  React.useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;

    const callback = () => {
      alert('click'); // 当元素被点击时，打印 'click'

      setTimeout(() => {
        alert('timeout'); // 0 毫秒后，打印 'timeout'
      }, 0);

      Promise.resolve().then(() => {
        alert('promise'); // 当前事件循环结束时，打印 'promise'
      });
    };

    inner.addEventListener('click', callback);
    outer.addEventListener('click', callback);

    return () => {
      inner.removeEventListener('click', callback);
      outer.removeEventListener('click', callback);
    };
  }, []);

  return (
    <div>
      <Outer ref={outerRef}>
        <Inner ref={innerRef} />
      </Outer>
    </div>
  );
};

export default EventLoopExample;
```

解释：这里难点在于计时器执行时间是 0 毫秒，但计时器执行顺序是看超时时间的。

点击内部红色区域，`alert` 顺序为：`click -> promise -> click -> promise -> timeout -> timeout`。

### 使用 `dispatchEvent()`

现在，我们使用 `dispatchEvent()` 来模拟点击内部红色区域：

```tsx
import React, { useRef } from 'react';
import styled from 'styled-components';

const Outer = styled.div`
  background-color: #ccc;
  width: 200px;
  height: 200px;
`;

const Inner = styled.div`
  background-color: red;
  width: 100px;
  height: 100px;
`;

const EventLoopExample: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null!);
  const innerRef = useRef<HTMLDivElement>(null!);

  React.useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;

    const callback = () => {
      alert('click'); // 当元素被点击时，打印 'click'

      setTimeout(() => {
        alert('timeout'); // 0毫秒后，打印 'timeout'
      }, 0);

      Promise.resolve().then(() => {
        alert('promise'); // 当前事件循环结束时，打印 'promise'
      });
    };

    inner.addEventListener('click', callback);
    outer.addEventListener('click', callback);

    return () => {
      inner.removeEventListener('click', callback);
      outer.removeEventListener('click', callback);
    };
  }, []);

  const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    innerRef.current.click();
  };

  return (
    <div>
      <Outer ref={outerRef}>
        <Inner ref={innerRef} />
      </Outer>

      <button type="button" onClick={onClick}>
        dispatch 内部红色区域
      </button>
    </div>
  );
};

export default EventLoopExample;
```

使用 `dispatchEvent()` 模拟点击事件，`alert` 顺序为：`click -> click -> promise -> promise -> timeout -> timeout`。
