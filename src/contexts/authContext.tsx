/* eslint-disable react-hooks/exhaustive-deps */
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
import Endpoints from "@/api/endpoints";

interface AuthContextType {
    session?: ISession;
    setSession: React.Dispatch<React.SetStateAction<ISession | undefined>>;
    signInPopUpVisible: boolean;
    setSignInPopUpVisible: React.Dispatch<React.SetStateAction<boolean>>;
    popupContent:string;
    setPopupContent: React.Dispatch<React.SetStateAction<string>>;
    data?: ICurrentUserResponse;
    loading: boolean;
    error?: any;
    logout: () => Promise<void>;
    googleAuth: () => Promise<any>;
    forgotPassword: ({ email }: { email: string; }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    session: undefined,
    setSession: () => {},
    signInPopUpVisible: false,
    setSignInPopUpVisible: () => {},
    popupContent: "",
    setPopupContent: () => {},
    loading: false,
    logout: async () => {},
    googleAuth: async () => undefined,
    forgotPassword: async ()=> {},
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
    const [popupContent, setPopupContent] = useState("login");
    const [session, setSession] = useState<ISession | undefined>(undefined);

    useLayoutEffect(() => {
        async function fetchData() {
            try {
                const token = Cookies.get("access_token");
                const currentUserData = await queryClient.fetchQuery({
                    queryKey: ["currentUserEndpoint"],
                    queryFn: async () => {
                        console.log("passing 3");
                        const res = await Endpoints.currentUser({
                            jwt: token,
                        });
                        return res;
                    },
                });

                if (!currentUserData.error_message) {
                    console.log("passing 4");
                    setSession({
                        id: currentUserData.id,
                        signedIn: true,
                        jwt: currentUserData.email,
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
                (await Endpoints.refreshToken({
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
                        await Endpoints.logout({
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

    const forgotPassword = async ({email}: {email:string})=> {
        setLoading(true);
        await queryClient.fetchQuery({
            queryKey: ["forgotPasswordEndpoint"],
            queryFn: async ()=> {
                const {data}: AxiosResponse = 
                await Endpoints.forgotPassword({email: email});
                return data;
            },
        })
        setLoading(false);
    }

    const googleAuth = async () => {
        setLoading(true);
        try {
            return await queryClient.fetchQuery({
                queryKey: ["googleAuthEndpoint"],
                queryFn: async () => await Endpoints.googleLogin(),
            });
        } catch (error) {
            return error;
        }
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
                popupContent,
                setPopupContent,
                logout,
                loading,
                googleAuth,
                forgotPassword,
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
