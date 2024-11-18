import React, { createContext, useContext, useEffect, FC, ReactNode } from 'react';
import { createStore, StoreApi } from 'zustand';
import { useStore as useZustandStore } from 'zustand';

// 定义 Store 的状态和 actions 的接口
type StoreState = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

interface InitialProps {
  initialCount: number;
}

// 创建一个可以接受初始化参数的 Zustand store
const createCountStore = (initialProps: InitialProps): StoreApi<StoreState> => createStore<StoreState>((set) => ({
  count: initialProps.initialCount || 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}));

// 创建 Store Context
const StoreContext = createContext<StoreApi<StoreState> | null>(null);

// 定义 StoreProvider 组件的 Props 类型
interface StoreProviderProps {
  children: ReactNode;
  initialProps: InitialProps;
}

// 创建 StoreProvider 组件
const StoreProvider: FC<StoreProviderProps> = ({ children, initialProps }) => {
  // const store = React.useMemo(() => createCountStore(initialProps), [initialProps]);
  // eslint-disable-next-line react-compiler/react-compiler
  const store = React.useRef(createCountStore(initialProps)).current;

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

// 自定义 Hook 以简化 StoreContext 的使用
const useStore: <T>(selector: (state: StoreState) => T) => T = (selector) => {
  const context = useContext(StoreContext);

  if (context === null) {
    throw new Error('useStore must be used within a StoreProvider');
  }

  return useZustandStore(context, selector);
};

const Counter: FC = () => {
  const count = useStore((state) => state.count);
  const increment = useStore((state) => state.increment);
  const decrement = useStore((state) => state.decrement);

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
