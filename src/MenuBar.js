import { Button } from "@mui/material";

const MenuBar = ({ tries, ratio, checkingGuess, profile,
  handleGuess, handleOpenAddTriesDialog, handleLogIn, handleLogOut }) => {
    const handleClick = () => {
      handleGuess();
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
          width: '30%',
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
          width: '35%',
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
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Button
            color='secondary'
            onClick={profile == null ? handleLogIn : handleLogOut}
            variant="outlined"
            style={{ border: '2px solid' }}
          >
            {profile == null ? "Log In" : profile.email}
          </Button>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Button
            disabled={tries === 0}
            onClick={handleOpenAddTriesDialog}
            variant="contained"
            color="primary"
          >
            Add Tries
          </Button>
        </div>
        <div style={{
          display: 'flex',
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
