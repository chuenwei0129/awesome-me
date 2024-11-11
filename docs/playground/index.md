---
nav:
  title: Playground
  order: 0
group:
  title: 介绍
  order: -9999
title: 这是什么？
---

> 记录了一些 🎨 有趣的 🌈 小玩意，或者是一些 💡 有意思的 🔌 代码，或者是一些 🔧 技术验证的 🔨 代码。

```jsx
/**
 * iframe: true
 *
 */

// [A JavaScript Quine Clock](https://x.com/aemkei/status/1795573193559994505)

import React, { useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';

// 定义全局样式
const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    color: grey;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
  }
`;

const QuineClock = () => {
  useEffect(() => {
    // quine时钟代码
    const quine = (n) =>
      setInterval((t) => {
        // 初始化当前帧的显示字符串并定义script标签
        let displayString = '\n'; // 原始代码中的`o`

        // 在原始代码中，这个变量被定义为`S`以节省空间，因为这个字符串会被使用两次
        let scriptTag = 'script>\n';

        // 字符"精灵"只是整数，我们将其解释为每个字符的3x5位图图像
        let characterSprites = [
          31599, 19812, 14479, 31207, 23524, 29411, 29679, 30866, 31727, 31719,
          1040,
        ];

        // 使用JavaScript的隐式转换将JavaScript函数`quine()`转换为字符串，这样我们就得到了99%的源代码
        // 加上函数外的几个字符来重现整个程序作为字符串
        let sourceCode = `(r=${quine})()`;

        // 由于这个版本有注释和空白，我们添加了逻辑来删除注释和空白，以便它看起来仍然不错
        sourceCode = sourceCode
          .replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '')
          .replace(/\s+/gm, '');

        // 跟踪我们当前在哪个字符
        let characterIndex = 0; // 原始代码中的`j`

        // 循环遍历程序的5行（y）和63列（x）
        for (let y = 4; y >= 0; y--) {
          for (let x = 0; x < 63; x++) {
            // 计算数组索引和字符颜色的日期值
            let arrayIndex = Math.floor(x / 8);

            // 解析JavaScript默认日期格式：
            // "Thu May 30 2024 14:05:52 GMT-0500 (Central Daylight Time)"
            // 以抓取从位置16开始的"12:12:12"部分
            let character = Date()[16 + arrayIndex]; // 原始代码中的`D`

            // 将":"映射到索引10
            character = character < 10 ? character : 10;

            // 通过索引进入数组加载字符的"精灵"
            // 请注意，这依赖于JavaScript隐式字符串到数字的转换
            let sprite = characterSprites[character];

            // 如果我们将"精灵"的位视为3x5位图图像，这将选择位置(x, y)的单个位
            // 请注意，一个"像素"实际上是两个字符宽；这就是为什么我们最初将x除以二
            let bitmask = 1 << (((x / 2) % 4) + 3 * y);

            // 字符之间也有一个像素的间隙 - 这些像素总是关闭的
            // 字符的3个像素加上一个像素的间隙解释了为什么我们取x模4而不是3
            let insideCharacter = (x / 2) % 4 < 3;
            let pixel = insideCharacter && sprite & bitmask;

            // 将单个有颜色（白色或黄色）的字符附加到输出
            // 我们将`characterIndex`作为副作用递增
            let color = pixel ? '#FF0' : '#444';
            displayString += sourceCode[characterIndex++].fontcolor(color);
          }

          // 在行末附加一个换行符
          displayString += '\n';
        }

        // 更新网页的innerHTML以显示带有script标签的displayString
        document.body.innerHTML =
          '<pre>' +
          '&lt' +
          scriptTag +
          displayString +
          '\n' +
          '&lt/' +
          scriptTag;
      }, 100);
    quine();
  }, []);

  return <GlobalStyle />;
};

export default QuineClock;
```
