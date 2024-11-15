import React, { useRef } from 'react';

const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handlePaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
    const clipboardData = event.clipboardData || (window as any).clipboardData;
    if (clipboardData) {
      const items = clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const img = document.createElement('img');
              img.src = e.target?.result as string;
              insertNodeToEditor(img);
            };
            reader.readAsDataURL(file);

            // 上传图片到服务器
            await uploadImage(file);
          }
        }
      }
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3333/upload/single', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Upload success:', result);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const insertNodeToEditor = (node: Node) => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      range.insertNode(node);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };

  return <div ref={editorRef} className="editor-box w-full h-[100px] border-[6px] border-solid border-blue-400 p-2" contentEditable onPaste={handlePaste}></div>;
};

export default Editor;
