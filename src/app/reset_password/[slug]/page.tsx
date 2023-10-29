import ResetPassword from "@/components/sign-in/resetPassword";
import React from "react";

export default function ResetPasswordPage({
  params,
}: {
  params: { slug: string };
}) {
  const otp = params.slug;

  

  return (
    <main className="container mx-auto px-4 max-w-screen-xl flex flex-col justify-center items-center md:h-[calc(100vh-4rem)] h-screen">
      <ResetPassword otp={otp}/>
    </main>
  );
}
