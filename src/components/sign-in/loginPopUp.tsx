import { Google } from "@mui/icons-material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginPopUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    let regobj = { email, password };
    console.log(regobj);
    fetch("https://nightbloom-search.net/account/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(regobj),
    }).then((res) => {
      res.json();
      if (res.status === 200) {
        toast.success("Logged In Successfully");
      } else {
        toast.error("Please Enter a valid email and password");
      }
    });
  };
  const validate = () => {
    let result = true;
    return result;
  };

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      className="w-11/12 lg:w-1/2 md:w-2/3 h-auto bg-[var(--lightish-grey)] rounded boxshadow flex flex-col z-50 items-center justify-center"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
    >
      <form
        onSubmit={handleLogin}
        className="w-full h-auto flex flex-col items-center justify-center lg:p-12 p-9 gap-y-9"
      >
        <div className="text-4xl font-museo pt-5">Log In</div>

        <div className="flex flex-col items-center justify-center gap-y-6">
          <div className="rounded-full px-5 py-3 text-base bg-[var(--trans-grey)] w-96 flex justify-center items-center">
            <Google />
            <div className="pl-2">Sign In With Google</div>
          </div>

          <div className="text-base">or continue with email</div>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] w-96 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
            placeholder="Email Address"
          ></input>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] w-96 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
            type="password"
            placeholder="Password"
          ></input>
        </div>

        <button
          type="submit"
          className="duration-300 hover:text-[var(--opaque-trans-grey)] hover:bg-[var(--pink)] mb-5 rounded-full px-5 py-[10px] text-base text-[var(--pink)] border-2 border-[var(--pink)] w-96 flex justify-center items-center"
        >
          Continue
        </button>
      </form>
    </motion.div>
  );
}
