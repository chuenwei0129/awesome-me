import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Check, Plus, Sparkles, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

// 工具函数：合并 Tailwind 类名
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// 获取今天的日期字符串
const getTodayDate = () => {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return new Date().toLocaleDateString('en-US', options);
};

function App() {
  // 状态管理
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('my-todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  // 持久化存储
  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(todos));
  }, [todos]);

  // 添加任务
  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInputValue('');
  };

  // 切换状态
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  // 删除任务
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // 过滤任务
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // 计算进度
  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 sm:p-8">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/50">
        {/* 头部区域 */}
        <div className="p-8 pb-4">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                Tasks{' '}
                <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </h1>
              <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {getTodayDate()}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">
                {completedCount}/{totalCount}
              </div>
              <div className="text-xs text-gray-400 uppercase font-semibold tracking-wider">
                Done
              </div>
            </div>
          </div>

          {/* 进度条 */}
          <div className="w-full bg-gray-100 rounded-full h-2 mb-8 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </div>

          {/* 输入框 */}
          <form onSubmit={addTodo} className="relative group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full pl-4 pr-14 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-gray-400 text-gray-700 shadow-inner"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 aspect-square bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-indigo-200"
            >
              <Plus className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* 过滤器 */}
        <div className="px-8 flex gap-4 text-sm font-medium text-gray-400 border-b border-gray-100 pb-4">
          {['all', 'active', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'capitalize transition-colors hover:text-indigo-500',
                filter === f && 'text-indigo-600',
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* 列表区域 */}
        <div className="p-4 h-[400px] overflow-y-auto custom-scrollbar">
          <ul className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredTodos.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center text-gray-400 mt-20"
                >
                  <p>No tasks found</p>
                </motion.div>
              ) : (
                filteredTodos.map((todo) => (
                  <motion.li
                    key={todo.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.2 },
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="group flex items-center gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                        todo.completed
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'border-gray-300 text-transparent hover:border-indigo-400',
                      )}
                    >
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </button>

                    <span
                      className={cn(
                        'flex-1 text-gray-700 font-medium transition-all duration-300',
                        todo.completed && 'text-gray-400 line-through',
                      )}
                    >
                      {todo.text}
                    </span>

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.li>
                ))
              )}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
