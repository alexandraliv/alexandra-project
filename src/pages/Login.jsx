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
import { useState, useContext } from "react";
import { client } from "../client";
import { Context } from "../store/Context";
import { encrypt, decrypt, compare } from "n-krypta";
import { secret } from "../utils/key";

export default function SignIn() {
  const context = useContext(Context);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function login() {
    const users = await client.fetch(
      `*[_type == "user"] {
          email,
          password
      }`
    );

    let isLoginSuccessful = false;

    users.forEach(async (user) => {
      if (user.email === email && compare(password, user.password, secret)) {
        context.setUser(user);
        window.localStorage.setItem("user", JSON.stringify(user));
        isLoginSuccessful = true;

        client
          .create({
            _type: "loggedin_user",
            email: user.email,
            password: user.password,
          })
          .then(() => navigate("/"));
      }
    });

    if (!isLoginSuccessful) {
      setError(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs" className="login">
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
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            error={!email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              const emailVal = e.target.value;
              setEmail(emailVal);
            }}
          />
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
            onChange={(e) => {
              const passwordVal = e.target.value;
              setPassword(passwordVal);
            }}
          />
          {error ? (
            <p className="field-validation">
              The email adress or password is incorrect.Try again.
            </p>
          ) : null}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!(email && password)}
            onClick={login}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={() => navigate("/signup")} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
