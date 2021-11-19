import { useEffect, useState } from "react";

import { Input, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import firebase from "../../firebase/clientApp";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import Head from "next/head";
import { useRouter } from "next/router";

const Game = () => {
  const router = useRouter();
  const { game } = router.query || null;
  const gameName = game.split("-")[0];

  return (
    (game && (
      <>
        <Head>
          <title>{`WhoDat | ${gameName}`}</title>
        </Head>
        <div style={{ textAlign: "center" }}>
          <h1>{`WhoDat | "${gameName}" Edition`}</h1>
        </div>
      </>
    )) ||
    null
  );
};

export default Game;
