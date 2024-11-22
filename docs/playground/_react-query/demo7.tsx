import { keepPreviousData, QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Button, Input, Table, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { z } from 'zod';

const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

// 定义 fetch 返回的数据 schema
const fetchResultSchema = z.object({
  data: z.array(postSchema),
  total: z.number().int().nonnegative(), // 确保 total 是一个非负整数
});

type Post = z.infer<typeof postSchema>;
type FetchResult = z.infer<typeof fetchResultSchema>;

const fetchPosts = async (page: number, pageSize: number, searchText: string): Promise<FetchResult> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${pageSize}&q=${searchText}`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  const totalHeader = res.headers.get("X-Total-Count");
  if (!totalHeader) throw new Error("Missing total count header");
  const total = Number(totalHeader);
  if (Number.isNaN(total) || total < 0) throw new Error("Invalid total count");
  const jsonData = await res.json();
  const result = { data: jsonData, total };
  // 验证 fetch 回来的数据是否符合 schema
  return fetchResultSchema.parse(result);
};

const queryClient = new QueryClient();

const App = () => {
  const [searchText, setSearchText] = useState<string>(""); // 搜索框文本
  const [pagination, setPagination] = useState({ current: 1, pageSize: 3, total: 0 });

  // 表格列定义
  const columns: ColumnsType<Post> = [
    {
      title: "用户 ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "帖子 ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "帖子标题",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "帖子内容",
      dataIndex: "body",
      key: "body",
    },
  ];

  const { isLoading, isError, error, data, isPlaceholderData } = useQuery({
    queryKey: ['posts', pagination.current, pagination.pageSize, searchText],
    queryFn: () => fetchPosts(pagination.current, pagination.pageSize, searchText),
    placeholderData: keepPreviousData,
  });

  if (isError) return <div>错误: {error.message}</div>;

  // 处理搜索功能
  const handleSearch = (value: string) => {
    setSearchText(value);
    if (!isPlaceholderData) setPagination({ ...pagination, current: 1, pageSize: 3 }); // 搜索时重置到第一页
  };

  const handleTableChange = (page: number, pageSize: number) => {
    if (!isPlaceholderData) setPagination((prev) => ({ ...prev, current: page, pageSize }));
  };

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
        dataSource={data?.data}
        columns={columns}
        loading={isLoading}
        pagination={{
          total: data?.total,
          pageSize: pagination.pageSize,
          current: pagination.current,
          onChange: handleTableChange,
        }}
        style={{ backgroundColor: 'white', padding: '16px', borderRadius: '8px' }} // table样式
      />
    </div>
  );
};

export default () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
