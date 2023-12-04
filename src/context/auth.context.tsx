import { createContext, ReactNode, useContext, useState } from "react";
import {
    CurrentSessionResponse,
    DecodedJwt,
    UserSession,
} from "@/models/auth.models";
import { useMutation, UseMutationResult, useQuery } from "react-query";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { AxiosError, AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { useStageContext } from "./stage.context";
import { updateQuery } from "@/utils/helperFunctions";
import { Views } from "@/models/view.models";
import { useRouter } from "next/router";
import EmailIcon from "@mui/icons-material/Email";
import { API_CLIENT } from "@/services/ApiClient";

/******************************************************************************
    INTERFACES
*******************************************************************************/
type AuthContextType = {
    userSession?: UserSession | null;
    isLoading: boolean;
    signInMutation:
        | UseMutationResult<
              AxiosResponse<any, any>,
              unknown,
              {
                  email: string;
                  password: string;
              },
              unknown
          >
        | undefined;
    signOutMutation:
        | UseMutationResult<
              AxiosResponse<any, any> | undefined,
              unknown,
              void,
              unknown
          >
        | undefined;
    signInWithGoogleMutation:
        | UseMutationResult<AxiosResponse<any, any>, unknown, void, unknown>
        | any;
    signUpMutation:
        | UseMutationResult<
              AxiosResponse<any, any>,
              unknown,
              {
                  email: string;
                  password: string;
              },
              unknown
          >
        | undefined;
};

/******************************************************************************
    INITIALISE CONTEXT
*******************************************************************************/
const AuthContext = createContext<AuthContextType>({
    userSession: null,
    isLoading: true,
    signInMutation: undefined,
    signOutMutation: undefined,
    signInWithGoogleMutation: undefined,
    signUpMutation: undefined,
});

/******************************************************************************
    PROVIDER
*******************************************************************************/
const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter();
    const { isDevMode } = useStageContext();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [userSession, setUserSession] = useState<UserSession | null>(null);

    const currentUserQuery = useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const accessToken = isDevMode
                ? Cookies.get("access_token")
                : undefined;
            API_CLIENT.setJwt(accessToken ?? "");

            return (await API_CLIENT.currentUser()) as AxiosResponse<CurrentSessionResponse>;
        },
        onSettled: () => setIsLoading(false),
        onSuccess: async (res) => {
            createSession({
                id: res?.data.id,
                email: res?.data.email,
                jwt: Cookies.get("access_token"),
            });
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    /**
     * Refreshes the current user session.
     */
    const resetUserSession = async () => {
        if (isDevMode) {
            Cookies.remove("access_token");
            Cookies.remove("logged_in");
            Cookies.remove("refresh_token");
        }
        setUserSession(null);
    };

    /**
     * Mutation query to login the user.
     * Also sets the user session in the context.
     */
    const signInMutation = useMutation({
        mutationKey: ["signIn"],
        mutationFn: async (input: { email: string; password: string }) => {
            setIsLoading(true);
            return await API_CLIENT.login(input);
        },
        onSettled: () => setIsLoading(false),
        onSuccess: async (res) => {
            if (isDevMode) Cookies.set("access_token", res?.data.access_token);
            currentUserQuery.refetch();
            toast.success("Successfully logged in!");
            updateQuery({
                view: Views.NULL,
            });
        },
        onError: (_err) => {
            toast.error("Error logging in!");
        },
    });

    /**
     * Mutation query to login the user with Google.
     * Also sets the user session in the context.
     */
    const signInWithGoogleMutation = useMutation({
        mutationKey: ["signInWithGoogle"],
        mutationFn: async () => {
            setIsLoading(true);
            return await API_CLIENT.googleLogin();
        },
        onSettled: () => setIsLoading(false),
        onSuccess: async (res) => {
            router.push(res?.data.url);
        },
        onError: (_err) => {
            toast.error("Error logging in!");
        },
    });

    /**
     * Mutation query to logout the user.
     * Also resets the user session in the context.
     */
    const signOutMutation = useMutation({
        mutationKey: ["signOut"],
        mutationFn: async () => {
            setIsLoading(true);
            if (isDevMode === false) return;
            return await API_CLIENT.logout();
        },
        onSettled: () => setIsLoading(false),
        onSuccess: () => {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            toast.success("Successfully logged out!");
            resetUserSession();
        },
        onError: (_err) => {
            toast.error("Error logging out!");
        },
    });

    /**
     * Mutation query to sign up the user.
     */
    const signUpMutation = useMutation({
        mutationKey: ["signUp"],
        mutationFn: async (input: { email: string; password: string }) => {
            setIsLoading(true);
            return await API_CLIENT.register({
                email: input.email,
                password: input.password,
            });
        },
        onSettled: () => setIsLoading(false),
        onSuccess: () => {
            toast.success(
                "Registered, please click the link in your email to verify your account and continue to login.",
                {
                    icon: <EmailIcon />,
                }
            );
        },
        onError: (err: AxiosError<any>) => {
            toast.error(
                `${err?.response?.data?.error_message ?? "Error signing up"}`
            );
        },
    });

    /**
     * Creates a new session with the given JWT access token and email.
     * Also sets the user session in the context.
     *
     * @param id The id of the user.
     * @param email The email of the user.
     * @param jwt The JWT access token to create a new session.
     */
    const createSession = ({
        id,
        email,
        jwt,
    }: {
        id: string;
        email: string;
        jwt?: string;
    }) => {
        if (isDevMode && jwt) {
            Cookies.set("access_token", jwt);
            const decodedToken: DecodedJwt = jwtDecode(jwt);
            setUserSession({
                id: id,
                email: email,
                jwt: jwt,
                exp: decodedToken.exp,
            });
        } else {
            setUserSession({
                id: id,
                email: email,
                jwt: jwt,
                exp: undefined,
            });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                userSession,
                signInMutation,
                signOutMutation,
                signInWithGoogleMutation,
                signUpMutation,
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

/******************************************************************************
    CONTEXT HOOK
*******************************************************************************/
const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context)
        throw new Error("useAuthContext must be used within a AuthProvider");
    return context;
};

export { AuthProvider, useAuthContext };
