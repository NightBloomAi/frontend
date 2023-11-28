import { createTheme, colors, PaletteOptions, PaletteColorOptions, PaletteColor } from "@mui/material";
import { Theme } from "@mui/system";

declare module '@mui/material/styles' {
    interface Palette {
        transGrey: PaletteColor
    }

    interface PaletteOptions {
        transGrey?: PaletteColorOptions,
    }
}

/******************************************************************************
    THEME
*******************************************************************************/
const themeDark = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#D0BCFF",
            dark: "#D0BCFF",
            light: "#D0BCFF",
        },
        secondary: {
            main: "#CAC4D0",
            dark: "#CAC4D0",
            light: "#CAC4D0",
        },
        text: {
            primary: "#CAC4D0",
            secondary: colors.grey[700],
        },
        background: {
            default: "#1c1b1f",
            paper: "#49454F",
        },
        transGrey: {
            main: "rgba(208,188,255,.11)"
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
                        fontSize: 16,
                    },
                },
            ],
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: "#D0BCFF",
                    textTransform: "none",
                    "& .MuiTouchRipple-root": {
                        color: colors.grey[500],
                    },
                    "&:hover": {
                        backgroundColor: "#D0BCFF",
                        color: "#1c1b1f",
                        borderWidth: 2,
                    },
                },
            },
        },
    },
});

export default themeDark;