"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon } from "@/components/assets/icons";
import ImageGallery from "@/components/landing/imageGallery";
import React, { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { searchEndpoint } from "@/config/globals";

export default function Hero() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { data, loading, error } = useFetch(searchEndpoint(1, debouncedSearch));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <section className="flex flex-col justify-center items-center">
      {/* Search bar and hero */}
      <div className="flex flex-col justify-center items-center my-24 gap-y-8">
        <h1 className="text-4xl">NightBloom</h1>
        <h2>Discover your imagination - Midjourney search engine</h2>
        <div className="relative">
          <SearchIcon />
          <input
            type="text"
            placeholder="Keyword search"
            value={search}
            onChange={handleSearchChange}
            className="w-full py-3 pl-12 pr-24 text-gray-500 border rounded-full outline-none bg-[var(--trans-grey)] focus:bg-[var(--slate)]"
          />
        </div>
      </div>

      {/*  Image gallery */}
      {data && <ImageGallery items={data.hits} />}

      <div className="my-4"></div>
    </section>
  );
}
