import { useState } from 'react';
import { checkGuess, getAnswer, getGUID, incrementDenominator, incrementNumerator, setSession, validateGuess } from './Communications';
import StartGameDialog from './StartGameDialog';
import EndGameDialog from './EndGameDialog';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import AddTriesDialog from './AddTriesDialog';
import MenuBar from './MenuBar';
import SlotPlane from './SlotPlane';
import TilePlane from './TilePlane';
import SnapshotPlane from './SnapshotPlane';

const Game = () => {
  const [startGameDialogOpen, setStartGameDialogOpen] = useState(true);
  const [endGameDialogOpen, setEndGameDialogOpen] = useState(false);
  const [addTriesDialogOpen, setAddTriesDialogOpen] = useState(false);
  const [guessHistory, setGuessHistory] = useState(Array(1).fill(Array(5).fill('_')));
  const [colourHistory, setColourHistory] = useState(Array(1).fill(Array(5).fill('grey')));
  const [tries, setTries] = useState(6);
  const [won, setWon] = useState(false);
  const [sessionToken, setSessionToken] = useState("");
  const [ratio, setRatio] = useState("");
  const [safeMode, setSafeMode] = useState(false);
  const [checkingGuess, setCheckingGuess] = useState(false);
  const [index, setIndex] = useState(0);

  const currentGuess = guessHistory[index].slice();
  const currentColours = colourHistory[index].slice();

  const addColoursToHistory = (colours) => {
    const oldHist = colourHistory.slice();
    oldHist[index] = colours;
    const newHist = [...oldHist, colours];
    setColourHistory(newHist);
  }

  const addGuessToHistory = (word) => {
    // differs from 'addColoursToHistory' as guessHistory already
    // correctly holds the current guess whereas colourHistory does not
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
    setStartGameDialogOpen(false);
    resetGame();
  };

  const handleEndGameDialogClose = () => {
    setEndGameDialogOpen(false);
    resetGame();
  };

  const handleOpenAddTriesDialog = () => {
    if(safeMode) {
      handleAddTries();
    }
    else {
      // open warning dialog if it's the first time adding tries
      setAddTriesDialogOpen(true);
    }
  };

  const handleAddTriesDialogClose = () => {
    setAddTriesDialogOpen(false);
  };

  const handleGetAnswer = (resultHandler) => {
    getAnswer(sessionToken, resultHandler);
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
    // last try so end game
    if (tries === 1 ) {
      setEndGameDialogOpen(true);
    }
    if (checkWin(colours)) {
      setEndGameDialogOpen(true);
      setWon(true);
      // user added tries so don't increase score
      if (!safeMode) {
        incrementNumerator(setRatio);
      }
    }
    setTries(tries - 1); // Not using (prev) => prev - 1 to prevent bugs from clicking to fast
    setIndex(index + 1);
    addColoursToHistory(colours);
    addGuessToHistory(currentGuess);
  };

  return (
    <>
      <StartGameDialog
        open={startGameDialogOpen}
        handleClose={handleStartGameDialogClose}
      />
      <EndGameDialog
        open={endGameDialogOpen}
        didWin={won}
        handleGetAnswer={handleGetAnswer}
        handleClose={handleEndGameDialogClose}
      />
      <AddTriesDialog
        open={addTriesDialogOpen}
        handleAddTries={handleAddTries}
        handleClose={handleAddTriesDialogClose}
      />
        <div style={{
            height: '100vh',
            width: '100%'
        }}>
          <SnackbarProvider maxSnack={1} />
          <MenuBar
            tries={tries}
            ratio={ratio}
            guess={currentGuess}
            checkingGuess={checkingGuess}
            sessionToken={sessionToken}
            handleGuess={handleGuess}
            handleGuessResult={handleGuessResult}
            handleOpenAddTriesDialog={handleOpenAddTriesDialog}
          />
          <SlotPlane
          currentColours={currentColours}
          currentGuess={currentGuess}
          setLetter={setLetter}
          />
          <TilePlane />
          <SnapshotPlane
            guessHistory={guessHistory}
            colourHistory={colourHistory}
            index={index}
          />
        </div>
    </>
  );
};

export default Game;