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
