import { atom, useAtom } from 'jotai';
import React, { Suspense } from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  // 根据需要添加更多字段
  error?: string;
}

const userIdAtom = atom<number>(1);
const userAtom = atom<Promise<User>>(async (get, { signal }) => {
  const userId = get(userIdAtom);
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}?_delay=2000`, { signal });
    if (!response.ok) {
      throw new Error('404 (Not Found)');
    }
    const userData: User = await response.json();
    return userData;
  } catch (error: any) {
    return { id: -1, name: '', username: '', email: '', error: error.message };
  }
});

const Controls: React.FC = () => {
  const [userId, setUserId] = useAtom(userIdAtom);
  return (
    <div>
      User Id: {userId}
      <button disabled={userId <= 0} onClick={() => setUserId((c) => c - 1)}>
        Prev
      </button>
      <button onClick={() => setUserId((c) => c + 1)}>Next</button>
    </div>
  );
};

const UserName: React.FC = () => {
  const [user] = useAtom(userAtom);
  if (user.error) {
    return <div>Error: {user.error}</div>;
  }
  return <div>User name: {user.name}</div>;
};

const Demo7: React.FC = () => (
  <>
    <Controls />
    <Suspense fallback="Loading...">
      <UserName />
    </Suspense>
  </>
);

export default Demo7;
