import React, { useState } from "react";
import { useEffect, useRef } from "react";

import clsx from "clsx";
import { useDrag } from "react-dnd";
import { ListItem, useTodoListStore } from "./Store";

interface ItemProps {
  data: ListItem
}

export function Item(props: ItemProps) {

  const ref = useRef<HTMLDivElement>(null);
  const { data } = props

  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(data.content)

  const updateItem = useTodoListStore(s => s.updateItem)


  const [{ dragging }, drag] = useDrag({
    type: 'list-item',
    item: {
      id: data.id
    },
    collect(monitor) {
      return {
        dragging: monitor.isDragging()
      }
    }
  });

  useEffect(() => {
    drag(ref);
  }, []);

  return <div ref={ref} className={clsx(
    "h-[30px] border-2 border-black border-solid bg-blue-300 p-[10px] mx-[10px]",
    "flex justify-start items-center",
    "text-xl tracking-wide",
    dragging ? 'bg-white border-dashed' : ''
  )}
    onDoubleClick={() => {
      setEditing(true)
    }}
  >
    <input type="checkbox" className="w-[20px] h-[20px] mr-[10px]"
      checked={data.status === 'done' ? true : false}
      onChange={(e) => {
        updateItem({
          ...data,
          status: e.target.checked ? 'done' : 'todo'
        })
      }}
    />
    <p>{
      !editing ? data.content :
        <input type="text" value={content} onChange={(e) => {
          setContent(e.target.value)
        }}
          onBlur={() => {
            setEditing(false)
            updateItem({
              ...data,
              content
            })
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setEditing(false)
              updateItem({
                ...data,
                content
              })
            }
          }}
          autoFocus
        />
    }</p>
  </div>
}
