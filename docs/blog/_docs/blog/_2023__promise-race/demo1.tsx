import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const fakeApiCall = (tabIndex: number): Promise<string> => {
  return new Promise((resolve) => {
    const randomDelay = Math.random() * 3000; // 模拟网络延迟
    setTimeout(() => {
      resolve(`Data for Tab ${tabIndex}`);
    }, randomDelay);
  });
};

const Demo = () => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<string>('');

  // Effect负责处理在activeTab改变时的副作用：数据请求
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const responseData = await fakeApiCall(activeTab);
      setData(responseData);
      setLoading(false);
    };

    fetchData();
  }, [activeTab]);

  // Event handler负责处理UI交互：切换选项卡
  const handleTabSwitch = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="p-8 bg-gray-100 flex flex-col items-center">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex gap-4 mb-6">
          <button
            className={twMerge(
              'px-6 py-2 rounded-full transition-colors duration-300 focus:outline-none',
              clsx({
                'bg-blue-500 text-white': activeTab === 1,
                'bg-gray-200 text-black hover:bg-gray-300': activeTab !== 1,
              }),
            )}
            onClick={() => handleTabSwitch(1)}
          >
            Tab 1
          </button>
          <button
            className={twMerge(
              'px-6 py-2 rounded-full transition-colors duration-300 focus:outline-none',
              clsx({
                'bg-green-500 text-white': activeTab === 2,
                'bg-gray-200 text-black hover:bg-gray-300': activeTab !== 2,
              }),
            )}
            onClick={() => handleTabSwitch(2)}
          >
            Tab 2
          </button>
          <button
            className={twMerge(
              'px-6 py-2 rounded-full transition-colors duration-300 focus:outline-none',
              clsx({
                'bg-red-500 text-white': activeTab === 3,
                'bg-gray-200 text-black hover:bg-gray-300': activeTab !== 3,
              }),
            )}
            onClick={() => handleTabSwitch(3)}
          >
            Tab 3
          </button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold text-gray-700">Active Tab: {activeTab}</p>
          {loading ? <p className="mt-4 text-blue-500">Loading...</p> : <p className="mt-4 text-gray-700">Data: {data}</p>}
        </div>
      </div>
    </div>
  );
};

export default Demo;
