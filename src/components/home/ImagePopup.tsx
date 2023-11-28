import type { ImageDetail } from "@/models/search.models";
import ImageComponent from "../gallery/ImageComponent";
import Endpoints from "@/services/endpoints";
import React, { useState } from "react";
import { useThemeContext } from "@/context/theme.context";
import { Dialog, Link, Typography } from "@mui/material";
import { updateQuery } from "@/utils/helperFunctions";
import { Box, Stack } from "@mui/system";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";

type Props = {
    imageId: string;
    variant?: string;
};

const ImagePopup: React.FC<Props> = ({ imageId, variant }) => {
    const { theme } = useThemeContext();
    const [showMore, setShowMore] = useState(false);

    const imageQuery = useQuery({
        queryKey: ["imageDetails", imageId],
        queryFn: async () =>
            (await Endpoints.imageDetails({
                asset_id: imageId,
            })) as AxiosResponse<ImageDetail>,
        enabled: imageId !== "",
    });

    /**
     * Resets currently opened image
     */
    const closeImagePopup = () => {
        updateQuery({ imageId: undefined, variant: undefined });
    };

    return (
        <Dialog
            open={imageId !== ""}
            onClose={closeImagePopup}
            fullWidth
            maxWidth={"lg"}
        >
            <Stack
                sx={{
                    backgroundColor: theme.palette.background.default,
                    gap: 4,
                    p: 4,
                    flexDirection: {
                        xs: "column-reverse",
                        sm: "row",
                    },
                }}
            >
                {/************************************************
                 *  LEFT SIDE (IMAGE DETAILS)
                 ************************************************/}
                <Stack sx={{ flex: 1 }}>
                    {/* Details box */}

                    <Box
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            p: 2,
                        }}
                    >
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
                        <Link
                            onClick={() => setShowMore(true)}
                            sx={{
                                display: showMore ? "none" : "block",
                                cursor: "pointer",
                                textDecoration: "none",
                                fontWeight: "bold",
                            }}
                        >
                            Show more
                        </Link>
                        <Link
                            onClick={() => setShowMore(false)}
                            sx={{
                                display: !showMore ? "none" : "block",
                                cursor: "pointer",
                                textDecoration: "none",
                                fontWeight: "bold",
                            }}
                        >
                            Show less
                        </Link>
                    </Box>

                    <Stack></Stack>
                </Stack>

                {/************************************************
                 *  RIGHT SIDE (IMAGE GALLERY)
                 ************************************************/}
                <Stack sx={{ flex: 1 }}>
                    <ImageComponent
                        reference_job_id={imageId}
                        variant={variant}
                    />
                    <Stack
                        direction={"row"}
                        sx={{
                            p: 2,
                            gap: 1,
                        }}
                    >
                        {imageQuery.data?.data.asset.image_paths.map(
                            (imagePath, index) => {
                                // Skip the grid image
                                if (imagePath.includes("grid_0")) return;

                                return (
                                    <ImageComponent
                                        key={index}
                                        fullImagePath={imagePath}
                                        variant={variant}
                                        blur={
                                            index.toString() !==
                                            variant?.slice(-1)
                                        }
                                        onClick={() => {
                                            if (index <= 3) {
                                                updateQuery({
                                                    variant:
                                                        "0_" + index.toString(),
                                                });
                                            } else if (index === 4) {
                                                updateQuery({
                                                    variant: "grid_0",
                                                });
                                            } else {
                                                updateQuery({
                                                    variant: "0_0",
                                                });
                                            }
                                        }}
                                    />
                                );
                            }
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Dialog>
    );
};

export default ImagePopup;
