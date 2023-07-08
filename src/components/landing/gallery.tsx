/* eslint-disable @next/next/no-img-element */
import { imageEndpoint } from "@/config/endpoints";
import { Hit } from "@/types/searchRes.type";
import React, { useState } from "react";
import ImagePopup from "./imagePopup";

interface GalleryProps {
    data: Hit[];
}

export default function Gallery({ data }: GalleryProps): JSX.Element {
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
            {/* Filters bar */}
            <div className="flex flex-row justify-center items-center gap-x-4">
                <div className="flex flex-row justify-between w-full">
                    <div></div>
                    <div>
                        <select className="bg-transparent border-2 border-[var(--trans-grey)] rounded-lg p-1">
                            {filter.map((item) => (
                                <option key={item} value={item} className="">
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <ul className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="object-cover w-full overflow-hidden cursor-pointer rounded"
                        onClick={togglePopup(item)}
                    >
                        <img
                            src={imageEndpoint(item.id)}
                            alt={item.id}
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

const filter = ["All", "Abstract"];
