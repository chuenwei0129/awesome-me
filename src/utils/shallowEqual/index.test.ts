import shallowEqual from '.';

describe('shallowEqual', () => {
  describe('SameValue 语义', () => {
    it('NaN 等于 NaN', () => {
      expect(shallowEqual(NaN, NaN)).toBe(true);
    });

    it('+0 和 -0 不相等', () => {
      expect(shallowEqual(+0, -0)).toBe(false);
    });
  });

  describe('原始值', () => {
    it('相同的原始值相等', () => {
      expect(shallowEqual(1, 1)).toBe(true);
      expect(shallowEqual('a', 'a')).toBe(true);
      expect(shallowEqual(true, true)).toBe(true);
      expect(shallowEqual(undefined, undefined)).toBe(true);
      expect(shallowEqual(null, null)).toBe(true);
    });

    it('不同的原始值不相等', () => {
      expect(shallowEqual(1, 2)).toBe(false);
      expect(shallowEqual('a', 'b')).toBe(false);
      expect(shallowEqual(null, undefined)).toBe(false);
    });

    it('原始值与对象不相等', () => {
      expect(shallowEqual(1, {})).toBe(false);
      expect(shallowEqual(null, {})).toBe(false);
      expect(shallowEqual({}, null)).toBe(false);
      expect(shallowEqual(undefined, {})).toBe(false);
    });
  });

  describe('对象', () => {
    it('相同引用相等', () => {
      const obj = { a: 1 };
      expect(shallowEqual(obj, obj)).toBe(true);
    });

    it('相同键值对相等', () => {
      expect(shallowEqual({ a: 1 }, { a: 1 })).toBe(true);
    });

    it('空对象相等', () => {
      expect(shallowEqual({}, {})).toBe(true);
    });

    it('不同键不相等', () => {
      expect(shallowEqual({ a: 1 }, { b: 1 })).toBe(false);
    });

    it('键数量不同不相等', () => {
      expect(shallowEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
      expect(shallowEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });

    it('嵌套对象按引用比较', () => {
      expect(shallowEqual({ a: { x: 1 } }, { a: { x: 1 } })).toBe(false);
      const nested = { x: 1 };
      expect(shallowEqual({ a: nested }, { a: nested })).toBe(true);
    });

    it('不同原型但相同自有属性相等', () => {
      const a = Object.create(null);
      a.x = 1;
      const b = { x: 1 };
      expect(shallowEqual(a, b)).toBe(true);
    });

    it('函数按引用比较', () => {
      const fn = () => {};
      expect(shallowEqual({ a: fn }, { a: fn })).toBe(true);
      expect(shallowEqual({ a: () => {} }, { a: () => {} })).toBe(false);
    });

    it('Symbol 键被忽略（只比较可枚举字符串键）', () => {
      const sym = Symbol('test');
      const a = { x: 1, [sym]: 2 };
      const b = { x: 1, [sym]: 3 };
      expect(shallowEqual(a, b)).toBe(true);
    });
  });

  describe('数组', () => {
    it('相同内容的数组相等', () => {
      expect(shallowEqual([1, 2], [1, 2])).toBe(true);
    });

    it('空数组相等', () => {
      expect(shallowEqual([], [])).toBe(true);
    });

    it('不同内容的数组不相等', () => {
      expect(shallowEqual([1, 2], [1, 3])).toBe(false);
    });

    it('不同长度的数组不相等', () => {
      expect(shallowEqual([1, 2], [1, 2, 3])).toBe(false);
      expect(shallowEqual([1], [])).toBe(false);
    });

    it('数组与类数组对象相等', () => {
      expect(shallowEqual([1, 2], { 0: 1, 1: 2 })).toBe(true);
    });

    it('稀疏数组', () => {
      // eslint-disable-next-line no-sparse-arrays
      expect(shallowEqual([1, , 3], [1, , 3])).toBe(true);
      // eslint-disable-next-line no-sparse-arrays
      expect(shallowEqual([1, , 3], [1, undefined, 3])).toBe(false);
    });
  });

  describe('特殊对象（已知限制）', () => {
    it('Date 对象没有可枚举属性，会被认为相等', () => {
      const date = new Date('2024-01-01');
      expect(shallowEqual(date, date)).toBe(true);
      // ⚠️ 已知限制：不同的 Date 实例如果没有自有可枚举属性会被认为相等
      expect(shallowEqual(new Date('2024-01-01'), new Date('2025-12-31'))).toBe(
        true,
      );
    });

    it('RegExp 对象没有可枚举属性，会被认为相等', () => {
      const regex = /test/;
      expect(shallowEqual(regex, regex)).toBe(true);
      // ⚠️ 已知限制：不同的 RegExp 实例如果没有自有可枚举属性会被认为相等
      expect(shallowEqual(/test/, /different/)).toBe(true);
    });

    it('Map 和 Set 对象没有可枚举属性，会被认为相等', () => {
      // ⚠️ 已知限制：Map/Set 实例如果没有自有可枚举属性会被认为相等
      expect(shallowEqual(new Map(), new Map([['a', 1]]))).toBe(true);
      expect(shallowEqual(new Set(), new Set([1, 2, 3]))).toBe(true);
    });
  });
});
