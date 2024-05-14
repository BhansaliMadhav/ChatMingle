import React, { useEffect, useState } from "react";
import { Box, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
const TOTP = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
    }
  });
  const [token, setToken] = useState("");
  useEffect(() => {
    if (token.length === 6) {
      VerifyTotp();
    }
  }, [token]);
  async function VerifyTotp() {
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/user/login/totp",
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
    console.log(data.message);
    if (data.message === "Successfull") {
      // alert("Login Successful");
      localStorage.setItem("tokenCode", data.tokenCode);
      // localStorage.setItem("privateKey", data.privateKey);
      const textEncoder = new TextEncoder();
      const encodedData = textEncoder.encode(data.privateKey);
      const secureKey = await window.crypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"]
      );
      const iv = window.crypto.getRandomValues(new Uint8Array(12));
      const encryptedData = await window.crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          length: 256,
          iv: iv,
        },
        secureKey,
        encodedData
      );
      const decryptedData = await window.crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          length: 256,
          iv: iv,
        },
        secureKey,
        encryptedData
      );
      const decryptedText = new TextDecoder().decode(decryptedData);
      sessionStorage.setItem("decryptedKey", decryptedText);
      console.log(decryptedText);
      sessionStorage.setItem("privateKey", encryptedData);
      console.log("triggered success");
      navigate("/done");
    } else {
      console.log("triggered failure");
      alert("Please Check your userId and password");
    }
    // console.log(data);
  }
  return (
    <Box mt={"3rem"}>
      <Box width={"100vw"} display={"flex"} justifyContent={"center"}>
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
  );
};
export default TOTP;
