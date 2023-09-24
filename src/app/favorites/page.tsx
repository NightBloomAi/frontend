/* eslint-disable @next/next/no-img-element */
"use client";

import { imageEndpointURL } from "@/api/midjourneyApi";
import { userFavouritesEndpoint } from "@/api/nightbloomApi";
import ImagePopup from "@/components/landing/imagePopup";
import LoadingSnackbar from "@/components/misc/loadingSnackbar";
import { useAuthContext } from "@/contexts/authContext";
import { Hit } from "@/types/searchRes.type";
import { useState } from "react";
import { useQuery } from "react-query";

function FavouritesPage() {
    const [selectedImage, setSelectedImage] = useState<Hit | undefined>(
        undefined
    );
    const {
        session,
        signInPopUpVisible,
        setSignInPopUpVisible,
        setLoginNotSignUp,
    } = useAuthContext();

    const { data, isLoading, isError, error } = useQuery(
        "favorites",
        () => userFavouritesEndpoint({ jwt: session?.jwt }),
        {
            enabled: session?.signedIn === true,
            retry: false,
            refetchOnWindowFocus: false,
        }
    );

    const togglePopup = (image: Hit | undefined) => () => {
        setSelectedImage(image);
    };

    /**
     * If the user is not signed in, show a message telling them to sign in
     */
    if (session?.signedIn === false) {
        return (
            <div className="flex flex-col justify-center align-middle w-full h-full">
                <p className="text-center">
                    Please{" "}
                    <span
                        onClick={() => {
                            setSignInPopUpVisible(true);
                            setLoginNotSignUp(true);
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
            <p className="text-center text-xl">Favourites</p>

            <div className="my-4">
                {isLoading && <LoadingSnackbar />}
                {isError && (
                    <p className="mx-auto">Error: {JSON.stringify(error)}</p>
                )}
                {data && (
                    <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {data.assets.map((asset: any) => (
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
                {selectedImage && (
                    <ImagePopup
                        closePopup={togglePopup(undefined)}
                        imageInfo={selectedImage}
                    />
                )}
            </div>
        </div>
    );
}

export default FavouritesPage;
