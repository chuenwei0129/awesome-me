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
