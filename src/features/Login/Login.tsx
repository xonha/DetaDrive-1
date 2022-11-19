import React from "react";
import { LogoTitle, Title } from "./Login.styled";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
const LoginPage = () => {
  return (
    <>
      <div>
        <LogoTitle>FileTransfer</LogoTitle>
      </div>
      <Stack
        component="form"
        sx={{
          width: "380px",
        }}
        spacing={5}
        noValidate
        autoComplete="off"
      >
        <div>
          <Title>Login</Title>
          <TextField
            required
            id="outlined-required"
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            id="outlined-password-input"
            label="Senha"
            type="password"
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
        </div>
      </Stack>
    </>
  );
};

export default LoginPage;
