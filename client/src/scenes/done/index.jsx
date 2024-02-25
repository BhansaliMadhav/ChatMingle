import * as React from "react";
import { styled, alpha, useTheme } from "@mui/material/styles";
import jwt from "jsonwebtoken";
import {
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  AppBar,
  TextField,
  ListSubheader,
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

import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

import Messages from "./chatComponent/messages.js";
var drawerWidth = 350;
var navItems = [];
const User = ({ userId, name }) => {
  return (
    <li>
      <Typography paddingLeft={"10px"} variant="h4">
        {name.length > 10 ? `${name.substring(0, 10)}...` : name}
      </Typography>
      <Typography paddingLeft={"10px"} variant="h5">
        {userId.length > 15 ? `${userId.substring(0, 15)}...` : userId}
      </Typography>
    </li>
  );
};
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

const SearchResultItem = ({ result, onUserClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleItemClick = async () => {
    const userId = localStorage.getItem("userId");
    try {
      setIsLoading(true);

      // Make a request to the backend to create a user key and generate a chat
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "/search/createUserAndChat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed, e.g., authentication token
          },
          body: JSON.stringify({
            userId1: userId,
            userId2: result.userId,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        // Redirect the user to the chat page with the generated chat key
        console.log(data.chatId);
        navigate(`/chats/?chatId=${data.chatId}`);
      } else {
        console.error("Failed to create user and chat");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {/* Display search result information */}
      <p onClick={handleItemClick} style={{ cursor: "pointer" }}>
        {result.userId}
      </p>
    </div>
  );
};

export default function UserMenu() {
  const NavItem = async () => {
    try {
      const userId = localStorage.getItem("userId");
      // Make a request to the backend to create a user key and generate a chat
      const response = await fetch(
        process.env.REACT_APP_BASE_URL + `/search/chats?userId=${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add any other headers as needed, e.g., authentication token
          },
        }
      );
      const data = await response.json();
      navItems = data.chats;
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const tokenCode = localStorage.getItem("tokenCode");
    const user = jwt.decode(tokenCode);
    if (!user || !tokenCode) {
      localStorage.removeItem("tokenCode");
      navigate("/login");
    }
  });
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const [searched, searchText] = useState("");
  const [searchedResult, setSearchResult] = useState([]);
  const [chatList, setChatList] = useState([]);
  async function search() {
    const response = await fetch(
      process.env.REACT_APP_BASE_URL + "/search/userId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          text: searched,
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    setSearchResult(data);
    // console.log(data);
  }
  NavItem();
  useEffect(() => {
    var str = pathname.substring(1);
    var replaced = str.replace("%20", " ");

    setActive(replaced);
  }, [pathname]);
  useEffect(() => {
    search();
  }, [searched]);
  console.log(navItems);
  const [numItems, setNumItems] = useState(5);
  const [messages, setMessages] = useState([]);
  const handleUserClick = (userId) => {
    // Handle user click, for example, navigate to user profile page
    navigate(`/${userId}`);
  };
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
              display: "block",

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
                onChange={(event) => {
                  searchText(event.target.value);
                }}
              />
            </Search>
            {searchedResult.length === 0 ? undefined : (
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: 300,
                  "& ul": { padding: 0 },
                }}
                subheader={<li />}
              >
                {searchedResult.map((result) => (
                  <SearchResultItem
                    key={result.userId}
                    result={result}
                    onUserClick={handleUserClick}
                  />
                ))}
              </List>
            )}
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
            resize: "horizontal",
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
          {navItems.map(({ id, messages, receiverId, senderId, _id }) => {
            const lcText = _id.toLowerCase();
            return (
              <ListItem
                key={_id}
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
                    primaryTypographyProps={{ variant: "h4" }}
                    primary={
                      senderId === `${localStorage.getItem("UserId")}`
                        ? `${receiverId.substring(0, 20)}...`
                        : `${senderId.substring(0, 20)}...`
                    }
                  />
                  <ListItemText
                    primaryTypographyProps={{ variant: "h5" }}
                    // primary={
                    //   message.length > 40
                    //     ? `${message.substring(0, 20)}...`
                    //     : message
                    // }
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
        <div className={styled.appContent}>
          <Messages messages={messages} />
        </div>
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
