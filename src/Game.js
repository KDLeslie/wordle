import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { checkGuess, getAnswer, getGUID, getScore, incrementScore, setSession, validateGuess } from './Requests';
import StartGameDialog from './DialogStartGame';
import EndGameDialog from './DialogEndGame';
import { createSlots } from './Slot';
import { createTiles } from './Tile';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

const Game = () => {
  const [startUp, setStartUp] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);
  const [guess, setGuess] = useState(Array(5).fill('_'));
  const [tries, setTries] = useState(6);
  const [colours, setColours] = useState(Array(5).fill('grey'));
  const [won, setWon] = useState(false);
  const [checkingGuess, setCheckingGuess] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (sessionToken == null) {
      createToken();
    } else {
      setSession(sessionToken);
    }
  }, [sessionToken]);

  const setLetter = (index, letter, word) => {
    const newWord = word.slice();
    newWord[index] = letter;
    setGuess(newWord);
  };

  const resetGame = () => {
    setGuess(Array(5).fill('_'));
    setTries(6);
    setColours(Array(5).fill('grey'));
    createToken();
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
    setStartUp(false);
    getScore(setScore); // Work around fix
  };

  const handleEndGameDialogClose = () => {
    resetGame();
  };

  const handleGetAnswer = (setState) => {
    getAnswer(sessionToken, setState);
  };

  const createToken = () => {
    getGUID(setSessionToken);
  };

  const handleGuess = (word, sessionToken, handleResult) => {
    setCheckingGuess(true);
    validateGuess(word, (result) => {
      if (!result) {
        enqueueSnackbar('Not a valid Wordle word!', { 
          autoHideDuration: 2000, 
          variant: 'error', 
          style: {fontSize: '20px'}, 
          anchorOrigin: {
            horizontal: 'center', 
            vertical: 'top'
          }
        });
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
      incrementScore(setScore);
    }
    setTries(tries - 1); // Not using (prev) => prev - 1 to prevent bugs from clicking to fast
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
          <SnackbarProvider maxSnack={1} />
          <div style={{ 
            height: '10%', 
            width: '100%', 
            display: 'flex',
            background: 'lightBlue',
            borderStyle: 'dashed',
            borderColor: 'black',
            borderRadius: '5px',
            fontFamily: 'Oxygen',
            boxSizing: 'border-box',
            justifyContent: 'space-between'
          }}>
            <div style={{ 
              width: '50%',
              color: 'black',
              fontSize: '50px',
              margin: 'auto 10px',
              whiteSpace: 'pre'
            }}>
              Tries Left: {tries}
            </div>
            <div style={{ 
              display: 'flex',
              width: '40%',
              color: 'black',
              fontSize: '25px',
              margin: 'auto 10px',
              justifyContent: 'right',
              whiteSpace: 'pre'
            }}>
              Words Guessed Correctly: {score}
            </div>
            <div style={{
              display: 'flex',
              width: '10%',
              alignItems: 'center',
              justifyContent: 'right',
              paddingRight: '10px'
            }}>
              <Button
                disabled={tries === 0 || checkingGuess}
                color='success'
                onClick={() => {
                  handleGuess(guess, sessionToken, handleGuessResult);
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
            {createSlots(colours, guess, setLetter)}
          </div>
          <div style={{
            height: '25%', 
            width: '100%'
          }}>
            {createTiles(3)}
          </div>
        </div>
      </DndProvider>
    </>
  );  
};

export default Game;