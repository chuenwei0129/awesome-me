import React, { FC, useEffect, useRef } from "react"

import { useDrop } from "react-dnd";
import { useTodoListStore } from "./Store";

import clsx from "clsx"

interface GarbageBinProps {
  className?: string | string[]
}

export const GarbageBin: FC<GarbageBinProps> = (props) => {

  const ref = useRef<HTMLDivElement>(null);

  const deleteItem = useTodoListStore(s => s.deleteItem)

  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: 'list-item',
      drop(item: { id: string }) {
        deleteItem(item.id)
      },
      collect(monitor) {
        return {
          isOver: monitor.isOver()
        }
      }
    }
  });

  useEffect(() => {
    drop(ref);
  }, []);


  const cs = clsx(
    "h-[150px] border-2 border-black border-solid",
    "bg-orange-300",
    "leading-[150px] text-center text-2xl",
    "cursor-move select-none",
    isOver ? "bg-yellow-400 border-dashed" : "",
    props.className
  );

  return <div ref={ref} className={cs}>垃圾箱 🗑️</div>
}
