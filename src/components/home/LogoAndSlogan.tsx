import { useThemeContext } from "@/context/theme.context";
import { Typography } from "@mui/material";
import React from "react";

type Props = {
    title: string;
    subtitle: string;
};

const LogoAndSlogan: React.FC<Props> = ({ title, subtitle }) => {
    const { theme } = useThemeContext();

    return (
        <React.Fragment>
            <Typography
                component={"div"}
                variant={"h3"}
                className="font-museo"
                color={theme.palette.secondary.main}
            >
                {title}
            </Typography>
            <Typography
                sx={{
                    textAlign: "center",
                }}
            >
                {subtitle}
            </Typography>
        </React.Fragment>
    );
};

export default LogoAndSlogan;
