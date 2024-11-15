import { message } from 'antd';
import axios, { CancelTokenSource } from 'axios';
import React from 'react';
import { useImmer } from 'use-immer';

// 定义文件上传进度接口
interface FileUploadProgress {
  file: File;
  progress: number;
  cancelSource?: CancelTokenSource;
  isUploading: boolean;
  uploadDone: boolean;
  previewUrl?: string;
}

const MultiFileUpload: React.FC = () => {
  const [files, setFiles] = useImmer<FileUploadProgress[]>([]);

  // 上传文件到服务器
  const uploadFile = async (file: File) => {
    const data = new FormData();
    const cancelSource = axios.CancelToken.source();

    data.append('file', file);

    setFiles((draft) => {
      const target = draft.find((f) => f.file === file);
      if (target) {
        target.cancelSource = cancelSource;
      }
    });

    try {
      const response = await axios.post('http://localhost:3333/upload/single', data, {
        cancelToken: cancelSource.token,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

            setFiles((draft) => {
              const target = draft.find((f) => f.file === file);
              if (target) {
                target.progress = progress;
              }
            });
          }
        },
      });

      if (response.status === 200) {
        message.success(`文件 ${file.name} 上传成功！`);
        setFiles((draft) => {
          const target = draft.find((f) => f.file === file);
          if (target) {
            target.uploadDone = true;
            target.isUploading = false;
          }
        });
      } else {
        throw new Error('上传失败');
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        message.error(`文件 ${file.name} 上传被取消`);
      } else {
        message.error(`文件 ${file.name} 上传失败，请重试`);
      }
      setFiles((draft) => {
        const target = draft.find((f) => f.file === file);
        if (target) {
          target.isUploading = false;
        }
      });
    }
  };

  // 处理文件读取及上传
  const handleFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const target = e.target?.result;
      if (target) {
        setFiles((draft) => {
          draft.push({
            file: file,
            progress: 0,
            isUploading: true,
            uploadDone: false,
            previewUrl: target.toString(),
          });
        });

        await uploadFile(file);
      }
    };

    reader.onerror = () => {
      message.error(`文件 ${file.name} 读取出错`);
    };

    reader.readAsDataURL(file);
  };

  // 处理文件选择变化
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    selectedFiles.forEach(handleFile);

    event.target.value = '';
  };

  // 取消上传
  const handleCancelUpload = (index: number, cancelSource?: CancelTokenSource) => {
    if (cancelSource) {
      cancelSource.cancel();
    }

    setFiles((draft) => {
      const target = draft[index];
      if (target) {
        draft.splice(index, 1);
      }
    });
  };

  // 删除文件展示
  const handleRemoveFile = (index: number) => {
    setFiles((draft) => {
      draft.splice(index, 1);
    });
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
          disabled={files.some((file) => file.isUploading)}
        />
        {files.length > 0 && (
          <div id="multiFilesProgress" className="mt-4">
            {files.map((fileUploadProgress, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {fileUploadProgress.previewUrl && (
                      <img src={fileUploadProgress.previewUrl} alt={`文件预览${index}`} className="w-12 h-12 rounded-lg shadow-md mr-4" />
                    )}
                    <div>
                      <p className="text-gray-700">{fileUploadProgress.file.name}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${fileUploadProgress.progress}%` }} />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">上传进度: {fileUploadProgress.progress}%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {fileUploadProgress.uploadDone && (
                      <button type="button" onClick={() => handleRemoveFile(index)} className="ml-4 text-red-500 hover:text-red-700">
                        删除
                      </button>
                    )}
                    {fileUploadProgress.isUploading && (
                      <button
                        type="button"
                        onClick={() => handleCancelUpload(index, fileUploadProgress.cancelSource)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        取消上传
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default MultiFileUpload;
