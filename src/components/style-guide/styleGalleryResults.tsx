/* eslint-disable @next/next/no-img-element */

import Endpoints from "@/api/endpoints";
import ImagePopup from "../landing/imagePopup";
import { imageEndpointURL } from "@/api/midjourneyApi";
import { Hit, ImageDetail } from "@/types/searchRes.type";
import { useUserFavContext } from "@/contexts/userFavContext";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";

interface GalleryProps {
    data: Hit[];
    category: string;
    params: ReadonlyURLSearchParams;
}

export default function StyleGalleryResults({
    data,
    category,
    params,
}: GalleryProps): React.JSX.Element {
    const router = useRouter();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<Hit>(data[0]);
    const [isFavourite, setIsFavourite] = useState(false);
    const { checkFavourite } = useUserFavContext();
    const { session } = useAuthContext();

    const imageQuery = useQuery({
        queryKey: [
            "imageDetails",
            params.get("imageId") ?? selectedImage.reference_job_id,
        ],
        queryFn: async () => {
            const res = await Endpoints.imageDetails({
                asset_id:
                    params.get("imageId") ?? selectedImage.reference_job_id,
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

        router.replace(`/style-guide/${category}/?${queryString}`);
    };

    const togglePopup = (image: Hit) => async () => {
        handleSetQueryParams(image.reference_job_id);
        setIsFavourite(false);
        setSelectedImage(image);
        if (session) {
            const isitaFavourite = await checkFavourite({
                reference_job_id: image.reference_job_id,
            });
            if (isitaFavourite === true) {
                setIsFavourite(true);
            } else {
                setIsFavourite(false);
            }
        }
        setIsPopupVisible(!isPopupVisible);
    };

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
                generation_time: imageQuery.data?.data.asset.generation_time ?? "",
                width: imageQuery.data?.data.asset.width ?? 0,
            };

            setSelectedImage(hit);
            setIsPopupVisible(true);
        }
    }, [
        imageQuery.data?.data.asset.category,
        imageQuery.data?.data.asset.full_command,
        imageQuery.data?.data.asset.height,
        imageQuery.data?.data.asset.prompt,
        params,
    ]);

    return (
        <div className="flex flex-col gap-y-4">
            <ul className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data?.map((item) => (
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
