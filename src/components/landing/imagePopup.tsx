/* eslint-disable @next/next/no-img-element */
import { imageEndpoint } from "@/config/endpoints";
import { Hit } from "@/types/searchRes.type";
import { motion } from "framer-motion";
import React from "react";

interface ImagePopupProps {
  closePopup: () => void;
  imageInfo: Hit;
}

export default function ImagePopup({
  closePopup,
  imageInfo,
}: ImagePopupProps): JSX.Element {
  return (
    <>
      <div
        className="fixed top-0 bottom-0 left-0 right-0 z-40"
        style={{ backdropFilter: "blur(1px)" }}
      />

      <motion.div
        onClick={closePopup}
        className="fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="w-[30rem] h-auto bg-[var(--stripe-light)] p-6 flex flex-col z-50"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
        >
          <div className="flex flex-row relative gap-x-4">
            <div className="flex-1 w-1/2">
              <div className="bg-[var(--trans-grey)] flex flex-col gap-y-4">
                <p className="">{imageInfo.prompt}</p>

                <a
                  href={imageEndpoint(imageInfo.id)}
                  className="px-4 py-2 bg-[var(--pink)] text-[var(--stripe)] rounded-full"
                  download
                  target="blank"
                >
                  Download
                </a>
              </div>
            </div>

            <div className="overflow-hidden flex-1 w-1/2">
              <img
                src={imageEndpoint(imageInfo.id)}
                alt={imageInfo.id}
                className="object-contain h-full w-full"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
