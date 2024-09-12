import React from 'react';

export default () => {
  const pRef = React.useRef<HTMLParagraphElement>(null);
  const valRef = React.useRef<string>();

  valRef.current = 'hello world';

  return (
    <>
      <p ref={pRef}>hello world</p>
    </>
  );
};
