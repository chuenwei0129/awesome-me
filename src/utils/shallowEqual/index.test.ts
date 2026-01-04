import shallowEqual from '.';

describe('shallowEqual', () => {
  describe('基本相等性', () => {
    it('相同引用返回 true', () => {
      const obj = { a: 1, b: 2 };
      expect(shallowEqual(obj, obj)).toBe(true);
    });

    it('空对象相等', () => {
      expect(shallowEqual({}, {})).toBe(true);
    });

    it('相同属性和值返回 true', () => {
      expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    });

    it('属性顺序不同但值相同返回 true', () => {
      expect(shallowEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    });
  });

  describe('不相等情况', () => {
    it('属性数量不同返回 false', () => {
      expect(shallowEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    });

    it('属性值不同返回 false', () => {
      expect(shallowEqual({ a: 1 }, { a: 2 })).toBe(false);
    });

    it('属性名不同返回 false', () => {
      expect(shallowEqual({ a: 1 }, { b: 1 })).toBe(false);
    });

    it('嵌套对象不进行深度比较', () => {
      const nested1 = { a: { b: 1 } };
      const nested2 = { a: { b: 1 } };
      expect(shallowEqual(nested1, nested2)).toBe(false);
    });

    it('数组引用不同返回 false', () => {
      expect(shallowEqual({ a: [1, 2] }, { a: [1, 2] })).toBe(false);
    });
  });

  describe('Object.is 语义', () => {
    it('NaN 与 NaN 相等', () => {
      expect(shallowEqual({ a: NaN }, { a: NaN })).toBe(true);
      expect(shallowEqual(NaN, NaN)).toBe(true);
    });

    it('+0 和 -0 不相等', () => {
      expect(shallowEqual({ a: +0 }, { a: -0 })).toBe(false);
      expect(shallowEqual(+0, -0)).toBe(false);
    });
  });

  describe('特殊值', () => {
    it('undefined 属性值', () => {
      expect(shallowEqual({ a: undefined }, { a: undefined })).toBe(true);
    });

    it('null 属性值', () => {
      expect(shallowEqual({ a: null }, { a: null })).toBe(true);
    });

    it('函数引用相同', () => {
      const fn = () => {};
      expect(shallowEqual({ a: fn }, { a: fn })).toBe(true);
    });

    it('函数引用不同', () => {
      expect(shallowEqual({ a: () => {} }, { a: () => {} })).toBe(false);
    });
  });

  describe('原始类型处理', () => {
    it('相同字符串返回 true', () => {
      expect(shallowEqual('hello', 'hello')).toBe(true);
    });

    it('不同字符串返回 false', () => {
      expect(shallowEqual('hello', 'world')).toBe(false);
    });

    it('相同数字返回 true', () => {
      expect(shallowEqual(42, 42)).toBe(true);
    });

    it('不同数字返回 false', () => {
      expect(shallowEqual(42, 43)).toBe(false);
    });

    it('相同布尔值返回 true', () => {
      expect(shallowEqual(true, true)).toBe(true);
      expect(shallowEqual(false, false)).toBe(true);
    });

    it('不同布尔值返回 false', () => {
      expect(shallowEqual(true, false)).toBe(false);
    });

    it('原始类型与对象返回 false', () => {
      expect(shallowEqual('hello', { a: 1 })).toBe(false);
      expect(shallowEqual(42, { a: 1 })).toBe(false);
    });
  });

  describe('null 和 undefined 处理', () => {
    it('null 与 null 返回 true', () => {
      expect(shallowEqual(null, null)).toBe(true);
    });

    it('undefined 与 undefined 返回 true', () => {
      expect(shallowEqual(undefined, undefined)).toBe(true);
    });

    it('null 与 undefined 返回 false', () => {
      expect(shallowEqual(null, undefined)).toBe(false);
    });

    it('null 与对象返回 false', () => {
      expect(shallowEqual(null, {})).toBe(false);
      expect(shallowEqual({}, null)).toBe(false);
    });

    it('undefined 与对象返回 false', () => {
      expect(shallowEqual(undefined, {})).toBe(false);
      expect(shallowEqual({}, undefined)).toBe(false);
    });
  });

  describe('数组处理', () => {
    it('相同引用数组返回 true', () => {
      const arr = [1, 2, 3];
      expect(shallowEqual(arr, arr)).toBe(true);
    });

    it('相同内容数组返回 true', () => {
      expect(shallowEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    });

    it('不同内容数组返回 false', () => {
      expect(shallowEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    });

    it('不同长度数组返回 false', () => {
      expect(shallowEqual([1, 2], [1, 2, 3])).toBe(false);
    });

    it('数组与类数组对象（相同 keys/values）返回 true', () => {
      // shallowEqual 只比较 keys 和 values，不区分数组和对象
      expect(shallowEqual([1, 2], { 0: 1, 1: 2 })).toBe(true);
    });
  });
});
