import React, { FC } from "react";

import { animated, useTransition } from "@react-spring/web";

import clsx from "clsx"

import { Item } from './ListItem'
import { Gap } from './ListGap'
import { useTodoListStore } from "./Store";

interface ListProps {
  className?: string | string[]
}

export const List: FC<ListProps> = (props) => {

  const list = useTodoListStore(state => state.list);

  const transitions = useTransition(list, {
    from: { transform: 'translate3d(100%,0,0)', opacity: 0 },
    enter: { transform: 'translate3d(0%,0,0)', opacity: 1 },
    leave: { transform: 'translate3d(-100%,0,0)', opacity: 0 },
    keys: list.map(item => item.id)
  });

  const cs = clsx(
    "h-[calc(100%-4px)] border-2 border-black border-solid overflow-auto",
    props.className
  );

  return <div className={cs}>
    {
      list.length ? transitions(((style, item) => {
        return <animated.div style={style}>
          <Gap id={item.id} />
          <Item data={item} />
        </animated.div>
      })) : '暂无待办事项'
    }
    {/* 拖拽入口 */}
    <Gap />
  </div>
}


