import logo from './logo.svg';
import './App.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider, useDrop, useDrag } from 'react-dnd';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

const Tile = ({ id, color, children }) => {
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

const Slot = ({ colour, index, word, changeLetter }) => {
  const [{ isOver }, drop] = useDrop(
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
      background: isOver ? 'blue' : colour,
      borderStyle: 'solid',
      fontFamily: 'Oxygen',
      borderColor: 'black',
      color: 'black',
      borderRadius: '5px'
    }}>
      {word[index]} 
    </div>
  );
}

const StartGameDialog = ({ open, handleClose }) => {
  const close = () => {
    handleClose();
  }
  return (
    <Dialog
      open={open}
      onClose={close}
      onClick={null}
    >
      <DialogTitle id="alert-dialog-title">
        {"Welcome to Wordle!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You have 6 chances to guess a 5 letter word.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Play</Button>
      </DialogActions>
    </Dialog>
  )
}

const EndGameDialog = ({ open, won, handleClose, getAnswer }) => {
  const [answer, setAnswer] = useState("");
  const close = () => {
    setAnswer("");
    handleClose();
  }
  useEffect(() => {
    if (open ==  true) {
      getAnswer(setAnswer);
    }
  }, [open]
  )
  return (
    <Dialog
      open={open}
      onClose={close}
      onClick={null}
    >
      <DialogTitle id="alert-dialog-title">
        {won ? "Congrats!" : "Game Over!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The word was {answer}.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Play Again</Button>
      </DialogActions>
    </Dialog>
  )
}

const createTiles = () => {
  let row1 = createRow(13, 0);
  let row2 = createRow(13, 1);
  return(
    <>
      {row1}
      {row2}
    </>
  )
}

const createRow = (numOfTiles, rowNumber) => {
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
  const [token, setToken] = useState("");

  useEffect(() => {
    createToken();
  }, [])
  
  const createToken = () => {
    let token = "";
    let number = Math.floor(Math.random() * 10000000000);
    setToken(token + number);
  };

  return (
    <>
      <Game sessionToken={token} createToken={createToken} />
    </>
  );
}

const Game = ({ sessionToken, createToken }) => {
  const [startUp, setStartUp] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);
  const [word, setWord] = useState(Array(5).fill('_'));
  const [tries, setTries] = useState(6);
  const [colours, setColours] = useState(Array(5).fill('grey'));
  const [resettingGame, setResettingGame] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if(resettingGame ==  true)
    {
      setSession();
      setResettingGame(false);
    }
    
  }, [resettingGame])

  const setLetter = (index, letter, word) => {
    const newWord = word.slice();
    newWord[index] = letter;
    setWord(newWord);
  };

  const guessToJson = () => {
    return {
      Chars: word,
      Token: sessionToken
    }
  };

  const wordToJson = () => {
    return {
      Chars: word
    }
  };

  const tokenToJson = () => {
    return {
      Token: sessionToken
    }
  };

  const setSession = async () => {
    let getAPI = '/api/SetSession';
    if (process.env.NODE_ENV !== 'production') {
      getAPI = 'http://localhost:7022' + getAPI;
    }
    await fetch(getAPI, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(tokenToJson())
    })
    setStartUp(false);
  }

  const validateGuess = async () => {
    let getAPI = '/api/ValidateGuess';
    if (process.env.NODE_ENV !== 'production') {
      getAPI = 'http://localhost:7022' + getAPI;
    }
    const response = await fetch(getAPI, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guessToJson())
    })
    const parsedResponse = await response.json();
    return parsedResponse.valid;
  };

  const checkGuess = async () => {
    const validGuess = await validateGuess();
    if (!validGuess) {
      alert("Not a valid word");
      return;
    };

    let getAPI = '/api/CheckGuess';
    if (process.env.NODE_ENV !== 'production') {
      getAPI = 'http://localhost:7022' + getAPI;
    }
    const response = await fetch(getAPI, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guessToJson())
    })
    const parsedResponse = await response.json();
    setColours(parsedResponse.colours);
    if(tries == 1 ) {
      setGameEnd(true);
    }
    if(checkWin(parsedResponse.colours)) {
      setGameEnd(true);
      setWon(true);
    }
    setTries((prev) => prev - 1);
  }

  const getAnswer = async (resultHandler) => {
    let getAPI = '/api/GetAnswer';
    if (process.env.NODE_ENV !== 'production') {
      getAPI = 'http://localhost:7022' + getAPI;
    }
    const response = await fetch(getAPI, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guessToJson())
    })
    const parsedResponse = await response.json();
    resultHandler(parsedResponse.word);
  }

  const checkWin = (colours) => {
    for (let i = 0; i < 5; i++) {
      if (colours[i] != 'green') {
        return false;
      }
    }
    return true;
  }

  const resetGame = () => {
    setWord(Array(5).fill('_'));
    setTries(6);
    setColours(Array(5).fill('grey'));
    createToken();
    setResettingGame(true);
    setGameEnd(false);
    setWon(false);
  }

  return (
    <>
      <StartGameDialog open={startUp} handleClose={setSession} />
      <EndGameDialog open={gameEnd} won={won} handleClose={resetGame} getAnswer={getAnswer} />
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
              width: '80%',
              paddingLeft: '10px'
            }}>
              Tries Left: {tries}
            </div>
              <div style={{ 
                paddingLeft: '800px',
                width: '20%'
                }}>
                <Button
                  disabled={tries == 0}
                  color='success'
                  onClick={() => {
                    checkGuess();
                  }}
                  variant="contained"
                >
                  Guess
                </Button>
            </div>
          </div>
          <div style={{ 
            height: '20%', 
            width: '100%', 
            display: 'flex'
          }}>
            <Slot colour={colours[0]} index={0} word={word} changeLetter={setLetter}></Slot>
            <Slot colour={colours[1]} index={1} word={word} changeLetter={setLetter}></Slot>
            <Slot colour={colours[2]} index={2} word={word} changeLetter={setLetter}></Slot>
            <Slot colour={colours[3]} index={3} word={word} changeLetter={setLetter}></Slot>
            <Slot colour={colours[4]} index={4} word={word} changeLetter={setLetter}></Slot>
          </div>
          <div style={{
            height: '25%', 
            width: '100%'
          }}>
            {createTiles()}
          </div>
        </div>
      </DndProvider>
    </>
  );  
}

export default App;