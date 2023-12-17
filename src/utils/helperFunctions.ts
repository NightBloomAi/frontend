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

        if (queries[key] === "" || queries[key] === undefined || queries[key] === null) {
            delete newQueryParams[key];
        }

        // If the query is category and the path is category, remove the query
        if (queries[key] === "category" && path?.split("/")[1] === "style-guide") {
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

/**
 * Checks if a JWT is expired or not
 * 
 * @param jwt The JWT to check
 * @returns 
 */
export const isJwtExpired = (jwt: string | undefined): boolean => {
    if (!jwt) return true;
    const decodedJwt = jwtDecode<DecodedJwt>(jwt);
    const now = Date.now() / 1000;
    return decodedJwt.exp < now;
}

/**
 * Turns a variant string into a number that can be used to select the correct variant
 * 
 * @param variant String in the format of "0_0"
 * @returns The correct variant number
 */
export const decryptVariant = (variant: string | undefined | null): string | null => {
    switch (variant) {
        case "0_0":
            return "0";
        case "0_1":
            return "1";
        case "0_2":
            return "2";
        case "0_3":
            return "3";
        default:
            return null;
    }
}

/**
 * Turns a variant number into a string that can be used to select the correct variant
 * 
 * @param variant The variant number
 * @returns The correct variant string
 */
export const encryptVariant = (variant: string | undefined | null): string => {
    switch (variant) {
        case "0":
            return "0_0";
        case "1":
            return "0_1";
        case "2":
            return "0_2";
        case "3":
            return "0_3";
        default:
            return "0_0";
    }
}