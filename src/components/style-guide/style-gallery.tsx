import React, { useEffect, useState } from "react";
import { StylesType } from "./style-guide";
import SearchBar from "../landing/searchBar";
import useSearch from "@/hooks/useSearch";
import SearchResults from "../landing/searchResults";
import StyleSearchResults from "./styleSearchResults";

interface UniqueStyleGalleryProps {
  item: StylesType | undefined;
}

export default function UniqueStyleGallery({ item }: UniqueStyleGalleryProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (item) {
      const category = setCategory(item.name);
    }
    if (!item) {
      const category = setCategory("");
    }
  });

  if (!item) {
    return null;
  }

  const { data, loading, error, fetchMoreData, resetPage } = useSearch(
    1,
    search,
    category
  );

  return (
    <section className="flex flex-col justify-center items-center">
      <div className="h-16"></div>

      <div className="flex flex-col justify-center items-center my-16 gap-y-4 md:my-32 md:gap-y-8">
        <h1 className="text-4xl md:text-5xl font-museo">{item.displayName}</h1>
        <h2 className="text-center w-[30rem]">{item.descript}</h2>
        <SearchBar onSearch={setSearch} onSearchChange={resetPage} />
      </div>

      <StyleSearchResults
        data={data}
        loading={loading}
        error={error}
        category={category}
        fetchMoreData={fetchMoreData}
      />

      <div className="my-4"></div>
    </section>
  );
}
