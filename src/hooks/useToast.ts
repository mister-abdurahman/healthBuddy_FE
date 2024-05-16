import { useState } from "react";

export const useToast = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");

  async function setToast(
    open: boolean,
    message: string,
    severity: string,
    callback?: () => void
  ) {
    setOpenSnackbar(open);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);

    setTimeout(() => {
      if (callback) callback();
    }, 2000);
  }
  function closeToast(open: boolean) {
    setOpenSnackbar(open);
    setSnackbarMessage("");
    setSnackbarSeverity("");
  }

  return {
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    setToast,
    closeToast,
    // setOpenSnackbar,
    // setSnackbarMessage,
    // setSnackbarSeverity,
  };
};
