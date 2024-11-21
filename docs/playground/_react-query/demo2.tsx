import React, { useState } from "react";

// 导入需要的库和组件
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Modal, Button, Space, Table, Tooltip, Alert } from "antd";
import { z } from "zod";

// 定义数据模式以确保数据结构的正确性
const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string()
});

const commentSchema = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string()
});

const postsSchema = z.array(postSchema);
const commentsSchema = z.array(commentSchema);

type Post = z.infer<typeof postSchema>;
type Comment = z.infer<typeof commentSchema>;

// 定义列配置
const postColumns = (showModal: (post: Post) => void) => [
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
  {
    title: 'Action',
    key: 'action',
    render: (post: Post) => (
      <Space size="middle">
        <Button onClick={() => showModal(post)}>details</Button>
      </Space>
    ),
  },
];

const commentColumns = [
  {
    title: 'Post ID',
    dataIndex: 'postId',
    key: 'postId',
  },
  {
    title: 'Comment ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
  },
  {
    title: 'Email',
    key: 'email',
    dataIndex: 'email',
  },
  {
    title: 'Body',
    dataIndex: 'body',
    key: 'body',
    ellipsis: {
      showTitle: false,
    },
    render: (body: Post['body']) => (
      <Tooltip placement="topLeft" title={body}>
        {body}
      </Tooltip>
    ),
  }
];

// 获取帖子数据
const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
  if (!res.ok) throw new Error('Failed to fetch posts')
  const data = await res.json()
  return postsSchema.parse(data)
}

// 获取评论数据
const fetchComments = async (postId: number): Promise<Comment[]> => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  if (!res.ok) throw new Error('Failed to fetch comments')
  const data = await res.json()
  return commentsSchema.parse(data)
}

// 创建 QueryClient 实例
const queryClient = new QueryClient();

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);

  // 使用 useQuery 获取帖子数据
  const { isLoading: isPostsLoading, isError: isPostsError, error: postsError, data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  })

  // 使用 useQuery 获取评论数据
  const { isLoading: isCommentsLoading, isError: isCommentsError, error: commentsError, data: comments } = useQuery({
    queryKey: ['comments', expandedPostId],
    queryFn: () => fetchComments(expandedPostId!),
    enabled: !!expandedPostId
  })

  const showModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    setSelectedPost(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedPost(null);
  };

  // 展开行渲染函数
  const expandedRowRender = () =>
    isCommentsError ? (
      <Alert message="Error" description={commentsError.message} type="error" />
    ) : (
      <Table<Comment>
        columns={commentColumns}
        loading={isCommentsLoading}
        dataSource={comments}
        pagination={false}
        rowKey={(record) => record.id}
      />
    );

  return isPostsError ? (
    <Alert message="Error" description={postsError.message} type="error" />
  ) : (
    <>
      <Table
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender,
          onExpand: (expanded, record) => {
            setExpandedPostId(expanded ? record.id : null);
          },
          defaultExpandedRowKeys: ['0'],
        }}
        loading={isPostsLoading}
        dataSource={posts}
        columns={postColumns(showModal)}
        pagination={false}
      />
      <Modal
        title="Post Details"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedPost && (
          <div>
            <p><strong>User ID:</strong> {selectedPost.userId}</p>
            <p><strong>Title:</strong> {selectedPost.title}</p>
            <p><strong>Body:</strong> {selectedPost.body}</p>
          </div>
        )}
      </Modal>
    </>
  );
}

// 将 App 组件包装在 QueryClientProvider 中
export default () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
