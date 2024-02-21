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
          You have 6 chances to guess a 5 letter word.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Play</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StartGameDialog;