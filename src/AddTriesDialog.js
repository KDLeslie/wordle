import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

const AddTriesDialog = ({ open, handleAddTries, handleClose }) => {
  const close = () => {
    handleClose();
  };

  const addTries = () => {
    handleAddTries();
    close();
  };

  return (
    <Dialog
      open={open}
      onClose={close}
    >
      <DialogTitle id="alert-dialog-title">
        Add More Tries?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You will gain more tries but your score won't increase,
          even if you get the word correct. Do you still want more
          tries?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color='secondary'>Cancel</Button>
        <Button onClick={addTries} color='primary'>Add Tries</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTriesDialog;