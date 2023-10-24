import { Hit } from "@/types/searchRes.type";
import React from "react";
import LoadingSkeleton from "../misc/loadingSkeleton";
import ErrorMsg from "../misc/error";
import InfiniteScroll from "react-infinite-scroll-component";
import StyleGalleryResults from "./styleGalleryResults";
import { ReadonlyURLSearchParams } from "next/navigation";

export default function StyleSearchResults({
    data,
    loading,
    error,
    category,
    fetchMoreData,
    params,
}: {
    data: Hit[] | undefined;
    loading: boolean;
    error: any;
    category: string;
    fetchMoreData: () => void;
    params: ReadonlyURLSearchParams;
}): JSX.Element {
    if (loading) return <LoadingSkeleton />;
    if (error || !data) return <ErrorMsg error={error} />;
    return (
        <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<></>}
            endMessage={<p>No more data to load.</p>}
            style={{ height: "auto", overflow: "visible" }}
        >
            <StyleGalleryResults
                data={data}
                category={category}
                params={params}
            />
        </InfiniteScroll>
    );
}
