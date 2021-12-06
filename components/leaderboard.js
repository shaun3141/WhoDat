import { useEffect, useState } from "react";

import { Box, Grid, Paper, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

import LoadingSpinner from "./loadingSpinner";

import firebase from "../firebase/clientApp";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Leaderboard(props) {
  const [allUsers, allUsersLoading, allUsersError] = useCollectionData(
    props.user &&
      query(
        collection(props.store, "users"),
        where("organization", "==", props.user.organization)
      ),
    {
      snapshotListenOptions: { includeMetadataChanges: false },
    }
  );

  const columns = [
    {
      field: "id",
      headerName: "Rank",
      width: 100,
      columnType: "number",
      disableColumnMenu: true,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      hide: false,
      resizable: false,
      disableColumnMenu: true,
    },
    {
      field: "score",
      headerName: "Score",
      width: 100,
      columnType: "number",
      disableColumnMenu: true,
    },
  ];

  const data = allUsers
    ? allUsers
        .sort((a, b) => {
          return a.profile?.score > b.profile?.score ? -1 : 1;
        })
        .map((u, i) => {
          return {
            id: i + 1,
            name: u.displayName,
            score: u?.profile?.score || 0,
          };
        })
    : [];

  return (
    <>
      {props.allUsers ? (
        <Box style={{ textAlign: "center" }}>
          <h2>Real-time Leaderboard 🏆</h2>
          <Box style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </Box>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
