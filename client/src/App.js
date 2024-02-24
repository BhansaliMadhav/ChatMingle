import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./scenes/login";
import QRFA from "./scenes/faqr";
import TOTP from "./scenes/toptpVerification";
import Done from "./scenes/done";
import OtpVerify from "./scenes/otpVerification";
import jwt from "jsonwebtoken";

function App() {
  const navigate = useNavigate();
  const [theme, colorMode] = useMode();
  console.log(window.location.pathname);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const tokenCode = localStorage.getItem("tokenCode");
    const user = jwt.decode(tokenCode);
    if (!user || !tokenCode) {
      localStorage.removeItem("tokenCode");
    } else {
      if (
        window.location.pathname !== "/done" &&
        window.location.pathname === "/login"
      )
        navigate("/done");
    }
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/2faQR" element={<QRFA />} />
            <Route path="/toptpVerification" element={<TOTP />} />
            <Route path="/done" element={<Done />} />
            <Route path="/otpVerification" element={<OtpVerify />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
