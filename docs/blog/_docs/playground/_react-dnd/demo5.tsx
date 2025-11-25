// Box.tsx
import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { DndProvider, useDrag, useDrop } from 'react-dnd';

// 定义 styles
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

const style1 = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
};

// 定义表格列
const columns: ColumnsType<any> = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

// 生成表格数据
const data: Array<{ key: number; name: string; age: number; address: string }> = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

// 定义 Box 组件类型
interface BoxProps {
  name: string;
}

// Box 组件
const Box: React.FC<BoxProps> = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <div
      ref={drag}
      style={{ ...style, transform: 'translateZ(0)', opacity }}
      data-testid={`box`}
    >
      {/* 表格组件 */}
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 240 }}
      />
    </div>
  );
};

// Dustbin 组件
const Dustbin: React.FC = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    drop: () => ({ name: 'Dustbin' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return (
    <div ref={drop} style={{ ...style1, backgroundColor }} data-testid="dustbin">
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </div>
  );
};

// Container 组件
const Container: React.FC = () => {
  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Dustbin />
      </div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        <Box name="Glass" />
      </div>
    </div>
  );
};

// App 组件
const App: React.FC = () => {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Container />
      </DndProvider>
    </div>
  );
};

export default App;
