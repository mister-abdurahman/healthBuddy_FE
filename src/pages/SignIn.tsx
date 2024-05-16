import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink, useNavigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLoginUserMutation } from "../Data/Api/ApiHandler";
import { getToken, signIn } from "../Data/State/AuthSlice";
import { useDispatch } from "react-redux";
import { getInfo } from "../Data/State/UserSlice";
import { SpinnerMini } from "../ui/SpinnerMini";
import CustomizedSnackbar from "../ui/SnackBar";
import { useToast } from "../hooks/useToast";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt: 5 }}
    >
      {"Copyright © "}
      <Link color="inherit">Health Buddy</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// interface IsignInInputs {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   phoneNumber: string;
//   profilePicture?: string;
//   facebookHandle?: string;
//   twitterHandle?: string;
//   linkedInHandle?: string;
//   address: string;
//   state: string;
// }

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function SignIn() {
  // const { signInOut } = useAppContext();
  // const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    setToast,
    closeToast,
  } = useToast();

  const [loginUser, { isLoading: loadingLogin }] = useLoginUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const submit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    // loginUser(data)
    //   .then((res: any) => {
    //     if (res?.data?.hasError)
    //       return setToast(true, res?.data?.message, "error");
    //     localStorage.setItem(
    //       "userData",
    //       JSON.stringify({
    //         _id: res?.data?.user._id,
    //         firstName: res?.data?.user.firstName,
    //         lastName: res?.data?.user.lastName,
    //         email: res?.data?.user.email,
    //         phoneNumber: res?.data?.user.phoneNumber,
    //         profilePicture: res?.data?.user.profilePicture,
    //         facebookHandle: res?.data?.user.facebookHandle,
    //         twitterHandle: res?.data?.user.twitterHandle,
    //         linkedInHandle: res?.data?.user.linkedInHandle,
    //         address: res?.data?.user.address,
    //         state: res?.data?.user.state,
    //         walletId: res?.data?.user.walletId,
    //       })
    //     );
    //     localStorage.setItem("signedIn", JSON.stringify({ signedIn: true }));
    //     localStorage.setItem(
    //       "token",
    //       JSON.stringify({ token: res?.data?.token })
    //     );

    //     dispatch(getToken(res?.data?.token));
    //     dispatch(signIn());
    //     dispatch(
    //       getInfo({
    //         _id: res?.data?.user._id,
    //         firstName: res?.data?.user.firstName,
    //         lastName: res?.data?.user.lastName,
    //         email: res?.data?.user.email,
    //         phoneNumber: res?.data?.user.phoneNumber,
    //         profilePicture: res?.data?.user.profilePicture,
    //         facebookHandle: res?.data?.user.facebookHandle,
    //         twitterHandle: res?.data?.user.twitterHandle,
    //         linkedInHandle: res?.data?.user.linkedInHandle,
    //         address: res?.data?.user.address,
    //         state: res?.data?.user.state,
    //         walletId: res?.data?.user.walletId,
    //       })
    //     );
    //     // console.log("fulfilled", payload);
    //     setToast(true, "Log in Successfull", "success");
    //   })
    //   .then(() => {
    //     navigate("/");
    //   });

    try {
      const payload = await loginUser(data).unwrap();

      // alert(payload?.error?.data?.message || "error!");

      localStorage.setItem(
        "userData",
        JSON.stringify({
          _id: payload.user._id,
          firstName: payload.user.firstName,
          lastName: payload.user.lastName,
          email: payload.user.email,
          phoneNumber: payload.user.phoneNumber,
          profilePicture: payload.user.profilePicture,
          facebookHandle: payload.user.facebookHandle,
          twitterHandle: payload.user.twitterHandle,
          linkedInHandle: payload.user.linkedInHandle,
          address: payload.user.address,
          state: payload.user.state,
          walletId: payload.user.walletId,
        })
      );
      localStorage.setItem("signedIn", JSON.stringify({ signedIn: true }));
      localStorage.setItem("token", JSON.stringify({ token: payload.token }));

      dispatch(getToken(payload.token));
      dispatch(signIn());
      dispatch(
        getInfo({
          _id: payload.user._id,
          firstName: payload.user.firstName,
          lastName: payload.user.lastName,
          email: payload.user.email,
          phoneNumber: payload.user.phoneNumber,
          profilePicture: payload.user.profilePicture,
          facebookHandle: payload.user.facebookHandle,
          twitterHandle: payload.user.twitterHandle,
          linkedInHandle: payload.user.linkedInHandle,
          address: payload.user.address,
          state: payload.user.state,
          walletId: payload.user.walletId,
        })
      );
      // console.log("fulfilled", payload);
      setToast(true, "Log in Successfull", "success", () => navigate("/"));
    } catch (error: Error) {
      // console.error("rejected", error);
      setToast(true, error.data.message, "error");
      // setOpenSnackbar(true);
      // setSnackbarMessage(error.data.message);
      // setSnackbarSeverity("error");
      // alert(error.data.message);
    }
    reset();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid> */}
            {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                {...register("email")}
                autoComplete="email"
              />
              <span className="text-xs text-red-600">
                {errors?.email?.message}
              </span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                {...register("password")}
                id="password"
                autoComplete="new-password"
              />
              <span className="text-xs text-red-600">
                {errors?.password?.message}
              </span>
            </Grid>
            {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label={
                    <Typography className="text-xs">
                      {" "}
                      I want to receive inspiration, marketing promotions and
                      updates via email.
                    </Typography>
                  }
                />
              </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loadingLogin ? <SpinnerMini /> : "Sign In"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to={"/signup"}>Don't have an account? Sign up</NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright />
      <CustomizedSnackbar
        open={openSnackbar}
        close={!openSnackbar}
        message={snackbarMessage}
        handleClose={closeToast}
        severity={snackbarSeverity}
      />
    </Container>
  );
}
