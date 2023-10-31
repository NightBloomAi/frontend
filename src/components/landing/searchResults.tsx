import InfiniteScroll from "react-infinite-scroll-component";
import LoadingSkeleton from "../misc/loadingSkeleton";
import ErrorMsg from "../misc/error";
import Loading from "../misc/loading";
import Gallery from "./gallery";
import { Hit } from "@/types/searchRes.type";
import { SelectChangeEvent } from "@mui/material";
import { ReadonlyURLSearchParams } from "next/navigation";

interface Props {
    data: Hit[] | undefined;
    loading: boolean;
    error: any;
    category: string;
    setCategory: (event: SelectChangeEvent<string>) => void;
    fetchMoreData: () => void;
    moreData: boolean;
    params: ReadonlyURLSearchParams;
}

function SearchResults({
    data,
    loading,
    error,
    category,
    setCategory,
    fetchMoreData,
    moreData,
    params,
}: Props): JSX.Element {
    if (loading) return <LoadingSkeleton />;
    if (error || !data) return <ErrorMsg error={error} />;

    return (
        <InfiniteScroll
            dataLength={data.length}
            next={fetchMoreData}
            hasMore={moreData}
            loader={<Loading />}
            endMessage={<div>
                <div className="w-full flex justify-center items-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-museo mt-7">No more results</h1>
                  </div>
                </div>
              </div>}
            style={{ height: "auto", overflow: "visible" }}
        >
            <Gallery
                data={data}
                category={category}
                setCategory={setCategory}
                params={params}
            />
        </InfiniteScroll>
    );
}

export default SearchResults;
