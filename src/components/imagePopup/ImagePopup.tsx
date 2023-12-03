/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useThemeContext } from "@/context/theme.context";
import { Dialog, Link, Typography } from "@mui/material";
import { updateQuery } from "@/utils/helperFunctions";
import { Stack } from "@mui/system";
import { useQuery } from "react-query";
import { API_CLIENT } from "@/services/ApiClient";
import ImageGallery from "./ImageGallery";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import ImagePromptBox from "./ImagePromptBox";
import ImageComponent from "../gallery/ImageComponent";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import EventIcon from "@mui/icons-material/Event";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import DatasetIcon from "@mui/icons-material/Dataset";

type Props = {
    imageId: string;
    variant?: string;
    route?: string;
};

const ImagePopup: React.FC<Props> = ({ imageId, variant, route }) => {
    const { theme } = useThemeContext();

    const imageQuery = useQuery({
        queryKey: ["imageDetails", imageId],
        queryFn: async () =>
            await API_CLIENT.imageDetails({
                asset_id: imageId,
            }),
        enabled: imageId !== "",
    });

    /**
     * Resets currently opened image
     */
    const closeImagePopup = () => {
        updateQuery({ imageId: undefined, variant: undefined }, route);
    };

    /**
     * Converts unix timestamp to date
     */
    const dateConvert = () => {
        const generationTime = imageQuery.data?.data.asset.generation_time_unix;
        if (generationTime === undefined) {
            return ""; // or some default value
        }

        const date = new Date(generationTime * 1000); // Convert Unix timestamp to milliseconds
        const now = new Date();
        const timeFormatted = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });

        if (
            date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
        ) {
            // If the date is 'today'
            return `Today, ${timeFormatted}`;
        } else {
            // For dates that are not 'today', format as needed
            return (
                date.toLocaleDateString("en-US", {
                    /* desired options for non-today dates */
                }) + `, ${timeFormatted}`
            );
        }
    };

    const convertString = (str: string) => {
        return str
            .split("_") // Split the string by underscores
            .map(
                (word) => word.charAt(0).toUpperCase() + word.slice(1) // Capitalize the first letter of each word
            )
            .join(" "); // Join the words with spaces
    };

    function capitalizeFirstLetter(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

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
                <Stack sx={{ flex: 1, gap: 4 }}>
                    {/************************************************
                     *  IMAGE PROMPT BOX
                     ************************************************/}
                    <ImagePromptBox imageQuery={imageQuery} />

                    {/************************************************
                     *  IMAGE DETAILS BOX
                     ************************************************/}
                    <Stack sx={{ flex: 1, gap: 2 }}>
                        <Typography variant="subtitle1" fontWeight={700}>
                            Image Details
                        </Typography>

                        <Stack
                            sx={{
                                flexDirection: {
                                    xs: "column",
                                    sm: "row",
                                },
                                gap: 4,
                            }}
                        >
                            {/************************************************
                             *  PARENT IMAGE
                             ************************************************/}
                            <Stack
                                sx={{
                                    p: 2,
                                    border: 2,
                                    maxWidth: 300,
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    borderColor: theme.palette.transGrey.main,
                                }}
                            >
                                <Typography variant="body1" fontWeight={700}>
                                    <FingerprintIcon /> Parent image
                                </Typography>

                                <Link
                                    className="object-cover mt-2 mx-auto w-32 h-32"
                                    href={API_CLIENT.imageEndpointURL({
                                        reference_job_id: imageId ?? "",
                                        variant: "0_0",
                                        infiniteScroll: false,
                                    })}
                                    target="_blank"
                                >
                                    <ImageComponent
                                        reference_job_id={imageId}
                                        variant={"grid_0"}
                                        zoomOnHover={false}
                                    />
                                </Link>
                            </Stack>

                            {/************************************************
                             *  IMAGE DETAILS (RESC, DATE, TIME)
                             ************************************************/}
                            <Stack
                                sx={{
                                    flexDirection: "column",
                                    gap: 2,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        p: 1,
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor:
                                            theme.palette.transGrey.main,
                                    }}
                                >
                                    <OpenWithIcon />{" "}
                                    {imageQuery.data?.data.asset.height} x{" "}
                                    {imageQuery.data?.data.asset.width}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        p: 1,
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor:
                                            theme.palette.transGrey.main,
                                    }}
                                >
                                    <EventIcon /> {dateConvert()}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        p: 1,
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor:
                                            theme.palette.transGrey.main,
                                    }}
                                >
                                    <SettingsInputCompositeIcon />{" "}
                                    {convertString(
                                        imageQuery.data?.data.asset.kind ?? ""
                                    )}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        p: 1,
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor:
                                            theme.palette.transGrey.main,
                                    }}
                                >
                                    <DatasetIcon />{" "}
                                    {capitalizeFirstLetter(
                                        imageQuery?.data?.data?.source ?? ""
                                    )}
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>

                {/************************************************
                 *  RIGHT SIDE (IMAGE GALLERY)
                 ************************************************/}
                <ImageGallery
                    imageId={imageId}
                    imageQuery={imageQuery}
                    variant={variant}
                    route={route}
                />
            </Stack>
        </Dialog>
    );
};

export default ImagePopup;
