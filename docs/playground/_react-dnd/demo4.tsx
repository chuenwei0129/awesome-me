// DraggableItem.tsx
import React from 'react';
import { useDrag } from 'react-dnd';

interface DraggableItemProps {
  item: string;
  onClose: () => void;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ item, onClose }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { name: item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        onClose();
      }
    },
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
        backgroundColor: 'white',
      }}
    >
      {item}
    </div>
  );
};


// DropArea.tsx
import { useState } from 'react';
import { useDrop } from 'react-dnd';

interface DropAreaProps {
  onDrop: (item: { name: string }) => void;
}

const DropArea: React.FC<DropAreaProps> = ({ onDrop }) => {
  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item: { name: string }) => {
      setDroppedItems((prevItems) => [...prevItems, item.name]);
      onDrop(item);
    },
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
      {droppedItems.length > 0 && (
        <ul style={{ marginTop: '20px' }}>
          {droppedItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};


// App.tsx
import { Button } from 'antd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [items] = useState(['Item 1', 'Item 2', 'Item 3']);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const handleClose = () => {
    setIsPopupVisible(false);
  };

  const handleDrop = (item: { name: string }) => {
    console.log('Dropped item:', item);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Button type="primary" onClick={showPopup}>
        Open Popup
      </Button>
      {isPopupVisible && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            backgroundColor: 'white',
            border: '1px solid gray',
            zIndex: 1000,
          }}
        >
          <Button onClick={handleClose} style={{ margin: '10px' }}>Close</Button>
          {items.map((item) => (
            <DraggableItem key={item} item={item} onClose={handleClose} />
          ))}
        </div>
      )}
      <div style={{ padding: '20px', marginTop: '20px' }}>
        <DropArea onDrop={handleDrop} />
      </div>
    </DndProvider>
  );
};

export default App;
