import React, { useEffect, useState } from "react";
import { StylesType } from "./style-guide";
import SearchBar from "../landing/searchBar";
import useSearch from "@/hooks/useSearch";
import SearchResults from "../landing/searchResults";
import StyleSearchResults from "./styleSearchResults";

interface UniqueStyleGalleryProps {
  item: StylesType | undefined;
  category:  string;
}

export default function UniqueStyleGallery({ item, category }: UniqueStyleGalleryProps,) {
  const [search, setSearch] = useState("");

  const { data, loading, error, fetchMoreData, resetPage } = useSearch(
    1,
    search,
    category
  );
  // const [category, setCategory] = useState("");

  
    // if (item) {
    //   const category = setCategory(item.name);
    // }
    

  if (!item) {
    return null;
  }


  return (
    <section className="flex flex-col justify-center items-center">
      <div className="h-16"></div>

      <div className="flex flex-col justify-center items-center my-16 gap-y-4 md:my-32 md:gap-y-8">
        <h1 className="text-4xl md:text-5xl font-museo">{item.displayName}</h1>
        <h2 className="text-center max-w-[30rem] mx-3">{item.descript}</h2>
        <SearchBar onSearch={setSearch} onSearchChange={resetPage} />
      </div>

      <StyleSearchResults
        category={category}
        data={data}
        loading={loading}
        error={error}
        fetchMoreData={fetchMoreData}
      />

      <div className="my-4"></div>
    </section>
  );
}
