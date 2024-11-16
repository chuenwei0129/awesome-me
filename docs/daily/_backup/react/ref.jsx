import { useCallback, useRef, useState } from 'react';

const useLatest = (value) => {
  const ref = useRef(value);
  ref.current = value;
  return ref;
};

export default function Ref() {
  const [count, setCount] = useState(0);
  const countRef = useLatest(count);

  const log = useCallback(() => {
    console.log(countRef);
  }, [count]);

  log();

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        {count}
      </button>
      <div className="font-sans text-xl leading-relaxed">
        write
        <span className="text-blue-600 underline">more</span>
        to
        <span className="bg-blue-200">clear</span>
        your
        <span className="text-black">&lt;/head&gt;</span>
      </div>
    </div>
  );
}

/**
 * iframe: true
 */

// import React, { useEffect, useState } from 'react';

// const TimeComponent = () => {
//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const timer = setInterval(() => setTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatDate = (date) => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const weekDay = [
//       '星期日',
//       '星期一',
//       '星期二',
//       '星期三',
//       '星期四',
//       '星期五',
//       '星期六',
//     ][date.getDay()];
//     return `${year} 年 ${month} 月 ${day} 日 ${weekDay}`;
//   };

//   const formatTime = (date) => {
//     const hours = String(date.getHours()).padStart(2, '0');
//     const minutes = String(date.getMinutes()).padStart(2, '0');
//     const seconds = String(date.getSeconds()).padStart(2, '0');
//     return { hours, minutes, seconds };
//   };

//   const { hours, minutes, seconds } = formatTime(time);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="text-gray-400 text-sm mb-4">{formatDate(time)}</div>
//       <div className="flex items-end text-gray-800">
//         <div className="text-9xl font-bold">
//           {hours}:{minutes}
//         </div>
//         <div className="text-4xl font-bold mb-2 ml-1">{seconds}</div>
//       </div>
//     </div>
//   );
// };

// export default TimeComponent;

// import React, { useState } from 'react';

// const ToDo = () => {
//   const [tasks, setTasks] = useState([
//     { text: '蜗蜗说', completed: true, editing: false },
//     { text: '我该说些什么', completed: false, editing: false },
//     { text: '惊天要好好学习', completed: false, editing: false },
//     { text: '开心', completed: true, editing: false },
//   ]);
//   const [newTask, setNewTask] = useState('');

//   const toggleTask = (index) => {
//     const newTasks = [...tasks];
//     newTasks[index].completed = !newTasks[index].completed;
//     setTasks(newTasks);
//   };

//   const removeTask = (index) => {
//     const newTasks = [...tasks];
//     newTasks.splice(index, 1);
//     setTasks(newTasks);
//   };

//   const addTask = () => {
//     if (newTask.trim()) {
//       setTasks([...tasks, { text: newTask, completed: false, editing: false }]);
//       setNewTask('');
//     }
//   };

//   const editTask = (index) => {
//     const newTasks = [...tasks];
//     newTasks[index].editing = !newTasks[index].editing;
//     setTasks(newTasks);
//   };

//   const updateTask = (index, text) => {
//     const newTasks = [...tasks];
//     newTasks[index].text = text;
//     newTasks[index].editing = false;
//     setTasks(newTasks);
//   };

//   const handleKeyPress = (event, index) => {
//     if (event.key === 'Enter') {
//       updateTask(index, event.target.value);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
//       <div className="md:flex">
//         <div className="p-8 w-full">
//           <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
//             Todos
//           </h1>
//           <ul className="mt-4">
//             {tasks.map((task, index) => (
//               <li key={index} className="flex items-center mt-4">
//                 <input
//                   type="checkbox"
//                   checked={task.completed}
//                   onChange={() => toggleTask(index)}
//                   className="form-checkbox h-5 w-5 text-gray-600"
//                 />
//                 {task.editing ? (
//                   <input
//                     type="text"
//                     defaultValue={task.text}
//                     onBlur={(e) => updateTask(index, e.target.value)}
//                     onKeyPress={(e) => handleKeyPress(e, index)}
//                     className="ml-2 p-1 border rounded w-full"
//                   />
//                 ) : (
//                   <span
//                     className={`ml-2 ${
//                       task.completed ? 'line-through text-gray-500' : ''
//                     }`}
//                     onDoubleClick={() => editTask(index)}
//                   >
//                     {task.text}
//                   </span>
//                 )}
//                 {!task.completed && (
//                   <button
//                     onClick={() => removeTask(index)}
//                     className="ml-auto text-gray-600 hover:text-gray-800"
//                   >
//                     <svg
//                       className="w-6 h-6"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M6 18L18 6M6 6l12 12"
//                       ></path>
//                     </svg>
//                   </button>
//                 )}
//               </li>
//             ))}
//           </ul>
//           <div className="mt-4 flex">
//             <input
//               type="text"
//               value={newTask}
//               onChange={(e) => setNewTask(e.target.value)}
//               onKeyPress={(e) => {
//                 if (e.key === 'Enter') addTask();
//               }}
//               className="p-2 border rounded w-full"
//               placeholder="输入事项 回车"
//             />
//             <button
//               onClick={addTask}
//               className="ml-2 bg-blue-500 text-white p-2 rounded"
//             >
//               添加
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ToDo;

// import React, { useEffect, useState } from 'react';

// // List of poems with associated dates or festivals
// const poems = [
//   {
//     text: '落日楼头，断鸿声里，江南游子。',
//     author: '宋代 · 辛弃疾',
//     source: '《水龙吟·登建康赏心亭》',
//     date: '06-21', // Example date (June 21)
//     festival: '', // Example festival
//   },
//   {
//     text: '明月几时有，把酒问青天。',
//     author: '宋代 · 苏轼',
//     source: '《水调歌头·明月几时有》',
//     date: '08-15', // Mid-Autumn Festival
//     festival: '中秋节',
//   },
//   // Add more poems as needed
// ];

// // Function to get today's date in MM-DD format
// const getTodayDate = () => {
//   const today = new Date();
//   const month = String(today.getMonth() + 1).padStart(2, '0');
//   const day = String(today.getDate()).padStart(2, '0');
//   return `${month}-${day}`;
// };

// // Function to get a poem based on today's date or festival
// const getPoemForToday = () => {
//   const today = getTodayDate();
//   const todayPoems = poems.filter(
//     (poem) => poem.date === today || poem.festival === getFestival(today),
//   );
//   return todayPoems.length > 0
//     ? todayPoems[Math.floor(Math.random() * todayPoems.length)]
//     : null;
// };

// // Function to determine if today is a Chinese festival
// const getFestival = (date) => {
//   // Add logic to determine festivals based on date
//   const festivals = {
//     '08-15': '中秋节',
//     // Add more festival dates
//   };
//   return festivals[date] || '';
// };

// const PoetryDisplay = () => {
//   const [poem, setPoem] = useState(null);

//   useEffect(() => {
//     const selectedPoem = getPoemForToday();
//     setPoem(selectedPoem);
//   }, []);

//   if (!poem) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-100">
//         今天没有特定的诗词。
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="text-center">
//         <p className="text-2xl font-semibold mb-2">{poem.text}</p>
//         <p className="text-sm text-gray-600">
//           {poem.author} {poem.source}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default PoetryDisplay;
