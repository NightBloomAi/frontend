/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import useSearch from "@/hooks/useSearch";
import SearchBar from "./searchBar";
import SearchResults from "./searchResults";
import { useDebounce } from "@/hooks/useDebounce";
import { SelectChangeEvent } from "@mui/material";

export default function Hero(): JSX.Element {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const { data, loading, error, fetchMoreData, resetPage } = useSearch(
        1,
        search,
        category
    );

    function changeCategory(event: SelectChangeEvent<string>) {
        resetPage();
        setCategory(event.target.value);
    }

    const debouncedCategory = useDebounce(category, 500);

    useEffect(() => {
        setCategory(debouncedCategory);
    }, [debouncedCategory, setCategory]);

    return (
        <section className="flex flex-col justify-center items-center">
            <div className="h-16"></div>

            <div className="flex flex-col justify-center items-center my-16 gap-y-4 md:my-32 md:gap-y-8">
                <h1 className="text-4xl md:text-5xl font-museo">NightBloom</h1>
                <h2 className="text-center">
                    Discover your imagination - Midjourney search engine
                </h2>
                <SearchBar onSearch={setSearch} onSearchChange={resetPage} />
            </div>

            <SearchResults
                data={data}
                loading={loading}
                error={error}
                category={category}
                setCategory={changeCategory}
                fetchMoreData={fetchMoreData}
            />

            <div className="my-4"></div>
        </section>
    );
}
