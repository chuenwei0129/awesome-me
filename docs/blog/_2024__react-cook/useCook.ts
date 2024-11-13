import React from 'react';

// 格式化金额，如果是整数则直接转换为字符串，如果是小数则保留一位小数
const formatAmount = (amount: number) => {
  return amount % 1 === 0 ? amount.toString() : amount.toFixed(1);
};

// 将人数转换为一个特定的计数值
const convertPeopleToCount = (numOfPeople: number) => numOfPeople * 2 - 1;

// 定义数据类型
export type Data = {
  name: string;
  amountPerPerson?: number;
  unit?: string;
  isFraction?: boolean;
  custom?: string;
};

export const useCook = (initialIngredientData: Data[], initialSauceData: Data[], initialNumberOfPeople = 2, maxNumOfPeople = 10, minNumPeople = 0.5) => {
  const [count, setCount] = React.useState<number>(convertPeopleToCount(initialNumberOfPeople));

  // 增加人数
  const increment = () => setCount((prevCount) => (prevCount < convertPeopleToCount(maxNumOfPeople) ? prevCount + 1 : prevCount));

  // 减少人数
  const decrement = () => setCount((prevCount) => (prevCount > convertPeopleToCount(minNumPeople) ? prevCount - 1 : prevCount));

  // 当前人数，从计数值转换回来
  const numberOfPeople = (count + 1) * 0.5;

  // 格式化食材数据
  const formatData = (data: Data[]) =>
    data.map(({ name, amountPerPerson, unit, isFraction, custom }) => ({
      name,
      amount: isFraction ? amountPerPerson! * (count + 1) : amountPerPerson ? formatAmount(amountPerPerson * (count + 1)) : custom,
      unit,
      isFraction,
      custom,
    }));

  // 食材数据
  const ingredientData = formatData(initialIngredientData);

  // 酱料数据
  const sauceData = formatData(initialSauceData);

  return {
    sauceData,
    ingredientData,
    increment,
    decrement,
    numberOfPeople,
  };
};
