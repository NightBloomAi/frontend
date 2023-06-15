/* eslint-disable @next/next/no-img-element */
"use client";

import initialResponse from "@/data/fake.data";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchRes } from "@/types/searchRes.type";
import React, { use, useEffect, useState } from "react";

export default function Hero() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<SearchRes | undefined>(undefined);
  const [isLoading, setLoading] = useState(false);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch !== undefined) {
      setLoading(true);
      fetch(`http://nightbloom.ai/api/search?page=1&query=${debouncedSearch}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          console.log(res);
          return res.json();
        })
        .then((data) => {
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
        });
    } else {
      setData(undefined);
    }
  }, [debouncedSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // useEffect(() => {
  //   setData(initialResponse);
  //   console.log(initialResponse);
  // }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <section className="flex flex-col justify-center items-center">
      {/* Search bar and hero */}
      <div className="flex flex-col justify-center items-center my-24 gap-y-8">
        <h1 className="text-4xl">NightBloom</h1>
        <h2>Discover your imagination - Midjourney search engine</h2>
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {/*  Image gallery */}
      <div className="grid gap-2 grid-col-1 md:grid-cols-4">
        {data.hits.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-center items-center border-2"
          >
            <img
              className="h-64 w-64 object-cover"
              src={`https://cdn.midjourney.com/${item.id}/0_0.png`}
              alt={item.id}
            />
            {/* <p>{item.prompt}</p> */}
          </div>
        ))}
      </div>
    </section>
  );
}
