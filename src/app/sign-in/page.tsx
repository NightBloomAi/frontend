"use client";
import { AuthContext } from "@/components/contexts/authcontext";
import LoginPopUp from "@/components/sign-in/loginPopUp";
import SignUpPopUp from "@/components/sign-in/signUpPopUp";
import Verify from "@/components/sign-in/verify";
import { Google } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useMediaQuery from "@/hooks/useMediaQuery";

import { useRouter } from 'next/navigation'

export default function SignInPage() {
    
  const { loginNotSignUp } = useContext(AuthContext);
  const router = useRouter()
  const isTablet = useMediaQuery('(max-width: 768px)')

    console.log(isTablet);

  useEffect(()=>{
    if (!isTablet) {
        router.push('/')
    }

  }, [isTablet, router])

  

  function closePopup(): void {}

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0">
      {loginNotSignUp ? (
        <LoginPopUp closePopup={closePopup} />
      ) : (
        <SignUpPopUp />
      )}
    </div>
  );
}
