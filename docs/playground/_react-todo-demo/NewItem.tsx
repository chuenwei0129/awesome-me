import React, { useEffect, useRef } from "react";
import { FC } from "react"

import clsx from "clsx"

import { useDrag } from "react-dnd";

interface NewItemProps {
  className?: string | string[]
}

export const NewItem: FC<NewItemProps> = (props) => {

  const ref = useRef<HTMLDivElement>(null);

  const [{ dragging }, drag] = useDrag({
    type: 'new-item',
    item: {},
    collect(monitor) {
      return {
        dragging: monitor.isDragging()
      }
    }
  });

  useEffect(() => {
    drag(ref);
  }, []);

  const cs = clsx(
    "h-[50px] border-2 border-black border-solid",
    "leading-[50px] text-center text-xl",
    "bg-green-300",
    "cursor-move select-none",
    dragging ? 'border-dashed bg-white' : '',
    props.className
  );

  return <div ref={ref} className={cs}>新的待办事项</div>
}
