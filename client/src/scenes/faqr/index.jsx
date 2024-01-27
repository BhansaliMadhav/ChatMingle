import { Box, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
const QRFA = () => {
  const qr = localStorage.getItem("qr");
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
        <Button
          onClick={(event) => {
            navigate("/login");
          }}
          sx={{
            margin: "2rem auto",
            display: "block",
            backgroundColor: `${colors.greenAccent[500]}`,
          }}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
};

export default QRFA;
