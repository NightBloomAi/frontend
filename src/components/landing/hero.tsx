/* eslint-disable @next/next/no-img-element */
"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon } from "@/components/assets/icons";
import React, { useEffect, useRef, useState } from "react";
import { imageEndpoint, searchEndpoint } from "@/config/endpoints";
import Loading from "../misc/loading";
import ErrorMsg from "../misc/error";
import { Hit, SearchRes } from "@/types/searchRes.type";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Hero() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Hit[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const debouncedSearch = useDebounce(search, 500);
  const pageRef = useRef(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(searchEndpoint(1, debouncedSearch));
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setData(data.hits);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedSearch]);

  const fetchMoreData = async () => {
    const res = await fetch(searchEndpoint(pageRef.current, debouncedSearch));
    const searchRes: SearchRes = await res.json();
    pageRef.current++;
    setTimeout(() => {
      setData(data!.concat(searchRes.hits));
    }, 500);
  };

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
          <ul className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.map((item) => (
              <img
                key={item.id}
                src={imageEndpoint(item.id)}
                alt={item.id}
                className="object-cover h-full transition-opacity duration-500"
              />
            ))}
          </ul>
        </InfiniteScroll>
      </div>

      <div className="my-4"></div>
    </section>
  );
}
