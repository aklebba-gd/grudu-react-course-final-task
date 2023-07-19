import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

interface CustomDialogProps {
  open: boolean;
  handleOpen: (arg0: boolean) => void;
  dialogMsg: string;
}

const CustomDialog = (props: CustomDialogProps) => {
  const { open, handleOpen, dialogMsg } = props;
  return (
    <Dialog
      open={open}
      onClose={() => handleOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{dialogMsg}</DialogTitle>
      <DialogActions>
        <Button onClick={() => handleOpen(false)} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
