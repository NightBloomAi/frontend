import { Google } from "@mui/icons-material";
import { motion } from "framer-motion";
import React from "react";
import SignUpPopUp from "./signUpPopUp";
import LoginPopUp from "./loginPopUp";
import Link from "next/link";

interface SignInPopupProps {
    closePopup: () => void;
    loginNotSignUp: boolean;
}

export default function SignInPopup({
    closePopup,
    loginNotSignUp,
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
                className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {loginNotSignUp ? (
                    <LoginPopUp closePopup={closePopup} />
                ) : (
                    <SignUpPopUp closePopup={closePopup} />
                )}
            </motion.div>
        </>
    );
}
