import { CurrentSessionResponse, SignInResponse } from "@/models/auth.models";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { CategoriesRes, CheckFavRes, FavImageDetailRes, ImageDetailRes, SearchRes } from "@/models/search.models";

class ApiClient {

    public client: AxiosInstance;
    private jwt: string | null = null;

    constructor() {
        this.client = axios.create({
            baseURL: "https://nightbloom.ai/api",
        });
    }

    setJwt(jwt: string | null) {
        this.jwt = jwt;
    }

    /**
    * Search for images on the server using the given query and category
    *
    * @param page The page number to search
    * @param query The query to search for
    * @param category The category to search for
    * @returns The response from the server
    */
    search(payload: { page: number, query: string, category: string }): Promise<AxiosResponse<SearchRes>> {
        return this.client.get(
            `/search/assets?page=${payload.page}&category=${payload.category}&query=${payload.query}`,
            { withCredentials: true }
        );
    }

    /**
     * Get the current user's information
     *
     * @param jwt The user's JWT
     * @returns The response from the server
     */
    currentUser(): Promise<AxiosResponse<CurrentSessionResponse>> {
        return this.client.get("/account/current_user", {
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
        });
    }

    /**
     * Log the user in
     *
     * @param email The user's email
     * @param password The user's password
     * @returns The response from the server
     */
    login(payload: { email: string, password: string }): Promise<AxiosResponse<SignInResponse>> {
        return this.client.post("/account/login", payload);
    }

    /**
     * Log the user out
     *
     * @param jwt The user's JWT
     * @returns The response from the server
     */
    logout(): Promise<AxiosResponse> {
        return this.client.get("/account/logout", {
            headers: {
                Authorization: `Bearer ${this.jwt}`,
                Refresh: `Bearer ${this.jwt}`,
            },
        });
    }

    /**
     * Sends an email to the user with a link to reset their password
     * 
     * @param email The user's email 
     * @returns The response from the server
     */
    forgotPassword(payload: { email: string }): Promise<AxiosResponse> {
        return this.client.post("/account/forgot_password", payload);
    }

    /**
     * Resets the user's password with the given password and OTP
     * 
     * @param password New password of the user
     * @param otp OTP sent to the user's email 
     * @returns The response from the server
     */
    resetPassword(payload: { password: string, otp: string }): Promise<AxiosResponse> {
        return this.client.post(`/account/reset_password/${payload.otp}`);
    }

    /**
     * Refresh the user's JWT
     * 
     * @returns The response from the server
     */
    refreshToken(): Promise<AxiosResponse> {
        return this.client.get("/account/refresh", {
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
        });
    }

    /**
     * Log the user in with Google
     *
     * @returns The response from the server
     */
    googleLogin(): Promise<AxiosResponse> {
        return this.client.get("/google/login");
    }

    /**
     * Endpoint to register a new user
     * 
     * @param email The user's email
     * @param password The user's password 
     * @returns The response from the server
     */
    register(payload: { email: string, password: string }): Promise<AxiosResponse> {
        return this.client.post("/account/register", payload);
    }

    /**
     * Get the user's favorites from the server
     * 
     * @returns The response from the server
     */
    userFavourites(): Promise<AxiosResponse<FavImageDetailRes>> {
        return this.client.get("/user_favourites/favourites", {
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
        });
    }

    /**
     * Adds an asset to the user's favorites
     * 
     * @param asset_id The asset id to add to the user's favorites
     * @returns The response from the server
     */
    createFavorite(payload: {
        ids: string[],
        variant: string | null,
    }): Promise<AxiosResponse> {
        return this.client.post("/user_favourites/favourites", payload, {
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
        });
    }

    /**
     * Deletes an asset from the user's favorites
     * 
     * @param idss The asset ids to delete from the user's favorites
     * @returns The response from the server
     */
    removeFavorite(payload: { ids: string[] }): Promise<AxiosResponse> {
        return this.client.put(`/user_favourites/favourites`, payload, {
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
        });
    }

    /**
     * Checks if an asset is in the user's favorites
     * 
     * @param id The asset id to check
     * @returns The response from the server
     */
    checkFavorite(payload: { id: string }): Promise<AxiosResponse<CheckFavRes>> {
        return this.client.get(`/user_favourites/favourites/${payload.id}`, {
            headers: {
                Authorization: `Bearer ${this.jwt}`,
            },
        });
    }

    /**
     * Gets the details of an image
     * 
     * @param asset_id The asset id to get details for  
     * @returns The response from the server
     */
    imageDetails(payload: { asset_id: string }): Promise<AxiosResponse<ImageDetailRes>> {
        return this.client.get(`/search/asset/${payload.asset_id}`);
    }

    /**
     * Gets the image endpoint URL for the given image
     * 
     * @param reference_job_id The reference job id of the image
     * @param variant The variant of the image
     * @param infiniteScroll Whether the image is being loaded for infinite scroll
     * @returns The response from the server
     */
    imageEndpointURL(payload: {
        reference_job_id: string;
        variant: string;
        infiniteScroll: boolean;
    }) {
        return `https://cdn.midjourney.com/${payload.reference_job_id}/${!payload.infiniteScroll ? payload.variant : '0_0'}.png`;
    }

    /**
     * The categories available on the server
     * 
     * @returns The response from the server
     */
    getCategories(): Promise<AxiosResponse<CategoriesRes>> {
        return this.client.get("/search/asset/categories");
    }

}

export const API_CLIENT = new ApiClient();
