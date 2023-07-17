import { motion } from "framer-motion";
import React from "react";

interface SignInPopupProps {
  closePopup: () => void;
}

export default function SignInPopup({
  closePopup,
}: SignInPopupProps): JSX.Element {
  return (
    <>
      <div
        className="fixed top-0 bottom-0 left-0 right-0 z-40"
        style={{ backdropFilter: "blur(1px)" }}
      />
      <motion.div
        onClick={() => {
          closePopup();
        }}
        className="fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className="w-11/12 lg:w-4/6 md:w-5/6 h-auto bg-[var(--lightish-grey)] rounded boxshadow lg:p-12 p-9 flex flex-col z-50 sm:max-h-[85%]"
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.7, opacity: 0 }}
                >

                </motion.div>
      </motion.div>
    </>
  );
}
