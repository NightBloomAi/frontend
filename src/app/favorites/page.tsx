/* eslint-disable @next/next/no-img-element */
"use client";

import { imageEndpointURL } from "@/api/midjourneyApi";
import ImagePopup from "@/components/landing/imagePopup";
import LoadingSnackbar from "@/components/misc/loadingSnackbar";
import { useAuthContext } from "@/contexts/authContext";
import { useUserFavContext } from "@/contexts/userFavContext";
import { Hit } from "@/types/searchRes.type";
import { useState } from "react";

function FavouritesPage() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { favQuery, selectedImage, setSelectedImage } = useUserFavContext();
  const { setSignInPopUpVisible, setLoginNotSignUp } = useAuthContext();
  const [isFavourite, setIsFavourite] = useState(false);
  const { checkFavourite } = useUserFavContext();

  const togglePopup = (image: Hit | undefined) => async () => {
    setIsFavourite(false);
    setSelectedImage(image);
    if (image) {
      console.log(selectedImage);
      const isitaFavourite = await checkFavourite({
        reference_job_id: image.reference_job_id,
      });
      if (isitaFavourite == true) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
    }
    setIsPopupVisible(!isPopupVisible);
  };

  /**
   * If the user is not signed in, show a message telling them to sign in
   */
  if (favQuery?.data?.session && favQuery?.data.session?.signedIn === false) {
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
      <p className="text-center text-4xl md:text-5xl font-museo my-16 md:my-32">
        Favourites
      </p>

      <div className="my-4">
        {favQuery?.isLoading && <LoadingSnackbar />}
        {favQuery?.isError && (
          <p className="mx-auto">Error: {JSON.stringify(favQuery?.error)}</p>
        )}
        {favQuery?.data && (
          <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favQuery?.data.assets.map((asset: any) => (
              <div
                key={asset.reference_job_id}
                className="object-cover w-full overflow-hidden cursor-pointer rounded"
                onClick={togglePopup(asset)}
              >
                <img
                  src={imageEndpointURL({
                    reference_job_id: asset.reference_job_id,
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
