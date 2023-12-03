/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useCallback, useState } from "react";
import InfiniteGallery from "@/components/home/InfiniteGallery";
import stylesList from "@/components/styleGuide/stylesList";
import LogoAndSlogan from "@/components/home/LogoAndSlogan";
import SearchField from "@/components/home/SearchField";
import ImagePopup from "@/components/imagePopup/ImagePopup";
import Layout from "@/components/layouts/Layout";
import { updateQuery } from "@/utils/helperFunctions";
import { API_CLIENT } from "@/services/ApiClient";
import { useInfiniteQuery } from "react-query";
import { debounce } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useRouter } from "next/router";

const StyleGuideExplore = () => {
    const router = useRouter();
    const searchQuery = router.query.search ?? "";
    const imageId = router.query.imageId ?? "";
    const variant = router.query.variant ?? "0_0";
    const category = router.query.id;

    const [searchInput, setSearchInput] = useState(searchQuery.toString());
    const categoryObj = stylesList.find((style) => style.name === category);

    /**ƒ
     * Uses debounce function from MUI
     */
    const debouncedUpdateQuery = useCallback(
        debounce((value) => {
            return updateQuery({ search: value }, router.asPath);
        }, 500),
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

    if (!categoryObj) {
        return (
            <Layout>
                <Box>
                    <Stack sx={stackSx}>
                        <LogoAndSlogan
                            title={"Category not found"}
                            subtitle={"Please try again"}
                        />
                    </Stack>
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            <Box>
                <Stack sx={stackSx}>
                    {/***************************************************
                     * LOGO AND TAGLINE
                     ***************************************************/}
                    <LogoAndSlogan
                        title={categoryObj?.displayName}
                        subtitle={categoryObj?.descript}
                    />

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
                    currentRoute={router.basePath}
                />
            </Box>
            {/***************************************************
             * IMAGE POPUP
             ***************************************************/}
            {imageId !== "" && (
                <ImagePopup
                    imageId={imageId.toString()}
                    variant={variant.toString()}
                    route={router.basePath}
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
    mt: 8,
    mb: 10,
    gap: 4,
};

export default StyleGuideExplore;
