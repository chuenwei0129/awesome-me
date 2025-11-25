import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { z } from "zod";
import { Button, Popconfirm, Space, Table, TableColumnsType, message, Modal, Form, Input } from "antd";

const postSchema = z.object({
  post_id: z.number(),
  timestamp: z.number(),
  text: z.string(),
  author: z.object({
    user_id: z.number(),
    username: z.string(),
    first_name: z.string(),
    last_name: z.string()
  }),
  likes: z.array(
    z.object({
      user_id: z.number(),
      username: z.string(),
      first_name: z.string(),
      last_name: z.string()
    })
  )
})

const postsSchema = z.array(postSchema);
type Post = z.infer<typeof postSchema>;

const ACCESS_TOKEN = 'f3b8692b90b7326bd53a258ca3401bf888b1cdbb83c34c6e210dbe8fa1cced2e'

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:3333/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  return postsSchema.parse(data);
};

const addPost = async (post: { text: string }) => {
  const res = await fetch("http://localhost:3333/posts", {
    method: "POST",
    body: JSON.stringify(post),
    headers: { "X-Authorization": ACCESS_TOKEN, "Content-type": "application/json; charset=UTF-8" },
  });
  if (!res.ok) throw new Error("Failed to add post");
  const data = await res.json();
  return data
};

const deletePost = async (postId: number) => {
  const res = await fetch(`http://localhost:3333/posts/${postId}`, {
    method: "DELETE",
    headers: { "X-Authorization": ACCESS_TOKEN },
  });
  if (!res.ok) throw new Error("Failed to delete post");
  const data = await res.json();
  return data;
}

const editPost = async (postId: number, updatedText: string) => {
  const res = await fetch(`http://localhost:3333/posts/${postId}`, {
    method: "PATCH",
    body: JSON.stringify({ text: updatedText }),
    headers: { "X-Authorization": ACCESS_TOKEN, "Content-type": "application/json; charset=UTF-8" },
  });
  if (!res.ok) throw new Error("Failed to edit post");
  const data = await res.json();
  return data;
};

const queryClient = new QueryClient();

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [form] = Form.useForm();

  const { isLoading, isError, error, data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const addMutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      message.success("Post added successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: unknown) => {
      message.error(
        `Error adding post: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      message.success("Post deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error: unknown) => {
      message.error(
        `Error deleting post: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ postId, updatedText }: { postId: number, updatedText: string }) => editPost(postId, updatedText),
    onSuccess: (data: any) => {
      message.success("Post edited successfully!");
      // queryClient.invalidateQueries({ queryKey: ["posts"] });
      // 当在处理更新了服务器上的对象的修改时，新的对象通常会在更新的响应中自动返回。
      // 我们可以利用修改函数返回的对象，并使用 Query Client 的 setQueryData 方法立即用新数据更新现有的查询
      // 而不是去触发新的数据获取，浪费对已有数据的网络调用。
      // 通过setQueryData的更新必须以不可变的方式进行。 不要尝试通过缓存获取的修改的数据直接写入缓存。
      queryClient.setQueryData<Post[]>(["posts"], (oldData) => {
        if (!oldData) return oldData;
        return oldData.map((post) =>
          post.post_id === data.post_id ? { ...post, text: data.text } : post
        );
      });
    },
    onError: (error: unknown) => {
      message.error(
        `Error editing post: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    },
  });

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (currentPost) {
        editMutation.mutate({ postId: currentPost.post_id, updatedText: values.text });
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns: TableColumnsType<Post> = [
    { title: "Post ID", dataIndex: "post_id", key: "post_id" },
    {
      title: "Post Time", dataIndex: "timestamp", key: "timestamp", render: (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleString();
      }
    },
    { title: "Post text", dataIndex: "text", key: "text", ellipsis: true },
    {
      title: "Post author", dataIndex: "text", key: "author", render: (_, { author }) => <p>{author.username}</p>
    },
    {
      title: "Post likes", dataIndex: "likes", key: "likes", render: (_, { likes }) => <p>{likes.length}</p>
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={() => deleteMutation.mutate(record.post_id)}>
            <a>Delete</a>
          </Popconfirm>
          <a onClick={() => {
            form.setFieldsValue({ text: record.text });
            setCurrentPost(record);
            setIsModalOpen(true);
          }}>Edit</a>
        </Space>
      ),
    },
  ];

  if (isError)
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );

  return (
    <>
      <Button
        type="primary" style={{ marginBottom: 16 }}
        onClick={() =>
          addMutation.mutate({
            text: "New Post Body"
          })
        }
        disabled={addMutation.isPending}
      >
        {addMutation.isPending ? "Pending..." : "Create New Post"}
      </Button>
      <Table
        rowKey={(record) => record.post_id}
        dataSource={posts}
        columns={columns}
        loading={isLoading}
      />

      <Modal
        title="Edit Post"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="edit_post_form"
          initialValues={{ text: currentPost?.text }}
        >
          <Form.Item
            name="text"
            label="Post Text"
            rules={[{ required: true, message: 'Please input the post text!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const RootApp: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

export default RootApp;
