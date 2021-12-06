import { useEffect, useState } from "react";
import Head from "next/head";

import { Box, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import firebase from "../firebase/clientApp";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import Leaderboard from "./leaderboard";
import Guesser from "./guesser";
import LoadingSpinner from "./loadingSpinner";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
}));

export default function Game(props) {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);

  const store = getFirestore(firebase);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(
          props.user &&
            query(
              collection(store, "users"),
              where("organization", "==", props.user.organization)
            )
        );
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
        console.log(
          querySnapshot.docs.map((d) => {
            return d.data();
          })
        );
        setAllUsers(
          querySnapshot.docs.map((d) => {
            return d.data();
          })
        );

        setLoading(false);
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
      {loading && <LoadingSpinner />}
      {!loading && (
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Guesser allUsers={allUsers} store={store} user={props.user} />
          </Grid>
          <Grid item xs={5}>
            <Leaderboard allUsers={allUsers} store={store} user={props.user} />
          </Grid>
        </Grid>
      )}
    </>
  );
}
