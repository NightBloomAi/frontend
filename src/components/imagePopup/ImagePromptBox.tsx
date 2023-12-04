import { useThemeContext } from "@/context/theme.context";
import { CheckFavRes, ImageDetailRes } from "@/models/search.models";
import { Typography, Button, Link } from "@mui/material";
import { UseQueryResult } from "react-query";
import { Stack, Box } from "@mui/system";
import axios from "axios";
import router, { useRouter } from "next/router";
import React, { useState } from "react";
import CopyToClipboardButton from "./CopyToClipboardButton";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { API_CLIENT } from "@/services/ApiClient";
import FavouriteButton from "./FavouriteButton";

type Props = {
    imageQuery: UseQueryResult<
        axios.AxiosResponse<ImageDetailRes, any>,
        unknown
    >;
    favoriteQuery: UseQueryResult<
        axios.AxiosResponse<CheckFavRes, any>,
        unknown
    >;
};

const ImagePromptBox: React.FC<Props> = ({ imageQuery, favoriteQuery }) => {
    const { theme } = useThemeContext();
    const router = useRouter();
    const [showMore, setShowMore] = useState(false);
    const variant = router.query.variant?.toString() ?? "0_0";

    /**
     * Download image from url
     *
     * @param imageUrl The url of the image to download
     * @param imageName The name of the image to download
     */
    const downloadImage = async (imageUrl: string, imageName: string) => {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const urlObject = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = urlObject;
        link.download = imageName || "download";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(urlObject);
    };

    return (
        <Stack
            direction={"column"}
            sx={{
                backgroundColor: theme.palette.transGrey.main,
                p: 2,
                gap: 4,
                borderRadius: 2,
            }}
        >
            {/************************************************
             *  IMAGE PROMPT
             ************************************************/}
            <Box>
                <Typography
                    variant={"body1"}
                    sx={{
                        textOverflow: "ellipsis",
                    }}
                >
                    {imageQuery.data?.data.asset.prompt.slice(
                        0,
                        !showMore
                            ? 100
                            : imageQuery.data?.data.asset.prompt.length
                    )}
                </Typography>

                {imageQuery?.data?.data?.asset?.prompt &&
                    imageQuery?.data?.data?.asset?.prompt.length > 100 && (
                        <Link
                            onClick={() => setShowMore(!showMore)}
                            sx={{
                                cursor: "pointer",
                                textDecoration: "none",
                                fontWeight: "bold",
                            }}
                        >
                            {showMore ? "Show less" : "Show more"}
                        </Link>
                    )}
            </Box>
            <Stack
                justifyContent={"space-between"}
                alignItems={"center"}
                sx={{
                    marginTop: "auto",
                    flexDirection: "row",
                    gap: 2,
                }}
            >
                {imageQuery?.data?.data.asset.category !== "none" && (
                    <Button
                        variant="outlined"
                        onClick={() => {
                            router.push(
                                `/style-guide/${imageQuery?.data?.data.asset.category}`
                            );
                        }}
                    >
                        Explore style
                    </Button>
                )}
                <Stack direction={"row"}>
                    <CopyToClipboardButton
                        icon={<ContentCopyIcon />}
                        tooltip="Copy image prompt"
                        snackbarMessage="Copied to clibboard"
                        onClick={() => {
                            if (imageQuery.data) {
                                navigator.clipboard.writeText(
                                    imageQuery.data?.data.asset.prompt
                                );
                            }
                        }}
                    />
                    <CopyToClipboardButton
                        icon={<IosShareIcon />}
                        tooltip="Share image"
                        snackbarMessage="Copied to clibboard"
                        onClick={() =>
                            navigator.clipboard.writeText(
                                window.location.toString()
                            )
                        }
                    />
                    <FavouriteButton
                        icon={<FavoriteIcon />}
                        tooltip="Favorite image"
                        snackbarMessage="Added to favorites"
                        isFavorite={favoriteQuery?.data?.data?.is_favourite}
                    />

                    <CopyToClipboardButton
                        icon={<FileDownloadIcon />}
                        tooltip="Download image"
                        snackbarMessage="Image downloaded"
                        onClick={() => {
                            if (imageQuery.data) {
                                downloadImage(
                                    API_CLIENT.imageEndpointURL({
                                        reference_job_id:
                                            imageQuery.data?.data.asset
                                                .reference_job_id,
                                        variant: variant,
                                        infiniteScroll: false,
                                    }),
                                    `${imageQuery.data?.data.asset.id}.png`
                                );
                            }
                        }}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ImagePromptBox;
