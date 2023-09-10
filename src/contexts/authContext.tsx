import { currentUserEndpoint } from "@/api/nightbloomApi";
import { ICurrentUserResponse } from "@/types/login.type";
import { AxiosResponse } from "axios";
import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";

interface AuthContextType {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    username: string;
    setUsername: React.Dispatch<React.SetStateAction<string>>;
    signInPopUpVisible: boolean;
    setSignInPopUpVisible: React.Dispatch<React.SetStateAction<boolean>>;
    loginNotSignUp: boolean;
    setLoginNotSignUp: React.Dispatch<React.SetStateAction<boolean>>;
    data?: ICurrentUserResponse;
    isLoading: boolean;
    error?: any;
}

const AuthContext = createContext<AuthContextType>({
    loggedIn: false,
    setLoggedIn: () => {},
    username: "",
    setUsername: () => {},
    signInPopUpVisible: false,
    setSignInPopUpVisible: () => {},
    loginNotSignUp: true,
    setLoginNotSignUp: () => {},
    isLoading: false,
});

export default function AuthContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [signInPopUpVisible, setSignInPopUpVisible] = useState(false);
    const [loginNotSignUp, setLoginNotSignUp] = useState(true);

    const { data, isLoading, error } = useQuery<ICurrentUserResponse>({
        queryKey: ["currentUserEndpoint"],
        queryFn: async () => {
            const { data }: AxiosResponse<ICurrentUserResponse> =
                await currentUserEndpoint();
            return data;
        },
        retry: false,
        refetchOnWindowFocus: true,
    });

    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                setLoggedIn,
                username,
                setUsername,
                signInPopUpVisible,
                setSignInPopUpVisible,
                loginNotSignUp,
                setLoginNotSignUp,
                data,
                isLoading,
                error,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

/******************************************************************************
    CONTEXT HOOK
*******************************************************************************/
const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error(
            "useAuthContext must be used within a AuthContextProvider"
        );
    return context;
};

export { AuthContextProvider, useAuthContext };
