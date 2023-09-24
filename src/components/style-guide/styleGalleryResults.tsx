/* eslint-disable @next/next/no-img-element */

import { imageEndpointURL } from "@/api/midjourneyApi";
import { Hit } from "@/types/searchRes.type";
import { useState } from "react";
import ImagePopup from "../landing/imagePopup";

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

    const togglePopup = (image: Hit) => () => {
        setSelectedImage(image);
        setIsPopupVisible(!isPopupVisible);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };
    return (
        <div className="flex flex-col gap-y-4">
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
                <ImagePopup closePopup={closePopup} imageInfo={selectedImage} />
            )}
        </div>
    );
}
