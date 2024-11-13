import React from 'react';
import { Header } from './Header'; // 导入 Header 组件
import { ItemList } from './ItemList'; // 导入 ItemList 组件
import { useCook, type Data } from './useCook';

// 食材数据
const initialIngredientData: Data[] = [
  { name: '肥牛', amountPerPerson: 75, unit: 'g' },
  { name: '大葱', amountPerPerson: 50, unit: 'g' },
  { name: '生姜', amountPerPerson: 3 / 4, unit: '片', isFraction: true },
  { name: '郫县豆瓣酱', amountPerPerson: 2.5, unit: 'g' },
  { name: '小米椒', amountPerPerson: 3 / 4, unit: '个', isFraction: true },
  { name: '青线椒', amountPerPerson: 1 / 2, unit: '个', isFraction: true },
  { name: '食用油', amountPerPerson: 3.7, unit: 'g' },
];

// 调味汁数据
const initialSauceData: Data[] = [
  { name: '盐', amountPerPerson: 0.5, unit: 'g' },
  { name: '糖', amountPerPerson: 0.7, unit: 'g' },
  { name: '酱油', amountPerPerson: 3.7, unit: 'g' },
  { name: '醋', amountPerPerson: 1.7, unit: 'g' },
  { name: '白胡椒粉', custom: '根据自身口味添加' },
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
