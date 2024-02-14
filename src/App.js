import logo from './logo.svg';
import './App.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrop, useDrag } from 'react-dnd';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

const Tile = ({id, color, children}) => {
  const [{ isDragging, canDrag }, dragRef] = useDrag(
    () => ({
      item: {type: id},
      type: id,
      canDrag: () => true,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        canDrag: !!monitor.canDrag()
      })
    }),
    []
  );
  return ( isDragging ? null :
    <div ref={dragRef} id={id} style={{
      width: '100%', 
      fontSize: '70px',
      textAlign: 'center',
      background: color,
      borderStyle: 'solid',
      borderColor: 'black',
      cursor: canDrag ? 'move' : null,
      color: 'white',
      borderRadius: '5px'
    }}>
      {children} 
    </div>
  );
}

const Slot = ({index, word, changeLetter}) => {
  const [{isOver }, drop] = useDrop(
    () => ({
      accept: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
      drop: (item) => changeLetter(index, item.type, word),
      canDrop: () => true,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      })
    }),
    [word]
  );
  return (
    <div ref={drop} style={{
      width: '100%', 
      fontSize: '100px',
      textAlign: 'center',
      background: isOver ? 'green' : 'grey',
      borderStyle: 'solid',
      fontFamily: 'Oxygen',
      borderColor: 'black',
      color: 'white',
      borderRadius: '5px'
    }}>
      {word[index]} 
    </div>
  );
}

const CreateTiles = () => {
  let row1 = CreateRow(13, 0);
  let row2 = CreateRow(13, 1);
  return(
    <>
      {row1}
      {row2}
    </>
  )
}

const CreateRow = (numOfTiles, rowNumber) => {
  let tiles = [];
  for (let i = 0; i < numOfTiles; i++) {
    var letter = String.fromCharCode(97 + i + rowNumber * numOfTiles);
    tiles.push(<Tile key={letter} id={letter} color={'purple'}>{letter}</Tile>);
  }
  return (
    <div style={{ 
      display: 'flex',
      height: '50%'
    }}>
      {tiles}
    </div>
  )
}

const App = () => {
  return <Game />;
}

const Game = () => {
  const [word, setWord] = useState(Array(5).fill('_'));
  const [tries, setTries] = useState(5);

  const setLetter = (index, letter, word) => {
    const newWord = word.slice();
    newWord[index] = letter;
    setWord(newWord);
  }

  const handleGuess = () => {
    if (tries != 0) {
      setTries((prev) => prev - 1);
    }
  }

  const resetGame = () => {
    setWord(Array(5).fill('_'));
    setTries(5);
  }
  
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ 
        height: '100vh', 
        width: '100%'
      }}>
        <div style={{ 
          height: '10%', 
          width: '100%', 
          display: 'flex',
          background: 'lightBlue',
          fontSize: '50px',
          color: 'white',
          borderStyle: 'dashed',
          borderColor: 'black',
          borderRadius: '5px',
          boxSizing: 'border-box'
        }}>
          <div style={{ 
            width: '50%',
            paddingLeft: '10px'
          }}>
            Tries Left: {tries}
          </div>
          <div style={{ 
            width: '50%',
            paddingRight: '10px'
          }}>
            <Box textAlign='right'>
              <Button
                disabled={tries == 0}
                color='success'
                onClick={() => {
                  handleGuess();
                }}
                variant="contained"
              >
                Guess
              </Button>
            </Box>
          </div>
        </div>
        <div style={{ 
          height: '20%', 
          width: '100%', 
          display: 'flex'
        }}>
          <Slot index={0} word={word} changeLetter={setLetter}></Slot>
          <Slot index={1} word={word} changeLetter={setLetter}></Slot>
          <Slot index={2} word={word} changeLetter={setLetter}></Slot>
          <Slot index={3} word={word} changeLetter={setLetter}></Slot>
          <Slot index={4} word={word} changeLetter={setLetter}></Slot>
        </div>
        <div style={{
          height: '25%', 
          width: '100%'
        }}>
          {CreateTiles()}
        </div>
        <div style={{
          width: '100%'
        }}>
          <Box textAlign='center'>
            {tries != 0 ? null : <Button
              onClick={() => {
                resetGame();;
              }}
              variant="contained"
            >
              Try Again
            </Button>}
          </Box>
        </div>
      </div>
    </DndProvider>
  );  
}

export default App;