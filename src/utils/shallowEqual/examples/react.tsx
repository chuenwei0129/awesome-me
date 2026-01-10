/**
 * title: React 性能优化场景
 * description: 使用 shallowEqual 避免不必要的重渲染
 */
import React, { useState, useRef, memo } from 'react';
import shallowEqual from '..';

// 使用 shallowEqual 自定义 memo 比较函数
const UserCard = memo(
  ({ user }: { user: { name: string; age: number } }) => {
    const renderCount = useRef(0);
    renderCount.current += 1;

    return (
      <div
        style={{
          padding: '12px',
          border: '1px solid #d9d9d9',
          borderRadius: '4px',
          marginBottom: '8px',
        }}
      >
        <div>
          👤 {user.name}, {user.age} 岁
        </div>
        <div style={{ fontSize: '12px', color: '#999' }}>
          渲染次数: {renderCount.current}
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => shallowEqual(prevProps.user, nextProps.user),
);

export default () => {
  const [user, setUser] = useState({ name: '张三', age: 25 });
  const [count, setCount] = useState(0);

  return (
    <div>
      <UserCard user={user} />

      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        <button
          type="button"
          onClick={() => setUser({ name: '张三', age: 25 })}
          style={{ padding: '4px 12px' }}
        >
          设置相同数据（不会重渲染）
        </button>

        <button
          type="button"
          onClick={() => setUser({ name: '李四', age: 30 })}
          style={{ padding: '4px 12px' }}
        >
          设置不同数据（会重渲染）
        </button>

        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          style={{ padding: '4px 12px' }}
        >
          更新其他状态 ({count})
        </button>
      </div>

      <div
        style={{ marginTop: '12px', padding: '8px', background: '#f5f5f5', fontSize: '13px' }}
      >
        💡 点击「设置相同数据」时，虽然创建了新对象，但 shallowEqual
        判断内容相同，组件不会重新渲染。
      </div>
    </div>
  );
};
