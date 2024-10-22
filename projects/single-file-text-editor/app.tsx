import { Button } from 'antd';
import React from 'react';

const App = () => {
  const handleGetFile = async () => {
    try {
      const [fileHandle] = await self.showOpenFilePicker();
      const file = await fileHandle.getFile();
      const text = await file.text();
      console.log('🚀 ~ onClick ~ text:', text);
    } catch (error) {
      console.log('🚀 ~ onClick ~ error:', error);
    }
  };

  const handleGetDir = async () => {
    try {
      const dirHandle = await self.showDirectoryPicker();
      console.log('🚀 ~ onClick ~ dirHandle:', dirHandle);
    } catch (error) {
      console.log('🚀 ~ onClick ~ error:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleGetFile}>get File</Button>
      <Button onClick={handleGetDir}>get Dir</Button>
    </div>
  );
};
export default App;
