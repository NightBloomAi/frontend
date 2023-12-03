import { updateQuery } from "@/utils/helperFunctions";
import { Typography } from "@mui/material";
import { Stack, Box } from "@mui/system";
import Link from "next/link";
import React from "react";
import ImageComponent from "../gallery/ImageComponent";
import { useThemeContext } from "@/context/theme.context";
import { ImageDetailRes } from "@/models/search.models";
import axios from "axios";
import { UseQueryResult } from "react-query";

type Props = {
    imageId: string;
    imageQuery: UseQueryResult<
        axios.AxiosResponse<ImageDetailRes, any>,
        unknown
    >;
    variant?: string;
    route?: string;
};

const ImageGallery: React.FC<Props> = ({
    imageId,
    imageQuery,
    variant,
    route,
}) => {
    const { theme } = useThemeContext();

    return (
        <Stack sx={{ flex: 1 }}>
            <ImageComponent
                reference_job_id={imageId}
                variant={variant}
                zoomOnHover={false}
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
                                blur={index.toString() !== variant?.slice(-1)}
                                zoomOnHover={
                                    index.toString() !== variant?.slice(-1)
                                }
                                onClick={() => {
                                    if (index <= 3) {
                                        updateQuery(
                                            {
                                                variant:
                                                    "0_" + index.toString(),
                                            },
                                            route
                                        );
                                    } else if (index === 4) {
                                        updateQuery(
                                            {
                                                variant: "grid_0",
                                            },
                                            route
                                        );
                                    } else {
                                        updateQuery(
                                            {
                                                variant: "0_0",
                                            },
                                            route
                                        );
                                    }
                                }}
                            />
                        );
                    }
                )}
            </Stack>
        </Stack>
    );
};

export default ImageGallery;
