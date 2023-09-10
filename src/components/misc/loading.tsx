import { Box, CircularProgress } from "@mui/material";
import React from "react";

export default function Loading() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
            }}
        >
            <CircularProgress size={60} sx={{ m: 2 }} />
        </Box>
    );
}
