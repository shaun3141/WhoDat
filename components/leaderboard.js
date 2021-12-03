import { useEffect, useState } from "react";

import { Box, Grid, Paper, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

import LoadingSpinner from "./loadingSpinner";

export default function Leaderboard(props) {
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

  const data = props.allUsers
    ? props.allUsers.map((u, i) => {
        return { id: i + 1, name: u.displayName, score: u.score || 0 };
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
