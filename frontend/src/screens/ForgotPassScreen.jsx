// ForgotPassScreen.jsx

import React, { useState } from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";

import FormContainer from "../components/FormContainer";

function ForgotPassScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would typically make an API call to send a password reset email
    // For this example, let's just display a message
    setMessage(`Password reset email sent to ${email}`);
  };

  return (
    <FormContainer>
      <>
        <Avatar sx={{ m: 1, bgcolor: "inherit" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
            value={email}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderColor: "white !important",
                backgroundColor: "#424242 !important",
              },
              "& label.Mui-focused": {
                color: "white !important",
              },
              "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "white !important",
              },
              "& input": {
                color: "white !important",
                borderColor: "white !important",
              },
              "& .MuiInputLabel-root": {
                color: "white !important",
                borderColor: "white !important",
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "white !important",
                },
              "& .MuiOutlinedInput-root:active": {
                color: "white !important",
                borderColor: "white !important",
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{
              mt: 3,
              mb: 2,
              color: "inherit",
              borderColor: "white !important",
            }}
          >
            Reset Password
          </Button>
        </Box>
        <p>{message}</p>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Typography
              component={Link}
              to="/login"
              sx={{ color: "white" }}
            >
              Back to Sign In
            </Typography>
          </Grid>
        </Grid>
      </>
    </FormContainer>
  );
}

export default ForgotPassScreen;
