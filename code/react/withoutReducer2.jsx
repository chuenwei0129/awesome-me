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
