import axios from "axios";

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
    }) => {
        const response = await base.get(
            `/search/assets?page=${page}&category=${category}&query=${query}`,
            { withCredentials: true }
        );
        return response?.data;
    };

    /**
     * Get the current user's information
     *
     * @param jwt The user's JWT
     * @returns The response from the server
     */
    static currentUser = async ({ jwt }: { jwt?: string }) => {
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        if (!jwt) {
            const response = await base.get(`/account/current_user`);
            return response?.data;
        } else {
            const response = await base.get(`/account/current_user`, {
                headers,
            });
            return response?.data;
        }
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
    }) => {
        const payload = {
            email,
            password,
        };
        try {
            const response = await base.post(`/account/login`, payload);
            return response?.data;
        } catch (error: any) {
            if (error.response) {
                console.error("Error logging in user:", error);
                return error.response.data;
            } else {
                return error;
            }
        }
    };

    /**
     * Log the user in with Google
     *
     * @returns The response from the server
     */
    static googleLogin = async () => {
        try {
            const response = await base.get(`/google/login`);
            return response?.data;
        } catch (error) {
            return error;
        }
    };

    /**
     * Log the user out
     *
     * @param jwt The user's JWT
     * @returns The response from the server
     */
    static logout = async ({ jwt }: { jwt?: string }) => {
        const headers = {
            Authorization: `Bearer ${jwt}`,
            Refresh: `Bearer ${jwt}`,
        };
        if (!jwt) {
            try {
                const response = await base.get(`/account/logout`);
                return response?.data;
            } catch (error: any) {
                if (error.response) {
                    console.error("Error logging out user:", error);
                    return error.response.data;
                } else {
                    return error;
                }
            }
        } else {
            try {
                const response = await base.get(`/account/logout`, {
                    headers,
                });
                return response?.data;
            } catch (error: any) {
                if (error.response) {
                    console.error("Error logging out user:", error);
                    return error.response.data;
                } else {
                    return error;
                }
            }
        }
    };

    /**
     * Refresh the user's JWT
     *
     * @param jwt The user's JWT
     * @returns The response from the server
     */
    static refreshToken = async ({ jwt }: { jwt?: string }) => {
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        if (!jwt) {
            const response = await base.get(`/account/refresh`);
            return response?.data;
        } else {
            const response = await base.get(`/account/refresh`, {
                headers,
            });
            return response?.data;
        }
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
    }) => {
        const payload = {
            email,
            password,
        };
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        try {
            const response = await base.post(`/account/register`, payload, {
                headers,
            });
            return response?.data;
        } catch (error: any) {
            if (error.response) {
                console.error("Error registering user:", error);
                return error.response.data;
            } else {
                return error;
            }
        }
    };

    /**
     * Get the user's favorites
     *
     * @param jwt The user's JWT
     * @returns The response from the server
     */
    static userFavourites = async ({ jwt }: { jwt?: string }) => {
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        if (!jwt) {
            const response = await base.get(`/user_favourites/favourites`);
            return response.data;
        } else {
            const response = await base.get(`/user_favourites/favourites`, {
                headers,
            });
            return response.data;
        }
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
    }: {
        ids: string[];
        jwt?: string;
    }) => {
        const payload = {
            ids: ids,
        };
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        try {
            const response = await base.post(
                `/user_favourites/favourites`,
                payload,
                {
                    headers,
                }
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error("Error adding to favourites", error);
            return error;
        }
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
    }) => {
        const payload = {
            ids: ids,
        };
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        try {
            const response = await base.put(
                `/user_favourites/favourites`,
                payload,
                {
                    headers,
                }
            );
            return response.data;
        } catch (error) {
            console.error("Error removing favourites", error);
            return error;
        }
    };

    static checkFavourite = async ({
        id,
        jwt,
    }: {
        id: string;
        jwt?: string;
    }) => {
        const headers = {
            Authorization: `Bearer ${jwt}`,
        };
        try {
            const response = await base.get(
                `/user_favourites/favourites/${id}`,
                {
                    headers,
                }
            );
            return response.data.is_favourite;
        } catch (error) {
            console.error("Error checking if post is favourite", error);
            return error;
        }
    };

    static imageDetails = async ({ asset_id }: { asset_id: string }) => {
        return await base.get(`/search/asset/${asset_id}`);
    };
}

export default Endpoints;
