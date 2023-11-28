import React from "react";
import { Stack } from "@mui/system";
import Layout from "@/components/layouts/Layout";
import { Link, Typography } from "@mui/material";
import { updateQuery } from "@/utils/helperFunctions";
import { useAuthContext } from "@/context/auth.context";

const FavoritesPage = () => {
    const { userSession } = useAuthContext();

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
                        Favorites
                    </Typography>
                    <Typography variant={"body1"} textAlign={"center"}>
                        Keep track of your favorite images
                    </Typography>
                </Stack>
                {userSession === null ? (
                    <Typography
                        variant={"body1"}
                        sx={{
                            my: 10,
                        }}
                    >
                        Please{" "}
                        <Link
                            onClick={() => {
                                updateQuery({ view: "signIn" });
                            }}
                            sx={{
                                color: "primary.main",
                                textDecoration: "none",
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            sign in
                        </Link>{" "}
                        to view your favorites
                    </Typography>
                ) : (
                    <></>
                )}
            </Stack>
        </Layout>
    );
};

export default FavoritesPage;
