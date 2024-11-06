import { create } from 'zustand';

type State = {
  bears: number;
};

export const useBearStore = create<State>(() => ({
  bears: 0,
}));
