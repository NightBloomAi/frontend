/* eslint-disable @next/next/no-img-element */
import { Hit, ImageDetail } from "@/types/searchRes.type";
import React, { useEffect, useState } from "react";
import ImagePopup from "./imagePopup";
import Endpoints from "@/api/endpoints";
import {
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { imageEndpointURL } from "@/api/midjourneyApi";
import { useUserFavContext } from "@/contexts/userFavContext";
import { useAuthContext } from "@/contexts/authContext";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";

interface GalleryProps {
    data: Hit[];
    category: string;
    setCategory: (event: SelectChangeEvent<string>) => void;
    params: ReadonlyURLSearchParams;
}

export default function Gallery({
    data,
    category,
    setCategory,
    params,
}: GalleryProps): React.JSX.Element {
    const router = useRouter();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Hit>(data[0]);
    const [isFavourite, setIsFavourite] = useState(false);
    const { checkFavourite } = useUserFavContext();
    const { session } = useAuthContext();

    const imageQuery = useQuery({
        queryKey: ["imageDetails", selectedImage?.reference_job_id],
        queryFn: async () => {
            const res = await Endpoints.imageDetails({
                asset_id:
                    params.get("imageId") ?? selectedImage?.reference_job_id,
            });
            return res as AxiosResponse<ImageDetail>;
        },
        enabled: isPopupVisible,
    });

    /**
     * Handles setting the image ID in the URL query parameters
     * (if you pass empty string as the image ID, it will remove the image ID from the query parameters)
     *
     * @param imageId The image ID to set the query parameters to
     */
    const handleSetQueryParams = (imageId: string) => {
        // Convert URLSearchParams to a regular object
        const currentParams = Array.from(params.entries()).reduce(
            (obj, [key, value]) => {
                obj[key] = value;
                return obj;
            },
            {} as Record<string, string>
        );

        // Update the search parameter
        const newSearchParams = {
            ...currentParams, // keep the other query string parameters
            imageId: imageId,
        };

        // Create a query string and update the URL
        const queryString = new URLSearchParams(newSearchParams);

        if (imageId === "") {
            queryString.delete("imageId");
        }

        router.replace(`?${queryString}`);
    };

    /**
     * Sets the image ID in the URL query parameters to the image ID of the image that was clicked
     * Checks if the image is a favourite and sets the isFavourite state accordingly
     * Toggles the popup visibility
     *
     * @param image The image Hit object to toggle the popup for
     */
    const togglePopup = (image: Hit) => async () => {
        handleSetQueryParams(image.reference_job_id);
        setIsFavourite(false);
        setSelectedImage(image);
        if (session) {
            const isitaFavourite = await checkFavourite({
                reference_job_id: image.reference_job_id,
            });
            console.log(isitaFavourite);
            if (isitaFavourite === true) {
                console.log("is a favourite");
                setIsFavourite(true);
            } else {
                console.log("is not a favourite");
                setIsFavourite(false);
            }
        }

        setIsPopupVisible(!isPopupVisible);
    };

    /**
     * Closes the popup and removes the image ID from the URL query parameters
     */
    const closePopup = () => {
        handleSetQueryParams("");
        setIsPopupVisible(false);
    };

    /**
     * Check if the image ID is in the URL query parameters and set the selected image accordingly
     * Also set the popup visibility accordingly
     */
    useEffect(() => {
        if (params.get("imageId") !== null) {
            const imageId = params.get("imageId");
            const hit = {
                reference_job_id: imageId ?? "",
                prompt: imageQuery.data?.data.asset.prompt ?? "",
                full_command: imageQuery.data?.data.asset.full_command ?? "",
                height: imageQuery.data?.data.asset.height ?? 0,
                category: imageQuery.data?.data.asset.category ?? "",
            };

            setSelectedImage(hit);
            setIsPopupVisible(true);
        }
    }, [
        data,
        imageQuery.data?.data.asset.category,
        imageQuery.data?.data.asset.full_command,
        imageQuery.data?.data.asset.height,
        imageQuery.data?.data.asset.prompt,
        params,
    ]);

    return (
        <div className="flex flex-col gap-y-4">
            {/* Filters bar */}
           {data.length !== 0 && <div className="flex flex-row justify-center items-center gap-x-4">
                <div className="flex flex-row justify-between w-full">
                    <div></div>
                    <div className=" w-36 focus:rounded-full focus-visible:!border-0 h-auto ">
                        <FormControl fullWidth size="small">
                            <Select
                                sx={{
                                    "& svg": {
                                        fill: "var(--lightest-grey)",
                                    },

                                    "& .Mui-selected": {
                                        backgroundColor:
                                            "var(--opaque-trans-grey)",
                                        border: "none",
                                    },
                                    "& .MuiListItem-root.Mui-selected": {
                                        backgroundColor: "var(--trans-grey)",
                                    },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            backgroundColor:
                                                "var(--opaque-trans-grey)",
                                            color: "var(--lightest-grey)",
                                        },
                                    },
                                }}
                                value={category}
                                onChange={setCategory}
                                displayEmpty
                                inputProps={{ "aria-label": "Without label" }}
                                variant="standard"
                                className="text-base  bg-[var(--opaque-trans-grey)] rounded-lg !text-[var(--lightest-grey)] focus-visible:!border-0 p-1 px-2 m-0 after:border-0 hover:before:border-0 hover:before:w-0 before:border-0"
                            >
                                {filter.map((item) => (
                                    <MenuItem
                                        value={item.name}
                                        key={item.displayName}
                                        className="text-base focus-visible:!border-0 bg-[var(--opaque-trans-grey)] hover:bg-[var(--trans-grey)] duration-300 focus-visible:bg-[var(--light-grey)] p-2 m-0 bg-cover mt-0 text-[var(--lightest-grey)] scroll-m-0 "
                                    >
                                        {item.displayName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>}

            <ul className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.map((item) => (
                    <div
                        key={item.reference_job_id}
                        className="object-cover w-full overflow-hidden cursor-pointer rounded"
                        onClick={togglePopup(item)}
                    >
                        <img
                            src={imageEndpointURL({
                                reference_job_id: item.reference_job_id,
                            })}
                            alt={item.reference_job_id}
                            className="object-cover h-full w-full duration-500 hover:scale-110"
                        />
                    </div>
                ))}
            </ul>
            {isPopupVisible && (
                <ImagePopup
                    closePopup={closePopup}
                    imageInfo={selectedImage}
                    isFavourite={isFavourite}
                    setIsFavourite={setIsFavourite}
                />
            )}
        </div>
    );
}

type filterType = {
    name: string;
    displayName: string;
};

const filter: filterType[] = [
    {
        name: "",
        displayName: "all",
    },
    {
        name: "2d_illustration",
        displayName: "2d illustration",
    },
    {
        name: "analytic_drawing",
        displayName: "analytic drawing",
    },
    {
        name: "anime_portrait",
        displayName: "anime portrait",
    },
    {
        name: "coloring_book",
        displayName: "coloring book",
    },
    {
        name: "cinematographic",
        displayName: "cinematographic",
    },
    {
        name: "dark_fantasy",
        displayName: "dark fantasy",
    },
    {
        name: "diagrammatic_drawing",
        displayName: "diagrammatic drawing",
    },
    {
        name: "diagrammatic_portrait",
        displayName: "diagrammatic portrait",
    },
    {
        name: "dripping_art",
        displayName: "dripping art",
    },
    {
        name: "double_exposure",
        displayName: "double exposure",
    },
    {
        name: "futuristic",
        displayName: "futuristic",
    },
    {
        name: "graffiti_portrait",
        displayName: "graffiti portrait",
    },
    {
        name: "infographic_drawing",
        displayName: "infographic drawing",
    },
    {
        name: "iridescent",
        displayName: "iridescent",
    },
    {
        name: "isometric_anime",
        displayName: "isometric anime",
    },
    {
        name: "isometric_illustration",
        displayName: "isometric illustration",
    },
    {
        name: "japanese_ink",
        displayName: "japanese ink",
    },
    {
        name: "line_drawing",
        displayName: "line drawing",
    },
    {
        name: "oil_painting",
        displayName: "oil painting",
    },
    {
        name: "op_art",
        displayName: "op art",
    },
    {
        name: "ornamental_watercolor",
        displayName: "ornamental watercolor",
    },
    {
        name: "paper_cut",
        displayName: "paper cut",
    },
    {
        name: "paper_quilling",
        displayName: "paper quilling",
    },
    {
        name: "pastel_drawing",
        displayName: "pastel drawing",
    },
    {
        name: "patchwork_collage",
        displayName: "patchwork collage",
    },
    {
        name: "pixel_art",
        displayName: "pixel art",
    },
    {
        name: "polaroid_photo",
        displayName: "polaroid photo",
    },
    {
        name: "stained_glass_portrait",
        displayName: "stained glass portrait",
    },
    {
        name: "tattoo_art",
        displayName: "tattoo art",
    },
    {
        name: "typography",
        displayName: "typography",
    },
    {
        name: "ukiyo_e",
        displayName: "ukiyo e",
    },
    {
        name: "watercolor_landscape",
        displayName: "watercolor landscape",
    },
    {
        name: "winter_oil_painting",
        displayName: "winter oil painting",
    },
];
