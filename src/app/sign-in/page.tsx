"use client";
import { useAuthContext } from "@/contexts/authContext";
import LoginPopUp from "@/components/sign-in/loginPopUp";
import SignUpPopUp from "@/components/sign-in/signUpPopUp";
import React, { useEffect } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";

import { useRouter } from "next/navigation";

export default function SignInPage() {
    const { loginNotSignUp } = useAuthContext();
    const router = useRouter();
    const isTablet = useMediaQuery("(max-width: 768px)");

    console.log(isTablet);

    useEffect(() => {
        if (!isTablet) {
            router.push("/");
        }
    }, [isTablet, router]);

    function closePopup(): void {}

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0">
            {loginNotSignUp ? (
                <LoginPopUp closePopup={closePopup} />
            ) : (
                <SignUpPopUp closePopup={closePopup} />
            )}
        </div>
    );
}
