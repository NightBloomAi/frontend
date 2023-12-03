import { useThemeContext } from "@/context/theme.context";
import { ImageDetailRes } from "@/models/search.models";
import { Typography, Button, Link } from "@mui/material";
import { UseQueryResult } from "react-query";
import { Stack, Box } from "@mui/system";
import axios from "axios";
import router from "next/router";
import React, { useState } from "react";
import CopyToClipboardButton from "./CopyToClipboardButton";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type Props = {
    imageQuery: UseQueryResult<
        axios.AxiosResponse<ImageDetailRes, any>,
        unknown
    >;
};

const ImagePromptBox: React.FC<Props> = ({ imageQuery }) => {
    const { theme } = useThemeContext();
    const [showMore, setShowMore] = useState(false);

    return (
        <Stack
            direction={"column"}
            sx={{
                backgroundColor: theme.palette.transGrey.main,
                p: 2,
                flex: 1,
                height: "100%",
                gap: 4,
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
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
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
                    <CopyToClipboardButton
                        icon={<FavoriteIcon />}
                        tooltip="Favorite image"
                        snackbarMessage="Added to favorites"
                        onClick={() => {
                            // TODO: Add to favorites
                        }}
                        disabled={true}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
};

export default ImagePromptBox;
