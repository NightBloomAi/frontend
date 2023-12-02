/* eslint-disable @next/next/no-img-element */
import Layout from "@/components/layouts/Layout";
import stylesList from "@/components/styleGuide/stylesList";
import { useThemeContext } from "@/context/theme.context";
import { Category } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";

const StyleGuidePage = () => {
    const { theme } = useThemeContext();
    const router = useRouter();

    return (
        <Layout>
            <Stack alignItems={"center"} justifyContent={"center"}>
                {/***************************************************
                 * HEADER SECTION
                 ***************************************************/}
                <Stack
                    direction={"column"}
                    sx={{
                        mt: 10,
                        mb: 14,
                        gap: 4,
                    }}
                >
                    <Typography
                        component={"div"}
                        className={"font-museo"}
                        variant={"h3"}
                        textAlign={"center"}
                    >
                        Style Guide
                    </Typography>
                    <Typography variant={"body1"} textAlign={"center"}>
                        Embrace your curiousity - Explore popular styles
                    </Typography>
                </Stack>

                {/***************************************************
                 * CONTENT SECTION
                 ***************************************************/}
                <Box className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 container">
                    {stylesList.map((style) => {
                        return (
                            <Stack
                                key={style.name}
                                direction={"column"}
                                alignItems={"center"}
                                justifyItems={"center"}
                                sx={{
                                    py: 2,
                                    gap: 2,
                                    backgroundColor:
                                        theme.palette.transGrey.main,
                                    borderRadius: 4,
                                }}
                            >
                                <Typography
                                    variant={"h5"}
                                    fontWeight={700}
                                    sx={{
                                        width: "100%",
                                        px: 2,
                                        mx: "auto",
                                        textAlign: "center",
                                    }}
                                >
                                    {style.displayName}
                                </Typography>
                                <Box className="aspect-video">
                                    <img
                                        src={style.imgsrc}
                                        alt={style.name}
                                        className="w-full h-auto object-cover aspect-video"
                                    />
                                </Box>
                                <Typography variant={"body1"} sx={{ px: 2 }}>
                                    {style.descript}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        mr: 2,
                                        px: 2,
                                        mt: "auto",
                                        ml: "auto",
                                        color: theme.palette.secondary.main,
                                        borderColor:
                                            theme.palette.secondary.main,
                                        "&:hover": {
                                            backgroundColor:
                                                theme.palette.secondary.main,
                                            color: "#1c1b1f",
                                            borderWidth: 2,
                                            borderColor:
                                                theme.palette.secondary.main,
                                        },
                                    }}
                                    onClick={() => {
                                        return router.push(
                                            "style-guide/" + style.name
                                        );
                                    }}
                                >
                                    Explore
                                </Button>
                            </Stack>
                        );
                    })}
                </Box>
            </Stack>
        </Layout>
    );
};

export default StyleGuidePage;
