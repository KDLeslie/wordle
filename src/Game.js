import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { checkGuess, getAnswer, setSession, validateGuess } from './Requests';
import StartGameDialog from './DialogStartGame';
import EndGameDialog from './DialogEndGame';
import { createSlots } from './Slot';
import { createTiles } from './Tile';

const Game = ({ sessionToken, createToken }) => {
  const [startUp, setStartUp] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);
  const [word, setWord] = useState(Array(5).fill('_'));
  const [tries, setTries] = useState(6);
  const [colours, setColours] = useState(Array(5).fill('grey'));
  const [resettingGame, setResettingGame] = useState(false);
  const [won, setWon] = useState(false);
  const [checkingGuess, setCheckingGuess] = useState(false);

  useEffect(() => {
    if (resettingGame === true) {
      setSession(sessionToken);
      setResettingGame(false);
    }
  }, [resettingGame, sessionToken]);

  const setLetter = (index, letter, word) => {
    const newWord = word.slice();
    newWord[index] = letter;
    setWord(newWord);
  };

  const resetGame = () => {
    setWord(Array(5).fill('_'));
    setTries(6);
    setColours(Array(5).fill('grey'));
    createToken();
    setResettingGame(true);
    setGameEnd(false);
    setWon(false);
  };

  const checkWin = (colours) => {
    for (let i = 0; i < 5; i++) {
      if (colours[i] !== 'green') {
        return false;
      }
    }
    return true;
  };

  const handleStartGameDialogClose = () => {
    setSession(sessionToken);
    setStartUp(false);
  };

  const handleEndGameDialogClose = () => {
    resetGame();
  };

  const handleGetAnswer = (setState) => {
    getAnswer(sessionToken, setState);
  };

  const handleGuess = (word, sessionToken, handleResult) => {
    setCheckingGuess(true);
    validateGuess(word, (result) => {
      if (!result) {
        alert("Not a valid word");
        setCheckingGuess(false);
        return;
      };
      checkGuess(word, sessionToken, handleResult);
      setCheckingGuess(false);
    });
  };

  const handleGuessResult = (colours) => {
    setColours(colours);
    if (tries === 1 ) {
      setGameEnd(true);
    }
    if (checkWin(colours)) {
      setGameEnd(true);
      setWon(true);
    }
    setTries((prev) => prev - 1);
  };

  return (
    <>
      <StartGameDialog open={startUp} handleClose={handleStartGameDialogClose} />
      <EndGameDialog open={gameEnd} won={won} handleGetAnswer={handleGetAnswer} handleClose={handleEndGameDialogClose} />
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
            fontFamily: 'Oxygen',
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
                disabled={tries === 0 || checkingGuess}
                color='success'
                onClick={() => {
                  handleGuess(word, sessionToken, handleGuessResult);
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
            {createSlots(colours, word, setLetter)}
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
};

export default Game;