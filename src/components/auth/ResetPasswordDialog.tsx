import { useThemeContext } from "@/context/theme.context";
import { Views } from "@/models/view.models";
import { updateQuery } from "@/utils/helperFunctions";
import { useMediaQuery, Dialog, DialogTitle, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import ResetPassword from "./ResetPassword";

const ResetPasswordDialog = () => {
    const router = useRouter();
    const view = router.query.view;
    const { theme } = useThemeContext();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Dialog
            open={view === "resetPassword"}
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
                    <CloseIcon fontSize="large" />
                </IconButton>
            </DialogTitle>
            <ResetPassword />
            <Box
                sx={{
                    height: 30,
                    backgroundColor: theme.palette.background.default,
                }}
            ></Box>
        </Dialog>
    );
};

export default ResetPasswordDialog;
