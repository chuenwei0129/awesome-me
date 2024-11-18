import { Button, Input, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash-es'

// 定义用户任务数据的接口 UserTodo
interface UserTodo {
  key: number;
  userId: number;    // 用户ID
  id: number;        // 任务ID
  title: string;     // 任务标题
  completed: string; // 任务是否完成
}

const App = () => {
  const [data, setData] = useState<UserTodo[]>([]); // 数据列表
  const [loading, setLoading] = useState(false); // 加载状态
  const [, setError] = useState<string | null>(null); // 错误信息
  const [searchText, setSearchText] = useState<string>(""); // 搜索框文本
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  // 表格列定义
  const columns = [
    {
      title: "用户 ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "任务 ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "任务标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "任务状态",
      dataIndex: "completed",
      key: "completed",
    },
  ];

  const fetchData = async (page: number, pageSize: number, searchText: string) => {
    setLoading(true);
    setError(null); // 每次请求前清除错误信息
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${pageSize}&q=${searchText}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const total = Number(res.headers.get("X-Total-Count"))
      const data = await res.json() as UserTodo[]
      setData(data.map(item => ({ ...item, completed: item.completed ? '✅' : '❎', key: item.id })));
      setPagination({ ...pagination, page, pageSize, total });
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  // 处理搜索功能
  const handleSearch = (value: string) => {
    setSearchText(value);
    // 获取第一页的数据并更新状态
    fetchData(1, pagination.pageSize, value)
  };

  // 当组件挂载或分页、搜索条件变化时，获取数据
  useEffect(() => {
    fetchData(pagination.page, pagination.pageSize, searchText)
  }, [pagination.page, pagination.pageSize, searchText]);

  return (
    <div>
      {/* 搜索框 */}
      <Input
        placeholder="模糊搜索"
        value={searchText}
        onChange={debounce((e) => { handleSearch(e.target.value) }, 200)}
        style={{ width: 200, marginBottom: 16 }}
      />
      {/* 重置按钮 */}
      <Button
        onClick={() => {
          handleSearch("");
        }}
        style={{ marginLeft: 8 }}
      >
        重置
      </Button>
      {/* 表格显示列表 */}
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{
          total: pagination.total,
          pageSize: pagination.pageSize,
          current: pagination.page,
          onChange: (page, pageSize) => {
            setPagination({ ...pagination, page, pageSize });
          },
        }}
      />
    </div>
  )
}

export default App;
