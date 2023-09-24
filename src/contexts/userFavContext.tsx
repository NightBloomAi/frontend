import React, { createContext, ReactNode, useContext, useState } from "react";
import { useAuthContext } from "./authContext";
import { Hit } from "@/types/searchRes.type";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import { createFavouriteEndpoint, userFavouritesEndpoint } from "@/api/nightbloomApi";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

/******************************************************************************
    INTERFACES
*******************************************************************************/
interface IUserFavContext {
    favQuery: UseQueryResult<any, unknown> | undefined;
    selectedImage: Hit | undefined;
    setSelectedImage: React.Dispatch<React.SetStateAction<Hit | undefined>>;
    createFavourite: ({imageIDs}:{imageIDs:string[]})=>Promise<void>;
}

/******************************************************************************
    INITIALISE CONTEXT
*******************************************************************************/
const UserFavContext = createContext<IUserFavContext>({
    favQuery: undefined,
    selectedImage: undefined,
    setSelectedImage: () => {},
    createFavourite: async ({imageIDs}:{imageIDs:string[]}) => {},

});

/******************************************************************************
    PROVIDER
*******************************************************************************/
const UserFavProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
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

    const createFavourite = async ({imageIDs}: {imageIDs: string[]}) => {
        try{
            await queryClient.fetchQuery({
                queryKey: ["createFavouriteEndpoint"],
                queryFn: async () => {
                    const {data}: AxiosResponse = 
                    await createFavouriteEndpoint({
                        "ids": imageIDs, jwt: Cookies.get('access_token'),
                    });
                    return data;
                },
            });
        } catch (error) {
            console.error("Error adding to favourites", error);
        }
    }

    return (
        <UserFavContext.Provider
            value={{ favQuery, selectedImage, setSelectedImage, createFavourite }}
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
