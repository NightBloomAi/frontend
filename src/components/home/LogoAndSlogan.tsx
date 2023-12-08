import { useThemeContext } from "@/context/theme.context";
import { Stack, Typography } from "@mui/material";
import React from "react";

type Props = {
    title: string;
    subtitle: string;
    hasSearchBar?: boolean;
};

const LogoAndSlogan: React.FC<Props> = ({
    title,
    subtitle,
    hasSearchBar = false,
}) => {
    const { theme } = useThemeContext();

    return (
        <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                mt: 8,
                mb: hasSearchBar ? 0 : 10,
                gap: 4,
            }}
        >
            <Typography
                component={"div"}
                variant={"h3"}
                fontFamily={"MuseoModerno"}
                sx={{
                    fontSize: {
                        xs: "2.5rem",
                        sm: "3rem",
                        md: "3.2rem",
                    },
                }}
                color={theme.palette.secondary.main}
            >
                {title}
            </Typography>
            <Typography
                sx={{
                    textAlign: "center",
                    maxWidth: "sm",
                }}
            >
                {subtitle}
            </Typography>
        </Stack>
    );
};

export default LogoAndSlogan;
