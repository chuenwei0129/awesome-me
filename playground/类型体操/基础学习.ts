const getPropValue = <
  Obj extends Record<string, unknown>,
  Key extends keyof Obj,
>(
  obj: Obj,
  key: Key,
): Obj[Key] => {
  return obj[key];
};

console.log(getPropValue({ name: 'John', age: 30 }, 'name')); // John
