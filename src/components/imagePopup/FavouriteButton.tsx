import { API_CLIENT } from "@/services/ApiClient";
import { IconButton, Tooltip } from "@mui/material";
import { useRouter } from "next/router";
import { Fragment } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import TopLoadingBar from "../utils/TopLoadingBar";

type Props = {
    icon: React.ReactNode;
    tooltip?: string;
    snackbarMessage?: string;
    isFavorite?: boolean;
};

const FavouriteButton: React.FC<Props> = ({
    icon,
    tooltip,
    snackbarMessage,
    isFavorite,
}) => {
    const queryClient = useQueryClient();
    const router = useRouter();
    const imageId = router.query.imageId?.toString() ?? "";

    /**
     * Mutation to add image to favorites
     */
    const addFavouriteMutation = useMutation({
        mutationFn: async () => {
            await API_CLIENT.createFavorite({
                ids: [imageId],
                variant: null,
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries("userFavourites");
            queryClient.invalidateQueries("isFavorite");
            toast.success("Added to favorites");
        },
    });

    /**
     * Mutation to remove image from favorites
     */
    const removeFavouriteMutation = useMutation({
        mutationFn: async () => {
            await API_CLIENT.removeFavorite({
                ids: [imageId],
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries("userFavourites");
            queryClient.invalidateQueries("isFavorite");
            toast.success("Removed from favorites");
        },
    });

    /**
     * Handle click on favorite button to add/remove from favorites
     */
    const handleClick = () => {
        if (isFavorite) {
            // Remove from favorites
            removeFavouriteMutation.mutate();
        } else {
            // Add to favorites
            addFavouriteMutation.mutate();
        }
    };

    return (
        <Fragment>
            {(addFavouriteMutation.isLoading ||
                removeFavouriteMutation.isLoading) && <TopLoadingBar />}
            <Tooltip title={tooltip ?? "Copy to clibboard"}>
                <IconButton
                    onClick={handleClick}
                    color={isFavorite ? "primary" : "default"}
                    disabled={
                        addFavouriteMutation.isLoading ||
                        removeFavouriteMutation.isLoading
                    }
                >
                    {icon}
                </IconButton>
            </Tooltip>
        </Fragment>
    );
};

export default FavouriteButton;
