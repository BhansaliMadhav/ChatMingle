import React, { useEffect } from "react";
import { Box } from "@mui/material";
import jwt from "jsonwebtoken";
const Done = () => {
  useEffect(() => {
    const tokenCode = localStorage.getItem("tokenCode");
    const user = jwt.decode(tokenCode);
    if (!user) {
      navigate("/login");
    }
  }, []);
  return <Box>Done</Box>;
};
export default Done;
