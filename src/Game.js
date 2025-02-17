import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import { checkGuess, removeSessions, getAnswer, getGUID, getRatio, incrementDenominator,
  incrementNumerator, setSession, validateGuess } from './services/Communications';
import StartGameDialog from './dialogs/StartGameDialog';
import EndGameDialog from './dialogs/EndGameDialog';
import { useSnackbar } from 'notistack';
import AddTriesDialog from './dialogs/AddTriesDialog';
import MenuBar from './components/MenuBar';
import SlotPlane from './components/SlotPlane';
import TilePlane from './components/TilePlane';
import SnapshotPlane from './components/SnapshotPlane';

const CleanupHandler = ({ email, sessionToken }) => {
  const [sessions, setSessions] = useState({});
  useEffect(() => {
    if (!(sessionToken in sessions) && sessionToken) {
      // session token is unique so use that one as the key
      const newSessions = {...sessions, [sessionToken]:email};
      setSessions(newSessions);
    };

    const handleUnload = () => {
      removeSessions(sessions)
    };

    window.addEventListener('unload', handleUnload);

    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [email, sessionToken, sessions, setSessions]);

  return null;
};

const Game = ({ profile, handleLogIn, handleLogOut }) => {
  const [startGameDialogOpen, setStartGameDialogOpen] = useState(true);
  const [endGameDialogOpen, setEndGameDialogOpen] = useState(false);
  const [addTriesDialogOpen, setAddTriesDialogOpen] = useState(false);
  const [guessHistory, setGuessHistory] = useState(Array(1).fill(Array(5).fill('_')));
  const [colourHistory, setColourHistory] = useState(Array(1).fill(Array(5).fill('grey')));
  const [letterColorMappings, setLetterColorMappings] = useState(Array.from({ length: 5 }, () => ({})));
  const [tries, setTries] = useState(6);
  const [won, setWon] = useState(false);
  const [sessionToken, setSessionToken] = useState("");
  const [ratio, setRatio] = useState("");
  const [safeMode, setSafeMode] = useState(false);
  const [checkingGuess, setCheckingGuess] = useState(false);
  const [guessCount, setGuessCount] = useState(0);
  const { width, height } = useWindowSize();
  const { enqueueSnackbar } = useSnackbar();

  const currentGuess = guessHistory[guessCount].slice();
  const currentColours = [];

  for (let i = 0; i < 5; i++) {
    let letter = currentGuess[i];
    let mapping = letterColorMappings[i];
    if (letter in mapping) {
      currentColours.push(mapping[letter]);
    } else {
      currentColours.push('grey');
    }
  }

  const loggedOut = profile === null;

  useEffect(() => {
    const resetGame = () => {
      setGuessHistory(Array(1).fill(Array(5).fill('_')));
      setColourHistory(Array(1).fill(Array(5).fill('grey')));
      setLetterColorMappings(Array.from({ length: 5 }, () => ({})));
      setTries(6);
      setGuessCount(0);
      setWon(false);
      setSafeMode(false);
      getGUID((result) => {
        setSessionToken(result);
        setSession(result, profile?.email)
          .then(() => 
            incrementDenominator(profile?.email, setRatio)
              .catch((error) => enqueueSnackbar(error.message + " Please refresh the page", {variant: "error"})))
        .catch((error) => enqueueSnackbar(error.message + " Please refresh the page", {variant: "error"}));
      }).catch((error) => enqueueSnackbar(error.message + " Please refresh the page", {variant: "error"}))
    };
    // reset the game if the user logs in/out during the game
    if (!startGameDialogOpen && !endGameDialogOpen) {
      resetGame(); 
    } else {
      // note: currently gets called one extra time than needed
      getRatio(profile?.email, (result) => setRatio(result));
    }
  }, [profile, startGameDialogOpen, endGameDialogOpen, enqueueSnackbar]);

  const addColoursToHistory = (colours) => {
    const oldHist = colourHistory.slice();
    oldHist[guessCount] = colours;
    const newHist = [...oldHist, colours];
    setColourHistory(newHist);
  }

  const addGuessToHistory = (word) => {
    // differs from 'addColoursToHistory' as guessHistory already
    // correctly holds the current guess whereas colourHistory 
    // does not
    const newHist = [...guessHistory.slice(), word];
    setGuessHistory(newHist);
  }

  const updateColorMappings = (colors, guess) => {
    const mappings = letterColorMappings.slice();
    for (let i = 0; i < 5; i++) {
      let guessedLetter = guess[i];
      let returnedColor = colors[i];
      let mapping = mappings[i];
      // update mapping in priority of green -> yellow -> grey
      if (!(guessedLetter in mapping) || ((returnedColor === 'yellow' && mapping[guessedLetter] === 'grey') || returnedColor === 'green')) {
        mapping[guessedLetter] = returnedColor;
      }
    }
    setLetterColorMappings(mappings);
  }

  const setWord = (word) => {
    const newHist = guessHistory.slice();
    newHist[guessCount] = word;
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

  const handleStartGameDialogClose = () => {
    setStartGameDialogOpen(false);
  };

  const handleEndGameDialogClose = () => {
    setEndGameDialogOpen(false);
  };

  const handleOpenAddTriesDialog = () => {
    if (safeMode) {
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
    getAnswer(sessionToken, profile?.email, resultHandler)
      .catch((error) => enqueueSnackbar(error.message + " Please refresh the page", {variant: "error"}));
  };

  const handleAddTries = () => {
    setTries(tries + 1);
    setSafeMode(true);
  };

  const handleGuess = () => {
    setCheckingGuess(true);
    validateGuess(currentGuess, (result) => {
      if (!result) {
        enqueueSnackbar('Not a valid Wordle word!', {variant: 'warning'});
        return;
      };
      checkGuess(currentGuess, sessionToken, profile?.email, handleGuessResult)
        .catch((error) => enqueueSnackbar(error.message + " Please try again later", {variant: "error"}));
    }).catch((error) => enqueueSnackbar(error.message + " Please try again later", {variant: "error"}))
        .finally(() => setCheckingGuess(false));
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
        incrementNumerator(profile?.email, setRatio)
          .catch((error) => enqueueSnackbar(error.message + " Please try again later", {variant: "error"}));
      }
    }
    setTries(tries - 1); // Not using (prev) => prev - 1 to prevent bugs from clicking to fast
    setGuessCount(guessCount + 1);
    addColoursToHistory(colours);
    addGuessToHistory(currentGuess);
    updateColorMappings(colours, currentGuess)
  };

  return (
    <>
      <StartGameDialog
        open={startGameDialogOpen}
        loggedOut={loggedOut}
        handleClose={handleStartGameDialogClose}
        handleLogIn={handleLogIn}
        handleLogOut={handleLogOut}
      />
      <EndGameDialog
        open={endGameDialogOpen}
        didWin={won}
        loggedOut={loggedOut}
        handleGetAnswer={handleGetAnswer}
        handleClose={handleEndGameDialogClose}
        handleLogIn={handleLogIn}
        handleLogOut={handleLogOut}
      />
      <AddTriesDialog
        open={addTriesDialogOpen}
        handleAddTries={handleAddTries}
        handleClose={handleAddTriesDialogClose}
      />
      <MenuBar
        tries={tries}
        ratio={ratio}
        checkingGuess={checkingGuess}
        profile={profile}
        handleGuess={handleGuess}
        handleOpenAddTriesDialog={handleOpenAddTriesDialog}
        handleLogIn={handleLogIn}
        handleLogOut={handleLogOut}
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
        guessCount={guessCount}
      />
      <CleanupHandler
        email={profile?.email}
        sessionToken={sessionToken}
      />
      {won && <Confetti
        width={width}
        height={height}
      />}
    </>
  );
};

export default Game;