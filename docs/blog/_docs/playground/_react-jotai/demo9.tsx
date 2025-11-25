import { atom, useAtom, useAtomValue } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';
import React from 'react';
import { z } from 'zod';

const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string()
});

type Post = z.infer<typeof postSchema>;

const postIdAtom = atom<number>(1);

const postAtom = atomWithQuery<Post>((get) => ({
  queryKey: ['posts', get(postIdAtom)],
  queryFn: async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${get(postIdAtom)}?_delay=2000`);
    if (!response.ok) {
      throw new Error(response.statusText || 'Error fetching post');
    }
    const data = await response.json();
    return postSchema.parse(data);
  }
}))

const Controls: React.FC = () => {
  const [postId, setPostId] = useAtom(postIdAtom);
  return (
    <div>
      Post Id: {postId}
      <button disabled={postId <= 0} onClick={() => setPostId((c) => c - 1)}>
        Prev
      </button>
      <button onClick={() => setPostId((c) => c + 1)}>Next</button>
    </div>
  );
};

const PostContent: React.FC = () => {
  const { isLoading, isError, data: post, error } = useAtomValue(postAtom);
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>
    <p>Post Title: {post?.title}</p>
  </div>;
};

const App: React.FC = () => (
  <>
    <Controls />
    <PostContent />
  </>
);

export default App;
