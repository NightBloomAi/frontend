/* eslint-disable @next/next/no-img-element */

import { imageEndpointURL } from "@/api/midjourneyApi";
import { Hit } from "@/types/searchRes.type";
import { useState } from "react";
import ImagePopup from "../landing/imagePopup";
import { useUserFavContext } from "@/contexts/userFavContext";
import { useAuthContext } from "@/contexts/authContext";

interface GalleryProps {
  data: Hit[];
  category: string;
}

export default function StyleGalleryResults({
  data,
  category,
}: GalleryProps): React.JSX.Element {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Hit>(data[0]);
  const [isFavourite, setIsFavourite] = useState(false);
  const { checkFavourite } = useUserFavContext();
  const { session } = useAuthContext();

  const togglePopup = (image: Hit) => async () => {
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
    setIsPopupVisible(false);
  };
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
