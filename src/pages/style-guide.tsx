import authCheck from "@/components/auth/authCheck";
import Layout from "@/components/layouts/Layout";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const StyleGuidePage = () => {
    return (
        <Layout>
            <Stack alignItems={"center"} justifyContent={"center"}>
                <Stack
                    direction={"column"}
                    sx={{
                        my: 12,
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
            </Stack>
        </Layout>
    );
};

export default StyleGuidePage;
