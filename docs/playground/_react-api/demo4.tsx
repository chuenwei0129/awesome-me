import { Button, Input, Table, Space } from 'antd';
import React, { useEffect, useState } from 'react';

// 定义用户任务数据的接口 User
interface User {
  key: number;
  userId: number;    // 用户ID
  id: number;        // 任务ID
  title: string;     // 任务标题
  completed: string; // 任务是否完成
}

const fetchDataFromAPI = async (page: number, pageSize: number, searchText: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${pageSize}&q=${searchText}`);
  if (!res.ok) throw new Error("Failed to fetch data");
  const total = Number(res.headers.get("X-Total-Count"));
  const data = await res.json() as User[]
  return { data, total };
};

const App = () => {
  const [data, setData] = useState<User[]>([]); // 数据列表
  const [loading, setLoading] = useState(false); // 加载状态
  const [, setError] = useState<string | null>(null); // 错误信息

  const [searchText, setSearchText] = useState<string>(""); // 搜索框文本

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
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

  const fetchTableData = async (page: number, pageSize: number, searchText: string) => {
    setLoading(true);
    setError(null); // 每次请求前清除错误信息
    try {
      const { data, total } = await fetchDataFromAPI(page, pageSize, searchText);
      const tableData = data.map((item) => ({ ...item, completed: item.completed ? '✅' : '❎', key: item.id }))
      setData(tableData);
      setPagination(prev => ({ ...prev, current: page, pageSize, total }));
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // 处理搜索功能
  const handleSearch = (value: string) => {
    setSearchText(value);
    fetchTableData(1, pagination.pageSize, value)
  };

  const handleTableChange = (page: number, pageSize: number) => {
    fetchTableData(page, pageSize, searchText)
  };

  useEffect(() => {
    fetchTableData(pagination.current, pagination.pageSize, searchText);
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f0f2f5' }}>
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <Space>
          {/* 搜索框 */}
          <Input
            placeholder="模糊搜索"
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: 200 }}
          />
          {/* 重置按钮 */}
          <Button
            onClick={() => handleSearch("")}
          >
            重置
          </Button>
        </Space>
      </div>
      {/* 表格显示列表 */}
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        pagination={{
          total: pagination.total,
          pageSize: pagination.pageSize,
          current: pagination.current,
          onChange: handleTableChange,
        }}
        style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px' }} // table样式
      />
    </div>
  );
};

export default App;
