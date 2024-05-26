import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

const StartGameDialog = ({ open, loggedOut, handleClose, handleLogIn, handleLogOut }) => {
  const close = () => {
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      onClick={null}
      disableScrollLock={true}
    >
      <DialogTitle id="alert-dialog-title" textAlign="center">
        {"Welcome to Wordle!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" textAlign="center">
          You have 6 chances to guess a 5 letter word. After you guess a word
          you will receive feedback on that word. A green background means a
          letter is in the right spot. A yellow background means the letter is
          not in the right spot but is located somewhere else in the word. Grey
          means that letter does not appear in the word. Good Luck!
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          onClick={loggedOut ? handleLogIn : handleLogOut}
          color='secondary'
        >
          {loggedOut ? "Log In" : "Log Out"}
        </Button>
        <Button onClick={close} color='primary'>
          Play
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StartGameDialog;