import { useState } from "react";

import styles from "./layout.module.css";
import { Button, Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import SettingsIcon from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { styled, alpha } from "@mui/material/styles";
import Link from "next/link";

import firebase from "../firebase/clientApp"; // Initializes Firebase
import { getAuth } from "firebase/auth";

export default function Navbar(props) {
  const auth = getAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    auth.signOut();
  };

  return (
    <div className={styles.container}>
      <div style={{ textAlign: "right" }}>
        <div style={{ display: "inline-block", marginTop: "-30px" }}>
          {props?.user ? (
            <div>
              <Button
                id="demo-customized-button"
                aria-controls="demo-customized-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                variant="outlined"
                disableElevation
                onClick={handleClick}
              >
                <div style={{ display: "inline-block" }}>
                  👋 {props?.user?.displayName}
                </div>
                <MoreVertIcon />
              </Button>
              <StyledMenu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                <Link href="/" passHref>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      {/* <PlayCircleIcon fontSize="small" /> */}
                      <div
                        style={{
                          fontSize: "1.4em",
                          display: "inline-block",
                          width: "2em",
                          textAlign: "center",
                          marginRight: 10,
                          color: "initial",
                        }}
                      >
                        🤔
                      </div>
                    </ListItemIcon>
                    Who Dat?
                  </MenuItem>
                </Link>
                <Link href="/me" passHref>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      {/* <MovieFilterIcon fontSize="small" /> */}
                      <div
                        style={{
                          fontSize: "1.4em",
                          display: "inline-block",
                          width: "2em",
                          textAlign: "center",
                          marginRight: 10,
                          color: "initial",
                        }}
                      >
                        💁‍♀️💁‍♂️
                      </div>
                    </ListItemIcon>
                    Me
                  </MenuItem>
                </Link>
                <Link href="/settings" passHref>
                  <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                      {/* <SettingsIcon fontSize="small" /> */}
                      <div
                        style={{
                          fontSize: "1.4em",
                          display: "inline-block",
                          width: "2em",
                          textAlign: "center",
                          marginRight: 10,
                          color: "initial",
                        }}
                      >
                        🤓
                      </div>
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    {/* <Logout fontSize="small" /> */}
                    <div
                      style={{
                        fontSize: "1.4em",
                        display: "inline-block",
                        width: "2em",
                        textAlign: "center",
                        marginRight: 10,
                        color: "initial",
                      }}
                    >
                      ✌️
                    </div>
                  </ListItemIcon>
                  Log out
                </MenuItem>
              </StyledMenu>
            </div>
          ) : (
            <Link href="/login" passHref>
              <Button variant="contained">Play WhoDat</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: 50,
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
