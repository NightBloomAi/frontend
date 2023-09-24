"use client";

import SearchBar from "@/components/landing/searchBar";
import SearchResults from "@/components/landing/searchResults";
import useSearch from "@/hooks/useSearch";
import { useDebounce } from "@/hooks/useDebounce";
import { SelectChangeEvent } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const params = useSearchParams();
    const searchParam = params.get("search");
    const [search, setSearch] = useState(searchParam ?? "");
    const [category, setCategory] = useState("");
    const { data, loading, error, fetchMoreData, resetPage } = useSearch(
        1,
        search,
        category
    );

    const changeCategory = (event: SelectChangeEvent<string>) => {
        resetPage();
        setCategory(event.target.value);
    };

    const debouncedCategory = useDebounce(category, 500);

    useEffect(() => {
        setCategory(debouncedCategory);
    }, [debouncedCategory, setCategory]);

    useEffect(() => {
        const url = new URL(window.location.href);
        if (search === "") {
            url.searchParams.delete("search");
        } else {
            url.searchParams.set("search", search);
        }
        router.push(url.toString());
    }, [router, search]);

    return (
        <section className="flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center my-16 gap-y-4 md:my-32 md:gap-y-8">
                <h1 className="text-4xl md:text-5xl font-museo">NightBloom</h1>
                <h2 className="text-center">
                    Discover your imagination - Midjourney search engine
                </h2>
                <SearchBar
                    onSearch={setSearch}
                    onSearchChange={resetPage}
                    initialSearch={search}
                />
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
