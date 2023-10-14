import { Google } from "@mui/icons-material";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import Verify from "./verify";
import toast, { Toaster } from "react-hot-toast";
import { STATUS_CODES } from "http";
import { useAuthContext } from "../../contexts/authContext";
import Link from "next/link";
import { JsxElement } from "typescript";
import { registerEndpoint } from "@/api/nightbloomApi";

interface SignProps {
    closePopup: () => void;
}

export default function SignUpPopUp({ closePopup }: SignProps): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verify, setVerify] = useState(false);
    const { setLoginNotSignUp, googleAuth } = useAuthContext();

    const handleSignUp = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        let regobj = { email, password };
        console.log(regobj);

        await registerEndpoint(regobj).then((data) => {
            if (data.error_message === undefined) {
                toast("Registered, please click the link in your email to verify your account and continue to login.", {icon:'✉️', duration: 7000});
                setVerify(true);
                setLoginNotSignUp(true);
            } else {
                toast.error(`${data.error_message}`);
            }
        });
    };

    const handleGoogle = async () => {
        const googleURL = await googleAuth();
        if (googleURL) {
            console.log(googleURL?.url);
            window.open(googleURL?.url, "_blank");
        } else {
            console.log(googleURL, "didnt work")
        }
       

    } 

    return (
        <motion.div
            onClick={(e) => e.stopPropagation()}
            className=" w-full lg:w-1/2 md:w-2/3 md:h-auto h-full bg-[var(--lightish-grey)] rounded boxshadow flex flex-col z-50 items-center justify-center"
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
                    <div className="flex flex-col items-center justify-center gap-y-6 cursor-pointer">
                        <div onClick={handleGoogle} className="rounded-full px-5 py-3 text-base bg-[var(--trans-grey)] hover:bg-[var(--trans-light-grey)] duration-300 w-80 md:w-96 flex justify-center items-center">
                            <Google />
                            <div className="pl-2">Continue With Google</div>
                        </div>
                        <div className="text-base continueline relative">
                            or continue with email
                        </div>
                        <input
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] w-80 md:w-96 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
                            placeholder="Enter an email address"
                        ></input>
                        <input
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-full px-8 py-3 text-base bg-[var(--trans-grey)] w-80 md:w-96 flex justify-start items-center  placeholder:text-[var(--lightest-grey)] text-[var(--pink)] focus:rounded-full"
                            type="password"
                            placeholder="Create a password"
                        ></input>

                        <button
                            type="submit"
                            className="duration-300 hover:text-[var(--opaque-trans-grey)] hover:bg-[var(--pink)] rounded-full px-5 py-[10px] text-base text-[var(--pink)] border-2 border-[var(--pink)] w-80 md:w-96 flex justify-center items-center"
                        >
                            Continue
                        </button>
                        <div className="z-50 text-base w-80 md:w-96  text-center">
                            <span className="opacity-50">
                                By signing up, I agree to the{" "}
                            </span>
                            <Link
                                href={"/terms-of-service"}
                                onClick={() => {
                                    closePopup();
                                }}
                                className="opacity-50 hover:opacity-100 underline underline-offset-2 duration-300"
                            >
                                Terms of Service
                            </Link>
                            <span className="opacity-50"> and </span>
                            <Link
                                href={"/privacy-policy"}
                                onClick={() => {
                                    closePopup();
                                }}
                                className="opacity-50 hover:opacity-100 underline underline-offset-2  duration-300 "
                            >
                                Privacy Policy
                            </Link>
                        </div>

                        <div className="text-base mb-5">
                            <span className="opacity-50">
                                Already have an account?{" "}
                            </span>
                            <span
                                className="cursor-pointer text-[var(--pink)] underline-offset-2 underline opacity-60 hover:opacity-100 hover:-translate-y-2 duration-300"
                                onClick={() => {
                                    setLoginNotSignUp(true);
                                }}
                            >
                                Log in
                            </span>
                        </div>
                    </div>
                </form>
            )}
        </motion.div>
    );
}
