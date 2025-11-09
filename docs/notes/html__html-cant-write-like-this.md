---
group:
  title: html
  order: 1
title: HTML 不能这么写
toc: content
---

## 概述

在日常开发中，许多 HTML 错误看似无伤大雅，但会导致：

- **可访问性问题**：屏幕阅读器无法正确解读
- **SEO 受损**：搜索引擎无法理解页面结构
- **用户体验下降**：键盘导航失效、触摸操作异常
- **浏览器行为不一致**：不同浏览器处理方式可能不同

## 1. 页面基础设置：最容易忽视的关键

### 错误示例

```html
<html>
  <head>
    <title>我的网站</title>
  </head>
  <body>
    <h1>欢迎</h1>
  </body>
</html>
```

### 问题分析

- **缺少 DOCTYPE**：可能触发浏览器的[怪异模式](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Guides/Quirks_mode_and_standards_mode)（Quirks Mode）
- **缺少语言声明**：屏幕阅读器无法选择正确的发音规则，对于可访问性、国际化、SEO 和用户体验都至关重要。
- **缺少字符编码**：没有这个标签，你的网页可能会显示乱码，特别是当页面包含非英文字符时。
- **缺少 viewport**：没有这个标签，你的网站在手机上可能看起来像被缩小了的桌面版，用户需要手动缩放才能阅读，体验极差。

### 正确实践

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="页面描述，有助于SEO" />
    <title>页面标题 - 网站名称</title>
  </head>
  <body>
    <h1>欢迎访问</h1>
  </body>
</html>
```

### 各声明的作用

#### DOCTYPE

1990 年代末，网景 Navigator 和微软 IE 浏览器之间爆发"浏览器战争"。为了争夺市场份额，各家浏览器都引入了自己的专有特性和渲染方式，导致：

- **同一网页在不同浏览器中显示效果迥异**
- **开发者需要为不同浏览器编写特定代码**
- **网页开发成本高昂，兼容性成为噩梦**

为了解决向后兼容性问题，现代浏览器引入了两种渲染模式：

1. **标准模式（Standards Mode）**

   - 按照 W3C 标准解析和渲染网页
   - 布局和样式表现符合现代规范

2. **怪异模式（Quirks Mode）**
   - 模拟旧版本浏览器的非标准行为
   - 为兼容老旧网页而存在

`<!DOCTYPE html>` 的主要作用就是**告诉浏览器使用标准模式渲染页面**。

#### 语言声明

##### 1. **可访问性（Accessibility） - 最重要的原因**

对于使用屏幕阅读器的视障用户，`lang` 属性是**必不可少的**：

```html
<!-- 没有 lang 属性 -->
<html>
  <!-- 屏幕阅读器可能会用默认语言（如英语）的发音规则来朗读中文内容，结果完全无法理解 -->

  <!-- 有 lang 属性 -->
  <html lang="zh-CN">
    <!-- 屏幕阅读器会自动切换到中文语音库，用正确的中文发音和语调朗读内容 -->
  </html>
</html>
```

**实际影响**：

- 屏幕阅读器会选择正确的语音合成器（TTS）
- 使用正确的发音规则和语调
- 对多语言页面，屏幕阅读器能在不同语言间智能切换

##### 2. **搜索引擎优化（SEO）**

搜索引擎使用 `lang` 属性来：

- **精准定位目标受众**：知道你的内容面向中文用户
- **提高地域相关性**：在中文搜索结果中优先展示
- **语言识别**：帮助正确索引中文内容

##### 3. **浏览器智能处理**

浏览器根据 `lang` 属性提供更好的用户体验：

- **字体渲染**：选择更适合中文的字体回退策略
- **拼写检查**：使用中文词典进行拼写检查
- **翻译功能**：浏览器能正确识别源语言，提供准确的翻译
- **引号样式**：使用中文引号样式（「」、『』）而不是英文引号（""）

#### 声明字符编码

计算机只能理解数字（0 和 1），所以需要一套规则将我们看到的字符（字母、数字、中文、表情符号等）转换成数字。这个过程就是**字符编码**。

- 比如字母 "A" 在 ASCII 编码中是数字 `65`
- 但不同语言、不同系统有不同的编码规则

如果没有指定编码，浏览器会**猜测**使用哪种编码来解析你的网页，如果猜错了，就会出现乱码。

不同浏览器可能有不同的默认编码猜测策略：

- 可能猜测为 ISO-8859-1（西欧语言）
- 可能猜测为系统区域设置的编码
- 可能根据页面内容猜测

某些编码方式可能存在安全漏洞，UTF-8 被认为是相对安全的编码。

#### viewport

`<meta name="viewport" content="width=device-width, initial-scale=1.0" />` 在现代网页开发中几乎是**必须的**，因为它解决了移动端网页浏览的一个核心历史问题，是**响应式网页设计的基石**。

下面我们来详细拆解为什么它如此重要。

##### 1. 历史背景：问题的起源

在智能手机诞生初期（比如第一代 iPhone 时代），大多数网站都是为桌面电脑的宽屏设计的，没有移动版本。如果手机浏览器直接以它窄小的物理像素宽度（比如 320px）来渲染一个为 1024px 宽度设计的网页，那么网页内容会被挤压得无法阅读。

为了解决这个问题，苹果公司为移动版 Safari 引入了一个“虚拟的布局视口”的概念。这个虚拟视口默认宽度通常是**980px**。手机会将这个 980px 宽的网页**缩放**到手机屏幕的物理宽度（例如 320px）来显示。

- **结果就是**：用户打开一个普通网站，会看到一个完整的、但非常小的桌面版网页缩略图，然后需要双击或放大才能阅读特定内容。**体验非常糟糕**。

##### 2. `<meta viewport>` 标签的作用：解决问题

这个 Meta 标签就是用来告诉移动端浏览器：“**请按照设备的物理宽度来渲染网页，不要自作聪明地缩放。**”

我们来拆解它的属性：

- `width=device-width`：

  - 这指令告诉浏览器，**布局视口的宽度应该等于设备的理想视口宽度**（通常是屏幕的物理像素宽度，会考虑设备像素比进行换算）。
  - 例如，在 iPhone 12 上（物理宽度 390px，设备像素比为 3），`device-width`会被解析为 **390px**（CSS 像素）。这样，你的 CSS 样式（比如 `div { width： 100% }`）就会基于这个 390px 的宽度进行计算，布局就能正确适配手机屏幕。

- `initial-scale=1.0`：
  - 这指令设置了页面的**初始缩放级别为 1.0，也就是 100%，不放大也不缩小**。
  - 它确保了页面以 1：1 的比例显示，CSS 的 1 个像素就对应屏幕的 1 个“CSS 像素”（注意不是物理像素）。
  - 这个属性也隐含了将视口宽度设置为 `device-width` 的作用，所以有时只写这个属性也能达到类似效果。但为了兼容性，通常两者都写上。

## 2. 按钮 vs 链接：最容易混淆的选择

### 核心原则

- **链接（`<a>`）**：用于**导航**到另一个位置（页面、锚点、文件）
- **按钮（`<button>`）**：用于**触发操作**（提交表单、打开弹窗、切换状态）

### 常见错误

```html
<!-- ❌ 错误1：用链接执行操作 -->
<a href="#" onclick="deleteItem()">删除</a>
<a href="javascript:void(0)" onclick="submitForm()">提交</a>

<!-- ❌ 错误2：用按钮做导航 -->
<button onclick="location.href='/page'">查看详情</button>
<button onclick="window.open('/article')">阅读文章</button>

<!-- ❌ 错误3：空链接 -->
<a href="#">点击这里</a>
```

### 错误后果

1. **键盘导航异常**：

   - 链接默认支持`Enter`键触发
   - 按钮默认支持`Space`和`Enter`键
   - 用错元素会导致键盘操作不符合用户预期

2. **屏幕阅读器混乱**：

   - 读屏软件会告知"链接"或"按钮"
   - 错误的语义会误导用户预期

3. **浏览器行为差异**：
   - 右键点击链接可以"在新标签页打开"
   - 按钮没有此功能

### 正确实践

```html
<!-- ✅ 用链接导航 -->
<a href="/user/profile">查看个人资料</a>
<a href="/articles/123">阅读文章</a>
<a href="#section-2">跳转到第二章</a>
<a href="/document.pdf" download>下载文档</a>

<!-- ✅ 用按钮执行操作 -->
<button type="button" onclick="toggleMenu()">打开菜单</button>
<button type="submit">提交表单</button>
<button type="button" onclick="deleteItem()">删除</button>
<button type="button" aria-expanded="false" onclick="toggleAccordion()">
  展开详情
</button>
```

### 特殊情况：按钮样式的链接

```html
<!-- 视觉上是按钮，但功能是导航 -->
<a href="/signup" class="btn btn-primary">立即注册</a>
<a href="/pricing" class="button-style">查看价格</a>
```

### 快速判断法

问自己：**点击后会发生什么？**

- 跳转到新页面/位置？ → `<a href="...">`
- 改变当前页面状态？ → `<button type="button">`
- 提交数据到服务器？ → `<button type="submit">`
- 在表单中重置数据？ → `<button type="reset">`

## 3. 标题层级：最常见的结构性错误

### 错误示例

```html
<!-- ❌ 错误1：跳级使用 -->
<h1>网站标题</h1>
<h3>子标题</h3>
<!-- 跳过了h2 -->

<!-- ❌ 错误2：多个h1 -->
<h1>页面主标题</h1>
<section>
  <h1>章节标题</h1>
  <!-- 不应该再用h1 -->
</section>

<!-- ❌ 错误3：只为样式选择标题 -->
<h3>这个标题看起来大小合适</h3>
<!-- 应该用CSS控制样式，而不是选择h3 -->

<!-- ❌ 错误4：反向层级 -->
<h3>第一部分</h3>
<h2>第一部分的子章节</h2>
<!-- h2不应该在h3之后 -->
```

### 为什么标题层级如此重要

1. **屏幕阅读器依赖标题导航**：

   - 视障用户使用快捷键跳转标题
   - 错误的层级会导致理解困难

2. **SEO 优化的关键因素**：

   - 搜索引擎通过标题理解页面结构
   - h1 是最重要的 SEO 信号之一

3. **文档大纲生成**：
   - 浏览器/工具会根据标题生成目录
   - 层级错误会导致目录混乱

### 正确的标题层级

```html
<h1>页面主标题</h1>

<h2>第一个主要章节</h2>
<p>章节内容...</p>

<h3>第一个子章节</h3>
<p>子章节内容...</p>

<h3>第二个子章节</h3>
<p>子章节内容...</p>

<h4>更深一层的内容</h4>
<p>详细内容...</p>

<h2>第二个主要章节</h2>
<p>章节内容...</p>

<h3>子章节</h3>
<p>内容...</p>
```

### 现代 HTML5 中的标题使用

```html
<article>
  <h1>文章标题</h1>

  <section>
    <h2>第一部分</h2>
    <p>内容...</p>

    <section>
      <h3>子部分</h3>
      <p>内容...</p>
    </section>
  </section>

  <section>
    <h2>第二部分</h2>
    <p>内容...</p>
  </section>
</article>
```

### 最佳实践

1. **每个页面只有一个 h1**（通常是页面主标题）
2. **不要跳级**：h1 → h2 → h3，按顺序递增
3. **可以跳回**：h4 → h2 是允许的（新章节）
4. **用 CSS 控制样式**：不要因为视觉效果选择标题级别

```css
/* 用CSS控制标题样式 */
h3.large-heading {
  font-size: 2rem; /* 让h3看起来像h1 */
}
```

## 4. 元素嵌套规则的深层原因

### 块级与内联元素的错误嵌套

```html
<!-- ❌ 错误示例 -->
<span>
  <div>块级内容</div>
</span>

<p>
  <div>另一个块级元素</div>
</p>

<a href="/blog">
  <a href="/article">嵌套链接</a>
</a>

<a href="/page">
  <button>点击我</button>
</a>
```

### 规范背后的设计原理

1. **内容模型约束**：

   - **内联元素**（span、a、strong 等）只能包含**短语内容**（Phrasing Content）
   - **块级元素**（div、p、section 等）可以包含**流内容**（Flow Content）

2. **浏览器解析机制**：

   ```html
   <!-- 你写的代码 -->
   <span>
     <div>块级内容</div>
   </span>

   <!-- 浏览器实际解析为 -->
   <span> </span>
   <div>块级内容</div>
   <span></span>
   ```

   浏览器会自动"修复"错误的嵌套，导致意外的 DOM 结构。

3. **交互元素不能嵌套**：

   根据 HTML 规范，交互元素（`<a>`、`<button>`、`<input>`、`<select>`等）内部**不能包含其他交互元素**。

### `<a>` 标签嵌套的特殊陷阱

```html
<!-- ❌ 错误：嵌套链接 -->
<a href="/blog">
  查看博客
  <a href="/article">这篇文章</a>
</a>

<!-- ❌ 错误：链接包含按钮 -->
<a href="/page">
  <button>点击我</button>
</a>

<!-- ❌ 错误：链接包含输入框 -->
<a href="/download">
  <input type="text" placeholder="输入内容" />
</a>
```

### 问题根源

- **行为冲突**：两个可点击元素，浏览器不知道响应哪个
- **焦点管理混乱**：键盘导航时，焦点顺序不可预测
- **语义混乱**：屏幕阅读器无法正确解读

### 正确实践

```html
<!-- ✅ 方案1：只用链接 -->
<a href="/target" class="button-style">跳转页面</a>

<!-- ✅ 方案2：只用按钮 -->
<button type="button" onclick="navigateTo('/target')">跳转页面</button>

<!-- ✅ 方案3：卡片内多个交互元素 -->
<div class="card">
  <h3><a href="/article/123">文章标题</a></h3>
  <p>文章摘要...</p>
  <div class="actions">
    <a href="/article/123">阅读全文</a>
    <button type="button" onclick="bookmarkArticle(123)">收藏</button>
  </div>
</div>
```

### 正确的嵌套结构

```html
<div class="container">
  <header>
    <h1>页面标题</h1>
    <nav>
      <ul>
        <li><a href="/">首页</a></li>
        <li><a href="/about">关于</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h2>文章标题</h2>
      <p>段落文本包含<strong>强调内容</strong>和<a href="#">链接</a></p>

      <div class="content-block">
        <span>内联元素在块级容器内</span>
      </div>
    </article>
  </main>

  <footer>
    <p>&copy; 2024 版权所有</p>
  </footer>
</div>
```

## 5. 语义化 HTML 的现代实践

### 从 div soup 到语义化结构

```html
<!-- ❌ 传统做法：div soup -->
<div class="header">
  <div class="logo">网站 Logo</div>
  <div class="nav">
    <div class="menu-item">首页</div>
    <div class="menu-item">关于</div>
    <div class="menu-item">联系</div>
  </div>
</div>

<div class="main">
  <div class="article">
    <div class="title">文章标题</div>
    <div class="content">文章内容...</div>
  </div>
</div>

<div class="footer">
  <div class="copyright">版权信息</div>
</div>
```

```html
<!-- ✅ 语义化做法 -->
<header>
  <a href="/" class="logo">网站 Logo</a>
  <nav aria-label="主导航">
    <ul>
      <li><a href="/" aria-current="page">首页</a></li>
      <li><a href="/about">关于</a></li>
      <li><a href="/contact">联系</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>文章标题</h1>
    <p>文章内容...</p>
  </article>
</main>

<footer>
  <p>&copy; 2024 版权所有</p>
</footer>
```

### 语义化元素的好处

1. **可访问性提升**：屏幕阅读器可以识别地标（Landmarks）
2. **SEO 改善**：搜索引擎更好地理解页面结构
3. **代码可读性**：开发者更容易理解代码意图
4. **维护性增强**：语义明确，减少注释需求

### 现代语义元素的使用场景

```html
<article>
  <!-- 独立的内容单元：博客文章、新闻、评论等 -->
  <header>
    <h1>文章标题</h1>
    <p>
      <time datetime="2024-01-15">2024 年 1 月 15 日</time>
      <address>作者: <a href="mailto:author@example.com">张三</a></address>
    </p>
  </header>

  <section aria-labelledby="intro-heading">
    <!-- 主题性内容分组 -->
    <h2 id="intro-heading">引言</h2>
    <p>文章内容...</p>
  </section>

  <section aria-labelledby="main-heading">
    <h2 id="main-heading">正文</h2>
    <p>详细内容...</p>

    <aside aria-label="相关阅读">
      <!-- 与主内容相关但可独立的内容 -->
      <h3>推荐阅读</h3>
      <ul>
        <li><a href="/related-article">相关文章</a></li>
      </ul>
    </aside>
  </section>

  <footer>
    <!-- 文章的页脚：作者信息、标签、分享按钮等 -->
    <p>标签: <a href="/tag/html">HTML</a>, <a href="/tag/a11y">可访问性</a></p>
  </footer>
</article>
```

### 语义元素速查表

| 元素        | 用途                               | 示例场景                     |
| ----------- | ---------------------------------- | ---------------------------- |
| `<header>`  | 页面或区块的头部                   | 网站头部、文章头部           |
| `<nav>`     | 导航链接区域                       | 主导航、侧边栏导航、面包屑   |
| `<main>`    | 页面主要内容（每页只能有一个）     | 文章内容、产品列表           |
| `<article>` | 独立的内容单元                     | 博客文章、新闻、用户评论     |
| `<section>` | 主题性内容分组                     | 文章的章节、产品功能模块     |
| `<aside>`   | 与主内容相关但可独立的内容         | 侧边栏、相关推荐、广告       |
| `<footer>`  | 页面或区块的页脚                   | 版权信息、联系方式、页脚链接 |
| `<figure>`  | 独立的内容单元（图片、图表、代码） | 配图、数据图表               |

## 6. 表单完整指南：可访问性与验证

### 6.1 表单标签关联

#### 常见错误

```html
<!-- ❌ 错误1：缺失标签关联 -->
<p>用户名</p>
<input type="text" placeholder="请输入用户名" />

<!-- ❌ 错误2：错误的标签使用 -->
<p>选择性别：</p>
<input type="radio" name="gender" value="male" />男
<input type="radio" name="gender" value="female" />女

<!-- ❌ 错误3：只用placeholder -->
<input type="email" placeholder="电子邮箱" />
```

#### 可访问性影响

1. **屏幕阅读器用户**：

   - 无法知晓输入框的用途
   - 无法通过标签文本聚焦表单控件

2. **运动障碍用户**：

   - 小尺寸的单选框/复选框难以精确点击
   - 有了 label 关联，点击文字也能选中

3. **所有用户**：
   - placeholder 在输入时消失，记不住要填什么
   - label 始终可见，体验更好

#### 正确实践

```html
<form>
  <!-- ✅ 方法1：使用 for 和 id 关联 -->
  <div class="form-group">
    <label for="username">用户名</label>
    <input type="text" id="username" name="username" required />
  </div>

  <!-- ✅ 方法2：label 包裹 input -->
  <div class="form-group">
    <label>
      电子邮箱
      <input type="email" name="email" required />
    </label>
  </div>

  <!-- ✅ 单选框/复选框的正确做法 -->
  <fieldset>
    <legend>选择性别</legend>
    <label>
      <input type="radio" name="gender" value="male" required />
      男性
    </label>
    <label>
      <input type="radio" name="gender" value="female" />
      女性
    </label>
  </fieldset>

  <!-- ✅ 复选框组 -->
  <fieldset>
    <legend>兴趣爱好</legend>
    <label>
      <input type="checkbox" name="hobbies" value="reading" />
      阅读
    </label>
    <label>
      <input type="checkbox" name="hobbies" value="sports" />
      运动
    </label>
    <label>
      <input type="checkbox" name="hobbies" value="music" />
      音乐
    </label>
  </fieldset>
</form>
```

### 6.2 表单验证与错误处理

#### 完整的表单验证实现

```html
<form novalidate>
  <div class="form-group">
    <label for="username">用户名 <span class="required">*</span></label>
    <input
      type="text"
      id="username"
      name="username"
      required
      minlength="3"
      maxlength="20"
      pattern="[a-zA-Z0-9_]+"
      aria-describedby="username-help username-error"
      aria-invalid="false"
    />
    <div id="username-help" class="help-text">
      3-20 个字符，只能包含字母、数字和下划线
    </div>
    <div id="username-error" class="error-message" aria-live="polite"></div>
  </div>

  <div class="form-group">
    <label for="email">邮箱地址 <span class="required">*</span></label>
    <input
      type="email"
      id="email"
      name="email"
      required
      aria-describedby="email-error"
      aria-invalid="false"
    />
    <div id="email-error" class="error-message" aria-live="polite"></div>
  </div>

  <div class="form-group">
    <label for="password">密码 <span class="required">*</span></label>
    <input
      type="password"
      id="password"
      name="password"
      required
      minlength="8"
      aria-describedby="password-help password-error"
    />
    <div id="password-help" class="help-text">至少 8 个字符</div>
    <div id="password-error" class="error-message" aria-live="polite"></div>
  </div>

  <button type="submit">注册</button>
</form>
```

#### 实时验证的 JavaScript 示例

```javascript
const usernameInput = document.getElementById('username');
const usernameError = document.getElementById('username-error');

usernameInput.addEventListener('blur', function () {
  validateUsername(this);
});

usernameInput.addEventListener('input', function () {
  // 如果之前有错误，实时清除
  if (usernameError.textContent) {
    validateUsername(this);
  }
});

function validateUsername(input) {
  const errorElement = document.getElementById('username-error');

  if (input.validity.valid) {
    errorElement.textContent = '';
    input.setAttribute('aria-invalid', 'false');
    input.classList.remove('error');
    return true;
  }

  // 显示具体的错误信息
  let errorMessage = '';

  if (input.validity.valueMissing) {
    errorMessage = '用户名不能为空';
  } else if (input.validity.tooShort) {
    errorMessage = `用户名至少需要 ${input.minLength} 个字符`;
  } else if (input.validity.tooLong) {
    errorMessage = `用户名不能超过 ${input.maxLength} 个字符`;
  } else if (input.validity.patternMismatch) {
    errorMessage = '用户名只能包含字母、数字和下划线';
  }

  errorElement.textContent = errorMessage;
  input.setAttribute('aria-invalid', 'true');
  input.classList.add('error');
  return false;
}

// 表单提交验证
document.querySelector('form').addEventListener('submit', function (e) {
  e.preventDefault();

  const inputs = this.querySelectorAll('input[required]');
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.validity.valid) {
      // 触发各字段的验证显示
      const event = new Event('blur');
      input.dispatchEvent(event);
      isValid = false;
    }
  });

  if (isValid) {
    // 提交表单
    console.log('表单验证通过，可以提交');
    // this.submit();
  } else {
    // 聚焦到第一个错误字段
    const firstError = this.querySelector('[aria-invalid="true"]');
    if (firstError) {
      firstError.focus();
    }
  }
});
```

### 6.3 关键的 ARIA 属性

| 属性               | 用途                          | 示例                                        |
| ------------------ | ----------------------------- | ------------------------------------------- |
| `aria-describedby` | 关联帮助文本或错误信息        | `aria-describedby="email-help email-error"` |
| `aria-invalid`     | 指示字段是否有错误            | `aria-invalid="true"`                       |
| `aria-required`    | 指示必填字段（补充 required） | `aria-required="true"`                      |
| `aria-live`        | 动态内容更新提示              | `aria-live="polite"`（错误信息容器）        |

### 6.4 表单最佳实践总结

✅ **必须做的：**

1. 每个输入框都有关联的 label
2. 使用 fieldset 和 legend 包裹单选框/复选框组
3. 提供清晰的错误提示
4. 使用原生 HTML5 验证属性（required、pattern、minlength 等）
5. 错误信息要具体，不要只说"格式错误"

❌ **不要做的：**

1. 只用 placeholder 代替 label
2. 错误信息只用颜色标识（红色边框），必须有文字说明
3. 验证失败后不聚焦到错误字段
4. 使用模糊的错误提示（如"输入无效"）

## 7. 图片可访问性的完整指南

### 7.1 不只是 alt 属性

```html
<!-- ❌ 不完整的实现 -->
<img src="chart.jpg" alt="销售图表" />

<!-- ✅ 完整的可访问实现 -->
<figure>
  <img
    src="chart.jpg"
    alt="2023年季度销售数据柱状图，显示Q1销售额120万，Q2销售额150万，Q3销售额180万，Q4销售额200万，呈持续增长趋势"
    loading="lazy"
    width="800"
    height="600"
  />
  <figcaption>
    图 1: 2023 年度销售数据趋势图，显示持续增长态势，Q4 达到全年最高值 200 万
  </figcaption>
</figure>
```

### 7.2 alt 文本编写原则

| 图片类型       | alt 属性处理             | 示例                                       |
| -------------- | ------------------------ | ------------------------------------------ |
| **信息性图片** | 描述图片的核心内容和含义 | `alt="团队协作办公场景"`                   |
| **功能型图片** | 说明图片的操作目的       | `alt="搜索"` （搜索按钮图标）              |
| **装饰性图片** | 使用空 alt 属性          | `alt=""`                                   |
| **复杂图片**   | 提供简短 alt + 详细描述  | alt 简述 + longdesc 或 figcaption 详细说明 |
| **文字图片**   | alt 包含图片中的所有文字 | `alt="限时优惠：全场五折"`                 |

#### 常见错误示例

```html
<!-- ❌ 错误1：无意义的描述 -->
<img src="photo.jpg" alt="图片" />
<img src="icon.png" alt="image" />

<!-- ❌ 错误2：装饰图片没有空alt -->
<img src="decorative-line.png" />
<!-- 应该是 alt="" -->

<!-- ❌ 错误3：重复的信息 -->
<a href="/download">
  <img src="download-icon.png" alt="下载" />
  下载
</a>
<!-- 屏幕阅读器会读"下载 下载" -->

<!-- ❌ 错误4：过度描述 -->
<img src="portrait.jpg" alt="一张穿着蓝色衬衫戴着眼镜的男人的照片" />
<!-- 不需要说"一张...的照片" -->
```

#### 正确示例

```html
<!-- ✅ 信息性图片 -->
<img
  src="team-photo.jpg"
  alt="5名团队成员在现代化办公室中讨论项目，墙上有白板展示设计草图"
/>

<!-- ✅ 功能型图片 -->
<button type="button">
  <img src="search-icon.svg" alt="搜索" />
</button>

<a href="/cart">
  <img src="cart-icon.svg" alt="购物车 (3件商品)" />
</a>

<!-- ✅ 装饰性图片 -->
<div class="section-divider">
  <img src="decorative-pattern.svg" alt="" role="presentation" />
</div>

<!-- ✅ 避免重复 -->
<a href="/download">
  <img src="download-icon.png" alt="" />
  下载用户手册
</a>
<!-- 或者 -->
<a href="/download" aria-label="下载用户手册">
  <img src="download-icon.png" alt="" />
</a>

<!-- ✅ 简洁准确 -->
<img src="ceo-portrait.jpg" alt="公司CEO张三" />
```

### 7.3 响应式图片的最佳实践

```html
<!-- 使用 srcset 提供不同分辨率 -->
<img
  src="hero-800w.jpg"
  srcset="hero-400w.jpg 400w, hero-800w.jpg 800w, hero-1200w.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="团队协作办公场景，展示多元文化团队成员在现代化办公室中讨论项目"
  loading="lazy"
/>

<!-- 使用 picture 提供不同格式/裁剪 -->
<picture>
  <!-- 现代浏览器使用 WebP -->
  <source type="image/webp" srcset="hero.webp" />
  <!-- 移动端使用竖版裁剪 -->
  <source media="(max-width: 768px)" srcset="hero-mobile.jpg" />
  <!-- 桌面端使用横版 -->
  <source media="(min-width: 1200px)" srcset="hero-desktop.jpg" />
  <!-- 降级方案 -->
  <img
    src="hero.jpg"
    alt="团队协作办公场景，展示多元文化团队成员在现代化办公室中讨论项目"
    loading="eager"
  />
</picture>
```

### 7.4 性能优化属性

```html
<!-- loading: 懒加载 -->
<img src="below-fold.jpg" alt="描述" loading="lazy" />
<img src="hero.jpg" alt="描述" loading="eager" />
<!-- 首屏关键图片用eager -->

<!-- decoding: 解码优先级 -->
<img src="important.jpg" alt="描述" decoding="sync" />
<!-- 关键图片 -->
<img src="content.jpg" alt="描述" decoding="async" />
<!-- 一般图片 -->

<!-- width 和 height: 防止布局偏移 (CLS) -->
<img src="photo.jpg" alt="描述" width="800" height="600" loading="lazy" />
```

## 8. 表格可访问性：数据展示的规范

### 8.1 常见错误

```html
<!-- ❌ 错误：缺少语义结构 -->
<table>
  <tr>
    <td>姓名</td>
    <td>部门</td>
    <td>年龄</td>
  </tr>
  <tr>
    <td>张三</td>
    <td>技术部</td>
    <td>25</td>
  </tr>
  <tr>
    <td>李四</td>
    <td>产品部</td>
    <td>28</td>
  </tr>
</table>

<!-- ❌ 错误：用表格做布局 -->
<table>
  <tr>
    <td>侧边栏</td>
    <td>主要内容</td>
  </tr>
</table>
```

### 8.2 正确的表格结构

```html
<table>
  <caption>
    2024 年员工信息表
  </caption>
  <thead>
    <tr>
      <th scope="col">姓名</th>
      <th scope="col">部门</th>
      <th scope="col">年龄</th>
      <th scope="col">入职日期</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">张三</th>
      <td>技术部</td>
      <td>25</td>
      <td>2020-03-15</td>
    </tr>
    <tr>
      <th scope="row">李四</th>
      <td>产品部</td>
      <td>28</td>
      <td>2019-07-01</td>
    </tr>
    <tr>
      <th scope="row">王五</th>
      <td>设计部</td>
      <td>26</td>
      <td>2021-01-10</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">总计</th>
      <td colspan="2">3 名员工</td>
      <td>-</td>
    </tr>
  </tfoot>
</table>
```

### 8.3 关键元素说明

| 元素        | 用途                     | 必需性   |
| ----------- | ------------------------ | -------- |
| `<caption>` | 表格标题，描述表格内容   | 强烈推荐 |
| `<thead>`   | 表头区域                 | 推荐     |
| `<tbody>`   | 表体区域                 | 推荐     |
| `<tfoot>`   | 表尾区域（汇总信息）     | 可选     |
| `<th>`      | 表头单元格               | 必需     |
| `scope`     | 指定表头单元格的作用范围 | 必需     |

### 8.4 scope 属性详解

```html
<!-- scope="col": 列标题 -->
<th scope="col">姓名</th>

<!-- scope="row": 行标题 -->
<th scope="row">张三</th>

<!-- scope="colgroup": 列组标题 -->
<th scope="colgroup">2023 年</th>

<!-- scope="rowgroup": 行组标题 -->
<th scope="rowgroup">技术部</th>
```

### 8.5 复杂表格

对于复杂的表格（如多级表头），使用 `headers` 属性：

```html
<table>
  <caption>
    季度销售数据
  </caption>
  <thead>
    <tr>
      <th id="name" rowspan="2">姓名</th>
      <th id="q1" colspan="2">第一季度</th>
      <th id="q2" colspan="2">第二季度</th>
    </tr>
    <tr>
      <th id="q1-jan" headers="q1">1 月</th>
      <th id="q1-feb" headers="q1">2 月</th>
      <th id="q2-apr" headers="q2">4 月</th>
      <th id="q2-may" headers="q2">5 月</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th id="zhang" headers="name">张三</th>
      <td headers="zhang q1 q1-jan">100 万</td>
      <td headers="zhang q1 q1-feb">110 万</td>
      <td headers="zhang q2 q2-apr">120 万</td>
      <td headers="zhang q2 q2-may">130 万</td>
    </tr>
  </tbody>
</table>
```

### 8.6 响应式表格方案

```html
<!-- 方案1：横向滚动 -->
<div class="table-wrapper" role="region" aria-label="员工信息表" tabindex="0">
  <table>
    <!-- 表格内容 -->
  </table>
</div>

<style>
  .table-wrapper {
    overflow-x: auto;
    max-width: 100%;
  }
</style>
```

```html
<!-- 方案2：移动端卡片式布局 -->
<table class="responsive-table">
  <thead>
    <tr>
      <th>姓名</th>
      <th>部门</th>
      <th>年龄</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="姓名">张三</td>
      <td data-label="部门">技术部</td>
      <td data-label="年龄">25</td>
    </tr>
  </tbody>
</table>

<style>
  @media (max-width: 768px) {
    .responsive-table thead {
      display: none;
    }

    .responsive-table tr {
      display: block;
      margin-bottom: 1rem;
      border: 1px solid #ddd;
    }

    .responsive-table td {
      display: block;
      text-align: right;
      padding: 0.5rem;
    }

    .responsive-table td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
    }
  }
</style>
```

## 9. 列表结构的正确使用

### 9.1 导航菜单的最佳实践

```html
<!-- ❌ 错误的导航结构 -->
<div class="nav">
  <a href="/home">首页</a>
  <a href="/about">关于</a>
  <a href="/products">产品</a>
  <a href="/contact">联系</a>
</div>

<!-- ✅ 正确的导航结构 -->
<nav aria-label="主导航">
  <ul>
    <li><a href="/home" aria-current="page">首页</a></li>
    <li><a href="/about">关于</a></li>
    <li>
      <a href="/products">产品</a>
      <!-- 二级菜单 -->
      <ul>
        <li><a href="/products/web">网站开发</a></li>
        <li><a href="/products/app">移动应用</a></li>
        <li><a href="/products/design">UI 设计</a></li>
      </ul>
    </li>
    <li><a href="/contact">联系我们</a></li>
  </ul>
</nav>
```

### 9.2 为什么导航要用列表

1. **语义清晰**：明确表示这是一组相关的链接
2. **屏幕阅读器友好**：会播报"列表，4 项"
3. **键盘导航**：列表结构提供更好的导航体验
4. **易于样式化**：CSS 可以轻松移除列表样式

```css
/* 移除列表默认样式 */
nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  display: inline-block; /* 或 flex */
}
```

### 9.3 三种列表类型的使用场景

#### 无序列表 `<ul>`

```html
<!-- 用于顺序不重要的列表 -->
<ul>
  <li>苹果</li>
  <li>香蕉</li>
  <li>橙子</li>
</ul>
```

#### 有序列表 `<ol>`

```html
<!-- 用于顺序重要的列表 -->
<ol>
  <li>注册账号</li>
  <li>登录系统</li>
  <li>完善个人信息</li>
  <li>开始使用</li>
</ol>

<!-- 自定义起始编号 -->
<ol start="5">
  <li>第五步</li>
  <li>第六步</li>
</ol>

<!-- 反向编号 -->
<ol reversed>
  <li>第三名</li>
  <li>第二名</li>
  <li>第一名</li>
</ol>
```

#### 描述列表 `<dl>`

```html
<!-- 用于术语定义、键值对 -->
<dl>
  <dt>HTML</dt>
  <dd>超文本标记语言，用于构建网页结构</dd>

  <dt>CSS</dt>
  <dd>层叠样式表，用于定义网页表现</dd>

  <dt>JavaScript</dt>
  <dd>编程语言，用于实现网页交互功能</dd>
</dl>

<!-- 一个术语多个定义 -->
<dl>
  <dt>咖啡</dt>
  <dd>一种由烘焙咖啡豆制成的饮料</dd>
  <dd>深棕色</dd>
  <dd>含咖啡因，具有提神作用</dd>
</dl>

<!-- 多个术语共享一个定义 -->
<dl>
  <dt>HTML</dt>
  <dt>CSS</dt>
  <dt>JavaScript</dt>
  <dd>前端开发的三大核心技术</dd>
</dl>
```

### 9.4 常见错误

```html
<!-- ❌ 错误1：列表直接包含文本 -->
<ul>
  <li>项目 1</li>
  这是错误的文本
  <li>项目 2</li>
</ul>

<!-- ❌ 错误2：用 div 代替 li -->
<ul>
  <div>项目 1</div>
  <div>项目 2</div>
</ul>

<!-- ❌ 错误3：嵌套错误 -->
<ul>
  <li>项目 1</li>
  <ul>
    <!-- 缺少父 li -->
    <li>子项目</li>
  </ul>
</ul>

<!-- ✅ 正确的嵌套 -->
<ul>
  <li>
    项目 1
    <ul>
      <li>子项目 1.1</li>
      <li>子项目 1.2</li>
    </ul>
  </li>
  <li>项目 2</li>
</ul>
```

## 10. ARIA 使用指南：不要过度设计

### 10.1 第一原则：不要使用 ARIA

**如果可以用原生 HTML 元素实现，永远不要用 ARIA。**

```html
<!-- ❌ 错误：过度使用 ARIA -->
<div role="button" tabindex="0" aria-label="点击我" onclick="handleClick()">
  点击
</div>

<!-- ✅ 正确：使用原生按钮 -->
<button type="button" onclick="handleClick()">点击</button>
```

```html
<!-- ❌ 错误：重复原生语义 -->
<button role="button">点击</button>
<nav role="navigation">导航</nav>
<main role="main">主要内容</main>

<!-- ✅ 正确：原生元素已有隐式角色 -->
<button>点击</button>
<nav>导航</nav>
<main>主要内容</main>
```

### 10.2 何时需要 ARIA

只在以下情况使用 ARIA：

#### 1. 原生 HTML 无法表达的语义

```html
<!-- 标签页组件需要 ARIA -->
<div class="tabs">
  <div role="tablist" aria-label="文章章节">
    <button
      role="tab"
      aria-selected="true"
      aria-controls="panel-1"
      id="tab-1"
      tabindex="0"
    >
      简介
    </button>
    <button
      role="tab"
      aria-selected="false"
      aria-controls="panel-2"
      id="tab-2"
      tabindex="-1"
    >
      详情
    </button>
  </div>

  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1" tabindex="0">
    简介内容...
  </div>

  <div role="tabpanel" id="panel-2" aria-labelledby="tab-2" tabindex="0" hidden>
    详情内容...
  </div>
</div>
```

#### 2. 动态内容更新提示

```html
<!-- 实时搜索结果提示 -->
<div class="search-results" aria-live="polite" aria-atomic="true">
  找到 5 条结果
</div>

<!-- 表单验证错误 -->
<div id="error-message" aria-live="assertive" role="alert">
  用户名已存在，请换一个
</div>

<!-- 加载状态 -->
<div role="status" aria-live="polite">正在加载...</div>
```

#### 3. 补充说明现有元素

```html
<!-- 关闭按钮（× 符号不够清晰） -->
<button type="button" aria-label="关闭对话框" onclick="closeDialog()">×</button>

<!-- 多个导航需要区分 -->
<nav aria-label="主导航">
  <ul>
    <li><a href="/">首页</a></li>
  </ul>
</nav>

<nav aria-label="页脚导航">
  <ul>
    <li><a href="/privacy">隐私政策</a></li>
  </ul>
</nav>

<!-- 当前页面标识 -->
<nav>
  <ul>
    <li><a href="/" aria-current="page">首页</a></li>
    <li><a href="/about">关于</a></li>
  </ul>
</nav>
```

#### 4. 隐藏装饰性内容

```html
<!-- 对屏幕阅读器隐藏装饰性图标 -->
<button type="button">
  <svg aria-hidden="true" class="icon">
    <use xlink:href="#icon-search"></use>
  </svg>
  搜索
</button>

<!-- 或者给图标添加说明 -->
<button type="button" aria-label="搜索">
  <svg aria-hidden="true" class="icon">
    <use xlink:href="#icon-search"></use>
  </svg>
</button>
```

### 10.3 常见的 ARIA 滥用

❌ **不要这样做：**

```html
<!-- 1. 给所有 div 添加 role -->
<div role="region">
  <div role="article">
    <div role="heading">标题</div>
  </div>
</div>
<!-- 应该用 <section>, <article>, <h1> -->

<!-- 2. 用 ARIA 修复错误的 HTML 结构 -->
<div role="button" tabindex="0">按钮</div>
<!-- 直接用 <button> -->

<!-- 3. 过度使用 aria-label -->
<a href="/about" aria-label="关于我们">关于我们</a>
<!-- 链接文本已经足够清晰，不需要 aria-label -->

<!-- 4. 错误的 aria-live 使用 -->
<div aria-live="assertive">这是静态内容</div>
<!-- aria-live 只用于动态更新的内容 -->
```

### 10.4 常用 ARIA 属性速查

#### 标签和描述

| 属性               | 用途                     | 示例                                   |
| ------------------ | ------------------------ | -------------------------------------- |
| `aria-label`       | 提供无可见文本的标签     | `<button aria-label="关闭">×</button>` |
| `aria-labelledby`  | 引用其他元素作为标签     | `<div aria-labelledby="title-id">`     |
| `aria-describedby` | 引用其他元素作为详细描述 | `<input aria-describedby="help-text">` |

#### 状态

| 属性            | 用途             | 值                              |
| --------------- | ---------------- | ------------------------------- |
| `aria-expanded` | 折叠/展开状态    | `true` / `false`                |
| `aria-selected` | 选中状态         | `true` / `false`                |
| `aria-checked`  | 复选状态         | `true` / `false` / `mixed`      |
| `aria-disabled` | 禁用状态         | `true` / `false`                |
| `aria-hidden`   | 对屏幕阅读器隐藏 | `true` / `false`                |
| `aria-invalid`  | 验证错误状态     | `true` / `false`                |
| `aria-current`  | 当前项           | `page` / `step` / `location` 等 |

#### 动态内容

| 属性            | 用途                                   | 值                             |
| --------------- | -------------------------------------- | ------------------------------ |
| `aria-live`     | 内容更新播报                           | `off` / `polite` / `assertive` |
| `aria-atomic`   | 播报整个区域还是变化部分               | `true` / `false`               |
| `role="alert"`  | 重要提示（隐含 aria-live="assertive"） | -                              |
| `role="status"` | 状态更新（隐含 aria-live="polite"）    | -                              |

### 10.5 ARIA 使用检查清单

✅ **使用前问自己：**

1. 有没有原生 HTML 元素可以实现？
2. 这个 ARIA 属性是否真的必要？
3. 我是否正确理解了这个属性的语义？
4. 是否测试了屏幕阅读器的实际效果？

❌ **避免的陷阱：**

1. 不要用 ARIA 替代语义化 HTML
2. 不要给已有隐式角色的元素重复添加 role
3. 不要在静态内容上使用 `aria-live`
4. 不要忘记管理焦点和键盘交互

## 核心要点速查表

### 必须遵守的 10 条规则（解决 80%的问题）

| 序号 | 规则                                                 | 影响                         |
| ---- | ---------------------------------------------------- | ---------------------------- |
| 1    | 页面必须声明 DOCTYPE, lang, charset, viewport        | 避免渲染异常、乱码、SEO 受损 |
| 2    | 每个页面只有一个 h1，标题不能跳级                    | 可访问性、SEO                |
| 3    | 导航用 `<a>`，操作用 `<button>`                      | 语义正确、键盘导航           |
| 4    | 内联元素不能包含块级元素                             | 避免 DOM 结构异常            |
| 5    | 交互元素不能嵌套（如 `<a>` 里不能放 `<button>`）     | 避免行为冲突                 |
| 6    | 每个表单控件都要关联 label                           | 可访问性、可用性             |
| 7    | 所有图片都要有 alt（装饰图用 `alt=""`）              | 可访问性、SEO                |
| 8    | 表格要有完整结构（caption, thead, tbody, th[scope]） | 可访问性、语义清晰           |
| 9    | 能用原生 HTML 就不用 ARIA                            | 避免过度设计                 |
| 10   | 使用 W3C 验证工具检查 HTML                           | 发现隐藏错误                 |

### 快速检查清单

开发完成后，检查以下项目：

- [ ] 页面有正确的 DOCTYPE 和 lang 属性
- [ ] 每个页面只有一个 h1
- [ ] 标题层级没有跳级（h1→h2→h3）
- [ ] 所有图片都有 alt 属性
- [ ] 所有表单控件都有关联的 label
- [ ] 没有空的链接或按钮
- [ ] 表格使用了 caption, thead, tbody, th[scope]
- [ ] 没有用表格做布局
- [ ] 导航使用了 `<nav>` 和 `<ul>`
- [ ] 没有过度使用 ARIA
- [ ] 通过 W3C HTML 验证器验证
- [ ] 使用屏幕阅读器测试过关键页面

### 推荐工具

1. **验证工具**：

   - [W3C HTML Validator](https://validator.w3.org/)
   - [WAVE (Web Accessibility Evaluation Tool)](https://wave.webaim.org/)

2. **浏览器扩展**：

   - axe DevTools（Chrome/Firefox）
   - Lighthouse（Chrome DevTools 内置）

3. **屏幕阅读器**：
   - NVDA（Windows，免费）
   - JAWS（Windows，商业）
   - VoiceOver（macOS/iOS，内置）

### 延伸阅读

- [MDN Web Docs - HTML](https://developer.mozilla.org/zh-CN/docs/Web/HTML)
- [WCAG 2.1 指南](https://www.w3.org/WAI/WCAG21/quickref/)
- [HTML5 规范](https://html.spec.whatwg.org/multipage/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)

---

**记住**：好的 HTML 不仅是写给浏览器的，更是写给**所有用户**的——包括使用辅助技术的用户。遵循这些规范，你的网站将更健壮、更易用、更易维护。
