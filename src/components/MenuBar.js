import { Button, Tooltip } from "@mui/material";
import Zoom from '@mui/material/Zoom';
import "../styles/MenuBar.css";

const MenuBar = ({ tries, ratio, checkingGuess, profile,
  handleGuess, handleOpenAddTriesDialog, handleLogIn, handleLogOut }) => {
  const loggedOut = profile === null;

  const buttonStyles = {
    fontSize: 'calc(5px + 0.5vw)',
    minWidth: '8vw',
    maxHeight: '8vh',
  };

  return(
    <div className="menu-bar">
      <div className="tries-left-text">
        Tries Left: {tries}
      </div>
      <div className="words-guessed-text">
        Words Guessed Correctly: {ratio}
      </div>
      <div className="buttons">
        <Tooltip
          TransitionComponent={Zoom} 
          title={loggedOut ? "Log In" : "Log Out"}
        >
          <Button
            size="small"
            color='secondary'
            onClick={loggedOut ? handleLogIn : handleLogOut}
            variant={loggedOut ? "outlined" : "contained"}
            style={{...buttonStyles, maxWidth: null, border: loggedOut ? '2px solid' : null}}
          >
            {loggedOut ? "Log In" : profile.email}
          </Button>
        </Tooltip>
        <Tooltip
          TransitionComponent={Zoom} 
          title="Add More Tries"
        >
          <Button
            size="small"
            disabled={tries === 0}
            onClick={handleOpenAddTriesDialog}
            variant="contained"
            color="primary"
            style={buttonStyles}
          >
            Add Tries
          </Button>
        </Tooltip>
        <Tooltip
          TransitionComponent={Zoom} 
          title="Guess The Word"
        >
          <Button
            size="small"
            disabled={tries === 0 || checkingGuess}
            color='success'
            onClick={handleGuess}
            variant="contained"
            style={buttonStyles}
          >
            Guess
          </Button>
        </Tooltip>
      </div>
    </div>
  );
};

export default MenuBar;