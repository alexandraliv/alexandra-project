import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { DatePicker } from '@material-ui/pickers'
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const navigate = useNavigate();

  const [date, setDate] = useState(null);
  const [cardNumber, setcardNumber] = useState();
  const [cardHolder, setcardHolder] = useState();
  const [cvc, setCvc] = useState();

  return (
    <div className="form">
      <TextField
        error={!cardNumber}
        onChange={(e) => setcardNumber(e.target.value)}
        id="outlined-number"
        label="Card Number"
        type="tel"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ maxLength: 16 }}
        required
      />
      <TextField
        error={!cardHolder}
        onChange={(e) => setcardHolder(e.target.value)}
        id="outlined-number"
        label="Card Holder"
        fullWidth
        margin="normal"
        type="text"
        InputLabelProps={{
          shrink: true,
        }}
        required
      />
      <TextField
        error={!cvc}
        onChange={(e) => setCvc(e.target.value)}
        id="outlined-number"
        label="CVC"
        type="tel"
        fullWidth
        margin="dense"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{ maxLength: 3 }}
        required
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Expiration date"
          value={date}
          fullWidth
          required
          renderInput={(params) => (
            <TextField
              {...params}
              error={!date}
              margin="dense"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          )}
          onChange={(e) => setDate(e)}
          error={!date}
        />
      </LocalizationProvider>
      <Button
        variant="contained"
        sx={{ mt: 4 }}
        onClick={() => {
          if (cardHolder && cardHolder && cvc && date) {
            navigate("/Success");
          }
        }}
      >
        Pay
      </Button>
    </div>
  );
}
