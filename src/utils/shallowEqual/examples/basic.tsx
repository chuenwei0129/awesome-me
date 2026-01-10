/**
 * title: 基础用法
 * description: 演示 shallowEqual 对不同类型值的比较结果
 */
import React from 'react';
import shallowEqual from '..';

const examples = [
  // 原始值比较
  { a: 1, b: 1, label: '相同数字' },
  { a: 'hello', b: 'hello', label: '相同字符串' },
  { a: NaN, b: NaN, label: 'NaN vs NaN' },
  { a: +0, b: -0, label: '+0 vs -0' },

  // 对象比较
  { a: { x: 1 }, b: { x: 1 }, label: '相同结构对象' },
  { a: { x: 1 }, b: { x: 2 }, label: '不同值对象' },
  { a: { x: 1 }, b: { x: 1, y: 2 }, label: '不同键数量' },

  // 数组比较
  { a: [1, 2, 3], b: [1, 2, 3], label: '相同数组' },
  { a: [1, 2], b: [1, 2, 3], label: '不同长度数组' },

  // 嵌套对象（只比较第一层）
  { a: { nested: { x: 1 } }, b: { nested: { x: 1 } }, label: '嵌套对象（不同引用）' },
];

export default () => {
  return (
    <div style={{ fontFamily: 'monospace' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>场景</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>a</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>b</th>
            <th style={{ textAlign: 'left', padding: '8px' }}>结果</th>
          </tr>
        </thead>
        <tbody>
          {examples.map(({ a, b, label }, i) => {
            const result = shallowEqual(a, b);
            return (
              <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '8px' }}>{label}</td>
                <td style={{ padding: '8px', color: '#666' }}>
                  {JSON.stringify(a)}
                </td>
                <td style={{ padding: '8px', color: '#666' }}>
                  {JSON.stringify(b)}
                </td>
                <td
                  style={{
                    padding: '8px',
                    color: result ? '#52c41a' : '#ff4d4f',
                    fontWeight: 'bold',
                  }}
                >
                  {result ? 'true ✓' : 'false ✗'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
