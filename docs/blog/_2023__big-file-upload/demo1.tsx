import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';

interface PreviewFile {
  type: string;
  src: string;
}

const FileUpload: React.FC = () => {
  const [singleFilePreview, setSingleFilePreview] = useState<PreviewFile[]>([]);
  const [multipleFilesPreview, setMultipleFilesPreview] = useState<PreviewFile[]>([]);

  const previewFiles = (files: FileList, setPreview: React.Dispatch<React.SetStateAction<PreviewFile[]>>) => {
    const previews = Array.from(files).map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise<PreviewFile>((resolve) => {
        reader.onload = (e) => {
          resolve({
            type: file.type,
            src: e.target?.result as string,
          });
        };
      });
    });

    Promise.all(previews).then(setPreview);
  };

  const handleFileUpload = async (url: string, data: FormData) => {
    try {
      const res = await axios.post(url, data);
      alert('上传成功');
      console.log(res);
    } catch (error) {
      alert('上传失败');
      console.error(error);
    }
  };

  const handleSingleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const data = new FormData();
      data.set('name', '楚');
      data.set('age', '31');
      data.set('file', files[0]);

      handleFileUpload('http://localhost:3333/upload/file', data);

      previewFiles(files, setSingleFilePreview);
    }
  };

  const handleMultipleFilesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const data = new FormData();
      data.set('name', '楚');
      data.set('age', '31');
      Array.from(files).forEach((file) => data.append('files', file));

      handleFileUpload('http://localhost:3333/upload/files', data);

      previewFiles(files, setMultipleFilesPreview);
    }
  };

  return (
    <div className="p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">文件上传示例</h1>
      </header>
      <main>
        <section className="mb-4">
          <h2 className="text-xl mb-2">单文件上传</h2>
          <label htmlFor="singleFile" className="block mb-2">
            请选择文件:
          </label>
          <input id="singleFile" type="file" onChange={handleSingleFileChange} />
          <div id="singleFilePreview" className="flex flex-wrap mt-4">
            {singleFilePreview.map((file, index) => (
              <div key={index} className="mr-2 mb-2">
                {file.type.startsWith('image/') && <img src={file.src} alt="Preview" width={100} />}
                {file.type.startsWith('video/') && <video src={file.src} width={200} controls />}
                {!file.type.startsWith('image/') && !file.type.startsWith('video/') && <p>无法预览此文件类型</p>}
              </div>
            ))}
          </div>
        </section>
        <section className="mb-4">
          <h2 className="text-xl mb-2">多文件上传</h2>
          <label htmlFor="multipleFiles" className="block mb-2">
            请选择文件:
          </label>
          <input id="multipleFiles" type="file" multiple onChange={handleMultipleFilesChange} />
          <div id="multipleFilesPreview" className="flex flex-wrap mt-4">
            {multipleFilesPreview.map((file, index) => (
              <div key={index} className="mr-2 mb-2">
                {file.type.startsWith('image/') && <img src={file.src} alt="Preview" width={100} />}
                {file.type.startsWith('video/') && <video src={file.src} width={200} controls />}
                {!file.type.startsWith('image/') && !file.type.startsWith('video/') && <p>无法预览此文件类型</p>}
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 文件上传示例</p>
      </footer>
    </div>
  );
};

export default FileUpload;
