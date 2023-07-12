import { Skeleton } from "@mui/material";
import React from "react";

export default function LoadingSkeleton() {
    var data = [];

    for (var i = 1; i <= 20; i++) {
        data.push(i);
    }

    return (
        <div className="flex flex-col gap-y-4 w-full">
            {/* Filters bar */}
            <div className="flex flex-row justify-center items-center gap-x-4">
                <div className="flex flex-row justify-between w-full">
                    <div></div>
                    <div>
                        <Skeleton
                            variant="rectangular"
                            width={100}
                            height={30}
                            className="rounded-lg"
                            style={{
                                backgroundColor: "#49454F",
                                borderRadius: "4px",
                            }}
                        />
                    </div>
                </div>
            </div>

            <ul className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.map((item) => (
                    <Skeleton
                        key={item}
                        variant="rectangular"
                        className="w-full"
                        style={{
                            paddingBottom: "130%",
                            backgroundColor: "#49454F",
                            borderRadius: "4px",
                        }}
                    />
                ))}
            </ul>
        </div>
    );
}
