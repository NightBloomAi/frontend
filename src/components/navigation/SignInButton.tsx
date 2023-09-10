/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import UserButton from "./userButton";
import SignInPopup from "../sign-in/signInPopup";
import { motion } from "framer-motion";
import { useAuthContext } from "@/contexts/authContext";

export default function SignInButton() {
    const {
        loggedIn,
        setLoggedIn,
        signInPopUpVisible,
        setSignInPopUpVisible,
        loginNotSignUp,
        setLoginNotSignUp,
    } = useAuthContext();
    const [userMenu, setUserMenu] = useState(false);
    const [signUpOrLoginVisible, setSignUpButtonVisible] = useState(false);
    const [hasMounted, setHasMounted] = useState(false);
    const [signInClicked, setSignInClicked] = useState(false);
    const toggleUserMenu = () => setUserMenu(!userMenu);
    const toggleSignInButton = () => setSignInClicked(!signInClicked);
    const togglePopupVisible = () => setSignInPopUpVisible(!signInPopUpVisible);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    useEffect(() => {
        if (hasMounted) {
            setTimeout(() => {
                setSignUpButtonVisible(!signUpOrLoginVisible);
            }, 300);
        }
    }, [signInClicked]);

    const closePopup = () => {
        setSignInPopUpVisible(false);
    };

    useEffect(() => {
        console.log("rerendered");
    }, [signInPopUpVisible]);

    return (
        <div className="flex-1 flex flex-row justify-end items-center">
            {signInPopUpVisible && (
                <SignInPopup
                    closePopup={closePopup}
                    loginNotSignUp={loginNotSignUp}
                />
            )}
            {loggedIn ? (
                <UserButton
                    toggleUserMenu={toggleUserMenu}
                    userMenu={userMenu}
                    setUserMenu={setUserMenu}
                />
            ) : signUpOrLoginVisible ? (
                <motion.div
                    animate={{ x: 0 }}
                    initial={{ x: 100 }}
                    className="flex items-center justify-center text-[var(--lightest-grey)] text-base"
                >
                    <div
                        onClick={() => {
                            togglePopupVisible();
                            setLoginNotSignUp(false);
                        }}
                        className={`${
                            loginNotSignUp
                                ? "text-[var(--lightest-grey)]"
                                : "text-[var(--pink)]"
                        } hover:text-[var(--pink)] cursor-pointer hover:-translate-y-1 duration-300`}
                    >
                        Sign Up &nbsp;
                    </div>
                    <div>| &nbsp;</div>
                    <div
                        onClick={() => {
                            togglePopupVisible();
                            setLoginNotSignUp(true);
                        }}
                        className={`${
                            loginNotSignUp
                                ? "text-[var(--pink)]"
                                : "text-[var(--lightest-grey)]"
                        } hover:text-[var(--pink)] cursor-pointer hover:-translate-y-1 duration-300`}
                    >
                        Login
                    </div>
                </motion.div>
            ) : (
                <div
                    onClick={toggleSignInButton}
                    className={`${
                        signInClicked
                            ? "opacity-0 duration-300 translate-x-36"
                            : "block duration-300"
                    } cursor-pointer px-3 py-1 border-2 border-[var(--pink)] rounded-full text-[var(--pink)] text-[1rem] hover:text-[var(--grey)] hover:bg-[var(--pink)] duration-300 hover:translate-y-0`}
                >
                    Sign In
                </div>
            )}
        </div>
    );
}