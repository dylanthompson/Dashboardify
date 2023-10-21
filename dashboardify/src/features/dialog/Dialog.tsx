import DialogTitle from '@mui/material/DialogTitle';
import MuiDialog from '@mui/material/Dialog';
import { Button, DialogActions } from '@mui/material';

export  interface DialogProps {
  open: boolean;
  selectedValue?: string;
  title?: string;
  onClose: (value: string) => void;
  children?: any[] | any
}

export default function Dialog(props: DialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <MuiDialog onClose={handleClose} open={open}>
      <DialogTitle>{props.title}</DialogTitle>
      {props.children}
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          OK
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}