import React from "react";
import { AxiosResponse } from "axios";
import { Stack, Box } from "@mui/system";
import { SearchRes } from "@/models/search.models";
import { UseInfiniteQueryResult } from "react-query";
import { Typography } from "@mui/material";
import ImageComponent from "../gallery/ImageComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import { updateQuery } from "@/utils/helperFunctions";

type Props = {
    infiniteScrollQuery: UseInfiniteQueryResult<
        AxiosResponse<SearchRes, any>,
        unknown
    >;
    variant: string;
    currentRoute: string;
};

const InfiniteGallery: React.FC<Props> = ({
    infiniteScrollQuery,
    variant = "0_0",
    currentRoute,
}) => {
    /**
     * Displays a fallback loader for infinite scroll gallery when data is not yet fetched
     *
     * @returns Grid of ImageComponents with loader
     */
    const infiniteGalleryLoader = () => {
        return (
            <Box className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {Array.from({ length: 10 }, (_value, index) => index).map(
                    (i) => {
                        return (
                            <ImageComponent
                                key={i}
                                reference_job_id={i.toString()}
                                variant={variant}
                                infiniteScroll={true}
                            />
                        );
                    }
                )}
            </Box>
        );
    };

    return (
        <InfiniteScroll
            dataLength={infiniteScrollQuery.data?.pages.length ?? 0}
            next={infiniteScrollQuery.fetchNextPage}
            hasMore={infiniteScrollQuery.hasNextPage ?? true}
            loader={infiniteGalleryLoader()}
            style={{ height: "auto", overflow: "visible" }}
            endMessage={
                <Stack
                    justifyContent={"center"}
                    alignItems={"center"}
                    width={"100%"}
                >
                    <Typography
                        component={"div"}
                        className="font-museo mt-16 mb-12"
                        variant="h4"
                    >
                        No more results
                    </Typography>
                </Stack>
            }
        >
            <Box
                className={`w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 ${
                    infiniteScrollQuery.isFetchingNextPage ? "mb-4" : ""
                }`}
            >
                {infiniteScrollQuery.data?.pages.map((page) => {
                    return page.data.hits.map((hit) => {
                        return (
                            <ImageComponent
                                key={hit.reference_job_id}
                                reference_job_id={hit.reference_job_id}
                                variant={variant}
                                infiniteScroll={true}
                                onClick={() => {
                                    updateQuery(
                                        {
                                            imageId: hit.reference_job_id,
                                            variant: variant,
                                        },
                                        currentRoute
                                    );
                                }}
                            />
                        );
                    });
                })}
            </Box>
        </InfiniteScroll>
    );
};

export default InfiniteGallery;
