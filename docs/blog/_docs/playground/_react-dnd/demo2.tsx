import React, { useCallback, useEffect, useRef } from 'react';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { useImmer } from 'use-immer';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardItem {
  id: number;
  content: string;
}

interface CardProps {
  data: CardItem;
  index: number;
  swapIndex: (index1: number, index2: number) => void;
}

function Card(props: CardProps) {
  const { data, index, swapIndex } = props;
  const ref = useRef<HTMLDivElement>(null!);

  const [{ dragging }, drag] = useDrag({
    // Type ：类似于 redux 里面的 actions types 枚举常量，定义了应用程序里支持的拖拽类型
    type: 'card',
    // Item ：用一个数据对象来描述当前被拖拽的元素
    item: {
      id: data.id,
      index: index,
    },
    // 拖放本质上是有状态的。要么正在进行拖动操作，要么不在。
    // 要么有当前类型和当前项目，要么没有，React DnD 通过 Monitor 来存储这些状态并且提供查询
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'card',
    hover(item: { id: number; index: number }) {
      swapIndex(item.index, index);
      item.index = index;
    },
  });

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, [drag, drop]);

  return (
    <div
      className={twMerge(
        clsx('bg-blue-100 w-[200px] cursor-move leading-[60px] px-[20px] py-0 m-[10px] border-black border border-solid', {
          'bg-white-100 border-dashed': dragging,
        }),
      )}
      ref={ref}
    >
      {data.content}
    </div>
  );
}

const Demo2 = () => {
  const [cardList, updateCardList] = useImmer<CardItem[]>([
    {
      id: 0,
      content: '000',
    },
    {
      id: 1,
      content: '111',
    },
    {
      id: 2,
      content: '222',
    },
    {
      id: 3,
      content: '333',
    },
    {
      id: 4,
      content: '444',
    },
  ]);

  const swapIndex = useCallback(
    (index1: number, index2: number) => {
      updateCardList((draft) => {
        [draft[index1], draft[index2]] = [draft[index2], draft[index1]];
      });
    },
    [updateCardList],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {cardList.map((item: CardItem, index) => (
          <Card index={index} swapIndex={swapIndex} data={item} key={item.id} />
        ))}
      </div>
    </DndProvider>
  );
};

export default Demo2;
