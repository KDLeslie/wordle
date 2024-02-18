import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { getAnswer } from './Requests';

const EndGameDialog = ({ open, won, word, sessionToken, handleClose }) => {
  const [answer, setAnswer] = useState("");
  const close = () => {
    setAnswer("");
    handleClose();
  }
  useEffect(() => {
    if (open ==  true) {
      getAnswer(setAnswer, word, sessionToken);
    }
  }, [open, word, sessionToken]
  )
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
  )
}

export default EndGameDialog;