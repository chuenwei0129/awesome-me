import React from 'react';
import { atom, useAtom, useAtomValue } from 'jotai';
import { z } from 'zod';
import { loadable } from 'jotai/utils';
import { type Loadable } from 'jotai/vanilla/utils/loadable';

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

const loadablePostAtom = loadable(postAtom);

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
  const value = useAtomValue<Loadable<Post>>(loadablePostAtom);
  if (value.state === 'hasError') {
    return <div>Error: {(value.error as any).message}</div>;
  }
  if (value.state === 'loading') {
    return <div>Loading...</div>;
  }
  return <div>
    <p>Post Title: {value.data.title}</p>
  </div>;
};

const App: React.FC = () => (
  <>
    <Controls />
    <PostContent />
  </>
);

export default App;
