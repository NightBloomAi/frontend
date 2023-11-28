import { useThemeContext } from "@/context/theme.context";
import { Typography } from "@mui/material";
import React from "react";

const LogoAndSlogan = () => {
    const { theme } = useThemeContext();

    return (
        <React.Fragment>
            <Typography
                component={"div"}
                variant={"h3"}
                className="font-museo"
                color={theme.palette.secondary.main}
            >
                NightBloom
            </Typography>
            <Typography
                sx={{
                    textAlign: "center",
                }}
            >
                Discover your imagination - Midjourney search engine
            </Typography>
        </React.Fragment>
    );
};

export default LogoAndSlogan;
