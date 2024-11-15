import { atom, useAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { Loadable } from 'jotai/vanilla/utils/loadable';
import React from 'react';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const userIdAtom = atom<number>(1);
const userAtom = atom<Promise<User>>(async (get, { signal }) => {
  const userId = get(userIdAtom);
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}?_delay=2000`, { signal });
  if (!response.ok) {
    throw new Error('404 (Not Found)');
  }
  const userData: User = await response.json();
  return userData;
});

const loadableAtom = loadable(userAtom);

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
  const [value] = useAtom<Loadable<User>>(loadableAtom);
  if (value.state === 'hasError') {
    return <div>Error: {(value.error as any).message}</div>;
  }
  if (value.state === 'loading') {
    return <div>Loading...</div>;
  }
  return <div>User name: {value.data.name}</div>;
};

const Demo7: React.FC = () => (
  <>
    <Controls />
    <UserName />
  </>
);

export default Demo7;
