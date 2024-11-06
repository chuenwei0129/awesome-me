import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
    type: 'card',
    item: {
      id: data.id,
      index: index,
    },
    collect: (monitor) => ({
      dragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'card',
    // drop(item: { id: number; index: number }) {
    //   swapIndex(item.index, index);
    // },
    hover(item: { id: number; index: number }) {
      swapIndex(item.index, index);
      item.index = index;
    },
  });

  useEffect(() => {
    drag(ref);
    drop(ref);
  }, []);

  return (
    <div
      className={twMerge(
        clsx(
          'bg-blue-100 w-[200px] cursor-move leading-[60px] px-[20px] py-0 m-[10px] border-black border border-solid',
          {
            'bg-white-100 border-dashed': dragging,
          },
        ),
      )}
      ref={ref}
    >
      {data.content}
    </div>
  );
}

const Demo2 = () => {
  const [cardList, setCardList] = useState<CardItem[]>([
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

  const swapIndex = useCallback((index1: number, index2: number) => {
    const tmp = cardList[index1];
    cardList[index1] = cardList[index2];
    cardList[index2] = tmp;
    setCardList([...cardList]);
  }, []);

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
