import { useAuthContext } from "@/contexts/authContext";
import { motion } from "framer-motion";
import React, { useState } from "react";

export default function ForgotPasswordPopup() {
  const [email, setEmail] = useState("");
  const {forgotPassword} = useAuthContext();
  const [sent, setSent]= useState(false);

  const handleForgot=async (e: React.MouseEvent<HTMLFormElement>)=> {
    e.preventDefault();
    await forgotPassword({email:email});
    setSent(true);

  }
  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      className=" w-full lg:w-1/2 md:w-2/3 md:h-auto h-full bg-[var(--lightish-grey)] rounded boxshadow flex flex-col z-50 items-center justify-center"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
    >
      <form onSubmit={handleForgot} className="w-full h-auto flex flex-col items-center justify-center lg:p-12 p-9 gap-y-9">
        <div className="text-4xl font-museo pt-5">Forgot Password</div>
        <input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] w-80 md:w-96 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
          placeholder="Enter your email address"
        ></input>
        <button
          type="submit"
          className="mb-5 duration-300 hover:text-[var(--opaque-trans-grey)] hover:bg-[var(--pink)] rounded-full px-5 py-[10px] text-base text-[var(--pink)] border-2 border-[var(--pink)] w-80 md:w-96 flex justify-center items-center"
        >
          {sent ? "Sent" :"Send me a password reset link"}
        </button>
      </form>
    </motion.div>
  );
}
