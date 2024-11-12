import clsx from 'clsx';
import { Loader, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

// 并发控制类的引入
import pLimit from './pLimit';

type GridStatus = { loading: boolean; fulfilled: boolean; failed: boolean };

const App: React.FC = () => {
  const limit = new pLimit(10); // 设置并发限制为10

  // 初始化grid状态数组，包含1500个元素，每个元素表示一个格子的状态
  const initialGridStatus = Array(1500).fill({ loading: false, fulfilled: false, failed: false });

  // 设置grid状态的hook
  const [grid, setGrid] = useState<GridStatus[]>(initialGridStatus);

  // 设置loading状态的hook
  const [loading, setLoading] = useState<boolean>(false);

  // 获取数据的异步函数
  const get = async (id: number) => {
    try {
      const response = await fetch(`https://localhost:8848/phone/${id}`);
      if (!response.ok) {
        throw new Error(`Error fetching data for ID: ${id}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // 处理单个请求的函数，使用pLimit进行并发控制
  const handleRequest = async (id: number) => {
    await limit.add(async () => {
      // 设置当前grid单元为loading状态
      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[id - 1] = { ...newGrid[id - 1], loading: true };
        return newGrid;
      });

      // 获取数据并更新grid状态
      return get(id)
        .then((result) => {
          setGrid((prev) => {
            const newGrid = [...prev];
            if (result) {
              newGrid[id - 1] = { loading: false, fulfilled: true, failed: false };
            } else {
              newGrid[id - 1] = { loading: false, fulfilled: false, failed: true };
            }
            return newGrid;
          });
        })
        .catch(() => {
          setGrid((prev) => {
            const newGrid = [...prev];
            newGrid[id - 1] = { loading: false, fulfilled: false, failed: true };
            return newGrid;
          });
        });
    });
  };

  // 处理按钮点击事件的函数
  const handleClick = () => {
    setLoading(true);
    // 重置grid回到初始状态
    setGrid(initialGridStatus);
    const ids = Array.from({ length: grid.length }, (_, index) => index + 1);

    // 使用promise.all处理所有请求
    Promise.all(ids.map((id) => handleRequest(id))).finally(() => {
      setLoading(false);
    });
  };

  return (
    <div>
      <button type="button" className="p-2 text-lg cursor-pointer mb-5 flex items-center gap-2" onClick={handleClick} disabled={loading}>
        {loading ? (
          <>
            <Loader size={16} /> Loading...
          </>
        ) : (
          <>
            <RefreshCw size={16} /> Click me!
          </>
        )}
      </button>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] gap-0.5 w-full h-full p-2 box-border overflow-auto">
        {grid.map((cell, index) => (
          <div
            key={index}
            className={twMerge(
              'flex items-center justify-center aspect-square border',
              clsx({
                'bg-gray-200': cell.loading,
                'bg-green-300': cell.fulfilled,
                'bg-black': cell.failed,
                'bg-gray-100': !cell.loading && !cell.fulfilled && !cell.failed,
              }),
            )}
          >
            {cell.loading && <Loader size={16} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
