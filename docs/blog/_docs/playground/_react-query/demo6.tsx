import React, { useState } from "react";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { z } from "zod";
import { Button, Table, Space } from "antd";

const postsSchema = z.array(
  z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string(),
  })
);

type Posts = z.infer<typeof postsSchema>;

const columns = [
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

const fetchPosts = async (signal: AbortSignal): Promise<Posts> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3', { signal });
  if (!res.ok) throw new Error('Failed to fetch posts');
  const data = await res.json();
  return postsSchema.parse(data);
}

const queryClient = new QueryClient();

const App = () => {
  const [shouldFetch, setShouldFetch] = useState(false);
  const queryClient = useQueryClient();

  const { isLoading, isError, error, data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: ({ signal }) => fetchPosts(signal),
    refetchOnWindowFocus: false, // 禁用窗口聚焦时自动请求
    enabled: shouldFetch // 仅在 shouldFetch 为 true 时请求数据
  });

  if (isError) return <div>错误: {error.message}</div>;

  const handleFetch = () => {
    setShouldFetch(true);
    // 初始化缓存
    queryClient.resetQueries({ queryKey: ['posts'] });
  };

  const handleCancel = () => {
    setShouldFetch(false);
    queryClient.cancelQueries({ queryKey: ['posts'] });
  };

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          onClick={handleFetch}
          disabled={isLoading}
        >
          发起请求
        </Button>
        <Button
          danger
          onClick={handleCancel}
          disabled={!isLoading}
        >
          取消请求
        </Button>
      </Space>
      <Table
        rowKey={record => record.id}
        dataSource={shouldFetch ? posts : []}
        columns={columns}
        loading={isLoading}
        pagination={false}
      />
    </>
  );
}

export default () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
