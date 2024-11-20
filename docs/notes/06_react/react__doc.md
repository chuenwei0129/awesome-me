---
title: 重读文档
toc: content
order: -999
group:
  title: 术
---

## 为什么多个 JSX 标签需要一个父组件包裹？

虽然 JSX 的外观与 HTML 相似，但其实在底层它被转换成了 JavaScript 对象。

**在一个函数中，不能返回多个对象**，除非通过一个数组将它们包装在一起。因此，多个 JSX 标签必须通过一个父元素或者 Fragment （片段）来进行包裹。

## 批处理

> [给女朋友讲 React18 新特性：Automatic batching](https://zhuanlan.zhihu.com/p/382216973)

**React 会等到事件处理函数中的所有代码运行结束后，才会处理 state 的更新**。

这也正是所有的 `setNumber()` 调用完毕后才会触发重新渲染的原因。

这种机制允许你在更新多个 state 变量时（即便这些变量来自不同组件），避免触发多次 [重新渲染](https://react.docschina.org/learn/render-and-commit#re-renders-when-state-updates)。

不过，这也意味着 UI 只有在你的事件处理函数以及其中的所有代码执行完毕之后，才能进行更新。这种功能称为 **批处理**，它能让你的 React 应用运行得更高效，并帮助你避免出现只更新部分 state 变量而导致的“半成品”渲染困扰。

**React 并不会跨越多个需要刻意触发的事件（如点击）进行批处理** —— 每次点击都会被单独处理。别担心，React 只会在通常情况下安全的场景中进行批处理。

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        type="button"
        onClick={() => {
          setNumber(number + 1);
          setNumber(number + 1);
          setNumber(number + 1);
        }}
      >
        +1
      </button>
    </>
  );
}
```

如果你希望在下一次渲染之前多次更新同一个 state，可以传入一个函数 `setNumber(n => n + 1)` 来替代直接传入下一个 state 值 `setNumber(number + 1)`。这种方法告诉 React “用 state 的值做某事” 而不仅仅是替换它。

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        type="button"
        onClick={() => {
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
          setNumber((n) => n + 1);
        }}
      >
        +3
      </button>
    </>
  );
}
```

> 实质上，`setState(x)` 的运行方式与 `setState(n => x)` 相同，只不过没有使用 `n`

```jsx
import { useState } from 'react';

export default function Counter() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>{number}</h1>
      <button
        type="button"
        onClick={() => {
          setNumber(number + 5);
          setNumber((n) => n + 1);
          setNumber(42);
        }}
      >
        42
      </button>
    </>
  );
}
```

## 为什么在 React 中不推荐直接修改 state？

有以下几个原因：

- **调试**：如果你使用 `console.log` 并且不直接修改 state，你之前日志中的 state 的值就不会被新的 state 变化所影响。这样你就可以清楚地看到两次渲染之间 state 的值发生了什么变化

- **优化**：React 常见的 [优化策略](https://react.docschina.org/reference/react/memo) 依赖于如果之前的 props 或者 state 的值和下一次相同就跳过渲染。如果你从未直接修改 state ，那么你就可以很快看到 state 是否发生了变化。如果 `prevObj === obj`，那么你就可以肯定这个对象内部并没有发生改变。

- **新功能**：我们正在构建的 React 的新功能依赖于 state 被 [像快照一样看待](https://react.docschina.org/learn/state-as-a-snapshot) 的理念。如果你直接修改 state 的历史版本，可能会影响你使用这些新功能。

- **需求变更**：有些应用功能在不出现任何修改的情况下会更容易实现，比如实现撤销/恢复、展示修改历史，或是允许用户把表单重置成某个之前的值。这是因为你可以把 state 之前的拷贝保存到内存中，并适时对其进行再次使用。如果一开始就用了直接修改 state 的方式，那么后面要实现这样的功能就会变得非常困难。

- **更简单的实现**：React 并不依赖于 mutation ，所以你不需要对对象进行任何特殊操作。它不需要像很多“响应式”的解决方案一样去劫持对象的属性、总是用代理把对象包裹起来，或者在初始化时做其他工作。这也是为什么 React 允许你把任何对象存放在 state 中——不管对象有多大——而不会造成有任何额外的性能或正确性问题的原因。

### 使用 Immer 编写简洁的更新逻辑

```jsx
import { useImmer } from 'use-immer'

export default function Form() {
  const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
    },
  })

  function handleNameChange(e) {
    updatePerson((draft) => {
      draft.name = e.target.value
    })
  }

  function handleTitleChange(e) {
    updatePerson((draft) => {
      draft.artwork.title = e.target.value
    })
  }

  function handleCityChange(e) {
    updatePerson((draft) => {
      draft.artwork.city = e.target.value
    })
  }

  return (
    <div>
      <label>
        Name:
        <input value={person.name} onChange={handleNameChange} />
      </label>
      <label>
        Title:
        <input value={person.artwork.title} onChange={handleTitleChange} />
      </label>
      <label>
        City:
        <input value={person.artwork.city} onChange={handleCityChange} />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
    </div>
  )
}
```

### 局部 mutation 是可以接受的

```jsx
/**
 * iframe: true
 */

import { useState } from 'react';
export default function MovingDot() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  // 局部 mutation
  const handlePointerMove = e => {
    const nextPosition = {}
    nextPosition.x = e.clientX;
    nextPosition.y = e.clientY;
    setPosition(nextPosition);
  }

  return (
    <div
      onPointerMove={handlePointerMove}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>
      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
    </div>
  );
}
```

## 对 state 进行保留和重置

> 只要一个组件还被渲染在 UI 树的相同位置，React 就会保留它的 state。

```jsx
import { useState } from 'react';

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);

  let style = {};

  if (isFancy) {
    style = { color: 'cyan' };
  }

  return (
    <div style={style}>
      <h1>{score}</h1>
      <button type="button" onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <Counter isFancy={true} />
      ) : (
        <Counter isFancy={false} />
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        使用好看的样式
      </label>
    </div>
  );
}
```

> 相同位置的不同组件会使 state 重置（添加 key 使原地复用的组件变为不同组件）

```jsx
import { useState } from 'react';

function Counter({ isFancy }) {
  const [score, setScore] = useState(0);

  let style = {};

  if (isFancy) {
    style = { color: 'cyan' };
  }

  return (
    <div style={style}>
      <h1>{score}</h1>
      <button type="button" onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}

export default function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {isFancy ? (
        <Counter key={Math.random()} isFancy={true} />
      ) : (
        <Counter key={Math.random()} isFancy={false} />
      )}
      <label>
        <input
          type="checkbox"
          checked={isFancy}
          onChange={(e) => {
            setIsFancy(e.target.checked);
          }}
        />
        使用好看的样式
      </label>
    </div>
  );
}
```

> 只要一个组件还被渲染在 UI 树的相同位置，React 就会保留它的 state。
>
> 如果它被移除，或者一个不同的组件被渲染在相同的位置，那么 React 就会丢掉它的 state。

```jsx
import { useState } from 'react';

function Counter() {
  const [score, setScore] = useState(0);

  return (
    <div>
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        加一
      </button>
    </div>
  );
}

export default function App() {
  const [showB, setShowB] = useState(true);
  return (
    <div>
      {showB && <Counter />}
      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={e => {
            setShowB(e.target.checked)
          }}
        />
        渲染计数器
      </label>
    </div>
  );
}
```

## TodoList 小练习

> 只使用 useState

```jsx
import { useState } from 'react';

// 初始化任务列表，包含一些已完成和未完成的任务
let id = 3;
const initialTasks = [
  { id: 0, text: '参观卡夫卡博物馆', done: true },
  { id: 1, text: '看木偶戏', done: false },
  { id: 2, text: '打卡列侬墙', done: false },
];

/**
 * 添加任务组件
 * @param {{ handleAddTask: Function }} handleAddTask - 处理添加任务的函数
 * @returns 添加任务的输入框和按钮
 */
const AddTask = ({ handleAddTask }) => {
  const [text, setText] = useState('');
  return (
    <>
      <input
        type="text"
        placeholder="添加任务"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          setText('');
          handleAddTask({ id: id++, text, done: false });
        }}
      >
        添加
      </button>
    </>
  );
};

/**
 * 任务组件
 * @param {{ task: Object, handleChangeTask: Function, handleDeleteTask: Function }} -
 * task当前任务对象，handleChangeTask处理任务更改的函数，handleDeleteTask处理任务删除的函数
 * @returns 任务的复选框、文本、编辑和删除按钮
 */
const Task = ({ task, handleChangeTask, handleDeleteTask }) => {
  const [editing, setEditing] = useState(false);
  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={task.done}
          onChange={(e) => {
            handleChangeTask({ ...task, done: e.target.checked });
          }}
        />
        {editing ? (
          <input
            type="text"
            value={task.text}
            onChange={(e) => {
              handleChangeTask({ ...task, text: e.target.value });
            }}
          />
        ) : (
          <span>{task.text}</span>
        )}
        <button
          type="button"
          onClick={() => {
            setEditing(!editing);
          }}
        >
          {editing ? '保存' : '编辑'}
        </button>
        <button type="button" onClick={() => handleDeleteTask(task.id)}>
          删除
        </button>
      </li>
    </>
  );
};

/**
 * 任务列表组件
 * @param {{ tasks: Array, handleDeleteTask: Function, handleChangeTask: Function }} -
 * tasks当前任务列表，handleDeleteTask处理任务删除的函数，handleChangeTask处理任务更改的函数
 * @returns 渲染任务列表
 */
const TaskList = ({ tasks, handleChangeTask, handleDeleteTask }) => {
  return (
    <>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            handleChangeTask={handleChangeTask}
            handleDeleteTask={handleDeleteTask}
          />
        );
      })}
    </>
  );
};

/**
 * 应用程序主组件
 * @returns 布拉格行程安排的应用程序界面，包括任务添加和任务列表
 */
export default () => {
  const [tasks, setTasks] = useState(initialTasks);

  // 处理添加新任务
  const handleAddTask = (nextTask) => {
    setTasks([...tasks, nextTask]);
  };

  // 处理任务状态更改
  const handleChangeTask = (nextTask) => {
    const nextTasks = tasks.map((task) => {
      if (task.id === nextTask.id) {
        return nextTask;
      } else {
        return task;
      }
    });

    setTasks(nextTasks);
  };

  // 处理任务删除
  const handleDeleteTask = (nextTaskId) => {
    const nextTasks = tasks.filter((task) => task.id !== nextTaskId);
    setTasks(nextTasks);
  };

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask handleAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        handleChangeTask={handleChangeTask}
      />
    </>
  );
};
```

> 如何将 useState 重构成 useReducer

```jsx
import { useState } from 'react';
import { useImmerReducer } from 'use-immer';

// 全局任务ID生成器
let id = 3;

// 初始化任务列表，包含三个已定义的任务
const initialTasks = [
  { id: 0, text: '参观卡夫卡博物馆', done: true },
  { id: 1, text: '看木偶戏', done: false },
  { id: 2, text: '打卡列侬墙', done: false },
];

const tasksReducer = (tasks, action) => {
  switch (action.type) {
    case 'added': {
      tasks.push(action.nextTask);
      break;
    }
    case 'changed': {
      const nextTaskIndex = tasks.findIndex(
        (task) => task.id === action.nextTask.id,
      );
      tasks[nextTaskIndex] = action.nextTask;
      break;
    }
    case 'deleted': {
      return tasks.filter((task) => task.id !== action.nextTaskId);
    }
    default:
      throw new Error(`未知的 action 类型: ${action.type}`);
  }
};

const AddTask = ({ handleAddTask }) => {
  const [text, setText] = useState('');
  return (
    <>
      <input
        type="text"
        placeholder="添加任务"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          setText('');
          handleAddTask({ id: id++, text, done: false });
        }}
      >
        添加
      </button>
    </>
  );
};

const Task = ({ task, handleChangeTask, handleDeleteTask }) => {
  const [editing, setEditing] = useState(false);
  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={task.done}
          onChange={(e) => {
            handleChangeTask({ ...task, done: e.target.checked });
          }}
        />
        {editing ? (
          <input
            type="text"
            value={task.text}
            onChange={(e) => {
              handleChangeTask({ ...task, text: e.target.value });
            }}
          />
        ) : (
          <span>{task.text}</span>
        )}
        <button
          type="button"
          onClick={() => {
            setEditing(!editing);
          }}
        >
          {editing ? '保存' : '编辑'}
        </button>
        <button type="button" onClick={() => handleDeleteTask(task.id)}>
          删除
        </button>
      </li>
    </>
  );
};

const TaskList = ({ tasks, handleChangeTask, handleDeleteTask }) => {
  return (
    <>
      {tasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            handleChangeTask={handleChangeTask}
            handleDeleteTask={handleDeleteTask}
          />
        );
      })}
    </>
  );
};

export default () => {
  // 使用useImmerReducer钩子来管理和更新任务列表，immer允许我们使用更直观的方式修改状态
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  // 处理添加新任务的逻辑
  const handleAddTask = (nextTask) => {
    dispatch({ type: 'added', nextTask });
  };

  // 处理任务变更的逻辑
  const handleChangeTask = (nextTask) => {
    dispatch({ type: 'changed', nextTask });
  };

  // 处理任务删除的逻辑
  const handleDeleteTask = (nextTaskId) => {
    dispatch({ type: 'deleted', nextTaskId });
  };

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask handleAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        handleChangeTask={handleChangeTask}
      />
    </>
  );
};
```

> 结合使用 reducer 和 context

```jsx
import { createContext, useContext, useState } from 'react';
import { useImmerReducer } from 'use-immer';

const TasksContext = createContext();
const TasksContextDispatch = createContext();

// 全局任务ID生成器
let id = 3;

// 初始化任务列表，包含三个已定义的任务
const initialTasks = [
  { id: 0, text: '参观卡夫卡博物馆', done: true },
  { id: 1, text: '看木偶戏', done: false },
  { id: 2, text: '打卡列侬墙', done: false },
];

const tasksReducer = (tasks, action) => {
  switch (action.type) {
    case 'added': {
      tasks.push(action.nextTask);
      break;
    }
    case 'changed': {
      const nextTaskIndex = tasks.findIndex(
        (task) => task.id === action.nextTask.id,
      );
      tasks[nextTaskIndex] = action.nextTask;
      break;
    }
    case 'deleted': {
      return tasks.filter((task) => task.id !== action.nextTaskId);
    }
    default:
      throw new Error(`未知的 action 类型: ${action.type}`);
  }
};

const AddTask = ({ handleAddTask }) => {
  const [text, setText] = useState('');
  const dispatch = useContext(TasksContextDispatch);

  return (
    <>
      <input
        type="text"
        placeholder="添加任务"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        type="button"
        onClick={() => {
          setText('');
          dispatch({
            type: 'added',
            nextTask: { id: id++, text, done: false },
          });
        }}
      >
        添加
      </button>
    </>
  );
};

const Task = ({ task }) => {
  const [editing, setEditing] = useState(false);
  const dispatch = useContext(TasksContextDispatch);
  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={task.done}
          onChange={(e) => {
            dispatch({
              type: 'changed',
              nextTask: { ...task, done: e.target.checked },
            });
          }}
        />
        {editing ? (
          <input
            type="text"
            value={task.text}
            onChange={(e) => {
              dispatch({
                type: 'changed',
                nextTask: { ...task, text: e.target.value },
              });
            }}
          />
        ) : (
          <span>{task.text}</span>
        )}
        <button
          type="button"
          onClick={() => {
            setEditing(!editing);
          }}
        >
          {editing ? '保存' : '编辑'}
        </button>
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: 'deleted',
              nextTaskId: task.id,
            })
          }
        >
          删除
        </button>
      </li>
    </>
  );
};

const TaskList = () => {
  const tasks = useContext(TasksContext);
  return (
    <>
      {tasks.map((task) => {
        return <Task key={task.id} task={task} />;
      })}
    </>
  );
};

const TasksProvider = ({ children }) => {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksContextDispatch.Provider value={dispatch}>
        {children}
      </TasksContextDispatch.Provider>
    </TasksContext.Provider>
  );
};

export default () => {
  return (
    <TasksProvider>
      <h1>布拉格的行程安排</h1>
      <AddTask />
      <TaskList />
    </TasksProvider>
  );
};
```

## useRef 内部是如何运行的？

尽管 `useState` 和 `useRef` 都是由 React 提供的，原则上 `useRef` 可以在 `useState` **的基础上** 实现。 你可以想象在 React 内部，`useRef` 是这样实现的：

```jsx | pure
// React 内部
function useRef(initialValue) {
  const [ref, unused] = useState({ current: initialValue });
  return ref;
}
```

第一次渲染期间，`useRef` 返回 `{ current: initialValue }`。 该对象由 React 存储，因此在下一次渲染期间将返回相同的对象。 请注意，在这个示例中，state 设置函数没有被用到。它是不必要的，因为 `useRef` 总是需要返回相同的对象！

React 提供了一个内置版本的 `useRef`，因为它在实践中很常见。但是你可以将其视为没有设置函数的常规 state 变量。如果你熟悉面向对象编程，ref 可能会让你想起实例字段 —— 但是你写的不是 `this.something`，而是 `somethingRef.current`。

## React 为何侧重于纯函数?

编写纯函数需要遵循一些习惯和规程。但它开启了绝妙的机遇：

- 你的组件可以在不同的环境下运行 — 例如，在服务器上！由于它们针对相同的输入，总是返回相同的结果，因此一个组件可以满足多个用户请求。
- 你可以为那些输入未更改的组件来 [跳过渲染](https://react.docschina.org/reference/react/memo)，以提高性能。这是安全的做法，因为纯函数总是返回相同的结果，所以可以安全地缓存它们。
- 如果在渲染深层组件树的过程中，某些数据发生了变化，React 可以重新开始渲染，而不会浪费时间完成过时的渲染。纯粹性使得它随时可以安全地停止计算。

我们正在构建的每个 React 新特性都利用到了纯函数。从数据获取到动画再到性能，保持组件的纯粹可以充分释放 React 范式的能力。

## Fragment 语法的简写形式 `<> </>` 无法接受 key 值

如果你想让每个列表项都输出多个 DOM 节点而非一个的话，该怎么做呢？

Fragment 语法的简写形式 `<> </>` 无法接受 key 值，所以你只能要么把生成的节点用一个 `<div>` 标签包裹起来，要么使用长一点但更明确的 `<Fragment>` 写法：

```jsx
import { Fragment } from 'react';

function PeopleList({ people }) {
  const listItems = people.map(person =>
    <Fragment key={person.id}>
      <h1>{person.name}</h1>
      <p>{person.bio}</p>
    </Fragment>
  );

  return (
    <>
      {listItems}
    </>
  );
}

const peopleData = [
  { id: 1, name: "Alice", bio: "Alice is a software engineer." },
  { id: 2, name: "Bob", bio: "Bob is a designer." }
];

function App() {
  return (
    <PeopleList people={peopleData} />
  );
}

export default App;
```

这里的 Fragment 标签本身并不会出现在 DOM 上，这串代码最终会转换成 `<h1>`、`<p>`、`<h1>`、`<p>`…… 的列表。

## 事件

> [合成事件层太厚了](https://www.zhihu.com/question/316425133/answer/673451425)

在 v17 之前，整个应用的事件会冒泡到同一个根节点（html DOM 节点）。而在 v17 之后，每个应用的事件都会冒泡到该应用自己的根节点（`ReactDOM.render` 挂载的节点）。

## 为什么 `ref`、`effect` 被归类到「逃生舱」中？

这是因为这两者操作的都是「脱离 React 控制的因素」。

例如：在 `useEffect` 中修改 `document.title`。

```javascript
useEffect(() => {
  document.title = "新的标题";
}, []);
```

`document.title` 不属于 React 中的状态，React 无法感知它的变化，所以被归类到 `effect` 中。

同样，「使 DOM 聚焦」需要调用 `element.focus()`，直接执行 DOM API 也是不受 React 控制的。

```javascript
useEffect(() => {
  const input = document.getElementById('my-input');
  input.focus();
}, []);
```

虽然它们是「脱离 React 控制的因素」，但为了保证应用的健壮，React 也要尽可能防止它们失控。😊
