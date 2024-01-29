import { Box, Typography, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
const QRFA = () => {
  const qr = localStorage.getItem("qr");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
    }
  }, []);
  const [token, setToken] = useState("");
  useEffect(() => {
    if (token.length === 6) {
      VerifyTotp();
    }
  }, [token]);
  async function VerifyTotp() {
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/user/register/totpSignIn",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId,
          token,
        }),
      }
    );
    const data = await response.json();
    if (data.tokenCode) {
      localStorage.setItem("user", data.user);
      localStorage.setItem("tokenCode", data.tokenCode);
      // alert("Login Successful");
      console.log("triggered success");
      navigate("/login");
    } else {
      console.log("triggered failure");
      alert("Please Check your userId and password");
    }
    // console.log(data);
  }
  return (
    <Box
      mt={"1rem"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Box justifyContent={"center"} width={"100%"}>
        <Typography
          margin={"0 auto"}
          width={"20rem"}
          fontSize={"16px"}
          fontWeight={"bold"}
        >
          Scan this qrcode on an authenticator app like google authenticator
        </Typography>
        <img
          style={{
            height: "150px",
            width: "150px",
            display: "block",
            margin: "1rem auto",
          }}
          src={`${qr}`}
          alt=""
        />
        <Box width={"100%"} display={"flex"} justifyContent={"center"}>
          <Box
            gap="30px"
            width={"20%"}
            display={"inline-block"}
            alignItems={"center"}
            justifyContent="space-around"
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Token"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                setToken(e.target.value);
              }}
              name="lastName"
              sx={{ margin: "1rem 0" }}
              autoComplete="off"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*", // Optionally, you can enforce the pattern for only numbers
                maxLength: 6, // Limit the length of input if necessary
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QRFA;
