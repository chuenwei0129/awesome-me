---
title: Canvas
toc: content
group:
  title: 深入探讨
---

## 入门指南

> [Canvas API 的官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)

## 画布宽高与样式宽高

在浏览器中，Canvas 是一种 HTML 元素，可以通过 `<canvas>` 标签插入到 HTML 文档中。

```html
<body>
  <canvas width="512" height="512"></canvas>
</body>
```

需要特别注意的是，Canvas 元素的 `width` 和 `height` 属性与其 CSS 样式属性是不同的。CSS 属性中的宽高影响 Canvas 在页面上的呈现大小（即样式宽高），而 HTML 属性中的宽高（即画布宽高）决定了 Canvas 的坐标系。在实际绘制时，如果不设置 Canvas 元素的样式，那么 Canvas 元素的画布宽高将等于其样式宽高的像素值。

## 在 Canvas 上绘制图形

### 创建一个 `500x500` 像素的 Canvas 画布，并在其中心绘制一个 `100x100` 像素的蓝色正方形

**方法一**：通过计算矩形的中心点位置来绘制正方形。

```tsx
import React, { useEffect, useRef } from 'react';

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    // 画布的宽高
    const canvasWidth = 500;
    const canvasHeight = 500;

    // 正方形的宽高
    const squareSize = 100;

    // 计算正方形左上角的坐标，使其居中
    const x = (canvasWidth - squareSize) / 2;
    const y = (canvasHeight - squareSize) / 2;

    // 清空画布
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // 绘制正方形
    ctx.fillStyle = 'blue'; // 设置正方形的颜色
    ctx.fillRect(x, y, squareSize, squareSize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ border: '1px solid #000000' }}
    />
  );
};

export default CanvasComponent;
```

**方法二**：通过平移画布的原点来绘制正方形。

```tsx
import React, { useEffect, useRef } from 'react';

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // 画布的宽高
        const canvasWidth = 500;
        const canvasHeight = 500;

        // 正方形的宽高
        const squareSize = 100;

        // 平移画布，使(0, 0)点变为画布中心
        ctx.translate(canvasWidth / 2, canvasHeight / 2);

        // 计算正方形左上角的坐标（相对于新的原点）
        const x = -squareSize / 2;
        const y = -squareSize / 2;

        // 清空画布
        ctx.clearRect(-canvasWidth / 2, -canvasHeight / 2, canvasWidth, canvasHeight);

        // 绘制正方形
        ctx.fillStyle = 'blue'; // 设置正方形的颜色
        ctx.fillRect(x, y, squareSize, squareSize);
      }
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ border: '1px solid #000000' }}
    />
  );
};

export default CanvasComponent;
```

### 恢复画布状态的方式

使用 `save` 和 `restore` 方法可以保存和恢复 Canvas 的状态，确保在应用平移变换后，画布的状态不会影响后续的绘制操作。

```tsx
import React, { useEffect, useRef } from 'react';

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // 画布的宽高
        const canvasWidth = 500;
        const canvasHeight = 500;

        // 正方形的宽高
        const squareSize = 100;

        // 保存画布状态
        ctx.save();

        // 平移画布，使(0, 0)点变为画布中心
        ctx.translate(canvasWidth / 2, canvasHeight / 2);

        // 计算正方形左上角的坐标（相对于新的原点）
        const x = -squareSize / 2;
        const y = -squareSize / 2;

        // 清空画布
        ctx.clearRect(-canvasWidth / 2, -canvasHeight / 2, canvasWidth, canvasHeight);

        // 绘制正方形
        ctx.fillStyle = 'blue'; // 设置正方形的颜色
        ctx.fillRect(x, y, squareSize, squareSize);

        // 恢复画布状态
        ctx.restore();
      }
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      style={{ border: '1px solid #000000' }}
    />
  );
};

export default CanvasComponent;
```

## Canvas 的优缺点

### 优点

1. **易于使用**：通过简单的绘图指令即可创建各种复杂的几何图形。
2. **高效渲染**：Canvas 的渲染效率非常高，适用于需要高性能图形渲染的场景。
3. **灵活性**：Canvas 提供了底层的图形渲染 API，使开发者能够更加灵活地进行图形处理。

### 缺点

1. **缺乏直接操作图形对象的能力**：由于绘制内容在浏览器中只是像素点，难以直接操作这些图形对象。
2. **事件处理复杂**：在 HTML 或 SVG 中，我们可以获取到图形的元素对象并为它们绑定用户事件，但在 Canvas 中，实现类似的操作较为困难。
