import { useState } from 'react';

let id = 3;
const initialTasks = [
  { id: 0, text: '参观卡夫卡博物馆', done: true },
  { id: 1, text: '看木偶戏', done: false },
  { id: 2, text: '打卡列侬墙', done: false },
];

const AddTask = ({ tasks, setTasks }) => {
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
          setTasks([...tasks, { id: id++, text, done: false }]);
        }}
      >
        添加
      </button>
    </>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [editing, setEditing] = useState(false);
  return (
    <>
      <li>
        <input
          type="checkbox"
          checked={task.done}
          onChange={(e) => {
            setTasks(
              tasks.map((t) => {
                if (t.id === task.id) {
                  return { ...t, done: e.target.checked };
                }
                return t;
              }),
            );
          }}
        />
        {editing ? (
          <input
            type="text"
            value={task.text}
            onChange={(e) => {
              setTasks(
                tasks.map((t) => {
                  if (t.id === task.id) {
                    return { ...t, text: e.target.value };
                  }
                  return t;
                }),
              );
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
          onClick={() => setTasks(tasks.filter((t) => t.id !== task.id))}
        >
          删除
        </button>
      </li>
    </>
  );
};

const TaskList = ({ tasks, setTasks }) => {
  return (
    <>
      {tasks.map((task) => {
        return (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        );
      })}
    </>
  );
};

export default () => {
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <>
      <h1>布拉格的行程安排</h1>
      <AddTask tasks={tasks} setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </>
  );
};
