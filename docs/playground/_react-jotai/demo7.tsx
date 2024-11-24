import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { atom, useAtom, useAtomValue } from 'jotai';
import { z } from 'zod';

const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string()
});

type Post = z.infer<typeof postSchema>;

const postIdAtom = atom<number>(1);

const postAtom = atom<Promise<Post>>(async (get) => {
  const postId = get(postIdAtom);
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}?_delay=2000`);
  if (!response.ok) {
    throw new Error(response.statusText || 'Error fetching post');
  }
  const data = await response.json();
  return postSchema.parse(data);
});

const Controls: React.FC = () => {
  const [postId, setPostId] = useAtom(postIdAtom);
  return (
    <div>
      Post Id: {postId}
      {/* 这里限制为 1，因为 dumi ErrorBoundary 不生效 */}
      <button disabled={postId <= 1} onClick={() => setPostId((c) => c - 1)}>
        Prev
      </button>
      <button onClick={() => setPostId((c) => c + 1)}>Next</button>
    </div>
  );
};

const PostContent: React.FC = () => {
  const post = useAtomValue(postAtom);

  return (
    <div>
      <p>Post Title: {post.title}</p>
    </div>
  );
};

// 定义错误回退渲染组件
const ErrorFallback: React.FC<{ error: Error }> = ({ error }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
  </div>
);

const App: React.FC = () => (
  <>
    <Controls />
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback="Loading...">
        <PostContent />
      </Suspense>
    </ErrorBoundary>
  </>
);

export default App;
