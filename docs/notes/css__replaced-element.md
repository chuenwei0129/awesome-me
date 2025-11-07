---
group:
  title: CSS
  order: 2
title: 可替换元素
toc: content
---

## 是什么

### 可替换元素的定义

**可替换元素（Replaced Element）** 是指其内容不由 CSS 控制，而是由外部资源决定的元素。

**官方定义**（W3C CSS 规范）：

> 可替换元素是指其内容超出 CSS 格式化模型范围的元素，其展现不由 CSS 控制。CSS 可以影响可替换元素的位置，但不会影响到可替换元素自身的内容。

**通俗理解**：

- **内容来自外部**：图片来自图片文件，视频来自视频文件，iframe 内容来自其他页面
- **CSS 只控制容器**：可以控制元素的尺寸、位置、边框等，但无法控制内容本身
- **固有尺寸**：元素自身携带尺寸信息（如图片的像素尺寸）

### 可替换元素的分类

#### 典型可替换元素

这些元素始终被视为可替换元素：

```html
<!-- 图片 -->
<img src="photo.jpg" alt="照片" />

<!-- 视频 -->
<video src="video.mp4"></video>

<!-- 内联框架 -->
<iframe src="https://example.com"></iframe>

<!-- 嵌入内容 -->
<embed src="flash.swf" />
```

#### 条件性可替换元素

这些元素仅在特定情况下被视为可替换元素：

```html
<!-- 画布（有内容时） -->
<canvas id="myCanvas"></canvas>

<!-- 音频（显示控制器时） -->
<audio src="audio.mp3" controls></audio>

<!-- 对象（有数据时） -->
<object data="document.pdf"></object>

<!-- 选项（在某些浏览器中） -->
<option>选项</option>
```

#### 表单可替换元素

表单控件在某些方面表现为可替换元素：

```html
<!-- 输入框（大多数类型） -->
<input type="text" />
<input type="checkbox" />
<input type="radio" />
<input type="file" />

<!-- 文本域 -->
<textarea></textarea>

<!-- 下拉选择 -->
<select>
  <option>选项</option>
</select>
```

### 可替换元素的核心特征

#### 1. 具有固有尺寸（Intrinsic Dimensions）

固有尺寸是元素自身携带的尺寸信息。

```html
<!-- 图片文件本身是 800x600 像素 -->
<img src="800x600.jpg" />
<!-- 不设置 CSS 时，显示为 800x600 -->

<!-- 视频文件是 1920x1080 -->
<video src="1920x1080.mp4"></video>
<!-- 不设置 CSS 时，显示为 1920x1080 -->

<!-- Canvas 默认固有尺寸 -->
<canvas></canvas>
<!-- 默认 300x150 -->
```

#### 2. 具有固有宽高比（Intrinsic Aspect Ratio）

固有宽高比是元素内容的宽高比例。

```html
<!-- 图片 800x600，宽高比 4:3 -->
<img src="800x600.jpg" style="width: 400px;" />
<!-- height 自动计算为 300px，保持 4:3 -->

<!-- 视频 1920x1080，宽高比 16:9 -->
<video src="1920x1080.mp4" style="width: 640px;"></video>
<!-- height 自动计算为 360px，保持 16:9 -->
```

#### 3. 默认表现为具有块级特性的内联元素

**可替换元素在默认情况下具有 inline 的特性，但会根据自身内容建立格式化上下文。**

##### 1. 默认显示特性

- 大多数可替换元素（如 `<img>`, `<input>`, `<textarea>`, `<select>`, `<object>` 等）的默认 `display` 值是 **`inline`**
- 它们会像内联元素一样在文本流中排列

##### 2. 特殊行为特征

虽然默认是 `inline`，但它们具有一些特殊行为：

- **可以设置宽高**：不像普通内联元素，可替换元素可以直接设置 width 和 height
- **具有内在尺寸**：它们有自己固有的内容尺寸
- **建立格式化上下文**：会创建自己的块级格式化上下文

##### 3. 示例对比

```css
/* 普通内联元素 */
span {
  width: 100px; /* 无效 */
  height: 100px; /* 无效 */
}

/* 可替换元素 */
img {
  width: 100px; /* 有效 */
  height: 100px; /* 有效 */
}
```

##### 4. 更准确的描述

可替换元素更像是 **"具有块级特性的内联元素"**，或者说是 **"特殊的内联元素"**，而不是纯粹的 `inline-block`。

所以，说它们"具有 inline-block 的特性"虽然便于理解，但在技术细节上不够精确。

#### 4. CSS 控制的边界

```css
/* ✅ CSS 可以控制 */
img {
  width: 200px; /* 容器宽度 */
  height: 200px; /* 容器高度 */
  border: 2px solid red; /* 边框 */
  padding: 10px; /* 内边距 */
  margin: 20px; /* 外边距 */
  border-radius: 50%; /* 圆角 */
  opacity: 0.8; /* 透明度 */
  filter: blur(5px); /* 滤镜 */
  transform: rotate(45deg); /* 变换 */
}

/* ❌ CSS 无法控制 */
img {
  /* 无法改变图片的实际像素内容 */
  /* 无法改变图片的色彩、对比度等（除了 filter） */
}
```

### 可替换元素 vs 非可替换元素

#### 对比表

| 特性             | 可替换元素                     | 非可替换元素                 |
| ---------------- | ------------------------------ | ---------------------------- |
| **内容来源**     | 外部资源（图片文件、视频等）   | HTML 文本内容                |
| **CSS 控制范围** | 只控制容器，不控制内容         | 完全控制内容和样式           |
| **固有尺寸**     | 有（来自资源文件）             | 无                           |
| **固有宽高比**   | 有                             | 无                           |
| **默认 display** | 具有块级特性的内联元素         | 根据元素类型（block/inline） |
| **尺寸计算**     | 基于固有尺寸                   | 基于内容                     |
| **典型示例**     | `<img>`, `<video>`, `<iframe>` | `<div>`, `<span>`, `<p>`     |

#### 对比示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>可替换元素 vs 非可替换元素</title>
    <style>
      .container {
        border: 2px solid #ddd;
        padding: 20px;
        margin-bottom: 20px;
      }

      /* 给两种元素设置相同的样式 */
      .test-element {
        width: 200px;
        height: 100px;
        border: 3px solid blue;
        padding: 10px;
        margin: 10px;
        background: lightblue;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h3>可替换元素（img）</h3>
      <img src="800x600.jpg" class="test-element" alt="可替换元素" />
      <!--
      - 宽高生效：200x100
      - 图片内容可能变形（固有宽高比 4:3，强制为 2:1）
      - padding 扩大容器，不影响图片内容
    --></div>

    <div class="container">
      <h3>非可替换元素（div）</h3>
      <div class="test-element">这是文字内容</div>
      <!--
      - 宽高生效：200x100
      - 内容受 CSS 控制（颜色、字体等）
      - padding 影响内容位置
    --></div>
  </body>
</html>
```

## 为什么

### 为什么需要可替换元素的概念？

#### 问题 1：内容来源的多样性

```html
<!-- 内容来自服务器 -->
<img src="https://cdn.example.com/image.jpg" />

<!-- 内容来自用户上传 -->
<img src="blob:http://localhost/12345678" />

<!-- 内容来自第三方服务 -->
<iframe src="https://www.youtube.com/embed/VIDEO_ID"></iframe>

<!-- 内容由 JavaScript 动态生成 -->
<canvas id="chart"></canvas>
```

**挑战**：

- 内容在运行时才能确定
- 内容可能来自不同域（跨域）
- 内容格式多样（图片、视频、PDF、网页）
- 内容大小不可预知

**解决方案**：可替换元素机制

- 提供统一的容器接口
- CSS 控制容器，内容独立渲染
- 明确的安全边界（跨域隔离）

#### 问题 2：尺寸计算的特殊性

```html
<!-- 问题：图片有自己的尺寸 -->
<img src="800x600.jpg" />
<!-- 不设置 CSS 时如何显示？-->

<!-- 只设置宽度时高度如何计算？ -->
<img src="800x600.jpg" style="width: 400px;" />
<!-- 应该自动计算为 300px，保持宽高比 -->

<!-- 视频有自己的宽高比 -->
<video src="16-9-video.mp4" style="width: 640px;"></video>
<!-- height 应该自动计算为 360px -->
```

**挑战**：

- 需要保持内容的固有宽高比
- 需要在未指定尺寸时有合理的默认显示
- 需要在只指定一个维度时智能计算另一个维度

**解决方案**：固有尺寸和固有宽高比机制

- 元素携带固有尺寸信息
- CSS 尺寸与固有尺寸协同计算
- 自动保持宽高比（除非强制覆盖）

#### 问题 3：内容适配的复杂性

```css
/* 如何让不同尺寸的图片在固定容器中合理显示？ */
.avatar {
  width: 100px;
  height: 100px;
  /* 用户上传的头像可能是：
     - 200x400（竖图）
     - 400x200（横图）
     - 150x150（正方形）
     - 80x80（小图）
  */
}
```

**挑战**：

- 图片尺寸和宽高比各异
- 需要统一的显示效果（如圆形头像）
- 既不能变形，又要填充容器

**解决方案**：object-fit 和 object-position

- 灵活的内容适配策略
- 类似 background-size 的控制能力
- 精确控制内容在容器中的位置

### 为什么可替换元素默认是具有块级特性的内联元素？

#### 设计原因 1：与文本混排

**原始用途**：图片最初设计用于在文本中插入插图。

```html
<p>
  在古代，人们使用
  <img src="ancient-tool.png" width="30" height="30" alt="工具" />
  这样的工具进行劳作。如图所示
  <img src="farming.png" width="50" height="30" alt="农耕" />
  就是当时的主要生产方式。
</p>
```

**需求**：

- 图片需要能够和文字在同一行（inline 特性）
- 图片需要能够设置尺寸（block 特性）
- inline-block 完美满足这两个需求

#### 设计原因 2：灵活的布局能力

```html
<!-- 可以水平排列 -->
<div>
  <img src="img1.jpg" width="100" height="100" />
  <img src="img2.jpg" width="100" height="100" />
  <img src="img3.jpg" width="100" height="100" />
</div>

<!-- 可以设置宽高 -->
<img src="photo.jpg" width="300" height="200" />

<!-- 可以使用 vertical-align 对齐 -->
<span style="font-size: 20px;">
  文字
  <img src="icon.png" width="20" height="20" style="vertical-align: middle;" />
</span>
```

#### 设计原因 3：向后兼容

历史原因，早期 HTML 中图片就是按 inline-block 的方式渲染的，后来的规范保持了这个行为以保证向后兼容。

### 为什么 CSS 无法控制可替换元素的内部？

#### 安全性原因

```html
<!-- 场景：嵌入第三方内容 -->
<iframe src="https://ads.example.com"></iframe>

<!-- 如果 CSS 可以控制 iframe 内部... -->
<style>
  /* ❌ 这样会造成安全问题 */
  iframe {
    /* 假设可以修改内部元素 */
    .ad-content {
      display: none; /* 隐藏广告 */
    }
  }
</style>
```

**安全风险**：

- **跨域样式注入攻击**：恶意网站可以修改其他网站的显示
- **隐私泄露**：可以通过样式推断第三方内容
- **内容篡改**：可以修改银行网站的显示，进行钓鱼攻击

**解决方案**：同源策略（Same-Origin Policy）

- iframe 内容完全隔离
- CSS 无法穿透 iframe 边界
- 只能通过 postMessage 等安全机制通信

#### 独立性原因

```html
<!-- 图片内容应该保持原样 -->
<img src="photo.jpg" />
<!-- 不应该被 CSS 任意修改颜色、饱和度等 -->

<!-- 视频内容应该保持原样 -->
<video src="video.mp4"></video>
<!-- 不应该被 CSS 修改播放速度、帧率等 -->
```

**设计哲学**：

- **内容真实性**：图片、视频应该如实显示
- **用户上传内容**：不应被任意修改
- **明确的责任边界**：CSS 负责布局和样式，内容由资源文件负责

**例外**：filter 属性

```css
img {
  filter: blur(5px) grayscale(100%);
  /* 这是对渲染结果的后处理，不是修改内容本身 */
}
```

### 为什么 img 底部有空白间隙？

这是 inline-block 特性导致的经典问题。

```html
<div style="border: 2px solid red;">
  <img src="image.jpg" width="200" />
  <!-- 图片下方有 3-4px 的空白！ -->
</div>
```

**原因**：

1. **图片默认是 inline-block**
2. **inline-block 元素按基线（baseline）对齐**
3. **基线不在元素底部**，而在字母 x 的底部
4. **下方空白**是为了容纳字母的下伸部分（如 g、y 的下半部分）

```
 ________________  ← 行盒顶部
|                |
|  AAA  xxx      |  ← 字母顶部
|  A A  x  x     |
|  AAA  xxx      |  ← 基线（baseline）
|  A A  x  x     |
|  A A  x  x     |
|       gggg     |  ← 下伸部分
 ________________  ← 行盒底部

<img> 默认也按基线对齐，所以底部留有空间！
```

## 怎么用

### 尺寸计算规则

#### 规则一：CSS 尺寸与固有尺寸的优先级

**优先级**（从高到低）：

1. **CSS 显式设置的 width 和 height**
2. **CSS 设置 + 固有宽高比计算**
3. **固有尺寸**
4. **默认尺寸**（固有尺寸不可用时）

#### 场景 1：不设置任何 CSS 尺寸

```html
<!-- 图片文件：800x600 -->
<img src="800x600.jpg" />
<!-- 实际显示：800x600（使用固有尺寸） -->

<!-- 视频文件：1920x1080 -->
<video src="1920x1080.mp4"></video>
<!-- 实际显示：1920x1080（使用固有尺寸） -->

<!-- Canvas 无属性 -->
<canvas></canvas>
<!-- 实际显示：300x150（默认固有尺寸） -->
```

#### 场景 2：只设置 width

```html
<!-- 图片文件：800x600，固有宽高比 4:3 -->
<img src="800x600.jpg" style="width: 400px;" />
<!--
  width: 400px (CSS 指定)
  height: 300px (自动计算：400 / (4/3) = 300)
  保持固有宽高比
-->

<!-- 视频文件：1920x1080，固有宽高比 16:9 -->
<video src="1920x1080.mp4" style="width: 640px;"></video>
<!--
  width: 640px (CSS 指定)
  height: 360px (自动计算：640 / (16/9) = 360)
  保持固有宽高比
-->
```

#### 场景 3：只设置 height

```html
<!-- 图片文件：800x600，固有宽高比 4:3 -->
<img src="800x600.jpg" style="height: 300px;" />
<!--
  width: 400px (自动计算：300 * (4/3) = 400)
  height: 300px (CSS 指定)
  保持固有宽高比
-->
```

#### 场景 4：同时设置 width 和 height

```html
<!-- 图片文件：800x600，固有宽高比 4:3 -->
<img src="800x600.jpg" style="width: 400px; height: 400px;" />
<!--
  width: 400px (CSS 指定)
  height: 400px (CSS 指定)
  宽高比：1:1（破坏了固有宽高比 4:3）
  图片可能变形！
-->
```

#### 场景 5：使用 aspect-ratio 属性

```html
<!-- 图片文件：800x600，固有宽高比 4:3 -->
<img src="800x600.jpg" style="width: 400px; aspect-ratio: 1 / 1;" />
<!--
  width: 400px (CSS 指定)
  height: 400px (根据 aspect-ratio 计算)
  aspect-ratio 覆盖固有宽高比
-->

<!-- 无固有宽高比的元素 -->
<div style="width: 400px; aspect-ratio: 16 / 9;">
  <!--
    width: 400px
    height: 225px (400 / (16/9) = 225)
  -->
</div>
```

#### 完整对比示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>可替换元素尺寸计算</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }

      .scenario {
        margin-bottom: 40px;
        padding: 20px;
        border: 2px solid #ddd;
        border-radius: 8px;
      }

      .scenario h3 {
        margin-top: 0;
        color: #333;
      }

      .image-container {
        display: inline-block;
        border: 3px solid blue;
        margin: 10px;
      }

      .info {
        margin-top: 10px;
        padding: 10px;
        background: #f0f0f0;
        border-radius: 4px;
        font-size: 14px;
      }

      /* 场景样式 */
      .scenario-1 img {
        /* 不设置尺寸 */
      }

      .scenario-2 img {
        width: 400px;
      }

      .scenario-3 img {
        height: 300px;
      }

      .scenario-4 img {
        width: 400px;
        height: 400px;
      }

      .scenario-5 img {
        width: 400px;
        aspect-ratio: 1 / 1;
        object-fit: cover;
      }
    </style>
  </head>
  <body>
    <h1>可替换元素尺寸计算规则</h1>
    <p>原始图片：800x600（固有宽高比 4:3）</p>

    <div class="scenario scenario-1">
      <h3>场景 1：不设置尺寸</h3>
      <div class="image-container">
        <img src="https://via.placeholder.com/800x600" alt="800x600" />
      </div>
      <div class="info">
        <strong>结果：</strong>800x600<br />
        <strong>说明：</strong>使用固有尺寸
      </div>
    </div>

    <div class="scenario scenario-2">
      <h3>场景 2：只设置 width</h3>
      <div class="image-container">
        <img src="https://via.placeholder.com/800x600" alt="400x300" />
      </div>
      <div class="info">
        <strong>结果：</strong>400x300<br />
        <strong>说明：</strong>width 指定为 400px，height 自动计算为 300px（保持
        4:3）
      </div>
    </div>

    <div class="scenario scenario-3">
      <h3>场景 3：只设置 height</h3>
      <div class="image-container">
        <img src="https://via.placeholder.com/800x600" alt="400x300" />
      </div>
      <div class="info">
        <strong>结果：</strong>400x300<br />
        <strong>说明：</strong>height 指定为 300px，width 自动计算为 400px（保持
        4:3）
      </div>
    </div>

    <div class="scenario scenario-4">
      <h3>场景 4：同时设置 width 和 height</h3>
      <div class="image-container">
        <img src="https://via.placeholder.com/800x600" alt="400x400" />
      </div>
      <div class="info">
        <strong>结果：</strong>400x400<br />
        <strong>说明：</strong>强制使用 CSS 尺寸，宽高比变为 1:1，<strong
          >图片变形！</strong
        >
      </div>
    </div>

    <div class="scenario scenario-5">
      <h3>场景 5：使用 aspect-ratio + object-fit</h3>
      <div class="image-container">
        <img src="https://via.placeholder.com/800x600" alt="400x400" />
      </div>
      <div class="info">
        <strong>结果：</strong>400x400<br />
        <strong>说明：</strong>aspect-ratio 覆盖固有宽高比，object-fit: cover
        保证图片不变形（裁剪）
      </div>
    </div>
  </body>
</html>
```

### 对象适配（Object Fit & Position）

#### object-fit 属性详解

`object-fit` 控制可替换元素的内容如何适应容器，类似 `background-size`。

**五种取值**：

| 值           | 保持宽高比 | 填充容器 | 可能裁剪 | 可能留白 | 行为描述                    |
| ------------ | ---------- | -------- | -------- | -------- | --------------------------- |
| `fill`       | ❌         | ✅       | ❌       | ❌       | 拉伸填充，会变形            |
| `contain`    | ✅         | ❌       | ❌       | ✅       | 完整显示，留白              |
| `cover`      | ✅         | ✅       | ✅       | ❌       | 填充容器，裁剪超出部分      |
| `none`       | ✅         | ❌       | ✅       | 可能     | 保持原始尺寸，不缩放        |
| `scale-down` | ✅         | ❌       | ❌       | 可能     | 取 none 和 contain 中较小者 |

#### 详细对比示例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>object-fit 对比</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        background: #f5f5f5;
      }

      h1 {
        text-align: center;
        color: #333;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-bottom: 40px;
      }

      .card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .image-box {
        width: 100%;
        height: 200px;
        background: #e0e0e0;
        position: relative;
        overflow: hidden;
      }

      .image-box img {
        width: 100%;
        height: 100%;
      }

      .card-content {
        padding: 15px;
      }

      .card-content h3 {
        margin: 0 0 10px 0;
        font-size: 18px;
        color: #333;
      }

      .card-content p {
        margin: 0;
        font-size: 14px;
        color: #666;
        line-height: 1.6;
      }

      .code {
        background: #f0f0f0;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        font-size: 12px;
      }

      /* object-fit 值 */
      .fill {
        object-fit: fill;
      }
      .contain {
        object-fit: contain;
      }
      .cover {
        object-fit: cover;
      }
      .none {
        object-fit: none;
      }
      .scale-down {
        object-fit: scale-down;
      }
    </style>
  </head>
  <body>
    <h1>object-fit 属性对比</h1>

    <h2>横向图片（400x200）在正方形容器（200x200）</h2>
    <div class="grid">
      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/4A90E2/fff?text=400x200"
            class="fill"
          />
        </div>
        <div class="card-content">
          <h3><span class="code">fill</span>（默认）</h3>
          <p>
            <strong>拉伸填充</strong><br />
            • 不保持宽高比<br />
            • 填充整个容器<br />
            • 图片变形<br />
            • 适用场景：不在意变形时
          </p>
        </div>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/7CB342/fff?text=400x200"
            class="contain"
          />
        </div>
        <div class="card-content">
          <h3><span class="code">contain</span></h3>
          <p>
            <strong>完整显示，留白</strong><br />
            • 保持宽高比<br />
            • 完整显示内容<br />
            • 容器可能留白<br />
            • 适用场景：产品图、Logo
          </p>
        </div>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/E53935/fff?text=400x200"
            class="cover"
          />
        </div>
        <div class="card-content">
          <h3><span class="code">cover</span></h3>
          <p>
            <strong>填充容器，裁剪</strong><br />
            • 保持宽高比<br />
            • 填充整个容器<br />
            • 内容可能被裁剪<br />
            • 适用场景：头像、背景图
          </p>
        </div>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/FB8C00/fff?text=400x200"
            class="none"
          />
        </div>
        <div class="card-content">
          <h3><span class="code">none</span></h3>
          <p>
            <strong>原始尺寸，裁剪</strong><br />
            • 保持宽高比<br />
            • 保持原始尺寸<br />
            • 不缩放，直接裁剪<br />
            • 适用场景：局部显示
          </p>
        </div>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/8E24AA/fff?text=400x200"
            class="scale-down"
          />
        </div>
        <div class="card-content">
          <h3><span class="code">scale-down</span></h3>
          <p>
            <strong>智能缩小</strong><br />
            • 保持宽高比<br />
            • 类似 none 或 contain 中较小者<br />
            • 内容大时缩小，小时不放大<br />
            • 适用场景：小图不放大
          </p>
        </div>
      </div>
    </div>

    <h2>竖向图片（200x400）在正方形容器（200x200）</h2>
    <div class="grid">
      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/200x400/4A90E2/fff?text=200x400"
            class="fill"
          />
        </div>
        <div class="card-content">
          <h3><span class="code">fill</span></h3>
          <p>变形更明显（4:2 变为 1:1）</p>
        </div>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/200x400/7CB342/fff?text=200x400"
            class="contain"
          />
        </div>
        <div class="card-content">
          <h3><span class="code">contain</span></h3>
          <p>左右留白，完整显示</p>
        </div>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/200x400/E53935/fff?text=200x400"
            class="cover"
          />
        </div>
        <div class="card-content">
          <h3><span class="code">cover</span></h3>
          <p>上下裁剪，填充容器</p>
        </div>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/200x400/FB8C00/fff?text=200x400"
            class="none"
          />
        </div>
        <div class="card-content">
          <h3><span class="code">none</span></h3>
          <p>原始尺寸，严重裁剪</p>
        </div>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/200x400/8E24AA/fff?text=200x400"
            class="scale-down"
          />
        </div>
        <div class="card-content">
          <h3><span class="code">scale-down</span></h3>
          <p>缩小到合适大小</p>
        </div>
      </div>
    </div>
  </body>
</html>
```

#### object-position 属性详解

`object-position` 控制内容在容器中的位置，类似 `background-position`。

**语法**：

```css
.element {
  object-position: center; /* 关键字：top/right/bottom/left/center */
  object-position: 50% 50%; /* 百分比 */
  object-position: 10px 20px; /* 绝对值 */
  object-position: right 10px bottom 20px; /* 组合 */
}
```

**示例**：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>object-position 示例</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
      }

      .card {
        text-align: center;
      }

      .image-box {
        width: 200px;
        height: 200px;
        border: 3px solid #ddd;
        margin: 0 auto 10px;
        overflow: hidden;
        background: #f0f0f0;
      }

      .image-box img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* 不同位置 */
      .pos-center {
        object-position: center;
      }
      .pos-top {
        object-position: top;
      }
      .pos-bottom {
        object-position: bottom;
      }
      .pos-left {
        object-position: left center;
      }
      .pos-right {
        object-position: right center;
      }
      .pos-top-left {
        object-position: left top;
      }
      .pos-top-right {
        object-position: right top;
      }
      .pos-bottom-left {
        object-position: left bottom;
      }
      .pos-bottom-right {
        object-position: right bottom;
      }
    </style>
  </head>
  <body>
    <h1>object-position 属性对比</h1>
    <p>图片：400x200（横图），容器：200x200，object-fit: cover</p>

    <div class="grid">
      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/4A90E2/fff?text=Center"
            class="pos-center"
          />
        </div>
        <p><code>center</code>（默认）</p>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/7CB342/fff?text=Top"
            class="pos-top"
          />
        </div>
        <p><code>top</code></p>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/E53935/fff?text=Bottom"
            class="pos-bottom"
          />
        </div>
        <p><code>bottom</code></p>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/FB8C00/fff?text=Left"
            class="pos-left"
          />
        </div>
        <p><code>left center</code></p>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/8E24AA/fff?text=Right"
            class="pos-right"
          />
        </div>
        <p><code>right center</code></p>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/00ACC1/fff?text=Top+Left"
            class="pos-top-left"
          />
        </div>
        <p><code>left top</code></p>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/5E35B1/fff?text=Top+Right"
            class="pos-top-right"
          />
        </div>
        <p><code>right top</code></p>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/43A047/fff?text=Bottom+Left"
            class="pos-bottom-left"
          />
        </div>
        <p><code>left bottom</code></p>
      </div>

      <div class="card">
        <div class="image-box">
          <img
            src="https://via.placeholder.com/400x200/D81B60/fff?text=Bottom+Right"
            class="pos-bottom-right"
          />
        </div>
        <p><code>right bottom</code></p>
      </div>
    </div>
  </body>
</html>
```

### 实际业务场景

#### 场景 1：响应式头像裁剪

**需求**：用户上传的头像尺寸和宽高比各异，需要统一显示为圆形头像。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>响应式头像裁剪</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 40px;
        background: #f5f5f5;
      }

      h1 {
        color: #333;
        margin-bottom: 30px;
      }

      .avatars {
        display: flex;
        gap: 30px;
        flex-wrap: wrap;
      }

      .avatar-card {
        text-align: center;
      }

      /* 头像容器 */
      .avatar-container {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid #ddd;
        background: #e0e0e0;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      /* 头像图片 */
      .avatar-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }

      .avatar-info {
        margin-top: 10px;
        font-size: 12px;
        color: #666;
      }

      /* 大尺寸头像 */
      .avatar-large {
        width: 150px;
        height: 150px;
      }

      /* 小尺寸头像 */
      .avatar-small {
        width: 50px;
        height: 50px;
        border-width: 2px;
      }
    </style>
  </head>
  <body>
    <h1>响应式头像裁剪</h1>

    <h2>不同宽高比的图片统一显示为圆形头像</h2>
    <div class="avatars">
      <div class="avatar-card">
        <div class="avatar-container">
          <img
            src="https://via.placeholder.com/400x200/4A90E2/fff?text=400x200"
            alt="横图"
          />
        </div>
        <div class="avatar-info">横图 (2:1)</div>
      </div>

      <div class="avatar-card">
        <div class="avatar-container">
          <img
            src="https://via.placeholder.com/200x400/7CB342/fff?text=200x400"
            alt="竖图"
          />
        </div>
        <div class="avatar-info">竖图 (1:2)</div>
      </div>

      <div class="avatar-card">
        <div class="avatar-container">
          <img
            src="https://via.placeholder.com/300x300/E53935/fff?text=300x300"
            alt="正方形"
          />
        </div>
        <div class="avatar-info">正方形 (1:1)</div>
      </div>

      <div class="avatar-card">
        <div class="avatar-container">
          <img
            src="https://via.placeholder.com/150x150/FB8C00/fff?text=150x150"
            alt="小图"
          />
        </div>
        <div class="avatar-info">小图 (150x150)</div>
      </div>
    </div>

    <h2>不同尺寸的头像</h2>
    <div class="avatars">
      <div class="avatar-card">
        <div class="avatar-container avatar-large">
          <img
            src="https://via.placeholder.com/400x200/8E24AA/fff?text=Large"
            alt="大头像"
          />
        </div>
        <div class="avatar-info">大 (150x150)</div>
      </div>

      <div class="avatar-card">
        <div class="avatar-container">
          <img
            src="https://via.placeholder.com/400x200/00ACC1/fff?text=Medium"
            alt="中头像"
          />
        </div>
        <div class="avatar-info">中 (100x100)</div>
      </div>

      <div class="avatar-card">
        <div class="avatar-container avatar-small">
          <img
            src="https://via.placeholder.com/400x200/5E35B1/fff?text=Small"
            alt="小头像"
          />
        </div>
        <div class="avatar-info">小 (50x50)</div>
      </div>
    </div>

    <h2>关键 CSS 代码</h2>
    <pre
      style="background: #282c34; color: #abb2bf; padding: 20px; border-radius: 8px; overflow-x: auto;"
    ><code>.avatar-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;      /* 圆形裁剪 */
  overflow: hidden;         /* 隐藏超出部分 */
  border: 3px solid #ddd;
}

.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;        /* 填充容器，裁剪超出部分 */
  object-position: center;  /* 居中显示（默认值） */
}</code></pre>

    <h2>关键点</h2>
    <ul>
      <li><code>object-fit: cover</code> - 保证填充整个容器，不留空白</li>
      <li><code>object-position: center</code> - 居中显示，裁剪两侧或上下</li>
      <li>
        <code>border-radius: 50%</code> + <code>overflow: hidden</code> -
        圆形裁剪
      </li>
      <li>适用于任意宽高比的图片</li>
    </ul>
  </body>
</html>
```

#### 场景 2：电商产品图展示

**需求**：商品图片宽高比不一致，需要在固定容器中完整展示不变形，背景填充留白区域。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>电商产品图展示</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 40px;
        background: #f5f5f5;
      }

      h1 {
        color: #333;
        margin-bottom: 30px;
      }

      .products {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
      }

      /* 产品卡片 */
      .product-card {
        background: white;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s, box-shadow 0.3s;
      }

      .product-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      }

      /* 产品图片容器 */
      .product-image-container {
        width: 100%;
        aspect-ratio: 1 / 1; /* 正方形容器 */
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
      }

      /* 产品图片 */
      .product-image-container img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain; /* 完整显示，不裁剪 */
      }

      /* 产品信息 */
      .product-info {
        padding: 15px;
      }

      .product-info h3 {
        margin: 0 0 8px 0;
        font-size: 16px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .product-price {
        color: #e53935;
        font-size: 20px;
        font-weight: bold;
      }

      .product-original-price {
        color: #999;
        font-size: 14px;
        text-decoration: line-through;
        margin-left: 8px;
      }

      .product-sales {
        margin-top: 8px;
        font-size: 12px;
        color: #999;
      }
    </style>
  </head>
  <body>
    <h1>电商产品图展示</h1>
    <p>不同宽高比的商品图在正方形容器中完整展示，不裁剪不变形</p>

    <div class="products">
      <!-- 横图产品 -->
      <div class="product-card">
        <div class="product-image-container">
          <img
            src="https://via.placeholder.com/400x200/4A90E2/fff?text=Laptop+400x200"
            alt="笔记本电脑"
          />
        </div>
        <div class="product-info">
          <h3>超薄笔记本电脑</h3>
          <div>
            <span class="product-price">¥5,999</span>
            <span class="product-original-price">¥7,999</span>
          </div>
          <div class="product-sales">已售 1.2万+</div>
        </div>
      </div>

      <!-- 竖图产品 -->
      <div class="product-card">
        <div class="product-image-container">
          <img
            src="https://via.placeholder.com/200x400/7CB342/fff?text=Phone+200x400"
            alt="智能手机"
          />
        </div>
        <div class="product-info">
          <h3>5G 智能手机</h3>
          <div>
            <span class="product-price">¥3,499</span>
            <span class="product-original-price">¥4,299</span>
          </div>
          <div class="product-sales">已售 8.5万+</div>
        </div>
      </div>

      <!-- 正方形产品 -->
      <div class="product-card">
        <div class="product-image-container">
          <img
            src="https://via.placeholder.com/300x300/E53935/fff?text=Watch+300x300"
            alt="智能手表"
          />
        </div>
        <div class="product-info">
          <h3>智能运动手表</h3>
          <div>
            <span class="product-price">¥1,299</span>
            <span class="product-original-price">¥1,999</span>
          </div>
          <div class="product-sales">已售 3.6万+</div>
        </div>
      </div>

      <!-- 小图产品 -->
      <div class="product-card">
        <div class="product-image-container">
          <img
            src="https://via.placeholder.com/180x180/FB8C00/fff?text=Earbuds+180x180"
            alt="无线耳机"
          />
        </div>
        <div class="product-info">
          <h3>无线蓝牙耳机</h3>
          <div>
            <span class="product-price">¥299</span>
            <span class="product-original-price">¥499</span>
          </div>
          <div class="product-sales">已售 15万+</div>
        </div>
      </div>
    </div>

    <h2>关键 CSS 代码</h2>
    <pre
      style="background: #282c34; color: #abb2bf; padding: 20px; border-radius: 8px; overflow-x: auto;"
    ><code>.product-image-container {
  width: 100%;
  aspect-ratio: 1 / 1;     /* 正方形容器 */
  background: white;        /* 填充留白区域 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;     /* 完整显示，不裁剪 */
}</code></pre>

    <h2>关键点</h2>
    <ul>
      <li><code>object-fit: contain</code> - 完整显示商品，不裁剪</li>
      <li><code>aspect-ratio: 1 / 1</code> - 统一容器比例为正方形</li>
      <li><code>background: white</code> - 填充留白区域，统一背景</li>
      <li><code>max-width/max-height: 100%</code> - 限制最大尺寸</li>
      <li>适用于电商、产品展示等需要完整显示的场景</li>
    </ul>
  </body>
</html>
```

#### 场景 3：全屏视频背景

**需求**：视频作为页面背景，需要填充整个视口，不留空白。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>全屏视频背景</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: Arial, sans-serif;
        overflow-x: hidden;
      }

      /* Hero 区域 */
      .hero-section {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* 视频背景 */
      .hero-video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover; /* 填充容器，保持宽高比 */
        z-index: -1;
      }

      /* 遮罩层（可选，增强文字可读性） */
      .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        z-index: 0;
      }

      /* 内容区域 */
      .hero-content {
        position: relative;
        z-index: 1;
        text-align: center;
        color: white;
        padding: 20px;
      }

      .hero-content h1 {
        font-size: 48px;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
      }

      .hero-content p {
        font-size: 20px;
        margin-bottom: 30px;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
      }

      .cta-button {
        display: inline-block;
        padding: 15px 40px;
        font-size: 18px;
        color: white;
        background: #4a90e2;
        border: none;
        border-radius: 50px;
        text-decoration: none;
        cursor: pointer;
        transition: background 0.3s, transform 0.3s;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      }

      .cta-button:hover {
        background: #357abd;
        transform: translateY(-2px);
      }

      /* 占位视频提示 */
      .video-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 24px;
        z-index: -2;
      }

      /* 内容区域 */
      .content-section {
        padding: 80px 20px;
        text-align: center;
        background: white;
      }

      .content-section h2 {
        font-size: 36px;
        margin-bottom: 20px;
        color: #333;
      }

      .content-section p {
        font-size: 18px;
        color: #666;
        line-height: 1.8;
        max-width: 800px;
        margin: 0 auto;
      }
    </style>
  </head>
  <body>
    <section class="hero-section">
      <!-- 视频背景 -->
      <!-- 注意：实际使用时替换为真实视频 -->
      <div class="video-placeholder">
        [ 视频背景占位 ]<br />
        实际使用时替换为 &lt;video&gt; 标签
      </div>
      <!--
    <video class="hero-video" autoplay muted loop playsinline>
      <source src="background-video.mp4" type="video/mp4">
      <source src="background-video.webm" type="video/webm">
    </video>
    -->

      <!-- 遮罩层（增强文字可读性） -->
      <div class="hero-overlay"></div>

      <!-- 内容 -->
      <div class="hero-content">
        <h1>欢迎来到我们的网站</h1>
        <p>创新科技，改变未来</p>
        <a href="#" class="cta-button">了解更多</a>
      </div>
    </section>

    <section class="content-section">
      <h2>全屏视频背景</h2>
      <p>
        使用 <code>object-fit: cover</code> 可以让视频填充整个视口，
        同时保持视频的原始宽高比，自动裁剪超出部分。
        这是现代网页设计中常见的视觉效果。
      </p>
    </section>

    <h2 style="text-align: center; margin: 40px 0 20px;">关键 CSS 代码</h2>
    <pre
      style="background: #282c34; color: #abb2bf; padding: 20px; border-radius: 8px; max-width: 900px; margin: 0 auto 40px; overflow-x: auto;"
    ><code>.hero-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;  /* 填充整个视口 */
  z-index: -1;
}</code></pre>

    <div style="max-width: 900px; margin: 0 auto 40px; padding: 20px;">
      <h2>关键点</h2>
      <ul style="line-height: 2;">
        <li><code>object-fit: cover</code> - 填充整个视口，保持宽高比</li>
        <li>
          <code>position: absolute</code> + <code>width/height: 100%</code> -
          固定尺寸
        </li>
        <li><code>autoplay muted loop</code> - 自动播放需要静音</li>
        <li><code>playsinline</code> - iOS 内联播放（不全屏）</li>
        <li><code>z-index: -1</code> - 放置在内容下方</li>
        <li>可选遮罩层 - 增强文字可读性</li>
      </ul>
    </div>
  </body>
</html>
```

#### 场景 4：响应式 iframe 嵌入（16:9 视频）

**需求**：嵌入 YouTube 视频，保持 16:9 宽高比，容器宽度自适应。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>响应式 iframe 嵌入</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 40px;
        max-width: 1200px;
        margin: 0 auto;
      }

      h1 {
        color: #333;
        margin-bottom: 30px;
      }

      /* 响应式 iframe 容器 */
      .video-container {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%; /* 16:9 = 9/16 = 0.5625 = 56.25% */
        height: 0;
        overflow: hidden;
        background: #000;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
      }

      /* 其他宽高比示例 */
      .ratio-4-3 {
        padding-bottom: 75%; /* 4:3 = 3/4 = 0.75 = 75% */
      }

      .ratio-21-9 {
        padding-bottom: 42.857%; /* 21:9 = 9/21 ≈ 0.42857 = 42.857% */
      }

      .example {
        margin-bottom: 40px;
      }
    </style>
  </head>
  <body>
    <h1>响应式 iframe 嵌入</h1>

    <div class="example">
      <h2>16:9 视频（最常用）</h2>
      <div class="video-container">
        <!-- 实际使用时替换为真实的 YouTube URL -->
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
    </div>

    <div class="example">
      <h2>4:3 视频（经典比例）</h2>
      <div class="video-container ratio-4-3">
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen>
        </iframe>
      </div>
    </div>

    <div class="example">
      <h2>21:9 视频（超宽屏）</h2>
      <div class="video-container ratio-21-9">
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" allowfullscreen>
        </iframe>
      </div>
    </div>

    <h2>关键 CSS 代码</h2>
    <pre
      style="background: #282c34; color: #abb2bf; padding: 20px; border-radius: 8px; overflow-x: auto;"
    ><code>.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;              /* 高度由 padding 撑开 */
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}</code></pre>

    <h2>关键点</h2>
    <ul>
      <li>
        <code>padding-bottom: 56.25%</code> - 利用百分比 padding 基于宽度的特性
      </li>
      <li><code>height: 0</code> - 容器高度由 padding 撑开</li>
      <li><code>position: absolute</code> - iframe 绝对定位填充容器</li>
      <li>容器宽度自适应，高度自动计算</li>
    </ul>

    <h2>其他常见宽高比</h2>
    <ul>
      <li><strong>16:9</strong>（56.25%）- YouTube、现代视频</li>
      <li><strong>4:3</strong>（75%）- 经典电视</li>
      <li><strong>21:9</strong>（42.857%）- 电影超宽屏</li>
      <li><strong>1:1</strong>（100%）- 正方形</li>
      <li><strong>9:16</strong>（177.778%）- 竖屏视频（抖音、快手）</li>
    </ul>
  </body>
</html>
```

#### 场景 5：图片底部空白间隙的解决

**问题**：图片下方出现 3-4px 的空白间隙。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>图片底部空白间隙</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 40px;
      }

      h1,
      h2 {
        color: #333;
      }

      .example {
        margin-bottom: 40px;
      }

      .container {
        display: inline-block;
        border: 3px solid red;
        margin: 10px;
      }

      .container img {
        width: 200px;
        height: auto;
      }

      /* 问题示例 */
      .problem img {
        /* 默认情况，会有空白 */
      }

      /* 解决方案 1：display: block */
      .solution-1 img {
        display: block;
      }

      /* 解决方案 2：vertical-align */
      .solution-2 img {
        vertical-align: top; /* 或 bottom、middle */
      }

      /* 解决方案 3：容器 line-height */
      .solution-3 {
        line-height: 0;
      }

      /* 解决方案 4：容器 font-size */
      .solution-4 {
        font-size: 0;
      }

      .note {
        max-width: 800px;
        padding: 15px;
        background: #f0f0f0;
        border-left: 4px solid #4a90e2;
        margin: 20px 0;
      }

      .comparison {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <h1>图片底部空白间隙问题与解决方案</h1>

    <div class="note">
      <strong>问题原因：</strong>
      图片默认是 inline-block 元素，按基线（baseline）对齐。
      基线不在元素底部，而是在字母 x 的底部，下方留有空间容纳字母的下伸部分（如
      g、y）。
    </div>

    <div class="example">
      <h2>问题示例</h2>
      <div class="container problem">
        <img
          src="https://via.placeholder.com/200x150/4A90E2/fff?text=Image"
          alt="问题示例"
        />
        <!-- 可以看到红色边框下方有空白 -->
      </div>
    </div>

    <h2>解决方案对比</h2>
    <div class="comparison">
      <div>
        <h3>方案 1：display: block</h3>
        <div class="container solution-1">
          <img
            src="https://via.placeholder.com/200x150/7CB342/fff?text=block"
            alt="方案1"
          />
        </div>
        <p><code>display: block;</code></p>
        <p>✅ 推荐：最简单直接</p>
      </div>

      <div>
        <h3>方案 2：vertical-align</h3>
        <div class="container solution-2">
          <img
            src="https://via.placeholder.com/200x150/E53935/fff?text=vertical-align"
            alt="方案2"
          />
        </div>
        <p><code>vertical-align: top;</code></p>
        <p>✅ 推荐：保持 inline 特性</p>
      </div>

      <div>
        <h3>方案 3：line-height: 0</h3>
        <div class="container solution-3">
          <img
            src="https://via.placeholder.com/200x150/FB8C00/fff?text=line-height"
            alt="方案3"
          />
        </div>
        <p><code>line-height: 0;</code></p>
        <p>⚠️ 可能影响容器内文字</p>
      </div>

      <div>
        <h3>方案 4：font-size: 0</h3>
        <div class="container solution-4">
          <img
            src="https://via.placeholder.com/200x150/8E24AA/fff?text=font-size"
            alt="方案4"
          />
        </div>
        <p><code>font-size: 0;</code></p>
        <p>⚠️ 可能影响容器内文字</p>
      </div>
    </div>

    <h2>推荐方案总结</h2>
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background: #f5f5f5;">
          <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">
            方案
          </th>
          <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">
            代码
          </th>
          <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">
            适用场景
          </th>
          <th
            style="border: 1px solid #ddd; padding: 10px; text-align: center;"
          >
            推荐
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid #ddd; padding: 10px;">display: block</td>
          <td style="border: 1px solid #ddd; padding: 10px;">
            <code>img { display: block; }</code>
          </td>
          <td style="border: 1px solid #ddd; padding: 10px;">图片独占一行</td>
          <td
            style="border: 1px solid #ddd; padding: 10px; text-align: center;"
          >
            ✅
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 10px;">vertical-align</td>
          <td style="border: 1px solid #ddd; padding: 10px;">
            <code>img { vertical-align: top; }</code>
          </td>
          <td style="border: 1px solid #ddd; padding: 10px;">
            需要保持 inline 特性
          </td>
          <td
            style="border: 1px solid #ddd; padding: 10px; text-align: center;"
          >
            ✅
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 10px;">line-height: 0</td>
          <td style="border: 1px solid #ddd; padding: 10px;">
            <code>.container { line-height: 0; }</code>
          </td>
          <td style="border: 1px solid #ddd; padding: 10px;">容器只有图片</td>
          <td
            style="border: 1px solid #ddd; padding: 10px; text-align: center;"
          >
            ⚠️
          </td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 10px;">font-size: 0</td>
          <td style="border: 1px solid #ddd; padding: 10px;">
            <code>.container { font-size: 0; }</code>
          </td>
          <td style="border: 1px solid #ddd; padding: 10px;">容器只有图片</td>
          <td
            style="border: 1px solid #ddd; padding: 10px; text-align: center;"
          >
            ⚠️
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
```

#### 场景 6：Canvas 高清渲染

**问题**：Canvas 绘制的内容在高分辨率屏幕（Retina）上模糊。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Canvas 高清渲染</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 40px;
      }

      h1,
      h2 {
        color: #333;
      }

      .example {
        margin: 30px 0;
      }

      canvas {
        border: 2px solid #ddd;
        margin: 10px;
      }

      .note {
        max-width: 800px;
        padding: 15px;
        background: #fff3cd;
        border-left: 4px solid #ffc107;
        margin: 20px 0;
      }
    </style>
  </head>
  <body>
    <h1>Canvas 高清渲染</h1>

    <div class="note">
      <strong>问题原因：</strong>
      Canvas 有两套尺寸：CSS 尺寸（显示尺寸）和
      canvas.width/height（绘制尺寸）。 在高分辨率屏幕（devicePixelRatio >
      1）上，如果不调整绘制尺寸，会导致模糊。
    </div>

    <div class="example">
      <h2>问题示例（模糊）</h2>
      <canvas id="blurryCanvas"></canvas>
      <p>普通 Canvas（未考虑设备像素比）</p>
    </div>

    <div class="example">
      <h2>解决方案（清晰）</h2>
      <canvas id="sharpCanvas"></canvas>
      <p>高清 Canvas（考虑了设备像素比）</p>
    </div>

    <script>
      // 问题示例：模糊的 Canvas
      (function () {
        const canvas = document.getElementById('blurryCanvas');
        const ctx = canvas.getContext('2d');

        // ❌ 直接设置 Canvas 尺寸（未考虑设备像素比）
        canvas.width = 400;
        canvas.height = 300;

        // CSS 尺寸与 Canvas 尺寸相同
        canvas.style.width = '400px';
        canvas.style.height = '300px';

        // 绘制内容
        ctx.fillStyle = '#4A90E2';
        ctx.fillRect(50, 50, 100, 100);

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('模糊的文字', 60, 100);

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(300, 150, 50, 0, Math.PI * 2);
        ctx.stroke();
      })();

      // 解决方案：高清 Canvas
      (function () {
        const canvas = document.getElementById('sharpCanvas');
        const ctx = canvas.getContext('2d');

        // ✅ 获取设备像素比
        const dpr = window.devicePixelRatio || 1;
        console.log('设备像素比:', dpr);

        // 逻辑尺寸（显示尺寸）
        const logicalWidth = 400;
        const logicalHeight = 300;

        // 设置 CSS 尺寸（显示尺寸）
        canvas.style.width = logicalWidth + 'px';
        canvas.style.height = logicalHeight + 'px';

        // 设置 Canvas 绘制尺寸（考虑设备像素比）
        canvas.width = logicalWidth * dpr;
        canvas.height = logicalHeight * dpr;

        // 缩放绘图上下文
        ctx.scale(dpr, dpr);

        // 现在可以按照逻辑尺寸进行绘制
        ctx.fillStyle = '#4A90E2';
        ctx.fillRect(50, 50, 100, 100);

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText('清晰的文字', 60, 100);

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(300, 150, 50, 0, Math.PI * 2);
        ctx.stroke();
      })();
    </script>

    <h2>关键代码</h2>
    <pre
      style="background: #282c34; color: #abb2bf; padding: 20px; border-radius: 8px; overflow-x: auto;"
    ><code>const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// 1. 获取设备像素比
const dpr = window.devicePixelRatio || 1;

// 2. 逻辑尺寸（显示尺寸）
const logicalWidth = 400;
const logicalHeight = 300;

// 3. 设置 CSS 尺寸
canvas.style.width = logicalWidth + 'px';
canvas.style.height = logicalHeight + 'px';

// 4. 设置 Canvas 绘制尺寸（乘以设备像素比）
canvas.width = logicalWidth * dpr;
canvas.height = logicalHeight * dpr;

// 5. 缩放绘图上下文
ctx.scale(dpr, dpr);

// 6. 按照逻辑尺寸进行绘制
ctx.fillRect(0, 0, 100, 100);</code></pre>

    <h2>关键点</h2>
    <ul>
      <li><strong>两套尺寸</strong>：CSS 尺寸（显示）+ Canvas 尺寸（绘制）</li>
      <li><strong>设备像素比</strong>：Retina 屏通常是 2 或 3</li>
      <li><strong>canvas.width/height</strong>：需要乘以设备像素比</li>
      <li><strong>ctx.scale(dpr, dpr)</strong>：缩放上下文，按逻辑尺寸绘制</li>
      <li>
        <strong>重要</strong>：不要在 Canvas 元素上直接设置 width/height
        属性（HTML），会覆盖 JS 设置
      </li>
    </ul>

    <h2>封装为工具函数</h2>
    <pre
      style="background: #282c34; color: #abb2bf; padding: 20px; border-radius: 8px; overflow-x: auto;"
    ><code>function setupHiDPICanvas(canvas, width, height) {
  const dpr = window.devicePixelRatio || 1;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  return ctx;
}

// 使用
const canvas = document.querySelector('canvas');
const ctx = setupHiDPICanvas(canvas, 400, 300);
ctx.fillRect(0, 0, 100, 100); // 按逻辑尺寸绘制</code></pre>
  </body>
</html>
```

## 总结备忘

### 核心要点

#### 1. 可替换元素的本质

- **定义**：内容由外部资源控制，CSS 只能控制容器
- **特征**：具有固有尺寸和宽高比，默认表现为 inline-block
- **边界**：CSS 无法控制元素内部内容（安全性和独立性）

#### 2. 尺寸计算规则速记

| 设置方式                 | 结果              | 宽高比   |
| ------------------------ | ----------------- | -------- |
| 不设置 CSS               | 使用固有尺寸      | 保持     |
| 只设置 width             | height 自动计算   | 保持     |
| 只设置 height            | width 自动计算    | 保持     |
| 同时设置 width 和 height | 强制使用 CSS 尺寸 | 可能破坏 |
| 使用 aspect-ratio        | 覆盖固有宽高比    | 强制指定 |

**优先级**（从高到低）：CSS 显式设置 > CSS 设置 + 固有宽高比 > 固有尺寸 > 默认尺寸

#### 3. object-fit 取值速记

| 值           | 保持宽高比 | 填充容器 | 可能裁剪 | 可能留白 | 适用场景     |
| ------------ | ---------- | -------- | -------- | -------- | ------------ |
| `fill`       | ❌         | ✅       | ❌       | ❌       | 不在意变形   |
| `contain`    | ✅         | ❌       | ❌       | ✅       | 产品图、Logo |
| `cover`      | ✅         | ✅       | ✅       | ❌       | 头像、背景图 |
| `none`       | ✅         | ❌       | ✅       | 可能     | 原始尺寸显示 |
| `scale-down` | ✅         | ❌       | ❌       | 可能     | 小图不放大   |

#### 4. 常见问题速查表

| 问题               | 原因              | 解决方案                                  |
| ------------------ | ----------------- | ----------------------------------------- |
| 图片下方有空白间隙 | 基线对齐问题      | `display: block` 或 `vertical-align: top` |
| 图片变形           | 未保持宽高比      | 使用 `object-fit: cover/contain`          |
| Canvas 模糊        | 未考虑设备像素比  | `canvas.width *= dpr`                     |
| iframe 不响应式    | 固定尺寸          | 使用 padding-bottom 技巧                  |
| 视频背景不填充     | 未设置 object-fit | `object-fit: cover`                       |

### 最佳实践

#### 1. 响应式图片的标准做法

```html
<img
  src="image.jpg"
  srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  loading="lazy"
  alt="描述性文字"
/>
```

#### 2. 头像裁剪的标准做法

```css
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```

#### 3. 视频背景的标准做法

```css
.video-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
```

#### 4. Canvas 高清渲染的标准做法

```javascript
const dpr = window.devicePixelRatio || 1;
canvas.width = logicalWidth * dpr;
canvas.height = logicalHeight * dpr;
canvas.style.width = logicalWidth + 'px';
canvas.style.height = logicalHeight + 'px';
ctx.scale(dpr, dpr);
```

#### 5. 响应式 iframe 的标准做法

```css
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

### 可替换元素 vs 非可替换元素对比

| 特性         | 可替换元素        | 非可替换元素 |
| ------------ | ----------------- | ------------ |
| 内容来源     | 外部资源          | HTML 文本    |
| CSS 控制     | 只控制容器        | 完全控制     |
| 固有尺寸     | 有                | 无           |
| 固有宽高比   | 有                | 无           |
| 默认 display | inline-block 表现 | block/inline |
| 尺寸计算     | 基于固有尺寸      | 基于内容     |

### 开发建议

#### 1. 尺寸设置

- 优先使用 `max-width: 100%` + `height: auto` 实现响应式
- 需要固定容器时，使用 `object-fit` 控制内容适配
- 避免同时设置 width 和 height 导致变形

#### 2. 性能优化

- 使用 `loading="lazy"` 懒加载非首屏图片
- 使用 `srcset` 和 `<picture>` 响应式加载
- 关键图片使用 `<link rel="preload">`
- 优先使用 WebP 格式

#### 3. 可访问性

- 所有图片必须有 `alt` 属性
- 装饰性图片使用空 `alt`
- 功能性图片的 `alt` 描述功能

#### 4. 兼容性

| 特性           | 兼容性                   | 降级方案              |
| -------------- | ------------------------ | --------------------- |
| object-fit     | IE 不支持                | polyfill 或容器裁剪   |
| loading="lazy" | Chrome 77+, Safari 16.4+ | Intersection Observer |
| aspect-ratio   | Chrome 88+, Safari 15+   | padding-bottom 技巧   |
| srcset         | 主流浏览器支持           | src 降级              |

### 调试技巧

#### 1. 检查固有尺寸

```javascript
const img = document.querySelector('img');
console.log('固有尺寸:', img.naturalWidth, 'x', img.naturalHeight);
console.log('显示尺寸:', img.width, 'x', img.height);
console.log('CSS 尺寸:', img.offsetWidth, 'x', img.offsetHeight);
```

#### 2. 检查图片加载状态

```javascript
const img = document.querySelector('img');
console.log('是否完成加载:', img.complete);
console.log('固有尺寸:', img.naturalWidth, img.naturalHeight);
// naturalWidth 为 0 表示未加载或加载失败
```

#### 3. 使用浏览器开发者工具

- **Network 面板**：查看图片加载时间和大小
- **Elements 面板**：检查 computed 样式中的 object-fit
- **Performance 面板**：分析图片渲染性能
- **Lighthouse**：性能和可访问性审计

### 快速参考

#### object-fit 选择流程图

```
需要填充整个容器？
├─ 是 → cover（裁剪）
│  ├─ 背景图、头像 → cover
│  └─ 视频背景 → cover
│
└─ 否 → contain（留白）
   ├─ 产品图、Logo → contain
   ├─ 文档预览 → contain
   └─ 小图不放大 → scale-down
```

#### 图片底部空白解决方案选择

```
图片是否需要与文字混排？
├─ 否 → display: block
└─ 是 → vertical-align: top/middle/bottom
```

#### Canvas 尺寸设置步骤

```
1. 获取 dpr = window.devicePixelRatio
2. 设置 CSS 尺寸：style.width/height = 逻辑尺寸
3. 设置绘制尺寸：canvas.width/height = 逻辑尺寸 * dpr
4. 缩放上下文：ctx.scale(dpr, dpr)
5. 按逻辑尺寸绘制
```

### 常见错误

#### 错误 1：混淆 CSS 尺寸和固有尺寸

```html
<!-- ❌ 错误 -->
<canvas width="400" height="300"></canvas>
<!-- HTML 属性设置的是绘制尺寸，不是显示尺寸 -->

<!-- ✅ 正确 -->
<canvas id="myCanvas"></canvas>
<script>
  canvas.width = 400 * dpr; // 绘制尺寸
  canvas.style.width = '400px'; // 显示尺寸
</script>
```

#### 错误 2：忘记 object-fit 导致变形

```css
/* ❌ 错误 */
.avatar img {
  width: 100px;
  height: 100px;
  /* 图片会变形 */
}

/* ✅ 正确 */
.avatar img {
  width: 100px;
  height: 100px;
  object-fit: cover; /* 保持宽高比 */
}
```

#### 错误 3：响应式 iframe 忘记 height: 0

```css
/* ❌ 错误 */
.video-container {
  padding-bottom: 56.25%;
  /* 没有设置 height: 0 */
}

/* ✅ 正确 */
.video-container {
  padding-bottom: 56.25%;
  height: 0; /* 必须设置，高度由 padding 撑开 */
}
```

### 参考资料

- [MDN - Replaced Elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element)
- [MDN - object-fit](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit)
- [MDN - object-position](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position)
- [W3C CSS Images Module Level 3](https://www.w3.org/TR/css-images-3/)
- [MDN - Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Web.dev - Optimize Images](https://web.dev/fast/#optimize-your-images)
- [Responsive Images Community Group](https://responsiveimages.org/)
