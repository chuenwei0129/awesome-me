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

/**
 * 任务列表的Reducer函数，用于处理不同的动作
 * @param {Array} tasks 当前的任务列表
 * @param {Object} action 触发的动作对象，包含类型和相关数据
 * @returns {Array} 返回处理后的新任务列表
 */
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

/**
 * 添加任务组件
 * @param {Function} handleAddTask 处理添加新任务的回调函数
 * @returns {JSX.Element} 返回输入框和添加按钮的JSX元素
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
 * 任务组件，用于展示和编辑单个任务
 * @param {Object} task 当前任务对象
 * @param {Function} handleChangeTask 处理任务变更的回调函数
 * @param {Function} handleDeleteTask 处理任务删除的回调函数
 * @returns {JSX.Element} 返回任务详情的JSX元素
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
 * 任务列表组件，展示所有任务并提供编辑和删除功能
 * @param {Array} tasks 当前所有任务列表
 * @param {Function} handleDeleteTask 处理任务删除的回调函数
 * @param {Function} handleChangeTask 处理任务变更的回调函数
 * @returns {JSX.Element} 返回任务列表的JSX元素
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
 * 应用程序的主组件
 * @returns {JSX.Element} 返回整个应用程序的JSX元素
 */
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
