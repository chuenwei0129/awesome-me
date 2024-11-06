import React, { useEffect, useRef } from 'react';

const NodeExample = () => {
  const node1Ref = useRef(null);
  const node2Ref = useRef(null);

  useEffect(() => {
    const node1 = node1Ref.current;
    const node2 = node2Ref.current;

    // compareDocumentPosition
    const position = node1.compareDocumentPosition(node2);
    console.log('compareDocumentPosition:', position);

    // contains
    const contains = node1.contains(node2);
    console.log('contains:', contains);

    // cloneNode
    const clonedNode = node1.cloneNode(true);
    console.log('cloneNode:', clonedNode);

    // isEqualNode
    const isEqual = node1.isEqualNode(node2);
    console.log('isEqualNode:', isEqual);

    // isSameNode
    const isSame = node1.isSameNode(node2);
    console.log('isSameNode:', isSame);
  }, []);

  return (
    <div>
      <div ref={node1Ref}>
        <p>This is node 1</p>
      </div>
      <div ref={node2Ref}>
        <p>This is node 2</p>
      </div>
    </div>
  );
};

export default NodeExample;
