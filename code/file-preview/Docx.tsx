import { renderAsync } from 'docx-preview';
import React, { useEffect, useRef } from 'react';

const Docx = ({ file }: { file: File }) => {
  const docxContainerRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    renderAsync(file, docxContainerRef.current, undefined, {
      className: 'docx', // 默认和文档样式类的类名/前缀
      inWrapper: true, // 启用围绕文档内容渲染包装器
      ignoreWidth: false, // 禁用页面内容的宽度限制
      ignoreHeight: false, // 禁用页面内容的高度限制
      ignoreFonts: false, // 禁用字体下载和应用
      breakPages: true, // 在分页符上启用分页
      ignoreLastRenderedPageBreak: true, // 禁用在文档结尾呈现的分页符
      experimental: false, // 启用实验性功能（制表符停止计算）
      debug: false, // 启用额外的日志记录
    });
  }, [file]);

  return <div ref={docxContainerRef}></div>;
};

export default Docx;
