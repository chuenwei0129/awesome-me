---
nav:
  second:
    title: 可视化
    order: -1
order: -999
title: 这是什么？
group:
  title: 介绍
  order: -999
---

在 Web 上，图形通常是通过浏览器绘制的。现代浏览器是一个复杂的系统，其中负责绘制图形的部分是渲染引擎。

**渲染引擎绘制图形的方式，大体上有 4 种：**

1. HTML+CSS 的优点是方便，不需要第三方依赖，甚至不需要 JavaScript 代码。如果我们要绘制少量常见的图表，可以直接采用 HTML 和 CSS。它的缺点是 CSS 属性不能直观体现数据，绘制起来也相对麻烦，图形复杂会导致 HTML 元素多，而消耗性能。

2. SVG 是对 HTML/CSS 的增强，弥补了 HTML 绘制不规则图形的能力。它通过属性设置图形，可以直观地体现数据，使用起来非常方便。但是 SVG 也有和 HTML/CSS 同样的问题，图形复杂时需要的 SVG 元素太多，也非常消耗性能。

3. Canvas2D 是浏览器提供的简便快捷的指令式图形系统，它通过一些简单的指令就能快速绘制出复杂的图形。由于它直接操作绘图上下文，因此没有 HTML/CSS 和 SVG 绘图因为元素多导致消耗性能的问题，性能要比前两者快得多。但是如果要绘制的图形太多，或者处理大量的像素计算时，Canvas2D 依然会遇到性能瓶颈。

4. WebGL 是浏览器提供的功能强大的绘图系统，它使用比较复杂，但是功能强大，能够充分利用 GPU 并行计算的能力，来快速、精准地操作图像的像素，在同一时间完成数十万或数百万次计算。另外，它还内置了对 3D 物体的投影、深度检测等处理，这让它更适合绘制 3D 场景。

**图形系统与浏览器渲染引擎工作对比：**

![20240626020129](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240626020129.png)

**如何选择可视化方案：**

![20240626023550](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240626023550.png)