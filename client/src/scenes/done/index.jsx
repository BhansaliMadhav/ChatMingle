import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Box, Toolbar, Typography, useMediaQuery, AppBar } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import { ShoppingCartOutlined } from "@mui/icons-material";
import List from "@mui/material/List";

import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import { tokens } from "../../theme";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";

const drawerWidth = 350;
const navItems = [
  {
    text: "Manage Announcement",
    icon: <AnnouncementOutlinedIcon />,
  },
  {
    text: "Manage Events",
    icon: <EventOutlinedIcon />,
  },
  {
    text: "Projects",
    icon: null,
  },
  {
    text: "Manage Projects",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Members",
    icon: null,
  },
  {
    text: "Manage Members",
    icon: <PeopleOutlineOutlinedIcon />,
  },
  {
    text: "Member Requests",
    icon: <GroupAddOutlinedIcon />,
  },
];

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

  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Pass the search query to the parent component or perform search logic here
    // onSearch(searchQuery);
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
      >
        {/* <Logo /> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            position: "fixed",
            left: "50%",
            top: "18px",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Search</button>
        </Box>
        <IconButton
          sx={{
            position: "fixed",
            right: "50px",
            top: "5px",
          }}
          onClick={colorMode.toggleColorMode}
        >
          {/* <Logo /> */}
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon fontSize="large" />
          ) : (
            <LightModeOutlinedIcon fontSize="large" />
          )}
        </IconButton>
      </Box>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "transparent",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          marginTop: "1rem",
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.default,
            position: "fixed",
            top: "4.5rem",
          },
        }}
        variant="permanent"
        anchor="left"
        open={true}
      >
        <List>
          {navItems.map(({ text, icon }) => {
            if (!icon) {
              return (
                <Typography
                  key={text}
                  variant="h3"
                  sx={{ m: "2.25rem 0 1rem 3rem" }}
                >
                  {text}
                </Typography>
              );
            }
            const lcText = text.toLowerCase();
            return (
              <ListItem
                key={text}
                disablePadding
                sx={{
                  backgroundColor:
                    active === lcText
                      ? theme.palette.background.alt
                      : "transparent",
                }}
              >
                <ListItemButton
                  onClick={() => {
                    navigate(`/${lcText}`);
                    setActive(lcText);
                  }}
                >
                  <ListItemIcon
                    sx={{
                      ml: "2rem",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primaryTypographyProps={{ variant: "h4" }}
                    primary={text}
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
    </Box>
  );
}
