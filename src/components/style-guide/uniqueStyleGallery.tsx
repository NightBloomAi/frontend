"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { styles } from "./style-guide";
import useSearch from "@/hooks/useSearch";
import StyleSearchResults from "./styleSearchResults";
import { SearchIcon } from "../assets/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";

interface UniqueStyleGalleryProps {
    // item: StylesType | undefined;
    category: string;
}

export default function UniqueStyleGallery({
    category,
}: UniqueStyleGalleryProps) {
    const router = useRouter();
    const params = useSearchParams();
    const searchRef = useRef<HTMLInputElement>(null);
    const search = params.get("search") ?? "";
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const debouncedSearchValue = useDebounce(debouncedSearch, 500);
    const { data, loading, error, fetchMoreData, resetPage } = useSearch(
        1,
        search,
        category
    );

    /**
     * Handle the search value change by updating the debounced search value state
     * (This will then trigger the useEffect hook below)
     *
     * @param event The event that triggered the search value change
     */
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDebouncedSearch(event.target.value);
    };

    /**
     * Update the URL and fetch data when the search value changes (debounced)
     *
     * @param searchValue The search value to update the URL with
     */
    const updateURLAndFetchData = useCallback(
        (searchValue: string) => {
            // Convert URLSearchParams to a regular object
            const currentParams = Array.from(params.entries()).reduce(
                (obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                },
                {} as Record<string, string>
            );

            // Update the search parameter
            const newSearchParams = {
                ...currentParams, // keep the other query string parameters
                search: searchValue,
            };

            // Create a query string and update the URL
            const queryString = new URLSearchParams(newSearchParams).toString();
            router.replace(`/style-guide/${category}/?${queryString}`);

            // Reset page
            resetPage();
        },
        [params, router, category, resetPage]
    );

    /**
     * Fetch data when the search value changes (debounced)
     * This will also update the URL with the new search value
     */
    useEffect(() => {
        if (search !== debouncedSearchValue) {
            updateURLAndFetchData(debouncedSearchValue);
        }
    }, [debouncedSearchValue, search, updateURLAndFetchData]);

    const item = styles.find((style) => style.name === category);

    if (!item) {
        return null;
    }

    return (
        <section className="flex flex-col justify-center items-center">
            <div className="h-16"></div>

            <div className="flex flex-col justify-center items-center my-16 gap-y-4 md:my-32 md:gap-y-8">
                <h1 className="text-4xl md:text-5xl font-museo">
                    {item.displayName}
                </h1>
                <h2 className="text-center max-w-[30rem] mx-3">
                    {item.descript}
                </h2>
                <div className="relative mt-4">
                    <SearchIcon />
                    <input
                        ref={searchRef}
                        type="text"
                        placeholder="Type to search"
                        value={debouncedSearch}
                        onChange={handleSearchChange}
                        className="w-full py-3 pl-12 pr-40 text-[var(--pink)] rounded-full outline-none bg-[var(--trans-grey)] focus:rounded-full focus:outline-none border-2 border-transparent"
                    />
                </div>
            </div>

            <StyleSearchResults
                category={category}
                data={data}
                loading={loading}
                error={error}
                fetchMoreData={fetchMoreData}
                params={params}
            />

            <div className="my-4"></div>
        </section>
    );
}
