import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useState } from 'react';
import { checkGuess, getAnswer, getGUID, incrementDenominator, incrementNumerator, setSession, validateGuess } from './Requests';
import StartGameDialog from './DialogStartGame';
import EndGameDialog from './DialogEndGame';
import { createSlots } from './Slot';
import { createTiles } from './Tile';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import AddTriesDialog from './DialogAddTries';
import { createSnapshots } from './Snapshot';
import MenuBar from './MenuBar';

const Game = () => {
  const [startUp, setStartUp] = useState(true);
  const [gameEnd, setGameEnd] = useState(false);
  const [addTriesDialogOpen, setAddTriesDialogOpen] = useState(false);
  const [guessHistory, setGuessHistory] = useState(Array(1).fill(Array(5).fill('_')));
  const [colourHistory, setColourHistory] = useState(Array(1).fill(Array(5).fill('grey')));
  const [tries, setTries] = useState(6);
  const [won, setWon] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);
  const [ratio, setRatio] = useState("");
  const [safeMode, setSafeMode] = useState(false);
  const [checkingGuess, setCheckingGuess] = useState(false);
  const [index, setIndex] = useState(0);
  
  const currentGuess = guessHistory[index].slice();
  const currentColours = colourHistory[index].slice();

  const updateColours = (colours) => {
    const oldHist = colourHistory.slice();
    oldHist[index] = colours;
    const newHist = [...oldHist, colours];
    setColourHistory(newHist);
  }

  const setGuess = (word) => {
    const newHist = [...guessHistory.slice(), word];
    setGuessHistory(newHist);
  }

  const setWord = (word) => {
    const newHist = guessHistory.slice();
    newHist[index] = word;
    setGuessHistory(newHist);
  }

  const setLetter = (index, letter, word) => {
    const newWord = word.slice();
    newWord[index] = letter;
    setWord(newWord);
  };

  const checkWin = (colours) => {
    for (let i = 0; i < 5; i++) {
      if (colours[i] !== 'green') {
        return false;
      }
    }
    return true;
  };

  const resetGame = () => {
    setGuessHistory(Array(1).fill(Array(5).fill('_')));
    setColourHistory(Array(1).fill(Array(5).fill('grey')));
    setTries(6);
    setIndex(0);
    setWon(false);
    setSafeMode(false);
    getGUID((result) => {
      setSessionToken(result);
      setSession(result, () => incrementDenominator(setRatio));
    })
  };

  const handleStartGameDialogClose = () => {
    setStartUp(false);
    resetGame();
  };

  const handleEndGameDialogClose = () => {
    setGameEnd(false);
    resetGame();
  };

  const handleOpenAddTriesDialog = () => {
    if(safeMode) {
      handleAddTries();
    }
    else {
      setAddTriesDialogOpen(true);
    }
  };

  const handleAddTriesDialogClose = () => {
    setAddTriesDialogOpen(false);
  };

  const handleGetAnswer = (setState) => {
    getAnswer(sessionToken, setState);
  };

  const handleAddTries = () => {
    setTries(tries + 1);
    setSafeMode(true);
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
    updateColours(colours);
    if (tries === 1 ) {
      setGameEnd(true);
    }
    if (checkWin(colours)) {
      setGameEnd(true);
      setWon(true);
      if(!safeMode) {
        incrementNumerator(setRatio);
      }
    }
    setTries(tries - 1); // Not using (prev) => prev - 1 to prevent bugs from clicking to fast
    setIndex(index + 1);
    setGuess(currentGuess);
  };

  return (
    <>
      <StartGameDialog open={startUp} handleClose={handleStartGameDialogClose} />
      <EndGameDialog open={gameEnd} won={won} handleGetAnswer={handleGetAnswer} handleClose={handleEndGameDialogClose} />
      <AddTriesDialog open={addTriesDialogOpen} handleAddTries={handleAddTries} handleClose={handleAddTriesDialogClose} />
      <DndProvider backend={HTML5Backend}>
        <div style={{ 
            height: '100vh', 
            width: '100%'
        }}>
          <SnackbarProvider maxSnack={1} />
          <MenuBar tries={tries} ratio={ratio} guess={currentGuess} checkingGuess={checkingGuess} sessionToken={sessionToken} handleGuess={handleGuess} handleGuessResult={handleGuessResult} handleOpenAddTriesDialog={handleOpenAddTriesDialog} />
          <div style={{ 
            height: '20%', 
            width: '100%', 
            display: 'flex'
          }}>
            {createSlots(currentColours, currentGuess, setLetter)}
          </div>
          <div style={{
            height: '40%', 
            width: '100%'
          }}>
            {createTiles(3)}
          </div>
          <div style={{ 
            height: '7%', 
            width: '100%', 
            display: 'flex',
            boxSizing: 'border-box',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
            {createSnapshots(guessHistory, colourHistory, index)}
          </div>
        </div>
      </DndProvider>
    </>
  );  
};

export default Game;