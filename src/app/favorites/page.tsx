/* eslint-disable @next/next/no-img-element */
"use client";

import Endpoints from "@/api/endpoints";
import { imageEndpointURL } from "@/api/midjourneyApi";
import ImagePopup from "@/components/landing/imagePopup";
import LoadingSnackbar from "@/components/misc/loadingSnackbar";
import { useAuthContext } from "@/contexts/authContext";
import { useUserFavContext } from "@/contexts/userFavContext";
import { FavImageDetail, Hit, ImageDetail } from "@/types/searchRes.type";
import { AxiosResponse } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

function FavouritesPage() {
    const router = useRouter();
    const params = useSearchParams();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { selectedImage, setSelectedImage } = useUserFavContext();
    const { session, setSignInPopUpVisible, setPopupContent } =
        useAuthContext();
    const [isFavourite, setIsFavourite] = useState(false);
    const { checkFavourite } = useUserFavContext();

    const favQuery = useQuery({
        queryKey: ["favourites"],
        queryFn: () => Endpoints.userFavourites({ jwt: session?.jwt }),
        enabled: session?.signedIn === true, // Only run if the user is signed in
    });

    const imageQuery = useQuery({
        queryKey: [
            "imageDetails",
            params.get("imageId") ?? selectedImage?.reference_job_id,
        ],
        queryFn: async () => {
            const res = await Endpoints.imageDetails({
                asset_id:
                    params.get("imageId") ??
                    selectedImage?.reference_job_id ??
                    "",
            });
            return res as AxiosResponse<ImageDetail>;
        },
        enabled: isPopupVisible,
    });

    const sortedFavourites = (favQuery: FavImageDetail[]) => {
      return favQuery.sort(function (a:FavImageDetail, b:FavImageDetail) {
        return a.favourited_at_unix - b.favourited_at_unix;
      })
    }

    const compareTimes = (a:FavImageDetail, b:FavImageDetail) => {
      return b.favourited_at_unix - a.favourited_at_unix;
    }

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

        router.replace(`/favorites/?${queryString}`);
    };

    const togglePopup = (image: Hit | undefined) => async () => {
        setIsFavourite(false);
        setSelectedImage(image);
        if (image) {
            handleSetQueryParams(image.reference_job_id);
            const isitaFavourite = await checkFavourite({
                reference_job_id: image.reference_job_id,
            });
            if (isitaFavourite == true) {
                setIsFavourite(true);
            } else {
                setIsFavourite(false);
            }
        } else {
            handleSetQueryParams("");
        }
        setIsPopupVisible(!isPopupVisible);
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
        setSelectedImage,
    ]);

    /**
     * If the user is not signed in, show a message telling them to sign in
     */
    if (!session?.signedIn) {
        return (
            <div className="flex flex-col justify-center align-middle w-full h-[calc(100vh-4rem)] items-center">
                <p className="text-center">
                    Please{" "}
                    <span
                        onClick={() => {
                            setSignInPopUpVisible(true);
                            setPopupContent("login");
                        }}
                        className={`m-2 cursor-pointer text-[var(--pink)] duration-300 hover:-translate-y-1 after:absolute hover:after:w-[2.65rem] after:w-0 after:duration-300 after:h-[0.15rem] after:bg-[var(--pink)] relative after:rounded-full after:left-0 after:-bottom-1`}
                    >
                        Login
                    </span>{" "}
                    to view your favorites
                </p>
            </div>
        );
    }

    /**
     * If the user is signed in, show their favorites
     */
    return (
        <div className="flex flex-col justify-center w-full">
            <p className="text-center text-4xl md:text-5xl font-museo my-16 md:my-32">
                Favourites
            </p>

            <div className="my-4">
                {favQuery?.isLoading && <LoadingSnackbar />}
                {favQuery?.isError && (
                    <p className="mx-auto">
                        Error: {JSON.stringify(favQuery?.error)}
                    </p>
                )}
                {favQuery?.data && (
                    <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {favQuery?.data.assets.sort(compareTimes).map((asset: any) => (
                            <div
                                key={asset.reference_job_id}
                                className="object-cover w-full overflow-hidden cursor-pointer rounded"
                                onClick={togglePopup(asset)}
                            >
                                <img
                                    src={imageEndpointURL({
                                        reference_job_id:
                                            asset.reference_job_id,
                                    })}
                                    alt={asset.reference_job_id}
                                    className="object-cover h-full w-full duration-500 hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                )}
                {selectedImage && isPopupVisible && (
                    <ImagePopup
                        closePopup={togglePopup(undefined)}
                        imageInfo={selectedImage}
                        isFavourite={isFavourite}
                        setIsFavourite={setIsFavourite}
                    />
                )}
            </div>
        </div>
    );
}

export default FavouritesPage;
