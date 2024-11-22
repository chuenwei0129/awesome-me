import React from "react";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { z } from "zod";
import { Button, Table, TableColumnsType, message } from "antd";

const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

const postsSchema = z.array(postSchema);
type Post = z.infer<typeof postSchema>;

const columns: TableColumnsType<Post> = [
  { title: "User ID", dataIndex: "userId", key: "userId" },
  { title: "Post ID", dataIndex: "id", key: "id" },
  { title: "Post title", dataIndex: "title", key: "title", ellipsis: true },
  { title: "Post body", dataIndex: "body", key: "body", ellipsis: true },
];

const fetchPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  return postsSchema.parse(data);
};

const addNewPost = async (newPost: Omit<Post, "id">): Promise<Post> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  if (!res.ok) throw new Error("Failed to add post");
  const data = await res.json();
  return postSchema.parse(data);
};

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { isLoading, isError, error, data: posts } = useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: (newPost: Omit<Post, "id">) => addNewPost(newPost),
    onSuccess: () => {
      message.success("Post added successfully!");
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // 确保成功后重新获取并渲染数据
    },
    onError: (error: unknown) => {
      message.error(
        `Error adding post: ${error instanceof Error ? error.message : "Unknown error"
        }`
      );
    },
  });

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
          mutation.mutate({
            title: "New Post Title",
            body: "New Post Body",
            userId: 1,
          })
        }
        disabled={mutation.isPending}
      >
        {mutation.isPending ? "Pending..." : "Create New Post"}
      </Button>
      <Table
        rowKey={(record) => record.id.toString()}
        dataSource={posts}
        columns={columns}
        loading={isLoading}
      />
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
