import React, { useEffect, useState } from 'react';

const req = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // if (Math.random() > 0.5) reject('error');
      resolve('success');
    }, 1000);
  });
};

export default function App() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    let timer;
    if (toggle) {
      console.log('start interval');
      timer = setInterval(() => {
        req().then(console.log);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [toggle]);

  return (
    <div>
      <button type="button" onClick={() => setToggle(!toggle)}>
        toggle
      </button>
    </div>
  );
}
