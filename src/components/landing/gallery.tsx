/* eslint-disable @next/next/no-img-element */
import { imageEndpoint } from "@/config/endpoints";
import { Hit } from "@/types/searchRes.type";
import React, { ChangeEvent, useEffect, useState } from "react";
import ImagePopup from "./imagePopup";
import { useDebounce } from "@/hooks/useDebounce";

interface GalleryProps {
  data: Hit[];
  category: string;
  setCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function Gallery({ data, category, setCategory }: GalleryProps): JSX.Element {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Hit>(data[0]);


  const togglePopup = (image: Hit) => () => {
    setSelectedImage(image);
    setIsPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const [selectedCategory, setSelected] = useState('');

  console.log(category)
  return (
    <div className="flex flex-col gap-y-4">
      {/* Filters bar */}
      <div className="flex flex-row justify-center items-center gap-x-4">
        <div className="flex flex-row justify-between w-full">
          <div></div>
          <div>
            <select className="bg-transparent border-2 border-[var(--trans-grey)] rounded-lg p-1" onChange={setCategory} value={category}>
              {filter.map((item) => (
                <option key={item.displayName} value={item.name} className="">
                  {item.displayName}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <ul className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {data.map((item) => (
          <div
            key={item.reference_job_id}
            className="object-cover w-full overflow-hidden cursor-pointer"
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
      {isPopupVisible && (
        <ImagePopup closePopup={closePopup} imageInfo={selectedImage} />
      )}
    </div>
  );
}

type filterType = {
  name: string,
  displayName: string,
}

const filter: filterType[] = [
  {
    name: "",
    displayName: "all"
  },
  {
    name:"2d_illustration",
    displayName:"2d illustration",
  },
  {
    name: "analytic_drawing",
    displayName: "analytic drawing"
  },
  {
    name:"anime_portrait",
    displayName:"anime portrait",
  },
  {
    name:"coloring_book",
    displayName:"coloring book",
  },
  {
    name:"cinematographic",
    displayName:"cinematographic",
  },
  {
    name:"dark_fantasy",
    displayName:"dark fantasy",
  },
  {
    name:"diagrammatic_drawing",
    displayName:"diagrammatic drawing",
  },
  {
    name:"diagrammatic_portrait",
    displayName:"diagrammatic portrait",
  },
  {
    name:"dripping_art",
    displayName:"dripping art",
  },
  {
    name:"double_exposure",
    displayName:"double exposure",
  },
  {
    name:"futuristic",
    displayName:"futuristic",
  },
  {
    name:"graffiti_portrait",
    displayName:"graffiti portrait",
  },
  {
    name:"infographic_drawing",
    displayName: "infographic drawing",
  },
  {
    name:"iridescent",
    displayName:"iridescent",
  },
  {
    name: "isometric_anime",
    displayName: "isometric anime"
  },
  {
    name:"isometric_illustration",
    displayName:"isometric illustration",
  },
  {
    name:"japanese_ink",
    displayName:"japanese ink",
  },
  {
    name:"line_drawing",
    displayName:"line drawing",
  },
  {
    name:"op_art",
    displayName:"op art",
  },
  {
    name:"ornamental_watercolor",
    displayName:"ornamental watercolor",
  },
  {
    name:"paper_cut",
    displayName:"paper cut",
  },
  {
    name:"paper_quilling",
    displayName:"paper quilling",
  },
  {
    name:"pastel_drawing",
    displayName:"pastel drawing",
  },
  {
    name:"patchwork_collage",
    displayName:"patchwork collage",
  },
  {
    name:"pixel_art",
    displayName:"pixel art",
  },
  {
    name:"polaroid_photo",
    displayName:"polaroid photo",
  },
  {
    name:"stained_glass_portrait",
    displayName:"stained glass portrait",
  },
  {
    name:"tattoo_art",
    displayName:"tattoo art",
  },
  {
    name:"typography",
    displayName:"typography",
  },
  {
    name:"ukiyo_e",
    displayName:"ukiyo e",
  },
  {
    name:"watercolor_landscape",
    displayName:"watercolor landscape",
  },
  {
    name:"winter_oil_painting",
    displayName:"winter oil painting",
  },
  ];
