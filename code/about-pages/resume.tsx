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
