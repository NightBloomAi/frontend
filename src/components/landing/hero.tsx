/* eslint-disable @next/next/no-img-element */
"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon } from "@/components/assets/icons";
import React, { useEffect, useRef, useState } from "react";
import Loading from "../misc/loading";
import ErrorMsg from "../misc/error";
import InfiniteScroll from "react-infinite-scroll-component";
import Gallery from "./gallery";
import useSearch from "@/hooks/useSearch";

export default function Hero(): JSX.Element {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { data, loading, error, fetchMoreData, resetPage } = useSearch(
    1,
    debouncedSearch
  );

  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    resetPage();
    setSearch(event.target.value);
  };

  if (loading) return <Loading />;
  if (error || !data) return <ErrorMsg error={error} />;

  return (
    <section className="flex flex-col justify-center items-center">
      <div className="h-16"></div>

      {/* Search bar and hero */}
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
            placeholder="Type '/' to search"
            value={search}
            onChange={handleSearchChange}
            className="w-full py-3 pl-12 pr-40 text-[var(--pink)] rounded-full outline-none bg-[var(--trans-grey)] focus:rounded-full focus:outline-none border-2 border-transparent"
          />
        </div>
      </div>

      <div>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<p>Loading...</p>}
          endMessage={<p>No more data to load.</p>}
        >
          <Gallery data={data} />
        </InfiniteScroll>
      </div>

      <div className="my-4"></div>
    </section>
  );
}
