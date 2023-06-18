/* eslint-disable @next/next/no-img-element */
"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { SearchIcon } from "@/components/assets/icons";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { imageEndpoint, searchEndpoint } from "@/config/endpoints";
import Loading from "../misc/loading";
import ErrorMsg from "../misc/error";
import { Hit, SearchRes } from "@/types/searchRes.type";
import InfiniteScroll from "react-infinite-scroll-component";

type State = {
  data: Hit[] | undefined;
  loading: boolean;
  error: string | null;
};

type Action =
  | { type: "LOAD"; payload: Hit[] }
  | { type: "ERROR"; payload: string }
  | { type: "LOADING" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "LOAD":
      return { ...state, loading: false, data: action.payload };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    case "LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
}

export default function Hero(): JSX.Element {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const pageRef = useRef(1);
  const [state, dispatch] = useReducer(reducer, {
    data: undefined,
    loading: true,
    error: null,
  });
  const { data, loading, error } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "LOADING" });
      try {
        const res = await fetch(
          searchEndpoint(pageRef.current, debouncedSearch)
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const resData = await res.json();
        dispatch({ type: "LOAD", payload: resData.hits });
      } catch (error: any) {
        dispatch({ type: "ERROR", payload: error.message });
      }
    };
    fetchData();
  }, [debouncedSearch]);

  const fetchMoreData = async () => {
    pageRef.current++;
    const res = await fetch(searchEndpoint(pageRef.current, debouncedSearch));
    const searchRes: SearchRes = await res.json();
    if (data) {
      dispatch({ type: "LOAD", payload: data.concat(searchRes.hits) });
    }
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    pageRef.current = 1;
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
