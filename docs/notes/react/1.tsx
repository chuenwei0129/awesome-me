import React from 'react';

interface ParentProps {
  children: React.ReactNode;
}

function Son() {
  console.log('child render!');
  return <div>Son</div>;
}

function Parent(props: ParentProps) {
  const [count, setCount] = React.useState(0);

  return (
    <div
      onClick={() => {
        setCount(count + 1);
      }}
    >
      count:{count}
      {props.children}
    </div>
  );
}

const App = () => {
  return (
    <Parent>
      <Son />
    </Parent>
  );
};

export default App;
