import { message } from 'antd';
import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react';

const FileUpload: React.FC = () => {
  // 定义状态用于存储图片和 Markdown 文件列表
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [mdFiles, setMdFiles] = useState<File[]>([]);

  // 处理图片文件选择变化
  const handleImageFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (newFiles.length + imageFiles.length > 3) {
        message.error('图片文件最多上传3份');
      } else {
        setImageFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    }
  };

  // 处理 Markdown 文件选择变化
  const handleMdFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (newFiles.length + mdFiles.length > 2) {
        message.error('Markdown 文件最多上传2份');
      } else {
        setMdFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    }
  };

  // 表单提交时上传文件
  const uploadFormFiles = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    // 将图片文件添加到 FormData 中
    imageFiles.forEach((file) => {
      data.append('images', file);
    });
    // 将 Markdown 文件添加到 FormData 中
    mdFiles.forEach((file) => {
      data.append('markdowns', file);
    });
    try {
      const res = await axios.post('http://localhost:3333/upload/fields', data);
      console.log(res);
      message.success('文件上传成功');
    } catch (err) {
      console.error(err);
      message.error('文件上传失败');
    }
  };

  return (
    <div>
      <section>
        <h2>上传图片和 Markdown 文件</h2>
        <form onSubmit={uploadFormFiles}>
          <div>
            <label htmlFor="images">上传图片（jpg, png）:</label>
            <input type="file" accept="image/*" multiple onChange={handleImageFilesChange} />
          </div>
          <div>
            <label htmlFor="markdowns">上传Markdown（.md）:</label>
            <input type="file" accept=".md" multiple onChange={handleMdFilesChange} />
          </div>
          <button type="submit">上传文件</button>
        </form>
      </section>
    </div>
  );
};

export default FileUpload;
