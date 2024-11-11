---
group:
  title: 2022 🐯
  order: -2022
title: requestAnimationFrame
toc: content
---

# requestAnimationFrame 🎬

首先，先来个大前提：由于 JavaScript 脚本一股脑执行完毕后，浏览器才会开始渲染。所以呢，有时候我们会遇到一些预期不到的小惊喜（也就是 bug）。

## 示范时间：页面隐藏时并不会闪烁 🕵️‍♂️

来看个小示范，当页面隐藏时，这段代码不会让页面闪烁：

```javascript
document.body.appendChild(el);
el.style.display = 'none';
```

厉害吧？其实这是因为 JavaScript 的执行机制。不用担心，你肯定不会被整晕，我们再深入一点儿。

## 表演时间：这段代码只有最后一行有戏 🎭

接下来，看看下面这段代码，实际上只有 **最后一行** 是有存在感的：

```javascript
button.addEventListener('click', () => {
  box.style.display = 'none';
  box.style.display = 'block';
  box.style.display = 'none';
  box.style.display = 'block';
  box.style.display = 'none';
  box.style.display = 'block';
  box.style.display = 'none';
  box.style.display = 'block';
});
```

说实话，剩下的几行代码就像是跑龙套的，只是来凑个热闹。

## 再来个牛逼哄哄的例子 🚀

要不，咱们再来一个实际点的例子？通过 `React` 和 `styled-components` 来看看 `requestAnimationFrame` 和 `setTimeout` 的差异。

```tsx
import React, { useRef } from 'react';
import styled from 'styled-components';

const Box1 = styled.div`
  width: 100px;
  height: 100px;
  background-color: #ccc;
`;

const Box2 = styled.div`
  width: 100px;
  height: 100px;
  background-color: #9c5f5f;
  margin-top: 20px;
`;

const AnimatedBoxes: React.FC = () => {
  const box1Ref = useRef<HTMLDivElement>(null!);
  const box2Ref = useRef<HTMLDivElement>(null!);

  const handleClick = () => {
    let j = 0;
    let requestId: number;

    function animation1() {
      if (box1Ref.current) {
        box1Ref.current.style.marginLeft = `${j}px`;
      }
      requestId = requestAnimationFrame(animation1);
      j++;
      if (j > 200) {
        cancelAnimationFrame(requestId);
      }
    }
    animation1();

    let i = 0;
    let timerId: number;

    function animation() {
      if (box2Ref.current) {
        box2Ref.current.style.marginLeft = `${i}px`;
      }
      timerId = window.setTimeout(animation, 0);
      i++;
      if (i > 200) {
        clearTimeout(timerId);
      }
    }
    animation();
  };

  return (
    <div>
      <Box1 ref={box1Ref} />
      <Box2 ref={box2Ref} />
      <button type="button" onClick={handleClick}>
        Click me
      </button>
    </div>
  );
};

export default AnimatedBoxes;

```

点击按钮之后，你会发现：`setTimeout` 的动画似乎比 `requestAnimationFrame` 动画“更加迅捷”。其实，这并不完全是因为代码跑得快，而是因为浏览器的渲染机制在搞事情。

## 深挖一下原因 🤔

> 浏览器会在渲染前执行 `requestAnimationFrame` 的回调，requestAnimationFrame 的回调第一次都是立即执行。

![20241111125657](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20241111125657.png)

所以 `requestAnimationFrame` 和 `timer` 的顺序实际是 `timer` 与渲染的顺序。

![浏览器渲染时序](https://raw.githubusercontent.com/chuenwei0129/my-picgo-repo/master/react/20240920214724.png "浏览器渲染时序")

如图所示，**浏览器会根据当前上下文判断是否需要进行渲染，尽量高效，只有必要时才进行渲染。如果没有界面改变，就不会渲染。** 就像规范说的那样，考虑到硬件刷新频率限制、页面性能以及页面是否在后台等因素，可能在执行 `setTimeout` 之后，还未到渲染时机。于是乎，`setTimeout` 回调了好多次后，才开始渲染，因此 `marginLeft` 的值与上次渲染时有较大差距（可不是因为它偏心哦）。

而 `requestAnimationFrame` 则不一样，每次渲染前都会调用回调函数。所以 `marginLeft` 与上次渲染前的差值是 1px。**稳如泰山**。

因此，看起来 `setTimeout` 速度“快”了很多，但实际上是你的眼睛在忽悠你啦！👀

## 推荐阅读

- [事件冒泡是宏任务还是微任务，以及冒泡的触发时机?](https://www.zhihu.com/question/613559688)
- [浏览器动画帧渲染与执行机制探索](https://jelly.jd.com/article/5fda117df708c8014219e056)
