/* eslint-disable @next/next/no-img-element */
import {
    alternateImagesURL,
    gridImageURL,
    imageEndpointURL,
} from "@/api/midjourneyApi";
import { Hit } from "@/types/searchRes.type";
import { motion } from "framer-motion";
import React from "react";
import { useState } from "react";
import {
    CopyIcon,
    LikeIcon,
    ExportIcon,
    FingerprintIcon,
} from "../assets/icons";
import { faCircleDown } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useUserFavContext } from "@/contexts/userFavContext";
import { useMutation, useQueryClient } from "react-query";

interface ImagePopupProps {
    closePopup: () => void;
    imageInfo: Hit;
    isFavourite: boolean;
    setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImagePopup({
    closePopup,
    imageInfo,
    isFavourite,
    setIsFavourite,
}: ImagePopupProps): JSX.Element {
    const [copied, setCopied] = useState(false);
    const onCopy = React.useCallback(() => {
        setCopied(true);
    }, []);
    const [showMore, setShowMore] = useState(false);
    const [whichImage, setWhichImage] = useState(0);
    const {createFavourite, checkFavourite} = useUserFavContext();
    

    const queryClient = useQueryClient();

    const handleFavourite = () => {
        createFavourite({imageIDs:[imageInfo.reference_job_id]});
        queryClient.invalidateQueries({queryKey:['favourites']});
        if (checkFavourite({reference_job_id:imageInfo.reference_job_id}) == true) {
            setIsFavourite(true)
        } else {
            setIsFavourite(false)
        }


    }



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

                        <div className="flex-1 sm:w-7/12 w-11/12 sm:mb-0 mb-5">
                            <div className="bg-[var(--light-grey)] flex flex-col rounded min-h-[50%] justify-between p-5 gap-y-5 order-1">
                                <p className=" break-words md:text-base text-[var(--onDark)] text-sm">
                                    {showMore
                                        ? imageInfo.prompt
                                        : `${imageInfo.prompt.substring(
                                              0,
                                              300
                                          )}`}
                                    <br />
                                    <button
                                        className={`text-[var(--pink)] ${
                                            imageInfo.prompt.length > 300
                                                ? "block"
                                                : "hidden"
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
                                        <CopyToClipboard
                                            onCopy={onCopy}
                                            text={imageInfo.prompt}
                                        >
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
                                                        copied
                                                            ? "fill-[var(--pink)]"
                                                            : "fill-[--onDark]"
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
                                            href={imageEndpointURL({
                                                reference_job_id:
                                                    imageInfo.reference_job_id,
                                            })}
                                            download
                                            target="blank"
                                        >
                                            <FontAwesomeIcon
                                                icon={faCircleDown}
                                                className="h-4 hover:-translate-y-[2px] text-[var(--onDark)] sm:h-5 text-center align-text-bottom hover:text-[var(--pink)] duration-300"
                                            />
                                        </a>
                                        <div
                                            className="group hover:-translate-y-[2px] duration-300"
                                            onClick={handleFavourite}
                                        >
                                            <LikeIcon className={`h-[0.9rem] group-hover:fill-[var(--pink)] duration-300 ${isFavourite? 'fill-[var(--pink)]':'fill-[var(--onDark)]'}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-base text-[var(--onDark)] pt-9 pb-3">
                                Image Details
                            </div>
                            <div className="flex flex-row w-1/2 justify-between items-start">
                                <a
                                    href={gridImageURL({
                                        reference_job_id:
                                            imageInfo.reference_job_id,
                                    })}
                                    download
                                    target="blank"
                                    className="border-[var(--light-grey)] border-2 rounded-md h-40 w-40 flex flex-col items-center justify-center"
                                >
                                    <div className="text-[var(--onDark)] text-sm pb-1 flex flex-row items-center justify-center gap-x-[0.1rem]">
                                        <FingerprintIcon className="h-3" />
                                        <p>Parent Image</p>
                                    </div>
                                    <img
                                        src={gridImageURL({
                                            reference_job_id:
                                                imageInfo.reference_job_id,
                                        })}
                                        alt={imageInfo.reference_job_id}
                                        className="object-contain h-28 rounded pb-1 px-1"
                                    />
                                </a>

                                <div className="flex flex-col"></div>
                            </div>
                        </div>

                        <div className="overflow-hidden sm:w-5/12 sm:order-2 -order-1 w-11/12 flex flex-col items-center justify-center gap-y-5">
                            <img
                                src={alternateImagesURL({
                                    reference_job_id:
                                        imageInfo.reference_job_id,
                                    ref: whichImage,
                                })}
                                alt={imageInfo.reference_job_id}
                                className="object-contain w-full rounded sm:max-h-[35rem]"
                            />
                            <div className="flex flex-row gap-x-2 w-1/2 items-center justify-center">
                                {alternatenumbers.map((item: alternateType) => {
                                    return (
                                        <img
                                            key={item.name}
                                            src={alternateImagesURL({
                                                reference_job_id:
                                                    imageInfo.reference_job_id,
                                                ref: item.number,
                                            })}
                                            onClick={() =>
                                                setWhichImage(item.number)
                                            }
                                            alt={imageInfo.reference_job_id}
                                            className={`${
                                                whichImage == item.number
                                                    ? "opacity-100"
                                                    : "opacity-30"
                                            } object-contain h-auto w-1/4 rounded cursor-pointer`}
                                        />
                                    );
                                })}
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

type detailsType = {
    name: string;
    iconSRC: string;
    text: string;
};

const imageDetails: detailsType[] = [
    {
        name: "",
        iconSRC: "",
        text: "",
    },
    {
        name: "",
        iconSRC: "",
        text: "",
    },
    {
        name: "",
        iconSRC: "",
        text: "",
    },
    {
        name: "",
        iconSRC: "",
        text: "",
    },
];
