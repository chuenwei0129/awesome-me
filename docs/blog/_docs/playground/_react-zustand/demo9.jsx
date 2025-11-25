import { create } from 'zustand';

// 自定义中间件，用于增强状态管理，实现撤销和重做功能
const undoRedoMiddleware = (config) => (set, get, api) => {
  let history = {
    past: [],
    present: config(() => {
      console.log('🚀 ~ present:config ~ replace:', replace);
      console.log('🚀 ~ present:config ~ partialState:', partialState);
      // 在设置新状态之前记录当前状态
      const currentState = get();
      history.past.push(currentState);

      set(partialState, replace);

      // 清空未来历史记录
      history.future = [];
    }),
    future: [],
  };

  return {
    ...history.present,
    undo: () => {
      if (history.past.length === 0) return;

      const lastState = history.past.pop();
      history.future.unshift(get());
      set(lastState);
    },
    redo: () => {
      if (history.future.length === 0) return;

      const nextState = history.future.shift();
      history.past.push(get());
      set(nextState);
    },
  };
};

const useStore = create(
  undoRedoMiddleware((set) => ({
    todos: [],
    addTodo: (todo) =>
      set((state) => ({
        todos: [...state.todos, todo],
      })),
    removeTodo: (index) =>
      set((state) => ({
        todos: state.todos.filter((_, i) => i !== index),
      })),
  })),
);

// 组件使用示例：
function TodoList() {
  const { todos, addTodo, removeTodo, undo, redo } = useStore();
  console.log('🚀 ~ TodoList ~ todos:', todos);

  return (
    <div>
      <button
        onClick={() => {
          const newTodo = prompt('Enter new todo:');
          if (newTodo) addTodo(newTodo);
        }}
      >
        Add Todo
      </button>
      <button onClick={undo}>Undo</button>
      <button onClick={redo}>Redo</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo} <button onClick={() => removeTodo(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
