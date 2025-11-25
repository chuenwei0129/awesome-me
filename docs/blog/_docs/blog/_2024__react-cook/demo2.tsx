import React from 'react';
import { Header } from './Header'; // 导入 Header 组件
import { ItemList } from './ItemList'; // 导入 ItemList 组件
import { useCook, type Data } from './useCook';

const initialIngredientData: Data[] = [
  { name: '火腿肠', amountPerPerson: 3 / 4, unit: '根', isFraction: true },
  { name: '平菇', amountPerPerson: 75, unit: 'g' },
  { name: '蒜末', amountPerPerson: 1, unit: 'g' },
  { name: '小葱段', amountPerPerson: 1 / 4, unit: '根', isFraction: true },
  { name: '干辣椒', amountPerPerson: 1.25, unit: '个', isFraction: true },
  { name: '食用油', custom: '适量' },
];

// 调味汁数据
const initialSauceData: Data[] = [
  { name: '孜然粉', amountPerPerson: 1.2, unit: 'g' },
  { name: '辣椒粉', amountPerPerson: 1, unit: 'g' },
  { name: '生抽', amountPerPerson: 3.7, unit: 'g' },
  { name: '蚝油', amountPerPerson: 2, unit: 'g' },
  { name: '白糖', amountPerPerson: 0.5, unit: 'g' },
  { name: '盐', amountPerPerson: 0.2, unit: 'g' },
];

const App: React.FC = () => {
  const { numberOfPeople, increment, decrement, sauceData, ingredientData } = useCook(initialIngredientData, initialSauceData);
  return (
    <div>
      <Header numberOfPeople={numberOfPeople} increment={increment} decrement={decrement} />
      <ItemList title="食材" items={ingredientData} />
      <ItemList title="调味汁" items={sauceData} />
    </div>
  );
};

export default App;
