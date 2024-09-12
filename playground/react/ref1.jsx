import React from 'react';

// export default () => {
//   const [show, setShow] = React.useState(true);
//   const ref = React.useRef(null);

//   return (
//     <div>
//       <button type="button" onClick={() => setShow((show) => !show)}>
//         Toggle with setState
//       </button>
//       <button
//         type="button"
//         onClick={() => {
//           ref.current.remove();
//         }}
//       >
//         Toggle with DOM ref
//       </button>
//       {show && <p ref={ref}>hello world</p>}
//     </div>
//   );
// };

export default () => {
  const myRef = React.useRef(null);

  // 直接在渲染函数中修改 ref.current
  myRef.current = 1;

  setTimeout(() => {
    myRef.current = 2;
  }, 1000);

  React.useEffect(() => {
    setTimeout(() => {
      myRef.current = 2;
      console.log(myRef.current);
    }, 1000);
  }, []);

  return <div ref={myRef}>Hello World</div>;
};
