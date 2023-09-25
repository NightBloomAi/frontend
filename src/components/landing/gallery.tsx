/* eslint-disable @next/next/no-img-element */
import { Hit } from "@/types/searchRes.type";
import React, { useState } from "react";
import ImagePopup from "./imagePopup";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { imageEndpointURL } from "@/api/midjourneyApi";
import { useUserFavContext } from "@/contexts/userFavContext";

interface GalleryProps {
  data: Hit[];
  category: string;
  setCategory: (event: SelectChangeEvent<string>) => void;
}

export default function Gallery({
  data,
  category,
  setCategory,
}: GalleryProps): React.JSX.Element {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<Hit>(data[0]);
  const [isFavourite, setIsFavourite] = useState(false);
  const { checkFavourite } = useUserFavContext();

  const togglePopup = (image: Hit) => async () => {
    setIsFavourite(false);
    setSelectedImage(image);
    const isitaFavourite = await checkFavourite({ reference_job_id: image.reference_job_id });
    if (
      isitaFavourite ==
      true
    ) {
        console.log('is a favourite')
      setIsFavourite(true);
    } else {
        console.log('is not a favourite')
      setIsFavourite(false);
    }

    setIsPopupVisible(!isPopupVisible);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleChange = (e: SelectChangeEvent) => {
    setCategory;
  };

  return (
    <div className="flex flex-col gap-y-4">
      {/* Filters bar */}
      <div className="flex flex-row justify-center items-center gap-x-4">
        <div className="flex flex-row justify-between w-full">
          <div></div>
          <div className=" w-36 focus:rounded-full focus-visible:!border-0 h-auto ">
            <FormControl fullWidth size="small">
              <Select
                sx={{
                  "& svg": {
                    fill: "var(--lightest-grey)",
                  },

                  "& .Mui-selected": {
                    backgroundColor: "var(--opaque-trans-grey)",
                    border: "none",
                  },
                  "& .MuiListItem-root.Mui-selected": {
                    backgroundColor: "var(--trans-grey)",
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      backgroundColor: "var(--opaque-trans-grey)",
                      color: "var(--lightest-grey)",
                    },
                  },
                }}
                value={category}
                onChange={setCategory}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                variant="standard"
                className="text-base  bg-[var(--opaque-trans-grey)] rounded-lg !text-[var(--lightest-grey)] focus-visible:!border-0 p-1 px-2 m-0 after:border-0 hover:before:border-0 hover:before:w-0 before:border-0"
              >
                {filter.map((item) => (
                  <MenuItem
                    value={item.name}
                    key={item.displayName}
                    className="text-base focus-visible:!border-0 bg-[var(--opaque-trans-grey)] hover:bg-[var(--trans-grey)] duration-300 focus-visible:bg-[var(--light-grey)] p-2 m-0 bg-cover mt-0 text-[var(--lightest-grey)] scroll-m-0 "
                  >
                    {item.displayName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* <select
                            className="bg-[var(--trans-grey)] rounded-lg p-1"
                            onChange={setCategory}
                            value={category}
                        >
                            {filter.map((item) => (
                                <option
                                    key={item.displayName}
                                    value={item.name}
                                    className="bg-[var(--trans-grey)]"
                                >
                                    {item.displayName}
                                </option>
                            ))}
                        </select> */}
          </div>
        </div>
      </div>

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
        <ImagePopup closePopup={closePopup} imageInfo={selectedImage} isFavourite={isFavourite} setIsFavourite={setIsFavourite}/>
      )}
    </div>
  );
}

type filterType = {
  name: string;
  displayName: string;
};

const filter: filterType[] = [
  {
    name: "",
    displayName: "all",
  },
  {
    name: "2d_illustration",
    displayName: "2d illustration",
  },
  {
    name: "analytic_drawing",
    displayName: "analytic drawing",
  },
  {
    name: "anime_portrait",
    displayName: "anime portrait",
  },
  {
    name: "coloring_book",
    displayName: "coloring book",
  },
  {
    name: "cinematographic",
    displayName: "cinematographic",
  },
  {
    name: "dark_fantasy",
    displayName: "dark fantasy",
  },
  {
    name: "diagrammatic_drawing",
    displayName: "diagrammatic drawing",
  },
  {
    name: "diagrammatic_portrait",
    displayName: "diagrammatic portrait",
  },
  {
    name: "dripping_art",
    displayName: "dripping art",
  },
  {
    name: "double_exposure",
    displayName: "double exposure",
  },
  {
    name: "futuristic",
    displayName: "futuristic",
  },
  {
    name: "graffiti_portrait",
    displayName: "graffiti portrait",
  },
  {
    name: "infographic_drawing",
    displayName: "infographic drawing",
  },
  {
    name: "iridescent",
    displayName: "iridescent",
  },
  {
    name: "isometric_anime",
    displayName: "isometric anime",
  },
  {
    name: "isometric_illustration",
    displayName: "isometric illustration",
  },
  {
    name: "japanese_ink",
    displayName: "japanese ink",
  },
  {
    name: "line_drawing",
    displayName: "line drawing",
  },
  {
    name: "op_art",
    displayName: "op art",
  },
  {
    name: "ornamental_watercolor",
    displayName: "ornamental watercolor",
  },
  {
    name: "paper_cut",
    displayName: "paper cut",
  },
  {
    name: "paper_quilling",
    displayName: "paper quilling",
  },
  {
    name: "pastel_drawing",
    displayName: "pastel drawing",
  },
  {
    name: "patchwork_collage",
    displayName: "patchwork collage",
  },
  {
    name: "pixel_art",
    displayName: "pixel art",
  },
  {
    name: "polaroid_photo",
    displayName: "polaroid photo",
  },
  {
    name: "stained_glass_portrait",
    displayName: "stained glass portrait",
  },
  {
    name: "tattoo_art",
    displayName: "tattoo art",
  },
  {
    name: "typography",
    displayName: "typography",
  },
  {
    name: "ukiyo_e",
    displayName: "ukiyo e",
  },
  {
    name: "watercolor_landscape",
    displayName: "watercolor landscape",
  },
  {
    name: "winter_oil_painting",
    displayName: "winter oil painting",
  },
];
