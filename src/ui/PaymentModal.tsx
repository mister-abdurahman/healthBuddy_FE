import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button } from "./Button";
import { InputAdornment, TextField } from "@mui/material";
import { MdCancelPresentation } from "react-icons/md";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateTransactionMutation } from "../Data/Api/ApiHandler";
import { SpinnerMini } from "./SpinnerMini";
import { useToast } from "../hooks/useToast";
import CustomizedSnackbar from "./SnackBar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  bgcolor: "background.paper",
  border: "2px solid #6a78e4",
  borderRadius: ".5rem",
  boxShadow: 24,
  padding: "2.6rem 3.4rem",
};

interface Iprops {
  open: boolean;
  handleClose: () => void;
  walletId: string;
}

const schema = yup.object().shape({
  fund: yup.number().min(5).required(),
});

export default function PaymentModal({ open, handleClose, walletId }: Iprops) {
  const {
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    setToast,
    closeToast,
  } = useToast();

  const [
    createTransaction,
    { isLoading: creatingTransaction, isError: errorCreatingTransaction },
  ] = useCreateTransactionMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function submitFn(data: any) {
    const toSubmit = {
      walletId,
      amount: data.fund,
      type: "credit",
    };
    // console.log(toSubmit);
    createTransaction(toSubmit).then((res) => {
      // console.log(res);
      if (res?.error?.data?.hasError || errorCreatingTransaction)
        return setToast(true, res?.error?.data?.message, "error");
      // if (res.data.hasError) return alert(res.data.message);
      // alert("Transaction Successful !");
      setToast(true, "Transaction Successful !", "success", () => {
        reset();
        handleClose();
      });
    });
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <span
            className="absolute top-2 right-2 cursor-pointer bg-secondary_light p-1 rounded-md"
            onClick={handleClose}
          >
            <MdCancelPresentation className="w-6 h-6 fill-secondary" />
          </span>
          <form
            onSubmit={handleSubmit(submitFn)}
            className="flex flex-col gap-6 text-center mt-5"
          >
            <div className="flex flex-col">
              <TextField
                id="outlined-start-adornment"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₦</InputAdornment>
                  ),
                }}
                label="Fund Wallet"
                type="number"
                variant="filled"
                {...register("fund")}
              />
              <span className="text-xs text-red-600">
                {errors?.fund?.message}
              </span>
            </div>
            {/* {body} */}
            <Button
              style={`bg-secondary text-secondary_light_2 ${
                creatingTransaction && "opacity-50"
              }`}
            >
              {creatingTransaction ? <SpinnerMini /> : "Fund"}
            </Button>
          </form>
        </Box>
      </Modal>
      <CustomizedSnackbar
        open={openSnackbar}
        close={!openSnackbar}
        message={snackbarMessage}
        handleClose={closeToast}
        severity={snackbarSeverity}
      />
    </div>
  );
}
