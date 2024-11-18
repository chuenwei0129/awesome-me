import React from "react";

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import clsx from "clsx";

import { NewItem } from "./NewItem";
import { GarbageBin } from "./GarbageBin";
import { List } from "./List";

const TodoList = () => {
  return <div className="h-[50vh] m-auto p-[10px] border-2 border-black border-solid flex justify-between items-start gap-[10px]">
    <div className="flex-[2] h-full">
      <List />
    </div>
    <div className={
      clsx("flex-1 h-full", "flex flex-col justify-start")
    }>
      <NewItem />
      <GarbageBin className={"mt-[20px]"} />
    </div>
  </div>
}

export default () => (
  <DndProvider backend={HTML5Backend}>
    <TodoList />
  </DndProvider>
)
