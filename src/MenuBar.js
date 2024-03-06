import { Button } from "@mui/material";

const MenuBar = ({ tries, ratio, guess, checkingGuess, sessionToken,
  handleGuess, handleGuessResult, handleOpenAddTriesDialog }) => {
    const handleClick = () => {
      handleGuess(guess, sessionToken, handleGuessResult);
    };

    return(
      <div style={{
        height: '10%',
        width: '100%',
        display: 'flex',
        background: 'mistyRose',
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: '5px',
        fontFamily: 'Oxygen',
        boxSizing: 'border-box',
        justifyContent: 'space-between'
      }}>
        <div style={{
          width: '35%',
          color: 'black',
          textShadow: '1px 1px 3px #000000',
          fontSize: '50px',
          margin: 'auto 10px',
          whiteSpace: 'pre'
        }}>
          Tries Left: {tries}
        </div>
        <div style={{
          display: 'flex',
          width: '45%',
          color: 'forestGreen',
          textShadow: '1px 1px 3px forestGreen',
          fontSize: '40px',
          margin: 'auto 10px',
          justifyContent: 'left',
          whiteSpace: 'pre'
        }}>
          Words Guessed Correctly: {ratio}
        </div>
        <div style={{
          display: 'flex',
          width: '10%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Button
            disabled={tries === 0}
            onClick={handleOpenAddTriesDialog}
            variant="contained"
          >
            Add Tries
          </Button>
        </div>
        <div style={{
          display: 'flex',
          width: '10%',
          alignItems: 'center',
          justifyContent: 'center',
          paddingRight: '5px'
        }}>
          <Button
            disabled={tries === 0 || checkingGuess}
            color='success'
            onClick={handleClick}
            variant="contained"
          >
            Guess
          </Button>
        </div>
      </div>
    );
};

export default MenuBar;
