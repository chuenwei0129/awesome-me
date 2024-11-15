import { message } from 'antd';
import React, { useCallback, useState } from 'react';

const SingleFileUpload: React.FC = () => {
  const [, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // 生成预览
  const generatePreview = useCallback(async (file: File) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // 上传文件
  const uploadFile = async (file: File) => {
    const data = new FormData();
    data.set('name', '楚'); // 设置表单数据中的名字
    data.set('age', '31'); // 设置表单数据中的年龄
    data.set('file', file); // 设置文件

    try {
      setIsUploading(true);
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3333/upload/single', true); // 修改为你的上传地址

      // 监听上传进度
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total);
          setUploadProgress(progress);
        }
      };

      // 上传完成的回调
      xhr.onload = () => {
        if (xhr.status === 200) {
          message.success('文件上传成功！');
        } else {
          message.error('上传文件失败，请重试');
        }
        setIsUploading(false);
        setUploadProgress(0);
      };

      // 上传错误的回调
      xhr.onerror = () => {
        message.error('上传文件失败，请重试');
        setIsUploading(false);
        setUploadProgress(0);
      };

      xhr.send(data);
    } catch (error) {
      message.error('上传文件失败，请重试');
      console.error('上传文件失败:', error);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // 处理文件选择变化
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    await generatePreview(selectedFile);
    await uploadFile(selectedFile);
  };

  // 组件的UI部分
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">单文件上传</h2>
        <label htmlFor="singleFile" className="block mb-2 text-gray-700">
          请选择文件:
        </label>
        <input
          id="singleFile"
          type="file"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-300 rounded-md"
          accept="image/*"
          disabled={isUploading}
        />

        {isUploading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }} />
            </div>
            <p className="text-sm text-gray-600 mt-1">上传进度: {uploadProgress}%</p>
          </div>
        )}

        {preview && (
          <div id="singleFilePreview" className="mt-4">
            <img src={preview} alt="文件预览" className="w-48 rounded-lg shadow-md" />
          </div>
        )}
      </section>
    </div>
  );
};

export default SingleFileUpload;
