"use client";
import Endpoints from "@/api/endpoints";
import { useAuthContext } from "@/contexts/authContext";
import React, { useState } from "react";

export default function ResetPassword({ otp }: { otp: string }) {
  const [password, setPassword] = useState("");
  const { resetPassword } = useAuthContext();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        resetPassword({ password: password, otp: otp });
      }}
      className="gap-y-9 flex flex-col items-center"
    >
      <div className="font-museo text-4xl">Reset Password</div>
      <input
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] w-80 md:w-96 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
        placeholder="Enter new password"
      ></input>
      <button
        type="submit"
        className="mb-5 duration-300 hover:text-[var(--opaque-trans-grey)] hover:bg-[var(--pink)] rounded-full px-5 py-[10px] text-base text-[var(--pink)] border-2 border-[var(--pink)] w-80 md:w-96 flex justify-center items-center"
      >
        Submit
      </button>
    </form>
  );
}
