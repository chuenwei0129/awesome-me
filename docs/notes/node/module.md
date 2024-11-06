---
title: 模块机制
order: 10
toc: content
group:
  title: 基础知识
---

## JavaScript 模块机制

最早的时候，JavaScript 只用来做简单的交互操作，非常简单。这个时候自然也没模块的概念，最多是一个 HTML 页面中，嵌入多个 JavaScript 标签，如：

```html
<html>
  <head>
    <script src="foo.js"></script>
    <script src="bar.js"></script>
    <script>
      alert('Hello world!');
    </script>
  </head>
</html>
```

这里面就有三“段” JavaScript 代码，依次是 `foo.js`、`bar.js` 和之后一段嵌入页面的 JavaScript 代码。硬要说其是“模块”也不是不可以，只不过它们在未经特殊处理的前提下，是会互相污染的。比如，在 `foo.js` 中写 `window.alert = function() {}` 是会实实在在影响到后面的。

所谓模块就是为了解决这些问题的：

1. **模块必须是密闭空间**，所有与外界沟通交互的事项都必须有明确意图；
2. **模块是为了将大型应用程序切割成独立维护的小块事物**，可以更易被使用和维护。

