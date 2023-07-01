/* eslint-disable @next/next/no-img-element */
import { alternateImages, imageEndpoint } from "@/config/endpoints";
import { Hit } from "@/types/searchRes.type";
import { motion } from "framer-motion";
import React from "react";
import { useState } from "react";
import { CopyIcon, LikeIcon, ExportIcon } from "../assets/icons";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

interface ImagePopupProps {
  closePopup: () => void;
  imageInfo: Hit;
}

export default function ImagePopup({
  closePopup,
  imageInfo,
}: ImagePopupProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const onCopy = React.useCallback(() => {
    setCopied(true);
  }, []);
  const [showMore, setShowMore] = useState(false);
  const [whichImage, setWhichImage] = useState(0);

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
          className="sm:w-11/12 w-full lg:w-4/6 md:w-5/6 sm:h-auto h-full bg-[var(--lightish-grey)] rounded boxshadow lg:p-12 p-9 flex flex-col z-50 sm:max-h-[85%] overflow-y-scroll"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
        >
          <div className="flex sm:flex-row flex-col relative lg:gap-x-12 sm:gap-x-9 w-full items-center justify-center sm:items-start sm:gap-y-0 gap-y-9">
            <a
              className="sm:hidden block -order-2 self-start pl-2 -my-4"
              onClick={() => {
                closePopup();
                setCopied(false);
              }}
            >
              <ChevronLeftIcon />
            </a>

            <div className="flex-1 sm:w-1/2 w-11/12 sm:mb-0 mb-5">
              <div className="bg-[var(--light-grey)] flex flex-col rounded min-h-[50%] justify-between p-5 gap-y-5 order-1">
                <p className=" break-words md:text-base text-[var(--onDark)] text-sm">
                  {showMore
                    ? imageInfo.prompt
                    : `${imageInfo.prompt.substring(0, 300)}`}
                  <br />
                  <button
                    className={`text-[var(--pink)] ${
                      imageInfo.prompt.length > 300 ? "block" : "hidden"
                    }`}
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </button>
                </p>
                <div className="flex items-center justify-between">
                  <a
                    href=""
                    className=" hover:-translate-y-[2px] xl:px-4 lg:px-3 md:px-2 px-1 text-center lg:py-2 py-1 border-[var(--pink)] border-2 text-[var(--pink)] rounded-full md:text-base hover:bg-[var(--pink)] hover:text-[var(--light-grey)] duration-300 text-xs"
                  >
                    Explore Style
                  </a>
                  <div className="flex items-center justify-center xl:gap-x-4 gap-x-2">
                    <CopyToClipboard onCopy={onCopy} text={imageInfo.prompt}>
                      <motion.a
                        className={`group cursor-pointer relative hover:before:block before:hidden before:text-center before:text-[var(--light-grey)] before:text-[0.5rem] before:rounded-sm before:absolute before:bottom-full before:left-[calc(50%-2rem)] before:mb-2 before:w-16 before:px-1 ${
                          copied
                            ? 'before:content-["copied!"] before:bg-[var(--pink)] after:border-t-[var(--pink)]'
                            : 'before:content-["copy_prompt?"] before:bg-[var(--onDark)] after:border-t-[var(--onDark)]'
                        } after:absolute after:bottom-full after:left-1/2 after:-translate-x-1/2 after:border-[6px] after:-mb-[0.15rem] after:border-transparent hover:after:block after:hidden`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          duration: 0.1,
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        <CopyIcon
                          className={`h-[0.9rem] ${
                            copied ? "fill-[var(--pink)]" : "fill-[--onDark]"
                          }`}
                        />
                      </motion.a>
                    </CopyToClipboard>
                    <a
                      href=""
                      className="group hover:-translate-y-[2px] duration-300"
                    >
                      <ExportIcon className="h-[0.9rem] group-hover:fill-[var(--pink)] duration-300" />
                    </a>
                    <a
                      href={imageEndpoint(imageInfo.id)}
                      download
                      target="blank"
                    >
                      <FontAwesomeIcon
                        icon={faCircleDown}
                        className="h-4 hover:-translate-y-[2px] text-[var(--onDark)] sm:h-5 text-center align-text-bottom hover:text-[var(--pink)] duration-300"
                      />
                    </a>
                    <a
                      href=""
                      className="group hover:-translate-y-[2px] duration-300"
                    >
                      <LikeIcon className="h-[0.9rem] group-hover:fill-[var(--pink)] duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-hidden sm:flex-1 sm:w-1/2 sm:max-h-[40rem] sm:order-2 -order-1 w-11/12 flex flex-col items-center justify-center max-h-[35rem] gap-y-5">
              <img
                src={alternateImages(imageInfo.id, whichImage)}
                alt={imageInfo.id}
                className="object-contain w-5/6 rounded"
              />
              <div className="flex flex-row gap-x-2 w-1/2 items-center justify-center">
                {alternatenumbers.map((item: alternateType) => {
                  return (
                    <img
                      key={item.name}
                      src={alternateImages(imageInfo.id, item.number)}
                      onClick={() => setWhichImage(item.number)}
                      alt={imageInfo.id}
                      className="object-contain h-auto w-1/4 rounded cursor-pointer"
                    />
                  );
                })}

                {/* <img
                  src={alternateImages(imageInfo.id, 0)}
                  onClick={() => setWhichImage(0)}
                  alt={imageInfo.id}
                  className="object-contain h-auto w-1/4 rounded cursor-pointer"
                />
                <img
                  src={alternateImages(imageInfo.id, 1)}
                  onClick={() => setWhichImage(1)}
                  alt={imageInfo.id}
                  className="object-contain h-auto w-1/4 rounded cursor-pointer"
                />
                <img
                  src={alternateImages(imageInfo.id, 2)}
                  onClick={() => setWhichImage(2)}
                  alt={imageInfo.id}
                  className="object-contain h-auto w-1/4 rounded cursor-pointer"
                />
                <img
                  src={alternateImages(imageInfo.id, 3)}
                  onClick={() => setWhichImage(3)}
                  alt={imageInfo.id}
                  className="object-contain h-auto w-1/4 rounded cursor-pointer"
                /> */}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

type alternateType = {
  name: string;
  number: number;
};

const alternatenumbers: alternateType[] = [
  {
    name: "0",
    number: 0,
  },
  {
    name: "1",
    number: 1,
  },
  {
    name: "2",
    number: 2,
  },
  {
    name: "3",
    number: 3,
  },
];
