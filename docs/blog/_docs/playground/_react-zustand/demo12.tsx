import React, { createContext, useContext, useState, FC, ReactNode } from 'react';
import { create } from 'zustand';

// 定义 Store 的状态和动作接口
interface StoreState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

interface InitialProps {
  initialCount: number;
}

// 创建一个可以接受初始化参数的 Zustand store
const createStore = (initialProps: InitialProps) => create<StoreState>((set) => ({
  count: initialProps.initialCount || 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));

// 在需要依赖注入的情况下，比如一个 store 需要用来自组件的 props 进行初始化，建议使用带有 React.context 的原始 store。
// 创建 Store Context
const StoreContext = createContext<ReturnType<typeof createStore> | null>(null);

// 定义 StoreProvider 组件的 Props 类型
interface StoreProviderProps {
  children: ReactNode;
  initialProps: InitialProps;
}

// 创建 StoreProvider 组件
export const StoreProvider: FC<StoreProviderProps> = ({ children, initialProps }) => {
  const [store] = useState(() => createStore(initialProps));

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

// 自定义 Hook 以简化 StoreContext 的使用
export const useStore = () => {
  const context = useContext(StoreContext);

  if (context === null) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return context;
};

// 主应用组件
// 惰性初始化 store 的示例
const Counter: FC = () => {
  const store = useStore();

  // 从 store 中解构出需要的状态和动作
  const { count, increment, decrement } = store();

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

const App: FC = () => {
  const initialProps: InitialProps = { initialCount: 5 };

  return (
    <StoreProvider initialProps={initialProps}>
      <Counter />
    </StoreProvider>
  );
};

export default App;
