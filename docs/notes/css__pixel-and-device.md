---
group:
  title: CSS
  order: 2
title: 像素与设备
toc: content
order: 6
---

## 是什么

### CSS 像素（CSS Pixel）

CSS 像素是一个**抽象的相对长度单位**，在 CSS 中以 `px` 为后缀。它是 Web 开发中的逻辑单位，不直接对应物理像素。

**核心特点：**

- 适用于 web 编程，是前端开发中最常用的长度单位
- 在不同设备和环境中，1px 代表的物理尺寸可能不同
- 会受到页面缩放、设备像素比（DPR）的影响
- 在默认缩放（100%）下，1 个 CSS 像素通常等于 1 个设备独立像素

### 设备像素（Device Pixel / 物理像素）

设备像素是设备屏幕的**最小物理显示单元**，从设备出厂时就固定不变。

**核心特点：**

- 屏幕上实际的物理像素点
- 由红、绿、蓝子像素组成，通过不同亮度混合出各种颜色
- 设备出厂后数量固定，无法改变

### 设备独立像素（Device Independent Pixel）

设备独立像素是一个**与设备无关的逻辑像素单位**，是程序可以控制的虚拟像素。

**核心特点：**

- 是操作系统提供的抽象单位，CSS 像素在无缩放时对应设备独立像素
- 在 JavaScript 中可通过 `window.screen.width` 和 `window.screen.height` 查看
- 一个设备独立像素可能对应 1 个或多个物理像素

### DPR（Device Pixel Ratio / 设备像素比）

设备像素比表示**设备独立像素到设备像素的转换比例**。

**计算公式：**

```
DPR = 设备像素 / 设备独立像素
```

**在 JavaScript 中获取：**

```javascript
window.devicePixelRatio;
```

**显示关系：**

- 当 DPR = 1 时，1 个 CSS 像素 = 1×1 个设备像素
- 当 DPR = 2 时，1 个 CSS 像素 = 2×2 个设备像素（4 个）
- 当 DPR = 3 时，1 个 CSS 像素 = 3×3 个设备像素（9 个）

### PPI（Pixel Per Inch / 像素密度）

PPI 表示**每英寸包含的像素点数目**，是屏幕的像素密度指标。

**计算公式：**

```
PPI = √(水平像素² + 垂直像素²) / 屏幕对角线英寸数
```

**核心特点：**

- 数值越高，屏幕显示越清晰细腻
- 标准屏幕密度为 160 PPI
- Retina 屏幕的 PPI 通常在 200 以上

---

## 为什么

### 为什么会产生这些概念？

在 PC 时代，CSS 的 1 个像素通常对应屏幕的 1 个物理像素，这让我们误以为 CSS 像素就等于物理像素。

但随着移动设备和高清屏幕的出现，这种简单的对应关系被打破了。

### 实际案例：iPhone 的演进

**问题场景：**

- iPhone 3GS：屏幕尺寸 3.5 寸，分辨率 320×480（320 个物理像素宽度）
- iPhone 4/4s：屏幕尺寸 3.5 寸，分辨率 640×960（640 个物理像素宽度）

**如果按物理像素布局会怎样？**

假设我们为 iPhone 3GS 设计了一个宽度为 320 物理像素的页面：

- 在 iPhone 3GS 上显示正常（铺满屏幕）
- 在 iPhone 4/4s 上只占一半宽度（剩余一半空白）

### 解决方案：虚拟像素单位

为了解决这个问题，操作系统引入了**设备独立像素**的概念：

1. 统一定义：iPhone 3GS 和 iPhone 4/4s 都是 **320 个虚拟像素**宽度
2. 转换机制：
   - iPhone 3GS：1 虚拟像素宽度 = 1 物理像素宽度（DPR = 1）
   - iPhone 4/4s：1 虚拟像素宽度 = 2 物理像素宽度（DPR = 2，即 1 虚拟像素 = 2×2 物理像素）

这样，相同的代码在不同设备上都能保持一致的显示效果，同时高分辨率设备还能呈现更清晰的内容。

### 为什么高 DPR 屏幕更清晰？

当 DPR = 2 时：

- 1 个 CSS 像素占用 2×2 = 4 个物理像素
- 可以显示更多细节和更平滑的边缘
- 图像和文字看起来更锐利

---

## 怎么用

### 场景 1：电商网站商品图优化

**现实场景：**
你在开发一个电商网站，商品图在 Retina 屏幕上显示模糊，影响用户体验和转化率。

**问题分析：**

```javascript
// 查看当前设备信息
const dpr = window.devicePixelRatio;
console.log('当前 DPR:', dpr);
// MacBook Pro: 2
// iPhone 14 Pro: 3
// 普通显示器: 1
```

如果只提供 200×200 的商品图，在 DPR=2 的设备上，实际需要 400×400 的物理像素才能清晰显示。

**解决方案：使用 srcset 属性（推荐）**

```html
<!-- 商品列表图 -->
<img
  src="/images/product-200.jpg"
  srcset="
    /images/product-200.jpg 1x,
    /images/product-400.jpg 2x,
    /images/product-600.jpg 3x
  "
  alt="商品名称"
  width="200"
  height="200"
/>

<!-- 或者使用 w 描述符，适配不同屏幕宽度 -->
<img
  src="/images/banner-750.jpg"
  srcset="
    /images/banner-750.jpg   750w,
    /images/banner-1125.jpg 1125w,
    /images/banner-1500.jpg 1500w
  "
  sizes="(max-width: 750px) 100vw, 750px"
  alt="促销横幅"
/>
```

**效果：**

- 浏览器会根据设备 DPR 自动选择合适的图片
- DPR=1 设备加载 1x 图，节省流量
- DPR=2 设备加载 2x 图，保证清晰度
- DPR=3 设备加载 3x 图，极致体验

### 场景 2：设计还原中的细线问题

**现实场景：**
UI 设计师提供的设计稿中有很多 1px 的细线（如分割线、边框），但在手机上看起来很粗，和设计稿不一致。

**问题分析：**

在 DPR = 1 的普通屏幕上，设置 `border: 1px solid red;`，浏览器会用 1 个物理像素来渲染这条线，非常清晰。

但在 DPR = 2 或更高 的视网膜屏幕上，同样设置 `border: 1px solid red;`，浏览器仍然会尝试用逻辑上的 1px 来渲染。但由于 1 个 CSS 像素对应着 4 个物理像素，浏览器就需要决定如何用这 4 个物理点来“模拟”一条细线。

这个过程叫做 亚像素渲染。浏览器为了抗锯齿和让颜色、形状过渡更平滑，可能会对这 4 个像素点进行不同透明度的着色，而不是全部填满纯色。

结果就是：你本期望得到一条极其锐利的实线，但实际渲染出的却是一条在微观上可能有点“模糊”或“过粗”的线。 在某些背景下，这条线看起来可能比实际的 1 个物理像素要粗，或者颜色发虚，这就是我们通常感知到的“1px 边框问题”

**解决方案：transform 缩放**

```css
/* 底部分割线 */
.list-item {
  position: relative;
  padding: 15px;
}

.list-item::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  transform: scaleY(0.5); /* DPR=2 时缩放到真正的 1 物理像素 */
  transform-origin: 0 0;
}

/* 适配 DPR=3 的设备 */
@media (-webkit-min-device-pixel-ratio: 3) {
  .list-item::after {
    transform: scaleY(0.333);
  }
}

/* 四边边框的情况 */
.card {
  position: relative;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  border: 1px solid #ddd;
  transform: scale(0.5);
  transform-origin: 0 0;
  pointer-events: none;
}
```

### 场景 3：数据可视化项目的 Canvas 模糊

**现实场景：**
你在用 Canvas 绘制图表，在 Retina 屏幕上发现线条和文字都很模糊。

**问题分析：**
Canvas 的默认宽高是 CSS 像素，但绘制时需要用物理像素才能清晰。

**解决方案：适配高清屏幕**

```javascript
/**
 * 创建高清 Canvas
 * @param {HTMLCanvasElement} canvas
 * @returns {CanvasRenderingContext2D}
 */
function createHDCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  // 1. 设置 Canvas 实际像素（物理像素）
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  // 2. 设置 Canvas 显示尺寸（CSS 像素）
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';

  // 3. 缩放绘图上下文
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  return ctx;
}

// 使用示例：绘制图表
const canvas = document.getElementById('chart');
const ctx = createHDCanvas(canvas);

// 现在可以正常绘制，会自动适配高清屏
ctx.strokeStyle = '#333';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(0, 50);
ctx.lineTo(300, 50);
ctx.stroke();

ctx.fillStyle = '#666';
ctx.font = '14px Arial';
ctx.fillText('销售数据', 10, 30);
```

### 场景 4：在你的 Mac 上快速验证

**以 MacBook Air 13" M1 为例**

打开浏览器控制台（`Cmd + Option + I`），运行以下代码：

```javascript
// 查看设备信息
console.log({
  DPR: window.devicePixelRatio, // 2
  屏幕分辨率: `${window.screen.width}×${window.screen.height}`, // 1440×900
  物理像素: `${window.screen.width * window.devicePixelRatio}×${
    window.screen.height * window.devicePixelRatio
  }`, // 2880×1800
});

// 验证媒体查询
console.log({
  是否为高清屏: window.matchMedia('(-webkit-min-device-pixel-ratio: 2)')
    .matches, // true
  是否为超高清: window.matchMedia('(-webkit-min-device-pixel-ratio: 3)')
    .matches, // false
});
```

**快速测试图片清晰度：**

创建一个测试页面 `test.html`：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Retina 测试</title>
    <style>
      .demo {
        display: flex;
        gap: 40px;
        padding: 40px;
      }
      .box {
        text-align: center;
      }
      img {
        width: 200px;
        height: 200px;
        border: 1px solid #ddd;
      }
    </style>
  </head>
  <body>
    <div class="demo">
      <div class="box">
        <img src="https://via.placeholder.com/200" alt="普通图" />
        <p>普通图（200×200）</p>
      </div>
      <div class="box">
        <img
          src="https://via.placeholder.com/400"
          alt="高清图"
          style="width: 200px; height: 200px;"
        />
        <p>高清图（400×400）</p>
      </div>
    </div>
    <script>
      document.body.insertAdjacentHTML(
        'afterbegin',
        `<p style="padding: 20px;">当前 DPR: ${window.devicePixelRatio}</p>`,
      );
    </script>
  </body>
</html>
```

在 MacBook Air M1 上打开，你会明显看到：

- 左侧图片：略微模糊（200×200 在 DPR=2 设备上不够清晰）
- 右侧图片：清晰锐利（400×400 刚好满足 DPR=2 设备）

> 📸 **截图位置**：在你的 Mac 上打开测试页面，截图对比两张图片的清晰度差异

---

## 总结备忘

### 常见设备参数对照表

| 设备                      | 屏幕尺寸 | 物理分辨率 | 设备独立像素 | DPR | PPI |
| ------------------------- | -------- | ---------- | ------------ | --- | --- |
| iPhone SE (2020)          | 4.7"     | 750×1334   | 375×667      | 2   | 326 |
| iPhone 14 Pro             | 6.1"     | 1179×2556  | 393×852      | 3   | 460 |
| Samsung S23               | 6.1"     | 1080×2340  | 360×780      | 3   | 425 |
| iPad Pro 11"              | 11"      | 1668×2388  | 834×1194     | 2   | 264 |
| **MacBook Air M1 13"** ⭐ | 13.3"    | 2560×1600  | 1440×900     | 2   | 227 |
| MacBook Pro 14" M3        | 14.2"    | 3024×1964  | 1512×982     | 2   | 254 |
| 普通 PC 显示器            | 24"      | 1920×1080  | 1920×1080    | 1   | 92  |
| 4K 显示器                 | 27"      | 3840×2160  | 1920×1080    | 2   | 163 |

### 核心概念关系

```
CSS 像素 (开发使用)
    ↓ 无缩放时 1:1
设备独立像素 (操作系统虚拟单位)
    ↓ × DPR
设备像素 (屏幕物理像素)
```

### 关键公式

```
DPR = 设备像素 / 设备独立像素

PPI = √(水平像素² + 垂直像素²) / 屏幕对角线英寸数

1 个 CSS 像素实际占用的物理像素 = DPR × DPR 个
```

### 快速记忆

1. **CSS 像素**：写代码用的抽象单位（`px`）
2. **设备像素**：屏幕物理像素，出厂固定，无法改变
3. **设备独立像素**：操作系统提供的虚拟单位，连接 CSS 和物理世界
4. **DPR**：转换比例，越高屏幕越清晰
5. **PPI**：像素密度，越高显示越细腻

### 开发要点

| 场景            | 问题                       | 解决方案                                     |
| --------------- | -------------------------- | -------------------------------------------- |
| 图片模糊        | 普通图在高清屏上不清晰     | 使用 `srcset` 提供 2x、3x 图                 |
| 边框太粗        | 1px 边框在手机上看起来很粗 | 使用 `transform: scaleY(0.5)` 缩放           |
| Canvas 模糊     | 绘图在 Retina 屏幕上模糊   | Canvas 尺寸乘以 DPR，绘图上下文缩放 DPR      |
| 设计稿还原      | 设计稿 750px 如何转换      | 除以 2 得到 CSS 像素（375px）                |
| 响应式图片      | 不同设备加载不同尺寸       | 使用 `srcset` + `sizes` 属性                 |
| 图标清晰度      | 位图图标在高清屏上模糊     | 优先使用 SVG（矢量图天然支持任意 DPR）       |
| 性能优化        | 高清图加载慢               | 按需加载，普通屏用 1x 图，高清屏用 2x 图     |
| 跨设备一致性    | 不同设备显示效果不一致     | 使用相对单位（rem、vw）或媒体查询            |
| 移动端 viewport | 页面缩放导致布局问题       | 设置 `width=device-width, initial-scale=1.0` |

### 调试技巧

```javascript
// 快速检查设备信息
console.table({
  DPR: window.devicePixelRatio,
  屏幕尺寸: `${window.screen.width}×${window.screen.height}`,
  Viewport: `${window.innerWidth}×${window.innerHeight}`,
  物理像素: `${window.screen.width * devicePixelRatio}×${
    window.screen.height * devicePixelRatio
  }`,
});

// 检查图片是否加载了高清版
document.querySelectorAll('img').forEach((img) => {
  console.log(img.alt, img.currentSrc);
});
```

**Chrome DevTools 设备模拟：**

1. `F12` 打开开发者工具
2. 点击设备图标（`Ctrl/Cmd + Shift + M`）
3. 选择不同设备，查看 DPR 差异
4. 自定义设备 DPR 进行测试
