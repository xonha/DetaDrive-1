import React, { useState } from "react";
import { LogoTitle, Title } from "./Login.styled";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Button from "@mui/material/Button";
import LoginManager from "./service/LoginManager";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  let navigate = useNavigate();
  const manager = new LoginManager();

  async function handleLogin() {
    const res = await manager.postSignUp(login, password);
    if (res.message) {
      setSuccess(true)
    } else {
      setError(true);
    }
  }
  return (
    <>
      <div>
        <LogoTitle>DetaDrive</LogoTitle>
      </div>
      <Stack
        component="form"
        sx={{
          width: "380px",
          margin: "auto",
        }}
        noValidate
        autoComplete="off"
      >
        <Title style={{ padding: "0px 25px", fontSize:'40px' }}>Cadastro</Title>
        {error && (
          <Alert
            sx={{ margin: "15px" }}
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
           Erro. Tente novamente.
          </Alert>
        )}
        {success && (
          <Alert
            sx={{ margin: "15px" }}
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setError(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
           Usuário cadastrado com sucesso.<Button onClick={()=>{navigate('/')}} sx={{textTransform:'none'}}>Clique aqui para fazer o login.</Button>
          </Alert>
        )}

        <TextField
          required
          id="outlined-required"
          label="Usuário"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
          sx={{ padding: "25px" }}
          onChange={(e) => setLogin(e.target.value)}
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
          sx={{ padding: "25px" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() => handleLogin()}
          sx={{ margin: "0px 25px" }}
        >
          Cadastrar
        </Button>
      </Stack>
    </>
  );
};

export default SignUpPage;
