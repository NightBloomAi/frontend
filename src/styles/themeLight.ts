import { createTheme, colors } from "@mui/material";

/******************************************************************************
    THEME
*******************************************************************************/
const themeLight = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#D0BCFF",
            dark: "#D0BCFF",
            light: "#D0BCFF",
        },
        secondary: {
            main: colors.grey[500],
            dark: colors.grey[100],
            light: colors.grey[500],
        },
        text: {
            primary: colors.grey[900],
            secondary: colors.grey[700],
        },
        background: {
            default: "#fff",
            paper: "#fff",
        },
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: {
                        variant: "outlined",
                    },
                    style: {
                        fontSize: 14,
                    },
                },
            ],
            styleOverrides: {
                root: {
                    "& .MuiTouchRipple-root": {
                        color: colors.grey[500],
                    },
                    "&:hover": {
                        backgroundColor: colors.grey[200],
                    },
                },
            },
        },
    },
});

export default themeLight;