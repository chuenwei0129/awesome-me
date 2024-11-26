// https://sorrycc.com/typesafe-rest-api/
// https://transform.tools/json-to-zod
import React from "react"

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { z } from "zod"
import { Table } from "antd";

const postsSchema = z.array(
  z.object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string()
  })
)

type Posts = z.infer<typeof postsSchema>

const columns = [
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "Post ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Post title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Post body",
    dataIndex: "body",
    key: "body",
  },
];

const fetchPosts = async (): Promise<Posts> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) throw new Error('Failed to fetch posts')
  const data = await res.json()
  return postsSchema.parse(data)
}

const queryClient = new QueryClient();

const App = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPosts()
  })

  if (isError) return <div>Error: {error.message}</div>

  return (
    <Table
      dataSource={data?.map(item => ({ ...item, key: item.id })) ?? []}
      columns={columns}
      loading={isLoading}
      pagination={false}
      virtual
      scroll={{ y: 400 }}
    />
  )
}
export default () =>
  <QueryClientProvider client={queryClient}>
    {/* The rest of your application */}
    <App />
  </QueryClientProvider>
