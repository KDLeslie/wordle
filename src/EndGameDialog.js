import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

const EndGameDialog = ({ open, didWin, profile, handleGetAnswer, 
  handleClose, handleLogIn, handleLogOut }) => {
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    if (open === true && answer === null) {
      handleGetAnswer(setAnswer);
    }
  }, [open, answer, handleGetAnswer]);

  const close = () => {
    setAnswer(null);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      onClick={null}
    >
      <DialogTitle id="alert-dialog-title">
        {didWin ? "Congrats!" : "Game Over!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The word was: {answer}.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={profile === null ? handleLogIn : handleLogOut}
          color='secondary'
        >
          {profile === null ? "Login" : "Logout"}
        </Button>
        <Button onClick={close}>Play Again</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EndGameDialog;