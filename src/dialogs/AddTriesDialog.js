import Button from '@mui/material/Button';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

const AddTriesDialog = ({ open, handleAddTries, handleClose }) => {
  const addTries = () => {
    handleAddTries();
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      disableScrollLock={true}
    >
      <DialogTitle id="alert-dialog-title" textAlign="center">
        Add More Tries?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" textAlign="center">
          You will gain more tries but your score won't increase,
          even if you get the word correct. Do you still want more
          tries?
        </DialogContentText>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={handleClose} color='secondary'>
          Cancel
        </Button>
        <Button onClick={addTries} color='primary'>
          Add Tries
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTriesDialog;