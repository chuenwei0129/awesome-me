// 嵌套对象类型声明
export type NestedObject = { [key: string]: any };

// 帮助函数，根据路径设置嵌套对象的值
const helper = (result: NestedObject, path: string[], value: any) => {
  const [key, ...rest] = path;
  if (rest.length === 0) {
    result[key] = value;
  } else {
    if (!result[key]) {
      result[key] = {};
    }
    helper(result[key], rest, value);
  }
};

// transform 函数，将点表示法的键转为嵌套对象
export function transform(obj: { [key: string]: number }): NestedObject {
  const result: NestedObject = {};
  for (const [key, value] of Object.entries(obj)) {
    helper(result, key.split('.'), value);
  }
  return result;
}
