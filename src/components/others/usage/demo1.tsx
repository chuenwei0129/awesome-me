import React, { useState, type ChangeEvent, type FC } from 'react';

const FileUpload: FC = () => {
  const [, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    // Implement your upload logic here
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleUpload}>
        upload
      </button>
    </div>
  );
};

export default FileUpload;
