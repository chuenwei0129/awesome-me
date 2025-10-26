import { produce } from 'immer';

const baseState = [
  {
    todo: 'Learn typescript',
    done: true,
  },
  {
    todo: 'Learn react',
    done: false,
  },
  {
    todo: 'Learn next.js',
    done: false,
  },
];

const nextState = produce(baseState, (draft) => {
  draft.push({ todo: 'Learn redux', done: false });
  draft[1].done = true;
});

console.log('baseState: ', baseState);
console.log('nextState: ', nextState);

// 柯里化
const addTodo = produce((draft, todo) => {
  draft.push(todo);
});

const nextState2 = addTodo(baseState, { todo: 'Learn Vue', done: false });
console.log('nextState2: ', nextState2);

const Box = (x: number) => ({
  map: (f: (x: number) => number) => Box(f(x)),
  valueOf: () => x,
});
