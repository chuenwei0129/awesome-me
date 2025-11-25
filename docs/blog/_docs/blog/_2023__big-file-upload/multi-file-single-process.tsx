import { message } from 'antd';
import axios from 'axios';
import React, { useCallback, useState } from 'react';

const MultiFileUpload: React.FC = () => {
  const [, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const generatePreviews = useCallback(async (files: File[]) => {
    const newPreviews: string[] = [];

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newPreviews.push(e.target?.result as string);
          if (newPreviews.length === files.length) {
            setPreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }, []);

  const uploadFiles = async (files: File[]) => {
    const data = new FormData();
    data.set('name', '楚');
    data.set('age', '31');

    files.forEach((file) => {
      data.append('files', file);
    });

    try {
      setIsUploading(true);
      const response = await axios.post('http://localhost:3333/upload/multi', data, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        },
      });

      if (response.status === 200) {
        message.success('文件上传成功！');
      } else {
        message.error('上传文件失败，请重试');
      }
    } catch (error) {
      message.error('上传文件失败，请重试');
      console.error('上传文件失败:', error);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const validFiles = selectedFiles;

    setFiles(validFiles);
    await generatePreviews(validFiles);
    await uploadFiles(validFiles);
    event.target.value = '';
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <section className="mb-6">
        <h2 className="text-xl font-bold mb-4">多文件上传</h2>
        <label htmlFor="multiFiles" className="block mb-2 text-gray-700">
          请选择文件:
        </label>
        <input
          id="multiFiles"
          type="file"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-gray-300 rounded-md"
          accept="image/*"
          multiple
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

        {previews.length > 0 && (
          <div id="multiFilesPreview" className="mt-4">
            {previews.map((preview, index) => (
              <img key={index} src={preview} alt={`文件预览${index}`} className="w-48 rounded-lg shadow-md mb-2 mr-2 inline-block" />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MultiFileUpload;
