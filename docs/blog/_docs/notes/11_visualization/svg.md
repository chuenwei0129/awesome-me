---
title: SVG
toc: content
group:
  title: 基础知识
---

## 如何用 SVG 图形元素绘制可视化图表？

> [SVG 的官方文档](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Getting_Started)

```tsx
import React, { useEffect, useRef, RefObject } from 'react';

const App: React.FC = () => {
  {
    /* SVG 可以通过 JavaScript 动态创建并注入到 HTML DOM 中。 */
  }

  const svgContainerRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');

    // 创建 SVG 元素
    svg.setAttribute('width', '300');
    svg.setAttribute('height', '200');
    svg.setAttribute('xmlns', svgNS);

    // 创建矩形元素
    const rect = document.createElementNS(svgNS, 'rect');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', 'red');

    // 创建圆形元素
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', '150');
    circle.setAttribute('cy', '100');
    circle.setAttribute('r', '80');
    circle.setAttribute('fill', 'green');

    // 创建文本元素
    const text = document.createElementNS(svgNS, 'text');
    text.setAttribute('x', '150');
    text.setAttribute('y', '120');
    text.setAttribute('font-size', '60'); // 使用 font-size 而不是 fontSize
    text.setAttribute('text-anchor', 'middle'); // 使用 text-anchor 而不是 textAnchor
    text.setAttribute('fill', 'white');
    text.textContent = 'SVG';

    // 将所有元素添加到 SVG 容器中
    svg.appendChild(rect);
    svg.appendChild(circle);
    svg.appendChild(text);

    // 将 SVG 容器添加到 HTML DOM 中
    svgContainerRef.current?.appendChild(svg);
  }, []);

  return (
    <div ref={svgContainerRef}>
      {/* SVG 可以直接被嵌入到 HTML 中。 */}
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" rx={30} ry={30} fill="red" />
        <circle cx="150" cy="100" r="80" fill="green" />
        <text x="150" y="120" fontSize="60" textAnchor="middle" fill="white">
          SVG
        </text>
      </svg>
      {/* 可以使用 img 元素。 */}
      <img
        width={200}
        height={200}
        src="https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/knife.svg"
        alt="logo"
      />
    </div>
  );
};

export default App;
```

## 理解 SVG 的视区盒子（viewBox）坐标系

SVG 采用的是视区盒子（viewBox）坐标系。这个坐标系在默认情况下，是以 svg 根元素左上角为坐标原点，x 轴向右，y 轴向下，svg 根元素右下角坐标为它的像素宽高值。

```jsx
import React from 'react';

const SvgExample = () => {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 100 100"
      style={{ border: '1px solid black' }}
    >
      <circle cx="0" cy="0" r="100" fill="red" />
    </svg>
  );
};

export default SvgExample;
```

在这个例子中，我们创建了一个宽高为 `200x200` 像素的 SVG 元素，但我们设置了 `viewBox="0 0 100 100"`。这意味着：

- SVG 的坐标系原点在 (0, 0)。
- 右下角的坐标为 (100, 100)。

因此，SVG 内部的所有绘制将被缩放，以适应 200x200 像素的视口。

现在，让我们稍微修改 viewBox 来看看效果：

```jsx
import React from 'react';

const SvgExample = () => {
  return (
    <svg
      width="200"
      height="200"
      viewBox="25 25 50 50"
      style={{ border: '1px solid black' }}
    >
      <circle cx="25" cy="25" r="50" fill="red" />
    </svg>
  );
};

export default SvgExample;
```

在这个例子中，我们设置了 `viewBox="25 25 50 50"`。这意味着：

- SVG 的坐标系原点在 (25, 25)。
- 右下角的坐标为 (75, 75)。

因此，只有在这个范围内的内容会被显示和缩放以适应 `200x200` 像素的视口。

## 使用 foreignObject 元素在 SVG 中嵌入 React 组件

SVG 中有一个特殊的 `foreignObject` 元素，在该元素中可以内嵌任何 HTML 元素，可以借助该元素来渲染 HTML 内容，这样我们可以很方便的在节点中渲染 `React/Vue/Angular` 组件。

```jsx
import React from 'react';

const MyComponent = () => {
  return (
    <div style={{ border: '1px solid black', padding: '10px' }}>
      Hello, I am a React Component inside SVG!
    </div>
  );
};

const App = () => {
  return (
    <svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
      <foreignObject x="50" y="50" width="400" height="400">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <MyComponent />
        </div>
      </foreignObject>
    </svg>
  );
};

export default App;
```
