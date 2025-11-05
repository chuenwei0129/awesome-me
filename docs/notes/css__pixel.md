# CSS 像素与设备像素完全指南

## 是什么

### CSS 像素（CSS Pixel）

CSS 像素是一个**抽象的相对长度单位**，在 CSS 中以 `px` 为后缀。它是 Web 开发中的逻辑单位，不直接对应物理像素。

**核心特点：**
- 适用于 web 编程，是前端开发中最常用的长度单位
- 在不同设备和环境中，1px 代表的物理尺寸可能不同
- 会受到页面缩放、设备像素比（DPR）、像素密度（PPI）的影响
- 在默认缩放（100%）下，1 个 CSS 像素通常等于 1 个设备独立像素

### 设备像素（Device Pixel / 物理像素）

设备像素是设备屏幕的**最小物理显示单元**，从设备出厂时就固定不变。

**核心特点：**
- 屏幕上实际的物理像素点（只是一个计数单位，不同于印刷的 pt 单位）
- 不一定是小正方形，只是能显示色彩的"点"
- 由红、绿、蓝子像素组成，通过不同亮度混合出各种颜色
- 设备出厂后数量固定，无法改变

### 设备独立像素（Device Independent Pixel）

设备独立像素是一个**与设备无关的逻辑像素单位**，是程序可以控制的虚拟像素。

**核心特点：**
- 是操作系统提供的抽象单位，CSS 像素在无缩放时对应设备独立像素
- 在 JavaScript 中可通过 `window.screen.width` 和 `window.screen.height` 查看
- 一个设备独立像素可能对应 1 个或多个物理像素
- 对应的物理像素越多，屏幕显示越清晰

### DPR（Device Pixel Ratio / 设备像素比）

设备像素比表示**设备独立像素到设备像素的转换比例**。

**计算公式：**
```
DPR = 设备像素 / 设备独立像素
```

**在 JavaScript 中获取：**
```javascript
window.devicePixelRatio
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
- Retina 屏幕的 PPI 通常在 300 以上

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

### 在 JavaScript 中获取像素信息

```javascript
// 获取设备像素比
const dpr = window.devicePixelRatio;
console.log('设备像素比:', dpr); // 如：2

// 获取设备独立像素（屏幕分辨率）
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;
console.log(`屏幕分辨率: ${screenWidth}×${screenHeight}`);

// 计算实际物理像素
const physicalWidth = screenWidth * dpr;
const physicalHeight = screenHeight * dpr;
console.log(`物理像素: ${physicalWidth}×${physicalHeight}`);
```

### 页面缩放对像素的影响

**放大页面（如 200%）：**
- 原来 1px 的元素变成 2px
- 原来需要 320px 填满的宽度现在只需 160px
- 元素占据更多的物理像素，显示更大

**缩小页面（如 50%）：**
- 原来 1px 的元素变成 0.5px
- 原来需要 320px 填满的宽度现在需要 640px
- 元素占据更少的物理像素，显示更小

### 不同设备的像素对应关系

**普通屏幕（DPR = 1）：**
```
1 CSS 像素 = 1 设备独立像素 = 1 设备像素
```
示例：普通 PC 显示器、旧款手机

**Retina / 高清屏（DPR = 2）：**
```
1 CSS 像素 = 1 设备独立像素 = 2×2 设备像素（4 个）
```
示例：MacBook Pro Retina、iPhone 6/7/8、大部分 Android 旗舰机

**超高清屏（DPR = 3）：**
```
1 CSS 像素 = 1 设备独立像素 = 3×3 设备像素（9 个）
```
示例：iPhone 12/13/14 Pro、部分 Android 旗舰机

**顶级屏幕（DPR = 4）：**
```
1 CSS 像素 = 1 设备独立像素 = 4×4 设备像素（16 个）
```
示例：部分高端 Android 手机

### 实际应用场景

#### 1. 适配 Retina 屏幕图片

**方案一：CSS 媒体查询**
```css
/* 普通屏幕使用 1x 图 */
.logo {
  width: 100px;
  height: 100px;
  background-image: url('logo.png'); /* 100×100 */
}

/* Retina 屏幕使用 2x 图 */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
  .logo {
    background-image: url('logo@2x.png'); /* 200×200 */
    background-size: 100px 100px;
  }
}

/* 超高清屏幕使用 3x 图 */
@media (-webkit-min-device-pixel-ratio: 3),
       (min-resolution: 288dpi) {
  .logo {
    background-image: url('logo@3x.png'); /* 300×300 */
    background-size: 100px 100px;
  }
}
```

**方案二：HTML srcset 属性（推荐）**
```html
<!-- 浏览器会根据 DPR 自动选择合适的图片 -->
<img
  src="logo.png"
  srcset="logo@2x.png 2x, logo@3x.png 3x"
  alt="Logo"
  width="100"
  height="100"
/>

<!-- 或使用 w 描述符，浏览器根据视口宽度和 DPR 选择 -->
<img
  src="photo.jpg"
  srcset="photo-320w.jpg 320w,
          photo-640w.jpg 640w,
          photo-1280w.jpg 1280w"
  sizes="(max-width: 320px) 280px,
         (max-width: 640px) 600px,
         1200px"
  alt="Photo"
/>
```

**方案三：JavaScript 动态加载**
```javascript
const dpr = window.devicePixelRatio || 1;
const img = new Image();

if (dpr >= 3) {
  img.src = 'logo@3x.png';
} else if (dpr >= 2) {
  img.src = 'logo@2x.png';
} else {
  img.src = 'logo.png';
}
```

#### 2. 1px 边框问题解决

在 DPR = 2 的设备上，CSS 的 1px 会占用 2 个物理像素，看起来较粗。

**方案一：transform 缩放（推荐）**
```css
/* 使用伪元素 + transform 缩放 */
.thin-border {
  position: relative;
}

.thin-border::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #000;
  transform: scaleY(0.5); /* DPR = 2 时 */
  transform-origin: 0 0;
}

@media (-webkit-min-device-pixel-ratio: 3) {
  .thin-border::after {
    transform: scaleY(0.333); /* DPR = 3 时 */
  }
}
```

**方案二：viewport 缩放**
```html
<!-- 整体缩放方案，适合整个页面都需要精确像素的场景 -->
<meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5">
```

**方案三：box-shadow 模拟**
```css
/* 利用 box-shadow 不支持小数的特点 */
.thin-border {
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.5);
}
```

**方案四：SVG 方案**
```css
.thin-border {
  border: none;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='1'%3E%3Cline x1='0' y1='0' x2='100%25' y2='0' stroke='%23000' stroke-width='1'/%3E%3C/svg%3E") bottom repeat-x;
}
```

**方案五：linear-gradient**
```css
.thin-border {
  background-image: linear-gradient(0deg, #000 50%, transparent 50%);
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: bottom;
}
```

#### 3. Canvas 高清绘图

在高 DPR 设备上，Canvas 默认会模糊，需要特殊处理。

```javascript
function setupHDCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  // 设置实际像素尺寸（物理像素）
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  // 设置 CSS 显示尺寸（CSS 像素）
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';

  // 缩放绘图上下文
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  return ctx;
}

// 使用示例
const canvas = document.getElementById('myCanvas');
const ctx = setupHDCanvas(canvas);

// 现在可以正常绘制，会自动适配高清屏
ctx.fillRect(10, 10, 100, 100);
```

#### 4. viewport 设置详解

viewport 是移动端开发的关键，直接影响页面渲染。

```html
<!-- 标准移动端 viewport 设置 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
```

**参数说明：**
- `width=device-width`：宽度等于设备独立像素宽度
- `initial-scale=1.0`：初始缩放比例为 1（1 CSS 像素 = 1 设备独立像素）
- `maximum-scale=1.0`：最大缩放比例
- `user-scalable=no`：禁止用户缩放

**根据 DPR 动态设置 viewport：**
```javascript
function setViewport() {
  const dpr = window.devicePixelRatio || 1;
  const scale = 1 / dpr;

  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    document.head.appendChild(meta);
  }

  viewport.setAttribute('content',
    `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no`
  );

  // 同时设置 html 的 font-size，方便 rem 适配
  document.documentElement.style.fontSize = (50 * dpr) + 'px';
}
```

#### 5. 响应式字体大小

```css
/* 使用 vw 单位，自动适配屏幕宽度 */
html {
  /* 假设设计稿 750px，100px = 13.333vw */
  font-size: 13.333vw;
}

body {
  /* 限制最小和最大字体 */
  font-size: 16px;
  font-size: clamp(14px, 4vw, 18px);
}

/* 标题使用相对单位 */
h1 {
  font-size: 2em; /* 相对于父元素 */
}
```

---

## 总结备忘

### 常见设备参数对照表

| 设备 | 屏幕尺寸 | 物理分辨率 | 设备独立像素 | DPR | PPI |
|------|---------|-----------|-------------|-----|-----|
| iPhone SE (2020) | 4.7" | 750×1334 | 375×667 | 2 | 326 |
| iPhone 12/13 | 6.1" | 1170×2532 | 390×844 | 3 | 460 |
| iPhone 14 Pro Max | 6.7" | 1290×2796 | 430×932 | 3 | 460 |
| Samsung S21 | 6.2" | 1080×2400 | 360×800 | 3 | 421 |
| iPad Pro 12.9" | 12.9" | 2048×2732 | 1024×1366 | 2 | 264 |
| MacBook Pro 16" | 16" | 3456×2234 | 1728×1117 | 2 | 254 |
| 普通 PC 显示器 | 24" | 1920×1080 | 1920×1080 | 1 | 92 |
| 4K 显示器 | 27" | 3840×2160 | 1920×1080 | 2 | 163 |

### 核心概念关系图

```
CSS 像素 (开发使用)
    ↓
设备独立像素 (虚拟单位)
    ↓ (× DPR)
设备像素 (物理像素)
```

### 关键公式

```
DPR = 设备像素 / 设备独立像素

PPI = √(水平像素² + 垂直像素²) / 屏幕对角线英寸数

物理像素数 = CSS 像素 × DPR × DPR
```

### 快速记忆点

1. **CSS 像素**：我们写代码用的，是抽象单位
2. **设备像素**：屏幕物理像素，出厂固定
3. **设备独立像素**：虚拟单位，连接 CSS 和物理世界
4. **DPR**：转换比例，越高屏幕越清晰
5. **PPI**：像素密度，越高显示越细腻

### 无缩放情况下的对应关系

| 场景 | CSS 像素 | 设备独立像素 | 设备像素 | DPR |
|------|----------|-------------|----------|-----|
| PC 端 (100%) | 1px | 1px | 1px | 1 |
| 移动端标准屏 | 1px | 1px | 1px | 1 |
| 移动端 Retina | 1px | 1px | 2×2px | 2 |
| 移动端高清屏 | 1px | 1px | 3×3px | 3 |

### 开发注意事项

1. **图片适配**：为高 DPR 设备准备 2x、3x 图
2. **1px 边框**：使用 transform 缩放实现真正的 1 物理像素
3. **字体大小**：在高 DPR 设备上保持可读性
4. **性能优化**：高 DPR 设备需要更多计算资源
5. **测试覆盖**：在不同 DPR 设备上测试显示效果

### 调试技巧

**在浏览器中模拟不同 DPR：**
```javascript
// Chrome DevTools Console
// 1. 打开开发者工具
// 2. 按 Ctrl/Cmd + Shift + P
// 3. 输入 "Show Rendering"
// 4. 找到 "Emulate CSS media feature prefers-color-scheme"

// 或者直接在控制台查看设备信息
console.log({
  DPR: window.devicePixelRatio,
  屏幕分辨率: `${window.screen.width}×${window.screen.height}`,
  Viewport尺寸: `${window.innerWidth}×${window.innerHeight}`,
  物理分辨率: `${window.screen.width * window.devicePixelRatio}×${window.screen.height * window.devicePixelRatio}`
});
```

**Chrome DevTools 设备模拟：**
1. F12 打开开发者工具
2. 点击设备图标（Toggle device toolbar）
3. 选择不同设备或自定义分辨率
4. 可以选择不同的 DPR 进行测试

**检查图片是否加载了高清版本：**
```javascript
// 检查当前加载的图片 URL
document.querySelectorAll('img').forEach(img => {
  console.log(img.currentSrc); // 显示实际加载的图片 URL
});
```

**测试 1px 边框是否真的是 1 物理像素：**
```javascript
// 截图后放大查看，或使用以下方法
const testDiv = document.createElement('div');
testDiv.style.cssText = 'width:1px;height:100px;background:#000;position:fixed;left:0;top:0;';
document.body.appendChild(testDiv);
// 截图放大查看这条线的实际宽度
```

### 常见问题

**Q: 为什么我的 1px 边框在手机上看起来很粗？**
A: 因为在 DPR = 2 的设备上，1px CSS 像素实际占用 2×2 个物理像素。解决方案：使用 transform: scaleY(0.5) 缩放或其他方案。

**Q: 为什么相同的代码在不同手机上显示大小不一样？**
A: 因为不同设备的 DPR 和屏幕尺寸不同，需要做响应式适配。建议使用 rem、vw 等相对单位或媒体查询。

**Q: 如何判断是否需要使用高清图？**
A: 通过 `window.devicePixelRatio` 或 CSS 媒体查询判断 DPR，DPR ≥ 2 建议使用高清图。推荐使用 HTML 的 srcset 属性自动适配。

**Q: Canvas 在 Retina 屏幕上为什么模糊？**
A: 因为 Canvas 的默认尺寸是 CSS 像素，需要手动设置物理像素尺寸并缩放绘图上下文。参考上文的 `setupHDCanvas` 函数。

**Q: 设计稿是 750px，如何转换成代码？**
A: 方法一：设置 viewport 的 initial-scale = 0.5，直接使用设计稿尺寸；方法二：除以 2 得到设备独立像素；方法三：使用 rem 单位，设置 html font-size = 100px（对应设计稿 750px），然后 1rem = 100px。

**Q: CSS 像素和设备独立像素有什么区别？**
A: 在无缩放情况下，1 CSS 像素 = 1 设备独立像素。但当页面缩放时，CSS 像素会改变，而设备独立像素不变。

**Q: 为什么 window.screen.width 和 document.documentElement.clientWidth 不一样？**
A: `window.screen.width` 返回设备独立像素（不含缩放），`document.documentElement.clientWidth` 返回 viewport 宽度（受缩放和布局影响）。

**Q: Retina 屏幕的图片应该导出多大？**
A: 按照 DPR 倍数导出。例如设计稿中 100×100 的图标，需要导出：
- logo.png: 100×100（DPR=1）
- logo@2x.png: 200×200（DPR=2）
- logo@3x.png: 300×300（DPR=3）

**Q: 移动端适配方案有哪些？**
A: 主流方案：
1. **rem 方案**：根据屏幕宽度动态设置 html font-size
2. **vw 方案**：直接使用 vw 单位
3. **flex + 百分比**：弹性布局
4. **viewport 缩放**：按设计稿 1:1 还原，通过 viewport 缩放适配
5. **现代方案**：使用 CSS Container Queries

### 性能优化建议

**1. 图片按需加载**
```javascript
// 只为高 DPR 设备加载高清图
if (window.devicePixelRatio > 1) {
  // 加载 @2x 或 @3x 图片
} else {
  // 加载普通图片
}
```

**2. 使用 WebP 等现代图片格式**
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image@2x.png 2x, image.png 1x" type="image/png">
  <img src="image.png" alt="Image">
</picture>
```

**3. 图片懒加载**
```html
<img src="placeholder.jpg" data-src="actual-image@2x.jpg" loading="lazy" alt="Image">
```

**4. 避免不必要的高清图**
- 纯色背景、渐变等用 CSS 实现，不用图片
- 图标优先使用 SVG（矢量图天然支持任意 DPR）
- 装饰性小图可以不提供高清版本

**5. Canvas 性能优化**
```javascript
// 对于不需要超高清的场景，可以限制最大 DPR
const maxDPR = 2;
const dpr = Math.min(window.devicePixelRatio, maxDPR);
```

**6. 监测实际加载的资源**
```javascript
// 使用 Performance API 监测
performance.getEntriesByType('resource').forEach(resource => {
  if (resource.initiatorType === 'img') {
    console.log(resource.name, resource.transferSize);
  }
});
```

### 参考资源

- [MDN - Window.devicePixelRatio](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/devicePixelRatio)
- [W3C CSS Values and Units](https://www.w3.org/TR/css-values-4/#absolute-lengths)
- [移动端适配方案汇总](https://github.com/amfe/article/issues/17)
- [Responsive Images - web.dev](https://web.dev/responsive-images/)

---

**文章总字数：** 约 6500 字
**最后更新：** 2025
**关键词：** CSS 像素、设备像素、物理像素、设备独立像素、DPR、PPI、Retina、移动端适配、响应式设计
