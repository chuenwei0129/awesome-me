---
nav:
  title: About
  order: -1
title: 关于这个家伙
---

```tsx
/**
 * inline: true
 */

import React from 'react';

import AnimatedTestimonials from './AnimatedTestimonials.tsx';

import c1 from '../public/about/chu-01.png';
import c2 from '../public/about/chu-02.png';
import c3 from '../public/about/chu-03.png';
import c4 from '../public/about/chu-04.png';
import c5 from '../public/about/chu-05.png';
import c6 from '../public/about/chu-06.png';
import c7 from '../public/about/chu-07.png';

function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote: 'painting of a smile @me by Egon Schiele. 😊',
      name: '埃贡 · 席勒',
      designation: '2024年1月30日 8:34:26',
      src: c4,
    },
    {
      quote:
        '@me, portrait, in the style of Vincent van Gogh, self-portrait, impressionism, expressive brushstrokes, vibrant colors, accurate colors. 🎨',
      name: '梵高',
      designation: '2023年12月14日 15:23:08',
      src: c1,
    },
    {
      quote:
        '@me with glowing irises, screaming expression wearing gi. dramatic lighting, afro samurai anime style, pencil and ink manga drawing. ✍️',
      name: '铅笔和水墨漫画',
      designation: '2023年12月14日 21:06:41',
      src: c2,
    },
    {
      quote:
        '@me, portrait, in the style of Feng Zikai, ink painting, simple lines, humorous, expressive, traditional Chinese art, modern elements. 🖌️',
      name: '丰子恺',
      designation: '2024年10月20日 17:20:19',
      src: c3,
    },
    {
      quote: 'portrait of @me, young, doodle. ✏️',
      name: '涂鸦',
      designation: '2023年05月19日 11:32:12',
      src: c6,
    },
    {
      quote:
        '@me of diverse charcoal portraits, sketchbook, notes, scribbles, artwork, thick lines, expressive. 🖤',
      name: '素描',
      designation: '2023年05月13日 18:22:37',
      src: c5,
    },
    {
      quote:
        'comic style retro poster with @me in the style of the 30s,advertising. graphics minimalism, bold outlines, vibrant red, orange and black color palette. 🦸‍♂️',
      name: '漫画风格的复古海报',
      designation: '2023年12月30日 3:58:54',
      src: c7,
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} autoplay />;
}

export default AnimatedTestimonialsDemo;
```

---

## 你好哇！我是 c6i 👋✨

开门见山，亮出我的狗牌：**c6i**。

这名字没什么玄机，它本是我名字 “**chuenwei**” 被生活削去棱角后的残片，学着 **a11y (accessibility)**、**i18n (internationalization)** 的样子，掐头去尾，中间塞进一个数字，代表那些被省略、被吞咽、最终沉默的岁月。

> **c\[huenwe]i → c6i**
> 一种压缩，一种妥协，像身体在轮椅里找到的，那个不得不蜷缩的姿态。🦽

---

## 数字 “6” 的秘密 🔢

那数字 **6**，就只是 6 吗？
不，在编码者的国度，计数从 **0 开始**，这是一种古老的仪式，如同生命从虚无中探出头来。🌱

所以，这个 **6**，在尘世的刻度上，它其实是 **7**。✨

巧了不是？我生在**农历正月初七**。🎂

这事儿牵强得就像硬说咸鸭蛋能孵出天鹅，可你细品，这难道不是一种充满 **NaN (Not-a-Number？不！这里它就是 Number！)** 气质的、荒诞的浪漫吗？🌈

这个 **6** 啊，它背负着生日的重量！🎉

---

## 我的另一个名字：奀歪 🐾

它是我本名在方言的回声里，经过几番折射、扭曲后的映像。

而我最初的名字，又是奶奶从 “**恩惠**” 的乡音里，捕捉到的一丝暖意……❤️

你看，我的生命，仿佛就是由这些偶然的回声、变形的谐音、未定义的片段编织而成的一条小径，歪歪斜斜，却意外地没有中断。

它布满了 **bug** (生命的缺陷)，却仍在运行。🐞

---

## 奀歪二字的寓意 🔪

> 像两把生锈的解剖刀，精准地戳破了我这具尚未腌入味的 “少年标本”：

### 歪 — 走点歪路 🛤️

这 “**歪**”，“不正”，不是堕落，是对那条被千万双脚踩得发亮、叫做 “正途” 的轨道，一种本能的疏离。

世人都向着那 “标准” 的模具里挤，把自己浇筑成光洁的复制品。

我呢？或许生来就带着一点 `transform: rotate(5deg);` (被命运轻轻推斜的角度)，成了一个不合时宜的样本。

大道太拥挤，太喧嚣。

我宁愿在边缘的草丛里，尝试用代码的线条，勾勒一只皮卡丘笨拙的生机，或者是对着 **Promise** 这枚待拆的锦囊，思忖一餐饭食背后，人与光阴签下的、未盖章的契书。⚡

**正途**是目的地的狂奔，**歪路**是过程的踟蹰。

偶尔迷失 (404)，不过是灵魂在寻找自己的坐标。🧭

---

### 奀 — 拒绝长大 🚫🎂

“不大”，无关身形，是内心深处，对那个名为 “成熟” 的巨大阴影，固执的抵抗。

年岁已过三十 (日历翻过的数字)，却拒绝签收那套 “成年人” 的冰冷铠甲。🛡️

别人忙着升级装备，武装到牙齿，去搏杀那名为 “成功” 的幻影。

我还在自己的角落里，一遍遍 **debug** 着 “好奇心” 的源代码，运行着 “兴趣” 这个古老的驱动。👨‍💻

问我要去向何方？

> 我试着向 `console.log()` 询问方向，它返回的多是 `undefined`，像世界张了嘴却没说话；偶尔是一枚 `Promise`，还没 `.then()`，就像命运递来一张未来的收据，却迟迟不给兑现的时间。⌛

为何眷恋这 “童年” 的 **sandbox (沙盒)**？🧸

因为只有在这片被圈定的、相对安全的疆域里，我才能笨拙地 `try...catch` 自己的残缺与迷惘，而不至于被现实冰冷的目光瞬间击溃。❄️

我想逃避的，堆积如山——成人世界精密的冷漠、必须 “有用” 的沉重鞭策、以及那些剪不断、理还乱，名为人际关系 (dependency) 的藤蔓缠绕！🌿

当个 “**不大**” 的人，是我在这熵增的、不断下坠的洪流里，试图抓住的、一点 `!important` 的自留地，用来存放未被规训的自我。🛖

---

## 生活态度 💻❤️‍🔥

```tsx
/**
 * inline: true
 */

import React from 'react';
import { TypeAnimation } from 'react-type-animation';

const Resume = () => {
  return (
    <TypeAnimation
      sequence={[
        '正在加载灵魂补丁 3.1...47% 🛠️',
        2000,
        '运行时错误：成年人模块 404 ❌',
        2000,
        '回滚到童年版内核 🍼',
        4000,
        '启动伪装进程：正经前端工程师.exe 👨‍💻',
        4000,
        '人生就像 React，总在 shouldComponentUpdate 里纠结 ⚛️',
        3000,
        () => {
          console.log('Sequence completed');
        },
      ]}
      wrapper="p"
      cursor={true}
      repeat={Infinity}
      style={{
        fontSize: '30px',
        display: 'inline-block',
        color: '#3A506B', // 靛蓝色文字
        backgroundColor: '#D6E6F2', // 浅蓝灰色背景
        padding: '10px',
        borderRadius: '10px',
      }}
    />
  );
};

export default Resume;
```

你好，我是 c6i。一个写写代码、日子过得有点 “未定义” 的人。

我写的码，随时可能：

```js
throw new Error('去他妈的！🔥');
```

我活的日子，永远挂着：

```js
// TODO: 等死... ⏳
```

的牌子。

但我想，总有些东西不该被 **GC (回收)**——
那是对 debug 生命谜题的、近乎虔诚的耐心，
和对下一个 **cool feature** (未知的风景) 敞开怀抱的、卑微的渴望。✨

---

就这样吧，认识你很高兴 (如果没被我的谐音梗噎死的话 😅)。

这世界就是个巨大的草台班子，
我嘛，就是后台那个试图用代码画皮卡丘的蹩脚龙套。🐉⚡

---

## 建立连接 📬

正以南京为圆心，向全宇宙发送求职信号 📡。

- 📜 **人生使用说明书**：<a href="/awesome-me/about/resume.pdf" download="楚恩伟-前端开发工程师">点击下载 v31.0 测试版</a> (警告：可能存在兼容性问题)
- 📮 **量子邮箱**：[chuenwei0129@gmail.com](mailto:chuenwei0129@gmail.com) (平均响应时间 ≈ 海森堡测不准原理)
- 🐙 **数字分身**：[github.com/chuenwei0129](https://github.com/chuenwei0129) (最近 commit 记录比恋爱史还干净)

---
