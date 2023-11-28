import axios, { Axios, AxiosResponse } from "axios";

const base = axios.create({
    baseURL: "https://nightbloom.ai/api",
});

class Endpoints {
    /**
     * Search for images on the server using the given query and category
     *
     * @param page The page number to search
     * @param query The query to search for
     * @param category The category to search for
     * @returns The response from the server
     */
    static search = async ({
        page,
        query,
        category,
    }: {
        page: number;
        query: string;
        category: string;
    }): Promise<AxiosResponse> => {
        return await base.get(
            `/search/assets?page=${page}&category=${category}&query=${query}`,
            { withCredentials: true }
        );
    };

    /**
     * Get the current user's information
     *
     * @param jwt The user's JWT
     * @returns The response from the server
     */
    static currentUser = async ({ jwt }: { jwt?: string }): Promise<AxiosResponse> => {
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        return await base.get(`/account/current_user`, {
            headers,
        });
    };

    /**
     * Log the user in
     *
     * @param email The user's email
     * @param password The user's password
     * @returns The response from the server
     */
    static login = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }): Promise<AxiosResponse> => {
        const payload = {
            email,
            password,
        };
        return await base.post(`/account/login`, payload);
    };

    /**
     * 
     * @param email Email of the user 
     * @returns The response from the server
     */
    static forgotPassword = async ({ email }: { email: string }): Promise<AxiosResponse> => {
        return await base.post(`/account/forgot_password`, {
            email: email,
        });
    };

    /**
     * 
     * @param password New password of the user
     * @param otp OTP sent to the user's email 
     * @returns The response from the server
     */
    static resetPassword = async ({
        password,
        otp,
    }: {
        password: string;
        otp: string;
    }): Promise<AxiosResponse> => {
        return await base.post(`/account/reset_password/${otp}`, {
            password: password,
        });

    };

    /**
     * Log the user in with Google
     *
     * @returns The response from the server
     */
    static googleLogin = async (): Promise<AxiosResponse> => {
        return await base.get(`/google/login`);
    };

    /**
     * Log the user out
     *
     * @param jwt The user's JWT
     * @returns The response from the server
     */
    static logout = async ({ jwt }: { jwt?: string }): Promise<AxiosResponse> => {
        const headers = {
            Authorization: `Bearer ${jwt}`,
            Refresh: `Bearer ${jwt}`,
        };
        return await base.get(`/account/logout`, {
            headers,
        });
    };

    /**
     * Refresh the user's JWT
     *
     * @param jwt The user's JWT
     * @returns The response from the server
     */
    static refreshToken = async ({ jwt }: { jwt?: string }): Promise<AxiosResponse> => {
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        return await base.get(`/account/refresh`, {
            headers,
        });
    };

    /**
     * Create a new user
     *
     * @param email The user's email
     * @param password The user's password
     * @returns The response from the server
     */
    static register = async ({
        email,
        password,
        jwt,
    }: {
        email: string;
        password: string;
        jwt?: string;
    }): Promise<AxiosResponse> => {
        const payload = {
            email,
            password,
        };
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        return await base.post(`/account/register`, payload, {
            headers,
        });
    };

    /**
     * Get the user's favorites
     *
     * @param jwt The user's JWT
     * @returns The response from the server
     */
    static userFavourites = async ({ jwt }: { jwt?: string }): Promise<AxiosResponse> => {
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        return await base.get(`/user_favourites/favourites`, {
            headers,
        });
    };

    /**
     * Add an image to favourite
     *
     * @param ids The ids of the images to add to favourites
     * @param jwt The user's JWT
     * @returns The response from the server
     */
    static createFavourite = async ({
        ids,
        jwt,
        variant,
    }: {
        ids: string[];
        jwt?: string;
        variant: string;
    }): Promise<AxiosResponse> => {
        const payload = {
            ids: ids,
            variant: variant,
        };
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        return await base.post(`/user_favourites/favourites`, payload, {
            headers,
        });
    };

    /**
     * Remove an image from favourites
     *
     * @param ids The ids of the images to remove from favourites
     * @param jwt The user's JWT
     * @returns The response from the server
     */
    static removeFavourite = async ({
        ids,
        jwt,
    }: {
        ids: string[];
        jwt?: string;
    }): Promise<AxiosResponse> => {
        const payload = {
            ids: ids,
        };
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        return await base.put(`/user_favourites/favourites`, payload, {
            headers,
        });
    };

    /**
     * Check if an image is in favourites
     * 
     * @param id ID of the image 
     * @returns The response from the server
     */
    static checkFavourite = async ({ id, jwt }: { id: string; jwt?: string }): Promise<AxiosResponse> => {
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };

        return await base.get(`/user_favourites/favourites/${id}`, {
            headers,
        });
    };

    /**
     * Get info about an image
     * 
     * @param asset_id ID of the image 
     * @returns The response from the server
     */
    static imageDetails = async ({ asset_id }: { asset_id: string }): Promise<AxiosResponse> => {
        return await base.get(`/search/asset/${asset_id}`);
    };

    /**
     * URL of the image
     * 
     * @param reference_job_id ID of the image 
     * @returns 
     */
    static imageEndpointURL = ({
        reference_job_id,
        variant = "0_0",
        infiniteScroll = false,
    }: {
        reference_job_id: string;
        variant: string;
        infiniteScroll: boolean;
    }) => {
        return `https://cdn.midjourney.com/${reference_job_id}/${!infiniteScroll ? variant : '0_0'}.png`;
    };

    /**
     * 
     * @returns List of categories
     */
    static getCategories = async (): Promise<AxiosResponse> => {
        return await base.get(`/search/asset/categories`);
    };
}

export default Endpoints;