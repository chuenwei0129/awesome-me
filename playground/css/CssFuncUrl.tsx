import React from 'react';
import styled from 'styled-components';

const FontDiv = styled.div`
  @font-face {
    font-family: 'Bitstream Vera Serif Bold';
    src: url('https://mdn.github.io/css-examples/web-fonts/VeraSeBd.ttf');
  }

  & {
    font-family: 'Bitstream Vera Serif Bold', serif;
  }
`;

const ListStyleImage = styled.li`
  list-style-image: url('/pointer.cur');
`;

const BackgroundImage = styled.li`
  list-style-type: none;
  position: relative;
  padding-left: 60px;

  &::before {
    content: '';
    display: inline-block;
    width: 50px; /* 设置图片宽度 */
    height: 50px; /* 设置图片高度 */
    background: url('/logo.svg') no-repeat center center;
    background-size: contain; /* 确保图片缩放以适应容器 */
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const CursorDiv = styled.div`
  cursor: url('/css-note/pointer.cur'), auto;
`;

const BorderDiv = styled.div`
  border: 20px solid transparent;
  border-image: url('/css-note/border-diamonds.png') 30 round;
  width: 200px;
  height: 200px;
  margin-top: 20px;
`;

const CssFuncUrl = () => {
  return (
    <div>
      <FontDiv>字体文件</FontDiv>
      <ul>
        <ListStyleImage>列表项图像</ListStyleImage>
        <BackgroundImage>背景图像</BackgroundImage>
      </ul>
      <BorderDiv>边框图像</BorderDiv>
      <CursorDiv>光标</CursorDiv>
    </div>
  );
};

export default CssFuncUrl;
