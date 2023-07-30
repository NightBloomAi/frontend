import { Google } from "@mui/icons-material";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import Verify from "./verify";
import toast, { Toaster } from "react-hot-toast";
import { STATUS_CODES } from "http";
import { AuthContext } from "../contexts/authcontext";


export default function SignUpPopUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState(false);
  const {setLoginNotSignUp} = useContext(AuthContext);

  const handleSignUp = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    let regobj = { email, password };
    console.log(regobj);

    fetch("https://nightbloom-search.net/account/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(regobj),
    })
      .then((res) => res.json()) // Parse the response body as JSON
      .then((data) => {
        console.log(data); // Log the parsed JSON data

        if (data.error_message === undefined) {
          toast.success("Registered Successfully");
          setVerify(true);
          setLoginNotSignUp(true);
        } else {
          toast.error(`${data.error_message}`);
        }
      })
      
  };

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      className="w-11/12 lg:w-1/2 md:w-2/3 h-auto bg-[var(--lightish-grey)] rounded boxshadow flex flex-col z-50 items-center justify-center"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
    >
      {verify ? (
        <Verify />
      ) : (
        <form
          onSubmit={handleSignUp}
          className="w-full h-auto flex flex-col items-center justify-center lg:p-12 p-9 gap-y-9"
        >
          <div className="text-4xl font-museo pt-5">Sign Up</div>
          <div className="flex flex-col items-center justify-center gap-y-6">
            <div className="rounded-full px-5 py-3 text-base bg-[var(--trans-grey)] w-96 flex justify-center items-center">
              <Google />
              <div className="pl-2 continueline">Continue With Google</div>
            </div>
            <div className="text-base">or continue with email</div>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] w-96 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
              placeholder="Enter an email address"
            ></input>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] w-96 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
              type="password"
              placeholder="Create a password"
            ></input>
          </div>
          <button
            type="submit"
            className="duration-300 hover:text-[var(--opaque-trans-grey)] hover:bg-[var(--pink)] mb-5 rounded-full px-5 py-[10px] text-base text-[var(--pink)] border-2 border-[var(--pink)] w-96 flex justify-center items-center"
          >
            Continue
          </button>
        </form>
      )}
    </motion.div>
  );
}
