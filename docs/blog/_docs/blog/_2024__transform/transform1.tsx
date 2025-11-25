import React, { useState } from 'react';

import { transform } from './transform'
import type { NestedObject } from './transform';

// DisplayObject 组件的 Props 类型声明
type DisplayObjectProps = {
  obj: NestedObject;
  title: string;
};

// 用于显示嵌套对象的组件
const DisplayObject: React.FC<DisplayObjectProps> = ({ obj, title }) => {
  const renderObject = (obj: NestedObject): JSX.Element => {
    return (
      <ul className="ml-4">
        {Object.entries(obj).map(([key, value]) => (
          <li key={key} className="mb-1">
            <span className="font-medium">{key}</span>:{' '}
            {typeof value === 'object' ? renderObject(value) : <span className="text-blue-600">{value}</span>}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="border p-4 rounded-lg shadow-md my-4 w-full md:w-5/12">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {renderObject(obj)}
    </div>
  );
};

// 初始化对象
const initialObject: { [key: string]: number } = {
  A: 1,
  'B.C': 2,
  'B.D.E': 3,
  'CC.DD.EE': 4,
};

// 主组件
const App: React.FC = () => {

  // 状态：原始对象和转换后的对象
  const [original, setOriginal] = useState<{ [key: string]: number }>(initialObject);
  const [transformed, setTransformed] = useState<NestedObject | null>(null);

  // 运行转化脚本
  const runTransform = () => {
    const result = transform(original);
    setTransformed(result);
  };

  // 重置状态
  const reset = () => {
    setTransformed(null);
    setOriginal(initialObject);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex space-x-4 mb-8">
        <button
          type="button"
          onClick={runTransform}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Run Transform
        </button>
        <button
          type="button"
          onClick={reset}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-8 w-full justify-center">
        <DisplayObject obj={original} title="Original Object" />
        {transformed && <DisplayObject obj={transformed} title="Transformed Object" />}
      </div>
    </div>
  );
};

export default App;
