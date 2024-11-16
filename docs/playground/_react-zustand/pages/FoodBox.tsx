import React from 'react';
import { addOneFish, removeAllFish, removeOneFish, useFoodStore } from '../stores/foodStore';

export default function FoodBox() {
  const fish = useFoodStore((state) => state.fish); // reactive
  // const fish = useFoodStore.getState().fish; // non-reactive

  // 数据行为分离
  const add5Fish = () => {
    useFoodStore.setState((state) => ({
      fish: state.fish + 5,
    }));
  };
  return (
    <div className="box">
      <h1>Food Box</h1>
      <p>fish: {fish}</p>
      <div>
        <button onClick={addOneFish}>add one fish</button>
        <button onClick={removeOneFish}>remove one fish</button>
        <button onClick={removeAllFish}>remove all fish</button>

        <button onClick={add5Fish}>add 5 fish</button>
      </div>
    </div>
  );
}
