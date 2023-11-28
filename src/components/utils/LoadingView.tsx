import { Box } from "@mui/system";
import React from "react";
import TopLoadingBar from "./TopLoadingBar";

function LoadingView() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
            }}
        >
            <TopLoadingBar />
        </Box>
    );
}

export default LoadingView;
