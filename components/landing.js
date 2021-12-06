import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Box, Paper, Button, Chip, InputBase, IconButton } from "@mui/material";
import styles from "./layout.module.css";
import firebase from "../firebase/clientApp";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

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
        <title>WhoDat | Welcome</title>
      </Head>
      <div style={{ textAlign: "center" }}>
        <h1 className={styles.title}>
          {/* <Link href="/record">
            <a>Record</a>
          </Link> */}
          WhoDat
        </h1>
        <video width="800" height="375" muted autoPlay>
          <source src="/ReturningToWork.mp4" type="video/mp4" />
        </video>
        <h2>Avoid Awkward Encounters at the Office with WhoDat.</h2>
        <p>
          {`WhoDat is a competitive game where you are shown short, fun videos of
your co-workers and must guess who they are to earn a spot on the
scoreboard`}
        </p>

        <div className={styles.grid}>
          <Box className={styles.card}>
            <Link href="/login" passHref className={styles.card}>
              <Box>
                <h2>Start Playing &rarr;</h2>
                <p>
                  {`Create a new WhoDat game for the office. It's free, easy, and
all about connections.`}
                </p>
              </Box>
            </Link>
          </Box>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>{`What's WhoDat?`} &rarr;</h2>
            <p>
              Not sure what the hype is all about? No worries, we will show you.
            </p>
          </a>

          <a href="https://www.loom.com" className={styles.card}>
            <h2>Loom &rarr;</h2>
            <p>
              Loom powers WhoDat - Loom records quick videos of your screen and
              cam.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Connect &rarr;</h2>
            <p>
              {`Learn about the project and connect with it's creator, Shaun VanWeelden`}
            </p>
          </a>
        </div>
        <div style={{ display: "inline-block", width: 300 }}></div>
      </div>
    </>
  );
}
