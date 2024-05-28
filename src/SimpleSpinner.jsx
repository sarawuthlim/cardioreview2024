import React from "react";
import { Box, CircularProgress } from "@mui/material";

function SimpleSpinner({ isLoading }) {
  return isLoading ? (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <CircularProgress />
    </Box>
  ) : null;
}

export default SimpleSpinner;
