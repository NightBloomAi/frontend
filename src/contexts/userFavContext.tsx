import React, { createContext, ReactNode, useContext, useState } from "react";
import { useAuthContext } from "./authContext";
import { Hit } from "@/types/searchRes.type";
import { useQuery, UseQueryResult } from "react-query";
import { userFavouritesEndpoint } from "@/api/nightbloomApi";

/******************************************************************************
    INTERFACES
*******************************************************************************/
interface IUserFavContext {
    favQuery: UseQueryResult<any, unknown> | undefined;
    selectedImage: Hit | undefined;
    setSelectedImage: React.Dispatch<React.SetStateAction<Hit | undefined>>;
}

/******************************************************************************
    INITIALISE CONTEXT
*******************************************************************************/
const UserFavContext = createContext<IUserFavContext>({
    favQuery: undefined,
    selectedImage: undefined,
    setSelectedImage: () => {},
});

/******************************************************************************
    PROVIDER
*******************************************************************************/
const UserFavProvider = ({ children }: { children: ReactNode }) => {
    const [selectedImage, setSelectedImage] = useState<Hit | undefined>(
        undefined
    );
    const {
        session,
        signInPopUpVisible,
        setSignInPopUpVisible,
        setLoginNotSignUp,
    } = useAuthContext();

    const favQuery = useQuery(
        "favorites",
        () => userFavouritesEndpoint({ jwt: session?.jwt }),
        {
            enabled: session?.signedIn === true,
            retry: false,
            refetchOnWindowFocus: false,
        }
    );

    return (
        <UserFavContext.Provider
            value={{ favQuery, selectedImage, setSelectedImage }}
        >
            {children}
        </UserFavContext.Provider>
    );
};

/******************************************************************************
    CONTEXT HOOK
*******************************************************************************/
const useUserFavContext = (): IUserFavContext => {
    const context = useContext(UserFavContext);
    if (!context)
        throw new Error(
            "useUserFavContext must be used within a UserFavProvider"
        );
    return context;
};

export { UserFavProvider, useUserFavContext };
