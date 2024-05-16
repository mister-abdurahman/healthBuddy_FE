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
import { useRegisterUserMutation } from "../Data/Api/ApiHandler";
import { SpinnerMini } from "../ui/SpinnerMini";
import { useToast } from "../hooks/useToast";
import CustomizedSnackbar from "../ui/SnackBar";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{11}$/, "Phone number must be 11 digits"),
  profilePicture: yup.string(),
  facebookHandle: yup.string().nullable(),
  twitterHandle: yup.string().nullable(),
  linkedInHandle: yup.string().nullable(),
  address: yup.string().required(),
  state: yup.string().required(),
});

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

export default function SignUp() {
  const navigate = useNavigate();

  const {
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    setToast,
    closeToast,
  } = useToast();

  const [registerUser, { isLoading: registeringUser }] =
    useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const submit: SubmitHandler<FieldValues> = async (data) => {
    // signInOut();
    // navigate("/dashboard");
    try {
      await registerUser(data);
      setToast(true, "User Registered successfully", "success", () =>
        navigate("/signin")
      );
    } catch (error: any) {
      setToast(true, error?.data?.message, "error");
    } finally {
      reset();
    }

    // registerUser(data).then((res) => {
    //   if (res?.error?.data?.hasError || registeringError)
    //     return setToast(true, res?.error?.data?.message, "error");
    //   // return alert(res?.error?.data?.message || "error!");

    //   setToast(true, "User Registered successfully", "success", () =>
    //     navigate("/signin")
    //   );
    //   // alert("User Registered successfully");
    //   reset();
    // });
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
          Sign Up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="firstName"
                label="First Name"
                {...register("firstName")}
                autoFocus
              />
              <span className="text-xs text-red-600">
                {errors?.firstName?.message}
              </span>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                {...register("lastName")}
                autoComplete="family-name"
              />
              <span className="text-xs text-red-600">
                {errors?.lastName?.message}
              </span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                {...register("email")}
                name="email"
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
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Phone Number"
                {...register("phoneNumber")}
                type="number"
                id="phoneNumber"
                autoComplete="phone"
              />
              <span className="text-xs text-red-600">
                {errors?.phoneNumber?.message}
              </span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                {...register("address")}
                id="address"
                autoComplete="address"
              />
              <span className="text-xs text-red-600">
                {errors?.address?.message}
              </span>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="State"
                {...register("state")}
                id="state"
                autoComplete="state"
              />
              <span className="text-xs text-red-600">
                {errors?.state?.message}
              </span>
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                label="facebook handle"
                {...register("facebookHandle")}
                id="facebook"
                autoComplete="facebook"
              />
              <span className="text-xs text-red-600">
                {errors?.facebookHandle?.message}
              </span>
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                label="twitter handle"
                {...register("twitterHandle")}
                id="twitter"
                autoComplete="twitter"
              />
              <span className="text-xs text-red-600">
                {errors?.twitterHandle?.message}
              </span>
            </Grid>
            <Grid item xs={4}>
              <TextField
                required
                fullWidth
                label="linkedIn handle"
                {...register("linkedInHandle")}
                id="linkedIn"
                autoComplete="linkedIn"
              />
              <span className="text-xs text-red-600">
                {errors?.linkedInHandle?.message}
              </span>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
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
            {registeringUser ? <SpinnerMini /> : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to={"/signin"}>Already have an account? Sign in</NavLink>
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
