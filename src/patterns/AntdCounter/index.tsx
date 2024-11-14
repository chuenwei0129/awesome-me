import { CircleMinus, CirclePlus, Minus, Plus, SquareMinus, SquarePlus } from 'lucide-react';
import React, { FC, useEffect, useRef } from 'react';

// 定义组件的属性类型
export type AntdCounterProps = {
  /**
   * @description 记数器的初始值
   * @default 0
   */
  initialValue?: number; // 初始值

  /**
   * @description 记数器的标签
   */
  label: string; // 标签

  /**
   * @description 减少按钮的图标类型
   * @default "minus"
   */
  iconDecrement: 'minus' | 'circle-minus' | 'square-minus'; // 减少按钮图标类型

  /**
   * @description 增加按钮的图标类型
   * @default "plus"
   */
  iconIncrement: 'plus' | 'circle-plus' | 'square-plus'; // 增加按钮图标类型

  /**
   * @description 计数器的计数限制，超过该值时背景变红
   */
  limit?: number; // 计数限制

  /**
   * @description 计数值改变时的回调函数
   */
  onChange?: (value: number) => void; // 值改变时的回调函数
};

// 根据图标类型返回相应的图标组件
const getIcon = (iconType: string) => {
  switch (iconType) {
    case 'minus':
      return <Minus />;
    case 'circle-minus':
      return <CircleMinus />;
    case 'square-minus':
      return <SquareMinus />;
    case 'plus':
      return <Plus />;
    case 'circle-plus':
      return <CirclePlus />;
    case 'square-plus':
      return <SquarePlus />;
    default:
      return null;
  }
};

// 计数器组件
const AntdCounter: FC<AntdCounterProps> = ({ initialValue = 0, label, iconDecrement = 'minus', iconIncrement = 'plus', limit, onChange }) => {
  const [count, setCount] = React.useState(initialValue); // 计数状态
  const hasError = limit ? count >= limit : false; // 是否超过限制
  const firstMounded = useRef(true); // 第一次渲染标志

  // 增加计数
  const handleIncrement = () => {
    setCount(count + 1);
  };

  // 减少计数
  const handleDecrement = () => {
    setCount(Math.max(0, count - 1)); // 保证计数不为负
  };

  // 当计数改变时调用onChange回调函数
  useEffect(() => {
    if (!firstMounded.current) {
      if (onChange) onChange(count);
    }
    firstMounded.current = false;
  }, [count, onChange]);

  return (
    <div className="leading-[1.5] inline-flex border border-teal-500 rounded overflow-hidden border-solid">
      {/* 减少按钮 */}
      <button type="button" className="bg-white border-none hover:cursor-pointer focus:outline-none" onClick={handleDecrement}>
        {getIcon(iconDecrement)}
      </button>
      {/* 标签 */}
      <div className="bg-gray-200 text-gray-700 p-1.5">{label}</div>
      {/* 显示计数值，若超过限制则背景变红 */}
      <div className={`px-2 py-1 text-white ${hasError ? 'bg-red-600' : 'bg-teal-500'}`}>{count}</div>
      {/* 增加按钮 */}
      <button type="button" className="bg-white border-none hover:cursor-pointer focus:outline-none" onClick={handleIncrement}>
        {getIcon(iconIncrement)}
      </button>
    </div>
  );
};

export default AntdCounter;
