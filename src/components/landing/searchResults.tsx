import InfiniteScroll from "react-infinite-scroll-component";
import ErrorMsg from "../misc/error";
import Loading from "../misc/loading";
import Gallery from "./gallery";
import { Hit } from "@/types/searchRes.type";
import { ChangeEvent } from "react";

function SearchResults({
  data,
  loading,
  error,
  category,
  setCategory,
  fetchMoreData,
}: {
  data: Hit[] | undefined;
  loading: boolean;
  error: any;
  category: string;
  setCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
  fetchMoreData: () => void;
}): JSX.Element {

  if (loading) return <Loading />;
  if (error || !data) return <ErrorMsg error={error} />;

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<p>Loading...</p>}
      endMessage={<p>No more data to load.</p>}
      style={{ height: "auto", overflow: "visible" }}
    >
      <Gallery data={data} category={category} setCategory={setCategory} />
    </InfiniteScroll>
  );
}

export default SearchResults;
