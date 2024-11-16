import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface CatState {
  cats: {
    bigCats: number;
    smallCats: number;
  };
  increaseBigCats: () => void;
  increaseSmallCats: () => void;
  summary: () => void;
}

export const useCatStore = create<CatState>()(
  immer(
    devtools(
      persist(
        (set, get) => ({
          cats: {
            bigCats: 0,
            smallCats: 0,
          },
          increaseBigCats: () =>
            set((state) => {
              state.cats.bigCats += 1;
            }),
          increaseSmallCats: () =>
            set((state) => ({
              cats: {
                ...state.cats,
                smallCats: state.cats.smallCats + 1,
              },
            })),
          summary: () => {
            return get().cats.bigCats + get().cats.smallCats;
          },
        }),
        {
          name: 'cat-store',
          // 持久化
          storage: createJSONStorage(() => sessionStorage),
          partialize: (state) => ({ bigCats: state.cats.bigCats }),
        },
      ),
      {
        name: 'cat-store',
      },
    ),
  ),
);
