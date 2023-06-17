/* eslint-disable @next/next/no-img-element */
import { imageEndpoint } from "@/config/globals";
import { SearchResItem } from "@/types/searchRes.type";
import React, { useState } from "react";

const filterTypes = [
  {
    name: "Hot",
    icon: "",
  },
  {
    name: "New",
    icon: "",
  },
  {
    name: "Top",
    icon: "",
  },
];

interface LoadingImageProps {
  src: string;
  alt: string;
}

function LoadingImage({ src, alt }: LoadingImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && (
        <div className="ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 absolute animate-spin"></div>
      )}

      <img
        className={`object-cover h-full transition-opacity duration-500 ${
          !isLoaded ? "opacity-0" : "opacity-100"
        }`}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
}

export default function ImageGallery({ items }: any) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-x-2">
          {filterTypes.map((item) => (
            <div
              key={item.name}
              className="border-[1px] border-[var(--trans-light-grey)] px-4 md:px-8 py-1 rounded-lg"
            >
              {item.name}
            </div>
          ))}
        </div>

        <div>
          <div className="border-[1px] border-[var(--trans-light-grey)] px-4 md:px-8 py-1 rounded-lg">
            Filter
          </div>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {items.map((item: SearchResItem) => (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center rounded-md overflow-hidden shadow-lg relative"
          >
            <LoadingImage src={imageEndpoint(item.id)} alt={item.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
