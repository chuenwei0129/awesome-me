---
title: HTML 语义化
toc: content
---

过去，大家都还会强调语义化标签的使用，然而，如今反而却越来越少使用这些标签了。

## 1. 样式问题

语义化标签自带特定样式，且在不同浏览器中的表现差异，使得我们往往需要重置样式。与其如此，不如选用 `div` 配合具有语义的 CSS 来处理。

## 2. SEO 的考量

另一个方面是关于 SEO 的问题：

- 现代的前端框架如 **Vue** 和 **React** 并不太重视 SEO，毕竟这些框架主要针对应用开发，而非单一的入口网页。
- 当前的做法大多是在入口处使用静态页面来做好 SEO，而内部则采用单页面应用（SPA），这样才能实现复杂的功能。

## 3. 无障碍访问（a11y）

最后，语义化标签在无障碍访问方面具有重要作用：

- 语义化标签自带无障碍特性，无需再额外增加 ARIA 属性。
- 尽管无障碍访问是非常重要的，但国内网站对此关注甚少，能够提供良好无障碍体验的网站寥寥无几。

这种现象说明，很多人并不关心残疾人士如何使用这些网页（比如不需要考虑盲人使用后台管理的情况）。