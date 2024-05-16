import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface IProps {
  open: boolean;
  close: boolean;
  handleClose: (x: boolean) => void;
  severity: string;
  message: string;
}

export default function CustomizedSnackbar({
  open,
  close,
  handleClose,
  severity,
  message,
}: IProps) {
  //   const [open, setOpen] = React.useState(false);

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
  //     if (reason === 'clickaway') {
  //       return;
  //     }

  //     setOpen(false);
  //   };
  console.log(close);

  return (
    <div>
      {/* <Button onClick={handleClick}>Open Snackbar</Button> */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
