import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./scenes/login";
import QRFA from "./scenes/faqr";
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes>
            <Route path="/" element={<Navigate to={"/login"} replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="2faQR" element={<QRFA />} />
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
