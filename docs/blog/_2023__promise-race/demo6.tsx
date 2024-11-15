import { onlyResolvesLast } from 'awesome-only-resolves-last-promise';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const fakeApiCall = onlyResolvesLast((tabIndex: number): Promise<string> => {
  return new Promise((resolve) => {
    const randomDelay = Math.random() * 3000; // 模拟网络延迟
    setTimeout(() => {
      resolve(`Data for Tab ${tabIndex}`);
    }, randomDelay);
  });
});

const OnlyResolveLastDemo = () => {
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
    <div className="p-4">
      <div className="flex gap-2">
        {[1, 2, 3].map((tabIndex) => (
          <button
            key={tabIndex}
            className={twMerge(
              'px-4 py-2 rounded',
              activeTab === tabIndex ? 'text-white' : 'text-black',
              clsx({
                'bg-blue-500': tabIndex === 1 && activeTab === 1,
                'bg-green-500': tabIndex === 2 && activeTab === 2,
                'bg-red-500': tabIndex === 3 && activeTab === 3,
                'bg-gray-500': activeTab !== tabIndex,
              }),
            )}
            onClick={() => handleTabSwitch(tabIndex)}
          >
            Tab {tabIndex}
          </button>
        ))}
      </div>
      <div className="mt-4">
        <p>Active Tab: {activeTab}</p>
        {loading ? <p>Loading...</p> : <p>Data: {data}</p>}
      </div>
    </div>
  );
};

export default OnlyResolveLastDemo;
