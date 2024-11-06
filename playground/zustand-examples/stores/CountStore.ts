import { create } from 'zustand';

type State = {
  count: number;
};

type Actions = {
  increment: () => void;
  decrement: () => void;
  updateCount: (
    countCallback: (count: State['count']) => State['count'],
  ) => void;
};

export const useCountStore = create<State & Actions>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  updateCount: (countCallback) =>
    set((state) => ({ count: countCallback(state.count) })),
}));
