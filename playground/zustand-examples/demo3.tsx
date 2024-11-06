import React from 'react';
import { usePersonStore } from './stores/PersonStore';

const FirstName = () => {
  const firstName = usePersonStore((state) => state.firstName);
  const setFirstName = usePersonStore((state) => state.setFirstName);

  return (
    <div>
      <h1>{Math.random()}</h1>
      <p>First Name: {firstName}</p>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
    </div>
  );
};

const LastName = () => {
  const lastName = usePersonStore((state) => state.lastName);
  const setLastName = usePersonStore((state) => state.setLastName);

  return (
    <div>
      <h1>{Math.random()}</h1>
      <p>Last Name: {lastName}</p>
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
    </div>
  );
};

const demo2 = () => {
  return (
    <div>
      <FirstName />
      <LastName />
    </div>
  );
};

export default demo2;
