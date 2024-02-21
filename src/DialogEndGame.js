import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

const EndGameDialog = ({ open, won, handleGetAnswer, handleClose }) => {
  const [answer, setAnswer] = useState("");

  const close = () => {
    setAnswer("");
    handleClose();
  };

  useEffect(() => {
    if (open === true) {
      handleGetAnswer(setAnswer);
    }
  }, [open, handleGetAnswer]);

  return (
    <Dialog
      open={open}
      onClose={close}
      onClick={null}
    >
      <DialogTitle id="alert-dialog-title">
        {won ? "Congrats!" : "Game Over!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          The word was {answer}.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Play Again</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EndGameDialog;