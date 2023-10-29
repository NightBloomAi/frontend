import { Google } from "@mui/icons-material";
import { motion } from "framer-motion";
import React from "react";
import SignUpPopUp from "./signUpPopUp";
import LoginPopUp from "./loginPopUp";
import Link from "next/link";
import { useAuthContext } from "@/contexts/authContext";
import ForgotPasswordPopup from "./forgotPasswordPopup";

interface SignInPopupProps {
    closePopup: () => void;
   
}

export default function SignInPopup({
    closePopup,
   
}: SignInPopupProps): JSX.Element {
    const {popupContent}= useAuthContext();

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

                {popupContent=== "login" &&  <LoginPopUp closePopup={closePopup} />};
                {popupContent==="register" && <SignUpPopUp closePopup={closePopup} />}
                {popupContent==="forgot" && <ForgotPasswordPopup/>}
            </motion.div>
        </>
    );
}
