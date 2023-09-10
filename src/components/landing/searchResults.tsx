import InfiniteScroll from "react-infinite-scroll-component";
import ErrorMsg from "../misc/error";
import Loading from "../misc/loading";
import Gallery from "./gallery";
import { Hit } from "@/types/searchRes.type";
import { ChangeEvent } from "react";
import LoadingSkeleton from "../misc/loadingSkeleton";
import { Box, CircularProgress, SelectChangeEvent } from "@mui/material";

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
    setCategory: (event: SelectChangeEvent<string>) => void;
    fetchMoreData: () => void;
}): JSX.Element {
    if (loading) return <LoadingSkeleton />;
    if (error || !data) return <ErrorMsg error={error} />;

    return (
        <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<Loading />}
            endMessage={<p>No more data to load.</p>}
            style={{ height: "auto", overflow: "visible" }}
        >
            <Gallery
                data={data}
                category={category}
                setCategory={setCategory}
            />
        </InfiniteScroll>
    );
}

export default SearchResults;
