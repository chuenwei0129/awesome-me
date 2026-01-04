import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';
import useLatest from './index';

describe('useLatest', () => {
  describe('基础功能', () => {
    it('应该返回包含最新值的 ref 对象', () => {
      const { result } = renderHook(() => useLatest('initial'));

      expect(result.current.current).toBe('initial');
    });

    it('当值更新时，ref.current 应该同步更新', () => {
      const { result, rerender } = renderHook(({ value }) => useLatest(value), {
        initialProps: { value: 'first' },
      });

      expect(result.current.current).toBe('first');

      rerender({ value: 'second' });
      expect(result.current.current).toBe('second');

      rerender({ value: 'third' });
      expect(result.current.current).toBe('third');
    });

    it('ref 对象引用应该在多次渲染中保持不变', () => {
      const { result, rerender } = renderHook(({ value }) => useLatest(value), {
        initialProps: { value: 1 },
      });

      const firstRef = result.current;

      rerender({ value: 2 });
      const secondRef = result.current;

      rerender({ value: 3 });
      const thirdRef = result.current;

      expect(firstRef).toBe(secondRef);
      expect(secondRef).toBe(thirdRef);
    });
  });

  describe('类型支持', () => {
    it('应该支持各种类型的值', () => {
      // 数字
      const { result: numResult } = renderHook(() => useLatest(42));
      expect(numResult.current.current).toBe(42);

      // 字符串
      const { result: strResult } = renderHook(() => useLatest('hello'));
      expect(strResult.current.current).toBe('hello');

      // 布尔值
      const { result: boolResult } = renderHook(() => useLatest(true));
      expect(boolResult.current.current).toBe(true);

      // 对象
      const obj = { a: 1 };
      const { result: objResult } = renderHook(() => useLatest(obj));
      expect(objResult.current.current).toBe(obj);

      // 数组
      const arr = [1, 2, 3];
      const { result: arrResult } = renderHook(() => useLatest(arr));
      expect(arrResult.current.current).toBe(arr);

      // 函数
      const fn = () => 'test';
      const { result: fnResult } = renderHook(() => useLatest(fn));
      expect(fnResult.current.current).toBe(fn);

      // null
      const { result: nullResult } = renderHook(() => useLatest(null));
      expect(nullResult.current.current).toBe(null);

      // undefined
      const { result: undefinedResult } = renderHook(() => useLatest(undefined));
      expect(undefinedResult.current.current).toBe(undefined);
    });
  });

  describe('闭包场景', () => {
    it('在异步回调中应该能访问到最新值', async () => {
      jest.useFakeTimers();

      const { result } = renderHook(() => {
        const [count, setCount] = useState(0);
        const latestCount = useLatest(count);

        return { count, setCount, latestCount };
      });

      // 初始值
      expect(result.current.latestCount.current).toBe(0);

      // 模拟异步场景：先获取 ref，再更新值
      const refBeforeUpdate = result.current.latestCount;

      // 更新 count
      act(() => {
        result.current.setCount(1);
      });
      act(() => {
        result.current.setCount(2);
      });
      act(() => {
        result.current.setCount(3);
      });

      // 通过之前获取的 ref 引用，应该能访问到最新值
      expect(refBeforeUpdate.current).toBe(3);
      expect(result.current.latestCount.current).toBe(3);

      jest.useRealTimers();
    });

    it('模拟 setTimeout 闭包陷阱场景', async () => {
      jest.useFakeTimers();

      let capturedValue: number | undefined;

      const { result } = renderHook(() => {
        const [count, setCount] = useState(0);
        const latestCount = useLatest(count);

        return { count, setCount, latestCount };
      });

      // 模拟点击时捕获 ref
      const latestRef = result.current.latestCount;

      // 模拟 setTimeout 回调
      setTimeout(() => {
        capturedValue = latestRef.current;
      }, 3000);

      // 在 setTimeout 执行前更新值
      act(() => {
        result.current.setCount(100);
      });

      // 快进时间
      jest.advanceTimersByTime(3000);

      // 应该拿到最新值，而非闭包捕获时的旧值
      expect(capturedValue).toBe(100);

      jest.useRealTimers();
    });
  });

  describe('边界情况', () => {
    it('初始值为 undefined 时应该正常工作', () => {
      const { result, rerender } = renderHook(
        ({ value }) => useLatest(value),
        { initialProps: { value: undefined as string | undefined } },
      );

      expect(result.current.current).toBeUndefined();

      rerender({ value: 'now defined' });
      expect(result.current.current).toBe('now defined');

      rerender({ value: undefined });
      expect(result.current.current).toBeUndefined();
    });

    it('快速连续更新时应该保持最新值', () => {
      const { result, rerender } = renderHook(({ value }) => useLatest(value), {
        initialProps: { value: 0 },
      });

      // 快速连续更新
      for (let i = 1; i <= 100; i++) {
        rerender({ value: i });
      }

      expect(result.current.current).toBe(100);
    });

    it('对象引用变化时应该更新', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };

      const { result, rerender } = renderHook(({ value }) => useLatest(value), {
        initialProps: { value: obj1 },
      });

      expect(result.current.current).toBe(obj1);

      rerender({ value: obj2 });
      expect(result.current.current).toBe(obj2);
      expect(result.current.current).not.toBe(obj1);
    });
  });
});
