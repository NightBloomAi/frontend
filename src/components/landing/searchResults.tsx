import InfiniteScroll from "react-infinite-scroll-component";
import ErrorMsg from "../misc/error";
import Loading from "../misc/loading";
import Gallery from "./gallery";
import { Hit } from "@/types/searchRes.type";

function SearchResults({
  data,
  loading,
  error,
  fetchMoreData,
}: {
  data: Hit[] | undefined;
  loading: boolean;
  error: any;
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
      <Gallery data={data} />
    </InfiniteScroll>
  );
}

export default SearchResults;
