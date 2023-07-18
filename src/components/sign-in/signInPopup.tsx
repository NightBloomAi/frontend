import { Google } from "@mui/icons-material";
import { motion } from "framer-motion";
import React from "react";

interface SignInPopupProps {
  closePopup: () => void;
  signUp: boolean;
  login: boolean;
}

export default function SignInPopup({
  closePopup,
  signUp,
  login,
}: SignInPopupProps): JSX.Element {
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
        className="fixed top-0 bottom-0 left-0 right-0 z-50 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {signUp && (
          <motion.form
            onClick={(e) => e.stopPropagation()}
            className="w-11/12 lg:w-1/2 md:w-2/3 h-auto bg-[var(--lightish-grey)] rounded boxshadow lg:p-12 p-9 flex flex-col gap-y-9 z-50 items-center justify-center"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
          >
            <div className="text-4xl font-museo pt-5">Sign Up</div>
            <div className="flex flex-col items-center justify-center gap-y-6">
              <div className="rounded-full px-5 py-3 text-base bg-[var(--trans-grey)] w-96 flex justify-center items-center">
                <Google />
                <div className="pl-2">Continue With Google</div>
              </div>
              <div className="text-base">or continue with email</div>
              <input
                className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] w-96 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
                placeholder="Enter an email address"
              ></input>
              <input
                className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] w-96 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
                placeholder="Create a password"
              ></input>
            </div>
            <button
              type="submit"
              className="duration-300 hover:text-[var(--opaque-trans-grey)] hover:bg-[var(--pink)] mb-5 rounded-full px-5 py-[10px] text-base text-[var(--pink)] border-2 border-[var(--pink)] w-96 flex justify-center items-center"
            >
              Continue
            </button>
          </motion.form>
        )}

        {login && (
          <motion.form
            onClick={(e) => e.stopPropagation()}
            className="w-11/12 lg:w-1/2 md:w-2/3 h-auto bg-[var(--lightish-grey)] rounded boxshadow lg:p-12 p-9 flex flex-col gap-y-9 z-50 items-center justify-center"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
          >
            <div className="text-4xl font-museo pt-5">Log In</div>

            <div className="flex flex-col items-center justify-center gap-y-6">
              <div className="rounded-full px-5 py-3 text-base bg-[var(--trans-grey)] w-96 flex justify-center items-center">
                <Google />
                <div className="pl-2">Sign In With Google</div>
              </div>

              <div className="text-base">or continue with email</div>

              <input
                className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] w-96 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
                placeholder="Email Address"
              ></input>

              <input
                className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] w-96 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
                placeholder="Password"
              ></input>
            </div>

            <button
              type="submit"
              className="duration-300 hover:text-[var(--opaque-trans-grey)] hover:bg-[var(--pink)] mb-5 rounded-full px-5 py-[10px] text-base text-[var(--pink)] border-2 border-[var(--pink)] w-96 flex justify-center items-center"
            >
              Continue
            </button>
          </motion.form>
        )}
      </motion.div>
    </>
  );
}
