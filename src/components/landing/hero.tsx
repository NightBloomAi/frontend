"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon } from "@/components/assets/icons";
import ImageGallery from "@/components/landing/imageGallery";
import React, { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { searchEndpoint } from "@/config/globals";
import Loading from "../misc/loading";
import ErrorMsg from "../misc/error";

export default function Hero() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, loading, error } = useFetch(searchEndpoint(1, debouncedSearch));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            type="text"
            placeholder="Keyword search"
            value={search}
            onChange={handleSearchChange}
            className="w-full py-3 pl-12 pr-40 text-gray-500 rounded-full outline-none bg-[var(--trans-grey)] focus:rounded-full focus:outline-none border-2 border-transparent"
          />
        </div>
      </div>

      {/*  Image gallery */}
      {data && <ImageGallery items={data.hits} />}

      <div className="my-4"></div>
    </section>
  );
}
