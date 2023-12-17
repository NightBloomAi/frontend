import React from "react";
import Layout from "@/components/layouts/Layout";
import ImageComponent from "@/components/gallery/ImageComponent";
import TopLoadingBar from "@/components/utils/TopLoadingBar";
import { Box, Stack } from "@mui/system";
import { Link, Typography } from "@mui/material";
import { encryptVariant, updateQuery } from "@/utils/helperFunctions";
import { useAuthContext } from "@/context/auth.context";
import { useQuery } from "react-query";
import { API_CLIENT } from "@/services/ApiClient";
import { useRouter } from "next/router";
import ImagePopup from "@/components/imagePopup/ImagePopup";
import LogoAndSlogan from "@/components/home/LogoAndSlogan";

const FavoritesPage = () => {
    const router = useRouter();
    const { userSession, isLoading } = useAuthContext();
    const favoritesQuery = useQuery({
        queryKey: "userFavourites",
        queryFn: async () => await API_CLIENT.userFavourites(),
    });

    // Extract query parameters`
    const imageId = router.query.imageId ?? "";
    const variant = router.query.variant ?? "0_0";

    return (
        <Layout>
            <Stack
                justifyContent={"center"}
                alignItems={"center"}
                gap={4}
                sx={{
                    mb: 10,
                }}
            >
                {/***************************************************
                 * HEADER SECTION
                 ***************************************************/}
                <LogoAndSlogan
                    title={"Favorites"}
                    subtitle={"Keep track of your favorite images"}
                />

                {/***************************************************
                 * CONTENT SECTION
                 ***************************************************/}
                {userSession === null && !isLoading ? (
                    // **************************************************
                    // User is not logged in
                    // **************************************************
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
                ) : favoritesQuery.isLoading ? (
                    // **************************************************
                    // User is logged in, but favorites are loading
                    // **************************************************
                    <React.Fragment>
                        <TopLoadingBar />
                        <Box className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {Array.from(
                                { length: 10 },
                                (_value, index) => index
                            ).map((i) => {
                                return (
                                    <ImageComponent
                                        key={i}
                                        reference_job_id={i.toString()}
                                        variant={"0_0"}
                                        showDefaultVariant
                                    />
                                );
                            })}
                        </Box>
                    </React.Fragment>
                ) : (
                    // **************************************************
                    // User is logged in, and favorites have loaded
                    // **************************************************
                    <Box
                        className={`w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4`}
                    >
                        {favoritesQuery.data?.data.assets
                            .sort((a, b) => {
                                return (
                                    b.favourited_at_unix - a.favourited_at_unix
                                );
                            })
                            .map((asset) => {
                                return (
                                    <ImageComponent
                                        key={asset.reference_job_id}
                                        reference_job_id={
                                            asset.reference_job_id
                                        }
                                        variant={encryptVariant(asset.variant)}
                                        onClick={() => {
                                            updateQuery(
                                                {
                                                    imageId:
                                                        asset.reference_job_id,
                                                    variant: encryptVariant(
                                                        asset.variant
                                                    ),
                                                },
                                                router.asPath
                                            );
                                        }}
                                    />
                                );
                            })}
                    </Box>
                )}
            </Stack>
            {/***************************************************
             * IMAGE POPUP
             ***************************************************/}
            {imageId !== "" && (
                <ImagePopup
                    imageId={imageId.toString()}
                    variant={variant.toString()}
                    route="favorites"
                />
            )}
        </Layout>
    );
};

export default FavoritesPage;
