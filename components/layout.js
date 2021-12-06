import { useState } from "react";
import Link from "next/link";

import styles from "./layout.module.css";
import { Box, Menu, MenuItem, ListItemIcon, Divider } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

import firebase from "../firebase/clientApp"; // Initializes Firebase
import { getAuth } from "firebase/auth";

import Navbar from "./navbar";

export default function Layout(props) {
  const auth = getAuth();

  return (
    <>
      <main className={styles.main}>
        <Navbar
          user={props.user}
          authUser={props.authUser}
          className={styles.container}
        />

        <Box className={styles.container}>{props.children}</Box>

        <footer className={styles.footer}>
          Made with Holiday Spirit by{" "}
          <Link href="/" passHref={true}>
            <span
              style={{ color: "#1976d2", cursor: "pointer", marginLeft: 6 }}
            >
              Shaun VanWeelden
            </span>
          </Link>
        </footer>
      </main>
    </>
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
