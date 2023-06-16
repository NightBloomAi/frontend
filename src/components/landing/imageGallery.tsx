/* eslint-disable @next/next/no-img-element */
import { imageEndpoint } from "@/config/globals";
import { SearchResItem } from "@/types/searchRes.type";
import React, { useState } from "react";

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
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      {items.map((item: SearchResItem) => (
        <div
          key={item.id}
          className="flex flex-col justify-center items-center rounded-md overflow-hidden shadow-lg relative"
        >
          <LoadingImage src={imageEndpoint(item.id)} alt={item.id} />
        </div>
      ))}
    </div>
  );
}
