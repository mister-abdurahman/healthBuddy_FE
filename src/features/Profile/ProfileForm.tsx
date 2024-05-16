import { TextField } from "@mui/material";
import { Button } from "../../ui/Button";
import { useForm } from "react-hook-form";
import { useUpdateUserMutation } from "../../Data/Api/ApiHandler";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Data/State/store";
import { SpinnerMini } from "../../ui/SpinnerMini";
import { getInfo } from "../../Data/State/UserSlice";
import { useToast } from "../../hooks/useToast";
import CustomizedSnackbar from "../../ui/SnackBar";

export const ProfileForm = () => {
  const {
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    setToast,
    closeToast,
  } = useToast();
  const dispatch = useDispatch();
  const [updateUser, { isLoading: loadingUser }] = useUpdateUserMutation();
  const user = useSelector((state: RootState) => state.user.userDetails);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  }: any = useForm({
    defaultValues: {
      phoneNumber: user.phoneNumber || "",
      profilePicture: user.profilePicture || "q",
      facebookHandle: user.facebookHandle || "",
      twitterHandle: user.twitterHandle || "",
      linkedInHandle: user.linkedInHandle || "",
      address: user.address || "",
      state: user.state || "",
    },
  });

  function handlePhoneNumber(e) {
    setError("phoneNumber", "");
    if (e.target.value.length !== 11) {
      setError("phoneNumber", {
        type: "custom",
        message: "Phone number must be 11 digits !",
      });
      setValue("phoneNumber", "");
    }
  }

  function submitForm(data) {
    updateUser({ id: user._id, data }).then((res: any) => {
      if (res?.error?.data?.hasError)
        return setToast(true, res?.error?.data?.message, "error");
      // return alert(res?.error?.data?.message || "error!");
      // if (res.hasError) return alert(res.message);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: data.phoneNumber,
          profilePicture: data.profilePicture,
          facebookHandle: data.facebookHandle,
          twitterHandle: data.twitterHandle,
          linkedInHandle: data.linkedInHandle,
          address: data.address,
          state: data.state,
          walletId: user.walletId,
        })
      );
      dispatch(
        getInfo({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: data.phoneNumber,
          profilePicture: data.profilePicture,
          facebookHandle: data.facebookHandle,
          twitterHandle: data.twitterHandle,
          linkedInHandle: data.linkedInHandle,
          address: data.address,
          state: data.state,
          walletId: user.walletId,
        })
      );
      setToast(true, "User details Updated", "success");
      // alert("User details Updated");
    });
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="bg-white my-6 rounded-md shadow-md mx-auto px-5 py-3 pt-8 pb-5 flex flex-col gap-8"
    >
      <TextField
        id="outlined-basic"
        label="First Name"
        variant="outlined"
        className="w-full"
        value={user.firstName}
        disabled
      />
      <TextField
        id="outlined-basic"
        label="Last Name"
        variant="outlined"
        className="w-full"
        value={user.lastName}
        disabled
      />
      <TextField
        id="outlined-basic"
        label="Email"
        type="email"
        variant="outlined"
        className="w-full"
        value={user.email}
        disabled
      />
      <div>
        <TextField
          id="outlined-basic"
          label="Phone Number"
          type="number"
          variant="outlined"
          className="w-full"
          required
          {...register("phoneNumber", { onBlur: handlePhoneNumber })}
        />
        <span className="text-red-500 text-xs">
          {errors?.phoneNumber?.message}
        </span>
      </div>
      <TextField
        id="outlined-basic"
        label="Profile Picture"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        className="w-full"
        type="file"
        disabled
        {...register("profilePicture")}
      />
      <TextField
        id="outlined-basic"
        label="Address"
        variant="outlined"
        className="w-full"
        required
        {...register("address")}
      />
      <TextField
        id="outlined-basic"
        label="State"
        variant="outlined"
        className="w-full"
        required
        {...register("state")}
      />
      <TextField
        id="outlined-basic"
        label="Facebook Handle"
        variant="outlined"
        className="w-full"
        required
        {...register("facebookHandle")}
      />
      <TextField
        id="outlined-basic"
        label="Twitter Handle"
        variant="outlined"
        className="w-full"
        required
        {...register("twitterHandle")}
      />
      <TextField
        id="outlined-basic"
        label="LinkedIn Handle"
        variant="outlined"
        className="w-full"
        required
        {...register("linkedInHandle")}
      />

      <Button disabled={loadingUser}>
        {loadingUser ? <SpinnerMini /> : <span>Update</span>}
      </Button>
      <CustomizedSnackbar
        open={openSnackbar}
        close={!openSnackbar}
        message={snackbarMessage}
        handleClose={closeToast}
        severity={snackbarSeverity}
      />
    </form>
  );
};
