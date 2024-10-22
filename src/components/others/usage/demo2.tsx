import React, { useState } from 'react';

const SIZE = 10 * 1024 * 1024; // 切片大小

interface FileChunk {
  chunk: Blob;
  hash: string;
}

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileChunks, setFileChunks] = useState<FileChunk[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const createFileChunk = (file: File, size: number = SIZE): FileChunk[] => {
    const fileChunkList: FileChunk[] = [];
    let cur = 0;
    while (cur < file.size) {
      fileChunkList.push({
        chunk: file.slice(cur, cur + size),
        hash: `${file.name}-${cur / size}`,
      });
      cur += size;
    }
    return fileChunkList;
  };

  const request = async ({ url, data }: { url: string; data: FormData }) => {
    // Implement your request logic here, e.g., using fetch or axios
    return fetch(url, {
      method: 'POST',
      body: data,
    });
  };

  const uploadChunks = async () => {
    const requestList = fileChunks
      .map(({ chunk, hash }) => {
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('hash', hash);
        formData.append('filename', file!.name);
        return { formData };
      })
      .map(({ formData }) =>
        request({
          url: 'http://localhost:3000',
          data: formData,
        }),
      );

    await Promise.all(requestList);
  };

  const handleUpload = async () => {
    if (!file) return;
    const fileChunkList = createFileChunk(file);
    setFileChunks(fileChunkList);
    await uploadChunks();
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>
        上传
      </button>
    </div>
  );
};

export default FileUpload;
