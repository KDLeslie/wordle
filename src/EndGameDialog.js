import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

const EndGameDialog = ({ open, didWin, handleGetAnswer, handleClose }) => {
  const [answer, setAnswer] = useState(null);

  useEffect(() => {
    if (open === true) {
      handleGetAnswer(setAnswer);
    }
  }, [open, handleGetAnswer]);

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
        <Button onClick={close}>Play Again</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EndGameDialog;