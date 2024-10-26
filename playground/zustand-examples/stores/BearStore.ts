import { create } from 'zustand';

interface State {
  bears: number;
}

interface Actions {
  increaseBear: () => void;
  removeAllBears: () => void;
}

export const useBearStore = create<State & Actions>((set) => ({
  bears: 0,
  increaseBear: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set(() => ({ bears: 0 })),
}));
