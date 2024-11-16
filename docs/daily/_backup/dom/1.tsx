import React, { useState } from 'react';
import ImageDecorationTemplates from './2';

interface ImageDecorationProps {
  originalImage: string;
}

const ImageDecoration: React.FC<ImageDecorationProps> = ({ originalImage = '/about/chu-01.png' }) => {
  const [showTemplates, setShowTemplates] = useState(false);

  const handleShowTemplates = () => {
    setShowTemplates((prevState) => !prevState);
  };

  const handleSelectTemplate = (templateId: number) => {
    console.log(`Selected template ID: ${templateId}`);
    // Here you can handle the action of selecting a template, e.g., applying to the image
    setShowTemplates(false);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex justify-around w-full">
        <button type="button" onClick={handleShowTemplates} className="bg-green-500 text-white p-2 rounded">
          头像边框
        </button>
      </div>
      {showTemplates && <ImageDecorationTemplates originalImage={originalImage} onSelectTemplate={handleSelectTemplate} />}
    </div>
  );
};

export default ImageDecoration;
