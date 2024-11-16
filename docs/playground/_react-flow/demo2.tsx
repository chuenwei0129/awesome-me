import React from 'react';

import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  MiniMap,
  Node,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';

import { connect, createAudioNode } from './audio/Audio';
import { OscillatorNode } from './audio/OscillatorNode';
import { OutputNode } from './audio/OutputNode';
import { VolumeNode } from './audio/VolumeNode';

import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'a',
    type: 'osc',
    data: { frequency: 220, type: 'square' },
    position: { x: 200, y: 0 },
  },
  {
    id: 'b',
    type: 'volume',
    data: { gain: 0.5 },
    position: { x: 150, y: 250 },
  },
  {
    id: 'c',
    type: 'out',
    data: {},
    position: { x: 350, y: 400 },
  },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
  osc: OscillatorNode,
  volume: VolumeNode,
  out: OutputNode,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const proOptions = { hideAttribution: true };

  const onConnect = (params: Connection) => {
    connect(params.source, params.target);
    setEdges((eds) => addEdge(params, eds));
  };

  function addOscNode() {
    const id = Math.random().toString().slice(2, 8);
    const position = { x: 0, y: 0 };
    const type = 'osc';
    const data = { frequency: 400, type: 'sine' };

    setNodes([...nodes, { id, type, data, position }]);
    createAudioNode(id, type, data);
  }

  function addVolumeNode() {
    const id = Math.random().toString().slice(2, 8);
    const data = { gain: 0.5 };
    const position = { x: 0, y: 0 };
    const type = 'volume';

    setNodes([...nodes, { id, type, data, position }]);
    createAudioNode(id, type, data);
  }

  return (
    <div style={{ height: '80vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Lines} />
        <Panel className={'space-x-4'} position="top-right">
          <button className={'p-[4px] rounded bg-white shadow'} onClick={addOscNode}>
            添加振荡器节点
          </button>
          <button className={'p-[4px] rounded bg-white shadow'} onClick={addVolumeNode}>
            添加音量节点
          </button>
        </Panel>
      </ReactFlow>
    </div>
  );
}
