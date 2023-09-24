"use client";
import { userFavouritesEndpoint } from "@/api/nightbloomApi";
import ImagePopup from "@/components/landing/imagePopup";
import { useAuthContext } from "@/contexts/authContext";
import { useFavouritesContext } from "@/contexts/favouritesContext";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { IUserFavourites } from "@/types/fav.type";
import { imageEndpoint } from "@/config/endpoints";

export default function FavouritesPage() {
    const {
        session,
        signInPopUpVisible,
        setSignInPopUpVisible,
        setLoginNotSignUp,
    } = useAuthContext();

   const {favouritesList} = useFavouritesContext();
   const [isPopupVisible, setIsPopupVisible] = useState(false);
   const [selectedImage, setSelectedImage] = useState<IUserFavourites>();

   const togglePopup = (image: IUserFavourites) => () => {
       setSelectedImage(image);
       setIsPopupVisible(!isPopupVisible);
   };

   const closePopup = () => {
       setIsPopupVisible(false);
   };

    

    return (
        <main className="container mx-auto px-4 max-w-screen-xl">
            {session?.signedIn ? (
                <div>favorites
                    <ul className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {favouritesList?.map((item) => (
                    <div
                        key={item.reference_job_id}
                        className="object-cover w-full overflow-hidden cursor-pointer rounded"
                        onClick={togglePopup(item)}
                    >
                        <img
                            src={imageEndpoint(item.reference_job_id)}
                            alt={item.reference_job_id}
                            className="object-cover h-full w-full duration-500 hover:scale-110"
                        />
                    </div>
                ))}
            </ul>
            {/* {isPopupVisible && (
                <ImagePopup closePopup={closePopup} imageInfo={selectedImage} />
            )} */}
                </div>
                
            ) : (
                <div className="flex h-screen w-full items-center justify-center text-center text-base">
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
                </div>
            )}
        </main>
    );
}
