/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect } from "react";
import Endpoints from "@/services/endpoints";
import Layout from "@/components/layouts/Layout";
import authCheck from "@/components/auth/authCheck";
import ImagePopup from "@/components/home/ImagePopup";
import SearchField from "@/components/home/SearchField";
import LogoAndSlogan from "@/components/home/LogoAndSlogan";
import InfiniteGallery from "@/components/home/InfiniteGallery";
import CategoriesFilter from "@/components/home/CategoriesFilter";
import { updateQuery } from "@/utils/helperFunctions";
import { SearchRes } from "@/models/search.models";
import { Stack, debounce } from "@mui/material";
import { useInfiniteQuery } from "react-query";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { AxiosResponse } from "axios";

const Home = () => {
    const router = useRouter();

    // Extract query parameters
    const searchQuery = router.query.search ?? "";
    const category = router.query.category ?? "";
    const imageId = router.query.imageId ?? "";
    const variant = router.query.variant ?? "0_0";

    // Local state for search input
    const [searchInput, setSearchInput] = useState(searchQuery.toString());

    /**
     * Uses debounce function from MUI
     */
    const debouncedUpdateQuery = useCallback(
        debounce((value) => updateQuery({ search: value }), 500),
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
            // const sleep = (ms: any) =>
            //     new Promise((resolve) => setTimeout(resolve, ms));
            // await sleep(1000);

            return (await Endpoints.search({
                page: pageParam,
                query: searchQuery.toString(),
                category: category.toString(),
            })) as AxiosResponse<SearchRes>;
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

    /**
     * Update the search input field from query param
     */
    useEffect(() => {
        setSearchInput(searchQuery.toString());
    }, [searchQuery]);

    /**
     * Render the home page.
     */
    return (
        <Layout>
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
             * FILTER (CATEGORIES)
             ***************************************************/}
            <Stack direction={"row"} justifyContent={"flex-end"}>
                <CategoriesFilter
                    category={category.toString()}
                    infiniteScrollQuery={infiniteScrollQuery}
                />
            </Stack>

            {/***************************************************
             * IMAGES SECTION (INFINITE SCROLL)
             ***************************************************/}
            <InfiniteGallery
                infiniteScrollQuery={infiniteScrollQuery}
                variant={variant.toString()}
            />

            {/***************************************************
             * IMAGE POPUP
             ***************************************************/}
            {imageId !== "" && (
                <ImagePopup
                    imageId={imageId.toString()}
                    variant={variant.toString()}
                />
            )}
        </Layout>
    );
};

const stackSx = {
    width: "100%",
    direction: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    my: 12,
};

export default authCheck(Home);
