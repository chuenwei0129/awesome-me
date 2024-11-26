import React, { useState } from "react"

import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';

const DraggableItem = ({ item }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { name: item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        border: '1px solid gray',
        margin: '4px',
        cursor: 'move',
      }}
    >
      {item}
    </div>
  );
};

const DropArea = ({ onDrop }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        height: '300px',
        width: '100%',
        border: '2px dashed gray',
        backgroundColor: isOver ? 'lightgreen' : 'white',
        textAlign: 'center',
        paddingTop: '50px',
      }}
    >
      {isOver ? 'Release to drop' : 'Drag item here'}
    </div>
  );
};

import { Modal, Button } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [items,] = useState(['Item 1', 'Item 2', 'Item 3']);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDrop = (item) => {
    console.log('Dropped item:', item);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Draggable Items" open={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {items.map((item) => (
          <DraggableItem key={item} item={item} />
        ))}
      </Modal>
      <DropArea onDrop={handleDrop} />
    </DndProvider>
  );
};

export default App;
