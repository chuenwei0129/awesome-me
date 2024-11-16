import React, { useEffect, useRef } from 'react';

// compareDocumentPosition: 比较两个节点的文档位置（如是前后关系、包含关系等），它返回一个位掩码。
// contains: 检查一个节点是否包含另一个节点。
// cloneNode: 复制节点，如果传入true，会进行深拷贝。
// isEqualNode: 检查两个节点是否具有相同的属性和内容。
// isSameNode: 检查两个引用是否指向同一个节点。

const NodeExample = () => {
  const node1Ref = useRef<HTMLDivElement>(null!);
  const node2Ref = useRef<HTMLDivElement>(null!);

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
