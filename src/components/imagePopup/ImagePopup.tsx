import {
    Dialog,
    IconButton,
    Link,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useQuery } from "react-query";
import { API_CLIENT } from "@/services/ApiClient";
import { ImageVariants } from "@/models/view.models";
import { updateQuery } from "@/utils/helperFunctions";
import { useAuthContext } from "@/context/auth.context";
import { useThemeContext } from "@/context/theme.context";
import SettingsInputCompositeIcon from "@mui/icons-material/SettingsInputComposite";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import OpenWithIcon from "@mui/icons-material/OpenWith";
import ImageComponent from "../gallery/ImageComponent";
import DatasetIcon from "@mui/icons-material/Dataset";
import TopLoadingBar from "../utils/TopLoadingBar";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import ImagePromptBox from "./ImagePromptBox";
import ImageGallery from "./ImageGallery";
import toast from "react-hot-toast";
import React from "react";

type Props = {
    imageId: string;
    variant?: string;
    route?: string;
};

const ImagePopup: React.FC<Props> = ({ imageId, variant, route }) => {
    const { theme } = useThemeContext();
    const { userSession } = useAuthContext();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    variant = ImageVariants.includes(variant ?? "") ? variant : "0_0";

    const imageQuery = useQuery({
        queryKey: ["imageDetails", imageId],
        queryFn: async () =>
            await API_CLIENT.imageDetails({
                asset_id: imageId,
            }),
        enabled: imageId !== "",
        onError: () => {
            toast.error("Error fetching image details");
            updateQuery({ imageId: undefined, variant: undefined }, route);
        },
        retry: 1,
    });

    const favoriteQuery = useQuery({
        queryKey: ["isFavorite", imageId],
        queryFn: async () =>
            await API_CLIENT.checkFavorite({
                id: imageId,
            }),
        enabled: imageId !== "" && userSession !== null,
        retry: 1,
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
            fullScreen={fullScreen}
            scroll="paper"
        >
            {(favoriteQuery.isLoading || imageQuery.isLoading) && (
                <TopLoadingBar />
            )}

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
                    <ImagePromptBox
                        imageQuery={imageQuery}
                        favoriteQuery={favoriteQuery}
                    />

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
                                    flex: 1,
                                    width: "100%",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    borderColor: theme.palette.transGrey.main,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                }}
                            >
                                <Typography variant="body1" fontWeight={700}>
                                    <FingerprintIcon /> Parent image
                                </Typography>

                                <Link
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        display: "flex",
                                    }}
                                    href={API_CLIENT.imageEndpointURL({
                                        reference_job_id: imageId ?? "",
                                        variant: "grid_0",
                                        showDefaultVariant: false,
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
                                    flex: 2,
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{
                                        py: 2,
                                        px: 2,
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor:
                                            theme.palette.transGrey.main,
                                    }}
                                >
                                    <OpenWithIcon sx={{ mr: 2 }} />{" "}
                                    {imageQuery?.data?.data !== undefined &&
                                        imageQuery.data?.data.asset.height +
                                            " x " +
                                            imageQuery.data?.data.asset.width}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        py: 2,
                                        px: 2,
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor:
                                            theme.palette.transGrey.main,
                                    }}
                                >
                                    <EventIcon sx={{ mr: 2 }} /> {dateConvert()}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        py: 2,
                                        px: 2,
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor:
                                            theme.palette.transGrey.main,
                                    }}
                                >
                                    <SettingsInputCompositeIcon
                                        sx={{ mr: 2 }}
                                    />{" "}
                                    {convertString(
                                        imageQuery.data?.data.asset.kind ?? ""
                                    )}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        py: 2,
                                        px: 2,
                                        borderRadius: 2,
                                        border: 2,
                                        borderColor:
                                            theme.palette.transGrey.main,
                                    }}
                                >
                                    <DatasetIcon sx={{ mr: 2 }} />{" "}
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

                {fullScreen && (
                    <Stack
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            justifyContent: "flex-end",
                            alignItems: "flex-end",
                        }}
                    >
                        <IconButton onClick={closeImagePopup}>
                            <CloseIcon fontSize="large" />
                        </IconButton>
                    </Stack>
                )}
            </Stack>
        </Dialog>
    );
};

export default ImagePopup;
