import LogoAndSlogan from "@/components/home/LogoAndSlogan";
import Layout from "@/components/layouts/Layout";
import { Stack } from "@mui/system";
import React from "react";

const AccountSettingsPage = () => {
    return (
        <Layout>
            <Stack justifyContent={"center"} alignItems={"center"} gap={4}>
                <LogoAndSlogan
                    title={"Account Settings"}
                    subtitle={"Manage your account settings"}
                />
            </Stack>
        </Layout>
    );
};

export default AccountSettingsPage;
