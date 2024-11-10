import { Graph } from '@antv/x6';
import { Button } from 'antd';
import React, { useEffect } from 'react';
import { getDirectoryStructure } from './fileSystem';

// const convertToGraphData = (structure) => {
//   // 将文件系统结构转换为图数据
//    // 这里需要根据实际情况进行转换
//    // 示例中只是简单地将文件夹和文件转换为节点
//    const nodes = [];
//    const edges = [];

//    const traverse = (item, parentId) => {
//     const id = item.name;
//      nodes.push({
//        id,
//        shape: item.type === 'directory' ? 'rect' : 'ellipse',
//        label: item.name,
//      });
// }

const App = () => {
  const graphContainerRef = React.useRef(null!);

  useEffect(() => {
    const graph = new Graph({
      container: graphContainerRef.current,
      background: {
        color: '#F2F7FA',
      },
    });

    graph.fromJSON({}); // 渲染元素
    graph.centerContent(); // 居中显示
  }, []);

  const chooseDir = async () => {
    const structure = await getDirectoryStructure();
    console.log('🚀 ~ chooseDir ~ structure:', structure);
  };

  return (
    <div className="flex flex-col min-h-screen w-full gap-2">
      <h2 className="flex justify-center items-center">项目目录结构可视化</h2>
      <Button onClick={chooseDir}>选择项目</Button>
      {/* 展开/折叠树 */}
      <div className="flex-1" ref={graphContainerRef}></div>
    </div>
  );
};
export default App;
