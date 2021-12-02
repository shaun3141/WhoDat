import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Box, Paper, Button, Chip, InputBase, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import firebase from "../firebase/clientApp";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import styles from "../styles/Home.module.css";

export default function Landing(props) {
  const store = getFirestore(firebase);

  useEffect(() => {
    async function fetchData() {
      try {
      } catch (e) {
        console.error("Error", e);
      }
    }
    fetchData();
  }, [props.user, store]);

  return (
    <>
      <Head>
        <title>WhoDat | Play</title>
      </Head>
      <div style={{ textAlign: "center" }}>
        <h1>Play</h1>
      </div>
    </>
  );
}
