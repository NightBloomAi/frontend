/* eslint-disable @next/next/no-img-element */
import { imageEndpoint } from "@/config/endpoints";
import { Hit } from "@/types/searchRes.type";
import React from "react";

interface GalleryProps {
  data: Hit[];
}

export default function Gallery({ data }: GalleryProps): JSX.Element {
  return (
    <ul className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          className="object-cover h-full w-full overflow-hidden cursor-pointer rounded-lg"
        >
          <img
            src={imageEndpoint(item.id)}
            alt={item.id}
            className="object-cover h-full w-full duration-500 hover:scale-110"
          />
        </div>
      ))}
    </ul>
  );
}
