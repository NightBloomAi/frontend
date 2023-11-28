import { useThemeContext } from "@/context/theme.context";
import { SearchRes } from "@/models/search.models";
import Endpoints from "@/services/endpoints";
import { updateQuery } from "@/utils/helperFunctions";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { AxiosResponse } from "axios";
import React from "react";
import toast from "react-hot-toast";
import { UseInfiniteQueryResult, useQuery } from "react-query";

type Props = {
    category: string;
    infiniteScrollQuery: UseInfiniteQueryResult<
        AxiosResponse<SearchRes, any>,
        unknown
    >;
};

const CategoriesFilter: React.FC<Props> = ({
    category,
    infiniteScrollQuery,
}) => {
    const { theme } = useThemeContext();

    /**
     * Fetches list of categories
     */
    const getCategoriesQuery = useQuery({
        queryFn: async () => await Endpoints.getCategories(),
    });

    /**
     * Updates category and refetch search query
     *
     * @param e Select Event
     */
    const handleOnChange = (e: SelectChangeEvent<string>) => {
        updateQuery({ category: e.target.value });

        const promise = infiniteScrollQuery.refetch();
        toast.promise(promise, {
            loading: "Loading category",
            success:
                e.target.value === ""
                    ? "All"
                    : `${formatCategoryString(e.target.value)}`,
            error: "Error!",
        });
    };

    return (
        <Select
            variant="outlined"
            value={category}
            onChange={handleOnChange}
            displayEmpty
            size="small"
            sx={{
                mb: 2,
                mt: 2,
                borderRadius: 20,
                pl: 1,
                textOverflow: "ellipsis",
                width: {
                    md: 200,
                    xs: 140,
                },
                backgroundColor: theme.palette.transGrey.main,
                "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                },
            }}
            inputProps={{
                style: {
                    backgroundColor: theme.palette.primary.main,
                    border: "transparent",
                    outline: "none",
                },
            }}
        >
            <MenuItem key={"all"} value={""}>
                All
            </MenuItem>
            {getCategoriesQuery.data?.data.categories.map(
                (category: string) => {
                    return (
                        <MenuItem key={category} value={category}>
                            {formatCategoryString(category)}
                        </MenuItem>
                    );
                }
            )}
        </Select>
    );
};

const formatCategoryString = (category: string) => {
    return category
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

export default CategoriesFilter;
