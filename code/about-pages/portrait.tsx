/**
 * inline: true
 */
import React from 'react';

import { AnimatedTestimonials } from 'naifu';

import s1 from '../../public/about/chu-01.png';
// import s2 from '../../public/about/chu-02.png';
// import s3 from '../../public/about/chu-03.png';
import s4 from '../../public/about/chu-04.png';
import s5 from '../../public/about/chu-05.png';
import s6 from '../../public/about/chu-06.png';
import s7 from '../../public/about/chu-07.png';
import s8 from '../../public/about/chu-08.png';
import s9 from '../../public/about/chu-09.png';
// import s10 from '../../public/about/chu-10.png';

function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote: '@me, portrait, in the style of Vincent van Gogh, self-portrait, impressionism, expressive brushstrokes, vibrant colors, detailed, accurate colors.',
      name: '梵高',
      designation: '2023年12月14日 15:23:08',
      src: s1,
    },
    // {
    //   quote: '@me with glowing irises, screaming expression wearing gi. dramatic lighting, afro samurai anime style, pencil and ink manga drawing, centered in panel.',
    //   name: '吉卜力工作室',
    //   designation: '2023年12月14日 21:06:41',
    //   src: s2,
    // },
    // {
    //   quote: '@me, portrait, in the style of Feng Zikai, ink painting, simple lines, humorous, childlike, expressive, traditional Chinese art, modern elements.',
    //   name: '丰子恺',
    //   designation: '2024年10月20日 17:20:19',
    //   src: s3,
    // },
    {
      quote: '@me portrait, neutral pen sketch style, highly detailed, clear focus, minimalistic background.',
      name: '中性笔素描风格',
      designation: '2023年05月19日 11:32:12',
      src: s4,
    },
    {
      quote: '@me of diverse charcoal portraits, sketchbook, notes, scribbles, artwork, thick lines, expressive.',
      name: '素描',
      designation: '2023年05月13日 18:22:37',
      src: s5,
    },
    {
      quote: '@me as a peasant from 1 2 th century england, exhibited in the british museum, oil on canvas, art, restored painting.',
      name: '油画',
      designation: '2024年1月7日 4:29:21',
      src: s6,
    },
    {
      quote: 'a closeup portrait of @me, frontal view, in the style of edward hopper, very fine brush strokes, 4k.',
      name: '爱德华 · 霍普',
      designation: '2024年10月20日 1:30:24',
      src: s7,
    },
    {
      quote:
        'Portrait @me smile focus attractive eye enchanted official fanart behance hd artstation by jesper ejsing, by rhads, makoto shinkai and lois van baarle, ilya kuvshinov, rossdraws portrait radiating a glowing aura.',
      name: '杰斯珀 · 埃辛',
      designation: '2024年1月31日 15:13:33',
      src: s8,
    },
    {
      quote: 'painting of a smile @me by Egon Schiele.',
      name: '埃贡 · 席勒',
      designation: '2024年1月30日 8:34:26',
      src: s9,
    },
    // {
    //   quote: 'Caricature Drawing of @me by Mahesh Nambiar.',
    //   name: '马赫什 · 南比亚尔',
    //   designation: '2024年1月9日 19:01:55',
    //   src: s10,
    // },
  ];

  return <AnimatedTestimonials testimonials={testimonials} />;
}

export default AnimatedTestimonialsDemo;
