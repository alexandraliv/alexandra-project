import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { client } from "../client";
import { v4 as uuidv4 } from "uuid";
import { Alert, Snackbar } from "@mui/material";
import { encrypt, decrypt, compare } from "n-krypta";
import { secret } from "../utils/key";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatches, setPasswordMatches] = useState(true);

  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);
  const [hasError, setHasError] = useState(false);

  function save() {
    client
      .create({
        _type: "user",
        id: uuidv4(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: encrypt(password, secret),
      })
      .then(() => {
        setResponseMessage("User created");
        setIsAlertOpened(true);
        setHasError(false);
      })
      .catch(() => {
        setResponseMessage("User not created");
        setIsAlertOpened(true);
        setHasError(true);
      });
  }

  function handleClose() {
    setIsAlertOpened(false);
    if (!hasError) {
      navigate("/");
    }
  }

  return (
    <Container component="main" maxWidth="xs" className="signup">
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
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            error={!firstName}
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name "
            name="firstName"
            autoComplete="firstName"
            autoFocus
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            error={!lastName}
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name "
            name="lastName"
            autoComplete="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div>
            <TextField
              error={!email || !emailIsValid}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                const emailValue = e.target.value;
                setEmail(emailValue);
                if (emailValue.match(emailRegex)) {
                  setEmailIsValid(true);
                } else {
                  setEmailIsValid(false);
                }
              }}
            />
            {emailIsValid ? null : (
              <p className="field-validation">Email not valid</p>
            )}
          </div>
          <TextField
            error={!password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            error={!confirmPassword}
            margin="normal"
            required
            fullWidth
            name="repeat-password"
            label="Repeat Password"
            type="password"
            id="repeat-password"
            autoComplete="repeat-current-password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (password === e.target.value) {
                setPasswordMatches(true);
              } else {
                setPasswordMatches(false);
              }
            }}
          />
          {passwordMatches ? null : (
            <p className="field-validation">Password is not the same</p>
          )}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={
              !(
                firstName &&
                lastName &&
                email &&
                emailIsValid &&
                password &&
                confirmPassword &&
                passwordMatches
              )
            }
            onClick={save}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={() => navigate("/login")} variant="body2">
                {"Have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        open={isAlertOpened}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={hasError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {responseMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}
