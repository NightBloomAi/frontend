import Layout from "@/components/layouts/Layout";
import { updateQuery } from "@/utils/helperFunctions";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import Link from "next/link";
import React from "react";

const AccountSettingsPage = () => {
    return (
        <Layout>
            <Stack justifyContent={"center"} alignItems={"center"} gap={4}>
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
                        Account Settings
                    </Typography>
                    <Typography variant={"body1"} textAlign={"center"}>
                        Manage your account settings
                    </Typography>
                </Stack>
            </Stack>
        </Layout>
    );
};

export default AccountSettingsPage;
