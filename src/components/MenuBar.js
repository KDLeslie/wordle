import { Button } from "@mui/material";
import "../styles/MenuBar.css";

const MenuBar = ({ tries, ratio, checkingGuess, profile,
  handleGuess, handleOpenAddTriesDialog, handleLogIn, handleLogOut }) => {
  const handleClick = () => {
    handleGuess();
  };

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
        <Button
          size="small"
          color='secondary'
          onClick={profile == null ? handleLogIn : handleLogOut}
          variant={profile == null ? "outlined" : "contained"}
          sx={{...buttonStyles, maxWidth: null, border: (profile == null ? '2px solid' : null)}}
        >
          {profile == null ? "Log In" : profile.email}
        </Button>
        <Button
          size="small"
          disabled={tries === 0}
          onClick={handleOpenAddTriesDialog}
          variant="contained"
          color="primary"
          sx={buttonStyles}
        >
          Add Tries
        </Button>
        <Button
          size="small"
          disabled={tries === 0 || checkingGuess}
          color='success'
          onClick={handleClick}
          variant="contained"
          sx={buttonStyles}
        >
          Guess
        </Button>
      </div>
    </div>
  );
};

export default MenuBar;