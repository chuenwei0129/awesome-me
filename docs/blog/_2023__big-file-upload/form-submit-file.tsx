import axios from 'axios';
import React, { useState } from 'react';

const FileUpload = () => {
  const [fooFiles, setFooFiles] = useState([]);
  const [barFiles, setBarFiles] = useState([]);

  const handleFooFilesChange = (e) => {
    setFooFiles(Array.from(e.target.files));
  };

  const handleBarFilesChange = (e) => {
    setBarFiles(Array.from(e.target.files));
  };

  const uploadFormFiles = async (e) => {
    e.preventDefault();
    const data = new FormData();
    fooFiles.forEach((file) => {
      data.append('foo', file);
    });
    barFiles.forEach((file) => {
      data.append('bar', file);
    });
    try {
      const res = await axios.post('http://localhost:3333/upload/fields', data);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <section>
        <h2>多个字段文件上传</h2>
        <form onSubmit={uploadFormFiles}>
          <div>
            <label htmlFor="foo">上传foo（最多3个）:</label>
            <input type="file" multiple onChange={handleFooFilesChange} />
          </div>
          <div>
            <label htmlFor="bar">上传bar（最多2个）:</label>
            <input type="file" multiple onChange={handleBarFilesChange} />
          </div>
          <button type="submit">上传文件</button>
        </form>
      </section>
    </div>
  );
};

export default FileUpload;
