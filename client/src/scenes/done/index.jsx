import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import {
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  AppBar,
  TextField,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Logo from "../../assets/images.jpeg";
import ButtonSend from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SendIcon from "@mui/icons-material/Send";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import { tokens } from "../../theme";

// import { ButtontoAdd } from "./chatComponent/button.jsx";
import { ChatMessage } from "./chatComponent/chatMessage.jsx";
import { ScrollContainer } from "./chatComponent/scrollContainer.jsx";

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

var drawerWidth = 500;
const navItems = [
  {
    userId: "Manage Announcement",
    message: "nwjkrbgiebe",
  },
  {
    userId: "Manage Events",
    message: "nvibruiebveiubie",
  },
  {
    userId: "Projects",
    message: " sdjkvbiberiuhb",
  },
  {
    userId: "Manage Projects",
    message: "bjtbetuibuierbiuehgieug",
  },
  {
    userId: "Members",
    message: "vjineriubuietbuietiteuyjfytdytdytdrtdsyrdytfduydtd",
  },
  {
    userId: "Manage Members",
    message: "jkvierbviebiuieub",
  },
  {
    userId: "Member Requests",
    message: "kbsvhbeubveubveuyb",
  },
  { userId: "notye5bgtebkeb", message: "erkjvbetbveuvueribvi" },
  { userId: "jhvbehbvuebvuyerbvuyrb", message: "vfhubegreuirbvrbiwr" },
  {
    userId: "Member Requests mrsngirbgieurbger",
    message: "kbsvhbeubveubveuyb",
  },
  {
    userId: "Memberrwurguywgfbrgibigrgi7gufbgve",
    message: "kbsvhbeubveubveuyb",
  },
  {
    userId: "Member95646798765498465346465465",
    message: "kbsvhbeubveubveuyb",
  },
  {
    userId: "ruigeviubvekkbtnibur",
    message: "kbsvhbeubveubveuyb",
  },
  {
    userId: "864651657685",
    message: "kbsvhbeubveubveuyb",
  },
];
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  // backgroundColor: colors.grey[200]
  backgroundColor:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.common.white, 0.15)
      : alpha(theme.palette.common.black, 0.35),
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "dark"
        ? alpha(theme.palette.common.white, 0.25)
        : alpha(theme.palette.common.black, 0.55),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SidebarAdmin() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    var str = pathname.substring(1);
    var replaced = str.replace("%20", " ");

    setActive(replaced);
  }, [pathname]);
  const [numItems, setNumItems] = useState(5);
  return (
    <Box sx={{ display: "flex" }} mt={"1rem"}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        flexGrow={"1"}
        width="100%"
        gap="118%"
      ></Box>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: theme.palette.neutral.dark,
        }}
      >
        <Toolbar>
          <img
            src={Logo}
            alt="this is logo"
            style={{ height: "50px", marginLeft: "10px", borderRadius: "20%" }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              position: "fixed",
              left: "80%",
              top: "14px",
            }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <IconButton
            sx={{
              position: "fixed",
              right: "50px",
              top: "9px",
            }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "light" ? (
              <DarkModeOutlinedIcon fontSize="large" />
            ) : (
              <LightModeOutlinedIcon fontSize="large" />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          overflowY: "auto",
          height: "50vh",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.default,
            position: "fixed",
            top: "3.1rem",
            height: "94vh",
          },
        }}
        variant="permanent"
        anchor="left"
        open={true}
      >
        <List>
          {navItems.map(({ userId, message }) => {
            const lcText = userId.toLowerCase();
            return (
              <ListItem
                key={userId}
                disablePadding
                sx={{
                  backgroundColor:
                    active === lcText
                      ? theme.palette.background.alt
                      : "transparent",
                }}
              >
                <ListItemButton
                  sx={{ display: "block", ml: "2rem" }}
                  onClick={() => {
                    navigate(`/${lcText}`);
                    setActive(lcText);
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ variant: "h3" }}
                    primary={
                      userId.length > 30
                        ? `${userId.substring(0, 20)}...`
                        : userId
                    }
                  />
                  <ListItemText
                    primaryTypographyProps={{ variant: "h5" }}
                    primary={
                      message.length > 40
                        ? `${message.substring(0, 20)}...`
                        : message
                    }
                  />
                  {active === lcText && (
                    <MenuOutlinedIcon sx={{ ml: "auto" }} />
                  )}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <Stack
        sx={{ left: "28%", top: 130, position: "fixed", width: "100%" }}
        direction="column"
        spacing={1}
      >
        <ScrollContainer
          scrollCta="New message!"
          sx={{
            position: "fixed",
            width: "75%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          {Array.from(Array(numItems).keys()).map((n) => (
            <ChatMessage message={`Message ${n + 1}`} key={`message-${n}`} />
          ))}
        </ScrollContainer>
      </Stack>
      <Stack direction="row" spacing={0.5}>
        <TextField
          sx={{
            position: "fixed",
            width: "70%",
            bottom: 4,
            left: "58%",
            transform: "translateX(-50%)",
          }}
          id="filled-basic"
          label="Type your message here"
          variant="filled"
        />
        <ButtonSend
          onClick={() => setNumItems(numItems + 1)}
          sx={{
            position: "fixed",
            bottom: 6,
            height: "7%",
            width: "6%",
            right: -40,
            border: "1px solid white",
            transform: "translateX(-50%)",
          }}
          id="filled-basic"
          variant="filled"
          endIcon={<SendIcon />}
        >
          Send
        </ButtonSend>
      </Stack>
    </Box>
  );
}
