import React, { useState } from 'react';

import { transform } from './transform';
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
    <div className="border p-4 rounded-lg shadow-md my-4 w-full md:w-5/12 bg-white">
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
  const [originalObject, setOriginalObject] = useState<{ [key: string]: number } | null>(null);
  const [transformedObject, setTransformedObject] = useState<NestedObject | null>(null);
  const [editorContent, setEditorContent] = useState<string>(JSON.stringify(initialObject, null, 2));

  const [isOriginalObjectDisplayed, setIsOriginalObjectDisplayed] = useState<boolean>(false);
  const [isRunDisabled, setIsRunDisabled] = useState<boolean>(true);
  const [isRenderDisabled, setIsRenderDisabled] = useState<boolean>(false);

  // 运行转换函数
  const runTransformFunction = () => {
    if (originalObject) {
      const result = transform(originalObject);
      setTransformedObject(result);
      setIsRunDisabled(true);
    }
  };

  // 更新原始对象
  const renderOriginalObject = () => {
    try {
      const parsedInput = JSON.parse(editorContent);
      if (typeof parsedInput === 'object' && !Array.isArray(parsedInput)) {
        setOriginalObject(parsedInput);
        setIsOriginalObjectDisplayed(true);
        setIsRunDisabled(false);
        setIsRenderDisabled(true); // 设置渲染按钮为不可用
      } else {
        alert('输入无效。请输入一个有效的对象。');
      }
    } catch (e) {
      alert('输入无效。请输入一个有效的 JSON 对象。');
    }
  };

  // 重置状态
  const reset = () => {
    setTransformedObject(null);
    setOriginalObject(null);
    setEditorContent(JSON.stringify(initialObject, null, 2));
    setIsOriginalObjectDisplayed(false);
    setIsRunDisabled(true);
    setIsRenderDisabled(false); // 重置渲染按钮为可用
  };

  // 处理输入框内容变化
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditorContent(e.target.value);
    setIsRenderDisabled(false); // 在用户更改输入框内容时重新启用渲染按钮
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col mb-8 w-full max-w-lg">
        <textarea
          rows={10}
          value={editorContent}
          onChange={handleInputChange}
          className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          type="button"
          onClick={renderOriginalObject}
          className={`bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 transform transition-transform duration-200 hover:scale-105 ${isRenderDisabled && 'opacity-50 cursor-not-allowed'
            }`}
          disabled={isRenderDisabled}
        >
          渲染对象
        </button>
      </div>
      {isOriginalObjectDisplayed && originalObject && (
        <>
          <div className="flex space-x-4 mb-8">
            <button
              type="button"
              onClick={runTransformFunction}
              className={`bg-blue-500 text-white font-bold py-2 px-4 rounded transform transition-transform duration-200 hover:scale-105 ${isRunDisabled && 'opacity-50 cursor-not-allowed'
                }`}
              disabled={isRunDisabled}
            >
              运行 transform 函数
            </button>
            <button
              type="button"
              onClick={reset}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transform transition-transform duration-200 hover:scale-105"
            >
              重置
            </button>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-8 w-full justify-center">
            <DisplayObject obj={originalObject} title="原始对象" />
            {transformedObject && <DisplayObject obj={transformedObject} title="转换后的对象" />}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
