import DialogTitle from '@mui/material/DialogTitle';
import MuiDialog from '@mui/material/Dialog';

export interface DialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
  children: any[]
}

export function Dialog(props: DialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <MuiDialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      {props.children}
    </MuiDialog>
  );
}