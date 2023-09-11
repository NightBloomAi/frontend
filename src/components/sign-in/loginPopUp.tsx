import { Google } from "@mui/icons-material";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../../contexts/authContext";
import { useMutation, useQueryClient } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { currentUserEndpoint, loginEndpoint } from "@/api/nightbloomApi";
import { useStageContext } from "@/contexts/stageContext";
import { ICurrentUserResponse, ILoginResponse } from "@/types/auth.type";
import { Snackbar } from "@mui/base";
import Cookies from "js-cookie";
import LoadingSnackbar from "../misc/loadingSnackbar";

interface LoginProps {
    closePopup: () => void;
}

interface InputProps {
    email: string;
    password: string;
}

export default function LoginPopUp({ closePopup }: LoginProps): JSX.Element {
    const queryClient = useQueryClient();
    const { isDevMode } = useStageContext();
    const { setLoginNotSignUp, session, setSession } = useAuthContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const mutation = useMutation(
        (props: InputProps) => {
            return loginEndpoint(props);
        },
        {
            onMutate: () => setLoading(true),
            onSettled: () => setLoading(false),
            onSuccess: async (response: ILoginResponse) => {
                try {
                    if (isDevMode) {
                        Cookies.set("logged_in", "true");
                        Cookies.set("access_token", `${response.access_token}`);
                        Cookies.set(
                            "refresh_token",
                            `${response.access_token}`
                        );
                        setSession({
                            id: response.access_token,
                            signedIn: true,
                            jwt: response.access_token,
                            email: response.access_token,
                        });
                    } else {
                        const currentUserData = await queryClient.fetchQuery({
                            queryKey: ["currentUserEndpoint"],
                            queryFn: async () => {
                                const {
                                    data,
                                }: AxiosResponse<ICurrentUserResponse> =
                                    await currentUserEndpoint();
                                return data;
                            },
                        });
                        if (!currentUserData.error_message) {
                            setSession({
                                id: currentUserData.id,
                                signedIn: true,
                                jwt: response.access_token,
                                email: currentUserData.email,
                            });
                        }
                    }
                    closePopup();
                } catch (error) {
                    console.log("Error logging in");
                    toast.error("Error has occurred while trying to login");
                }
            },
            onError: (error: AxiosError) => {
                toast.error("Please Enter a valid email and password");
            },
        }
    );

    const handleLogin = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({
            email,
            password,
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
                {loading && <LoadingSnackbar />}
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
                        <span className="opacity-50">
                            Don&apos;t have an account?{" "}
                        </span>
                        <span
                            className="cursor-pointer text-[var(--pink)] underline-offset-2 underline opacity-60 hover:opacity-100 hover:-translate-y-2 duration-300"
                            onClick={() => {
                                setLoginNotSignUp(false);
                            }}
                        >
                            Sign up
                        </span>
                    </div>
                </div>
            </form>
        </motion.div>
    );
}
