import clsx from 'clsx';
import { Loader, RefreshCw } from 'lucide-react';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface GridStatus {
  loading: boolean;
  fulfilled: boolean;
  failed: boolean;
}

const App: React.FC = () => {
  const initialGridStatus = Array(1500).fill({ loading: false, fulfilled: false, failed: false });
  const [grid, setGrid] = useState<GridStatus[]>(initialGridStatus);
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleClick = () => {
    setLoading(true);
    setGrid(initialGridStatus); // 点击按钮时重置格子颜色
    Promise.allSettled(
      Array.from({ length: grid.length }, (_, index) => {
        setGrid((prev) => {
          const newGrid = [...prev];
          newGrid[index] = { ...newGrid[index], loading: true };
          return newGrid;
        });

        return get(index + 1)
          .then((result) => {
            setGrid((prev) => {
              const newGrid = [...prev];
              if (result) {
                newGrid[index] = { loading: false, fulfilled: true, failed: false };
              } else {
                newGrid[index] = { loading: false, fulfilled: false, failed: true };
              }
              return newGrid;
            });
          })
          .catch(() => {
            setGrid((prev) => {
              const newGrid = [...prev];
              newGrid[index] = { loading: false, fulfilled: false, failed: true };
              return newGrid;
            });
          });
      }),
    ).finally(() => {
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
                'bg-black text-white': cell.failed,
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
