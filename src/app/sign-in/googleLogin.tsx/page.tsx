import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export default function OAuthReturn() {
    const router = useRouter();

    useEffect(()=> {
        const {access_token}= router.query;

        if (access_token) {
            Cookies.set('access_token', access_token as string, {expires: 1})
        }
        router.push('/');
    }, [router.query])


  return null;
}
