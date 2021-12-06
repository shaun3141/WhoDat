import { useEffect, useState } from "react";

import { Box, Grid, Paper, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import firebase from "../firebase/clientApp";
import {
  getFirestore,
  collection,
  addDoc,
  DocumentReference,
  query,
  where,
} from "firebase/firestore";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";

import Head from "next/head";

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

  const store = getFirestore(firebase);

  // If getting data continuously, it loads one user into state at a time..
  // Which is hard to work with for useEffect randomly setting the game state..
  const [allUsers, allUsersLoading, allUsersError] = useCollectionDataOnce(
    props.user &&
      query(
        collection(store, "users"),
        where("organization", "==", props.user.organization)
      ),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(false);
      } catch (e) {
        console.error("Error", e);
      }
    }
    fetchData();
  }, [props.user, store, allUsers]);

  return (
    <>
      <Head>
        <title>WhoDat | Play</title>
      </Head>
      {allUsersLoading && <LoadingSpinner />}
      {!allUsersLoading && (
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
