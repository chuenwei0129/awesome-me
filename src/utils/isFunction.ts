/**
 * 检查传入的参数是否为函数
 * @param value 需要检查的值
 * @returns 如果值是函数则返回 true，否则返回 false
 */

const isFunction = <T extends (...args: any[]) => any>(value: any): value is T => {
  return typeof value === 'function';
};

export default isFunction;
