/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import { API_CLIENT } from "@/services/ApiClient";

type Props = {
    reference_job_id?: string;
    onClick?: () => void;
    fullImagePath?: string;
    variant?: string;
    infiniteScroll?: boolean; // If true, variant is ignored
    blur?: boolean; // If true, image is blurred
    zoomOnHover?: boolean; // If true, image is zoomed on hover
    fullImage?: boolean; // If true, full image is shown
};

const ImageComponent: React.FC<Props> = ({
    reference_job_id,
    onClick,
    fullImagePath,
    variant = "0_0",
    infiniteScroll = false,
    blur = false,
    zoomOnHover = true,
    fullImage = false,
}) => {
    const [hasLoaded, setHasLoaded] = useState(false);

    // Image URL
    const imageUrl = fullImagePath
        ? fullImagePath
        : API_CLIENT.imageEndpointURL({
              reference_job_id: reference_job_id ?? "",
              variant: variant,
              infiniteScroll: infiniteScroll,
          });

    useEffect(() => {
        const image = new Image();
        image.src = imageUrl;

        const handleLoad = () => {
            setHasLoaded(true);
        };

        const handleError = () => {};

        image.onload = handleLoad;
        image.onerror = handleError;

        // Cleanup
        return () => {
            image.onload = null;
            image.onerror = null;
        };
    }, [imageUrl]);

    return (
        <div
            className={`object-cover ${
                !fullImage ? " w-full max-h-96 aspect-square" : "h-auto w-auto"
            } overflow-hidden ${onClick ? "cursor-pointer" : ""} rounded`}
            onClick={onClick}
        >
            {!hasLoaded && (
                <Skeleton
                    sx={{
                        width: "100%",
                        height: "100%",
                    }}
                    variant="rectangular"
                />
            )}
            <img
                className={`${zoomOnHover ? "hover:scale-110" : ""} ${
                    fullImage
                        ? "h-auto max-h-[60vh] object-contain"
                        : "h-full object-cover"
                } w-full duration-500 ${hasLoaded ? "block" : "hidden"} ${
                    blur && !infiniteScroll ? "filter brightness-[0.30]" : ""
                }`}
                src={imageUrl}
                alt={reference_job_id}
                onLoad={() => setHasLoaded(true)}
                loading={"eager"}
            />
        </div>
    );
};

export default ImageComponent;
