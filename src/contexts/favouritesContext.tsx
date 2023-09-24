import { createFavouriteEndpoint, userFavouritesEndpoint } from "@/api/nightbloomApi";
import { IUserFavourites } from "@/types/fav.type";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import React, { createContext, useContext, useLayoutEffect, useState } from "react";
import { useQueryClient } from "react-query";

interface FavouritesContextType {
    createFavourite: ({imageIDs}:{imageIDs:string[]})=>Promise<void>;
    favouritesList?: IUserFavourites[];
    
};

const FavouritesContext = createContext<FavouritesContextType>({
    createFavourite: async ({imageIDs}:{imageIDs:string[]}) => {},
    favouritesList: undefined,
    
});

export default function FavouritesContextProvider({children,}:{children:React.ReactNode}) {
    const queryClient = useQueryClient();
    const [favouritesList, setFavouritesList] = useState<IUserFavourites[] | undefined >(undefined);

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

    const userFavourites = async ()=> {
        try{
            const data = await queryClient.fetchQuery({
                queryKey:["userFavouritesEndpoint"],
                queryFn: async ()=> {
                    const {data}: AxiosResponse = 
                    await userFavouritesEndpoint({jwt: Cookies.get('access_token'),});
                    return data;
                }
            })
            setFavouritesList(data.assets);
        } catch (error) {
            console.error("Error retrieving favourites", error);
        }
    }

    useLayoutEffect(()=>{
        userFavourites();
    }, [])

    return(
        <FavouritesContext.Provider value={{createFavourite,favouritesList}}>
            {children}
        </FavouritesContext.Provider>
    )

}

/******************************************************************************
    CONTEXT HOOK
*******************************************************************************/
const useFavouritesContext = (): FavouritesContextType => {
    const context = useContext(FavouritesContext);
    if (!context)
        throw new Error(
            "useFavouritesContext must be used within a FavouritesContextProvider"
        );
    return context;
};

export { FavouritesContextProvider, useFavouritesContext };