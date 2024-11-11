import { create } from 'zustand';

type State = {
  firstName: string;
  lastName: string;
};

type Actions = {
  setFirstName: (firstName: State['firstName']) => void;
  setLastName: (lastName: State['lastName']) => void;
};

export const usePersonStore = create<State & Actions>()((set) => ({
  firstName: '',
  lastName: '',
  setFirstName: (firstName) => set((state) => ({ ...state, firstName })),
  setLastName: (lastName) => set(() => ({ lastName })),
}));
