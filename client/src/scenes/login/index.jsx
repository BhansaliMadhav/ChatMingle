import React, { useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import { ClientJS } from "clientjs";
import { useEffect } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
let fingerprint = "";
function MyComponent() {
  useEffect(() => {
    const client = new ClientJS();
    fingerprint = client.getFingerprint();
  }, []);
}
const Login = () => {
  const [activeButton, setActiveButton] = useState(false);
  const [name, setName] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isMobile = useMediaQuery("(max-width:686px)");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  MyComponent();
  async function Login(event) {
    event.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: userId,
          password,
          fingerprint,
        }),
      }
    );
    const data = await response.json();
    if (data.message === "Sign In Partially Executed") {
      localStorage.setItem("qr", data.qrCode);
      navigate("/2faQR");
    }
    if (data.userId) {
      try {
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("tokenCode", data.tokenCode);
        // alert("Login Successful");
        console.log("triggered success");
        navigate("/toptpVerification");
      } catch {
        alert("error");
        navigate("/login");
      }
    } else {
      console.log("triggered failure");
      alert("Please Check your userId and password");
    }
    // console.log(data);
  }
  async function Signin(event) {
    event.preventDefault();
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/user/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email: userId,
          password,
          fingerprint,
        }),
      }
    );
    const data = await response.json();
    if (data.qrCode) {
      localStorage.setItem("qr", data.qrCode);
      localStorage.setItem("tokenCode", data.tokenCode);
      localStorage.setItem("userId", userId);
      // alert("Login Successful");
      console.log("triggered success");
      fetch(process.env.REACT_APP_BASE_URL + "/signin/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: userId,
        }),
      });
      navigate("/otpVerification");
    } else {
      console.log("triggered failure");
      alert("Please Check your userId and password");
    }
    // console.log(data);
  }
  return (
    <Box m={isMobile ? "2vh 5vw" : "1.5rem 2.5rem"}>
      <Box mt={"3rem"}>
        <form onSubmit={!!activeButton ? Signin : Login}>
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            <Box
              gap="30px"
              width={isMobile ? "200px" : "20%"}
              display={"inline-block"}
              alignItems={"center"}
              justifyContent="space-around"
            >
              <ButtonGroup
                fullWidth
                variant="contained"
                color="primary"
                aria-label="outlined secondary button group"
              >
                <Button
                  onClick={() => setActiveButton(false)}
                  sx={{
                    border: activeButton
                      ? undefined
                      : `solid 2px ${colors.greenAccent[500]}`,
                  }}
                >
                  Login
                </Button>
                <Button onClick={() => setActiveButton(true)}>Sign In</Button>
              </ButtonGroup>
              {activeButton ? (
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Username"
                  onChange={(e) => setName(e.target.value)}
                  name="firstName"
                  sx={{ margin: "1rem 0" }}
                  autoComplete="off"
                  required
                />
              ) : undefined}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email Id"
                onChange={(e) => setUserId(e.target.value)}
                name="firstName"
                sx={{ margin: "1rem 0" }}
                autoComplete="off"
                required
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onChange={(e) => setPassword(e.target.value)}
                name="lastName"
                sx={{ margin: "1rem 0" }}
                autoComplete="off"
                required
              />
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              sx={{ width: isMobile ? "200px" : "20%" }}
            >
              {!!!activeButton ? "Login" : "Signup"}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
