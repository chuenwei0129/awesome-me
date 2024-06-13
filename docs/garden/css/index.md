---
nav:
  second:
    title: CSS
    order: 1
title: 这是什么？
order: -1
group:
  title: 介绍
  order: 0
---

# 这是什么？

> 任何编程工具都是为人服务的，他们是轮子，是工具，是为了让人提高生产效率的。一切和这个目的相矛盾的设计都是反人类的。

## css 是什么？

![20240610132036](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/me/20240610132036.png)

## [为什么 CSS 这么难学？](https://www.zhihu.com/question/66167982)

1. CSS 的属性互不正交，大量的依赖与耦合难以记忆。
2. CSS 的很多规则是贯彻整个体系的，而且都记在规范里了，是有规律的，你应该好好读文档而不是去瞎试。

## 当浏览器遇到无法解析的 CSS 代码会发生什么？

答案就是**浏览器什么也不会做**，继续解析下一个 CSS 样式！

如果一个浏览器在解析你所书写的 CSS 规则的过程中遇到了**无法理解的属性或者值**，它会忽略这些并继续解析下面的 CSS 声明。在你书写了**错误的 CSS 代码** (或者误拼写)，又或者当浏览器遇到对于它来说**很新的还没有支持的 CSS 代码**的时候上述的情况同样会发生 (直接忽略)。

相似的，当浏览器遇到**无法解析的选择器**的时候，他会直接忽略整个选择器规则，然后解析下一个 CSS 选择器。