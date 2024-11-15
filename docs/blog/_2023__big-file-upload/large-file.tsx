import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';

// 定义每个文件块的大小为10MB
const SIZE = 10 * 1024 * 1024; // 10MB

// 这个函数将文件切分成块
function createFileChunk(file: File, size: number = SIZE) {
  const fileChunks = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunks.push(file.slice(cur, cur + size));
    cur += size;
  }
  return fileChunks;
}

// 这个函数通过对每个块进行哈希处理，计算整个文件的哈希值
async function createFileHash(fileChunkList: Blob[]): Promise<string> {
  const hashBufferList = [];
  for (const chunk of fileChunkList) {
    const buffer = await chunk.arrayBuffer();
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
    hashBufferList.push(hashBuffer);
  }

  // 合并所有哈希缓冲区为一个Uint8Array
  const combinedBuffer = new Uint8Array(hashBufferList.reduce<number[]>((acc, val) => acc.concat(Array.from(new Uint8Array(val))), []));
  // 对合并后的缓冲区再次进行哈希处理，得到最终哈希值
  const finalHashBuffer = await window.crypto.subtle.digest('SHA-256', combinedBuffer);
  // 将哈希缓冲区转换为十六进制字符串
  const hashArray = Array.from(new Uint8Array(finalHashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  // 处理文件选择事件
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  // 处理上传过程
  const handleUpload = async () => {
    if (!file) return;
    message.loading({ content: '正在处理文件...', key: 'upload' });
    try {
      const fileChunks = createFileChunk(file);
      const fileHash = await createFileHash(fileChunks);
      const response = await axios.post('http://localhost:3333/upload/verify', {
        fileName: file.name,
        fileHash: fileHash,
      });

      if (response.data.shouldUpload) {
        // 构造请求
        const requests = fileChunks.map((chunk, index) => {
          const formData = new FormData();
          formData.append('chunk', chunk);
          formData.append('index', index.toString());
          formData.append('fileHash', fileHash);
          formData.append('fileName', file.name);
          return () => axios.post('http://localhost:3333/upload/chunk', formData);
        });

        // 上传所有切片
        await Promise.all(requests.map((request) => request()));

        // 合并文件
        await axios.post('http://localhost:3333/upload/merge', {
          fileName: file.name,
          fileHash: fileHash,
          size: SIZE,
        });

        message.success({ content: '文件上传成功', key: 'upload' });
      } else {
        message.info({ content: '文件已存在，无需重复上传', key: 'upload' });
      }
    } catch (error) {
      message.error({ content: '文件上传失败', key: 'upload' });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">大文件上传</h1>
      <input type="file" onChange={handleFileChange} className="block mb-4" />
      <button onClick={handleUpload} className="mr-4 bg-blue-500 text-white p-2 rounded">
        大文件上传
      </button>
    </div>
  );
};

export default FileUpload;
