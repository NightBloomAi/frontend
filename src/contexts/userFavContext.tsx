import React, { createContext, ReactNode, useContext, useState } from "react";
import { useAuthContext } from "./authContext";
import { Hit } from "@/types/searchRes.type";
import { useQuery, useQueryClient, UseQueryResult } from "react-query";
import {
  createFavouriteEndpoint,
  userFavouritesEndpoint,
} from "@/api/nightbloomApi";
import { AxiosResponse } from "axios";
import Cookies from "js-cookie";

/******************************************************************************
    INTERFACES
*******************************************************************************/
interface IUserFavContext {
  favQuery: UseQueryResult<any, unknown> | undefined;
  selectedImage: Hit | undefined;
  setSelectedImage: React.Dispatch<React.SetStateAction<Hit | undefined>>;
  createFavourite: ({ imageIDs }: { imageIDs: string[] }) => Promise<void>;
  checkFavourite: ({reference_job_id}:{reference_job_id: string}) => boolean;
}

/******************************************************************************
    INITIALISE CONTEXT
*******************************************************************************/
const UserFavContext = createContext<IUserFavContext>({
  favQuery: undefined,
  selectedImage: undefined,
  setSelectedImage: () => {},
  createFavourite: async ({ imageIDs }: { imageIDs: string[] }) => {},
  checkFavourite: ({reference_job_id}:{reference_job_id: string}) => false,
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
    () => userFavouritesEndpoint({ jwt: session?.jwt }),
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
          const { data }: AxiosResponse = await createFavouriteEndpoint({
            ids: imageIDs,
            jwt: Cookies.get("access_token"),
          });
          return data;
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

  const checkFavourite = ({
    reference_job_id,
  }: {
    reference_job_id: string;
  }) => {
   const isFavourite = favQuery.data.assets.some(
      (item: FavouriteAsset) => item.reference_job_id === reference_job_id
    );
    return isFavourite;
  };

  return (
    <UserFavContext.Provider
      value={{ favQuery, selectedImage, setSelectedImage, createFavourite, checkFavourite }}
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
    throw new Error("useUserFavContext must be used within a UserFavProvider");
  return context;
};

export { UserFavProvider, useUserFavContext };
