/**
 * title: 常见误用示例
 * description: 了解 shallowEqual 的局限性，避免踩坑
 */
import React from 'react';
import shallowEqual from '..';

interface PitfallExample {
  title: string;
  description: string;
  a: unknown;
  b: unknown;
  expected: string;
}

const pitfalls: PitfallExample[] = [
  {
    title: '❌ 嵌套对象',
    description: '只比较第一层，嵌套对象按引用比较',
    a: { user: { name: '张三' } },
    b: { user: { name: '张三' } },
    expected: '期望 true，实际 false',
  },
  {
    title: '❌ Date 对象',
    description: 'Date 没有可枚举属性，任意两个 Date 都相等',
    a: new Date('2024-01-01'),
    b: new Date('2099-12-31'),
    expected: '期望 false，实际 true',
  },
  {
    title: '❌ Map/Set',
    description: '内部数据不是可枚举属性',
    a: new Map([['a', 1]]),
    b: new Map([['b', 2]]),
    expected: '期望 false，实际 true',
  },
  {
    title: '❌ 数组 vs 类数组对象',
    description: '只比较可枚举的索引键',
    a: [1, 2],
    b: { 0: 1, 1: 2 },
    expected: '可能不符合预期',
  },
  {
    title: '✅ 相同引用的嵌套对象',
    description: '引用相同时，浅比较有效',
    a: (() => {
      const nested = { name: '张三' };
      return { user: nested };
    })(),
    b: (() => {
      const nested = { name: '张三' };
      return { user: nested };
    })(),
    expected: '引用不同，返回 false',
  },
];

const formatValue = (val: unknown): string => {
  if (val instanceof Date) return `Date("${val.toISOString().split('T')[0]}")`;
  if (val instanceof Map) return `Map(${JSON.stringify(Array.from(val.entries()))})`;
  if (val instanceof Set) return `Set(${JSON.stringify(Array.from(val))})`;
  return JSON.stringify(val);
};

export default () => {
  return (
    <div style={{ fontFamily: 'system-ui' }}>
      {pitfalls.map((item, i) => {
        const result = shallowEqual(item.a, item.b);
        return (
          <div
            key={i}
            style={{
              padding: '12px',
              marginBottom: '8px',
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              background: item.title.startsWith('✅') ? '#f6ffed' : '#fff2f0',
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>
              {item.description}
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
              <div>a: {formatValue(item.a)}</div>
              <div>b: {formatValue(item.b)}</div>
              <div style={{ marginTop: '4px' }}>
                shallowEqual(a, b) ={' '}
                <span style={{ fontWeight: 'bold', color: result ? '#52c41a' : '#ff4d4f' }}>
                  {String(result)}
                </span>
              </div>
              <div style={{ color: '#999', fontSize: '11px', marginTop: '2px' }}>
                {item.expected}
              </div>
            </div>
          </div>
        );
      })}

      <div style={{ marginTop: '16px', padding: '12px', background: '#e6f7ff', borderRadius: '4px' }}>
        <strong>💡 建议：</strong>
        <ul style={{ margin: '8px 0 0', paddingLeft: '20px', fontSize: '13px' }}>
          <li>对于 Date/Map/Set，使用专门的比较函数</li>
          <li>对于深层嵌套数据，考虑使用 deepEqual 或 Immer</li>
          <li>保持数据结构扁平化，让 shallowEqual 发挥最佳效果</li>
        </ul>
      </div>
    </div>
  );
};
