import { message } from 'antd';
import axios from 'axios';
import clsx from 'clsx';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldName, setFieldName] = useState<string>(''); // 动态字段名

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      const fileSize = selectedFile.size / 1024; // 转换为 KB

      if (!['image/png', 'image/jpeg'].includes(fileType)) {
        setError('只允许上传png或jpeg格式的图片');
        setFile(null);
        setPreview(null);
        message.error('只允许上传png或jpeg格式的图片');
        return;
      }

      if (fileSize > 300) {
        setError('图片大小不得超过300KB');
        setFile(null);
        setPreview(null);
        message.error('图片大小不得超过300KB');
        return;
      }

      setError(null);
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError('请先选择一张图片');
      message.error('请先选择一张图片');
      return;
    }

    const data = new FormData();
    data.append(fieldName, file); // 使用动态字段名

    try {
      const response = await axios.post('http://localhost:3333/upload/images', data);
      console.log(response.data);
      message.success('文件上传成功');
    } catch (error) {
      console.error(error);
      message.error('文件上传失败');
    }
  };

  const handleFieldNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFieldName(e.target.value);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">上传图片</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          className={twMerge(clsx('border p-2 mb-4', { 'border-red-500': error }))}
          type="text"
          value={fieldName}
          onChange={handleFieldNameChange}
          placeholder="文件字段名"
        />
        <input className="border p-2 mb-4" type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {preview && <img src={preview as string} alt="预览" width="100" className="mb-4" />}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          上传文件
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
