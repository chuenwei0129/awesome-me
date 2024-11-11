import React, { useEffect, useRef, useState } from 'react';

import { DndProvider, useDrag, useDragLayer, useDrop } from 'react-dnd';
import { HTML5Backend, getEmptyImage } from 'react-dnd-html5-backend';

import clsx from 'clsx';

const DragLayer = () => {
  const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }

  return (
    <div
      className="fixed"
      style={{
        left: currentOffset?.x,
        top: currentOffset?.y,
      }}
    >
      {item.color}
    </div>
  );
};

interface BoxProps {
  color: string;
}

function Box(props: BoxProps) {
  const ref = useRef<HTMLDivElement>(null!);

  const [{ dragging }, drag, dragPreview] = useDrag({
    type: 'box',
    item: {
      color: props.color,
    },
    collect: (monitor) => {
      return {
        dragging: monitor.isDragging(),
      };
    },
  });

  useEffect(() => {
    drag(ref);
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: props.color || 'blue',
      }}
      className={clsx('w-[50px] h-[50px] m-[10px]', {
        'border-[5px] border-dashed box-border': dragging,
      })}
    ></div>
  );
}

interface ItemType {
  color: string;
}

function Container() {
  const ref = useRef<HTMLDivElement>(null!);
  const [boxes, setBoxes] = useState<ItemType[]>([]);

  const [, drop] = useDrop(() => {
    return {
      accept: 'box',
      drop: (item: ItemType) => {
        setBoxes((boxes) => [...boxes, item]);
      },
    };
  });

  useEffect(() => {
    drop(ref);
  }, []);

  return (
    <div ref={ref} className="w-[300px] h-[300px] border-blue-100 border border-solid">
      {boxes.map((item) => {
        return <Box color={item.color} key={item.color}></Box>;
      })}
    </div>
  );
}

const Demo1 = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Box color="red" />
      <Box color="green" />
      <Box color="yellow" />
      <Container />
      <DragLayer />
    </DndProvider>
  );
};

export default Demo1;
