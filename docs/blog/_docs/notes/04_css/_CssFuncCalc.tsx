import React from 'react';

const CssFuncCalc = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="h-[calc(min(max(100px,20vw),200px))] w-full bg-blue-500 text-white text-center p-4">
        Responsive Element
      </div>
    </div>
  );
};

export default CssFuncCalc;
