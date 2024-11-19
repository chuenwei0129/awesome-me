import React from 'react';
import { useSetState } from 'naifu';

interface ShoppingList {
  drinks: string;
  snacks: string;
  [key: string]: any;
}

const PartyPrep = () => {
  const [shoppingList, setShoppingList] = useSetState<ShoppingList>({
    drinks: '',
    snacks: '',
  });

  return (
    <div>
      <pre>{JSON.stringify(shoppingList, null, 2)}</pre>
      <p>
        <button type="button" onClick={() => setShoppingList({ drinks: 'Coke' })}>
          Add Drinks
        </button>
        <button type="button" onClick={() => setShoppingList({ snacks: 'Chips' })} style={{ margin: '0 8px' }}>
          Add Snacks
        </button>
        <button type="button" onClick={() => setShoppingList({ fruits: 'Apple' })}>
          Add Fruits
        </button>
      </p>
    </div>
  );
};

export default PartyPrep;
