import { useState } from "react";
import { TextField, Button, Typography, Grid, Box } from "@mui/material";
import Photo1 from "../assets/Photo1.jpg";
import { Alert, Snackbar } from "@mui/material";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState(false);
  const [isAlertOpened, setIsAlertOpened] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && emailIsValid) {
      setResponseMessage("This message was sent");
      setIsAlertOpened(true);
      setHasError(false);
    } else {
      setResponseMessage("This message was not sent");
      setIsAlertOpened(true);
      setHasError(true);
    }
    // setIsAlertOpened(false);
    // if (!hasError) {
    //   navigate("/");
    // }
    // navigate("/");
  };
  return (
    <Container>
      <Box sx={{ height: "100vh" }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          // marginTop="20px"
          sx={{ height: "100%" }}
        >
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4" align="center" mb={2}>
                Contact Us
              </Typography>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src={Photo1}
                        alt="Contact"
                        style={{ maxWidth: "100%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={!name}
                      fullWidth
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      value={email}
                      margin="normal"
                      required
                      type="email"
                      error={!email || !emailIsValid}
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
                    <TextField
                      error={!message}
                      fullWidth
                      label="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      margin="normal"
                      required
                      multiline
                      rows={4}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ mt: 2 }}
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={isAlertOpened}
        autoHideDuration={3000}
        onClose={() => {
          setIsAlertOpened(false);
          if (!hasError) {
            navigate("/");
          }
        }}
      >
        <Alert
          onClose={() => {
            setIsAlertOpened(false);
            if (!hasError) {
              navigate("/");
            }
          }}
          severity={hasError ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {responseMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Contact;
