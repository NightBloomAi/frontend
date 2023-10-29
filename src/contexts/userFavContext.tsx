import React, { createContext, ReactNode, useContext, useState } from "react";
import { useAuthContext } from "./authContext";
import { Hit } from "@/types/searchRes.type";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import Endpoints from "@/api/endpoints";

/******************************************************************************
    INTERFACES
*******************************************************************************/
interface ICheckContext {
    is_favourite: boolean;
}

interface IUserFavContext {
    favQuery: UseQueryResult<any, unknown> | undefined;
    selectedImage: Hit | undefined;
    setSelectedImage: React.Dispatch<React.SetStateAction<Hit | undefined>>;
    createFavourite: ({ imageIDs }: { imageIDs: string[] }) => Promise<void>;
    checkFavourite: ({
        reference_job_id,
    }: {
        reference_job_id: string;
    }) => Promise<undefined | boolean>;
    removeFavourite: ({ imageIDs }: { imageIDs: string[] }) => Promise<void>;
}

/******************************************************************************
    INITIALISE CONTEXT
*******************************************************************************/
const UserFavContext = createContext<IUserFavContext>({
    favQuery: undefined,
    selectedImage: undefined,
    setSelectedImage: () => {},
    createFavourite: async ({ imageIDs }: { imageIDs: string[] }) => {},
    checkFavourite: async ({
        reference_job_id,
    }: {
        reference_job_id: string;
    }) => undefined,
    removeFavourite: async ({ imageIDs }: { imageIDs: string[] }) => {},
});

/******************************************************************************
    PROVIDER
*******************************************************************************/
const UserFavProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();
    const [selectedImage, setSelectedImage] = useState<Hit | undefined>(
        undefined
    );
    const { session } = useAuthContext();

    const favQuery = useQuery(
        "favourites",
        () => Endpoints.userFavourites({ jwt: session?.jwt }),
        {
            enabled: session?.signedIn === true,
            retry: false,
            refetchOnWindowFocus: false,
        }
    );

    const createFavourite = async ({ imageIDs }: { imageIDs: string[] }) => {
        try {
            await queryClient.fetchQuery({
                queryKey: ["createFavouriteEndpoint"],
                queryFn: async () => {
                    const response: AxiosResponse =
                        await Endpoints.createFavourite({
                            ids: imageIDs,
                            jwt: Cookies.get("access_token"),
                        });
                    return response;
                },
            });
        } catch (error) {
            console.error("Error adding to favourites", error);
        }
    };

    interface FavouriteAsset {
        id: string;
        prompt: string;
        full_command: string;
        height: number;
        width: number;
        reference_job_id: string;
        category: string;
        generation_time: string;
        generation_time_unix: string;
        image_paths: string[];
        kind: string;
    }

    const checkFavourite = async ({
        reference_job_id,
    }: {
        reference_job_id: string;
    }) => {
        return await queryClient.fetchQuery({
            queryKey: ["checkFavourite"],
            queryFn: async () => {
                const response: AxiosResponse = await Endpoints.checkFavourite({
                    id: reference_job_id,
                    jwt: Cookies.get("access_token"),
                });
                return response as unknown as boolean;
            },
        });
    };

    const removeFavourite = async ({ imageIDs }: { imageIDs: string[] }) => {
        try {
            await queryClient.fetchQuery({
                queryKey: ["removeFavourite"],
                queryFn: async () => {
                    const response: AxiosResponse =
                        await Endpoints.removeFavourite({
                            ids: imageIDs,
                            jwt: Cookies.get("access_token"),
                        });
                    return response;
                },
            });
        } catch (error) {
            console.error("Error removing favourites", error);
        }
    };

    return (
        <UserFavContext.Provider
            value={{
                favQuery,
                selectedImage,
                setSelectedImage,
                createFavourite,
                checkFavourite,
                removeFavourite,
            }}
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
