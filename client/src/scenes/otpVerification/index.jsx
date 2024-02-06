import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
const OtpVerify = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
    }
  }, []);
  const [otp, setOtp] = useState("");
  useEffect(() => {
    if (otp.length === 6) {
      OtpVerification();
    }
  }, [otp]);
  async function OtpVerification() {
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/signIn/verify-otp",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: userId,
          otp,
        }),
      }
    );
    const data = await response.json();
    if (data.message === "Email verified successfully") {
      // alert("Login Successful");
      console.log("triggered success");
      navigate("/2faQR");
    } else {
      console.log("triggered failure");
      alert("Please Check your OTP");
    }
    // console.log(data);
  }
  return (
    <Box mt={"3rem"}>
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
            label="otp"
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
              setOtp(e.target.value);
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
  );
};
export default OtpVerify;
