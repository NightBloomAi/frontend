import { useThemeContext } from "@/context/theme.context";
import { Views } from "@/models/view.models";
import { updateQuery } from "@/utils/helperFunctions";
import {
    Box,
    Dialog,
    DialogTitle,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import SignUp from "./SignUp";

const SignUpDialog = () => {
    const router = useRouter();
    const view = router.query.view;
    const { theme } = useThemeContext();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Dialog
            open={view === "signUp"}
            onClose={() => updateQuery({ view: Views.NULL })}
            fullWidth
            fullScreen={fullScreen}
        >
            <DialogTitle
                sx={{
                    backgroundColor: theme.palette.background.default,
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={() => updateQuery({ view: Views.NULL })}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <SignUp />
            <Box
                sx={{
                    height: 30,
                    backgroundColor: theme.palette.background.default,
                }}
            ></Box>
        </Dialog>
    );
};

export default SignUpDialog;
