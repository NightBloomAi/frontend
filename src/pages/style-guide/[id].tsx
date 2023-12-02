/* eslint-disable react-hooks/exhaustive-deps */
import InfiniteGallery from "@/components/home/InfiniteGallery";
import LogoAndSlogan from "@/components/home/LogoAndSlogan";
import SearchField from "@/components/home/SearchField";
import Layout from "@/components/layouts/Layout";
import { API_CLIENT } from "@/services/ApiClient";
import { updateQuery } from "@/utils/helperFunctions";
import { debounce } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useRouter } from "next/router";
import React, { ChangeEvent, useCallback, useState } from "react";
import { useInfiniteQuery } from "react-query";

const StyleGuideExplore = () => {
    const router = useRouter();
    const category = router.query.id;
    const searchQuery = router.query.search ?? "";
    const imageId = router.query.imageId ?? "";
    const variant = router.query.variant ?? "0_0";

    const [searchInput, setSearchInput] = useState(searchQuery.toString());

    /**
     * Uses debounce function from MUI
     */
    const debouncedUpdateQuery = useCallback(
        debounce((value) => updateQuery({ search: value }, router.asPath), 500),
        []
    );

    /**
     * Handles search input change
     *
     * @param e TextField event
     */
    const handleSearchOnChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = e.target.value;
        setSearchInput(value); // Update local state
        debouncedUpdateQuery(value); // Update URL query parameter after debounce
    };

    /**
     * Handles infinite scroll data fetching
     */
    const infiniteScrollQuery = useInfiniteQuery({
        queryKey: ["searchImages", searchQuery, category],
        queryFn: async ({ pageParam = 1 }) => {
            return await API_CLIENT.search({
                page: pageParam,
                query: searchQuery.toString(),
                category: category?.toString() ?? "",
            });
        },
        getNextPageParam: (lastPage) => {
            // Handles whether you should fetch for next page
            if (lastPage.data.hits.length === 0) {
                return undefined;
            } else {
                return lastPage.data.page + 1;
            }
        },
        refetchOnWindowFocus: false,
    });

    return (
        <Layout>
            <Box>
                <Stack sx={stackSx}>
                    {/***************************************************
                     * LOGO AND TAGLINE
                     ***************************************************/}
                    <LogoAndSlogan />

                    {/***************************************************
                     * SEARCH INPUT FIELD
                     ***************************************************/}
                    <SearchField
                        searchInput={searchInput}
                        handleSearchOnChange={handleSearchOnChange}
                    />
                </Stack>

                {/***************************************************
                 * IMAGES SECTION (INFINITE SCROLL)
                 ***************************************************/}
                <InfiniteGallery
                    infiniteScrollQuery={infiniteScrollQuery}
                    variant={variant.toString()}
                />
            </Box>
        </Layout>
    );
};

const stackSx = {
    width: "100%",
    direction: "column",
    justifyContent: "center",
    alignItems: "center",
    mt: 8,
    mb: 10,
    gap: 4,
};

export default StyleGuideExplore;
