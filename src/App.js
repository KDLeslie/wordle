import logo from './logo.svg';
import './App.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrop, useDrag } from 'react-dnd';
import { useState } from 'react';

function Tile({id, color, children}) {
  const [{ opacity, isDragging, canDrag }, dragRef] = useDrag(
    () => ({
      item: {type: id},
      type: id,
      canDrag: () => true,
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
        isDragging: !!monitor.isDragging(),
        canDrag: !!monitor.canDrag()
      })
    }),
    []
  );
  return ( isDragging ? null :
    <div ref={dragRef} id={id} style={{
      width: '100%', 
      fontSize: '50px',
      textAlign: 'center',
      background: color,
      borderStyle: 'solid',
      cursor: canDrag ? 'move' : null,
    }}>
      {children} 
    </div>
  );
}

function Slot({children}) {
  const [letter, setLetter] = useState(children);
  const [{isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      drop: (item) => setLetter(item.type),
      canDrop: () => true,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop()
      })
    }),
    []
  );
  return (
    <div ref={drop} style={{
      width: '100%', 
      fontSize: '50px',
      textAlign: 'center',
      background: isOver ? 'green' : 'red',
      borderStyle: 'solid',
    }}>
      {letter} 
    </div>
  );
}

function CreateTiles() {
  let row1 = CreateRow(13, 0);
  let row2 = CreateRow(13, 1);
  return(
    <>
      {row1}
      {row2}
    </>
  )
}

function CreateRow(numOfTiles, rowNumber) {
  let tiles = [];
  for (let i = 0; i < numOfTiles; i++) {
    var letter = String.fromCharCode(97 + i + rowNumber * numOfTiles);
    tiles.push(<Tile key={letter} id={letter} color={'yellow'}>{letter}</Tile>);
  }
  return (
    <div style={{ 
      display: 'flex'
    }}>
      {tiles}
    </div>
  )
}

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ 
        height: '100vh', 
        width: '100%'}}
      >
        <div style={{ 
          height: '10%', 
          width: '100%', 
          display: 'flex'
        }}>
          <Slot>_</Slot>
          <Slot>_</Slot>
          <Slot>_</Slot>
          <Slot>_</Slot>
          <Slot>_</Slot>
        </div>
        <div style={{
          height: '40%', 
          width: '100%'
        }}>
          {CreateTiles()}
        </div>
      </div>
    </DndProvider>
  );  
}

export default App;