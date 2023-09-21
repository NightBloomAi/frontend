import Link from "next/link";
import React from "react";

export default function Verified() {
    return(
        <main className="container mx-auto px-4 max-w-screen-xl items-center justify-center flex flex-col h-screen">
            <div className="bg-[var(--lightish-grey)] md:w-2/3 sm:w-10/12 w-11/12 h-auto rounded flex flex-col items-center justify-center gap-y-6">
                <div className="font-museo sm:text-4xl text-3xl pt-9">Email Verified</div>
                <div className="sm:w-80 w-60 text-center">Thank you for verifying your email! You can now sign into your new account</div>
                <Link href="/" className="mb-9 cursor-pointer duration-300 hover:text-[var(--opaque-trans-grey)] hover:bg-[var(--pink)] rounded-full px-5 py-[10px] text-base text-[var(--pink)] border-2 border-[var(--pink)] sm:w-80 w-60 flex justify-center items-center">Continue to NightBloom</Link>
            </div>
        </main>
    )
}