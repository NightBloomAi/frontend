import LogoAndSlogan from "@/components/home/LogoAndSlogan";
import Layout from "@/components/layouts/Layout";
import TopLoadingBar from "@/components/utils/TopLoadingBar";
import { useAuthContext } from "@/context/auth.context";
import { API_CLIENT } from "@/services/ApiClient";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useQuery } from "react-query";
import React from "react";
import protectedRoute from "@/components/auth/protectedRoute";
import { useThemeContext } from "@/context/theme.context";

const AccountSettingsPage = () => {
    const { userSession } = useAuthContext();
    const { theme } = useThemeContext();
    const profileQuery = useQuery({
        queryKey: "userProfile",
        queryFn: async () => await API_CLIENT.getUserProfile(),
    });

    return (
        <Layout>
            {profileQuery.isLoading && <TopLoadingBar />}

            <Stack justifyContent={"center"} alignItems={"center"} gap={4}>
                <LogoAndSlogan
                    title={"Account Settings"}
                    subtitle={"Manage your account settings"}
                />

                <Stack
                    direction={"column"}
                    gap={4}
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "50%",
                            md: "50%",
                            lg: "50%",
                            xl: "50%",
                        },
                    }}
                >
                    <Stack
                        direction={"row"}
                        gap={2}
                        sx={{
                            width: "100%",
                            borderRadius: 8,
                            py: 2,
                            px: 4,
                            backgroundColor: theme.palette.background.paper,
                        }}
                    >
                        <Typography
                            variant={"h6"}
                            color={theme.palette.primary.main}
                            sx={{
                                flex: 1,
                            }}
                        >
                            Email:{" "}
                        </Typography>
                        <Typography
                            variant={"h6"}
                            sx={{
                                flex: 3,
                            }}
                        >
                            {userSession?.email}
                        </Typography>
                    </Stack>

                    <Stack
                        direction={"row"}
                        gap={2}
                        sx={{
                            width: "100%",
                            borderRadius: 8,
                            py: 2,
                            px: 4,
                            backgroundColor: theme.palette.background.paper,
                        }}
                    >
                        <Typography
                            variant={"h6"}
                            color={theme.palette.primary.main}
                            sx={{
                                flex: 1,
                            }}
                        >
                            Username:{" "}
                        </Typography>
                        <Typography
                            variant={"h6"}
                            sx={{
                                flex: 3,
                            }}
                        >
                            {profileQuery.data?.data.username === "" ||
                            profileQuery.data?.data.username === null ||
                            profileQuery.data?.data.username === undefined
                                ? "None"
                                : profileQuery.data?.data.username}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Layout>
    );
};

export default protectedRoute(AccountSettingsPage);
