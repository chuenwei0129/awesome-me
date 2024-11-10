---
nav:
  title: 工具函数
  # order: 0
title: typeChecks
group:
  title: 类型
  order: -1
---

# 测试

// 在浏览器中，V8 会为每个页面生成一个 context，如果是使用了 iframe 的页面，当父子页面交互使也是运行在不同的 context 中的。
// 即使在同一个 context 中，你的方法也可能失效，比如 @papa pa 构造出来的对象。
