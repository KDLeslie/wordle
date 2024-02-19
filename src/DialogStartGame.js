import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import { setSession } from './Requests';

const StartGameDialog = ({ open, token, resultHandler }) => {
  const close = () => {
    setSession(token, resultHandler);
    resultHandler(false);
  }
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
  )
}

export default StartGameDialog;