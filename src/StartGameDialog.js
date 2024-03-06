import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

const StartGameDialog = ({ open, handleClose }) => {
  const close = () => {
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
      onClick={null}
    >
      <DialogTitle id="alert-dialog-title">
        {"Welcome to Wordle!"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You have 6 chances to guess a 5 letter word. After you guess a word
          you will receive feedback on that word. A green background means a
          letter is in the right spot. A yellow background means the letter is
          not in the right spot but is located somewhere else in the word. Grey
          means that letter does not appear in the word. Good Luck!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Play</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StartGameDialog;