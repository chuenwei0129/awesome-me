import React, { useEffect, useRef } from 'react';

const Text = ({ file }: { file: File }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null!);

  useEffect(() => {
    file.text().then((contents) => {
      textareaRef.current.value = contents;
    });
  }, [file]);

  return (
    <textarea
      // 加上 key 是因为 react 会复用 textarea，导致滚动条不会滚到到顶部，加上 key 后会强制重新渲染 textarea
      key={file.name}
      className="block mt-2 w-full h-[50vh]"
      ref={textareaRef}
    ></textarea>
  );
};
export default Text;
