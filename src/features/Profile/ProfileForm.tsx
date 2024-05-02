import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";
import { Button } from "../../ui/Button";
import { useForm } from "react-hook-form";

export const ProfileForm = () => {
  const { register, handleSubmit, getValues, reset, formState }: any = useForm({
    defaultValues: {
      firstName: "aramide",
      lastName: "",
      email: "",
      phoneNumber: "",
      profilePicture: "q",
      facebookHandle: "",
      twitterHandle: "",
      linkedInHandle: "",
      address: "",
      state: "",
    },
  });

  function submitForm(data) {
    console.log(data);
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
        required
        {...register("firstName")}
      />
      <TextField
        id="outlined-basic"
        label="Last Name"
        variant="outlined"
        className="w-full"
        required
        {...register("lastName")}
      />
      <TextField
        id="outlined-basic"
        label="Email"
        type="email"
        variant="outlined"
        className="w-full"
        required
        {...register("email")}
      />
      <TextField
        id="outlined-basic"
        label="Phone Number"
        type="tel"
        variant="outlined"
        className="w-full"
        required
        {...register("phoneNumber")}
      />
      <TextField
        id="outlined-basic"
        label="Profile Picture"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        className="w-full"
        type="file"
        required
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
        type="url"
        required
        {...register("facebookHandle")}
      />
      <TextField
        id="outlined-basic"
        label="Twitter Handle"
        variant="outlined"
        className="w-full"
        type="url"
        required
        {...register("twitterHandle")}
      />
      <TextField
        id="outlined-basic"
        label="LinkedIn Handle"
        variant="outlined"
        className="w-full"
        type="url"
        required
        {...register("linkedinHandle")}
      />

      <Button>
        <span>Update</span>
      </Button>
    </form>
  );
};
