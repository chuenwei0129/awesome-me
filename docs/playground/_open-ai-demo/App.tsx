import React from 'react';

const App: React.FC = () => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = 'auto'; // 重置高度
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <div className='max-w-md'>
      <textarea
        className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-400 bg-white text-gray-700 placeholder-gray-400"
        rows={1}
        placeholder="随便说些什么..."
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default App;
