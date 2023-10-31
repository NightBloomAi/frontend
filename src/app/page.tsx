"use client";

import SearchResults from "@/components/landing/searchResults";
import useSearch from "@/hooks/useSearch";
import { SelectChangeEvent } from "@mui/material";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon } from "@/components/assets/icons";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

/**
 * The landing page for the app that shows the search bar and the search results
 *
 * @returns Landing page for the app
 */
export default function Home() {
    const router = useRouter();
    const params = useSearchParams();
    const searchRef = useRef<HTMLInputElement>(null);
    const search = params.get("search") ?? "";
    const [category, setCategory] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    const debouncedSearchValue = useDebounce(debouncedSearch, 500);
    const { moreData, data, loading, error, fetchMoreData, resetPage } = useSearch(
        1,
        search,
        category
    );

    /**
     * Change the category state when the user selects a new category
     */
    const changeCategory = (event: SelectChangeEvent<string>) => {
        resetPage();
        setCategory(event.target.value);
    };

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
            router.replace(`?${queryString}`);

            // Reset page
            resetPage();
        },
        [params, router, resetPage]
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

    return (
        <section className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center my-16 gap-y-4 md:my-32 md:gap-y-8">
                <h1 className="text-4xl md:text-5xl font-museo">NightBloom</h1>
                <h2 className="text-center">
                    Discover your imagination - Midjourney search engine
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

            <SearchResults
                data={data}
                loading={loading}
                error={error}
                category={category}
                setCategory={changeCategory}
                fetchMoreData={fetchMoreData}
                moreData={moreData}
                params={params}
            />

            <div className="my-4"></div>
        </section>
    );
}
