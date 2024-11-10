import React, { DragEventHandler } from 'react';

const App = () => {
  const onDragOver: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    console.log('🚀 ~ onDragOver ~ e:', e);
  };

  const onDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log('🚀 ~ App ~ files:', files);
  };

  return (
    <div>
      <div
        className="w-[100px] h-[100px] bg-cyan-200"
        onDragOver={onDragOver}
        onDrop={onDrop}
      ></div>
    </div>
  );
};
export default App;
