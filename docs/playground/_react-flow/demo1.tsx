// 从 '@xyflow/react' 库中引入所需的组件和类型
import {
  Background,
  BackgroundVariant,
  BaseEdge,
  Controls,
  EdgeLabelRenderer,
  Handle,
  MiniMap,
  Panel,
  Position,
  ReactFlow,
  addEdge,
  getBezierPath,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type EdgeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css'; // 引入样式
import React from 'react';

// 初始节点数据
const initialNodes = [
  {
    id: '1',
    type: 'red',
    data: { label: 'Initial Node' },
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'blue',
    data: { label: 'Default' },
    position: { x: 100, y: 100 },
  },
];

// 初始边数据
const initialEdges = [{ id: 'e1-2', source: '1', target: '2', label: 'e1-2', type: 'custom' }];

// 节点属性接口
interface NodeProps {
  data: {
    label: string;
  };
}

// 红色节点组件
function RedNode({ data }: NodeProps) {
  return (
    <div className="bg-red-500 w-36 h-24 text-center rounded-md p-2 shadow-lg flex items-center justify-center">
      <Handle type="source" position={Position.Right} /> {/* 源连接点 */}
      <Handle type="target" position={Position.Bottom} /> {/* 目标连接点 */}
      <div className="text-white font-bold" style={{ fontSize: '16px', lineHeight: '1.5rem' }}>
        {data.label}
      </div>
    </div>
  );
}

// 蓝色节点组件
function BlueNode({ data }: NodeProps) {
  return (
    <div className="bg-blue-500 w-24 h-12 text-center text-white rounded-md p-2 shadow-lg flex items-center justify-center">
      <Handle type="source" position={Position.Bottom} /> {/* 源连接点 */}
      <Handle type="target" position={Position.Top} /> {/* 目标连接点 */}
      <div className="font-bold" style={{ fontSize: '14px', lineHeight: '1.25rem' }}>
        {data.label}
      </div>
    </div>
  );
}

// 自定义边组件
function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style = {}, markerEnd }: EdgeProps) {
  const { setEdges } = useReactFlow(); // 使用 React Flow Hook 用于设置边

  // 计算贝塞尔曲线路径和标签位置
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  const onEdgeClick = () => {
    // 点击边时删除对应的边
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
        >
          <button onClick={onEdgeClick} className="bg-transparent border-none text-red-500 cursor-pointer">
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}

// 主应用组件
const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes); // 管理节点状态的 Hook
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges); // 管理边状态的 Hook

  const onConnect = (params: Connection) => {
    // 新的连接生成时添加边
    setEdges((edges) => addEdge(params, edges));
  };

  return (
    <div className="h-[500px] border border-gray-300 rounded-lg shadow-xl mx-auto">
      <ReactFlow
        onConnect={onConnect}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={{
          red: RedNode, // 注册红色节点组件
          blue: BlueNode, // 注册蓝色节点组件
        }}
        edgeTypes={{
          custom: CustomEdge, // 注册自定义边组件
        }}
        className="bg-gray-100"
      >
        <Controls /> {/* 控制组件 */}
        <MiniMap zoomable /> {/* 缩略图 */}
        <Background variant={BackgroundVariant.Lines} /> {/* 网格背景 */}
        <Panel position="top-right">
          <button
            onClick={() => {
              setNodes([
                ...nodes,
                {
                  id: Math.random().toString().slice(2, 6), // 生成随机 ID
                  type: 'red',
                  position: { x: 0, y: 0 },
                  data: {
                    label: '新节点', // 新节点标签
                  },
                },
              ]);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg cursor-pointer border-none"
          >
            添加节点
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

// 导出应用组件
export default App;
