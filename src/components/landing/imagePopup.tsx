/* eslint-disable @next/next/no-img-element */
import { imageEndpoint } from "@/config/endpoints";
import { Hit } from "@/types/searchRes.type";
import { motion } from "framer-motion";
import React from "react";
import { CopyIcon, LikeIcon, ExportIcon } from "../assets/icons";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface ImagePopupProps {
  closePopup: () => void;
  imageInfo: Hit;
}

export default function ImagePopup({
  closePopup,
  imageInfo,
}: ImagePopupProps): JSX.Element {
  const [copied, setCopied] = React.useState(false);
  const onCopy = React.useCallback(() => {
    setCopied(true);
  }, []);

  return (
    <>
      <div
        className="fixed top-0 bottom-0 left-0 right-0 z-40"
        style={{ backdropFilter: "blur(1px)" }}
      />

      <motion.div
        onClick={() => {
          closePopup();
          setCopied(false);
        }}
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
                <p className=" break-words md:text-base text-[var(--onDark)] text-sm">
                  {imageInfo.prompt}
                </p>
                <div className="flex items-center justify-between">
                  <a
                    href=""
                    className=" hover:-translate-y-[2px] lg:px-4 px-3 text-center py-2 border-[var(--pink)] border-2 text-[var(--pink)] rounded-full lg:text-base hover:bg-[var(--pink)] hover:text-[var(--light-grey)] duration-300 text-xs"
                  >
                    Explore Style
                  </a>
                  <div className="flex items-center justify-center lg:gap-x-4 gap-x-2">
                    <CopyToClipboard onCopy={onCopy} text={imageInfo.prompt}>
                      <motion.a
                        className={`group cursor-pointer relative hover:before:block before:hidden before:text-center before:text-[var(--light-grey)] before:text-[0.5rem] before:rounded-sm before:bg-[var(--pink)] before:absolute before:bottom-full before:left-[calc(50%-2rem)] before:mb-2 before:w-16 before:px-1 ${
                          copied
                            ? 'before:content-["copied!"]'
                            : 'before:content-["copy_prompt?"]'
                        } after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:-mb-[0.2rem] after:border-t-[var(--pink)] after:border-transparent hover:after:block after:hidden`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <CopyIcon
                          className={` ${
                            copied ? "fill-[var(--pink)]" : "fill-[--onDark]"
                          }`}
                        />
                      </motion.a>
                    </CopyToClipboard>
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

            <div className="overflow-hidden flex-1 w-1/2 max-h-[30rem]">
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
