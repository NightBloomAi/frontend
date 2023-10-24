/* eslint-disable @next/next/no-img-element */

import { imageEndpointURL } from "@/api/midjourneyApi";
import { Hit } from "@/types/searchRes.type";
import { useEffect, useState } from "react";
import ImagePopup from "../landing/imagePopup";
import { useUserFavContext } from "@/contexts/userFavContext";
import { useAuthContext } from "@/contexts/authContext";
import { ReadonlyURLSearchParams, useRouter } from "next/navigation";

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
            const selectedImage = data.find(
                (image) => image.reference_job_id === imageId
            );
            if (selectedImage) {
                setSelectedImage(selectedImage);
                setIsPopupVisible(true);
            }
        }
    }, [data, params]);

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
