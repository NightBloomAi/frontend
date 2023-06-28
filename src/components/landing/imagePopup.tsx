/* eslint-disable @next/next/no-img-element */
import { imageEndpoint } from "@/config/endpoints";
import { Hit } from "@/types/searchRes.type";
import { motion } from "framer-motion";
import React from "react";
import { CopyIcon, LikeIcon, ExportIcon } from "../assets/icons";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
          className="w-5/6 md:w-4/6 h-auto bg-[var(--lightish-grey)] rounded boxshadow p-12 flex flex-col z-50"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
        >
          <div className="flex flex-row relative gap-x-12 w-full">
            <div className="flex-1 w-1/2">
              <div className="bg-[var(--light-grey)] flex flex-col rounded min-h-[50%] justify-between p-5 gap-y-5">
                <p className=" break-words text-base text-[var(--onDark)]">
                  {imageInfo.prompt}
                </p>
                <div className="flex items-center justify-between">
                  <a
                    href=""
                    className=" hover:-translate-y-[2px] px-4 py-2 border-[var(--pink)] border-2 text-[var(--pink)] rounded-full text-base hover:bg-[var(--pink)] hover:text-[var(--light-grey)] duration-300"
                  >
                    Explore Style
                  </a>
                  <div className="flex items-center justify-center gap-x-4">
                    <a
                      href=""
                      className="group hover:-translate-y-[2px] duration-300"
                    >
                      <CopyIcon className="group-hover:fill-[var(--pink)] duration-300" />
                    </a>
                    <a
                      href=""
                      className="group hover:-translate-y-[2px] duration-300"
                    >
                      <ExportIcon className="group-hover:fill-[var(--pink)] duration-300" />
                    </a>
                    <a
                      href={imageEndpoint(imageInfo.id)}
                      download
                      target="blank"
                    >
                      <FontAwesomeIcon
                        icon={faCircleDown}
                        className="hover:-translate-y-[2px] text-[var(--onDark)] h-5 text-center align-text-bottom hover:text-[var(--pink)] duration-300"
                      />
                    </a>
                    <a
                      href=""
                      className="group hover:-translate-y-[2px] duration-300"
                    >
                      <LikeIcon className=" group-hover:fill-[var(--pink)] duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden flex-1 w-1/2">
              <img
                src={imageEndpoint(imageInfo.id)}
                alt={imageInfo.id}
                className="object-contain h-full w-full rounded"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
