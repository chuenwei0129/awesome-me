import { createFromIconFont } from 'naifu';
import React from 'react';

const IconFont = createFromIconFont(
  '//at.alicdn.com/t/c/font_4697166_zeqonxwplya.js',
);

export default function demo2() {
  return (
    <div>
      <IconFont type="icon-sword" size={'50px'} color="#f00" />
      <IconFont type="icon-a-010-sword" fontSize={'50px'} />
    </div>
  );
}
