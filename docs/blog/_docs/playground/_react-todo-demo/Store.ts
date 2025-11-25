import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface ListItem {
  id: string;
  status: 'todo' | 'done';
  content: string;
}

type State = {
  list: Array<ListItem>;
};

type Action = {
  addItem: (item: ListItem, id?: string) => void;
  deleteItem: (id: string) => void;
  updateItem: (item: ListItem) => void;
};

export const useTodoListStore = create<State & Action>()(
  devtools(
    persist(
      (set) => ({
        list: [],
        addItem: (item, id) => {
          set((state) => {
            if (!id) {
              return {
                list: [...state.list, item],
              };
            }
            const newList = [...state.list];
            const index = newList.findIndex((item) => item.id === id);
            newList.splice(index, 0, item);
            return {
              list: newList,
            };
          });
        },
        deleteItem: (id) => {
          set((state) => {
            return {
              list: state.list.filter((item) => {
                return item.id !== id;
              }),
            };
          });
        },
        updateItem: (updateItem) => {
          set((state) => {
            return {
              list: state.list.map((item) => {
                if (item.id === updateItem.id) {
                  return updateItem;
                }
                return item;
              }),
            };
          });
        },
      }),
      {
        name: 'todo-list',
      },
    ),
  ),
);
