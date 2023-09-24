import Link from "next/link";
import React from "react";

export default function Verified() {
    return(
        <main className="container mx-auto px-4 max-w-screen-xl items-center justify-center flex flex-col h-screen">
            <div className="bg-[var(--lightish-grey)] w-2/3 h-auto py-9 rounded flex flex-col items-center justify-center gap-y-6">
                <div className="font-museo text-4xl pt-6">Email Verified</div>
                <div className="w-80 text-center">Thank you for verifying your email! You can now sign into your new account</div>
                <Link href="/" className="mb-6 cursor-pointer duration-300 hover:text-[var(--opaque-trans-grey)] hover:bg-[var(--pink)] rounded-full px-5 py-[10px] text-base text-[var(--pink)] border-2 border-[var(--pink)] md:w-96 w-80 flex justify-center items-center">Continue to NightBloom</Link>
            </div>
        </main>
    )
}