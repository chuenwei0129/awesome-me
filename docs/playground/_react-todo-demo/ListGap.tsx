import React from "react";
import { useEffect, useRef } from "react";

import { useDrop } from "react-dnd";
import clsx from "clsx";
import { v4 as uuid } from 'uuid';

import { useTodoListStore } from "./Store";

interface GapProps {
  id?: string
}

export function Gap(props: GapProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { id } = props

  const addItem = useTodoListStore(state => state.addItem);

  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: 'new-item',
      drop() {
        addItem({
          id: uuid(),
          status: 'todo',
          content: '✍️ 双击编辑'
        }, id);
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
    "h-[10px] mx-[10px]",
    isOver ? 'bg-red-300' : ''
  );

  return <div ref={ref} className={cs}></div>
}
