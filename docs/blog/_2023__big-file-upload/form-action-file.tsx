import React, { ChangeEvent, useState } from 'react';

const FileUpload: React.FC = () => {
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const handleMediaFilesChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files));
    }
  };

  return (
    <div>
      <section>
        <h2>文件上传</h2>
        <form action="http://localhost:3333/upload/media" method="post" encType="multipart/form-data">
          <div>
            <input type="file" name="mediaFiles" multiple onChange={handleMediaFilesChange} />
          </div>
          <button type="submit">上传文件</button>
        </form>
      </section>
    </div>
  );
};

export default FileUpload;
