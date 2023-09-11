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
    useState,
} from "react";
import { useQuery, useQueryClient } from "react-query";
import { useStageContext } from "./stageContext";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { access } from "fs";

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

    /**
     * Function to use refresh token to get another access token
     */
    const tryRefreshToken = useCallback(async () => {
        const res = await queryClient.fetchQuery({
            queryKey: ["currentUserEndpoint"],
            queryFn: async () => {
                const { data }: AxiosResponse<ILoginResponse> =
                    await refreshTokenEndpoint();
                return data;
            },
        });
        if (res.success) {
            setSession({
                signedIn: true,
                jwt: res.access_token,
            });
        }
    }, [queryClient]);

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
        if (isDevMode) {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            Cookies.remove("logged_in");
            setSession(undefined);
        } else {
            const res = await queryClient.fetchQuery({
                queryKey: ["logoutEndpoint"],
                queryFn: async () => {
                    const { data }: AxiosResponse<ILogoutResponse> =
                        await logoutEndpoint();
                    return data;
                },
            });
            if (res.success) {
                Cookies.remove("access_token");
                Cookies.remove("refresh_token");
                Cookies.remove("logged_in");
                setSession(undefined);
            }
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
