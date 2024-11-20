---
nav:
  title: About
  order: -1
title: 介绍
---

## 关于头像

下面 👇 是我的一些 AI 生成的头像，是用 Stable Diffusion 训练后生成的，我很喜欢。

```tsx
/**
 * inline: true
 */
import React from 'react';

import { AnimatedTestimonials } from 'naifu';

import s1 from '../public/about/chu-01.png';
import s2 from '../public/about/chu-02.png';
import s3 from '../public/about/chu-03.png';
import s4 from '../public/about/chu-04.png';
import s5 from '../public/about/chu-05.png';
import s6 from '../public/about/chu-06.png';
import s7 from '../public/about/chu-07.png';

function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote: 'painting of a smile @me by Egon Schiele.',
      name: '埃贡 · 席勒',
      designation: '2024年1月30日 8:34:26',
      src: s4,
    },
    {
      quote: '@me, portrait, in the style of Vincent van Gogh, self-portrait, impressionism, expressive brushstrokes, vibrant colors, accurate colors.',
      name: '梵高',
      designation: '2023年12月14日 15:23:08',
      src: s1,
    },
    {
      quote: '@me with glowing irises, screaming expression wearing gi. dramatic lighting, afro samurai anime style, pencil and ink manga drawing.',
      name: '铅笔和水墨漫画',
      designation: '2023年12月14日 21:06:41',
      src: s2,
    },
    {
      quote: '@me, portrait, in the style of Feng Zikai, ink painting, simple lines, humorous, expressive, traditional Chinese art, modern elements.',
      name: '丰子恺',
      designation: '2024年10月20日 17:20:19',
      src: s3,
    },
    {
      quote: '@me portrait, neutral pen sketch style, highly detailed, clear focus, minimalistic background.',
      name: '中性笔素描',
      designation: '2023年05月19日 11:32:12',
      src: s6,
    },
    {
      quote: '@me of diverse charcoal portraits, sketchbook, notes, scribbles, artwork, thick lines, expressive.',
      name: '素描',
      designation: '2023年05月13日 18:22:37',
      src: s5,
    },
    {
      quote: '@me manga, highly detailed, digital art, centered, portrait, colored accurately, in the style of hideo yamamoto.',
      name: '山本英夫',
      designation: '2023年12月30日 3:58:54',
      src: s7,
    },

  ];

  return <AnimatedTestimonials testimonials={testimonials} autoplay />;
}

export default AnimatedTestimonialsDemo;
```

---

## 关于我

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
        '👋 您好，我是奀歪 😊',
        2000,
        '💻 前端工程师 🧑‍💻',
        2000,
        '🔍 目前在南京找工作 🏙️',
        4000,
        '😄 熟练使用 Google + GitHub + ChatGPT 🛠️',
        4000,
        '🙋 复制粘贴砖家 📋',
        3000,
        () => {
          console.log('Sequence completed');
        },
      ]}
      wrapper="p"
      cursor={true}
      repeat={Infinity}
      style={{ fontSize: '30px', display: 'inline-block', color: 'blue', backgroundColor: 'lightgrey', padding: '10px', borderRadius: '10px' }}
    />
  );
};

export default Resume;
```

> 叫我 **`奀歪`** 吧 ，**`奀歪`** 是我名字的谐音，而我的名字又是我奶奶根据方言中 **`恩惠`** 的谐音起的，这辈子大概是跟谐音梗过不去了。

**`奀歪`**，可以拆解为 **`不大不正`**，我觉得这两个词很形象的描述了我。

**`不正`** 意味着：`无法成为正确`。

> 最后我们都变成了别人眼中的正常人，自己眼中的怪物。

我知道怎么样能变得 `「正常」`，可是，我真的需要 `「正常」` 吗？🤷 谁知道呢~

有时真正难相处的，是我们自己，有时**自身即地狱**。

正常的生活和真实的意识像是一座狭长的高台，位于一个巨大分水岭的顶端，将两个截然不同的宇宙分隔开来，而我就在高台上颤颤巍巍地挪动。

**`不大`** 意味着：`大人不及格`。

> 我终究没有成长为一个 `「合格」` 的大人。

突然觉得我一直拒绝长大，做个 `「大人」`，大概是因为我固执的认为只有小孩子才能探索 `「自己究竟要成为什么样的人」`，而 31 岁的我，不应该还在迷茫了，应该是一个 _______ 的大人了。

而我依然找不到方向，不知道自己应该做什么，只有把自己当成小孩子我才能心安理得的允许自己的缺点和错误。我错误的认为所谓的 `「大人」` 就应该完美，但哪怕我意识到了这个错误，我也很难把自己当成一个负责任的大人，**我想逃避的东西太多太多了**。

---

## 关于本站

> 精华都在 Notes 中

我将在这个网站记录分享一些学习知识与经验，希望对你有所帮助✨✨✨。

平常我会将一些碎片化的信息记录到 **Daily** 中，然后再将这些碎片化的信息整理成文章，发布到 **Notes** 或 **Blog** 中。

同时，我也会在 **Playground** 中试验一些有趣的代码片段或在 **Library** 中研究（抄袭）大佬们的源码。

当然，我也会把在 **Playground** 和 **Library** 汲取的经验整理成文章，发布到 **Daily**、**Notes** 或 **Blog** 中。

- 📝 **Notes** 是我的思考，是我的知识库。
- 🎮 **Playground** 是我的游乐场，是我的实验室。
- 📚 **Library** 是我的前端库，是我的积累。
- 📖 **Blog** 是我的分享，是我的成长。

---

## 联系方式

🔭 若有疑惑交流、技术合作或遇知音，以下有我的联系方式。

> 目前在南京找工作，有意向的公司可以联系我。

- 📜 **简历**: 点击 <a href="/awesome-me/about/resume.pdf" download="楚恩伟-前端开发工程师">这里</a> 查看我的简历。
- 📮 **Email**: <chuenwei0129@gmail.com>
- 📱 **微信**: 18105142454
- 🐙 **GitHub**: [chuenwei0129](https://github.com/chuenwei0129)
