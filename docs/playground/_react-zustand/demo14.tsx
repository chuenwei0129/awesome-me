import React from 'react';
import { create, StateCreator } from 'zustand';

// Define the Fish state types
interface FishState {
  fishes: number;
  addFish: () => void;
}

// Define the Bear state types
interface BearState {
  bears: number;
  addBear: () => void;
  eatFish: () => void;
}

// Define the combined state type
type CombinedState = FishState & BearState;

// First store slice: Fish
const createFishSlice: StateCreator<
  CombinedState,
  [],
  [],
  FishState
> = (set) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});

// Second store slice: Bear
const createBearSlice: StateCreator<
  CombinedState,
  [],
  [],
  BearState
> = (set) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({
    ...state,
    fishes: state.fishes > 0 ? state.fishes - 1 : 0,
  })),
});

// Function to create both bear and fish
const createBearFishSlice: StateCreator<
  CombinedState,
  [],
  [],
  { addBearAndFish: () => void }
> = (...args) => ({
  addBearAndFish: () => {
    const bearActions = createBearSlice(...args);
    const fishActions = createFishSlice(...args);
    bearActions.addBear();
    fishActions.addFish();
  },
});

// Combine all slices into one store
const useBoundStore = create<CombinedState & { addBearAndFish: () => void }>(
  (...args) => ({
    ...createBearSlice(...args),
    ...createFishSlice(...args),
    ...createBearFishSlice(...args),
  })
);

const App: React.FC = () => {
  const bears = useBoundStore((state) => state.bears);
  const fishes = useBoundStore((state) => state.fishes);
  const addBear = useBoundStore((state) => state.addBear);
  const addFish = useBoundStore((state) => state.addFish);
  const addBearAndFish = useBoundStore((state) => state.addBearAndFish);

  return (
    <div>
      <h2>Number of bears: {bears}</h2>
      <h2>Number of fishes: {fishes}</h2>
      <button onClick={() => addBear()}>Add a bear</button>
      <button onClick={() => addFish()}>Add a fish</button>
      <button onClick={() => addBearAndFish()}>Add a bear and a fish</button>
    </div>
  );
};

export default App;
