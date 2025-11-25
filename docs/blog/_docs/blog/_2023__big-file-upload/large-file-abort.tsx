import { Button, Progress, message } from 'antd';
import axios from 'axios';
import React, { useRef, useState } from 'react';

const SIZE = 10 * 1024 * 1024;

function createFileChunk(file: File, size: number = SIZE) {
  const fileChunks = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunks.push(file.slice(cur, cur + size));
    cur += size;
  }
  return fileChunks;
}

async function createFileHash(fileChunkList: Blob[]): Promise<string> {
  const hashBufferList = [];
  for (const chunk of fileChunkList) {
    const buffer = await chunk.arrayBuffer();
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
    hashBufferList.push(hashBuffer);
  }

  const combinedBuffer = new Uint8Array(hashBufferList.reduce<number[]>((acc, val) => acc.concat(Array.from(new Uint8Array(val))), []));
  const finalHashBuffer = await window.crypto.subtle.digest('SHA-256', combinedBuffer);
  const hashArray = Array.from(new Uint8Array(finalHashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [chunkProgress, setChunkProgress] = useState<number[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const abortController = useRef<AbortController | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    message.loading({ content: '正在处理文件...', key: 'upload' });
    abortController.current = new AbortController();

    try {
      const fileChunks = createFileChunk(file);
      const fileHash = await createFileHash(fileChunks);

      const { data } = await axios.post('http://localhost:3333/upload/verify', {
        fileName: file.name,
        fileHash: fileHash,
      });

      if (!data.shouldUpload) {
        message.info({ content: '文件已存在，无需重复上传', key: 'upload' });
        return;
      }

      setChunkProgress(new Array(fileChunks.length).fill(0));
      setIsUploading(true);

      const requests = fileChunks.map((chunk, index) => {
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('index', index.toString());
        formData.append('fileHash', fileHash);
        formData.append('fileName', file.name);

        return () =>
          axios.post('http://localhost:3333/upload/chunk', formData, {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round((progressEvent.loaded / progressEvent.total!) * 100);
              setChunkProgress((prevProgress) => {
                const newProgress = [...prevProgress];
                newProgress[index] = percentCompleted;
                return newProgress;
              });
            },
            signal: abortController.current?.signal,
          });
      });

      await Promise.all(requests.map((request) => request()));
      await axios.post('http://localhost:3333/upload/merge', {
        fileName: file.name,
        fileHash: fileHash,
        size: SIZE,
      });

      message.success({ content: '文件上传成功', key: 'upload' });
    } catch (error: any) {
      if (axios.isCancel(error)) {
        message.info({ content: '上传已暂停', key: 'upload' });
      } else {
        message.error({ content: `文件上传失败: ${error.message}`, key: 'upload' });
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handlePause = () => {
    if (abortController.current) {
      abortController.current.abort();
    }
    setIsUploading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold text-center">大文件上传</h1>
      <input type="file" onChange={handleFileChange} className="block w-full text-center mb-4" />
      <Button onClick={handleUpload} type="primary" block disabled={isUploading}>
        上传文件
      </Button>
      <Button onClick={handlePause} type="default" block disabled={!isUploading}>
        暂停上传
      </Button>
      <div className="mt-6">
        {chunkProgress.map((percent, index) => (
          <Progress key={index} percent={percent} status="active" className="mt-2" />
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
