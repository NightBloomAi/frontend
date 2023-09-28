import {
    currentUserEndpoint,
    logoutEndpoint,
    refreshTokenEndpoint,
} from "@/api/nightbloomApi";
import {
    ICurrentUserResponse,
    IJwtDecode,
    ILoginResponse,
    ILogoutResponse,
    ISession,
} from "@/types/auth.type";
import { AxiosResponse } from "axios";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
} from "react";
import { useQueryClient } from "react-query";
import { useStageContext } from "./stageContext";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

interface AuthContextType {
    session?: ISession;
    setSession: React.Dispatch<React.SetStateAction<ISession | undefined>>;
    signInPopUpVisible: boolean;
    setSignInPopUpVisible: React.Dispatch<React.SetStateAction<boolean>>;
    loginNotSignUp: boolean;
    setLoginNotSignUp: React.Dispatch<React.SetStateAction<boolean>>;
    data?: ICurrentUserResponse;
    loading: boolean;
    error?: any;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: undefined,
    setSession: () => {},
    signInPopUpVisible: false,
    setSignInPopUpVisible: () => {},
    loginNotSignUp: true,
    setLoginNotSignUp: () => {},
    loading: false,
    logout: async () => {},
});

export default function AuthContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const queryClient = useQueryClient();
    const { isDevMode } = useStageContext();
    const [loading, setLoading] = useState(false);
    const [signInPopUpVisible, setSignInPopUpVisible] = useState(false);
    const [loginNotSignUp, setLoginNotSignUp] = useState(true);
    const [session, setSession] = useState<ISession | undefined>(undefined);

    useLayoutEffect(() => {
        async function fetchData() {
            try {
                console.log("passing 1")
                const token = Cookies.get("access_token");
                console.log("passing 2");
                const currentUserData = await queryClient.fetchQuery({
                    queryKey: ["currentUserEndpoint"],
                    queryFn: async () => {
                        console.log("passing 3")
                        const res = await currentUserEndpoint({
                            jwt: token,
                        });
                        console.log(res);
                        return res;
                    },
                });

                if (token && !currentUserData.error_message) {
                    console.log("passing 4")
                    setSession({
                        id: currentUserData.id,
                        signedIn: true,
                        jwt: token,
                        email: currentUserData.email,
                    });
                    console.log(session);
                }
            } catch (error) {
                console.log(error);
                console.error("Error fetching user data:", error);
            }
        }

        fetchData();
    }, [queryClient]);



    /**
     * Function to use refresh token to get another access token
     */
    const tryRefreshToken = useCallback(async () => {
        const res = await queryClient.fetchQuery({
            queryKey: ["currentUserEndpoint"],
            queryFn: async () =>
                (await refreshTokenEndpoint({
                    jwt: session?.jwt,
                })) as ILoginResponse,
        });

        if (res.success) {
            setSession({
                signedIn: true,
                jwt: res.access_token,
            });
        }
    }, [queryClient, session?.jwt]);

    /**
     * Function to check if JWT token is expired
     *      if expired -> remove cookie & try refresh token
     *      else -> set session to signed in
     */
    const checkJwtExp = useCallback(async () => {
        setLoading(true);
        const accessToken = Cookies.get("access_token");
        if (accessToken) {
            const decodedToken: IJwtDecode = jwt_decode(accessToken);
            if (decodedToken.exp * 1000 < Date.now()) {
                console.log("exp:", decodedToken.exp);
                console.log("now:", Date.now());
                if (!isDevMode) {
                    await tryRefreshToken();
                }
                Cookies.remove("access_token");
                Cookies.remove("refresh_token");
                Cookies.remove("logged_in");
            } else {
                setSession({
                    signedIn: true,
                    jwt: accessToken,
                });
            }
        }
        setLoading(false);
    }, [isDevMode, tryRefreshToken]);

    /**
     * Function to logout, clears cookies
     */
    const logout = async () => {
        setLoading(true);
        try {
            await queryClient.fetchQuery({
                queryKey: ["logoutEndpoint"],
                queryFn: async () => {
                    const { data }: AxiosResponse<ILogoutResponse> =
                        await logoutEndpoint({
                            jwt: session?.jwt,
                        });
                    return data;
                },
            });
        } catch (error) {
            console.error("Error logging out:", error);
        }
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("logged_in");
        setSession(undefined);
        setLoading(false);
    };

    useEffect(() => {
        checkJwtExp();
    }, [checkJwtExp]);

    return (
        <AuthContext.Provider
            value={{
                session,
                setSession,
                signInPopUpVisible,
                setSignInPopUpVisible,
                loginNotSignUp,
                setLoginNotSignUp,
                logout,
                loading,
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
