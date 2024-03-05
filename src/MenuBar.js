import { Button } from "@mui/material";

const MenuBar = ({ tries, ratio, guess, checkingGuess, sessionToken, handleGuess, handleGuessResult, handleOpenAddTriesDialog }) => {

    return(
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
              width: '40%',
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
                onClick={() => {
                  handleGuess(guess, sessionToken, handleGuessResult);
                }}
                variant="contained"
              >
                Guess
              </Button>
            </div>
          </div>
    );

};

export default MenuBar;
