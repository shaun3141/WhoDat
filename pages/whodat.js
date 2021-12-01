import { useEffect, useState } from "react";

import { TextField, Button, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import firebase from "../firebase/clientApp";
import {
  getFirestore,
  collection,
  addDoc,
  DocumentReference,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import Head from "next/head";

export default function Play(props) {
  useEffect(() => {}, []);
  const store = getFirestore(firebase);

  return (
    <>
      <Head>
        <title>WhoDat | Play Game</title>
      </Head>
      <div style={{ textAlign: "center" }}>
        <h1>Play</h1>
      </div>
    </>
  );
}
