下面是我的博客的一篇未完成的文章主要是讲【业务中是怎么写 hooks 的，正好可以结合这个小组件，来具体讲一讲。】请你根据代码来分析一下，我该如何重构这篇文章。

---
group:
  title: 2024 🐲
  order: -2024
title: 看菜谱学技术
toc: content
---

## 原始需求

这段时间在整理自己的博客，在编辑修改[《快手菜分享》](./2024__share-cook.md)这篇文章，找菜谱的时在懒饭 App
里发现了个有趣的小控件，代码如下：

```tsx
// demo2.tsx
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

```

```tsx
// demo1.tsx
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
```

```ts
// useCook.ts
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
```

```tsx
// Header.tsx
import React from 'react';

// 定义 Header 组件的属性类型
type HeaderProps = {
  numberOfPeople: number; // 记录人数
  increment: () => void; // 增加人数的回调函数
  decrement: () => void; // 减少人数的回调函数
};

// 定义并导出 Header 组件，使用 React.FC 类型
export const Header: React.FC<HeaderProps> = ({ numberOfPeople, increment, decrement }) => (
  <section>
    <h2>用料</h2>
    <p>{numberOfPeople} 人份</p>
    <button type="button" onClick={decrement}>
      -
    </button>
    <button type="button" onClick={increment}>
      +
    </button>
  </section>
);
```

```tsx
// ItemList.tsx
import React from 'react';
import { MixedFraction, toMixedFraction } from './MixedFraction'; // 导入MixedFraction组件和toMixedFraction函数

// 定义ItemList组件的属性类型
type ItemListProps = {
  items: {
    name: string; // 项目名称
    amount?: number | string; // 数量，可以是数字或者字符串
    unit?: string; // 单位
    custom?: string; // 自定义的显示内容
    isFraction?: boolean; // 是否以分数的形式显示数量
  }[];
  title: string; // 列表的标题
};

// 定义并导出ItemList组件
export const ItemList: React.FC<ItemListProps> = ({ items, title }) => (
  <section>
    <h2>{title}</h2> {/* 显示列表的标题 */}
    <ul>
      {items.map(({ name, amount, unit, custom, isFraction }) => (
        <li key={name}>
          {/* 显示项目名称，和数量（如果isFraction为true且amount是数字，则将amount转换为MixedFraction组件显示） */}
          {name}：{isFraction && typeof amount === 'number' ? <MixedFraction {...toMixedFraction(amount)} /> : amount || custom} {unit ?? unit}
        </li>
      ))}
    </ul>
  </section>
);
```

```tsx
// MixedFraction.tsx
import React from 'react';

// 将小数转换为带分数的函数
export const toMixedFraction = (decimal: number): { whole: number; numerator: number; denominator: number } => {
  // 定义计算最大公约数的函数
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  // 取整部分
  const whole = Math.floor(decimal);
  // 取小数部分
  const fraction = decimal - whole;

  // 如果没有小数部分，直接返回整数
  if (fraction === 0) {
    return { whole, numerator: 0, denominator: 1 };
  }

  // 计算小数部分的长度
  const len = fraction.toString().split('.')[1].length;
  // 确定分母
  const denominator = Math.pow(10, len);
  // 确定分子
  const numerator = Math.round(fraction * denominator);

  // 计算最大公约数
  const divisor = gcd(numerator, denominator);

  // 将分子和分母化简
  const numeratorSimplified = numerator / divisor;
  const denominatorSimplified = denominator / divisor;

  // 返回带分数形式
  return { whole, numerator: numeratorSimplified, denominator: denominatorSimplified };
};

// 定义 MixedFraction 组件的属性接口
interface MixedFractionProps {
  whole: number;
  numerator: number;
  denominator: number;
}

// 定义 MixedFraction 组件，用于显示带分数
export const MixedFraction: React.FC<MixedFractionProps> = ({ whole, numerator, denominator }) => (
  <span>
    {whole > 0 && `${whole} `}
    {numerator > 0 && (
      <>
        <sup>{numerator}</sup>&frasl;<sub>{denominator}</sub>
      </>
    )}
  </span>
);
```

看着挺有趣的，也简单，可说道的也很多，正好前段时间面试，面试官有问平时业务中是怎么写 hooks 的，正好可以结合这个小组件，来具体讲一讲。

## 分析

> todo
