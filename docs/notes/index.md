---
nav:
  title: Notes
  order: 0
group:
  title: 介绍
  order: -999
title: 这是什么？
---

这是一个前端小白的学习历程，如果只学习而不记录点什么那基本就等于白学了。

这里存放一些待整理、归纳、总结的碎片化的知识、文章等。

> 零零散散啥都记系列（不定期更新）

## CSS 学习路径

按照学习顺序整理的 CSS 知识体系：

### 基础概念

1. [CSS 单位](./css__units.md) - 理解各种 CSS 单位的使用场景
2. [盒模型指南](./css__box-model.md) - 掌握 CSS 盒模型的核心概念
3. [浏览器默认样式](./css__browser-default-styles.md) - 了解浏览器的默认样式
4. [CSS 继承机制](./css__inheritance.md) - 理解 CSS 属性的继承规则
5. [选择器与伪类](./css__pseudo-classes-and-selectors.md) - 掌握各种选择器的使用
6. [像素与设备](./css__pixel-and-device.md) - 理解 CSS 像素与物理像素

### 布局相关

7. [包含块与定位](./css__containing-block-and-position.md) - 理解定位的参考系
8. [BFC 与浮动](./css__bfc-and-float.md) - 掌握 BFC 的概念和应用
9. [Flex 布局详解](./css__flex.md) - 学习现代布局方案
10. [可替换元素](./css__replaced-element.md) - 理解特殊元素的布局规则

### CSS 方法论和架构

11. [BEM 命名规范](./css__bem-naming-guide.md) - 学习规范的命名方法
12. [CSS Modules](./css__modules.md) - 模块化 CSS 解决方案
13. [CSS-in-JS](./css__css-in-js.md) - 现代 CSS 解决方案

### 预处理器和工具

14. [预处理器 SCSS](./css__scss.md) - 学习 CSS 预处理器
15. [Tailwind V3 指南](./css__tailwind-v3-guide.md) - 原子化 CSS 框架入门
16. [Tailwind v4 升级与实践](./css__tailwind-v4-guide.md) - Tailwind 最新版本
17. [tailwind-merge 和 clsx](./css__taiwind-merge-and-clsx.md) - Tailwind 工具库
18. [CVA (Class Variance Authority)](./css__cva.md) - 组件变体管理工具

---

## 待补充的 CSS 知识点

以下是 CSS 知识体系中还需要补充的重要内容，按学习优先级排列：

### 🔥 高优先级（核心基础）

**基础概念补充：**

- [ ] CSS 变量（Custom Properties）- 现代 CSS 的动态能力
- [ ] CSS 颜色系统 - RGB、HSL、颜色空间等

**布局补充：**

- [ ] Grid 布局详解 - 二维布局系统
- [ ] 响应式设计基础 - 移动优先的设计思路
- [ ] 媒体查询（Media Queries）- 适配不同设备
- [ ] 容器查询（Container Queries）- 组件级别的响应式

### ⭐ 中优先级（进阶特性）

**视觉效果：**

- [ ] CSS Transform（变换）- 2D/3D 变换
- [ ] CSS Transition（过渡）- 平滑的状态过渡
- [ ] CSS Animation（动画）- 关键帧动画
- [ ] CSS 渐变（Gradient）- 线性和径向渐变
- [ ] CSS 阴影与滤镜 - box-shadow, filter 等

**高级布局：**

- [ ] Grid 高级应用 - grid-template-areas, subgrid
- [ ] 多列布局（Multi-column）- 报纸式排版
- [ ] CSS Shapes - 不规则形状布局
- [ ] CSS Clipping 和 Masking - 裁剪和遮罩

### 💡 低优先级（现代特性和优化）

**现代 CSS：**

- [ ] CSS 逻辑属性 - 支持国际化的布局
- [ ] CSS 新选择器 - :has(), :is(), :where() 等
- [ ] CSS @layer - 层叠层管理
- [ ] CSS Scroll Snap - 滚动吸附效果
- [ ] CSS 计数器 - counter 和自动编号

**性能与最佳实践：**

- [ ] CSS 性能优化 - 减少重排重绘
- [ ] 关键渲染路径 - CSS 加载优化
- [ ] CSS 架构模式 - OOCSS, SMACSS, ITCSS
- [ ] CSS 调试技巧 - DevTools 使用

**前沿技术：**

- [ ] CSS Houdini - CSS 的扩展 API
- [ ] CSS @scope - 作用域样式
- [ ] CSS Nesting - 原生嵌套语法
- [ ] View Transitions API - 页面过渡动画

### 📚 实战专题

- [ ] CSS 常见布局模式 - 圣杯布局、双飞翼布局等
- [ ] CSS 绘图技巧 - 纯 CSS 绘制图形
- [ ] CSS 主题切换 - 深色模式实现
- [ ] CSS 打印样式 - @media print
- [ ] CSS 无障碍设计 - a11y 最佳实践

<!-- 笔记记了不看，或者记了以后**不和其他笔记产生关联**，或者**不进行二次三次修改优化**是无法对大脑神经连接的结构产生影响的。

**笔记的形式根本不重要**，最重要的是笔记能否影响大脑的思考。就像一本书再怎么精装、精致，如果读者不反复阅读，也没什么区别。

❤️ 没有经过整理的知识才是徒然浪费时间，伤透脑筋！

对于所有的问题，我都希望得到一个很漂亮的回答，**一个让人一眼看过去就茅塞顿开的回答**。

实际上这是很难的。就好比人们总是希望一句话就说清楚生活的意义是什么。实际上也是很难的。

**怀揣着这种不确定感继续学习，不要有知识包袱，不要假装自己很聪明**。这个世界本身就是抽象又复杂的。这没什么大不了。

下面的文章就是从 2018 开始积累的文章，都是参考众多文章归纳整理学习而写的。文章包括了 HTML 基础、CSS 基础、JavaScript 基础与拓展、Browser 浏览器相关、Vue 使用与分析、React 使用与分析、Linux 命令、LeetCode 题解等类别，内容都是比较基础的，毕竟我也还是个小白。此外基本上每个示例都是本着能够即时运行为目标的，新建一个 HTML 文件复制之后即可在浏览器运行或者直接可以在 console 中运行。 -->
