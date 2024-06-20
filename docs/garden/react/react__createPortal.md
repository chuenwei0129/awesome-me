---
title: createPortal 事件冒泡
group:
  title: 深入探讨
---

# createPortal 事件冒泡

在 React 中，事件处理机制是基于合成事件（Synthetic Events）的，也就是说，React 会在顶层（通常是 document 或者 root 元素）注册一个事件处理器，然后通过事件冒泡机制来管理所有的事件。

> 在 `v17` 之前，整个应用的事件会冒泡到同一个根节点（html DOM 节点）。而在 `v17` 之后，每个应用的事件都会冒泡到该应用自己的**根节点**（挂载的节点）。

这种机制有助于提高性能，但也带来了一些特殊情况需要注意，特别是在使用 `Portal` 的时候。<b style="color: red">`Portal` 允许你将子组件渲染到父组件的 DOM 层次结构之外。</b>这在处理模态框、工具提示等需要脱离父组件的场景中特别有用。然而，**尽管子组件的 DOM 结构脱离了父组件，它们之间的事件冒泡机制仍然有效，也就是说，子组件的点击事件会冒泡到父组件。**

```jsx
/**
 * iframe: true
 */

import React from 'react';
import { createPortal } from 'react-dom';

const ParentComponent = () => {
  const handleClick = () => {
    alert('Parent clicked');
  };

  return (
    <div
      onClick={handleClick}
      style={{ padding: '50px', border: '2px solid red' }}
    >
      Parent Component
      <PortalComponent />
    </div>
  );
};

const PortalComponent = () => {
  const handleClick = () => {
    alert('Button in Portal clicked');
  };

  return createPortal(
    <div style={{ padding: '20px', backgroundColor: 'lightblue' }}>
      Portal Component {' '}
      <button type="button" onClick={handleClick}>
        Click Me
      </button>
    </div>,
    document.body,
  );
};

export default ParentComponent;
```

为了避免这种情况，我们可以在父组件中使用原生的事件处理器（通过 `ref` 获取 DOM 元素并添加事件监听器），而不是使用 React 的合成事件。

```jsx
/**
 * iframe: true
 */

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const ParentComponent = () => {
  const parentRef = useRef(null);

  useEffect(() => {
    const handleClick = () => {
      alert('Parent clicked');
    };

    if (parentRef.current) {
      parentRef.current.addEventListener('click', handleClick);
    }

    return () => {
      if (parentRef.current) {
        parentRef.current.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <div ref={parentRef} style={{ padding: '50px', border: '2px solid red' }}>
      Parent Component
      <PortalComponent />
    </div>
  );
};

const PortalComponent = () => {
  const handleClick = () => {
    alert('Button in Portal clicked');
  };

  return createPortal(
    <div style={{ padding: '20px', backgroundColor: 'lightblue' }}>
      Portal Component {' '}
      <button type="button" onClick={handleClick}>
        Click Me
      </button>
    </div>,
    document.body,
  );
};

export default ParentComponent;
```
