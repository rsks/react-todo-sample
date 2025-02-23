import {
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  DialogContent,
  Button,
  styled,
} from "@mui/material";

type Props = {
  alertOpen: boolean;
  onEmpty: () => void;
  onToggleAlert: () => void;
};

const Alert = styled(Dialog)(() => ({
  fontFamily: "-apple-system, BlinkMacSystemFont, Roboto, sans-serif",
}));

export const AlertDialog = (props: Props) => {
  return (
    <Alert open={props.alertOpen} onClose={props.onToggleAlert}>
      <DialogTitle>アラート</DialogTitle>
      <DialogContent>
        <DialogContentText> Are you sure ?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          aria-label="alert-cancel"
          onClick={props.onToggleAlert}
          color="primary"
        >
          キャンセル
        </Button>
        <Button
          aria-label="alert-ok"
          onClick={() => {
            props.onToggleAlert();
            props.onEmpty();
          }}
          color="secondary"
          autoFocus
        >
          OK
        </Button>
      </DialogActions>
    </Alert>
  );
};
