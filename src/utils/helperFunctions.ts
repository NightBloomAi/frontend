import { DecodedJwt } from "@/models/auth.models";
import { jwtDecode } from "jwt-decode";
import router from "next/router";

/**
 * Update query in the URL
 *
 * @param value New query value
 */
export const updateQuery = (queries: { [key: string]: string | undefined }, path?: string) => {
    // Create a new object combining existing query params and new ones
    const newQueryParams = { ...router.query };

    // Iterate over the queries object and update the newQueryParams
    for (const key in queries) {
        if (queries.hasOwnProperty(key)) {
            newQueryParams[key] = queries[key];
        }

        if (queries[key] === "" || queries[key] === undefined) {
            delete newQueryParams[key];
        }
    }

    router.replace(
        {
            pathname: path ?? "/",
            query: newQueryParams,
        },
        undefined,
        { shallow: true }
    );
};

export const isJwtExpired = (jwt: string | undefined): boolean => {
    if (!jwt) return true;
    const decodedJwt = jwtDecode<DecodedJwt>(jwt);
    const now = Date.now() / 1000;
    return decodedJwt.exp < now;
}