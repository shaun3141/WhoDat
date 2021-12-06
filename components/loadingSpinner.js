import { useState } from "react";

import { Box, CircularProgress } from "@mui/material";

export default function LoadingSpinner() {
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", margin: "100px" }}>
        <CircularProgress size={100} />
      </Box>
      <Box style={{ textAlign: "center" }}>
        Stuck? Try a quick refresh to keep things, well, fresh
      </Box>
    </>
  );
}
