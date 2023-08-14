import { Google } from "@mui/icons-material";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../contexts/authcontext";
import Link from "next/link";

interface LoginProps {
  closePopup: () => void;
}

export default function LoginPopUp({ closePopup }: LoginProps): JSX.Element {
  const { setUsername } = useContext(AuthContext);
  const { setLoggedIn } = useContext(AuthContext);
  const {setLoginNotSignUp} = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    let regobj = { email, password };
    // setUsername(email);
    console.log(regobj);
    fetch("https://nightbloom-search.net/account/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(regobj),
    }).then((res) => {
      res.json();
      if (res.status === 200) {
        // toast.success("Logged In Successfully");
        // setLoggedIn(true);
        // closePopup();
        console.log(res);

        fetch("https://nightbloom-search.net/account/current_user", {
          method: "GET",
          credentials: "include",
        })
          .then((res) => {
            if (res.status === 500) {
              setLoggedIn(false);
            }
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setUsername(data.email);
            setLoggedIn(true);
            toast.success("Logged In Successfully");
            closePopup();
          })
          .catch((error) => {
            console.error("Error occurred:", error);
          });
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
      className="w-full h-full lg:w-1/2 md:w-2/3 md:h-auto bg-[var(--lightish-grey)] rounded boxshadow flex flex-col md:z-50 items-center justify-center"
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.7, opacity: 0 }}
    >
      <form
        onSubmit={handleLogin}
        className="w-full h-auto flex flex-col items-center justify-center lg:p-12 p-9 gap-y-9"
      >
        <div className="text-4xl font-museo pt-5">Log In</div>

        <div className="flex flex-col items-center justify-center gap-y-6 mb-6">
          <div className="rounded-full px-5 py-3 text-base bg-[var(--trans-grey)] md:w-96 w-80 flex justify-center items-center">
            <Google />
            <div className="pl-2">Sign In With Google</div>
          </div>

          <div className="text-base continueline relative">
            or continue with email
          </div>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] md:w-96 w-80 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
            placeholder="Email Address"
          ></input>

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] md:w-96 w-80 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
            type="password"
            placeholder="Password"
          ></input>

          <button
            type="submit"
            className=" duration-300 hover:text-[var(--opaque-trans-grey)] hover:bg-[var(--pink)] rounded-full px-5 py-[10px] text-base text-[var(--pink)] border-2 border-[var(--pink)] md:w-96 w-80 flex justify-center items-center"
          >
            Continue
          </button>
          <div className="text-base">
            <span className="opacity-50">Don&apos;t have an account?{" "}</span>
            <span className="cursor-pointer text-[var(--pink)] underline-offset-2 underline opacity-60 hover:opacity-100 hover:-translate-y-2 duration-300" onClick={()=>{setLoginNotSignUp(false)}}>Sign up</span>
          </div>
          
        </div>
        
      </form>
    </motion.div>
  );
}
