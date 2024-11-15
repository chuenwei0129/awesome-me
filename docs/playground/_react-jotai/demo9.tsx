import { atom, useAtom } from 'jotai';
import { atomWithQuery } from 'jotai-tanstack-query';
import React from 'react';

const userIdAtom = atom(1);
const userAtom = atomWithQuery((get) => ({
  queryKey: ['users', get(userIdAtom)],
  queryFn: async ({ queryKey: [, id] }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) throw new Error('404 (Not Found)');
    return res.json();
  },
}));

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

const UserName = () => {
  const [{ data, isPending, isError, error }] = useAtom(userAtom);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div>
      <div>User name: {data.name}</div>
    </div>
  );
};

const Demo9 = () => {
  return (
    <div>
      <Controls />
      <UserName />
    </div>
  );
};

export default Demo9;
