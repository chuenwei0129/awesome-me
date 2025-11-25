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
